import pytest
from unittest.mock import MagicMock, patch

from app.monitoring.ai_metrics import AIMetrics


def teardown_function():
    if AIMetrics._instance is not None:
        AIMetrics._instance.shutdown()


def test_initialize_returns_singleton():
    a1 = AIMetrics.initialize()
    a2 = AIMetrics.initialize()

    assert a1 is a2


def test_record_success():
    ai = AIMetrics.initialize()

    counter = MagicMock()

    with patch.object(
        ai._metrics.ai_requests_total,
        "labels",
        return_value=counter,
    ):
        ai.record_success("gpt-4")

    counter.inc.assert_called_once()


def test_record_failure():
    ai = AIMetrics.initialize()

    counter = MagicMock()

    with patch.object(
        ai._metrics.ai_failures_total,
        "labels",
        return_value=counter,
    ), patch("app.monitoring.ai_metrics.logger.error") as log:

        ai.record_failure("gpt-4", "TimeoutError")

    counter.inc.assert_called_once()
    log.assert_called_once()


def test_record_tokens():
    ai = AIMetrics.initialize()

    counter = MagicMock()

    with patch.object(
        ai._metrics.ai_tokens_total,
        "labels",
        return_value=counter,
    ):
        ai.record_tokens(
            "gpt-4",
            prompt_tokens=100,
            completion_tokens=50,
        )

    assert counter.inc.call_count == 3


def test_record_cost():
    ai = AIMetrics.initialize()

    counter = MagicMock()

    with patch.object(
        ai._metrics.ai_cost_total,
        "labels",
        return_value=counter,
    ):
        ai.record_cost("gpt-4", 0.25)

    counter.inc.assert_called_once_with(0.25)
    assert ai.get_daily_cumulative_cost() == 0.25


def test_get_request_id():
    ai = AIMetrics.initialize()

    assert ai._get_request_id() == "N/A"


def test_log_request():
    ai = AIMetrics.initialize()

    with patch("app.monitoring.ai_metrics.logger.info") as info:
        ai._log_request(
            provider="openai",
            model="gpt-4",
            operation="chat_completion",
            duration=0.2,
            status="success",
            prompt_tokens=10,
            completion_tokens=5,
            estimated_cost=0.01,
        )

    info.assert_called_once()


def test_record_opentelemetry_span_without_sdk():
    ai = AIMetrics.initialize()

    ai._record_opentelemetry_span(
        provider="openai",
        model="gpt-4",
        operation="chat_completion",
        prompt_tokens=10,
        completion_tokens=5,
        estimated_cost=0.01,
    )


@pytest.mark.asyncio
async def test_measure_request_success():
    ai = AIMetrics.initialize()

    histogram = MagicMock()

    with patch.object(
        ai._metrics.ai_request_duration_seconds,
        "labels",
        return_value=histogram,
    ), patch.object(ai, "record_success") as success, \
       patch.object(ai, "record_tokens") as tokens, \
       patch.object(ai, "record_cost") as cost, \
       patch.object(ai, "_log_request") as log, \
       patch.object(ai, "_record_opentelemetry_span") as otel:

        async with ai.measure_request(model="gpt-4") as ctx:
            ctx["prompt_tokens"] = 100
            ctx["completion_tokens"] = 50
            ctx["estimated_cost"] = 0.25

    histogram.observe.assert_called_once()
    success.assert_called_once()
    tokens.assert_called_once()
    cost.assert_called_once()
    log.assert_called_once()
    otel.assert_called_once()


@pytest.mark.asyncio
async def test_measure_request_exception():
    ai = AIMetrics.initialize()

    histogram = MagicMock()

    with patch.object(
        ai._metrics.ai_request_duration_seconds,
        "labels",
        return_value=histogram,
    ), patch.object(ai, "record_failure") as failure:

        with pytest.raises(ValueError):
            async with ai.measure_request(model="gpt-4"):
                raise ValueError("boom")

    failure.assert_called_once()
    histogram.observe.assert_called_once()


@pytest.mark.asyncio
async def test_instrument_request():
    ai = AIMetrics.initialize()

    @ai.instrument_request(model="gpt-4")
    async def func():
        return "ok"

    result = await func()

    assert result == "ok"


def test_shutdown():
    ai = AIMetrics.initialize()

    ai.record_cost("gpt-4", 1.0)

    assert ai.get_daily_cumulative_cost() == 1.0

    ai.shutdown()

    assert AIMetrics._instance is None