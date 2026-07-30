"""
Central Prometheus Metrics Registry for AIFlow Enterprise.

Provides a thread-safe, singleton metric registry to manage all application,
business, database, Redis, and AI-related metrics cleanly and reliably.
"""

from dataclasses import dataclass, field
import logging
import threading
import time
from typing import Dict, List, Mapping, Optional, Sequence, Tuple, Union

from prometheus_client import (
    CollectorRegistry,
    Counter,
    Enum,
    Gauge,
    Histogram,
    Info,
    Summary,
)

logger = logging.getLogger(__name__)

MetricType = Union[Counter, Gauge, Histogram, Summary, Info, Enum]


class MonitoringError(Exception):
    """Base exception for all monitoring registry operations."""


class DuplicateMetricError(MonitoringError):
    """Raised when attempting to register a metric that already exists."""


class MetricNotFoundError(MonitoringError):
    """Raised when a requested metric is not found in the registry."""


class RegistryInitializationError(MonitoringError):
    """Raised when the metrics registry fails to initialize properly."""


@dataclass
class MetricMetadata:
    """Metadata container for registered metrics."""

    name: str
    documentation: str
    metric_type: str
    labelnames: Tuple[str, ...]
    namespace: str = ""
    subsystem: str = ""
    unit: str = ""
    full_name: str = ""
    created_at: float = field(default_factory=time.time)


class MonitoringRegistry:
    """Thread-safe singleton metrics registry.

    Manages the lifecycle, registration, lookup, and clearing of Prometheus metrics
    across all subsystems in AIFlow Enterprise.
    """

    _instance: Optional["MonitoringRegistry"] = None
    _lock: threading.RLock = threading.RLock()

    def __new__(cls) -> "MonitoringRegistry":
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

            try:
                self._collector_registry: Optional[CollectorRegistry] = None
                self._metrics: Dict[str, MetricType] = {}
                self._metadata: Dict[str, MetricMetadata] = {}
                self._name_lookup: Dict[str, str] = {}
                self._initialized = True
                logger.info("MonitoringRegistry singleton initialized successfully.")
            except Exception as err:
                logger.error("Failed to initialize MonitoringRegistry: %s", err, exc_info=True)
                raise RegistryInitializationError(
                    f"Failed to initialize MonitoringRegistry: {err}"
                ) from err

    def _ensure_collector_registry(self) -> CollectorRegistry:
        if self._collector_registry is None:
            with self._lock:
                if self._collector_registry is None:
                    try:
                        self._collector_registry = CollectorRegistry(auto_describe=True)
                        logger.debug("CollectorRegistry lazily initialized.")
                    except Exception as err:
                        logger.error("Failed to construct CollectorRegistry: %s", err, exc_info=True)
                        raise RegistryInitializationError(
                            f"Failed to construct CollectorRegistry: {err}"
                        ) from err
        return self._collector_registry

    @staticmethod
    def _build_full_name(name: str, namespace: str = "", subsystem: str = "") -> str:
        parts = [p for p in (namespace, subsystem, name) if p]
        return "_".join(parts)

    def _check_duplicate(self, name: str, full_name: str) -> None:
        if name in self._metrics or full_name in self._metrics or full_name in self._name_lookup:
            logger.warning("Attempted duplicate metric registration for '%s' (full name: '%s').", name, full_name)
            raise DuplicateMetricError(
                f"Metric '{name}' (full name: '{full_name}') is already registered."
            )

    def registry(self) -> CollectorRegistry:
        """Return the underlying Prometheus CollectorRegistry instance."""
        return self._ensure_collector_registry()

    def metric_exists(self, name: str) -> bool:
        """Check if a metric exists by short name or full metric name."""
        with self._lock:
            if name in self._metrics or name in self._name_lookup:
                return True
            resolved = self._name_lookup.get(name)
            return resolved is not None and resolved in self._metrics

    def get_metric(self, name: str) -> MetricType:
        """Retrieve a registered metric by name or full metric name."""
        with self._lock:
            if name in self._metrics:
                return self._metrics[name]

            resolved_name = self._name_lookup.get(name)
            if resolved_name and resolved_name in self._metrics:
                return self._metrics[resolved_name]

            logger.error("Metric '%s' not found in registry.", name)
            raise MetricNotFoundError(f"Metric '{name}' is not registered.")

    def list_metrics(self) -> List[MetricMetadata]:
        """Return metadata for all registered metrics."""
        with self._lock:
            return list(self._metadata.values())

    def clear_registry(self) -> None:
        """Clear all registered metrics and reset the underlying CollectorRegistry."""
        with self._lock:
            logger.info("Clearing all metrics from MonitoringRegistry.")
            self._metrics.clear()
            self._metadata.clear()
            self._name_lookup.clear()
            self._collector_registry = None

    def register_counter(
        self,
        name: str,
        documentation: str,
        labelnames: Sequence[str] = (),
        namespace: str = "",
        subsystem: str = "",
        unit: str = "",
    ) -> Counter:
        """Register a new Counter metric."""
        with self._lock:
            full_name = self._build_full_name(name, namespace, subsystem)
            self._check_duplicate(name, full_name)

            registry = self._ensure_collector_registry()
            labels_tuple = tuple(labelnames)
            counter = Counter(
                name=name,
                documentation=documentation,
                labelnames=labels_tuple,
                namespace=namespace,
                subsystem=subsystem,
                unit=unit,
                registry=registry,
            )

            metadata = MetricMetadata(
                name=name,
                documentation=documentation,
                metric_type="counter",
                labelnames=labels_tuple,
                namespace=namespace,
                subsystem=subsystem,
                unit=unit,
                full_name=full_name,
            )

            self._metrics[full_name] = counter
            self._metadata[full_name] = metadata
            self._name_lookup[name] = full_name
            logger.info("Registered Counter metric '%s' (full name: '%s').", name, full_name)
            return counter

    def register_gauge(
        self,
        name: str,
        documentation: str,
        labelnames: Sequence[str] = (),
        namespace: str = "",
        subsystem: str = "",
        unit: str = "",
    ) -> Gauge:
        """Register a new Gauge metric."""
        with self._lock:
            full_name = self._build_full_name(name, namespace, subsystem)
            self._check_duplicate(name, full_name)

            registry = self._ensure_collector_registry()
            labels_tuple = tuple(labelnames)
            gauge = Gauge(
                name=name,
                documentation=documentation,
                labelnames=labels_tuple,
                namespace=namespace,
                subsystem=subsystem,
                unit=unit,
                registry=registry,
            )

            metadata = MetricMetadata(
                name=name,
                documentation=documentation,
                metric_type="gauge",
                labelnames=labels_tuple,
                namespace=namespace,
                subsystem=subsystem,
                unit=unit,
                full_name=full_name,
            )

            self._metrics[full_name] = gauge
            self._metadata[full_name] = metadata
            self._name_lookup[name] = full_name
            logger.info("Registered Gauge metric '%s' (full name: '%s').", name, full_name)
            return gauge

    def register_histogram(
        self,
        name: str,
        documentation: str,
        labelnames: Sequence[str] = (),
        buckets: Sequence[float] = Histogram.DEFAULT_BUCKETS,
        namespace: str = "",
        subsystem: str = "",
        unit: str = "",
    ) -> Histogram:
        """Register a new Histogram metric."""
        with self._lock:
            full_name = self._build_full_name(name, namespace, subsystem)
            self._check_duplicate(name, full_name)

            registry = self._ensure_collector_registry()
            labels_tuple = tuple(labelnames)
            buckets_tuple = tuple(buckets)
            histogram = Histogram(
                name=name,
                documentation=documentation,
                labelnames=labels_tuple,
                buckets=buckets_tuple,
                namespace=namespace,
                subsystem=subsystem,
                unit=unit,
                registry=registry,
            )

            metadata = MetricMetadata(
                name=name,
                documentation=documentation,
                metric_type="histogram",
                labelnames=labels_tuple,
                namespace=namespace,
                subsystem=subsystem,
                unit=unit,
                full_name=full_name,
            )

            self._metrics[full_name] = histogram
            self._metadata[full_name] = metadata
            self._name_lookup[name] = full_name
            logger.info("Registered Histogram metric '%s' (full name: '%s').", name, full_name)
            return histogram

    def register_summary(
        self,
        name: str,
        documentation: str,
        labelnames: Sequence[str] = (),
        objectives: Optional[Mapping[float, float]] = None,
        namespace: str = "",
        subsystem: str = "",
        unit: str = "",
    ) -> Summary:
        """Register a new Summary metric."""
        with self._lock:
            full_name = self._build_full_name(name, namespace, subsystem)
            self._check_duplicate(name, full_name)

            registry = self._ensure_collector_registry()
            labels_tuple = tuple(labelnames)
            summary_kwargs = {
                "name": name,
                "documentation": documentation,
                "labelnames": labels_tuple,
                "namespace": namespace,
                "subsystem": subsystem,
                "unit": unit,
                "registry": registry,
            }
            if objectives is not None:
                summary_kwargs["objectives"] = objectives

            summary = Summary(**summary_kwargs)

            metadata = MetricMetadata(
                name=name,
                documentation=documentation,
                metric_type="summary",
                labelnames=labels_tuple,
                namespace=namespace,
                subsystem=subsystem,
                unit=unit,
                full_name=full_name,
            )

            self._metrics[full_name] = summary
            self._metadata[full_name] = metadata
            self._name_lookup[name] = full_name
            logger.info("Registered Summary metric '%s' (full name: '%s').", name, full_name)
            return summary

    def register_info(
        self,
        name: str,
        documentation: str,
        labelnames: Sequence[str] = (),
        namespace: str = "",
        subsystem: str = "",
    ) -> Info:
        """Register a new Info metric."""
        with self._lock:
            full_name = self._build_full_name(name, namespace, subsystem)
            self._check_duplicate(name, full_name)

            registry = self._ensure_collector_registry()
            labels_tuple = tuple(labelnames)
            info = Info(
                name=name,
                documentation=documentation,
                labelnames=labels_tuple,
                namespace=namespace,
                subsystem=subsystem,
                registry=registry,
            )

            metadata = MetricMetadata(
                name=name,
                documentation=documentation,
                metric_type="info",
                labelnames=labels_tuple,
                namespace=namespace,
                subsystem=subsystem,
                unit="",
                full_name=full_name,
            )

            self._metrics[full_name] = info
            self._metadata[full_name] = metadata
            self._name_lookup[name] = full_name
            logger.info("Registered Info metric '%s' (full name: '%s').", name, full_name)
            return info

    def register_enum(
        self,
        name: str,
        documentation: str,
        labelnames: Sequence[str] = (),
        states: Optional[Sequence[str]] = None,
        namespace: str = "",
        subsystem: str = "",
    ) -> Enum:
        """Register a new Enum metric."""
        with self._lock:
            full_name = self._build_full_name(name, namespace, subsystem)
            self._check_duplicate(name, full_name)

            registry = self._ensure_collector_registry()
            labels_tuple = tuple(labelnames)
            enum_kwargs = {
                "name": name,
                "documentation": documentation,
                "labelnames": labels_tuple,
                "namespace": namespace,
                "subsystem": subsystem,
                "registry": registry,
            }
            if states is not None:
                enum_kwargs["states"] = list(states)

            enum_metric = Enum(**enum_kwargs)

            metadata = MetricMetadata(
                name=name,
                documentation=documentation,
                metric_type="enum",
                labelnames=labels_tuple,
                namespace=namespace,
                subsystem=subsystem,
                unit="",
                full_name=full_name,
            )

            self._metrics[full_name] = enum_metric
            self._metadata[full_name] = metadata
            self._name_lookup[name] = full_name
            logger.info("Registered Enum metric '%s' (full name: '%s').", name, full_name)
            return enum_metric
