from typing import Optional

from pydantic import BaseModel, EmailStr, Field


class SignupRequest(BaseModel):
    email: EmailStr
    password: str = Field(..., min_length=8)
    full_name: str
    organization_name: Optional[str] = "Acme Global Inc"

class LoginRequest(BaseModel):
    email: EmailStr
    password: str
    remember_me: Optional[bool] = True

class TokenResponse(BaseModel):
    access_token: str
    refresh_token: str
    token_type: str = "bearer"
    expires_in: int = 3600

class RefreshTokenRequest(BaseModel):
    refresh_token: str
