from fastapi import APIRouter, WebSocket, WebSocketDisconnect

from app.engine.execution_engine import active_ws_subscribers
from app.logging.logger import logger

router = APIRouter(tags=["WebSockets"])

@router.websocket("/ws/executions/{execution_id}")
async def websocket_execution_stream(websocket: WebSocket, execution_id: str):
    await websocket.accept()
    logger.info(f"WebSocket client connected for execution [{execution_id}]")

    if execution_id not in active_ws_subscribers:
        active_ws_subscribers[execution_id] = []
    active_ws_subscribers[execution_id].append(websocket)

    try:
        while True:
            # Keep socket open and receive any client ping messages
            data = await websocket.receive_text()
    except WebSocketDisconnect:
        logger.info(f"WebSocket client disconnected from execution [{execution_id}]")
        if execution_id in active_ws_subscribers:
            active_ws_subscribers[execution_id].remove(websocket)
