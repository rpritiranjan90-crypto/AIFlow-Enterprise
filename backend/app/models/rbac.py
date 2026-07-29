import uuid
from datetime import datetime

from sqlalchemy import Column, DateTime, ForeignKey, String

from app.core.database import Base


class Role(Base):
    __tablename__ = "roles"

    id = Column(String, primary_key=True, default=lambda: f"role_{uuid.uuid4().hex[:8]}")
    name = Column(String, unique=True, nullable=False) # Owner, Admin, Member, Viewer
    description = Column(String, nullable=True)

class Permission(Base):
    __tablename__ = "permissions"

    id = Column(String, primary_key=True, default=lambda: f"perm_{uuid.uuid4().hex[:8]}")
    code = Column(String, unique=True, nullable=False) # workflow:create, workspace:manage
    description = Column(String, nullable=True)

class UserWorkspaceRole(Base):
    __tablename__ = "user_workspace_roles"

    id = Column(String, primary_key=True, default=lambda: f"uwr_{uuid.uuid4().hex[:12]}")
    user_id = Column(String, ForeignKey("users.id", index=True), nullable=False)
    workspace_id = Column(String, ForeignKey("workspaces.id", index=True), nullable=False)
    role_id = Column(String, ForeignKey("roles.id"), nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)
