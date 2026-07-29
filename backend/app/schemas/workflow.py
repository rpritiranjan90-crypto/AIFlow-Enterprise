from datetime import datetime
from typing import Any, Dict, List, Optional

from pydantic import BaseModel


class NodeSchema(BaseModel):
    id: str
    node_type: str
    name: str
    position_x: float
    position_y: float
    config: Optional[Dict[str, Any]] = None

class EdgeSchema(BaseModel):
    id: str
    source_node_id: str
    source_handle: Optional[str] = None
    target_node_id: str
    target_handle: Optional[str] = None

class WorkflowGraphPayload(BaseModel):
    nodes: List[NodeSchema] = []
    edges: List[EdgeSchema] = []

class WorkflowCreateRequest(BaseModel):
    name: str
    description: Optional[str] = None
    tags: Optional[str] = "Automation,AI"
    graph: Optional[WorkflowGraphPayload] = None

class WorkflowUpdateRequest(BaseModel):
    name: Optional[str] = None
    description: Optional[str] = None
    version: Optional[str] = None
    is_favorite: Optional[bool] = None
    is_archived: Optional[bool] = None
    tags: Optional[str] = None
    graph: Optional[WorkflowGraphPayload] = None

class WorkflowResponse(BaseModel):
    id: str
    workspace_id: str
    name: str
    description: Optional[str] = None
    version: str
    is_favorite: bool
    is_archived: bool
    tags: str
    created_at: datetime
    updated_at: datetime
    graph: Optional[WorkflowGraphPayload] = None

    class Config:
        from_attributes = True

class WorkflowTemplateResponse(BaseModel):
    id: str
    name: str
    description: Optional[str] = None
    category: str
    graph: Optional[WorkflowGraphPayload] = None
