from fastapi import APIRouter, Request

from app.api.v1.workflow import mock_graph
from app.engine.execution_engine import execution_engine
from app.engine.webhook_engine import webhook_engine

router = APIRouter(prefix="/webhooks", tags=["Webhooks"])

@router.post("/{workflow_key}")
async def handle_incoming_webhook(workflow_key: str, request: Request):
    try:
        body = await request.json()
    except Exception:
        body = {}

    headers = dict(request.headers)
    webhook_data = webhook_engine.process_incoming_webhook(workflow_key, headers, body)

    # Trigger execution run
    nodes_raw = [n.model_dump() for n in mock_graph.nodes]
    edges_raw = [e.model_dump() for e in mock_graph.edges]

    result = await execution_engine.run_workflow(
        execution_id=f"exec_wh_{workflow_key}",
        workflow_id=workflow_key,
        nodes=nodes_raw,
        edges=edges_raw,
        trigger_payload=body,
    )

    return {
        "status": "received",
        "workflow_key": workflow_key,
        "execution_result": result,
    }
