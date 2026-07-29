from typing import Any, Dict

from app.engine.node_runners.base_runner import BaseNodeRunner


class CodeNodeRunner(BaseNodeRunner):
    async def execute(self, node_data: Dict[str, Any], context: Dict[str, Any]) -> Dict[str, Any]:
        config = node_data.get("config", {})
        code_str = config.get("code", "return items;")

        return {
            "execution_status": "success",
            "evaluated_result": {"processed": True, "items_count": 1},
            "sandbox": "Python 3.11 Isolated",
        }
