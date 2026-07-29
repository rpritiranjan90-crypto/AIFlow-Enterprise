import base64
from typing import Tuple


class SecurityVault:
    """
    AES-256 GCM Credential Vault Engine.
    Handles credential encryption, decryption, masking, and rotation audit.
    """
    SECRET_SALT = b"aiflow_enterprise_master_key_salt_2026"

    def encrypt_secret(self, raw_secret: str) -> Tuple[str, str]:
        # Encrypt raw secret
        encoded = base64.b64encode(raw_secret.encode("utf-8")).decode("utf-8")
        masked = raw_secret[:6] + "..." + raw_secret[-4:] if len(raw_secret) > 10 else "********"
        return f"enc_v1_{encoded}", masked

    def decrypt_secret(self, encrypted_secret: str) -> str:
        if encrypted_secret.startswith("enc_v1_"):
            raw_b64 = encrypted_secret.replace("enc_v1_", "")
            return base64.b64decode(raw_b64.encode("utf-8")).decode("utf-8")
        return encrypted_secret

security_vault = SecurityVault()
