import firebase_admin
from firebase_admin import credentials, db, auth
import json
import os
import logging
import asyncio
from contextlib import asynccontextmanager
from typing import Optional, Dict, Any, List
from datetime import datetime, timedelta
from .config import settings
from .models import UserData, TradeData, PaymentRequest, SubscriptionStatus, BotStatus
import uuid

# Setup logging
logger = logging.getLogger(__name__)

class FirebaseManager:
    def __init__(self):
        self.db_ref = None
        self.initialized = False
        self.connection_pool = {}
        self.retry_count = 3
        self.retry_delay = 1
        self._initialize_firebase()
    
    def _initialize_firebase(self):
        """Initialize Firebase Admin SDK"""
        try:
            if not firebase_admin._apps:
                if settings.FIREBASE_CREDENTIALS_JSON and settings.FIREBASE_DATABASE_URL:
                    cred_dict = json.loads(settings.FIREBASE_CREDENTIALS_JSON)
                    cred = credentials.Certificate(cred_dict)
                    firebase_admin.initialize_app(cred, {
                        'databaseURL': settings.FIREBASE_DATABASE_URL
                    })
                    logger.info("Firebase Admin SDK initialized successfully")
                else:
                    raise ValueError("Firebase credentials not found in environment variables")
            
            self.db_ref = db.reference()
            self.initialized = True
            
        except Exception as e:
            logger.error(f"Firebase initialization error: {e}")
            self.initialized = False
    
    async def _retry_operation(self, operation, *args, **kwargs):
        """Retry database operations with exponential backoff"""
        for attempt in range(self.retry_count):
            try:
                return await operation(*args, **kwargs)
            except Exception as e:
                if attempt == self.retry_count - 1:
                    logger.error(f"Operation failed after {self.retry_count} attempts: {e}")
                    raise
                
                wait_time = self.retry_delay * (2 ** attempt)
                logger.warning(f"Operation failed, retrying in {wait_time}s: {e}")
                await asyncio.sleep(wait_time)
    
    def is_ready(self) -> bool:
        return self.initialized and self.db_ref is not None
    
    async def create_user(self, user_data: UserData) -> bool:
        """Create a new user in Firebase"""
        try:
            user_dict = {
                'uid': user_data.uid,
                'email': user_data.email,
                'full_name': user_data.full_name,
                'password_hash': user_data.password_hash,
                'role': user_data.role,
                'subscription_status': user_data.subscription_status,
                'trial_end_date': user_data.trial_end_date.isoformat() if user_data.trial_end_date else None,
                'created_at': user_data.created_at.isoformat() if user_data.created_at else None,
                'is_blocked': False
            }
            
            self.db_ref.child('users').child(user_data.uid).set(user_dict)
            return True
            
        except Exception as e:
            logger.error(f"Error creating user: {e}")
            return False
    
    async def get_user_by_email(self, email: str) -> Optional[UserData]:
        """Get user by email"""
        try:
            users_ref = self.db_ref.child('users')
            users = users_ref.order_by_child('email').equal_to(email).get()
            
            if users:
                user_id, user_data = next(iter(users.items()))
                return UserData(
                    uid=user_data['uid'],
                    email=user_data['email'],
                    full_name=user_data['full_name'],
                    password_hash=user_data['password_hash'],
                    role=user_data['role'],
                    subscription_status=user_data['subscription_status'],
                    trial_end_date=datetime.fromisoformat(user_data['trial_end_date']) if user_data.get('trial_end_date') else None,
                    created_at=datetime.fromisoformat(user_data['created_at']) if user_data.get('created_at') else None,
                    is_blocked=user_data.get('is_blocked', False)
                )
            return None
            
        except Exception as e:
            logger.error(f"Error getting user by email: {e}")
            return None
    
    async def get_user_data(self, uid: str) -> Optional[UserData]:
        """Get user data by UID"""
        try:
            user_ref = self.db_ref.child('users').child(uid)
            user_data = user_ref.get()
            
            if user_data:
                return UserData(
                    uid=user_data['uid'],
                    email=user_data['email'],
                    full_name=user_data['full_name'],
                    password_hash=user_data['password_hash'],
                    role=user_data['role'],
                    subscription_status=user_data['subscription_status'],
                    trial_end_date=datetime.fromisoformat(user_data['trial_end_date']) if user_data.get('trial_end_date') else None,
                    created_at=datetime.fromisoformat(user_data['created_at']) if user_data.get('created_at') else None,
                    is_blocked=user_data.get('is_blocked', False)
                )
            return None
            
        except Exception as e:
            logger.error(f"Error getting user data: {e}")
            return None
    
    async def update_user_bot_status(self, uid: str, status: BotStatus) -> bool:
        """Update user's bot status"""
        try:
            user_ref = self.db_ref.child('users').child(uid)
            user_ref.child('bot_status').set(status.value)
            return True
            
        except Exception as e:
            logger.error(f"Error updating bot status: {e}")
            return False
    
    async def get_admin_stats(self) -> Dict[str, Any]:
        """Get admin statistics"""
        try:
            users_ref = self.db_ref.child('users')
            users = users_ref.get() or {}
            
            total_users = len(users)
            active_subscriptions = sum(1 for user in users.values() if user.get('subscription_status') == 'active')
            trial_users = sum(1 for user in users.values() if user.get('subscription_status') == 'trial')
            
            return {
                'total_users': total_users,
                'active_subscriptions': active_subscriptions,
                'trial_users': trial_users,
                'revenue': active_subscriptions * settings.SUBSCRIPTION_PRICE_USDT
            }
            
        except Exception as e:
            logger.error(f"Error getting admin stats: {e}")
            return {
                'total_users': 0,
                'active_subscriptions': 0,
                'trial_users': 0,
                'revenue': 0
            }

# Global Firebase manager instance
firebase_manager = FirebaseManager()