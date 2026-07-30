# AIFlow Enterprise Production Deployment Guide

## Overview
This document outlines the standard operating procedures for deploying **AIFlow Enterprise** across cloud environments (AWS EKS, GCP GKE, Azure AKS, or On-Premises Kubernetes).

---

## 1. Prerequisites
- **Kubernetes Cluster**: v1.28+ with `kubectl` configured.
- **Helm**: v3.12+.
- **Container Registry**: GHCR, ECR, or Docker Hub.
- **Cert-Manager**: Configured with Let's Encrypt for automated TLS certificate management.

---

## 2. Docker Production Build
Build multi-stage production Docker images for backend and frontend:

```bash
# Build Backend (Python 3.13 + Gunicorn Uvicorn workers)
docker build -t ghcr.io/rpritiranjan90-crypto/aiflow-backend:latest -f backend/Dockerfile ./backend

# Build Frontend (React 19 + Nginx Alpine)
docker build -t ghcr.io/rpritiranjan90-crypto/aiflow-frontend:latest -f frontend/Dockerfile .
```

---

## 3. Docker Compose Production Deployment
For single-host or preview deployments:

```bash
cd deploy/
docker-compose -f docker-compose.production.yml up -d
```

---

## 4. Kubernetes Helm Deployment
Deploy using Helm charts:

```bash
helm upgrade --install aiflow deploy/helm/ \
  --values deploy/helm/values.yaml \
  --namespace aiflow-prod \
  --create-namespace
```
