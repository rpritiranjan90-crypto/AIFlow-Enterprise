from unittest.mock import Mock

import pytest
from fastapi import HTTPException, Request
from fastapi.testclient import TestClient

from app.api import metrics
from app.main import app

client = TestClient(app)


def make_request(headers=None, client_host="127.0.0.1", request_id="test-request-id"):
    scope = {
        "type": "http",
        "headers": [],
        "client": (client_host, 12345),
    }

    request = Request(scope)

    request._headers = headers or {}
    request.state.request_id = request_id

    return request


# ---------------------------------------------------------------------
# _get_client_ip
# ---------------------------------------------------------------------


def test_get_client_ip_forwarded():
    request = make_request(headers={"X-Forwarded-For": "1.2.3.4,5.6.7.8"})
    assert metrics._get_client_ip(request) == "1.2.3.4"


def test_get_client_ip_real_ip():
    request = make_request(headers={"X-Real-IP": "9.9.9.9"})
    assert metrics._get_client_ip(request) == "9.9.9.9"


def test_get_client_ip_default():
    request = make_request()
    assert metrics._get_client_ip(request) == "127.0.0.1"


# ---------------------------------------------------------------------
# _validate_access
# ---------------------------------------------------------------------


def test_validate_access_development(monkeypatch):
    monkeypatch.setattr(
        metrics.settings,
        "ENVIRONMENT",
        "development",
        raising=False,
    )

    assert metrics._validate_access(make_request()) is True


def test_validate_access_api_key_success(monkeypatch):
    monkeypatch.setattr(
        metrics.settings,
        "ENVIRONMENT",
        "staging",
        raising=False,
    )

    monkeypatch.setattr(
        metrics.settings,
        "METRICS_API_KEY",
        "secret",
        raising=False,
    )

    request = make_request(headers={"X-API-Key": "secret"})

    assert metrics._validate_access(request) is True


def test_validate_access_api_key_failure(monkeypatch):
    monkeypatch.setattr(
        metrics.settings,
        "ENVIRONMENT",
        "staging",
        raising=False,
    )

    monkeypatch.setattr(
        metrics.settings,
        "METRICS_API_KEY",
        "secret",
        raising=False,
    )

    request = make_request(headers={"X-API-Key": "wrong"})

    assert metrics._validate_access(request) is False


def test_validate_access_production_allowed(monkeypatch):
    monkeypatch.setattr(
        metrics.settings,
        "ENVIRONMENT",
        "production",
        raising=False,
    )

    monkeypatch.setattr(
        metrics.settings,
        "METRICS_ALLOWED_IPS",
        "127.0.0.1",
        raising=False,
    )

    monkeypatch.setattr(
        metrics.settings,
        "METRICS_API_KEY",
        None,
        raising=False,
    )

    request = make_request()

    assert metrics._validate_access(request) is True


def test_validate_access_production_denied(monkeypatch):
    monkeypatch.setattr(
        metrics.settings,
        "ENVIRONMENT",
        "production",
        raising=False,
    )

    monkeypatch.setattr(
        metrics.settings,
        "METRICS_ALLOWED_IPS",
        "1.1.1.1",
        raising=False,
    )

    monkeypatch.setattr(
        metrics.settings,
        "METRICS_API_KEY",
        None,
        raising=False,
    )

    request = make_request()

    assert metrics._validate_access(request) is False


# ---------------------------------------------------------------------
# _generate_metrics
# ---------------------------------------------------------------------


def test_generate_metrics(monkeypatch):
    class FakeRegistry:
        def registry(self):
            return object()

        def list_metrics(self):
            return ["a", "b", "c"]

    monkeypatch.setattr(
        metrics,
        "MonitoringRegistry",
        FakeRegistry,
    )

    monkeypatch.setattr(
        metrics,
        "generate_latest",
        lambda registry: b"metric_data",
    )

    data, count = metrics._generate_metrics()

    assert data == b"metric_data"
    assert count == 3


# ---------------------------------------------------------------------
# _log_scrape
# ---------------------------------------------------------------------


def test_log_scrape(monkeypatch):
    logged = {}

    monkeypatch.setattr(
        metrics.logger,
        "info",
        lambda message: logged.setdefault("msg", message),
    )

    request = make_request()

    metrics._log_scrape(
        request,
        200,
        10.2,
        4,
    )

    assert "metrics_count" in logged["msg"]


# ---------------------------------------------------------------------
# _handle_error
# ---------------------------------------------------------------------


def test_handle_error():
    request = make_request()

    response = metrics._handle_error(
        Exception("boom"),
        request,
    )

    assert response.status_code == 500
    assert "internal error" in response.body.decode().lower()


# ---------------------------------------------------------------------
# /metrics endpoint
# ---------------------------------------------------------------------


def test_metrics_endpoint_success(monkeypatch):
    monkeypatch.setattr(
        metrics,
        "_validate_access",
        lambda request: True,
    )

    monkeypatch.setattr(
        metrics,
        "_generate_metrics",
        lambda: (b"test_metric 1\n", 1),
    )

    monkeypatch.setattr(
        metrics,
        "_log_scrape",
        lambda *args, **kwargs: None,
    )

    response = client.get("/metrics")

    assert response.status_code == 200
    assert b"test_metric" in response.content


def test_metrics_endpoint_forbidden(monkeypatch):
    monkeypatch.setattr(
        metrics,
        "_validate_access",
        lambda request: False,
    )

    monkeypatch.setattr(
        metrics,
        "_log_scrape",
        lambda *args, **kwargs: None,
    )

    response = client.get("/metrics")

    assert response.status_code == 403


def test_metrics_endpoint_exception(monkeypatch):
    monkeypatch.setattr(
        metrics,
        "_validate_access",
        lambda request: True,
    )

    def raise_error():
        raise RuntimeError("boom")

    monkeypatch.setattr(
        metrics,
        "_generate_metrics",
        raise_error,
    )

    response = client.get("/metrics")

    assert response.status_code == 500