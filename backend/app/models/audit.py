import uuid
from datetime import datetime

from sqlalchemy import Column, DateTime, ForeignKey, String, Text

from app.core.database import Base


class AuditLog(Base):
    __tablename__ = "audit_logs"

    id = Column(String, primary_key=True, default=lambda: f"audit_{uuid.uuid4().hex[:12]}")
    workspace_id = Column(String, ForeignKey("workspaces.id", index=True), nullable=True)
    user_id = Column(String, ForeignKey("users.id", index=True), nullable=True)
    action = Column(String, nullable=False) # e.g. "auth.login", "workspace.create"
    resource_type = Column(String, nullable=False)
    resource_id = Column(String, nullable=True)
    details = Column(Text, nullable=True) # JSON payload string
    ip_address = Column(String, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)
