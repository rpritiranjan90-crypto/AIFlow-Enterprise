import pytest
from unittest.mock import MagicMock, patch

from app.monitoring.redis_metrics import RedisMetrics


def teardown_function():
    if RedisMetrics._instance is not None:
        RedisMetrics._instance.shutdown()


def test_initialize_returns_singleton():
    r1 = RedisMetrics.initialize()
    r2 = RedisMetrics.initialize()

    assert r1 is r2


def test_record_hit():
    rm = RedisMetrics.initialize()

    counter = MagicMock()

    with patch.object(
        rm._metrics.redis_hits_total,
        "labels",
        return_value=counter,
    ):
        rm.record_hit()

    counter.inc.assert_called_once()


def test_record_miss():
    rm = RedisMetrics.initialize()

    counter = MagicMock()

    with patch.object(
        rm._metrics.redis_misses_total,
        "labels",
        return_value=counter,
    ):
        rm.record_miss()

    counter.inc.assert_called_once()


def test_record_latency():
    rm = RedisMetrics.initialize()

    histogram = MagicMock()

    with patch.object(
        rm._metrics.redis_latency_seconds,
        "labels",
        return_value=histogram,
    ):
        rm.record_latency("GET", 0.25)

    histogram.observe.assert_called_once_with(0.25)


def test_record_error():
    rm = RedisMetrics.initialize()

    counter = MagicMock()

    with patch.object(
        rm._metrics.redis_misses_total,
        "labels",
        return_value=counter,
    ), patch("app.monitoring.redis_metrics.logger.error") as log:

        rm.record_error("GET", "TimeoutError")

    counter.inc.assert_called_once()
    log.assert_called_once()


def test_update_connection_stats():
    rm = RedisMetrics.initialize()

    gauge = MagicMock()

    with patch.object(
        rm._metrics.redis_connections,
        "labels",
        return_value=gauge,
    ):
        rm.update_connection_stats(
            active=5,
            idle=3,
            total=8,
        )

    assert gauge.set.call_count == 3


def test_get_request_id():
    rm = RedisMetrics.initialize()

    assert rm._get_request_id() == "N/A"


def test_log_operation():
    rm = RedisMetrics.initialize()

    with patch("app.monitoring.redis_metrics.logger.debug") as debug:
        rm._log_operation(
            operation="GET",
            cache_name="redis",
            duration=0.1,
            status="success",
            key_prefix="user",
        )

    debug.assert_called_once()


def test_record_opentelemetry_span_without_sdk():
    rm = RedisMetrics.initialize()

    rm._record_opentelemetry_span(
        operation="GET",
        cache_name="redis",
        key_prefix="user",
    )


@pytest.mark.asyncio
async def test_measure_operation_success():
    rm = RedisMetrics.initialize()

    with patch.object(rm, "record_latency") as latency, \
         patch.object(rm, "_log_operation") as log, \
         patch.object(rm, "_record_opentelemetry_span") as otel:

        async with rm.measure_operation("GET"):
            pass

    latency.assert_called_once()
    log.assert_called_once()
    otel.assert_called_once()


@pytest.mark.asyncio
async def test_measure_operation_exception():
    rm = RedisMetrics.initialize()

    with patch.object(rm, "record_error") as error, \
         patch.object(rm, "record_latency"), \
         patch.object(rm, "_log_operation"), \
         patch.object(rm, "_record_opentelemetry_span"):

        with pytest.raises(ValueError):
            async with rm.measure_operation("GET"):
                raise ValueError("boom")

    error.assert_called_once()


@pytest.mark.asyncio
async def test_instrument_operation_hit():
    rm = RedisMetrics.initialize()

    @rm.instrument_operation("GET")
    async def func():
        return "value"

    with patch.object(rm, "record_hit") as hit, \
         patch.object(rm, "record_miss"):

        result = await func()

    assert result == "value"
    hit.assert_called_once()


@pytest.mark.asyncio
async def test_instrument_operation_miss():
    rm = RedisMetrics.initialize()

    @rm.instrument_operation("GET")
    async def func():
        return None

    with patch.object(rm, "record_hit"), \
         patch.object(rm, "record_miss") as miss:

        result = await func()

    assert result is None
    miss.assert_called_once()


def test_register_client():
    rm = RedisMetrics.initialize()

    client = object()

    result = rm.register_client(client)

    assert result is client
    assert id(client) in rm._instrumented_clients


def test_register_client_duplicate():
    rm = RedisMetrics.initialize()

    client = object()

    rm.register_client(client)
    rm.register_client(client)

    assert len(rm._instrumented_clients) == 1


def test_shutdown():
    rm = RedisMetrics.initialize()

    client = object()

    rm.register_client(client)

    rm.shutdown()

    assert RedisMetrics._instance is None