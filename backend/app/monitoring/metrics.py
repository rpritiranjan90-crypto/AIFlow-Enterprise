"""
Application Metrics Registry and Definitions for AIFlow Enterprise.

Defines and initializes all HTTP, Database, Redis, AI, Business, and System metrics
using the central MonitoringRegistry singleton.
"""

import logging
import threading
from typing import Dict, List, Optional, Tuple

from prometheus_client import Counter, Gauge, Histogram
from app.monitoring.registry import (
    MetricMetadata,
    MetricType,
    MonitoringRegistry,
)

logger = logging.getLogger(__name__)

# Standard latency buckets for HTTP APIs (in seconds)
DEFAULT_HTTP_BUCKETS: Tuple[float, ...] = (
    0.005,
    0.01,
    0.025,
    0.05,
    0.075,
    0.1,
    0.25,
    0.5,
    0.75,
    1.0,
    2.5,
    5.0,
    7.5,
    10.0,
)

# Standard latency buckets for Database queries (in seconds)
DEFAULT_DB_BUCKETS: Tuple[float, ...] = (
    0.001,
    0.005,
    0.01,
    0.025,
    0.05,
    0.1,
    0.25,
    0.5,
    1.0,
    2.5,
    5.0,
)

# Standard latency buckets for Redis operations (in seconds)
DEFAULT_REDIS_BUCKETS: Tuple[float, ...] = (
    0.0005,
    0.001,
    0.0025,
    0.005,
    0.01,
    0.025,
    0.05,
    0.1,
    0.25,
    0.5,
    1.0,
)

# Standard latency buckets for AI inference requests (in seconds)
DEFAULT_AI_BUCKETS: Tuple[float, ...] = (
    0.1,
    0.25,
    0.5,
    1.0,
    2.5,
    5.0,
    10.0,
    20.0,
    30.0,
    60.0,
)

# Standard payload size buckets (in bytes)
DEFAULT_PAYLOAD_BUCKETS: Tuple[float, ...] = (
    100.0,
    1000.0,
    10000.0,
    100000.0,
    1000000.0,
    10000000.0,
)


class MonitoringMetrics:
    """Central manager for all application metrics in AIFlow Enterprise.

    Exposes all registered Prometheus metrics for HTTP, Database, Redis, AI,
    Business, and System monitoring through a single thread-safe interface.
    """

    _instance: Optional["MonitoringMetrics"] = None
    _lock: threading.RLock = threading.RLock()

    def __new__(cls) -> "MonitoringMetrics":
        if cls._instance is None:
            with cls._lock:
                if cls._instance is None:
                    instance = super().__new__(cls)
                    instance._initialized = False
                    cls._instance = instance
        return cls._instance

    def __init__(self) -> None:
        if getattr(self, "_initialized", False):
            return

        with self._lock:
            if getattr(self, "_initialized", False):
                return

            self._registry = MonitoringRegistry()
            self._namespace = "aiflow"
            self._metrics: Dict[str, MetricType] = {}

            # Metric attribute declarations
            self.http_requests_total: Counter
            self.http_requests_in_progress: Gauge
            self.http_request_duration_seconds: Histogram
            self.http_request_size_bytes: Histogram
            self.http_response_size_bytes: Histogram
            self.http_exceptions_total: Counter

            self.db_connections: Gauge
            self.db_queries_total: Counter
            self.db_query_duration_seconds: Histogram
            self.db_slow_queries_total: Counter
            self.db_failed_queries_total: Counter

            self.redis_hits_total: Counter
            self.redis_misses_total: Counter
            self.redis_latency_seconds: Histogram
            self.redis_connections: Gauge

            self.ai_requests_total: Counter
            self.ai_request_duration_seconds: Histogram
            self.ai_tokens_total: Counter
            self.ai_cost_total: Counter
            self.ai_failures_total: Counter

            self.uploaded_files_total: Counter
            self.completed_analysis_total: Counter
            self.generated_reports_total: Counter
            self.active_users: Gauge
            self.login_total: Counter

            self.cpu_usage_percent: Gauge
            self.memory_usage_bytes: Gauge
            self.disk_usage_bytes: Gauge
            self.process_uptime_seconds: Gauge

            self._register_all_metrics()
            self._initialized = True
            logger.info("MonitoringMetrics initialized successfully.")

    @classmethod
    def initialize(cls, namespace: str = "aiflow") -> "MonitoringMetrics":
        """Initialize and return the MonitoringMetrics singleton instance."""
        with cls._lock:
            instance = cls()
            instance._namespace = namespace
            return instance

    def _register_all_metrics(self) -> None:
        """Register all HTTP, Database, Redis, AI, Business, and System metrics."""
        reg = self._registry
        ns = self._namespace

        # --- HTTP Metrics ---
        self.http_requests_total = reg.register_counter(
            name="requests_total",
            documentation="Total number of HTTP requests processed",
            labelnames=("method", "endpoint", "status"),
            namespace=ns,
            subsystem="http",
        )
        self.http_requests_in_progress = reg.register_gauge(
            name="requests_in_progress",
            documentation="Number of HTTP requests currently being processed",
            labelnames=("method", "endpoint"),
            namespace=ns,
            subsystem="http",
        )
        self.http_request_duration_seconds = reg.register_histogram(
            name="request_duration_seconds",
            documentation="HTTP request latency in seconds",
            labelnames=("method", "endpoint", "status"),
            buckets=DEFAULT_HTTP_BUCKETS,
            namespace=ns,
            subsystem="http",
        )
        self.http_request_size_bytes = reg.register_histogram(
            name="request_size_bytes",
            documentation="HTTP request payload size in bytes",
            labelnames=("method", "endpoint"),
            buckets=DEFAULT_PAYLOAD_BUCKETS,
            namespace=ns,
            subsystem="http",
        )
        self.http_response_size_bytes = reg.register_histogram(
            name="response_size_bytes",
            documentation="HTTP response payload size in bytes",
            labelnames=("method", "endpoint", "status"),
            buckets=DEFAULT_PAYLOAD_BUCKETS,
            namespace=ns,
            subsystem="http",
        )
        self.http_exceptions_total = reg.register_counter(
            name="exceptions_total",
            documentation="Total number of HTTP exceptions encountered",
            labelnames=("method", "endpoint", "exception_type"),
            namespace=ns,
            subsystem="http",
        )

        # --- Database Metrics ---
        self.db_connections = reg.register_gauge(
            name="connections",
            documentation="Number of active database connections",
            labelnames=("database", "state"),
            namespace=ns,
            subsystem="db",
        )
        self.db_queries_total = reg.register_counter(
            name="queries_total",
            documentation="Total number of database queries executed",
            labelnames=("database", "operation"),
            namespace=ns,
            subsystem="db",
        )
        self.db_query_duration_seconds = reg.register_histogram(
            name="query_duration_seconds",
            documentation="Database query execution duration in seconds",
            labelnames=("database", "operation"),
            buckets=DEFAULT_DB_BUCKETS,
            namespace=ns,
            subsystem="db",
        )
        self.db_slow_queries_total = reg.register_counter(
            name="slow_queries_total",
            documentation="Total number of slow database queries exceeding threshold",
            labelnames=("database", "operation"),
            namespace=ns,
            subsystem="db",
        )
        self.db_failed_queries_total = reg.register_counter(
            name="failed_queries_total",
            documentation="Total number of failed database queries",
            labelnames=("database", "operation", "error_type"),
            namespace=ns,
            subsystem="db",
        )

        # --- Redis Metrics ---
        self.redis_hits_total = reg.register_counter(
            name="hits_total",
            documentation="Total number of Redis cache hits",
            labelnames=("cache", "operation"),
            namespace=ns,
            subsystem="redis",
        )
        self.redis_misses_total = reg.register_counter(
            name="misses_total",
            documentation="Total number of Redis cache misses",
            labelnames=("cache", "operation"),
            namespace=ns,
            subsystem="redis",
        )
        self.redis_latency_seconds = reg.register_histogram(
            name="latency_seconds",
            documentation="Redis operation duration in seconds",
            labelnames=("cache", "operation"),
            buckets=DEFAULT_REDIS_BUCKETS,
            namespace=ns,
            subsystem="redis",
        )
        self.redis_connections = reg.register_gauge(
            name="connections",
            documentation="Number of active Redis connections",
            labelnames=("cache", "state"),
            namespace=ns,
            subsystem="redis",
        )

        # --- AI Metrics ---
        self.ai_requests_total = reg.register_counter(
            name="requests_total",
            documentation="Total number of AI model inference requests",
            labelnames=("model", "operation"),
            namespace=ns,
            subsystem="ai",
        )
        self.ai_request_duration_seconds = reg.register_histogram(
            name="request_duration_seconds",
            documentation="AI model request duration in seconds",
            labelnames=("model", "operation"),
            buckets=DEFAULT_AI_BUCKETS,
            namespace=ns,
            subsystem="ai",
        )
        self.ai_tokens_total = reg.register_counter(
            name="tokens_total",
            documentation="Total number of AI tokens processed",
            labelnames=("model", "token_type"),
            namespace=ns,
            subsystem="ai",
        )
        self.ai_cost_total = reg.register_counter(
            name="cost_total",
            documentation="Cumulative estimated cost of AI model requests",
            labelnames=("model", "currency"),
            namespace=ns,
            subsystem="ai",
        )
        self.ai_failures_total = reg.register_counter(
            name="failures_total",
            documentation="Total number of failed AI model requests",
            labelnames=("model", "error_type"),
            namespace=ns,
            subsystem="ai",
        )

        # --- Business Metrics ---
        self.uploaded_files_total = reg.register_counter(
            name="uploaded_files_total",
            documentation="Total number of uploaded files",
            labelnames=("file_type", "status"),
            namespace=ns,
            subsystem="business",
        )
        self.completed_analysis_total = reg.register_counter(
            name="completed_analysis_total",
            documentation="Total number of completed automated analysis workflows",
            labelnames=("analysis_type", "status"),
            namespace=ns,
            subsystem="business",
        )
        self.generated_reports_total = reg.register_counter(
            name="generated_reports_total",
            documentation="Total number of generated business intelligence reports",
            labelnames=("report_type", "format"),
            namespace=ns,
            subsystem="business",
        )
        self.active_users = reg.register_gauge(
            name="active_users",
            documentation="Current number of active user sessions",
            labelnames=("user_role",),
            namespace=ns,
            subsystem="business",
        )
        self.login_total = reg.register_counter(
            name="login_total",
            documentation="Total number of login attempts",
            labelnames=("auth_provider", "status"),
            namespace=ns,
            subsystem="business",
        )

        # --- System Metrics ---
        self.cpu_usage_percent = reg.register_gauge(
            name="cpu_usage_percent",
            documentation="Current system CPU usage percentage",
            labelnames=("service",),
            namespace=ns,
            subsystem="system",
        )
        self.memory_usage_bytes = reg.register_gauge(
            name="memory_usage_bytes",
            documentation="Current memory usage in bytes",
            labelnames=("service", "type"),
            namespace=ns,
            subsystem="system",
        )
        self.disk_usage_bytes = reg.register_gauge(
            name="disk_usage_bytes",
            documentation="Current disk usage in bytes",
            labelnames=("service", "mount"),
            namespace=ns,
            subsystem="system",
        )
        self.process_uptime_seconds = reg.register_gauge(
            name="process_uptime_seconds",
            documentation="Service process uptime in seconds",
            labelnames=("service",),
            namespace=ns,
            subsystem="system",
        )

    def get_metric(self, name: str) -> MetricType:
        """Retrieve a metric by name or full metric name."""
        return self._registry.get_metric(name)

    def list_metrics(self) -> List[MetricMetadata]:
        """List metadata for all registered application metrics."""
        return self._registry.list_metrics()

    def reset(self) -> None:
        """Reset and clear all registered metrics."""
        with self._lock:
            self._registry.clear_registry()
            self._initialized = False
            MonitoringMetrics._instance = None
            logger.info("MonitoringMetrics reset successfully.")
