import uuid
from datetime import datetime

from sqlalchemy import Boolean, Column, DateTime, ForeignKey, Integer, String, Text

from app.core.database import Base


class Execution(Base):
    __tablename__ = "executions"

    id = Column(String, primary_key=True, default=lambda: f"exec_{uuid.uuid4().hex[:12]}")
    workflow_id = Column(String, ForeignKey("workflows.id"), index=True, nullable=False)
    workspace_id = Column(String, ForeignKey("workspaces.id"), index=True, nullable=False, default="ws_prod_01")
    status = Column(String, nullable=False, default="queued", index=True) # queued, running, completed, failed, cancelled, retrying
    trigger_type = Column(String, nullable=False, default="manual") # manual, webhook, schedule, event
    started_at = Column(DateTime, default=datetime.utcnow)
    finished_at = Column(DateTime, nullable=True)
    duration_ms = Column(Integer, default=0)
    error_message = Column(Text, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)

class ExecutionNode(Base):
    __tablename__ = "execution_nodes"

    id = Column(String, primary_key=True, default=lambda: f"ex_node_{uuid.uuid4().hex[:12]}")
    execution_id = Column(String, ForeignKey("executions.id"), index=True, nullable=False)
    node_id = Column(String, nullable=False)
    node_name = Column(String, nullable=False)
    node_type = Column(String, nullable=False)
    status = Column(String, nullable=False, default="queued", index=True) # queued, running, completed, failed, skipped, retrying
    started_at = Column(DateTime, nullable=True)
    finished_at = Column(DateTime, nullable=True)
    duration_ms = Column(Integer, default=0)
    input_json = Column(Text, nullable=True)
    output_json = Column(Text, nullable=True)
    error_message = Column(Text, nullable=True)
    retry_count = Column(Integer, default=0)

class ExecutionLog(Base):
    __tablename__ = "execution_logs"

    id = Column(String, primary_key=True, default=lambda: f"log_{uuid.uuid4().hex[:12]}")
    execution_id = Column(String, ForeignKey("executions.id"), index=True, nullable=False)
    level = Column(String, default="INFO") # INFO, WARNING, ERROR, DEBUG
    message = Column(Text, nullable=False)
    timestamp = Column(DateTime, default=datetime.utcnow)

class WebhookRequest(Base):
    __tablename__ = "webhook_requests"

    id = Column(String, primary_key=True, default=lambda: f"wh_{uuid.uuid4().hex[:12]}")
    workflow_id = Column(String, ForeignKey("workflows.id"), index=True, nullable=False)
    method = Column(String, default="POST")
    headers_json = Column(Text, nullable=True)
    body_json = Column(Text, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)

class ScheduledJob(Base):
    __tablename__ = "scheduled_jobs"

    id = Column(String, primary_key=True, default=lambda: f"sched_{uuid.uuid4().hex[:12]}")
    workflow_id = Column(String, ForeignKey("workflows.id"), index=True, nullable=False)
    cron_expr = Column(String, nullable=False, default="0 * * * *")
    is_active = Column(Boolean, default=True)
    last_run_at = Column(DateTime, nullable=True)
    next_run_at = Column(DateTime, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)

class ExecutionVariable(Base):
    __tablename__ = "execution_variables"

    id = Column(String, primary_key=True, default=lambda: f"var_{uuid.uuid4().hex[:12]}")
    execution_id = Column(String, ForeignKey("executions.id"), index=True, nullable=False)
    key = Column(String, nullable=False)
    value_json = Column(Text, nullable=True)
