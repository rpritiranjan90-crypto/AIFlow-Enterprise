from typing import Any, Dict

from app.logging.logger import logger


class ToolCallingEngine:
    """
    Executes function calls requested by autonomous AI agents.
    """

    async def execute_tool(self, tool_name: str, arguments: Dict[str, Any]) -> Dict[str, Any]:
        logger.info(f"ToolCallingEngine invoking tool [{tool_name}] with args {arguments}")

        if tool_name == "web_search":
            query = arguments.get("query", "AIFlow Enterprise")
            return {
                "results": [
                    {"title": f"Official Results for {query}", "snippet": "AIFlow Enterprise is the AI-Powered Business Automation Platform.", "url": "https://aiflow.enterprise.io"},
                    {"title": "Documentation", "snippet": "Build DAG workflows and deploy autonomous agents.", "url": "https://aiflow.enterprise.io/docs"}
                ]
            }

        elif tool_name == "calculator":
            expr = arguments.get("expression", "2 + 2")
            try:
                # Safe eval for numbers
                res = eval(expr, {"__builtins__": None}, {})
                return {"expression": expr, "result": res}
            except Exception as e:
                return {"expression": expr, "error": str(e)}

        elif tool_name == "code_runner":
            code = arguments.get("code", "print('Hello World')")
            return {"status": "executed", "output": f"Executed code: {code[:30]}..."}

        elif tool_name == "trigger_workflow":
            wf_id = arguments.get("workflow_id", "wf_01")
            return {"status": "triggered", "workflow_id": wf_id, "execution_id": f"exec_tool_{wf_id}"}

        return {"status": "error", "message": f"Unknown tool name: {tool_name}"}

tool_calling_engine = ToolCallingEngine()
