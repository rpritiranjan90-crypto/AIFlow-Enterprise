# Production Launch Checklist

Follow these checks prior to approving the final deployment into the production environment.

## 1. Security Validation
- [ ] Ensure all Kubernetes Secrets (`aiflow-secrets`) contain production-grade credentials (No defaults).
- [ ] Confirm Ingress TLS annotations are active and routing traffic over HTTPS (Port 443).
- [ ] Execute a final `pip-audit` and `npm audit` on the master branch.
- [ ] Confirm strict RBAC definitions limit Kubernetes cluster admin access.

## 2. Performance Validation
- [ ] Verify Horizontal Pod Autoscaler (HPA) metrics server is reachable and emitting utilization percentages.
- [ ] Confirm Redis and Postgres PVCs are mapped to SSD-backed storage classes (e.g. `gp3`).
- [ ] Load test the `/api/v1/workflows/execute` endpoint using an external load generator (e.g. Locust) to ensure the 250ms latency SLO holds under pressure.

## 3. Backup Verification
- [ ] Confirm the S3 Backup CronJob has successfully generated at least one `.sql.gz` dump of the production database.
- [ ] Attempt a dry-run restoration of the backup into a staging database.

## 4. Monitoring & Alerting Verification
- [ ] Access the Grafana `aiflow-health` dashboard and verify live metrics are populating.
- [ ] Trigger a mock failure (e.g. scaling `redis` to 0 replicas) and verify Alertmanager routes the `RedisDown` incident to PagerDuty/Slack.
- [ ] Ensure OpenTelemetry trace IDs are present in structured JSON logs.

## 5. Deployment & Rollback Readiness
- [ ] Run `kubectl apply --dry-run=server -k deploy/k8s/` to check manifest validity.
- [ ] Document the `kubectl rollout undo deployment/<name>` command for rapid incident mitigation.

**Sign-off:**
Once all checkboxes are validated, the SRE team lead may authorize the `deploy-production` GitHub Actions job.
