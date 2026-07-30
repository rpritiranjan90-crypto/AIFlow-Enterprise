# AIFlow Enterprise v4.0 — Production Observability & Monitoring Guide

---

## 📊 Observability Architecture

**AIFlow Enterprise** includes an enterprise-grade Prometheus and OpenTelemetry observability stack configured in `backend/app/monitoring/`.

---

## 📈 Metric Categories Exposed

| Metric Name | Type | Description |
| :- | :- | :- |
| `aiflow_http_requests_total` | Counter | Total HTTP requests by path, method, and HTTP status code. |
| `aiflow_http_request_duration_seconds` | Histogram | Request latency distribution in milliseconds. |
| `aiflow_db_queries_total` | Counter | Total database queries executed against PostgreSQL. |
| `aiflow_redis_cache_hits_total` | Counter | Redis cache hit and miss rates. |
| `aiflow_ai_token_usage_total` | Counter | LLM token consumption tracking by model provider. |

---

## 🖼️ Accessing Grafana Dashboards

1. Start the monitoring stack: `docker-compose -f deploy/docker-compose.production.yml up -d prometheus grafana`
2. Open Grafana at `http://localhost:3001` (Credentials: `admin` / `admin_password`).
3. Import pre-configured dashboards from `deploy/monitoring/grafana/dashboards/`:
   - **System Performance & Latency Dashboard**
   - **AI LLM Cost & Token Usage Dashboard**
   - **Security & Compliance Audit Dashboard**
