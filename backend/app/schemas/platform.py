from datetime import datetime
from typing import Any, Dict, List, Optional

from pydantic import BaseModel


class PlatformNodeResponse(BaseModel):
    id: str
    graph_id: str
    node_type: str
    entity_id: str
    metadata_json: Dict[str, Any]
    created_at: datetime

class PlatformRelationshipResponse(BaseModel):
    id: str
    graph_id: str
    source_node_id: str
    target_node_id: str
    relationship_type: str
    weight: float
    created_at: datetime

class EnterpriseGraphResponse(BaseModel):
    id: str
    name: str
    tenant_id: str
    is_active: bool
    created_at: datetime
    nodes: List[PlatformNodeResponse] = []
    edges: List[PlatformRelationshipResponse] = []

class GlobalSearchResponse(BaseModel):
    id: str
    entity_type: str
    entity_id: str
    content: str
    tags: List[str]
    score: float = 0.0

class EnterpriseTwinResponse(BaseModel):
    id: str
    tenant_id: str
    twin_type: str
    state_json: Dict[str, Any]
    last_synced_at: datetime

class PredictiveInsightResponse(BaseModel):
    id: str
    insight_type: str
    severity: str
    prediction_json: Dict[str, Any]
    confidence_score: float
    created_at: datetime

class PlatformSnapshotResponse(BaseModel):
    id: str
    tenant_id: str
    version: str
    configuration_json: Dict[str, Any]
    created_at: datetime

class PlatformReleaseResponse(BaseModel):
    id: str
    version: str
    release_notes: Optional[str]
    is_active: bool
    deployed_at: datetime

class PlatformDependencyResponse(BaseModel):
    id: str
    component_name: str
    required_version: str
    is_satisfied: bool
    created_at: datetime

class ExecutiveReportResponse(BaseModel):
    id: str
    report_type: str
    period: str
    metrics_json: Dict[str, Any]
    ai_summary: Optional[str]
    created_at: datetime

class ScheduleRequest(BaseModel):
    entity_id: str
    entity_type: str # workflow, agent
    parameters: Dict[str, Any] = {}
    priority: int = 1

class ScheduleResponse(BaseModel):
    job_id: str
    status: str
    scheduled_time: Optional[datetime]
    queue: str

class SimulateRequest(BaseModel):
    twin_type: str
    scenario: str
    parameters: Dict[str, Any] = {}

class SimulateResponse(BaseModel):
    simulation_id: str
    twin_type: str
    result_json: Dict[str, Any]
    completed_at: datetime
