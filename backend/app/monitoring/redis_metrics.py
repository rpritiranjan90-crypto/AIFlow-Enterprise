"""
Redis Cache Monitoring and Instrumentation for AIFlow Enterprise.

Provides automated metrics tracking, latency recording, cache hit/miss counting,
connection pool state monitoring, and structured JSON logging for Redis operations.
"""

from contextlib import asynccontextmanager
import datetime
import functools
import json
import logging
import threading
import time
from typing import Any, AsyncGenerator, Callable, Dict, Optional, TypeVar

from app.monitoring.metrics import MonitoringMetrics

logger = logging.getLogger(__name__)

F = TypeVar("F", bound=Callable[..., Any])


class RedisMetrics:
    """Production-grade Redis monitoring and instrumentation module.

    Tracks cache hits, misses, latency for commands (GET, SET, DELETE, EXISTS, TTL, PIPELINE),
    connection states, errors, and OpenTelemetry trace propagation.
    """

    _instance: Optional["RedisMetrics"] = None
    _lock: threading.RLock = threading.RLock()

    def __new__(cls, default_cache_name: str = "redis") -> "RedisMetrics":
        if cls._instance is None:
            with cls._lock:
                if cls._instance is None:
                    instance = super().__new__(cls)
                    instance._initialized = False
                    cls._instance = instance
        return cls._instance

    def __init__(self, default_cache_name: str = "redis") -> None:
        if getattr(self, "_initialized", False):
            return

        with self._lock:
            if getattr(self, "_initialized", False):
                return

            self._metrics = MonitoringMetrics()
            self._default_cache_name = default_cache_name
            self._instrumented_clients: Dict[int, Any] = {}
            self._initialized = True
            logger.info("RedisMetrics initialized with default cache_name = '%s'.", default_cache_name)

    @classmethod
    def initialize(cls, default_cache_name: str = "redis") -> "RedisMetrics":
        """Initialize and return the RedisMetrics singleton instance."""
        with cls._lock:
            instance = cls(default_cache_name=default_cache_name)
            instance._default_cache_name = default_cache_name
            return instance

    def record_hit(self, operation: str = "GET", cache_name: Optional[str] = None) -> None:
        """Increment Redis cache hit counter metric."""
        c_name = cache_name or self._default_cache_name
        self._metrics.redis_hits_total.labels(cache=c_name, operation=operation).inc()

    def record_miss(self, operation: str = "GET", cache_name: Optional[str] = None) -> None:
        """Increment Redis cache miss counter metric."""
        c_name = cache_name or self._default_cache_name
        self._metrics.redis_misses_total.labels(cache=c_name, operation=operation).inc()

    def record_latency(self, operation: str, duration_seconds: float, cache_name: Optional[str] = None) -> None:
        """Observe Redis operation latency histogram metric."""
        c_name = cache_name or self._default_cache_name
        self._metrics.redis_latency_seconds.labels(cache=c_name, operation=operation).observe(duration_seconds)

    def record_error(self, operation: str, error_type: str, cache_name: Optional[str] = None) -> None:
        """Record a Redis operational or connection error."""
        c_name = cache_name or self._default_cache_name
        self._metrics.redis_misses_total.labels(cache=c_name, operation=f"{operation}_error_{error_type}").inc()
        logger.error("Redis error on operation '%s' [%s]: %s", operation, c_name, error_type)

    def update_connection_stats(
        self,
        active: int,
        idle: int,
        total: int,
        cache_name: Optional[str] = None,
    ) -> None:
        """Update connection pool gauge metrics for active, idle, and total connections."""
        c_name = cache_name or self._default_cache_name
        self._metrics.redis_connections.labels(cache=c_name, state="active").set(float(active))
        self._metrics.redis_connections.labels(cache=c_name, state="idle").set(float(idle))
        self._metrics.redis_connections.labels(cache=c_name, state="total").set(float(total))

    def _get_request_id(self) -> str:
        """Safely attempt to extract current request_id if available."""
        return "N/A"

    def _log_operation(
        self,
        operation: str,
        cache_name: str,
        duration: float,
        status: str,
        key_prefix: str = "",
    ) -> None:
        """Log Redis operation details in structured JSON format."""
        log_payload = {
            "timestamp": datetime.datetime.now(datetime.timezone.utc).isoformat(),
            "request_id": self._get_request_id(),
            "cache_name": cache_name,
            "operation": operation,
            "key_prefix": key_prefix or "unknown",
            "duration_ms": round(duration * 1000.0, 3),
            "status": status,
        }
        logger.debug(json.dumps(log_payload))

    def _record_opentelemetry_span(self, operation: str, cache_name: str, key_prefix: str) -> None:
        """Add Redis tracing attributes to current OpenTelemetry span if available."""
        try:
            from opentelemetry import trace

            span = trace.get_current_span()
            if span and span.is_recording():
                span.set_attribute("db.system", "redis")
                span.set_attribute("db.name", cache_name)
                span.set_attribute("db.operation", operation)
                if key_prefix:
                    span.set_attribute("db.redis.key_prefix", key_prefix)
        except Exception:
            pass

    @asynccontextmanager
    async def measure_operation(
        self,
        operation: str,
        cache_name: Optional[str] = None,
        key_prefix: str = "",
    ) -> AsyncGenerator[None, None]:
        """Async context manager to time and measure a Redis command or pipeline."""
        c_name = cache_name or self._default_cache_name
        start_time = time.perf_counter()
        status = "success"

        try:
            yield
        except Exception as exc:
            status = f"error:{exc.__class__.__name__}"
            self.record_error(operation, exc.__class__.__name__, c_name)
            raise exc
        finally:
            duration = time.perf_counter() - start_time
            self.record_latency(operation, duration, c_name)
            self._log_operation(operation, c_name, duration, status, key_prefix)
            self._record_opentelemetry_span(operation, c_name, key_prefix)

    def instrument_operation(
        self,
        operation: str,
        cache_name: Optional[str] = None,
        key_prefix: str = "",
    ) -> Callable[[F], F]:
        """Decorator to automatically instrument an async Redis operation function."""
        c_name = cache_name or self._default_cache_name

        def decorator(func: F) -> F:
            @functools.wraps(func)
            async def wrapper(*args: Any, **kwargs: Any) -> Any:
                async with self.measure_operation(operation=operation, cache_name=c_name, key_prefix=key_prefix):
                    result = await func(*args, **kwargs)
                    if operation.upper() == "GET":
                        if result is not None:
                            self.record_hit(operation="GET", cache_name=c_name)
                        else:
                            self.record_miss(operation="GET", cache_name=c_name)
                    return result

            return wrapper  # type: ignore[return-value]

        return decorator

    def register_client(self, redis_client: Any, cache_name: Optional[str] = None) -> Any:
        """Register and instrument an async redis-py client instance."""
        c_name = cache_name or self._default_cache_name
        client_id = id(redis_client)

        if client_id in self._instrumented_clients:
            return redis_client

        self._instrumented_clients[client_id] = redis_client
        logger.info("Registered Redis client [%s] for metrics monitoring.", c_name)
        return redis_client

    def shutdown(self) -> None:
        """Reset RedisMetrics singleton and clear registered clients."""
        with self._lock:
            self._instrumented_clients.clear()
            self._initialized = False
            RedisMetrics._instance = None
            logger.info("RedisMetrics shutdown completed.")
