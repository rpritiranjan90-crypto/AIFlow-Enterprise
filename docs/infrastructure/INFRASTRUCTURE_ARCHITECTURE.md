# AIFlow Enterprise v4.0 — Infrastructure Architecture & System Topology

---

## 🏛️ System Architecture Diagram

```
                              [ Cloudflare DNS / DDoS Protection ]
                                              │
                                              ▼
                                 [ NGINX Ingress Controller ]
                                              │
                     ┌────────────────────────┴────────────────────────┐
                     ▼                                                 ▼
        [ React 19 Frontend SPA ]                          [ FastAPI Backend Cluster ]
         (Nginx Static Container)                           (Uvicorn + Gunicorn Workers)
                     │                                                 │
                     │                                ┌────────────────┼────────────────┐
                     ▼                                ▼                ▼                ▼
        [ Monitoring Dashboard ]                 [ PostgreSQL ]    [ Redis Cache ]   [ Vector Engine ]
         (Prometheus + Grafana)                   (pgvector DB)     (Session/Queue)   (FAISS / Chroma)
```

---

## ⚙️ Component Summary

- **Frontend Container**: Nginx Alpine serving React 19 + TypeScript production static build (`/dist`).
- **Backend API Cluster**: FastAPI 0.115+ running under Python 3.13 with 4 Uvicorn worker processes per CPU core.
- **Database Layer**: PostgreSQL 16 with `pgvector` extension for high-performance embedding searches.
- **Caching & Message Broker**: Redis 7.2 handling API response caching, rate limiting, and async Celery queues.
- **Observability Stack**: Prometheus exporter exposing metric telemetry on `:8000/metrics` and OpenTelemetry tracing.
