import uuid
from datetime import datetime

from sqlalchemy import Column, DateTime, ForeignKey, String

from app.core.database import Base


class Workspace(Base):
    __tablename__ = "workspaces"

    id = Column(String, primary_key=True, default=lambda: f"ws_{uuid.uuid4().hex[:12]}")
    organization_id = Column(String, ForeignKey("organizations.id"), nullable=False)
    name = Column(String, nullable=False)
    slug = Column(String, index=True, nullable=False)
    description = Column(String, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)
