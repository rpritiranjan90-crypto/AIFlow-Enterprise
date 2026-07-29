import uuid
from datetime import datetime

from sqlalchemy import JSON, Column, DateTime, Float, ForeignKey, Integer, String, Text

from app.core.database import Base


class Agent(Base):
    __tablename__ = "agentic_agents"

    id = Column(String, primary_key=True, default=lambda: f"agent_{uuid.uuid4().hex[:12]}")
    name = Column(String, nullable=False)
    role = Column(String, default="Execution Agent")  # Planner, Research, Execution, Validation, Reviewer, Coordinator
    capabilities = Column(JSON, default=list)
    model_provider = Column(String, default="openai/gpt-4o")
    system_prompt = Column(Text, nullable=True)
    tool_permissions = Column(JSON, default=list)
    status = Column(String, default="active", index=True)  # active, idle, busy, disabled
    created_at = Column(DateTime, default=datetime.utcnow)


class AgentTeam(Base):
    __tablename__ = "agentic_agent_teams"

    id = Column(String, primary_key=True, default=lambda: f"team_{uuid.uuid4().hex[:12]}")
    name = Column(String, nullable=False)
    goal = Column(Text, nullable=False)
    coordinator_agent_id = Column(String, ForeignKey("agentic_agents.id"), nullable=True)
    agent_ids = Column(JSON, default=list)
    shared_context = Column(JSON, default=dict)
    status = Column(String, default="idle", index=True)  # idle, running, completed, failed
    created_at = Column(DateTime, default=datetime.utcnow)


class AgentMemory(Base):
    __tablename__ = "agentic_agent_memories"

    id = Column(String, primary_key=True, default=lambda: f"mem_{uuid.uuid4().hex[:12]}")
    agent_id = Column(String, ForeignKey("agentic_agents.id"), index=True, nullable=False)
    memory_type = Column(String, default="semantic")  # semantic, episodic, workspace, conversation
    content = Column(Text, nullable=False)
    embedding_hash = Column(String, nullable=True)
    importance_score = Column(Float, default=0.75)
    tags = Column(JSON, default=list)
    created_at = Column(DateTime, default=datetime.utcnow)
    expires_at = Column(DateTime, nullable=True)


class AgentGoal(Base):
    __tablename__ = "agentic_agent_goals"

    id = Column(String, primary_key=True, default=lambda: f"goal_{uuid.uuid4().hex[:12]}")
    team_id = Column(String, ForeignKey("agentic_agent_teams.id"), nullable=True)
    goal_text = Column(Text, nullable=False)
    decomposed_subtasks = Column(JSON, default=list)
    priority = Column(String, default="high")  # critical, high, medium, low
    status = Column(String, default="pending", index=True)  # pending, planning, executing, completed, failed
    created_at = Column(DateTime, default=datetime.utcnow)


class AgentPlan(Base):
    __tablename__ = "agentic_agent_plans"

    id = Column(String, primary_key=True, default=lambda: f"plan_{uuid.uuid4().hex[:12]}")
    goal_id = Column(String, ForeignKey("agentic_agent_goals.id"), nullable=False)
    plan_steps = Column(JSON, default=list)
    dependency_graph = Column(JSON, default=dict)
    estimated_duration_s = Column(Integer, default=30)
    status = Column(String, default="draft", index=True)  # draft, approved, executing, completed
    created_at = Column(DateTime, default=datetime.utcnow)


class AgentExecution(Base):
    __tablename__ = "agentic_agent_executions"

    id = Column(String, primary_key=True, default=lambda: f"aexec_{uuid.uuid4().hex[:12]}")
    plan_id = Column(String, ForeignKey("agentic_agent_plans.id"), nullable=False)
    agent_id = Column(String, ForeignKey("agentic_agents.id"), index=True, nullable=False)
    step_index = Column(Integer, default=0)
    step_name = Column(String, nullable=True)
    result_summary = Column(Text, nullable=True)
    confidence_score = Column(Float, default=0.92)
    latency_ms = Column(Integer, default=320)
    tokens_used = Column(Integer, default=1024)
    status = Column(String, default="completed", index=True)  # pending, running, completed, failed, retrying
    created_at = Column(DateTime, default=datetime.utcnow)


class AgentReasoning(Base):
    __tablename__ = "agentic_agent_reasonings"

    id = Column(String, primary_key=True, default=lambda: f"rsn_{uuid.uuid4().hex[:12]}")
    execution_id = Column(String, ForeignKey("agentic_agent_executions.id"), index=True, nullable=False)
    reasoning_trace = Column(Text, nullable=False)
    reflection = Column(Text, nullable=True)
    critique = Column(Text, nullable=True)
    verification_result = Column(String, default="verified")  # verified, uncertain, failed
    confidence = Column(Float, default=0.94)
    tree_search_nodes_explored = Column(Integer, default=12)
    created_at = Column(DateTime, default=datetime.utcnow)


class Simulation(Base):
    __tablename__ = "agentic_simulations"

    id = Column(String, primary_key=True, default=lambda: f"sim_{uuid.uuid4().hex[:12]}")
    name = Column(String, nullable=False)
    scenario_type = Column(String, default="Business Process")  # Agent Sandbox, Workflow, Business, Risk, Stress Test
    config = Column(JSON, default=dict)
    result_summary = Column(Text, nullable=True)
    success_rate_pct = Column(Float, default=98.5)
    avg_latency_ms = Column(Integer, default=240)
    status = Column(String, default="completed", index=True)  # pending, running, completed, failed
    created_at = Column(DateTime, default=datetime.utcnow)
