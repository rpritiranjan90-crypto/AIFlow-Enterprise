import uuid
from datetime import datetime

from sqlalchemy import Column, DateTime, String

from app.core.database import Base


class Organization(Base):
    __tablename__ = "organizations"

    id = Column(String, primary_key=True, default=lambda: f"org_{uuid.uuid4().hex[:12]}")
    name = Column(String, nullable=False)
    slug = Column(String, unique=True, index=True, nullable=False)
    avatar_url = Column(String, nullable=True)
    billing_email = Column(String, nullable=False)
    plan_type = Column(String, default="enterprise")
    created_at = Column(DateTime, default=datetime.utcnow)
