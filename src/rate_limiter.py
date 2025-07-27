from fastapi import HTTPException, Request
from fastapi.responses import JSONResponse
import time
from collections import defaultdict, deque
from typing import Dict, Deque
import asyncio
import ipaddress
from .config import settings

class RateLimiter:
    def __init__(self):
        # Store request timestamps for each IP
        self.requests: Dict[str, Deque[float]] = defaultdict(deque)
        # Store blocked IPs temporarily
        self.blocked_ips: Dict[str, float] = {}
        # Store failed attempts
        self.failed_attempts: Dict[str, Deque[float]] = defaultdict(deque)
        self.cleanup_task = None
        
    def is_allowed(self, identifier: str, max_requests: int = None, window_seconds: int = None) -> bool:
        """Check if request is allowed based on rate limiting"""
        max_requests = max_requests or settings.RATE_LIMIT_REQUESTS
        window_seconds = window_seconds or settings.RATE_LIMIT_WINDOW
        
        now = time.time()
        
        # Check if IP is temporarily blocked
        if identifier in self.blocked_ips:
            if now < self.blocked_ips[identifier]:
                return False
            else:
                # Unblock IP
                del self.blocked_ips[identifier]
        
        window_start = now - window_seconds
        
        # Get request history for this identifier
        request_times = self.requests[identifier]
        
        # Remove old requests outside the window
        while request_times and request_times[0] < window_start:
            request_times.popleft()
        
        # Check if limit exceeded
        if len(request_times) >= max_requests:
            # Block IP for 15 minutes after repeated violations
            self.blocked_ips[identifier] = now + 900  # 15 minutes
            return False
        
        # Add current request
        request_times.append(now)
        return True
    
    def record_failed_attempt(self, identifier: str):
        """Record a failed authentication attempt"""
        now = time.time()
        window_start = now - 3600  # 1 hour window
        
        failed_times = self.failed_attempts[identifier]
        
        # Remove old failed attempts
        while failed_times and failed_times[0] < window_start:
            failed_times.popleft()
        
        failed_times.append(now)
        
        # Block IP after 5 failed attempts in 1 hour
        if len(failed_times) >= 5:
            self.blocked_ips[identifier] = now + 3600  # Block for 1 hour
    
    def is_suspicious_ip(self, ip: str) -> bool:
        """Check if IP is suspicious (private ranges, localhost, etc.)"""
        try:
            ip_obj = ipaddress.ip_address(ip)
            # Allow localhost for development
            if settings.ENVIRONMENT == "development" and ip_obj.is_loopback:
                return False
            # Block private networks in production
            if settings.ENVIRONMENT == "production" and ip_obj.is_private:
                return True
            return False
        except ValueError:
            # Invalid IP format
            return True
    
    def get_reset_time(self, identifier: str, window_seconds: int = None) -> int:
        """Get when the rate limit will reset for this identifier"""
        window_seconds = window_seconds or settings.RATE_LIMIT_WINDOW
        
        # Check if IP is blocked
        if identifier in self.blocked_ips:
            return int(self.blocked_ips[identifier] - time.time())
        
        request_times = self.requests.get(identifier, deque())
        
        if not request_times:
            return 0
        
        oldest_request = request_times[0]
        reset_time = int(oldest_request + window_seconds)
        return max(0, reset_time - int(time.time()))
    
    async def cleanup_old_entries(self):
        """Periodically cleanup old entries to prevent memory leaks"""
        while True:
            try:
                now = time.time()
                window_start = now - settings.RATE_LIMIT_WINDOW
                
                # Clean up old entries
                for identifier in list(self.requests.keys()):
                    request_times = self.requests[identifier]
                    
                    # Remove old requests
                    while request_times and request_times[0] < window_start:
                        request_times.popleft()
                    
                    # Remove empty deques
                    if not request_times:
                        del self.requests[identifier]
                
                # Clean up expired blocked IPs
                expired_blocks = [ip for ip, expire_time in self.blocked_ips.items() if now > expire_time]
                for ip in expired_blocks:
                    del self.blocked_ips[ip]
                
                # Clean up old failed attempts
                failed_window_start = now - 3600  # 1 hour
                for identifier in list(self.failed_attempts.keys()):
                    failed_times = self.failed_attempts[identifier]
                    
                    while failed_times and failed_times[0] < failed_window_start:
                        failed_times.popleft()
                    
                    if not failed_times:
                        del self.failed_attempts[identifier]
                
                # Sleep for 5 minutes before next cleanup
                await asyncio.sleep(300)
                
            except Exception as e:
                print(f"❌ Rate limiter cleanup error: {e}")
                await asyncio.sleep(60)  # Retry after 1 minute on error

# Global rate limiter instance
rate_limiter = RateLimiter()

def get_client_ip(request: Request) -> str:
    """Get client IP address from request"""
    # Check for forwarded IP (behind proxy/load balancer)
    forwarded_for = request.headers.get("X-Forwarded-For")
    if forwarded_for:
        return forwarded_for.split(",")[0].strip()
    
    # Check for real IP (behind proxy)
    real_ip = request.headers.get("X-Real-IP")
    if real_ip:
        return real_ip
    
    # Fallback to direct connection IP
    return request.client.host if request.client else "unknown"

async def rate_limit_middleware(request: Request, call_next):
    """Rate limiting middleware"""
    # Skip rate limiting for health checks and static files
    if request.url.path in ["/health"] or request.url.path.startswith("/static"):
        return await call_next(request)
    
    client_ip = get_client_ip(request)
    
    # Check for suspicious IPs
    if rate_limiter.is_suspicious_ip(client_ip) and settings.ENVIRONMENT == "production":
        return JSONResponse(
            status_code=403,
            content={"error": "Access denied", "message": "Suspicious IP address"}
        )
    
    # Different limits for different endpoints
    if request.url.path.startswith("/api/auth/"):
        # Stricter limits for auth endpoints
        max_requests = 10
        window_seconds = 900  # 15 minutes
    elif request.url.path.startswith("/api/admin/"):
        # Moderate limits for admin endpoints
        max_requests = 50
        window_seconds = 3600  # 1 hour
    else:
        # Default limits for other API endpoints
        max_requests = settings.RATE_LIMIT_REQUESTS
        window_seconds = settings.RATE_LIMIT_WINDOW
    
    if not rate_limiter.is_allowed(client_ip, max_requests, window_seconds):
        reset_time = rate_limiter.get_reset_time(client_ip, window_seconds)
        
        return JSONResponse(
            status_code=429,
            content={
                "error": "Rate limit exceeded",
                "message": f"Too many requests. Try again in {reset_time} seconds.",
                "retry_after": reset_time
            },
            headers={
                "Retry-After": str(reset_time),
                "X-RateLimit-Limit": str(max_requests),
                "X-RateLimit-Window": str(window_seconds)
            }
        )
    
    return await call_next(request)

# Start cleanup task
async def start_rate_limiter_cleanup():
    """Start the rate limiter cleanup background task"""
    if not rate_limiter.cleanup_task:
        rate_limiter.cleanup_task = asyncio.create_task(rate_limiter.cleanup_old_entries())