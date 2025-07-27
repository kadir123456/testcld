@@ .. @@
 import firebase_admin
 from firebase_admin import credentials, db, auth
 import json
 import os
+import logging
+import asyncio
+from contextlib import asynccontextmanager
 from typing import Optional, Dict, Any, List
 from datetime import datetime, timedelta
 from .config import settings
 from .models import UserData, TradeData, PaymentRequest, SubscriptionStatus, BotStatus
 import uuid

+# Setup logging
+logger = logging.getLogger(__name__)

 class FirebaseManager:
     def __init__(self):
         self.db_ref = None
         self.initialized = False
+        self.connection_pool = {}
+        self.retry_count = 3
+        self.retry_delay = 1
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
-                    print("✅ Firebase Admin SDK initialized successfully")
+                    logger.info("Firebase Admin SDK initialized successfully")
                 else:
                     raise ValueError("Firebase credentials not found in environment variables")
             
             self.db_ref = db.reference()
             self.initialized = True
             
         except Exception as e:
-            print(f"❌ Firebase initialization error: {e}")
+            logger.error(f"Firebase initialization error: {e}")
             self.initialized = False
+    
+    async def _retry_operation(self, operation, *args, **kwargs):
+        """Retry database operations with exponential backoff"""
+        for attempt in range(self.retry_count):
+            try:
+                return await operation(*args, **kwargs)
+            except Exception as e:
+                if attempt == self.retry_count - 1:
+                    logger.error(f"Operation failed after {self.retry_count} attempts: {e}")
+                    raise
+                
+                wait_time = self.retry_delay * (2 ** attempt)
+                logger.warning(f"Operation failed, retrying in {wait_time}s: {e}")
+                await asyncio.sleep(wait_time)
     
     def is_ready(self) -> bool:
         return self.initialized and self.db_ref is not None