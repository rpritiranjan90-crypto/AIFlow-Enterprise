from datetime import datetime
from typing import Optional

from pydantic import BaseModel, EmailStr


class UserResponse(BaseModel):
    id: str
    email: EmailStr
    full_name: str
    avatar_url: Optional[str] = None
    is_active: bool
    is_superuser: bool
    created_at: datetime

    class Config:
        from_attributes = True
