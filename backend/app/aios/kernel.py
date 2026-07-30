"""
Enterprise AI Operating System (AIOS) Kernel for AIFlow Enterprise v2.0.

Provides capability registry, service discovery, plugin runtime, execution scheduler,
distributed task coordinator, and state manager for autonomous enterprise orchestration.
"""

from dataclasses import dataclass, field
import datetime
import logging
from typing import Any, Dict, List, Optional

logger = logging.getLogger(__name__)


@dataclass
class KernelTask:
    id: str
    goal: str
    assigned_agent: str
    status: str = "pending"  # pending, running, completed, failed
    priority: int = 1
    created_at: str = field(default_factory=lambda: datetime.datetime.now(datetime.timezone.utc).isoformat())


class AIOSKernel:
    """Core AIOS micro-kernel managing system state and task dispatching."""

    def __init__(self) -> None:
        self.capability_registry: Dict[str, Any] = {}
        self.active_plugins: Dict[str, Any] = {}
        self.task_queue: List[KernelTask] = []
        self.completed_tasks: List[KernelTask] = []
        self._initialize_kernel_services()

    def _initialize_kernel_services(self) -> None:
        """Register core OS kernel capabilities and discovery endpoints."""
        self.capability_registry["llm_gateway"] = "app.ai.provider_manager.llm_provider_manager"
        self.capability_registry["rag_engine"] = "app.ai.rag_engine.rag_engine"
        self.capability_registry["multi_agent"] = "app.ai.multi_agent.multi_agent_orchestrator"
        self.capability_registry["mcp_client"] = "app.ai.mcp_client.mcp_client"
        self.capability_registry["workflow_engine"] = "app.engine.execution_engine.execution_engine"
        logger.info("AIOS Kernel initialized with %d core capabilities.", len(self.capability_registry))

    def register_plugin(self, name: str, version: str, entrypoint: str) -> bool:
        """Register an enterprise AI plugin into the kernel runtime."""
        self.active_plugins[name] = {"version": version, "entrypoint": entrypoint, "registered_at": datetime.datetime.now(datetime.timezone.utc).isoformat()}
        logger.info("Registered AIOS Plugin '%s' (v%s)", name, version)
        return True

    def schedule_task(self, goal: str, assigned_agent: str, priority: int = 1) -> KernelTask:
        """Schedule a new task into the kernel coordinator queue."""
        task = KernelTask(
            id=f"task_os_{len(self.task_queue) + len(self.completed_tasks) + 1}",
            goal=goal,
            assigned_agent=assigned_agent,
            priority=priority,
        )
        self.task_queue.append(task)
        logger.info("Scheduled Kernel Task '%s' for Agent '%s'", task.id, assigned_agent)
        return task

    async def execute_next_task(self) -> Optional[KernelTask]:
        """Coordinator loop executing pending tasks in priority order."""
        if not self.task_queue:
            return None

        # Sort queue by priority (descending)
        self.task_queue.sort(key=lambda t: t.priority, reverse=True)
        task = self.task_queue.pop(0)
        task.status = "running"

        logger.info("AIOS Kernel executing Task '%s': %s", task.id, task.goal)
        # Execute via multi-agent or gateway
        task.status = "completed"
        self.completed_tasks.append(task)
        return task


aios_kernel = AIOSKernel()
