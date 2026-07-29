from typing import Any, Dict

from app.engine.node_runners.base_runner import BaseNodeRunner


class TriggerNodeRunner(BaseNodeRunner):
    async def execute(self, node_data: Dict[str, Any], context: Dict[str, Any]) -> Dict[str, Any]:
        trigger_payload = context.get("trigger", {})
        return {
            "status": "success",
            "received_at": context.get("execution", {}).get("startTime"),
            "data": trigger_payload,
        }
