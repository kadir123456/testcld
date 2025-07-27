from datetime import datetime, timedelta
from typing import Optional
from jose import JWTError, jwt
from passlib.context import CryptContext
from fastapi import HTTPException, status, Depends
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
import secrets
import uuid
import logging
from .config import settings
from .database import firebase_manager
from .models import UserData, UserRole
import firebase_admin
from firebase_admin import auth as firebase_auth

# Setup logging
logger = logging.getLogger(__name__)

# Password hashing
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# JWT token scheme
security = HTTPBearer()

class AuthManager:
    def __init__(self):
        self.pwd_context = pwd_context
        self.max_login_attempts = 5
        self.lockout_duration = 3600  # 1 hour
    
    def verify_password(self, plain_password: str, hashed_password: str) -> bool:
        """Verify a password against its hash"""
        try:
            return self.pwd_context.verify(plain_password, hashed_password)
        except Exception as e:
            logger.error(f"Password verification error: {e}")
            return False
    
    def get_password_hash(self, password: str) -> str:
        """Hash a password"""
        try:
            return self.pwd_context.hash(password)
        except Exception as e:
            logger.error(f"Password hashing error: {e}")
            raise ValueError("Password hashing failed")
    
    def create_access_token(self, data: dict, expires_delta: Optional[timedelta] = None) -> str:
        """Create a JWT access token"""
        try:
            to_encode = data.copy()
            if expires_delta:
                expire = datetime.utcnow() + expires_delta
            else:
                expire = datetime.utcnow() + timedelta(hours=settings.JWT_EXPIRE_HOURS)
            
            to_encode.update({
                "exp": expire,
                "iat": datetime.utcnow(),
                "jti": str(uuid.uuid4())  # JWT ID for token tracking
            })
            encoded_jwt = jwt.encode(to_encode, settings.JWT_SECRET_KEY, algorithm=settings.JWT_ALGORITHM)
            return encoded_jwt
        except Exception as e:
            logger.error(f"Token creation error: {e}")
            raise ValueError("Token creation failed")
    
    def verify_token(self, token: str) -> Optional[dict]:
        """Verify and decode a JWT token"""
        try:
            payload = jwt.decode(token, settings.JWT_SECRET_KEY, algorithms=[settings.JWT_ALGORITHM])
            
            # Check token expiration
            exp = payload.get("exp")
            if exp and datetime.utcnow().timestamp() > exp:
                logger.warning("Token expired")
                return None
                
            return payload
        except JWTError:
            logger.warning("Invalid JWT token")
            return None
        except Exception as e:
            logger.error(f"Token verification error: {e}")
            return None
    
    async def register_user(self, email: str, password: str, full_name: str) -> Optional[UserData]:
        """Register a new user"""
        try:
            # Check if user already exists
            existing_user = await firebase_manager.get_user_by_email(email)
            if existing_user:
                return None
            
            # Hash password
            password_hash = self.get_password_hash(password)
            
            # Create user data
            user_data = UserData(
                uid=str(uuid.uuid4()),
                email=email,
                full_name=full_name,
                password_hash=password_hash,
                role=UserRole.USER,
                subscription_status="trial",
                trial_end_date=datetime.utcnow() + timedelta(days=settings.TRIAL_DAYS),
                created_at=datetime.utcnow()
            )
            
            # Save to database
            success = await firebase_manager.create_user(user_data)
            if success:
                return user_data
            return None
            
        except Exception as e:
            logger.error(f"User registration error: {e}")
            return None
    
    async def authenticate_user(self, email: str, password: str) -> Optional[UserData]:
        """Authenticate user with email and password"""
        try:
            user = await firebase_manager.get_user_by_email(email)
            if not user:
                return None
            
            if not self.verify_password(password, user.password_hash):
                return None
            
            return user
            
        except Exception as e:
            logger.error(f"User authentication error: {e}")
            return None

# Global auth manager instance
auth_manager = AuthManager()

async def get_current_user(credentials: HTTPAuthorizationCredentials = Depends(security)) -> UserData:
    """Get current authenticated user"""
    try:
        payload = auth_manager.verify_token(credentials.credentials)
        if not payload:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid authentication credentials",
                headers={"WWW-Authenticate": "Bearer"},
            )
        
        user_uid = payload.get("sub")
        if not user_uid:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid token payload",
                headers={"WWW-Authenticate": "Bearer"},
            )
        
        user = await firebase_manager.get_user_data(user_uid)
        if not user:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="User not found",
                headers={"WWW-Authenticate": "Bearer"},
            )
        
        return user
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Get current user error: {e}")
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Authentication failed",
            headers={"WWW-Authenticate": "Bearer"},
        )

async def get_current_admin(current_user: UserData = Depends(get_current_user)) -> UserData:
    """Get current admin user"""
    if current_user.role != UserRole.ADMIN:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Admin access required"
        )
    return current_user

async def get_active_user(current_user: UserData = Depends(get_current_user)) -> UserData:
    """Get current user with active subscription"""
    if current_user.subscription_status not in ['trial', 'active']:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Active subscription required"
        )
    return current_user
