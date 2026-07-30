"""
Business Domain Monitoring and Telemetry for AIFlow Enterprise.

Provides instrumentation for user logins, active user sessions, file uploads,
automated workflow analysis, business intelligence report generation, and structured JSON logging.
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


class BusinessMetrics:
    """Production-grade business operations telemetry module.

    Tracks logins, logouts, active sessions, file processing, automated analysis,
    report generation, and OpenTelemetry business attributes.
    """

    _instance: Optional["BusinessMetrics"] = None
    _lock: threading.RLock = threading.RLock()

    def __new__(cls) -> "BusinessMetrics":
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

            self._metrics = MonitoringMetrics()
            self._initialized = True
            logger.info("BusinessMetrics initialized successfully.")

    @classmethod
    def initialize(cls) -> "BusinessMetrics":
        """Initialize and return the BusinessMetrics singleton instance."""
        with cls._lock:
            return cls()

    def record_login(self, auth_provider: str = "jwt", status: str = "success") -> None:
        """Increment user login counter metric."""
        self._metrics.login_total.labels(auth_provider=auth_provider, status=status).inc()
        logger.info("Business Event - User Login: provider=%s, status=%s", auth_provider, status)

    def record_logout(self, user_role: str = "user") -> None:
        """Record user logout and decrement active users gauge."""
        self._metrics.active_users.labels(user_role=user_role).dec()
        logger.info("Business Event - User Logout: role=%s", user_role)

    def record_active_user(self, user_role: str = "user", active_count: int = 1) -> None:
        """Update or set current active users count gauge."""
        self._metrics.active_users.labels(user_role=user_role).set(float(active_count))

    def record_file_upload(self, file_type: str = "unknown", status: str = "success") -> None:
        """Increment uploaded files counter metric."""
        self._metrics.uploaded_files_total.labels(file_type=file_type, status=status).inc()
        logger.info("Business Event - File Upload: type=%s, status=%s", file_type, status)

    def record_analysis(self, analysis_type: str = "general", status: str = "success") -> None:
        """Increment completed workflow analysis counter metric."""
        self._metrics.completed_analysis_total.labels(analysis_type=analysis_type, status=status).inc()
        logger.info("Business Event - Analysis Workflow: type=%s, status=%s", analysis_type, status)

    def record_report_generation(self, report_type: str = "summary", report_format: str = "pdf") -> None:
        """Increment generated BI reports counter metric."""
        self._metrics.generated_reports_total.labels(report_type=report_type, format=report_format).inc()
        logger.info("Business Event - Report Generated: type=%s, format=%s", report_type, report_format)

    def _get_request_id(self) -> str:
        """Safely extract current request_id if available."""
        return "N/A"

    def _log_operation(
        self,
        operation: str,
        user_role: str,
        user_id: Optional[str],
        duration: float,
        status: str,
        extra_details: Optional[Dict[str, Any]] = None,
    ) -> None:
        """Log business operation in structured JSON format."""
        log_payload: Dict[str, Any] = {
            "timestamp": datetime.datetime.now(datetime.timezone.utc).isoformat(),
            "request_id": self._get_request_id(),
            "user_id": user_id or "anonymous",
            "user_role": user_role,
            "operation": operation,
            "duration_ms": round(duration * 1000.0, 3),
            "status": status,
        }
        if extra_details:
            log_payload.update(extra_details)
        logger.info(json.dumps(log_payload))

    def _record_opentelemetry_span(self, operation: str, user_role: str, details: Optional[Dict[str, Any]] = None) -> None:
        """Add business event attributes to current OpenTelemetry span if available."""
        try:
            from opentelemetry import trace

            span = trace.get_current_span()
            if span and span.is_recording():
                span.set_attribute("business.operation", operation)
                span.set_attribute("business.user_role", user_role)
                if details:
                    for k, v in details.items():
                        span.set_attribute(f"business.{k}", str(v))
        except Exception:
            pass

    @asynccontextmanager
    async def measure_operation(
        self,
        operation: str,
        user_role: str = "user",
        user_id: Optional[str] = None,
        details: Optional[Dict[str, Any]] = None,
    ) -> AsyncGenerator[Dict[str, Any], None]:
        """Async context manager to time, measure, and record business operations."""
        start_time = time.perf_counter()
        status = "success"
        context: Dict[str, Any] = details.copy() if details else {}

        try:
            yield context
        except Exception as exc:
            status = f"error:{exc.__class__.__name__}"
            raise exc
        finally:
            duration = time.perf_counter() - start_time
            self._log_operation(
                operation=operation,
                user_role=user_role,
                user_id=user_id,
                duration=duration,
                status=status,
                extra_details=context,
            )
            self._record_opentelemetry_span(operation=operation, user_role=user_role, details=context)

    def instrument_operation(
        self,
        operation: str,
        user_role: str = "user",
    ) -> Callable[[F], F]:
        """Decorator to automatically instrument an async business operation method."""
        def decorator(func: F) -> F:
            @functools.wraps(func)
            async def wrapper(*args: Any, **kwargs: Any) -> Any:
                async with self.measure_operation(operation=operation, user_role=user_role):
                    return await func(*args, **kwargs)

            return wrapper  # type: ignore[return-value]

        return decorator

    def shutdown(self) -> None:
        """Reset BusinessMetrics singleton instance."""
        with self._lock:
            self._initialized = False
            BusinessMetrics._instance = None
            logger.info("BusinessMetrics shutdown completed.")
