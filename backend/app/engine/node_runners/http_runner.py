from typing import Any, Dict

import httpx

from app.engine.node_runners.base_runner import BaseNodeRunner
from app.engine.variable_engine import variable_engine


class HTTPNodeRunner(BaseNodeRunner):
    async def execute(self, node_data: Dict[str, Any], context: Dict[str, Any]) -> Dict[str, Any]:
        config = node_data.get("config", {})
        raw_url = config.get("url", "https://httpbin.org/get")
        url = variable_engine.resolve(raw_url, context)
        method = config.get("method", "GET").upper()

        async with httpx.AsyncClient(timeout=10.0) as client:
            if method == "POST":
                res = await client.post(url, json=context.get("trigger", {}))
            else:
                res = await client.get(url)

            return {
                "status_code": res.status_code,
                "url": str(res.url),
                "body": res.json() if "application/json" in res.headers.get("content-type", "") else res.text,
            }
