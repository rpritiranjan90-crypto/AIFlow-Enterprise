# Incident Response Runbooks

## Runbook: High 5xx API Error Rate (`APIHigh5xxErrorRate`)

### Severity: CRITICAL

#### Diagnostic Steps:
1. Inspect live application logs:
   ```bash
   kubectl logs -n aiflow-prod -l app=aiflow-backend --tail=100 -f | jq .
   ```
2. Verify PostgreSQL database availability and connection pool metrics:
   ```bash
   kubectl exec -it -n aiflow-prod deploy/aiflow-backend -- curl -s http://localhost:8000/metrics | grep db_
   ```
3. Check memory & CPU saturation:
   ```bash
   kubectl top pods -n aiflow-prod
   ```

#### Remediation:
- Scale out backend pods if CPU/Memory saturated: `kubectl scale deployment/aiflow-backend --replicas=8 -n aiflow-prod`.
- Restart deployment if memory leak observed: `kubectl rollout restart deployment/aiflow-backend -n aiflow-prod`.

---

## Runbook: Database Connection Pool Exhaustion (`DatabaseConnectionPoolExhaustion`)

### Severity: CRITICAL

#### Diagnostic Steps:
1. Check active database connection count:
   ```bash
   kubectl exec -it -n aiflow-prod sts/aiflow-postgres -- psql -U aiflow_user -d aiflow_db -c "SELECT count(*) FROM pg_stat_activity;"
   ```
2. Identify hanging/idle in transaction queries:
   ```bash
   kubectl exec -it -n aiflow-prod sts/aiflow-postgres -- psql -U aiflow_user -d aiflow_db -c "SELECT pid, now() - query_start AS duration, query FROM pg_stat_activity WHERE state != 'idle' ORDER BY duration DESC;"
   ```

#### Remediation:
- Terminate long-running blocking queries: `SELECT pg_terminate_backend(pid);`
