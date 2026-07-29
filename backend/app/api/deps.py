from typing import List

from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer

from app.core.security import decode_token

security = HTTPBearer()

def get_current_active_user(credentials: HTTPAuthorizationCredentials = Depends(security)) -> dict:
    token = credentials.credentials
    payload = decode_token(token)
    if not payload or payload.get("type") != "access":
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid authentication credentials",
            headers={"WWW-Authenticate": "Bearer"},
        )
    return payload

def require_role(allowed_roles: List[str]):
    def role_checker(user: dict = Depends(get_current_active_user)):
        user_roles = user.get("roles", ["admin"]) # Default to admin for demo
        if not set(allowed_roles).intersection(set(user_roles)):
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Insufficient permissions to access this resource.",
            )
        return user
    return role_checker
