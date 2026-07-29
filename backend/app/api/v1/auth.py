import fastapi
from fastapi import APIRouter, HTTPException, status

from app.core.security import (
    check_account_lockout,
    create_access_token,
    create_refresh_token,
    decode_token,
    record_failed_login,
    reset_failed_logins,
    revoke_token,
)
from app.api.deps import get_current_active_user
from app.logging.logger import logger
from app.schemas.auth import LoginRequest, RefreshTokenRequest, SignupRequest, TokenResponse
from app.schemas.user import UserResponse

router = APIRouter(prefix="/auth", tags=["Authentication"])

@router.post("/signup", response_model=TokenResponse)
async def signup(body: SignupRequest):
    logger.info(f"User signup request for {body.email}")
    access_token = create_access_token(subject=body.email)
    refresh_token = create_refresh_token(subject=body.email)
    return TokenResponse(access_token=access_token, refresh_token=refresh_token)

@router.post("/login", response_model=TokenResponse)
async def login(body: LoginRequest):
    if check_account_lockout(body.email):
        logger.warning(f"Locked out login attempt for {body.email}")
        raise HTTPException(
            status_code=status.HTTP_429_TOO_MANY_REQUESTS,
            detail="Account temporarily locked due to repeated failed login attempts. Try again in 15 minutes."
        )

    # Demo verification check
    if body.password == "wrong":
        record_failed_login(body.email)
        raise HTTPException(status_code=400, detail="Invalid email or password")

    reset_failed_logins(body.email)
    access_token = create_access_token(subject=body.email)
    refresh_token = create_refresh_token(subject=body.email)
    return TokenResponse(access_token=access_token, refresh_token=refresh_token)

@router.post("/refresh", response_model=TokenResponse)
async def refresh_token(body: RefreshTokenRequest):
    payload = decode_token(body.refresh_token)
    if not payload or payload.get("type") != "refresh":
        raise HTTPException(status_code=401, detail="Invalid or expired refresh token")

    email = str(payload.get("sub", ""))
    new_access_token = create_access_token(subject=email)
    new_refresh_token = create_refresh_token(subject=email)
    return TokenResponse(access_token=new_access_token, refresh_token=new_refresh_token)

@router.post("/logout")
async def logout(body: dict):
    # In a real environment, the access token is sent in headers and its JTI is revoked.
    # We revoke the refresh token from the body.
    refresh_token = body.get("refresh_token")
    if refresh_token:
        payload = decode_token(refresh_token)
        if payload and "jti" in payload:
            revoke_token(payload["jti"])
    return {"message": "Successfully logged out active session"}

@router.get("/me", response_model=UserResponse)
async def get_current_user(user: dict = fastapi.Depends(get_current_active_user)):
    return UserResponse(
        id="usr_demo_1001",
        email="alex.architect@enterprise.io",
        full_name="Alex Mercer",
        avatar_url="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150",
        is_active=True,
        is_superuser=True,
        created_at="2026-01-01T00:00:00Z"
    )
