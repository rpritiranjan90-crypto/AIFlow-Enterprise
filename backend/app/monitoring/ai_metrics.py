"""
AI Model & LLM Service Monitoring and Instrumentation for AIFlow Enterprise.

Provides provider-agnostic metrics tracking, token usage monitoring, cost estimation,
streaming/non-streaming response latency timing, and structured JSON logging.
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


class AIMetrics:
    """Production-grade AI and LLM service instrumentation module.

    Tracks model requests, prompt/completion tokens, estimated costs, latency,
    streaming completions, provider errors, and OpenTelemetry span attributes.
    """

    _instance: Optional["AIMetrics"] = None
    _lock: threading.RLock = threading.RLock()

    def __new__(cls, default_provider: str = "openai") -> "AIMetrics":
        if cls._instance is None:
            with cls._lock:
                if cls._instance is None:
                    instance = super().__new__(cls)
                    instance._initialized = False
                    cls._instance = instance
        return cls._instance

    def __init__(self, default_provider: str = "openai") -> None:
        if getattr(self, "_initialized", False):
            return

        with self._lock:
            if getattr(self, "_initialized", False):
                return

            self._metrics = MonitoringMetrics()
            self._default_provider = default_provider
            self._daily_cumulative_cost: float = 0.0
            self._initialized = True
            logger.info("AIMetrics initialized with default_provider = '%s'.", default_provider)

    @classmethod
    def initialize(cls, default_provider: str = "openai") -> "AIMetrics":
        """Initialize and return the AIMetrics singleton instance."""
        with cls._lock:
            instance = cls(default_provider=default_provider)
            instance._default_provider = default_provider
            return instance

    def record_success(self, model: str, operation: str = "chat_completion") -> None:
        """Increment total successful AI requests counter."""
        self._metrics.ai_requests_total.labels(model=model, operation=operation).inc()

    def record_failure(self, model: str, error_type: str) -> None:
        """Increment AI failure counter with specific error classification."""
        self._metrics.ai_failures_total.labels(model=model, error_type=error_type).inc()
        logger.error("AI model '%s' request failed with error: %s", model, error_type)

    def record_tokens(self, model: str, prompt_tokens: int = 0, completion_tokens: int = 0) -> None:
        """Track prompt and completion token counts for LLM inferences."""
        if prompt_tokens > 0:
            self._metrics.ai_tokens_total.labels(model=model, token_type="prompt").inc(float(prompt_tokens))
        if completion_tokens > 0:
            self._metrics.ai_tokens_total.labels(model=model, token_type="completion").inc(float(completion_tokens))
        if prompt_tokens > 0 or completion_tokens > 0:
            total = prompt_tokens + completion_tokens
            self._metrics.ai_tokens_total.labels(model=model, token_type="total").inc(float(total))

    def record_cost(self, model: str, cost: float, currency: str = "USD") -> None:
        """Record estimated cost for AI model inferences."""
        if cost > 0:
            self._metrics.ai_cost_total.labels(model=model, currency=currency).inc(cost)
            with self._lock:
                self._daily_cumulative_cost += cost

    def get_daily_cumulative_cost(self) -> float:
        """Return cumulative estimated cost tracked by the service."""
        with self._lock:
            return self._daily_cumulative_cost

    def _get_request_id(self) -> str:
        """Safely extract current request_id if available."""
        return "N/A"

    def _log_request(
        self,
        provider: str,
        model: str,
        operation: str,
        duration: float,
        status: str,
        prompt_tokens: int = 0,
        completion_tokens: int = 0,
        estimated_cost: float = 0.0,
    ) -> None:
        """Log AI model request details in structured JSON format."""
        log_payload = {
            "timestamp": datetime.datetime.now(datetime.timezone.utc).isoformat(),
            "request_id": self._get_request_id(),
            "provider": provider,
            "model": model,
            "operation": operation,
            "duration_ms": round(duration * 1000.0, 3),
            "status": status,
            "tokens": {
                "prompt": prompt_tokens,
                "completion": completion_tokens,
                "total": prompt_tokens + completion_tokens,
            },
            "estimated_cost": round(estimated_cost, 6),
        }
        logger.info(json.dumps(log_payload))

    def _record_opentelemetry_span(
        self,
        provider: str,
        model: str,
        operation: str,
        prompt_tokens: int,
        completion_tokens: int,
        estimated_cost: float,
    ) -> None:
        """Add AI tracing attributes to current OpenTelemetry span if available."""
        try:
            from opentelemetry import trace

            span = trace.get_current_span()
            if span and span.is_recording():
                span.set_attribute("ai.provider", provider)
                span.set_attribute("ai.model", model)
                span.set_attribute("ai.operation", operation)
                span.set_attribute("ai.tokens.prompt", prompt_tokens)
                span.set_attribute("ai.tokens.completion", completion_tokens)
                span.set_attribute("ai.cost", estimated_cost)
        except Exception:
            pass

    @asynccontextmanager
    async def measure_request(
        self,
        provider: str = "openai",
        model: str = "gpt-4",
        operation: str = "chat_completion",
    ) -> AsyncGenerator[Dict[str, Any], None]:
        """Async context manager to time, measure, and record AI inference requests."""
        start_time = time.perf_counter()
        status = "success"
        metrics_context: Dict[str, Any] = {
            "prompt_tokens": 0,
            "completion_tokens": 0,
            "estimated_cost": 0.0,
            "error_type": None,
        }

        try:
            yield metrics_context
            self.record_success(model=model, operation=operation)
        except Exception as exc:
            error_type = exc.__class__.__name__
            status = f"error:{error_type}"
            metrics_context["error_type"] = error_type
            self.record_failure(model=model, error_type=error_type)
            raise exc
        finally:
            duration = time.perf_counter() - start_time
            self._metrics.ai_request_duration_seconds.labels(model=model, operation=operation).observe(duration)

            prompt_tokens = int(metrics_context.get("prompt_tokens", 0))
            completion_tokens = int(metrics_context.get("completion_tokens", 0))
            estimated_cost = float(metrics_context.get("estimated_cost", 0.0))

            if prompt_tokens > 0 or completion_tokens > 0:
                self.record_tokens(model=model, prompt_tokens=prompt_tokens, completion_tokens=completion_tokens)

            if estimated_cost > 0:
                self.record_cost(model=model, cost=estimated_cost)

            self._log_request(
                provider=provider,
                model=model,
                operation=operation,
                duration=duration,
                status=status,
                prompt_tokens=prompt_tokens,
                completion_tokens=completion_tokens,
                estimated_cost=estimated_cost,
            )

            self._record_opentelemetry_span(
                provider=provider,
                model=model,
                operation=operation,
                prompt_tokens=prompt_tokens,
                completion_tokens=completion_tokens,
                estimated_cost=estimated_cost,
            )

    def instrument_request(
        self,
        provider: str = "openai",
        model: str = "gpt-4",
        operation: str = "chat_completion",
    ) -> Callable[[F], F]:
        """Decorator to automatically instrument an async AI model request function."""
        def decorator(func: F) -> F:
            @functools.wraps(func)
            async def wrapper(*args: Any, **kwargs: Any) -> Any:
                async with self.measure_request(provider=provider, model=model, operation=operation):
                    return await func(*args, **kwargs)

            return wrapper  # type: ignore[return-value]

        return decorator

    def shutdown(self) -> None:
        """Reset AIMetrics singleton instance."""
        with self._lock:
            self._daily_cumulative_cost = 0.0
            self._initialized = False
            AIMetrics._instance = None
            logger.info("AIMetrics shutdown completed.")
