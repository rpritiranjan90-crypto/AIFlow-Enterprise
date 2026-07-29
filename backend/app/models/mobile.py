import uuid
from datetime import datetime

from sqlalchemy import Boolean, Column, DateTime, ForeignKey, Integer, String, Text

from app.core.database import Base


class MobileDevice(Base):
    __tablename__ = "mobile_devices"

    id = Column(String, primary_key=True, default=lambda: f"mdev_{uuid.uuid4().hex[:12]}")
    user_id = Column(String, nullable=False, index=True)
    device_name = Column(String, nullable=False)
    platform = Column(String, default="iOS") # iOS, Android
    os_version = Column(String, default="iOS 18.1")
    push_token = Column(String, nullable=True)
    status = Column(String, default="active", index=True) # active, wiped, locked
    last_sync_at = Column(DateTime, default=datetime.utcnow)

class PushNotification(Base):
    __tablename__ = "mobile_push_notifications"

    id = Column(String, primary_key=True, default=lambda: f"pnotif_{uuid.uuid4().hex[:12]}")
    device_id = Column(String, ForeignKey("mobile_devices.id"), nullable=False)
    title = Column(String, nullable=False)
    body = Column(Text, nullable=False)
    type = Column(String, default="Approval") # Approval, Alert, Sync, Security
    is_read = Column(Boolean, default=False)
    created_at = Column(DateTime, default=datetime.utcnow)

class SyncSession(Base):
    __tablename__ = "mobile_sync_sessions"

    id = Column(String, primary_key=True, default=lambda: f"msync_{uuid.uuid4().hex[:12]}")
    device_id = Column(String, ForeignKey("mobile_devices.id"), nullable=False)
    sync_type = Column(String, default="Delta") # Delta, Full
    records_synced = Column(Integer, default=145)
    status = Column(String, default="completed", index=True)
    created_at = Column(DateTime, default=datetime.utcnow)

class OfflineExecution(Base):
    __tablename__ = "mobile_offline_executions"

    id = Column(String, primary_key=True, default=lambda: f"offexec_{uuid.uuid4().hex[:12]}")
    device_id = Column(String, ForeignKey("mobile_devices.id"), nullable=False)
    workflow_id = Column(String, nullable=False, index=True)
    status = Column(String, default="synced", index=True) # queued, synced, conflict
    payload_json = Column(Text, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)

class ApprovalTask(Base):
    __tablename__ = "mobile_approval_tasks"

    id = Column(String, primary_key=True, default=lambda: f"appr_{uuid.uuid4().hex[:12]}")
    title = Column(String, nullable=False)
    requester = Column(String, default="Sarah Jenkins")
    risk_level = Column(String, default="medium") # low, medium, high
    status = Column(String, default="pending", index=True) # pending, approved, rejected
    created_at = Column(DateTime, default=datetime.utcnow)

class DevicePolicy(Base):
    __tablename__ = "mobile_device_policies"

    id = Column(String, primary_key=True, default=lambda: f"dpol_{uuid.uuid4().hex[:12]}")
    name = Column(String, nullable=False)
    biometric_required = Column(Boolean, default=True)
    encryption_mode = Column(String, default="AES-256")
    remote_wipe_allowed = Column(Boolean, default=True)

class EdgeModel(Base):
    __tablename__ = "mobile_edge_models"

    id = Column(String, primary_key=True, default=lambda: f"emod_{uuid.uuid4().hex[:12]}")
    model_name = Column(String, nullable=False) # Llama-3-Micro-1B, MobileOCR-v2, Whisper-Tiny
    size_mb = Column(Integer, default=450)
    quantization = Column(String, default="INT8")
    is_downloaded = Column(Boolean, default=True)

class EdgeInference(Base):
    __tablename__ = "mobile_edge_inferences"

    id = Column(String, primary_key=True, default=lambda: f"einf_{uuid.uuid4().hex[:12]}")
    model_id = Column(String, ForeignKey("mobile_edge_models.id"), nullable=False)
    task_type = Column(String, default="LLM Inference") # LLM, OCR, STT, Vision
    latency_ms = Column(Integer, default=85)
    created_at = Column(DateTime, default=datetime.utcnow)
