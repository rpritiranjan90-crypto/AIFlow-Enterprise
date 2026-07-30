# AIFlow Enterprise v4.0 — Production Deployment Guide

---

## 🌟 Executive Deployment Overview

This guide details multi-cloud and containerized deployment procedures for **AIFlow Enterprise v4.0.0-RC2** across **Kubernetes (EKS/GKE/AKS)**, **Docker Compose**, **Vercel** (Frontend SPA), and **Render / AWS ECS** (FastAPI Backend).

---

## 🏗️ Supported Deployment Targets

### 1. Docker Compose Production Deployment
For single-node or local cluster deployments, run:

```bash
docker-compose -f deploy/docker-compose.production.yml up -d --build
```

### 2. Kubernetes (EKS / GKE / AKS) Deployment
Apply Helm charts or Kubernetes manifests located in `deploy/k8s/`:

```bash
kubectl apply -f deploy/k8s/namespace.yaml
kubectl apply -f deploy/k8s/secrets.yaml
kubectl apply -f deploy/k8s/deployment-backend.yaml
kubectl apply -f deploy/k8s/deployment-frontend.yaml
kubectl apply -f deploy/k8s/ingress.yaml
```

### 3. Vercel + Render Hybrid Deployment
- **Frontend SPA**: Configured via `frontend/vercel.json` (automatic reverse-proxy to backend API).
- **Backend API**: Configured via `render.yaml` using Python 3.13 Gunicorn/Uvicorn workers.

---

## 🔑 Required Production Environment Variables

```env
# Core Environment
ENVIRONMENT=production
PROJECT_NAME="AIFlow Enterprise"
API_V1_STR=/api/v1

# Security & Secret Keys
SECRET_KEY="<GENERATE_64_CHAR_HEX_SECRET_KEY>"
ACCESS_TOKEN_EXPIRE_MINUTES=120
REFRESH_TOKEN_EXPIRE_DAYS=7

# Database Connection (PostgreSQL + pgvector)
DATABASE_URL="postgresql+asyncpg://aiflow_user:strong_password@postgres:5432/aiflow_db"

# Redis Cache & Task Queue
REDIS_URL="redis://:strong_redis_pass@redis:6379/0"

# CORS Allowed Origins
CORS_ORIGINS=["https://aiflow.vercel.app", "https://app.aiflow.com"]
```

---

## 🩺 Liveness & Readiness Probes

| Probe Type | HTTP Endpoint | Initial Delay | Timeout | Frequency |
| :- | :- | :- | :- | :- |
| **Backend Liveness** | `GET /health` | 10s | 2s | Every 10s |
| **Backend Readiness** | `GET /api/v1/health` | 5s | 2s | Every 5s |
| **Frontend Health** | `GET /` | 3s | 2s | Every 10s |
