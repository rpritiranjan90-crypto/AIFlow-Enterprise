import pytest

from prometheus_client import Counter, Gauge

from app.monitoring.registry import (
    DuplicateMetricError,
    MetricNotFoundError,
    MonitoringRegistry,
)


def teardown_function():
    if MonitoringRegistry._instance is not None:
        MonitoringRegistry._instance.clear_registry()
        MonitoringRegistry._instance._initialized = False
        MonitoringRegistry._instance = None


@pytest.fixture
def registry():
    MonitoringRegistry._instance = None
    reg = MonitoringRegistry.initialize() if hasattr(MonitoringRegistry, "initialize") else MonitoringRegistry()
    reg.clear_registry()
    return reg


def test_singleton():
    r1 = MonitoringRegistry()
    r2 = MonitoringRegistry()

    assert r1 is r2


def test_registry_created(registry):
    assert registry.registry() is not None


def test_build_full_name():
    assert (
        MonitoringRegistry._build_full_name(
            "requests",
            "app",
            "api",
        )
        == "app_api_requests"
    )

    assert (
        MonitoringRegistry._build_full_name(
            "requests",
            "",
            "",
        )
        == "requests"
    )


def test_register_counter(registry):
    metric = registry.register_counter(
        name="requests_total",
        documentation="Total Requests",
        labelnames=("status",),
    )

    assert isinstance(metric, Counter)
    assert registry.metric_exists("requests_total")
    assert registry.metric_exists("requests_total")

    stored = registry.get_metric("requests_total")

    assert stored is metric


def test_register_gauge(registry):
    metric = registry.register_gauge(
        name="active_users",
        documentation="Active Users",
        labelnames=("role",),
    )

    assert isinstance(metric, Gauge)

    stored = registry.get_metric("active_users")

    assert stored is metric


def test_metric_exists_false(registry):
    assert registry.metric_exists("does_not_exist") is False


def test_get_metric_missing(registry):
    with pytest.raises(MetricNotFoundError):
        registry.get_metric("missing_metric")


def test_list_metrics(registry):
    registry.register_counter(
        "counter1",
        "Counter",
    )

    registry.register_gauge(
        "gauge1",
        "Gauge",
    )

    metrics = registry.list_metrics()

    assert len(metrics) == 2

    names = {m.name for m in metrics}

    assert "counter1" in names
    assert "gauge1" in names


def test_duplicate_counter(registry):
    registry.register_counter(
        "dup_counter",
        "Duplicate",
    )

    with pytest.raises(DuplicateMetricError):
        registry.register_counter(
            "dup_counter",
            "Duplicate",
        )


def test_duplicate_gauge(registry):
    registry.register_gauge(
        "dup_gauge",
        "Duplicate",
    )

    with pytest.raises(DuplicateMetricError):
        registry.register_gauge(
            "dup_gauge",
            "Duplicate",
        )


def test_clear_registry(registry):
    registry.register_counter(
        "counter",
        "Counter",
    )

    assert len(registry.list_metrics()) == 1

    registry.clear_registry()

    assert registry.list_metrics() == []
    assert registry.metric_exists("counter") is False


def test_metadata_values(registry):
    registry.register_counter(
        name="login_total",
        documentation="Login Counter",
        labelnames=("provider",),
        namespace="app",
        subsystem="auth",
        unit="requests",
    )

    metadata = registry.list_metrics()[0]

    assert metadata.name == "login_total"
    assert metadata.metric_type == "counter"
    assert metadata.namespace == "app"
    assert metadata.subsystem == "auth"
    assert metadata.unit == "requests"
    assert metadata.full_name == "app_auth_login_total"
from prometheus_client import Histogram, Summary, Info, Enum

from app.monitoring.registry import DuplicateMetricError


def test_register_histogram(registry):
    metric = registry.register_histogram(
        name="response_time",
        documentation="Response Time",
        labelnames=("endpoint",),
        buckets=(0.1, 0.5, 1.0),
    )

    assert isinstance(metric, Histogram)

    stored = registry.get_metric("response_time")

    assert stored is metric


def test_register_summary(registry):
    metric = registry.register_summary(
        name="processing_time",
        documentation="Processing Time",
        labelnames=("service",),
    )

    assert isinstance(metric, Summary)

    stored = registry.get_metric("processing_time")

    assert stored is metric


# def test_register_summary_with_objectives(registry):
#     metric = registry.register_summary(
#         name="processing_time_objectives",
#         documentation="Processing Time",
#         objectives={
#             0.5: 0.05,
#             0.9: 0.01,
#         },
#     )

#     assert isinstance(metric, Summary)


def test_register_info(registry):
    metric = registry.register_info(
        name="application",
        documentation="Application Info",
    )

    assert isinstance(metric, Info)

    stored = registry.get_metric("application")

    assert stored is metric


def test_register_enum(registry):
    metric = registry.register_enum(
        name="service_state",
        documentation="Service State",
        states=[
            "starting",
            "running",
            "stopped",
        ],
    )

    assert isinstance(metric, Enum)

    stored = registry.get_metric("service_state")

    assert stored is metric


def test_duplicate_histogram(registry):
    registry.register_histogram(
        "dup_histogram",
        "Histogram",
    )

    with pytest.raises(DuplicateMetricError):
        registry.register_histogram(
            "dup_histogram",
            "Histogram",
        )


def test_duplicate_summary(registry):
    registry.register_summary(
        "dup_summary",
        "Summary",
    )

    with pytest.raises(DuplicateMetricError):
        registry.register_summary(
            "dup_summary",
            "Summary",
        )


def test_duplicate_info(registry):
    registry.register_info(
        "dup_info",
        "Info",
    )

    with pytest.raises(DuplicateMetricError):
        registry.register_info(
            "dup_info",
            "Info",
        )


def test_duplicate_enum(registry):
    registry.register_enum(
        "dup_enum",
        "Enum",
        states=["a", "b"],
    )

    with pytest.raises(DuplicateMetricError):
        registry.register_enum(
            "dup_enum",
            "Enum",
            states=["a", "b"],
        )


def test_metric_lookup_after_registration(registry):
    registry.register_counter(
        name="lookup_counter",
        documentation="Lookup Counter",
    )

    assert registry.metric_exists("lookup_counter")

    metric = registry.get_metric("lookup_counter")

    assert metric is not None


def test_multiple_metric_types(registry):
    registry.register_counter(
        "counter_a",
        "Counter",
    )

    registry.register_gauge(
        "gauge_a",
        "Gauge",
    )

    registry.register_histogram(
        "histogram_a",
        "Histogram",
    )

    registry.register_summary(
        "summary_a",
        "Summary",
    )

    registry.register_info(
        "info_a",
        "Info",
    )

    registry.register_enum(
        "enum_a",
        "Enum",
        states=["up", "down"],
    )

    metrics = registry.list_metrics()

    assert len(metrics) == 6


def test_clear_then_register_again(registry):
    registry.register_counter(
        "requests",
        "Requests",
    )

    registry.clear_registry()

    metric = registry.register_counter(
        "requests",
        "Requests",
    )

    assert metric is not None

    assert registry.metric_exists("requests")


def test_metadata_types(registry):
    registry.register_histogram(
        "hist_meta",
        "Histogram",
    )

    registry.register_summary(
        "summary_meta",
        "Summary",
    )

    registry.register_info(
        "info_meta",
        "Info",
    )

    registry.register_enum(
        "enum_meta",
        "Enum",
        states=["on", "off"],
    )

    metadata = {
        m.name: m.metric_type
        for m in registry.list_metrics()
    }

    assert metadata["hist_meta"] == "histogram"
    assert metadata["summary_meta"] == "summary"
    assert metadata["info_meta"] == "info"
    assert metadata["enum_meta"] == "enum"


def test_registry_recreated_after_clear(registry):
    old_registry = registry.registry()

    registry.clear_registry()

    new_registry = registry.registry()

    assert new_registry is not old_registry


def test_multiple_clear_operations(registry):
    registry.clear_registry()
    registry.clear_registry()
    registry.clear_registry()

    assert registry.list_metrics() == []


def test_metric_exists_after_clear(registry):
    registry.register_counter(
        "temp_counter",
        "Temp",
    )

    registry.clear_registry()

    assert registry.metric_exists("temp_counter") is False