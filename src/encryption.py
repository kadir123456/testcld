"""
Encryption Manager - API key encryption/decryption
"""
import logging
from cryptography.fernet import Fernet
from .config import settings

logger = logging.getLogger(__name__)

class EncryptionManager:
    def __init__(self):
        self.cipher = settings.fernet_cipher
        self.ready = self.cipher is not None
    
    def encrypt_api_key(self, api_key: str) -> str:
        """Encrypt API key"""
        try:
            if not self.cipher:
                logger.warning("Encryption not available, storing key as-is")
                return api_key
            
            encrypted = self.cipher.encrypt(api_key.encode())
            return encrypted.decode()
        except Exception as e:
            logger.error(f"Encryption error: {e}")
            return api_key
    
    def decrypt_api_key(self, encrypted_key: str) -> str:
        """Decrypt API key"""
        try:
            if not self.cipher:
                logger.warning("Encryption not available, returning key as-is")
                return encrypted_key
            
            decrypted = self.cipher.decrypt(encrypted_key.encode())
            return decrypted.decode()
        except Exception as e:
            logger.error(f"Decryption error: {e}")
            return encrypted_key
    
    def is_ready(self) -> bool:
        """Check if encryption is ready"""
        return self.ready

# Global encryption manager instance
encryption_manager = EncryptionManager()
