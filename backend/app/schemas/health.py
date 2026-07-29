from pydantic import BaseModel


class HealthResponse(BaseModel):
    status: str = "ok"
    version: str = "1.0.0"
    database: str = "connected"
    timestamp: str
