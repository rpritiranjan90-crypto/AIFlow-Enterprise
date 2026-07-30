"""
Unit tests for telemetry exporters in app.monitoring.exporters.
"""

import asyncio
from unittest.mock import MagicMock, patch

import pytest
from app.monitoring.exporters import TelemetryExporters
from app.monitoring.registry import MonitoringRegistry


@pytest.fixture(autouse=True)
def cleanup_exporters():
    """Ensure TelemetryExporters singleton is reset before and after each test."""
    TelemetryExporters().shutdown()
    yield
    TelemetryExporters().shutdown()


def test_exporters_singleton_and_lazy_init():
    exp1 = TelemetryExporters.initialize()
    exp2 = TelemetryExporters()
    assert exp1 is exp2


def test_pushgateway_disabled_by_default():
    exporters = TelemetryExporters.initialize()
    result = exporters.push_to_pushgateway()
    assert result is False


@patch.dict("os.environ", {"PROMETHEUS_PUSHGATEWAY_ENABLED": "true", "PROMETHEUS_PUSHGATEWAY_URL": "http://localhost:9091"})
def test_pushgateway_retry_success():
    exporters = TelemetryExporters()
    exporters._pushgateway_enabled = True
    exporters._pushgateway_url = "http://localhost:9091"

    mock_push = MagicMock()
    with patch("prometheus_client.push_to_gateway", mock_push):
        success = exporters.push_to_pushgateway(max_retries=2)
        assert success is True
        mock_push.assert_called_once()


@patch.dict("os.environ", {"PROMETHEUS_PUSHGATEWAY_ENABLED": "true", "PROMETHEUS_PUSHGATEWAY_URL": "http://localhost:9091"})
def test_pushgateway_retry_failure():
    exporters = TelemetryExporters()
    exporters._pushgateway_enabled = True
    exporters._pushgateway_url = "http://localhost:9091"

    mock_push = MagicMock(side_effect=Exception("Connection refused"))
    with patch("prometheus_client.push_to_gateway", mock_push):
        with patch("time.sleep", return_value=None):
            success = exporters.push_to_pushgateway(max_retries=3)
            assert success is False
            assert mock_push.call_count == 3


@pytest.mark.asyncio
async def test_background_push_lifecycle():
    exporters = TelemetryExporters.initialize()
    exporters._pushgateway_enabled = True
    exporters._pushgateway_url = "http://localhost:9091"

    with patch.object(exporters, "push_to_pushgateway", return_value=True):
        await exporters.start_background_push(interval_seconds=0.05)
        await asyncio.sleep(0.12)
        await exporters.stop_background_push()
        assert exporters._background_task is None


def test_otlp_exporter_setup_disabled():
    exporters = TelemetryExporters.initialize()
    assert exporters.setup_otlp_exporter() is False


def test_otlp_exporter_setup_enabled_or_fallback():
    exporters = TelemetryExporters()
    exporters._otlp_enabled = True
    exporters._otlp_endpoint = "http://localhost:4318"

    result = exporters.setup_otlp_exporter()
    # Should either succeed (if opentelemetry is installed) or return False gracefully without raising
    assert isinstance(result, bool)
