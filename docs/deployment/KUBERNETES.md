# Kubernetes Architecture & Manifest Specification

## Cluster Topology & Component Layout

```mermaid
graph TD
    Ingress[NGINX Ingress Controller] --> Frontend[Frontend React Service]
    Ingress --> Backend[Backend FastAPI Service]
    Backend --> Postgres[(PostgreSQL 16 + pgvector)]
    Backend --> Redis[(Redis 7 Cache)]
    Backend --> PromExporter[GET /metrics Endpoint]
    Prometheus[Prometheus Operator] --> PromExporter
```

## Security & Isolation
- **Non-root containers**: UID 10001 (`appuser`).
- **Read-Only Filesystem**: Container root filesystem mounted read-only.
- **Network Policies**: Ingress/Egress restricted to namespace services.
- **Resource Limits**: Enforced CPU & Memory requests/limits on all pods.
