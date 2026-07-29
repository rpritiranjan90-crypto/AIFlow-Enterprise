from datetime import datetime
from typing import Any, Dict, List, Optional

from pydantic import BaseModel


class IndustrySolutionBase(BaseModel):
    name: str
    industry: str
    description: Optional[str] = None
    icon: Optional[str] = None
    is_active: bool = True

class IndustrySolutionResponse(IndustrySolutionBase):
    id: str
    created_at: datetime

    class Config:
        from_attributes = True


class SolutionDeployRequest(BaseModel):
    tenant_id: str
    workspace_id: str
    solution_id: str
    version_id: str
    industry: str


class SolutionDeployResponse(BaseModel):
    deployment_id: str
    status: str
    message: str
    details: Dict[str, Any]


class CopilotChatRequest(BaseModel):
    copilot_id: str
    industry: str
    query: str
    context: Optional[Dict[str, Any]] = None


class CopilotChatResponse(BaseModel):
    response: str
    sources: List[str]
    confidence_score: float
