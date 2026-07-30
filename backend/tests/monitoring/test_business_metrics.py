import pytest
from unittest.mock import MagicMock, patch

from app.monitoring.business_metrics import BusinessMetrics


def teardown_function():
    if BusinessMetrics._instance is not None:
        BusinessMetrics._instance.shutdown()


def test_initialize_returns_singleton():
    b1 = BusinessMetrics.initialize()
    b2 = BusinessMetrics.initialize()

    assert b1 is b2


def test_record_login():
    bm = BusinessMetrics.initialize()

    counter = MagicMock()

    with patch.object(
        bm._metrics.login_total,
        "labels",
        return_value=counter,
    ), patch("app.monitoring.business_metrics.logger.info"):

        bm.record_login()

    counter.inc.assert_called_once()


def test_record_logout():
    bm = BusinessMetrics.initialize()

    gauge = MagicMock()

    with patch.object(
        bm._metrics.active_users,
        "labels",
        return_value=gauge,
    ), patch("app.monitoring.business_metrics.logger.info"):

        bm.record_logout()

    gauge.dec.assert_called_once()


def test_record_active_user():
    bm = BusinessMetrics.initialize()

    gauge = MagicMock()

    with patch.object(
        bm._metrics.active_users,
        "labels",
        return_value=gauge,
    ):
        bm.record_active_user(active_count=5)

    gauge.set.assert_called_once_with(5.0)


def test_record_file_upload():
    bm = BusinessMetrics.initialize()

    counter = MagicMock()

    with patch.object(
        bm._metrics.uploaded_files_total,
        "labels",
        return_value=counter,
    ), patch("app.monitoring.business_metrics.logger.info"):

        bm.record_file_upload()

    counter.inc.assert_called_once()


def test_record_analysis():
    bm = BusinessMetrics.initialize()

    counter = MagicMock()

    with patch.object(
        bm._metrics.completed_analysis_total,
        "labels",
        return_value=counter,
    ), patch("app.monitoring.business_metrics.logger.info"):

        bm.record_analysis()

    counter.inc.assert_called_once()


def test_record_report_generation():
    bm = BusinessMetrics.initialize()

    counter = MagicMock()

    with patch.object(
        bm._metrics.generated_reports_total,
        "labels",
        return_value=counter,
    ), patch("app.monitoring.business_metrics.logger.info"):

        bm.record_report_generation()

    counter.inc.assert_called_once()


def test_get_request_id():
    bm = BusinessMetrics.initialize()

    assert bm._get_request_id() == "N/A"


def test_log_operation():
    bm = BusinessMetrics.initialize()

    with patch("app.monitoring.business_metrics.logger.info") as info:
        bm._log_operation(
            operation="upload",
            user_role="admin",
            user_id="1",
            duration=0.1,
            status="success",
            extra_details={"file": "demo.csv"},
        )

    info.assert_called_once()


def test_record_opentelemetry_span_without_sdk():
    bm = BusinessMetrics.initialize()

    bm._record_opentelemetry_span(
        operation="upload",
        user_role="admin",
        details={"file": "demo.csv"},
    )


@pytest.mark.asyncio
async def test_measure_operation_success():
    bm = BusinessMetrics.initialize()

    with patch.object(bm, "_log_operation") as log, \
         patch.object(bm, "_record_opentelemetry_span") as otel:

        async with bm.measure_operation(
            operation="upload",
            user_role="admin",
            user_id="1",
            details={"file": "demo.csv"},
        ) as ctx:

            ctx["status"] = "ok"

    log.assert_called_once()
    otel.assert_called_once()


@pytest.mark.asyncio
async def test_measure_operation_exception():
    bm = BusinessMetrics.initialize()

    with patch.object(bm, "_log_operation") as log, \
         patch.object(bm, "_record_opentelemetry_span") as otel:

        with pytest.raises(ValueError):
            async with bm.measure_operation("upload"):
                raise ValueError("boom")

    log.assert_called_once()
    otel.assert_called_once()


@pytest.mark.asyncio
async def test_instrument_operation():
    bm = BusinessMetrics.initialize()

    @bm.instrument_operation("upload")
    async def func():
        return "ok"

    result = await func()

    assert result == "ok"


def test_shutdown():
    bm = BusinessMetrics.initialize()

    bm.shutdown()

    assert BusinessMetrics._instance is None