import uuid
from datetime import datetime

from sqlalchemy import Boolean, Column, DateTime, Float, ForeignKey, Integer, String, Text

from app.core.database import Base


class AutomationScript(Base):
    __tablename__ = "automation_scripts"

    id = Column(String, primary_key=True) # e.g. rpa_invoice_entry, rpa_sap_posting
    name = Column(String, nullable=False)
    type = Column(String, default="RPA") # RPA, Browser, OCR, Vision, Voice
    script_body = Column(Text, nullable=False)
    status = Column(String, default="active", index=True)
    created_at = Column(DateTime, default=datetime.utcnow)

class DesktopRecording(Base):
    __tablename__ = "desktop_recordings"

    id = Column(String, primary_key=True, default=lambda: f"rec_{uuid.uuid4().hex[:12]}")
    name = Column(String, nullable=False)
    actions_json = Column(Text, nullable=False)
    duration_seconds = Column(Integer, default=45)
    created_at = Column(DateTime, default=datetime.utcnow)

class BrowserSession(Base):
    __tablename__ = "browser_sessions"

    id = Column(String, primary_key=True, default=lambda: f"bsess_{uuid.uuid4().hex[:12]}")
    browser_type = Column(String, default="Chrome") # Chrome, Firefox, Edge
    is_headless = Column(Boolean, default=True)
    status = Column(String, default="completed", index=True)
    created_at = Column(DateTime, default=datetime.utcnow)

class OCRJob(Base):
    __tablename__ = "ocr_jobs"

    id = Column(String, primary_key=True, default=lambda: f"ocr_{uuid.uuid4().hex[:12]}")
    document_name = Column(String, nullable=False)
    extracted_text = Column(Text, nullable=False)
    tables_json = Column(Text, nullable=True)
    confidence_score = Column(Float, default=0.985)
    status = Column(String, default="completed", index=True)
    created_at = Column(DateTime, default=datetime.utcnow)

class DocumentModel(Base):
    __tablename__ = "document_models"

    id = Column(String, primary_key=True, default=lambda: f"docm_{uuid.uuid4().hex[:12]}")
    model_type = Column(String, nullable=False) # Invoice, Receipt, Contract, Identity Document
    confidence_score = Column(Float, default=0.99)
    created_at = Column(DateTime, default=datetime.utcnow)

class VisionDetection(Base):
    __tablename__ = "vision_detections"

    id = Column(String, primary_key=True, default=lambda: f"vis_{uuid.uuid4().hex[:12]}")
    image_name = Column(String, nullable=False)
    detected_objects_json = Column(Text, nullable=False)
    qr_code_text = Column(String, nullable=True)
    status = Column(String, default="completed", index=True)
    created_at = Column(DateTime, default=datetime.utcnow)

class VoiceSession(Base):
    __tablename__ = "voice_sessions"

    id = Column(String, primary_key=True, default=lambda: f"vsess_{uuid.uuid4().hex[:12]}")
    audio_url = Column(String, nullable=False)
    transcription_text = Column(Text, nullable=False)
    summary_text = Column(Text, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)

class AutomationExecution(Base):
    __tablename__ = "automation_executions"

    id = Column(String, primary_key=True, default=lambda: f"aexec_{uuid.uuid4().hex[:12]}")
    automation_id = Column(String, ForeignKey("automation_scripts.id"), nullable=False)
    status = Column(String, default="succeeded", index=True)
    latency_ms = Column(Integer, default=320)
    created_at = Column(DateTime, default=datetime.utcnow)
