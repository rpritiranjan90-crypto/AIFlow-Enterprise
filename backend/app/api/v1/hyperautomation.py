from datetime import datetime
from typing import List

from fastapi import APIRouter

from app.hyperautomation.browser_engine import browser_engine
from app.hyperautomation.ocr_engine import ocr_engine
from app.hyperautomation.rpa_engine import rpa_engine
from app.hyperautomation.vision_engine import vision_engine
from app.hyperautomation.voice_engine import voice_engine
from app.schemas.hyperautomation import (
    AutomationScriptResponse,
    BrowserRunRequest,
    OCRRequest,
)

router = APIRouter(tags=["Hyper Automation"])

mock_rpa_scripts: List[AutomationScriptResponse] = [
    AutomationScriptResponse(id="rpa_invoice_entry", name="SAP Invoice Data Entry Automation", type="RPA", status="active", created_at=datetime.utcnow()),
    AutomationScriptResponse(id="rpa_claims_processing", name="Healthcare Claims Verification Robot", type="RPA", status="active", created_at=datetime.utcnow()),
]

@router.get("/api/v1/rpa/workflows", response_model=List[AutomationScriptResponse])
async def list_rpa_workflows():
    return mock_rpa_scripts

@router.post("/api/v1/rpa/execute")
async def execute_rpa_workflow(script_id: str = "rpa_invoice_entry", payload: dict = {}):
    return rpa_engine.execute_desktop_script(script_id, payload)

@router.post("/api/v1/browser/run")
async def run_browser_automation(body: BrowserRunRequest):
    return await browser_engine.run_browser_automation(body.url, body.browser or "Chrome")

@router.post("/api/v1/ocr/extract")
async def extract_ocr_text(body: OCRRequest):
    return ocr_engine.extract_document_text(body.document_url)

@router.post("/api/v1/documents/analyze")
async def analyze_document(body: OCRRequest):
    return ocr_engine.extract_document_text(body.document_url)

@router.post("/api/v1/vision/detect")
async def detect_vision_objects(image_url: str = "https://aiflow.enterprise.io/samples/ui_screen.png"):
    return vision_engine.detect_vision_objects(image_url)

@router.post("/api/v1/voice/transcribe")
async def transcribe_voice_audio(audio_url: str = "https://aiflow.enterprise.io/samples/call_recording.mp3"):
    return voice_engine.transcribe_audio(audio_url)

@router.get("/api/v1/automation/library")
async def get_automation_library():
    return [
        {"category": "Finance", "name": "SAP Invoice Entry Robot", "type": "RPA", "downloads": 1420},
        {"category": "HR", "name": "Resume Screening & Parsing Pipeline", "type": "OCR & AI", "downloads": 890},
        {"category": "IT Operations", "name": "Active Directory Onboarding Playwright Script", "type": "Browser", "downloads": 1120},
    ]
