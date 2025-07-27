import os
from dotenv import load_dotenv
from cryptography.fernet import Fernet
import secrets

load_dotenv()

class Settings:
    # --- Firebase Configuration ---
    FIREBASE_CREDENTIALS_JSON: str = os.getenv("FIREBASE_CREDENTIALS_JSON")
    FIREBASE_DATABASE_URL: str = os.getenv("FIREBASE_DATABASE_URL", "https://aviatoronline-6c2b4-default-rtdb.firebaseio.com")
    
    # --- Encryption ---
    ENCRYPTION_KEY: str = os.getenv("ENCRYPTION_KEY") or Fernet.generate_key().decode()  # Master key for API encryption
    
    # --- Security ---
    SECRET_KEY: str = os.getenv("SECRET_KEY") or secrets.token_urlsafe(32)
    CSRF_SECRET_KEY: str = os.getenv("CSRF_SECRET_KEY") or secrets.token_urlsafe(32)
    
    # --- Admin Configuration ---
    ADMIN_EMAIL: str = os.getenv("ADMIN_EMAIL", "bilwininc@gmail.com")
    ADMIN_PASSWORD_HASH: str = os.getenv("ADMIN_PASSWORD_HASH", "$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBdXzgVB/VGO5i")  # Default: admin123456
    
    @classmethod
    def get_admin_password_hash(cls) -> str:
        """Get admin password hash, create from plain password if needed"""
        # If ADMIN_PASSWORD is set (plain text), hash it
        plain_password = os.getenv("ADMIN_PASSWORD")
        if plain_password:
            from passlib.context import CryptContext
            pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
            return pwd_context.hash(plain_password)
        
        # Otherwise use the hash directly
        return cls.ADMIN_PASSWORD_HASH
    
    # --- Payment Configuration ---
    USDT_WALLET_ADDRESS: str = os.getenv("USDT_WALLET_ADDRESS", "TYourUSDTWalletAddressHere")
    
    # --- JWT Configuration ---
    JWT_SECRET_KEY: str = os.getenv("JWT_SECRET_KEY") or secrets.token_urlsafe(32)
    JWT_ALGORITHM: str = "HS256"
    JWT_EXPIRE_HOURS: int = int(os.getenv("JWT_EXPIRE_HOURS", "24"))
    
    # --- Trading Configuration ---
    LEVERAGE: int = int(os.getenv("DEFAULT_LEVERAGE", "10"))
    ORDER_SIZE_USDT: float = float(os.getenv("DEFAULT_ORDER_SIZE_USDT", "25.0"))
    TIMEFRAME: str = "15m"
    STOP_LOSS_PERCENT: float = float(os.getenv("DEFAULT_STOP_LOSS_PERCENT", "0.04"))
    
    # --- Subscription Configuration ---
    TRIAL_DAYS: int = int(os.getenv("TRIAL_DAYS", "7"))
    SUBSCRIPTION_PRICE_USDT: float = float(os.getenv("SUBSCRIPTION_PRICE_USDT", "10.0"))
    SUBSCRIPTION_DAYS: int = int(os.getenv("SUBSCRIPTION_DAYS", "30"))
    
    # --- Binance Configuration ---
    BINANCE_BASE_URL_LIVE = "https://fapi.binance.com"
    BINANCE_BASE_URL_TEST = "https://testnet.binancefuture.com"
    BINANCE_WS_URL_LIVE = "wss://fstream.binance.com"
    BINANCE_WS_URL_TEST = "wss://stream.binancefuture.com"
    
    # --- Rate Limiting ---
    RATE_LIMIT_REQUESTS: int = int(os.getenv("RATE_LIMIT_REQUESTS", "100"))
    RATE_LIMIT_WINDOW: int = int(os.getenv("RATE_LIMIT_WINDOW", "3600"))  # 1 hour
    
    # --- Security ---
    ALLOWED_HOSTS: list = ["ezyago.com", "www.ezyago.com", "*.onrender.com"] if os.getenv("ENVIRONMENT") == "production" else ["localhost", "127.0.0.1"]
    
    # --- Environment ---
    ENVIRONMENT: str = os.getenv("ENVIRONMENT", "development")
    
    # --- Logging ---
    LOG_LEVEL: str = os.getenv("LOG_LEVEL", "INFO")
    
    # --- Email Configuration (for future use) ---
    SMTP_SERVER: str = os.getenv("SMTP_SERVER", "")
    SMTP_PORT: int = int(os.getenv("SMTP_PORT", "587"))
    SMTP_USERNAME: str = os.getenv("SMTP_USERNAME", "")
    SMTP_PASSWORD: str = os.getenv("SMTP_PASSWORD", "")
    
    def validate_config(self):
        """Validate critical configuration"""
        errors = []
        
        if not self.FIREBASE_CREDENTIALS_JSON:
            errors.append("FIREBASE_CREDENTIALS_JSON is required")
        
        if not self.FIREBASE_DATABASE_URL:
            errors.append("FIREBASE_DATABASE_URL is required")
        
        if self.ENVIRONMENT == "production":
            if self.JWT_SECRET_KEY == "your-secret-key-change-this":
                errors.append("JWT_SECRET_KEY must be changed in production")
            
            if not self.USDT_WALLET_ADDRESS or self.USDT_WALLET_ADDRESS == "TYourUSDTWalletAddressHere":
                errors.append("USDT_WALLET_ADDRESS must be set in production")
        
        if errors:
            raise ValueError(f"Configuration errors: {', '.join(errors)}")
    
    @property
    def fernet_cipher(self):
        """Returns Fernet cipher for encryption/decryption"""
        if not self.ENCRYPTION_KEY:
            print("⚠️ ENCRYPTION_KEY not set, generating temporary key")
            # Generate a temporary key for development
            temp_key = Fernet.generate_key()
            return Fernet(temp_key)
        
        try:
            # Try to use the provided key (handle both string and bytes)
            if isinstance(self.ENCRYPTION_KEY, str):
                key = self.ENCRYPTION_KEY.encode()
            else:
                key = self.ENCRYPTION_KEY
            return Fernet(key)
        except Exception as e:
            print(f"⚠️ Invalid ENCRYPTION_KEY: {e}")
            # Generate a temporary key as fallback
            temp_key = Fernet.generate_key()
            return Fernet(temp_key)

settings = Settings()

# Validate configuration on startup
try:
    settings.validate_config()
    print("✅ Configuration validation passed")
except ValueError as e:
    print(f"❌ Configuration validation failed: {e}")
    if settings.ENVIRONMENT == "production":
        raise