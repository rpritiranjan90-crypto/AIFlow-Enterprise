from datetime import datetime
from typing import Any, Dict, List, Optional

from pydantic import BaseModel


class ExecutionCreateRequest(BaseModel):
    trigger_payload: Optional[Dict[str, Any]] = None

class ExecutionNodeResponse(BaseModel):
    id: str
    execution_id: str
    node_id: str
    node_name: str
    node_type: str
    status: str # queued, running, completed, failed, skipped, retrying
    started_at: Optional[datetime] = None
    finished_at: Optional[datetime] = None
    duration_ms: int = 0
    input_json: Optional[str] = None
    output_json: Optional[str] = None
    error_message: Optional[str] = None
    retry_count: int = 0

    class Config:
        from_attributes = True

class ExecutionLogResponse(BaseModel):
    id: str
    execution_id: str
    level: str
    message: str
    timestamp: datetime

    class Config:
        from_attributes = True

class ExecutionResponse(BaseModel):
    id: str
    workflow_id: str
    workspace_id: str
    status: str
    trigger_type: str
    started_at: datetime
    finished_at: Optional[datetime] = None
    duration_ms: int = 0
    error_message: Optional[str] = None
    created_at: datetime
    nodes: List[ExecutionNodeResponse] = []
    logs: List[ExecutionLogResponse] = []

    class Config:
        from_attributes = True

class WebhookRequestResponse(BaseModel):
    id: str
    workflow_id: str
    method: str
    headers_json: Optional[str] = None
    body_json: Optional[str] = None
    created_at: datetime

    class Config:
        from_attributes = True

class ScheduleCreateRequest(BaseModel):
    workflow_id: str
    cron_expr: str = "0 * * * *"

class ScheduleUpdateRequest(BaseModel):
    cron_expr: Optional[str] = None
    is_active: Optional[bool] = None

class ScheduledJobResponse(BaseModel):
    id: str
    workflow_id: str
    cron_expr: str
    is_active: bool
    last_run_at: Optional[datetime] = None
    next_run_at: Optional[datetime] = None
    created_at: datetime

    class Config:
        from_attributes = True
