"""
Prometheus Metrics API Endpoint for AIFlow Enterprise.

Exposes GET /metrics endpoint for Prometheus scraping with configurable security,
IP allowlisting, API Key authentication, structured JSON logging, and OpenTelemetry tracing.
"""

import datetime
import json
import logging
import time
from typing import Optional, Tuple

from fastapi import APIRouter, HTTPException, Request, Response, status
from prometheus_client import CONTENT_TYPE_LATEST, generate_latest

from app.core.config import settings
from app.monitoring.registry import MonitoringRegistry

logger = logging.getLogger(__name__)

router = APIRouter(tags=["Metrics"])


def _get_client_ip(request: Request) -> str:
    """Extract client IP address accounting for proxy headers."""
    forwarded_for = request.headers.get("X-Forwarded-For")
    if forwarded_for and forwarded_for.strip():
        return forwarded_for.split(",")[0].strip()

    real_ip = request.headers.get("X-Real-IP")
    if real_ip and real_ip.strip():
        return real_ip.strip()

    if request.client and request.client.host:
        return request.client.host

    return "127.0.0.1"


def _validate_access(request: Request) -> bool:
    """Validate client access permissions based on deployment environment and settings."""
    env = getattr(settings, "ENVIRONMENT", "development").lower()
    if env == "development":
        return True

    metrics_api_key = getattr(settings, "METRICS_API_KEY", None)
    provided_key = request.headers.get("X-API-Key") or request.headers.get("X-Metrics-Key")
    if not provided_key and request.headers.get("Authorization"):
        auth_header = request.headers.get("Authorization", "")
        if auth_header.startswith("Bearer "):
            provided_key = auth_header[7:].strip()

    if metrics_api_key:
        if not provided_key or provided_key != metrics_api_key:
            return False

    if env == "production":
        allowed_ips = getattr(settings, "METRICS_ALLOWED_IPS", None)
        if allowed_ips:
            client_ip = _get_client_ip(request)
            if isinstance(allowed_ips, (list, tuple, set)):
                if client_ip not in allowed_ips:
                    return False
            elif isinstance(allowed_ips, str):
                ip_list = [ip.strip() for ip in allowed_ips.split(",") if ip.strip()]
                if ip_list and client_ip not in ip_list:
                    return False

    return True


def _generate_metrics() -> Tuple[bytes, int]:
    """Generate latest Prometheus metrics bytes and return metric count."""
    registry_instance = MonitoringRegistry()
    collector_reg = registry_instance.registry()
    metrics_data = generate_latest(collector_reg)
    metrics_count = len(registry_instance.list_metrics())
    return metrics_data, metrics_count


def _log_scrape(
    request: Request,
    status_code: int,
    duration_ms: float,
    metrics_count: int,
) -> None:
    """Log metric scrape request details in structured JSON format."""
    request_id = getattr(request.state, "request_id", "N/A")
    log_payload = {
        "timestamp": datetime.datetime.now(datetime.timezone.utc).isoformat(),
        "request_id": request_id,
        "client_ip": _get_client_ip(request),
        "status": status_code,
        "scrape_duration_ms": round(duration_ms, 3),
        "metrics_count": metrics_count,
    }
    logger.info(json.dumps(log_payload))


def _handle_error(exc: Exception, request: Request) -> Response:
    """Handle metrics generation errors safely without exposing internal stack traces."""
    logger.error("Failed to generate Prometheus metrics: %s", exc, exc_info=True)
    return Response(
        content=json.dumps({"detail": "An internal error occurred while generating metrics."}),
        status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
        media_type="application/json",
    )


@router.get("/metrics", response_class=Response, summary="Prometheus Metrics Scraping Endpoint")
async def get_metrics(request: Request) -> Response:
    """Prometheus metrics scraping endpoint."""
    start_time = time.perf_counter()

    if not _validate_access(request):
        duration_ms = (time.perf_counter() - start_time) * 1000.0
        _log_scrape(request, status.HTTP_403_FORBIDDEN, duration_ms, 0)
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Access to metrics endpoint is forbidden.",
        )

    try:
        metrics_bytes, metrics_count = _generate_metrics()
        duration_ms = (time.perf_counter() - start_time) * 1000.0

        try:
            from opentelemetry import trace

            span = trace.get_current_span()
            if span and span.is_recording():
                span.set_attribute("metrics.scrape_duration_ms", duration_ms)
                span.set_attribute("metrics.count", metrics_count)
                span.set_attribute("metrics.status", 200)
        except Exception:
            pass

        _log_scrape(request, status.HTTP_200_OK, duration_ms, metrics_count)

        return Response(
            content=metrics_bytes,
            status_code=status.HTTP_200_OK,
            media_type=CONTENT_TYPE_LATEST,
        )
    except Exception as exc:
        return _handle_error(exc, request)
