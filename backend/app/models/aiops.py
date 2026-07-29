import uuid
from datetime import datetime

from sqlalchemy import Boolean, Column, DateTime, Float, ForeignKey, Integer, String, Text

from app.core.database import Base


class AIModel(Base):
    __tablename__ = "ai_models"

    id = Column(String, primary_key=True) # e.g. gpt-4o, claude-3-5-sonnet
    name = Column(String, nullable=False)
    provider = Column(String, nullable=False) # OpenAI, Anthropic, Google, DeepSeek, Mistral, Ollama
    version = Column(String, default="1.0.0")
    context_window = Column(Integer, default=128000)
    pricing_per_1k_input = Column(Float, default=0.005)
    pricing_per_1k_output = Column(Float, default=0.015)
    status = Column(String, default="available", index=True) # available, restricted, deprecated
    created_at = Column(DateTime, default=datetime.utcnow)

class PromptVersion(Base):
    __tablename__ = "prompt_versions"

    id = Column(String, primary_key=True, default=lambda: f"pv_{uuid.uuid4().hex[:12]}")
    prompt_id = Column(String, ForeignKey("prompt_templates.id"), nullable=False)
    version = Column(String, nullable=False)
    content = Column(Text, nullable=False)
    status = Column(String, default="published", index=True) # draft, published, archived
    created_at = Column(DateTime, default=datetime.utcnow)

class PromptEvaluation(Base):
    __tablename__ = "prompt_evaluations"

    id = Column(String, primary_key=True, default=lambda: f"eval_{uuid.uuid4().hex[:12]}")
    prompt_id = Column(String, nullable=False)
    accuracy_score = Column(Float, default=0.95)
    completeness_score = Column(Float, default=0.92)
    groundedness_score = Column(Float, default=0.98)
    hallucination_rate = Column(Float, default=0.02)
    latency_ms = Column(Integer, default=420)
    cost_usd = Column(Float, default=0.0042)
    overall_score = Column(Float, default=0.94)
    eval_status = Column(String, default="passed")
    created_at = Column(DateTime, default=datetime.utcnow)

class AgentMetrics(Base):
    __tablename__ = "agent_metrics"

    id = Column(String, primary_key=True, default=lambda: f"agm_{uuid.uuid4().hex[:12]}")
    agent_id = Column(String, nullable=False, index=True)
    agent_name = Column(String, nullable=False)
    execution_count = Column(Integer, default=0)
    avg_runtime_ms = Column(Integer, default=0)
    success_rate = Column(Float, default=100.0)
    tool_calls_count = Column(Integer, default=0)
    token_consumption = Column(Integer, default=0)
    updated_at = Column(DateTime, default=datetime.utcnow)

class CostRecord(Base):
    __tablename__ = "cost_records"

    id = Column(String, primary_key=True, default=lambda: f"cst_{uuid.uuid4().hex[:12]}")
    workspace_id = Column(String, ForeignKey("workspaces.id", index=True), nullable=False, default="ws_prod_01")
    workflow_id = Column(String, nullable=True, index=True)
    agent_id = Column(String, nullable=True, index=True)
    provider = Column(String, nullable=False, default="OpenAI")
    model = Column(String, nullable=False, default="gpt-4o")
    tokens_used = Column(Integer, default=0)
    cost_usd = Column(Float, default=0.0)
    created_at = Column(DateTime, default=datetime.utcnow)

class GovernancePolicy(Base):
    __tablename__ = "governance_policies"

    id = Column(String, primary_key=True, default=lambda: f"gov_{uuid.uuid4().hex[:12]}")
    workspace_id = Column(String, ForeignKey("workspaces.id", index=True), nullable=False, default="ws_prod_01")
    max_monthly_spend = Column(Float, default=5000.0)
    max_token_limit = Column(Integer, default=100000000)
    require_human_approval = Column(Boolean, default=True)
    restricted_models_json = Column(Text, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)

class ApprovalRequest(Base):
    __tablename__ = "approval_requests"

    id = Column(String, primary_key=True, default=lambda: f"appr_{uuid.uuid4().hex[:12]}")
    workflow_id = Column(String, nullable=False, index=True)
    workflow_name = Column(String, nullable=False)
    execution_id = Column(String, nullable=False, index=True)
    node_name = Column(String, nullable=False, default="Human Approval Gate")
    status = Column(String, default="pending", index=True) # pending, approved, rejected, escalated, timed_out
    requested_by = Column(String, nullable=False, default="Salesforce Lead Pipeline")
    action_payload = Column(Text, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)

class SafetyScan(Base):
    __tablename__ = "safety_scans"

    id = Column(String, primary_key=True, default=lambda: f"scan_{uuid.uuid4().hex[:12]}")
    session_id = Column(String, nullable=False, index=True)
    pii_detected = Column(Boolean, default=False)
    prompt_injection_risk = Column(String, default="low") # low, medium, high, critical
    toxicity_score = Column(Float, default=0.01)
    status = Column(String, default="passed", index=True) # passed, flagged, blocked
    created_at = Column(DateTime, default=datetime.utcnow)

class ModelComparison(Base):
    __tablename__ = "model_comparisons"

    id = Column(String, primary_key=True, default=lambda: f"cmp_{uuid.uuid4().hex[:12]}")
    prompt_text = Column(Text, nullable=False)
    results_json = Column(Text, nullable=False)
    winner_model = Column(String, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)
