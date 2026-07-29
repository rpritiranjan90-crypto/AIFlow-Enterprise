from datetime import datetime
from typing import Any, Dict, List

from pydantic import BaseModel


class KPIResponse(BaseModel):
    id: str
    name: str
    category: str
    current_value: float
    target_value: float
    status: str
    updated_at: datetime

    class Config:
        from_attributes = True

class ForecastResponse(BaseModel):
    id: str
    metric_name: str
    forecasted_values_json: str
    confidence_level: float
    created_at: datetime

    class Config:
        from_attributes = True

class SimulationRequest(BaseModel):
    scenario_type: str = "Hiring & Budget"
    hiring_headcount_delta: int = 5
    pricing_change_pct: float = 10.0
    ai_budget_cap_usd: float = 5000.0

class SimulationResponse(BaseModel):
    simulation_id: str
    projected_revenue_impact_usd: float
    projected_cost_delta_usd: float
    net_roi_percentage: float
    recommendation: str

class RecommendationResponse(BaseModel):
    id: str
    category: str
    title: str
    impact_usd: float
    confidence_score: float
    status: str

    class Config:
        from_attributes = True

class AnomalyResponse(BaseModel):
    id: str
    metric_name: str
    severity: str
    message: str
    detected_at: datetime

    class Config:
        from_attributes = True

class KnowledgeGraphResponse(BaseModel):
    nodes: List[Dict[str, Any]]
    edges: List[Dict[str, Any]]

class DigitalTwinResponse(BaseModel):
    id: str
    name: str
    entity_type: str
    health_score: float
    created_at: datetime

    class Config:
        from_attributes = True

class ExecutiveReportResponse(BaseModel):
    id: str
    title: str
    report_type: str
    report_url: str
    created_at: datetime

    class Config:
        from_attributes = True
