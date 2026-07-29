from datetime import datetime
from typing import Any, Dict, List, Optional

from pydantic import BaseModel


class AutomationScriptResponse(BaseModel):
    id: str
    name: str
    type: str
    status: str
    created_at: datetime

    class Config:
        from_attributes = True

class OCRJobResponse(BaseModel):
    id: str
    document_name: str
    extracted_text: str
    tables_json: Optional[str] = None
    confidence_score: float
    status: str
    created_at: datetime

    class Config:
        from_attributes = True

class VisionDetectionResponse(BaseModel):
    id: str
    image_name: str
    detected_objects_json: str
    qr_code_text: Optional[str] = None
    status: str
    created_at: datetime

    class Config:
        from_attributes = True

class VoiceSessionResponse(BaseModel):
    id: str
    audio_url: str
    transcription_text: str
    summary_text: Optional[str] = None
    created_at: datetime

    class Config:
        from_attributes = True

class BrowserRunRequest(BaseModel):
    url: str
    browser: Optional[str] = "Chrome"
    actions: List[Dict[str, Any]] = []

class OCRRequest(BaseModel):
    document_url: str
    language: Optional[str] = "en"
