from datetime import datetime
from typing import Optional

from pydantic import BaseModel


class WorkspaceCreateRequest(BaseModel):
    name: str
    slug: str
    description: Optional[str] = None

class WorkspaceUpdateRequest(BaseModel):
    name: Optional[str] = None
    description: Optional[str] = None

class WorkspaceResponse(BaseModel):
    id: str
    organization_id: str
    name: str
    slug: str
    description: Optional[str] = None
    role: Optional[str] = "owner"
    created_at: datetime

    class Config:
        from_attributes = True

class WorkspaceMemberResponse(BaseModel):
    id: str
    name: str
    email: str
    role: str
    status: str
