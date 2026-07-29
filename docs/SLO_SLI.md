# AIFlow Enterprise - SLOs & SLIs

## 1. Availability Service Level Objective (SLO)
**Target**: 99.9% uptime per month.
**Service Level Indicator (SLI)**:
- Success rate of HTTP requests (responses not in `5xx` range).
- Evaluated via Prometheus: `sum(rate(http_requests_total{status!~"5.."}[30d])) / sum(rate(http_requests_total[30d]))`
**Error Budget**: ~43.2 minutes of downtime per month.

## 2. Latency SLO (Core API)
**Target**: 95% of API requests complete in < 250ms.
**Service Level Indicator (SLI)**:
- 95th percentile latency of backend endpoints.
- Evaluated via Prometheus: `histogram_quantile(0.95, sum(rate(http_request_duration_seconds_bucket[30d])) by (le))`
**Error Budget**: 5% of requests may exceed 250ms.

## 3. AI Inference SLO
**Target**: 90% of AI workflow executions generate a response in < 5 seconds.
**Service Level Indicator (SLI)**:
- 90th percentile of `aiflow_inference_duration_seconds` metric.

## 4. Search Performance SLO
**Target**: 99% of global search queries execute in < 100ms.
**Service Level Indicator (SLI)**:
- P99 latency of `/api/v1/search` endpoint.

## Error Budget Policy
If the Error Budget is exhausted:
1. Feature freezes are automatically enforced by CI/CD.
2. Engineering priority shifts exclusively to reliability, technical debt, and performance optimization.
3. Deployments are halted unless they fix the reliability issue.
