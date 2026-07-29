from datetime import datetime, timedelta
from typing import Dict, Optional

import jwt
from passlib.context import CryptContext

from app.core.config import settings

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
failed_attempts_tracker: Dict[str, Dict] = {}
revoked_tokens = set()

def hash_password(password: str) -> str:
    return pwd_context.hash(password)

def verify_password(plain_password: str, hashed_password: str) -> bool:
    return pwd_context.verify(plain_password, hashed_password)

def check_account_lockout(email: str) -> bool:
    """Returns True if account is currently locked out due to repeated failed logins"""
    record = failed_attempts_tracker.get(email)
    if not record:
        return False
    if record["count"] >= settings.MAX_FAILED_LOGIN_ATTEMPTS:
        lockout_expiry = record["last_attempt"] + timedelta(minutes=settings.LOCKOUT_DURATION_MINUTES)
        if datetime.utcnow() < lockout_expiry:
            return True
        else:
            # Reset after expiry
            failed_attempts_tracker.pop(email, None)
            return False
    return False

def record_failed_login(email: str):
    record = failed_attempts_tracker.get(email, {"count": 0, "last_attempt": datetime.utcnow()})
    record["count"] += 1
    record["last_attempt"] = datetime.utcnow()
    failed_attempts_tracker[email] = record

def reset_failed_logins(email: str):
    failed_attempts_tracker.pop(email, None)

def create_access_token(subject: str, expires_delta: Optional[timedelta] = None) -> str:
    import uuid
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode = {"exp": expire, "sub": str(subject), "type": "access", "jti": str(uuid.uuid4())}
    return jwt.encode(to_encode, settings.SECRET_KEY, algorithm="HS256")

def create_refresh_token(subject: str) -> str:
    import uuid
    expire = datetime.utcnow() + timedelta(days=settings.REFRESH_TOKEN_EXPIRE_DAYS)
    to_encode = {"exp": expire, "sub": str(subject), "type": "refresh", "jti": str(uuid.uuid4())}
    return jwt.encode(to_encode, settings.SECRET_KEY, algorithm="HS256")

def decode_token(token: str) -> Optional[dict]:
    try:
        payload = jwt.decode(token, settings.SECRET_KEY, algorithms=["HS256"])
        # Check revocation
        jti = payload.get("jti")
        if jti and jti in revoked_tokens:
            return None
        return payload
    except jwt.PyJWTError:
        return None

def revoke_token(jti: str):
    if jti:
        revoked_tokens.add(jti)
