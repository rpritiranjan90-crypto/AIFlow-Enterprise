import uuid
from datetime import datetime

from sqlalchemy import Column, DateTime, ForeignKey, String

from app.core.database import Base


class ApiKey(Base):
    __tablename__ = "api_keys"

    id = Column(String, primary_key=True, default=lambda: f"key_{uuid.uuid4().hex[:12]}")
    workspace_id = Column(String, ForeignKey("workspaces.id", index=True), nullable=False)
    user_id = Column(String, ForeignKey("users.id", index=True), nullable=False)
    name = Column(String, nullable=False)
    key_prefix = Column(String, nullable=False)
    hashed_key = Column(String, nullable=False)
    scopes = Column(String, default="all")
    expires_at = Column(DateTime, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    last_used_at = Column(DateTime, nullable=True)
