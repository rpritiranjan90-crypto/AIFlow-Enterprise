from datetime import datetime
from typing import Dict, List

from pydantic import BaseModel


class AIModelResponse(BaseModel):
    id: str
    name: str
    provider: str
    version: str
    context_window: int
    pricing_per_1k_input: float
    pricing_per_1k_output: float
    status: str

    class Config:
        from_attributes = True

class PromptEvaluationResponse(BaseModel):
    id: str
    prompt_id: str
    accuracy_score: float
    completeness_score: float
    groundedness_score: float
    hallucination_rate: float
    latency_ms: int
    cost_usd: float
    overall_score: float
    eval_status: str
    created_at: datetime

    class Config:
        from_attributes = True

class CostAnalyticsResponse(BaseModel):
    total_spend_usd: float
    tokens_consumed: int
    forecasted_monthly_usd: float
    spend_by_provider: Dict[str, float]
    spend_by_agent: Dict[str, float]

class AgentMetricsResponse(BaseModel):
    id: str
    agent_id: str
    agent_name: str
    execution_count: int
    avg_runtime_ms: int
    success_rate: float
    tool_calls_count: int
    token_consumption: int

    class Config:
        from_attributes = True

class RAGMetricsResponse(BaseModel):
    documents_indexed: int
    total_vectors: int
    retrieval_accuracy: float
    citation_coverage_rate: float
    avg_similarity_score: float
    failed_retrievals_count: int

class GovernancePolicyResponse(BaseModel):
    id: str
    workspace_id: str
    max_monthly_spend: float
    max_token_limit: int
    require_human_approval: bool
    restricted_models: List[str] = []

    class Config:
        from_attributes = True

class ApprovalRequestResponse(BaseModel):
    id: str
    workflow_id: str
    workflow_name: str
    execution_id: str
    node_name: str
    status: str
    requested_by: str
    created_at: datetime

    class Config:
        from_attributes = True

class SafetyScanResponse(BaseModel):
    id: str
    session_id: str
    pii_detected: bool
    prompt_injection_risk: str
    toxicity_score: float
    status: str
    created_at: datetime

    class Config:
        from_attributes = True

class ModelComparisonRequest(BaseModel):
    prompt_text: str
    models: List[str] = ["gpt-4o", "claude-3-5-sonnet", "gemini-1-5-pro"]

class ComparisonItem(BaseModel):
    model: str
    provider: str
    output_text: str
    latency_ms: int
    tokens_used: int
    cost_usd: float
    groundedness_score: float

class ModelComparisonResponse(BaseModel):
    prompt_text: str
    comparisons: List[ComparisonItem]
    winner_model: str
