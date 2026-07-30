"""
HTTP Monitoring and Instrumentation Middleware for AIFlow Enterprise.

Provides automated HTTP request tracing, latency tracking, payload sizing,
structured JSON logging, correlation ID propagation, and error handling.
"""

import datetime
import json
import logging
import time
import uuid
from typing import Awaitable, Callable, Optional

from starlette.middleware.base import BaseHTTPMiddleware
from starlette.requests import Request
from starlette.responses import Response

from app.monitoring.metrics import MonitoringMetrics

logger = logging.getLogger(__name__)


class MonitoringMiddleware(BaseHTTPMiddleware):
    """Production-ready FastAPI middleware for automated HTTP request instrumentation.

    Automatically records metrics for total requests, active requests, request duration,
    request/response sizes, and exceptions. Propagates X-Request-ID correlation headers
    and logs every request in structured JSON format.
    """

    def __init__(self, app: Callable[..., Awaitable[Response]]) -> None:
        super().__init__(app)
        self._metrics = MonitoringMetrics()

    def _generate_request_id(self, request: Request) -> str:
        """Extract existing X-Request-ID from request headers or generate a new UUID4."""
        request_id = request.headers.get("X-Request-ID")
        if request_id and request_id.strip():
            return request_id.strip()
        return str(uuid.uuid4())

    def _get_client_ip(self, request: Request) -> str:
        """Extract client IP address accounting for X-Forwarded-For and X-Real-IP headers."""
        forwarded_for = request.headers.get("X-Forwarded-For")
        if forwarded_for and forwarded_for.strip():
            return forwarded_for.split(",")[0].strip()

        real_ip = request.headers.get("X-Real-IP")
        if real_ip and real_ip.strip():
            return real_ip.strip()

        if request.client and request.client.host:
            return request.client.host

        return "unknown"

    def _get_request_size(self, request: Request) -> int:
        """Extract request payload size in bytes from Content-Length header."""
        content_length = request.headers.get("Content-Length")
        if content_length and content_length.isdigit():
            return int(content_length)
        return 0

    def _get_response_size(self, response: Response) -> int:
        """Extract response payload size in bytes from headers or body length."""
        if hasattr(response, "headers") and response.headers is not None:
            content_length = response.headers.get("Content-Length")
            if content_length and content_length.isdigit():
                return int(content_length)

        if hasattr(response, "body") and isinstance(response.body, (bytes, bytearray)):
            return len(response.body)

        return 0

    def _get_path_template(self, request: Request) -> str:
        """Resolve matched route path template or fallback to URL path."""
        route = request.scope.get("route")
        if route and hasattr(route, "path") and isinstance(route.path, str):
            return route.path
        return request.url.path

    def _log_request(
        self,
        request_id: str,
        method: str,
        path: str,
        status_code: int,
        latency_ms: float,
        client_ip: str,
        user_agent: str,
        response_size: int,
        request_size: int,
    ) -> None:
        """Log HTTP request details in structured JSON format."""
        log_payload = {
            "timestamp": datetime.datetime.now(datetime.timezone.utc).isoformat(),
            "request_id": request_id,
            "method": method,
            "path": path,
            "status": status_code,
            "latency_ms": round(latency_ms, 3),
            "client_ip": client_ip,
            "user_agent": user_agent,
            "response_size": response_size,
            "request_size": request_size,
        }
        logger.info(json.dumps(log_payload))

    def _record_metrics(
        self,
        method: str,
        endpoint: str,
        status_code: int,
        duration_seconds: float,
        request_size: int,
        response_size: int,
    ) -> None:
        """Record HTTP metrics in MonitoringMetrics singleton."""
        status_str = str(status_code)

        self._metrics.http_requests_total.labels(
            method=method,
            endpoint=endpoint,
            status=status_str,
        ).inc()

        self._metrics.http_request_duration_seconds.labels(
            method=method,
            endpoint=endpoint,
            status=status_str,
        ).observe(duration_seconds)

        if request_size > 0:
            self._metrics.http_request_size_bytes.labels(
                method=method,
                endpoint=endpoint,
            ).observe(float(request_size))

        if response_size > 0:
            self._metrics.http_response_size_bytes.labels(
                method=method,
                endpoint=endpoint,
                status=status_str,
            ).observe(float(response_size))

    def _handle_exception(
        self,
        exc: Exception,
        method: str,
        endpoint: str,
        request_id: str,
    ) -> None:
        """Increment exception metrics, propagate OpenTelemetry trace error, and log stack trace."""
        exception_type = exc.__class__.__name__

        self._metrics.http_exceptions_total.labels(
            method=method,
            endpoint=endpoint,
            exception_type=exception_type,
        ).inc()

        try:
            from opentelemetry import trace

            span = trace.get_current_span()
            if span and span.is_recording():
                span.record_exception(exc)
                span.set_status(trace.StatusCode.ERROR, str(exc))
        except ImportError:
            logger.debug("OpenTelemetry tracing package not available.")
        except Exception as trace_err:
            logger.warning("Failed to record OpenTelemetry exception span: %s", trace_err)

        logger.error(
            "Unhandled exception during HTTP request %s [%s %s]: %s",
            request_id,
            method,
            endpoint,
            exc,
            exc_info=True,
        )

    async def dispatch(
        self,
        request: Request,
        call_next: Callable[[Request], Awaitable[Response]],
    ) -> Response:
        """Process HTTP request through monitoring middleware."""
        request_id = self._generate_request_id(request)
        request.state.request_id = request_id

        method = request.method
        path = request.url.path
        client_ip = self._get_client_ip(request)
        user_agent = request.headers.get("User-Agent", "unknown")
        request_size = self._get_request_size(request)

        start_time = time.perf_counter()

        endpoint_label = self._get_path_template(request)
        self._metrics.http_requests_in_progress.labels(
            method=method,
            endpoint=endpoint_label,
        ).inc()

        status_code = 500
        response_size = 0
        response: Optional[Response] = None

        try:
            response = await call_next(request)
            status_code = response.status_code
            response.headers["X-Request-ID"] = request_id
            response_size = self._get_response_size(response)
            return response
        except Exception as exc:
            endpoint = self._get_path_template(request)
            self._handle_exception(exc, method, endpoint, request_id)
            raise exc
        finally:
            end_time = time.perf_counter()
            duration_seconds = end_time - start_time
            latency_ms = duration_seconds * 1000.0

            endpoint = self._get_path_template(request)

            self._record_metrics(
                method=method,
                endpoint=endpoint,
                status_code=status_code,
                duration_seconds=duration_seconds,
                request_size=request_size,
                response_size=response_size,
            )

            self._log_request(
                request_id=request_id,
                method=method,
                path=path,
                status_code=status_code,
                latency_ms=latency_ms,
                client_ip=client_ip,
                user_agent=user_agent,
                response_size=response_size,
                request_size=request_size,
            )

            self._metrics.http_requests_in_progress.labels(
                method=method,
                endpoint=endpoint_label,
            ).dec()
