"""
Telemetry Decorators for AIFlow Enterprise.

Provides production-grade @timed, @counted, and @tracked decorators for sync and async
functions to record execution timing, call counts, and exception metrics using MonitoringRegistry.
"""

import asyncio
import functools
import inspect
import logging
import time
from typing import Any, Callable, Optional, TypeVar

from app.monitoring.registry import DuplicateMetricError, MonitoringRegistry

logger = logging.getLogger(__name__)

F = TypeVar("F", bound=Callable[..., Any])

HISTOGRAM_NAME = "aiflow_decorator_function_duration_seconds"
COUNTER_NAME = "aiflow_decorator_function_calls_total"
EXCEPTION_NAME = "aiflow_decorator_function_exceptions_total"


def _ensure_metrics() -> None:
    """Lazily ensure decorator metrics are registered in the MonitoringRegistry."""
    registry = MonitoringRegistry()

    try:
        if not registry.metric_exists("function_duration_seconds"):
            registry.register_histogram(
                name="function_duration_seconds",
                documentation="Execution duration of decorated functions in seconds",
                labelnames=("module", "function", "status"),
                namespace="aiflow",
                subsystem="decorator",
            )
    except DuplicateMetricError:
        pass
    except Exception as exc:
        logger.warning("Failed to register function_duration_seconds metric: %s", exc)

    try:
        if not registry.metric_exists("function_calls_total"):
            registry.register_counter(
                name="function_calls_total",
                documentation="Total calls to decorated functions",
                labelnames=("module", "function", "status"),
                namespace="aiflow",
                subsystem="decorator",
            )
    except DuplicateMetricError:
        pass
    except Exception as exc:
        logger.warning("Failed to register function_calls_total metric: %s", exc)

    try:
        if not registry.metric_exists("function_exceptions_total"):
            registry.register_counter(
                name="function_exceptions_total",
                documentation="Total exceptions raised by decorated functions",
                labelnames=("module", "function", "exception"),
                namespace="aiflow",
                subsystem="decorator",
            )
    except DuplicateMetricError:
        pass
    except Exception as exc:
        logger.warning("Failed to register function_exceptions_total metric: %s", exc)


def _safe_record_duration(module: str, function: str, status: str, duration: float) -> None:
    """Record function execution duration safely without breaking caller execution."""
    try:
        registry = MonitoringRegistry()
        metric = registry.get_metric("function_duration_seconds")
        metric.labels(module=module, function=function, status=status).observe(duration)
    except Exception as exc:
        logger.debug("Telemetry error recording duration for %s.%s: %s", module, function, exc)


def _safe_record_call(module: str, function: str, status: str) -> None:
    """Record function call counter safely without breaking caller execution."""
    try:
        registry = MonitoringRegistry()
        metric = registry.get_metric("function_calls_total")
        metric.labels(module=module, function=function, status=status).inc()
    except Exception as exc:
        logger.debug("Telemetry error recording call counter for %s.%s: %s", module, function, exc)


def _safe_record_exception(module: str, function: str, exception_name: str) -> None:
    """Record function exception counter safely without breaking caller execution."""
    try:
        registry = MonitoringRegistry()
        metric = registry.get_metric("function_exceptions_total")
        metric.labels(module=module, function=function, exception=exception_name).inc()
    except Exception as exc:
        logger.debug("Telemetry error recording exception counter for %s.%s: %s", module, function, exc)


def timed(name: Optional[str] = None) -> Callable[[F], F]:
    """Decorator to measure and record execution duration of sync and async functions using a Histogram."""
    _ensure_metrics()

    def decorator(func: F) -> F:
        func_module = func.__module__ or "unknown"
        func_name = name or func.__name__

        if inspect.iscoroutinefunction(func):
            @functools.wraps(func)
            async def async_wrapper(*args: Any, **kwargs: Any) -> Any:
                start_time = time.perf_counter()
                status = "success"
                try:
                    return await func(*args, **kwargs)
                except Exception as exc:
                    status = "error"
                    raise exc
                finally:
                    duration = time.perf_counter() - start_time
                    _safe_record_duration(func_module, func_name, status, duration)

            return async_wrapper  # type: ignore[return-value]
        else:
            @functools.wraps(func)
            def sync_wrapper(*args: Any, **kwargs: Any) -> Any:
                start_time = time.perf_counter()
                status = "success"
                try:
                    return func(*args, **kwargs)
                except Exception as exc:
                    status = "error"
                    raise exc
                finally:
                    duration = time.perf_counter() - start_time
                    _safe_record_duration(func_module, func_name, status, duration)

            return sync_wrapper  # type: ignore[return-value]

    return decorator


def counted(name: Optional[str] = None) -> Callable[[F], F]:
    """Decorator to increment call counters before and after execution of sync and async functions."""
    _ensure_metrics()

    def decorator(func: F) -> F:
        func_module = func.__module__ or "unknown"
        func_name = name or func.__name__

        if inspect.iscoroutinefunction(func):
            @functools.wraps(func)
            async def async_wrapper(*args: Any, **kwargs: Any) -> Any:
                _safe_record_call(func_module, func_name, "started")
                try:
                    result = await func(*args, **kwargs)
                    _safe_record_call(func_module, func_name, "success")
                    return result
                except Exception as exc:
                    _safe_record_call(func_module, func_name, "error")
                    raise exc

            return async_wrapper  # type: ignore[return-value]
        else:
            @functools.wraps(func)
            def sync_wrapper(*args: Any, **kwargs: Any) -> Any:
                _safe_record_call(func_module, func_name, "started")
                try:
                    result = func(*args, **kwargs)
                    _safe_record_call(func_module, func_name, "success")
                    return result
                except Exception as exc:
                    _safe_record_call(func_module, func_name, "error")
                    raise exc

            return sync_wrapper  # type: ignore[return-value]

    return decorator


def tracked(name: Optional[str] = None) -> Callable[[F], F]:
    """Decorator combining timing, call counting, and exception tracking for sync and async functions."""
    _ensure_metrics()

    def decorator(func: F) -> F:
        func_module = func.__module__ or "unknown"
        func_name = name or func.__name__

        if inspect.iscoroutinefunction(func):
            @functools.wraps(func)
            async def async_wrapper(*args: Any, **kwargs: Any) -> Any:
                start_time = time.perf_counter()
                status = "success"
                _safe_record_call(func_module, func_name, "started")
                try:
                    result = await func(*args, **kwargs)
                    _safe_record_call(func_module, func_name, "success")
                    return result
                except Exception as exc:
                    status = "error"
                    exc_name = exc.__class__.__name__
                    _safe_record_call(func_module, func_name, "error")
                    _safe_record_exception(func_module, func_name, exc_name)
                    raise exc
                finally:
                    duration = time.perf_counter() - start_time
                    _safe_record_duration(func_module, func_name, status, duration)

            return async_wrapper  # type: ignore[return-value]
        else:
            @functools.wraps(func)
            def sync_wrapper(*args: Any, **kwargs: Any) -> Any:
                start_time = time.perf_counter()
                status = "success"
                _safe_record_call(func_module, func_name, "started")
                try:
                    result = func(*args, **kwargs)
                    _safe_record_call(func_module, func_name, "success")
                    return result
                except Exception as exc:
                    status = "error"
                    exc_name = exc.__class__.__name__
                    _safe_record_call(func_module, func_name, "error")
                    _safe_record_exception(func_module, func_name, exc_name)
                    raise exc
                finally:
                    duration = time.perf_counter() - start_time
                    _safe_record_duration(func_module, func_name, status, duration)

            return sync_wrapper  # type: ignore[return-value]

    return decorator
