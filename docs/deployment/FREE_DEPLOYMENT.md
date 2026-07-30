# AIFlow Enterprise 100% Free Deployment Guide

This guide details how to deploy **AIFlow Enterprise** completely for **$0/month** using free cloud tiers and open-source platforms.

---

## Method 1: Local Free Deployment (Docker Compose) - **Fastest & $0/mo**

Deploy the complete production stack (Backend, Frontend, PostgreSQL, Redis, Prometheus, Grafana) locally on your PC or Mac for free:

```bash
# 1. Clone your repository
git clone https://github.com/rpritiranjan90-crypto/AIFlow-Enterprise.git
cd AIFlow-Enterprise/deploy

# 2. Launch complete production stack
docker-compose -f docker-compose.production.yml up -d
```

### Accessing your free local deployment:
- **Frontend App**: `http://localhost`
- **Backend API**: `http://localhost:8000`
- **API Docs (Swagger)**: `http://localhost:8000/docs`
- **Grafana Monitoring**: `http://localhost:3000` (User: `admin`, Pass: `admin_secure_pass_2026`)
- **Prometheus Metrics**: `http://localhost:9090`

---

## Method 2: Cloud Free Tiers ($0/mo Hosting)

### 1. Frontend: Deploy to Vercel (100% Free)
- Go to [Vercel.com](https://vercel.com) and import your GitHub repo `rpritiranjan90-crypto/AIFlow-Enterprise`.
- Set Root Directory to `frontend`.
- Click **Deploy**!

### 2. Backend API: Deploy to Render.com (100% Free)
- Go to [Render.com](https://render.com) -> New Web Service.
- Connect your GitHub repo `rpritiranjan90-crypto/AIFlow-Enterprise`.
- Set Build Command: `pip install -r backend/requirements.txt`
- Set Start Command: `cd backend && gunicorn -k uvicorn.workers.UvicornWorker -b 0.0.0.0:$PORT app.main:app`

### 3. Database: Supabase / Neon PostgreSQL (100% Free)
- Go to [Neon.tech](https://neon.tech) or [Supabase.com](https://supabase.com).
- Create a free PostgreSQL instance with `pgvector` enabled.
- Copy the `DATABASE_URL` connection string into your Render environment variables.

### 4. Redis Cache: Upstash Redis (100% Free)
- Go to [Upstash.com](https://upstash.com).
- Create a free serverless Redis database.
- Copy the `REDIS_URL` into your Render environment variables.

---

## Method 3: Oracle Cloud "Always Free" VM ($0/mo Forever)

Oracle Cloud provides a **100% Free Forever** VM with:
- **4 ARM CPUs + 24 GB RAM**
- **200 GB Storage**

### Deployment Steps on Oracle Cloud Always Free VM:
1. Create a free account at [cloud.oracle.com](https://cloud.oracle.com).
2. Launch an **Always Free Ampere A1 Compute Instance** (Ubuntu 24.04).
3. SSH into your instance and run:
   ```bash
   sudo apt update && sudo apt install -y docker.io docker-compose git
   git clone https://github.com/rpritiranjan90-crypto/AIFlow-Enterprise.git
   cd AIFlow-Enterprise/deploy
   docker-compose -f docker-compose.production.yml up -d
   ```
4. Access your live application at `http://<YOUR_ORACLE_PUBLIC_IP>`.
