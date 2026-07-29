import uuid
from datetime import datetime
from typing import List

from fastapi import APIRouter, BackgroundTasks

from app.api.v1.workflow import mock_graph, mock_workflows_db
from app.engine.execution_engine import execution_engine
from app.schemas.execution import (
    ExecutionCreateRequest,
    ExecutionLogResponse,
    ExecutionNodeResponse,
    ExecutionResponse,
)

router = APIRouter(tags=["Executions"])

mock_executions_db: List[ExecutionResponse] = [
    ExecutionResponse(
        id="exec_9901",
        workflow_id="wf_01",
        workspace_id="ws_prod_01",
        status="completed",
        trigger_type="webhook",
        started_at=datetime.utcnow(),
        finished_at=datetime.utcnow(),
        duration_ms=1240,
        error_message=None,
        created_at=datetime.utcnow(),
        nodes=[
            ExecutionNodeResponse(
                id="ex_n1", execution_id="exec_9901", node_id="n1", node_name="Manual Trigger", node_type="manual_trigger",
                status="completed", started_at=datetime.utcnow(), finished_at=datetime.utcnow(), duration_ms=50,
                input_json="{}", output_json='{"status": "received"}', error_message=None, retry_count=0
            ),
            ExecutionNodeResponse(
                id="ex_n2", execution_id="exec_9901", node_id="n2", node_name="Salesforce AI Enrichment", node_type="ai_agent",
                status="completed", started_at=datetime.utcnow(), finished_at=datetime.utcnow(), duration_ms=840,
                input_json='{"model": "gpt-4o"}', output_json='{"enriched": true, "score": 98}', error_message=None, retry_count=0
            ),
            ExecutionNodeResponse(
                id="ex_n3", execution_id="exec_9901", node_id="n3", node_name="Slack Broadcast Notice", node_type="slack",
                status="completed", started_at=datetime.utcnow(), finished_at=datetime.utcnow(), duration_ms=350,
                input_json='{"channel": "#sales-alerts"}', output_json='{"delivered": true}', error_message=None, retry_count=0
            ),
        ],
        logs=[
            ExecutionLogResponse(id="l1", execution_id="exec_9901", level="INFO", message="DAG compiled successfully into 3 nodes", timestamp=datetime.utcnow()),
            ExecutionLogResponse(id="l2", execution_id="exec_9901", level="INFO", message="Executing node [Salesforce AI Enrichment]", timestamp=datetime.utcnow()),
            ExecutionLogResponse(id="l3", execution_id="exec_9901", level="INFO", message="Execution finished in 1240ms", timestamp=datetime.utcnow()),
        ],
    ),
]

@router.post("/workflows/{workflow_id}/execute", response_model=ExecutionResponse)
async def execute_workflow(workflow_id: str, body: ExecutionCreateRequest, background_tasks: BackgroundTasks):
    exec_id = f"exec_{uuid.uuid4().hex[:8]}"

    # Locate workflow graph
    wf_graph = mock_graph
    for wf in mock_workflows_db:
        if wf.id == workflow_id and wf.graph:
            wf_graph = wf.graph
            break

    nodes_raw = [n.model_dump() for n in wf_graph.nodes]
    edges_raw = [e.model_dump() for e in wf_graph.edges]

    # Execute workflow in background task engine
    result = await execution_engine.run_workflow(
        execution_id=exec_id,
        workflow_id=workflow_id,
        nodes=nodes_raw,
        edges=edges_raw,
        trigger_payload=body.trigger_payload,
    )

    node_responses = [
        ExecutionNodeResponse(
            id=f"ex_{n['node_id']}",
            execution_id=exec_id,
            node_id=n["node_id"],
            node_name=n["node_name"],
            node_type=n["node_type"],
            status=n["status"],
            started_at=datetime.utcnow(),
            finished_at=datetime.utcnow(),
            duration_ms=n["duration_ms"],
            input_json=n.get("input_json"),
            output_json=n.get("output_json"),
            error_message=n.get("error_message"),
            retry_count=0,
        )
        for n in result.get("nodes", [])
    ]

    exec_response = ExecutionResponse(
        id=exec_id,
        workflow_id=workflow_id,
        workspace_id="ws_prod_01",
        status=result["status"],
        trigger_type="manual",
        started_at=datetime.utcnow(),
        finished_at=datetime.utcnow(),
        duration_ms=result.get("duration_ms", 0),
        error_message=result.get("error_message"),
        created_at=datetime.utcnow(),
        nodes=node_responses,
        logs=[
            ExecutionLogResponse(
                id=f"l_{uuid.uuid4().hex[:6]}",
                execution_id=exec_id,
                level="INFO" if result["status"] == "completed" else "ERROR",
                message=f"Workflow execution {result['status']} in {result.get('duration_ms', 0)}ms",
                timestamp=datetime.utcnow(),
            )
        ],
    )

    mock_executions_db.insert(0, exec_response)
    return exec_response

@router.post("/workflows/{workflow_id}/cancel")
async def cancel_workflow(workflow_id: str):
    return {"message": f"Cancellation signal dispatched for workflow {workflow_id}"}

@router.get("/executions", response_model=List[ExecutionResponse])
async def list_executions():
    return mock_executions_db

@router.get("/executions/{id}", response_model=ExecutionResponse)
async def get_execution(id: str):
    for ex in mock_executions_db:
        if ex.id == id:
            return ex
    # Return first fallback
    return mock_executions_db[0]

@router.get("/executions/{id}/logs", response_model=List[ExecutionLogResponse])
async def get_execution_logs(id: str):
    for ex in mock_executions_db:
        if ex.id == id:
            return ex.logs
    return mock_executions_db[0].logs
