import asyncio
import os
import logging
import traceback
from contextlib import asynccontextmanager
from fastapi import FastAPI, HTTPException, Depends, BackgroundTasks, Request, status
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse, JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from fastapi.middleware.trustedhost import TrustedHostMiddleware
from datetime import datetime, timedelta
import uuid
import secrets

# Import our modules with error handling
try:
    from .config import settings
    from .database import firebase_manager
    from .auth import auth_manager, get_current_user, get_current_admin, get_active_user
    from .models import *
    from .middleware import SecurityMiddleware
    from .rate_limiter import start_rate_limiter_cleanup
    from .encryption import encryption_manager
    from .bot_manager import bot_manager
except ImportError as e:
    print(f"❌ Import error: {e}")
    # Fallback imports for deployment
    import sys
    sys.path.append('/opt/render/project/src')
    from config import settings
    from database import firebase_manager
    from auth import auth_manager, get_current_user, get_current_admin, get_active_user
    from models import *
    from middleware import SecurityMiddleware
    from rate_limiter import start_rate_limiter_cleanup
    from encryption import encryption_manager
    from bot_manager import bot_manager

# Setup logging
logging.basicConfig(
    level=getattr(logging, settings.LOG_LEVEL.upper(), logging.INFO),
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

# Background tasks
background_tasks = []

@asynccontextmanager
async def lifespan(app: FastAPI):
    """Application lifespan manager"""
    logger.info("Starting Ezyago Multi-User Trading Bot Platform...")
    
    # Startup validation
    startup_checks = {
        "Firebase": firebase_manager.is_ready(),
        "Encryption": encryption_manager.is_ready(),
    }
    
    logger.info("Startup Checks:")
    for service, status in startup_checks.items():
        status_icon = "✅" if status else "❌"
        logger.info(f"  {status_icon} {service}: {'Ready' if status else 'Not Ready'}")
    
    # Start background tasks
    logger.info("Starting background tasks...")
    background_tasks.append(asyncio.create_task(start_rate_limiter_cleanup()))
    background_tasks.append(asyncio.create_task(bot_manager.cleanup_inactive_bots()))
    
    yield
    
    # Cleanup
    logger.info("Shutting down...")
    await bot_manager.stop_all_bots()
    for task in background_tasks:
        task.cancel()
        try:
            await task
        except asyncio.CancelledError:
            pass

# Create FastAPI app
app = FastAPI(
    title="Ezyago Trading Bot Platform",
    description="Multi-user automated trading bot platform",
    version="1.0.0",
    lifespan=lifespan
)

# Add trusted host middleware for security
if settings.ENVIRONMENT == "production":
    app.add_middleware(
        TrustedHostMiddleware, 
        allowed_hosts=["ezyago.com", "www.ezyago.com", "*.onrender.com"]
    )

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:8000"] if settings.ENVIRONMENT == "development" else ["https://ezyago.com", "https://www.ezyago.com"],
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allow_headers=["Content-Type", "Authorization", "X-Requested-With"],
    max_age=86400,  # 24 hours
)

# Add custom middleware
app.add_middleware(SecurityMiddleware)

# Global exception handler
@app.exception_handler(Exception)
async def global_exception_handler(request: Request, exc: Exception):
    logger.error(f"Global exception: {exc}")
    logger.error(f"Traceback: {traceback.format_exc()}")
    
    return JSONResponse(
        status_code=500,
        content={
            "error": "Internal server error",
            "message": "Beklenmeyen bir hata oluştu. Lütfen daha sonra tekrar deneyin.",
            "request_id": getattr(request.state, 'request_id', 'unknown')
        }
    )

# Health check endpoint
@app.get("/health")
async def health_check():
    """Health check endpoint"""
    return {
        "status": "healthy",
        "timestamp": datetime.utcnow().isoformat(),
        "services": {
            "firebase": firebase_manager.is_ready(),
            "encryption": encryption_manager.is_ready()
        }
    }

# CSRF Token endpoint
@app.get("/api/csrf-token")
async def get_csrf_token():
    """Get CSRF token for forms"""
    token = secrets.token_urlsafe(32)
    return {"csrf_token": token}

# Authentication endpoints
@app.post("/api/auth/register")
async def register_user(user_data: UserRegister):
    """Register a new user"""
    try:
        print(f"🔄 Registration attempt for: {user_data.email}")
        
        # Input validation is now handled by Pydantic models
        
        # Register user
        user = await auth_manager.register_user(
            email=user_data.email,
            password=user_data.password,
            full_name=user_data.full_name
        )
        
        if not user:
            print(f"❌ Registration failed for: {user_data.email}")
            raise HTTPException(
                status_code=400,
                detail="Bu e-posta adresi zaten kullanılıyor"
            )
        
        # Create access token
        access_token = auth_manager.create_access_token(
            data={"sub": user.uid, "email": user.email}
        )
        
        print(f"✅ Registration successful for: {user_data.email}")
        
        return {
            "access_token": access_token,
            "token_type": "bearer",
            "user": {
                "uid": user.uid,
                "email": user.email,
                "full_name": user.full_name,
                "role": user.role,
                "subscription_status": user.subscription_status,
                "trial_end_date": user.trial_end_date.isoformat() if user.trial_end_date else None
            }
        }
        
    except HTTPException:
        raise
    except ValueError as e:
        print(f"❌ Validation error for {user_data.email}: {e}")
        raise HTTPException(
            status_code=400,
            detail=str(e)
        )
    except Exception as e:
        print(f"❌ Registration error for {user_data.email}: {e}")
        raise HTTPException(
            status_code=500,
            detail="Kayıt işlemi sırasında hata oluştu"
        )

@app.post("/api/auth/login")
async def login_user(user_data: UserLogin):
    """Login user"""
    try:
        print(f"🔄 Login attempt for: {user_data.email}")
        
        # Input validation is now handled by Pydantic models
        
        # Authenticate user
        user = await auth_manager.authenticate_user(
            email=user_data.email,
            password=user_data.password
        )
        
        if not user:
            print(f"❌ Authentication failed for: {user_data.email}")
            raise HTTPException(
                status_code=401,
                detail="E-posta veya şifre hatalı"
            )
        
        # Check if user is blocked
        if user.is_blocked:
            print(f"❌ Blocked user login attempt: {user_data.email}")
            raise HTTPException(
                status_code=403,
                detail="Hesabınız engellenmiş. Lütfen destek ile iletişime geçin."
            )
        
        # Create access token
        access_token = auth_manager.create_access_token(
            data={"sub": user.uid, "email": user.email}
        )
        
        print(f"✅ Login successful for: {user_data.email} (Role: {user.role})")
        
        return {
            "access_token": access_token,
            "token_type": "bearer",
            "user": {
                "uid": user.uid,
                "email": user.email,
                "full_name": user.full_name,
                "role": user.role,
                "subscription_status": user.subscription_status,
                "trial_end_date": user.trial_end_date.isoformat() if user.trial_end_date else None,
                "subscription_end_date": user.subscription_end_date.isoformat() if user.subscription_end_date else None
            }
        }
        
    except HTTPException:
        raise
    except ValueError as e:
        print(f"❌ Validation error for {user_data.email}: {e}")
        raise HTTPException(
            status_code=400,
            detail=str(e)
        )
    except Exception as e:
        print(f"❌ Login error for {user_data.email}: {e}")
        raise HTTPException(
            status_code=500,
            detail="Giriş işlemi sırasında hata oluştu"
        )

# User profile endpoint
@app.get("/api/user/profile")
async def get_user_profile(current_user: UserData = Depends(get_current_user)):
    """Get current user profile"""
    return {
        "uid": current_user.uid,
        "email": current_user.email,
        "full_name": current_user.full_name,
        "role": current_user.role,
        "subscription_status": current_user.subscription_status,
        "trial_end_date": current_user.trial_end_date.isoformat() if current_user.trial_end_date else None,
        "subscription_end_date": current_user.subscription_end_date.isoformat() if current_user.subscription_end_date else None,
        "created_at": current_user.created_at.isoformat() if current_user.created_at else None
    }

# Bot control endpoints
@app.post("/api/bot/start")
async def start_bot(current_user: UserData = Depends(get_active_user)):
    """Start user's trading bot"""
    try:
        result = await bot_manager.start_user_bot(current_user.uid)
        return {"message": "Bot başlatıldı", "status": result}
    except Exception as e:
        logger.error(f"Bot start error for user {current_user.uid}: {e}")
        raise HTTPException(status_code=500, detail="Bot başlatılamadı")

@app.post("/api/bot/stop")
async def stop_bot(current_user: UserData = Depends(get_current_user)):
    """Stop user's trading bot"""
    try:
        result = await bot_manager.stop_user_bot(current_user.uid)
        return {"message": "Bot durduruldu", "status": result}
    except Exception as e:
        logger.error(f"Bot stop error for user {current_user.uid}: {e}")
        raise HTTPException(status_code=500, detail="Bot durdurulamadı")

@app.get("/api/bot/status")
async def get_bot_status(current_user: UserData = Depends(get_current_user)):
    """Get user's bot status"""
    try:
        status = await bot_manager.get_user_bot_status(current_user.uid)
        return {"status": status}
    except Exception as e:
        logger.error(f"Bot status error for user {current_user.uid}: {e}")
        raise HTTPException(status_code=500, detail="Bot durumu alınamadı")

# Admin endpoints
@app.get("/api/admin/stats")
async def get_admin_stats(current_admin: UserData = Depends(get_current_admin)):
    """Get admin statistics"""
    try:
        stats = await firebase_manager.get_admin_stats()
        return stats
    except Exception as e:
        logger.error(f"Admin stats error: {e}")
        raise HTTPException(status_code=500, detail="İstatistikler alınamadı")

# Static files
app.mount("/static", StaticFiles(directory="static"), name="static")

# Serve HTML pages
@app.get("/")
async def serve_index():
    return FileResponse("static/index.html")

@app.get("/admin")
async def serve_admin():
    return FileResponse("static/admin.html")

@app.get("/about")
async def serve_about():
    return FileResponse("static/about.html")

@app.get("/contact")
async def serve_contact():
    return FileResponse("static/contact.html")

@app.get("/privacy")
async def serve_privacy():
    return FileResponse("static/privacy.html")

@app.get("/terms")
async def serve_terms():
    return FileResponse("static/terms.html")

@app.get("/risk")
async def serve_risk():
    return FileResponse("static/risk.html")

@app.get("/api-guide")
async def serve_api_guide():
    return FileResponse("static/api-guide.html")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
