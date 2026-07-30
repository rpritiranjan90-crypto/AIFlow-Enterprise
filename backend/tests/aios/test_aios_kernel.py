"""
Comprehensive unit and integration tests for AIOS Kernel, Executive Society,
Memory Engine, and Enterprise Digital Twin.
"""

import pytest
from app.aios.digital_twin import digital_twin
from app.aios.executive_society import executive_society
from app.aios.kernel import aios_kernel
from app.aios.memory_engine import memory_engine


def test_aios_kernel_lifecycle():
    assert len(aios_kernel.capability_registry) >= 4

    reg_ok = aios_kernel.register_plugin("custom_fintech_plugin", "1.0.0", "app.plugins.fintech")
    assert reg_ok is True

    task = aios_kernel.schedule_task("Optimize cloud infrastructure costs", "DevOps", priority=5)
    assert task.id is not None
    assert task.status == "pending"


@pytest.mark.asyncio
async def test_executive_society_board_meeting():
    board_res = await executive_society.convene_executive_board("Expand AI infrastructure to European data centers")
    assert board_res["status"] == "approved"
    assert len(board_res["board_decisions"]) >= 5


def test_multi_tier_memory_engine():
    rec1 = memory_engine.store_memory("short_term", "session_user_context", {"role": "CISO"})
    assert rec1.id is not None

    memory_engine.add_knowledge_relation("AIFlow", "uses", "PostgreSQL")
    assert len(memory_engine.semantic_knowledge_graph) > 0


def test_digital_twin_and_self_healing():
    state = digital_twin.get_simulation_state()
    assert state["cluster_health"] == "healthy"

    healing_res = digital_twin.trigger_self_healing("ai_provider_degradation")
    assert healing_res["status"] == "resolved"
    assert "Anthropic" in healing_res["action_taken"]
