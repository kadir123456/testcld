"""
Bot Manager - Multi-user bot instance management
"""
import asyncio
import logging
from typing import Dict, Optional
from datetime import datetime
from .database import firebase_manager
from .models import BotStatus

logger = logging.getLogger(__name__)

class BotManager:
    def __init__(self):
        self.user_bots: Dict[str, dict] = {}
        self.cleanup_task = None
    
    async def start_user_bot(self, user_uid: str) -> str:
        """Start bot for a specific user"""
        try:
            # Check if user has active subscription
            user_data = await firebase_manager.get_user_data(user_uid)
            if not user_data or user_data.subscription_status not in ['trial', 'active']:
                return "subscription_required"
            
            # Check if bot is already running
            if user_uid in self.user_bots and self.user_bots[user_uid].get('status') == 'running':
                return "already_running"
            
            # Start bot instance
            self.user_bots[user_uid] = {
                'status': 'running',
                'started_at': datetime.utcnow(),
                'last_activity': datetime.utcnow()
            }
            
            # Update database
            await firebase_manager.update_user_bot_status(user_uid, BotStatus.RUNNING)
            
            logger.info(f"Bot started for user: {user_uid}")
            return "started"
            
        except Exception as e:
            logger.error(f"Error starting bot for user {user_uid}: {e}")
            return "error"
    
    async def stop_user_bot(self, user_uid: str) -> str:
        """Stop bot for a specific user"""
        try:
            if user_uid in self.user_bots:
                self.user_bots[user_uid]['status'] = 'stopped'
                
            # Update database
            await firebase_manager.update_user_bot_status(user_uid, BotStatus.STOPPED)
            
            logger.info(f"Bot stopped for user: {user_uid}")
            return "stopped"
            
        except Exception as e:
            logger.error(f"Error stopping bot for user {user_uid}: {e}")
            return "error"
    
    async def get_user_bot_status(self, user_uid: str) -> str:
        """Get bot status for a specific user"""
        try:
            if user_uid in self.user_bots:
                return self.user_bots[user_uid]['status']
            return "stopped"
        except Exception as e:
            logger.error(f"Error getting bot status for user {user_uid}: {e}")
            return "error"
    
    async def stop_all_bots(self):
        """Stop all running bots"""
        try:
            for user_uid in list(self.user_bots.keys()):
                await self.stop_user_bot(user_uid)
            logger.info("All bots stopped")
        except Exception as e:
            logger.error(f"Error stopping all bots: {e}")
    
    async def cleanup_inactive_bots(self):
        """Background task to cleanup inactive bots"""
        while True:
            try:
                current_time = datetime.utcnow()
                inactive_users = []
                
                for user_uid, bot_info in self.user_bots.items():
                    last_activity = bot_info.get('last_activity', current_time)
                    if (current_time - last_activity).total_seconds() > 3600:  # 1 hour
                        inactive_users.append(user_uid)
                
                for user_uid in inactive_users:
                    await self.stop_user_bot(user_uid)
                    del self.user_bots[user_uid]
                
                await asyncio.sleep(300)  # Check every 5 minutes
                
            except Exception as e:
                logger.error(f"Bot cleanup error: {e}")
                await asyncio.sleep(60)  # Retry after 1 minute

# Global bot manager instance
bot_manager = BotManager()
