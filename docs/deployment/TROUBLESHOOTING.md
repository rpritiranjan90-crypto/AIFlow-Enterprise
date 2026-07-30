# Troubleshooting & Diagnostic Guide

## Common Production Scenarios

### 1. Pod CrashLoopBackOff
- Inspect termination reason:
  ```bash
  kubectl describe pod <pod-name> -n aiflow-prod
  ```

### 2. High Memory / OOMKilled
- Increase memory limit in `deploy/helm/values.yaml` or `deploy/k8s/backend.yaml`.
