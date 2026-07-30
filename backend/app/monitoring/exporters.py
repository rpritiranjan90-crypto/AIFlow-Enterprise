"""
Telemetry Exporters for Prometheus PushGateway and OpenTelemetry OTLP in AIFlow Enterprise.

Manages metric pushing to Prometheus PushGateway with exponential backoff and
background tasks, as well as OpenTelemetry OTLP HTTP/gRPC exporter configuration.
"""

import asyncio
import logging
import os
import threading
import time
from typing import Any, Dict, Optional

from app.core.config import settings
from app.monitoring.registry import MonitoringRegistry

logger = logging.getLogger(__name__)


class TelemetryExporters:
    """Production-grade telemetry exporter manager.

    Handles Prometheus PushGateway metric pushing and OpenTelemetry OTLP exporter lifecycle
    with exponential backoff, background workers, and graceful shutdown.
    """

    _instance: Optional["TelemetryExporters"] = None
    _lock: threading.RLock = threading.RLock()

    def __new__(cls) -> "TelemetryExporters":
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

            self._pushgateway_url: Optional[str] = os.getenv(
                "PROMETHEUS_PUSHGATEWAY_URL",
                getattr(settings, "PROMETHEUS_PUSHGATEWAY_URL", None),
            )
            self._pushgateway_enabled: bool = (
                os.getenv("PROMETHEUS_PUSHGATEWAY_ENABLED", "false").lower() in ("true", "1", "yes")
            )
            self._otlp_endpoint: Optional[str] = os.getenv(
                "OTEL_EXPORTER_OTLP_ENDPOINT",
                getattr(settings, "OTEL_EXPORTER_OTLP_ENDPOINT", None),
            )
            self._otlp_enabled: bool = (
                os.getenv("OTEL_EXPORTER_OTLP_ENABLED", "false").lower() in ("true", "1", "yes")
            )
            self._otlp_protocol: str = os.getenv("OTEL_EXPORTER_OTLP_PROTOCOL", "http/protobuf").lower()

            self._background_task: Optional[asyncio.Task[None]] = None
            self._running: bool = False
            self._initialized = True
            logger.info(
                "TelemetryExporters initialized cleanly (PushGateway: %s, OTLP: %s).",
                "enabled" if self._pushgateway_enabled else "disabled",
                "enabled" if self._otlp_enabled else "disabled",
            )

    @classmethod
    def initialize(cls) -> "TelemetryExporters":
        """Initialize and return the TelemetryExporters singleton instance."""
        with cls._lock:
            return cls()

    @property
    def is_pushgateway_enabled(self) -> bool:
        """Return True if PushGateway exporter is enabled."""
        return self._pushgateway_enabled

    @property
    def is_otlp_enabled(self) -> bool:
        """Return True if OTLP exporter is enabled."""
        return self._otlp_enabled

    def push_to_pushgateway(self, job_name: str = "aiflow_backend", max_retries: int = 3) -> bool:
        """Push current Prometheus metrics to PushGateway using exponential backoff retries."""
        if not self._pushgateway_enabled or not self._pushgateway_url:
            logger.debug("PushGateway export disabled or URL not configured.")
            return False

        registry = MonitoringRegistry().registry()
        try:
            from prometheus_client import push_to_gateway

            delay = 0.5
            for attempt in range(1, max_retries + 1):
                try:
                    push_to_gateway(
                        self._pushgateway_url,
                        job=job_name,
                        registry=registry,
                    )
                    logger.info("Successfully pushed metrics to PushGateway at %s", self._pushgateway_url)
                    return True
                except Exception as err:
                    logger.warning("Attempt %d/%d failed pushing to PushGateway: %s", attempt, max_retries, err)
                    if attempt < max_retries:
                        time.sleep(delay)
                        delay *= 2.0
        except ImportError:
            logger.warning("prometheus_client push_to_gateway function not available.")
        except Exception as exc:
            logger.error("Failed to push to PushGateway: %s", exc)

        return False

    async def start_background_push(
        self,
        interval_seconds: float = 15.0,
        job_name: str = "aiflow_backend",
    ) -> None:
        """Start a background periodic task to push metrics to PushGateway."""
        if self._running:
            return
        self._running = True

        async def _loop() -> None:
            while self._running:
                try:
                    await asyncio.sleep(interval_seconds)
                    if self._running and self._pushgateway_enabled:
                        await asyncio.to_thread(self.push_to_pushgateway, job_name=job_name)
                except asyncio.CancelledError:
                    break
                except Exception as exc:
                    logger.error("Error in background PushGateway loop: %s", exc)

        self._background_task = asyncio.create_task(_loop())
        logger.info("Started background metric push task (interval: %.1fs).", interval_seconds)

    async def stop_background_push(self) -> None:
        """Stop the background metric push task cleanly."""
        self._running = False
        if self._background_task is not None:
            self._background_task.cancel()
            try:
                await self._background_task
            except asyncio.CancelledError:
                pass
            self._background_task = None
            logger.info("Stopped background metric push task.")

    def setup_otlp_exporter(self) -> bool:
        """Configure OpenTelemetry OTLP HTTP or gRPC trace exporter if enabled."""
        if not self._otlp_enabled or not self._otlp_endpoint:
            logger.debug("OTLP exporter disabled or endpoint not configured.")
            return False

        try:
            if "grpc" in self._otlp_protocol:
                from opentelemetry.exporter.otlp.proto.grpc.trace_exporter import OTLPSpanExporter
            else:
                from opentelemetry.exporter.otlp.proto.http.trace_exporter import OTLPSpanExporter

            exporter = OTLPSpanExporter(endpoint=self._otlp_endpoint)
            logger.info("OTLP Trace Exporter configured successfully (%s -> %s).", self._otlp_protocol, self._otlp_endpoint)
            return True
        except ImportError:
            logger.warning("OpenTelemetry OTLP exporter packages not installed.")
        except Exception as exc:
            logger.error("Failed to setup OTLP exporter: %s", exc)

        return False

    def shutdown(self) -> None:
        """Reset TelemetryExporters singleton instance."""
        with self._lock:
            self._running = False
            self._initialized = False
            TelemetryExporters._instance = None
            logger.info("TelemetryExporters shutdown completed.")
