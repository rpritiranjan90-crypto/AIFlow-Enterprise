from typing import Any, Dict

from app.engine.node_runners.base_runner import BaseNodeRunner


class LogicNodeRunner(BaseNodeRunner):
    async def execute(self, node_data: Dict[str, Any], context: Dict[str, Any]) -> Dict[str, Any]:
        config = node_data.get("config", {})
        node_type = node_data.get("nodeType", "condition")

        if node_type == "condition":
            field_val = context.get("trigger", {}).get("status", "active")
            target_val = config.get("value", "active")
            is_true = str(field_val).lower() == str(target_val).lower()
            return {"branch": "true" if is_true else "false", "evaluation": is_true}

        elif node_type == "router":
            routes = config.get("routes", ["Path A", "Path B"])
            return {"selected_route": routes[0]}

        return {"status": "passed"}
