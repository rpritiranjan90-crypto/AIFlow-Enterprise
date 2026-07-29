# Operations Guide

This guide is for Platform Engineers and SREs maintaining the AIFlow Enterprise deployment.

## 1. Installation Guide

AIFlow Enterprise uses Kubernetes for deployment.

**Prerequisites**:
- Kubernetes Cluster (v1.24+)
- kubectl configured
- Domain name pointing to the Ingress controller.

**Deployment Steps**:
1. Clone the repository.
2. Apply configurations and secrets (replace dummy values with production values in `deploy/k8s/config.yaml`).
3. Apply stateful sets (PostgreSQL, Redis).
4. Apply the stateless services (Backend, Frontend, Workers).
```bash
kubectl apply -k deploy/k8s/
```

## 2. Upgrade Guide

To upgrade the application without downtime:
1. Update the `IMAGE_TAG` in your CI/CD pipeline or directly in the `frontend.yaml`/`backend.yaml` manifests.
2. Trigger the rolling update via `kubectl apply`.
3. Kubernetes will sequentially terminate old pods and spin up new ones ensuring at least `minAvailable` pods are ready as dictated by the PodDisruptionBudgets.

## 3. Scaling Guide

- **Stateless Scaling**: Handled automatically by the Horizontal Pod Autoscaler (HPA).
- **Database Scaling**: To increase Postgres performance, resize the Persistent Volume (requires storage class with `allowVolumeExpansion: true`), or upgrade the underlying node pool instance types.

## 4. Monitoring & Backup

- **Monitoring**: Refer to the Phase 6 Monitoring stack setup (`monitoring.yaml`).
- **Disaster Recovery**: Refer to `DISASTER_RECOVERY.md` for exact PostgreSQL S3 backup schemas and restoration guidelines.
