from typing import Any, Dict

from app.engine.node_runners.base_runner import BaseNodeRunner
from app.engine.variable_engine import variable_engine


class CommunicationNodeRunner(BaseNodeRunner):
    async def execute(self, node_data: Dict[str, Any], context: Dict[str, Any]) -> Dict[str, Any]:
        config = node_data.get("config", {})
        channel = config.get("channel", "#general")
        raw_msg = config.get("message", "AIFlow Execution Notice")
        resolved_msg = variable_engine.resolve(raw_msg, context)

        return {
            "delivered": True,
            "channel": channel,
            "message": resolved_msg,
            "timestamp": context.get("execution", {}).get("startTime"),
        }
