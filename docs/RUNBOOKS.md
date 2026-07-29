# AIFlow Enterprise - Incident Response Runbooks

## Alert: HighErrorRate
**Severity**: Critical
**Condition**: > 5% of API requests return HTTP 5xx over 5 minutes.

**Mitigation Steps**:
1. Check the Grafana "AIFlow Platform Health" dashboard to identify failing endpoints.
2. Search JSON logs in OpenSearch/Kibana for `level:"ERROR"` and filter by the failing `trace_id`.
3. If errors are related to DB timeouts, scale up the `postgres` deployment or check query locks.
4. If a bad release caused the issue, trigger a rollback: `kubectl rollout undo deployment/backend`.

## Alert: HighLatency
**Severity**: Warning
**Condition**: P95 Latency > 500ms.

**Mitigation Steps**:
1. Open the tracing UI (Jaeger/Zipkin) and search for traces exceeding 500ms.
2. Identify the slow span (e.g. `query_database`, `call_openai_api`).
3. If OpenAI API is degraded, circuit breakers will trip automatically. Consider switching AI provider config via feature flags.

## Alert: DatabaseDown
**Severity**: Critical
**Condition**: PostgreSQL is inaccessible.

**Mitigation Steps**:
1. Check if the `postgres` pod is OOMKilled: `kubectl describe pod -l app=postgres`.
2. Check PVC capacity: `kubectl get pvc postgres-pvc`.
3. If data is corrupted, initiate Point-in-Time Recovery (PITR) using the Disaster Recovery guide.

## Service Dependency Map
- **Frontend** -> **Backend**
- **Backend** -> **PostgreSQL**, **Redis**, **External AI APIs (OpenAI, Anthropic)**
- **Workers** -> **Redis**, **PostgreSQL**, **External APIs**
