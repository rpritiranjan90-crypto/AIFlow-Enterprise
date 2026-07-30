"""
Unit tests for telemetry decorators in app.monitoring.decorators.
"""

import asyncio
from unittest.mock import MagicMock, patch

import pytest
from app.monitoring.decorators import counted, timed, tracked
from app.monitoring.metrics import MonitoringMetrics
from app.monitoring.registry import MonitoringRegistry


@pytest.fixture(autouse=True)
def setup_monitoring():
    """Ensure MonitoringRegistry and MonitoringMetrics are clean for each test."""
    MonitoringMetrics.initialize()
    yield
    MonitoringRegistry().clear_registry()
    MonitoringMetrics._instance = None


def test_timed_sync():
    @timed(name="sample_sync_timed")
    def sample_fn(a: int, b: int) -> int:
        return a + b

    result = sample_fn(2, 3)
    assert result == 5

    metric = MonitoringRegistry().get_metric("function_duration_seconds")
    assert metric is not None


@pytest.mark.asyncio
async def test_timed_async():
    @timed(name="sample_async_timed")
    async def sample_async_fn(val: int) -> int:
        await asyncio.sleep(0.01)
        return val * 2

    result = await sample_async_fn(5)
    assert result == 10

    metric = MonitoringRegistry().get_metric("function_duration_seconds")
    assert metric is not None


def test_counted_sync():
    @counted(name="sample_sync_counted")
    def sample_fn():
        return "ok"

    res = sample_fn()
    assert res == "ok"

    metric = MonitoringRegistry().get_metric("function_calls_total")
    assert metric is not None


@pytest.mark.asyncio
async def test_counted_async():
    @counted(name="sample_async_counted")
    async def sample_async_fn():
        await asyncio.sleep(0.005)
        return "async_ok"

    res = await sample_async_fn()
    assert res == "async_ok"


def test_tracked_sync_success_and_exception():
    @tracked(name="sample_sync_tracked")
    def sync_tracked(should_raise: bool = False):
        if should_raise:
            raise ValueError("Sync error")
        return "success"

    assert sync_tracked(False) == "success"

    with pytest.raises(ValueError, match="Sync error"):
        sync_tracked(True)


@pytest.mark.asyncio
async def test_tracked_async_success_and_exception():
    @tracked(name="sample_async_tracked")
    async def async_tracked(should_raise: bool = False):
        await asyncio.sleep(0.005)
        if should_raise:
            raise RuntimeError("Async error")
        return "async_success"

    res = await async_tracked(False)
    assert res == "async_success"

    with pytest.raises(RuntimeError, match="Async error"):
        await async_tracked(True)


def test_telemetry_failure_graceful_handling():
    """Verify decorated functions do not crash if telemetry recording fails inside registry."""
    with patch.object(MonitoringRegistry, "get_metric", side_effect=Exception("Telemetry down")):
        @timed(name="resilient_fn")
        def resilient_fn():
            return "resilient"

        assert resilient_fn() == "resilient"
