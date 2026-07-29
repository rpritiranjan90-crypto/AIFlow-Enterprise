from datetime import datetime

from fastapi import APIRouter

from app.schemas.health import HealthResponse

router = APIRouter()

@router.get("/health", response_model=HealthResponse)
async def health_check():
    return HealthResponse(
        status="ok",
        version="1.0.0",
        database="connected",
        timestamp=datetime.utcnow().isoformat() + "Z"
    )
