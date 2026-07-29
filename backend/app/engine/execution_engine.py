import json
from datetime import datetime
from typing import Any, Dict, List, Optional

from app.ai.agent_runtime import agent_runtime
from app.engine.compiler import dag_compiler
from app.engine.node_runners.code_runner import CodeNodeRunner
from app.engine.node_runners.communication_runner import CommunicationNodeRunner
from app.engine.node_runners.http_runner import HTTPNodeRunner
from app.engine.node_runners.logic_runner import LogicNodeRunner
from app.engine.node_runners.trigger_runner import TriggerNodeRunner
from app.engine.variable_engine import variable_engine
from app.logging.logger import logger

active_ws_subscribers: Dict[str, List[Any]] = {}

class AIRunnerAdapter:
    """Adapts Autonomous AgentRuntime for workflow node execution."""
    async def execute(self, node_data: Dict[str, Any], context: Dict[str, Any]) -> Dict[str, Any]:
        config = node_data.get("config", {})
        model = config.get("model", "gpt-4o")
        prompt = config.get("systemPrompt") or config.get("prompt") or "Analyze payload"

        res = await agent_runtime.run_agent(
            session_id=f"wf_ai_{context.get('execution', {}).get('id', '1')}",
            user_message=str(context.get("trigger", {})),
            model=model,
            enable_tools=True,
        )
        return {
            "ai_output": res["output"],
            "reasoning_steps": res["reasoning_steps"],
            "citations_count": len(res["citations"]),
            "tokens_used": res["tokens_used"],
        }

class ExecutionEngine:
    def __init__(self):
        self.trigger_runner = TriggerNodeRunner()
        self.http_runner = HTTPNodeRunner()
        self.logic_runner = LogicNodeRunner()
        self.comm_runner = CommunicationNodeRunner()
        self.code_runner = CodeNodeRunner()
        self.ai_runner = AIRunnerAdapter()

    def get_runner_for_node(self, node_type: str):
        if node_type in ["manual_trigger", "webhook", "schedule"]:
            return self.trigger_runner
        elif node_type in ["http_request", "rest_api"]:
            return self.http_runner
        elif node_type in ["condition", "router", "merge", "filter", "loop", "delay"]:
            return self.logic_runner
        elif node_type in ["slack", "email", "sms", "discord", "telegram"]:
            return self.comm_runner
        elif node_type in ["ai_agent", "rag_agent", "summarizer", "classifier", "translator", "code_generator", "data_analyst"]:
            return self.ai_runner
        else:
            return self.code_runner

    async def broadcast_status(self, execution_id: str, payload: dict):
        subs = active_ws_subscribers.get(execution_id, [])
        for ws in subs:
            try:
                await ws.send_json(payload)
            except Exception:
                pass

    async def run_workflow(
        self,
        execution_id: str,
        workflow_id: str,
        nodes: List[Dict[str, Any]],
        edges: List[Dict[str, Any]],
        trigger_payload: Optional[Dict[str, Any]] = None,
    ) -> Dict[str, Any]:
        logger.info(f"Starting execution [{execution_id}] for workflow [{workflow_id}]")
        start_time = datetime.utcnow()

        context: Dict[str, Any] = {
            "trigger": trigger_payload or {"event": "manual_trigger", "user": "alex@enterprise.io"},
            "workflow": {"id": workflow_id},
            "execution": {"id": execution_id, "startTime": start_time.isoformat()},
            "nodes": {},
        }

        try:
            sorted_nodes, plan_ids = dag_compiler.compile(nodes, edges)
        except Exception as e:
            logger.error(f"DAG compilation failed for [{execution_id}]: {e}")
            return {
                "execution_id": execution_id,
                "status": "failed",
                "error_message": f"Compilation error: {str(e)}",
                "duration_ms": 0,
                "nodes": [],
            }

        await self.broadcast_status(execution_id, {
            "type": "EXECUTION_STARTED",
            "execution_id": execution_id,
            "status": "running",
            "plan_ids": plan_ids,
        })

        executed_node_records: List[Dict[str, Any]] = []

        for node in sorted_nodes:
            node_id = node["id"]
            node_data = node.get("data", node)
            node_type = node_data.get("nodeType", node.get("node_type", "custom"))
            node_name = node_data.get("name", node.get("name", node_id))

            await self.broadcast_status(execution_id, {
                "type": "NODE_STARTED",
                "node_id": node_id,
                "node_name": node_name,
                "status": "running",
            })

            node_start = datetime.utcnow()
            runner = self.get_runner_for_node(node_type)

            resolved_config = variable_engine.resolve(node_data.get("config", {}), context)
            executable_node_data = {**node_data, "config": resolved_config}

            output_payload = {}
            node_status = "completed"
            error_msg = None

            try:
                output_payload = await runner.execute(executable_node_data, context)
                context["nodes"][node_id] = {"output": output_payload}
            except Exception as ex:
                logger.error(f"Node [{node_name}] failed in execution [{execution_id}]: {ex}")
                node_status = "failed"
                error_msg = str(ex)

            node_duration = int((datetime.utcnow() - node_start).total_seconds() * 1000)

            node_record = {
                "node_id": node_id,
                "node_name": node_name,
                "node_type": node_type,
                "status": node_status,
                "duration_ms": node_duration,
                "input_json": json.dumps(resolved_config),
                "output_json": json.dumps(output_payload),
                "error_message": error_msg,
            }
            executed_node_records.append(node_record)

            await self.broadcast_status(execution_id, {
                "type": "NODE_FINISHED",
                "node_id": node_id,
                "status": node_status,
                "duration_ms": node_duration,
                "output": output_payload,
            })

            if node_status == "failed":
                total_duration = int((datetime.utcnow() - start_time).total_seconds() * 1000)
                await self.broadcast_status(execution_id, {
                    "type": "EXECUTION_FAILED",
                    "execution_id": execution_id,
                    "status": "failed",
                    "error_message": error_msg,
                })
                return {
                    "execution_id": execution_id,
                    "status": "failed",
                    "error_message": error_msg,
                    "duration_ms": total_duration,
                    "nodes": executed_node_records,
                }

        total_duration = int((datetime.utcnow() - start_time).total_seconds() * 1000)
        await self.broadcast_status(execution_id, {
            "type": "EXECUTION_COMPLETED",
            "execution_id": execution_id,
            "status": "completed",
            "duration_ms": total_duration,
        })

        logger.info(f"Execution [{execution_id}] completed successfully in {total_duration}ms")
        return {
            "execution_id": execution_id,
            "status": "completed",
            "duration_ms": total_duration,
            "nodes": executed_node_records,
        }

execution_engine = ExecutionEngine()
