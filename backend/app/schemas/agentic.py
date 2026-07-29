from datetime import datetime
from typing import Any, Dict, List, Optional

from pydantic import BaseModel


class AgentResponse(BaseModel):
    id: str
    name: str
    role: str
    model_provider: str
    status: str
    created_at: datetime

    class Config:
        from_attributes = True


class AgentCreateRequest(BaseModel):
    name: str
    role: str = "Execution Agent"
    model_provider: str = "openai/gpt-4o"
    system_prompt: Optional[str] = None
    capabilities: Optional[List[str]] = []


class AgentTeamResponse(BaseModel):
    id: str
    name: str
    goal: str
    status: str
    created_at: datetime

    class Config:
        from_attributes = True


class AgentExecuteRequest(BaseModel):
    team_id: Optional[str] = None
    goal: str
    priority: str = "high"
    max_agents: int = 5


class AgentSimulateRequest(BaseModel):
    scenario_type: str = "Business Process"
    name: str
    config: Optional[Dict[str, Any]] = {}


class AgentMemoryResponse(BaseModel):
    id: str
    agent_id: str
    memory_type: str
    content: str
    importance_score: float
    created_at: datetime

    class Config:
        from_attributes = True


class AgentMetricsResponse(BaseModel):
    total_agents: int
    active_teams: int
    avg_confidence_score: float
    avg_latency_ms: float
    total_executions: int
    memory_entries: int
    self_healing_triggers: int
    reasoning_quality_score: float


class SimulationResponse(BaseModel):
    id: str
    name: str
    scenario_type: str
    success_rate_pct: float
    avg_latency_ms: int
    status: str
    created_at: datetime

    class Config:
        from_attributes = True
