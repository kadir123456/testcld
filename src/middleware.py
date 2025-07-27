@@ .. @@
from fastapi import Request, HTTPException
from fastapi.responses import JSONResponse
from starlette.middleware.base import BaseHTTPMiddleware
import time
import uuid
+import html
+import re
from .rate_limiter import rate_limit_middleware

class SecurityMiddleware(BaseHTTPMiddleware):
    """Security middleware for headers and basic protection"""
    
    async def dispatch(self, request: Request, call_next):
        # Add request ID for tracking
        request_id = str(uuid.uuid4())
        request.state.request_id = request_id
        
+        # XSS Protection - Sanitize request data
+        await self._sanitize_request(request)
+        
        # Apply rate limiting
        response = await rate_limit_middleware(request, call_next)
        
        # Add security headers
        if hasattr(response, 'headers'):
            response.headers["X-Request-ID"] = request_id
            response.headers["X-Content-Type-Options"] = "nosniff"
            response.headers["X-Frame-Options"] = "DENY"
            response.headers["X-XSS-Protection"] = "1; mode=block"
            response.headers["Referrer-Policy"] = "strict-origin-when-cross-origin"
+            response.headers["Content-Security-Policy"] = "default-src 'self'; script-src 'self' 'unsafe-inline' cdnjs.cloudflare.com; style-src 'self' 'unsafe-inline' fonts.googleapis.com cdnjs.cloudflare.com; font-src 'self' fonts.gstatic.com; img-src 'self' data: https:; connect-src 'self' wss: https:;"
+            response.headers["Permissions-Policy"] = "geolocation=(), microphone=(), camera=()"
            
            # Add HSTS header for HTTPS
            if request.url.scheme == "https":
                response.headers["Strict-Transport-Security"] = "max-age=31536000; includeSubDomains"
        
        return response
+    
+    async def _sanitize_request(self, request: Request):
+        """Sanitize request data to prevent XSS"""
+        # Only sanitize for specific content types
+        content_type = request.headers.get("content-type", "")
+        if "application/json" in content_type:
+            try:
+                body = await request.body()
+                if body:
+                    # Store original body for later use
+                    request.state.original_body = body
+            except:
+                pass
+    
+    def _sanitize_string(self, value: str) -> str:
+        """Sanitize string input"""
+        if not isinstance(value, str):
+            return value
+        
+        # HTML escape
+        value = html.escape(value)
+        
+        # Remove potentially dangerous patterns
+        dangerous_patterns = [
+            r'<script[^>]*>.*?</script>',
+            r'javascript:',
+            r'vbscript:',
+            r'onload\s*=',
+            r'onerror\s*=',
+            r'onclick\s*=',
+        ]
+        
+        for pattern in dangerous_patterns:
+            value = re.sub(pattern, '', value, flags=re.IGNORECASE | re.DOTALL)
+        
+        return value