from datetime import datetime
from typing import Any, Dict, Optional

from pydantic import BaseModel


class PluginResponse(BaseModel):
    id: str
    name: str
    version: str
    author: str
    description: str
    category: str
    license: str
    status: str
    is_official: bool = False
    is_installed: bool = False
    created_at: datetime

    class Config:
        from_attributes = True

class PluginInstallRequest(BaseModel):
    plugin_id: str
    version: Optional[str] = "latest"

class PluginPublishRequest(BaseModel):
    name: str
    category: str
    description: str
    manifest_json: Dict[str, Any]

class PluginMetricsResponse(BaseModel):
    id: str
    plugin_id: str
    execution_count: int
    avg_latency_ms: int
    error_rate: float
