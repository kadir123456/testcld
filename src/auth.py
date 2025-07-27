@@ .. @@
 from datetime import datetime, timedelta
 from typing import Optional
 from jose import JWTError, jwt
 from passlib.context import CryptContext
 from fastapi import HTTPException, status, Depends
 from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
 import secrets
 import uuid
+import logging
 from .config import settings
 from .database import firebase_manager
 from .models import UserData, UserRole
 import firebase_admin
 from firebase_admin import auth as firebase_auth

+# Setup logging
+logger = logging.getLogger(__name__)

 # Password hashing
 pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

 # JWT token scheme
 security = HTTPBearer()

 class AuthManager:
     def __init__(self):
         self.pwd_context = pwd_context
+        self.max_login_attempts = 5
+        self.lockout_duration = 3600  # 1 hour
     
     def verify_password(self, plain_password: str, hashed_password: str) -> bool:
         """Verify a password against its hash"""
-        return self.pwd_context.verify(plain_password, hashed_password)
+        try:
+            return self.pwd_context.verify(plain_password, hashed_password)
+        except Exception as e:
+            logger.error(f"Password verification error: {e}")
+            return False
     
     def get_password_hash(self, password: str) -> str:
         """Hash a password"""
-        return self.pwd_context.hash(password)
+        try:
+            return self.pwd_context.hash(password)
+        except Exception as e:
+            logger.error(f"Password hashing error: {e}")
+            raise ValueError("Password hashing failed")
     
     def create_access_token(self, data: dict, expires_delta: Optional[timedelta] = None) -> str:
         """Create a JWT access token"""
-        to_encode = data.copy()
-        if expires_delta:
-            expire = datetime.utcnow() + expires_delta
-        else:
-            expire = datetime.utcnow() + timedelta(hours=settings.JWT_EXPIRE_HOURS)
-        
-        to_encode.update({"exp": expire})
-        encoded_jwt = jwt.encode(to_encode, settings.JWT_SECRET_KEY, algorithm=settings.JWT_ALGORITHM)
-        return encoded_jwt
+        try:
+            to_encode = data.copy()
+            if expires_delta:
+                expire = datetime.utcnow() + expires_delta
+            else:
+                expire = datetime.utcnow() + timedelta(hours=settings.JWT_EXPIRE_HOURS)
+            
+            to_encode.update({
+                "exp": expire,
+                "iat": datetime.utcnow(),
+                "jti": str(uuid.uuid4())  # JWT ID for token tracking
+            })
+            encoded_jwt = jwt.encode(to_encode, settings.JWT_SECRET_KEY, algorithm=settings.JWT_ALGORITHM)
+            return encoded_jwt
+        except Exception as e:
+            logger.error(f"Token creation error: {e}")
+            raise ValueError("Token creation failed")
     
     def verify_token(self, token: str) -> Optional[dict]:
         """Verify and decode a JWT token"""
         try:
             payload = jwt.decode(token, settings.JWT_SECRET_KEY, algorithms=[settings.JWT_ALGORITHM])
+            
+            # Check token expiration
+            exp = payload.get("exp")
+            if exp and datetime.utcnow().timestamp() > exp:
+                logger.warning("Token expired")
+                return None
+                
             return payload
         except JWTError:
+            logger.warning("Invalid JWT token")
             return None
+        except Exception as e:
+            logger.error(f"Token verification error: {e}")
+            return None