# AIFlow Enterprise v4.0 — 100% Free Production Deployment Master Guide

---

## 💰 Total Monthly Cost: ₹0 / $0 USD

This guide outlines the step-by-step procedure for deploying **AIFlow Enterprise v4.0** to production using 100% free cloud services with zero ongoing subscription costs.

---

## 🏗️ Free Cloud Infrastructure Stack

```
                          ┌────────────────────────┐
                          │   Vercel Free Tier     │
                          │   (Frontend SPA Host)  │
                          └───────────┬────────────┘
                                      │
                                      ▼
                          ┌────────────────────────┐
                          │    Render Free Tier    │
                          │   (FastAPI Backend)    │
                          └──────┬──────────┬──────┘
                                 │          │
                     ┌───────────┘          └───────────┐
                     ▼                                  ▼
      ┌────────────────────────┐             ┌────────────────────────┐
      │    Neon Free Tier      │             │   Upstash Free Tier    │
      │ (Serverless Postgres)  │             │ (Serverless Redis TLS) │
      └────────────────────────┘             └────────────────────────┘
```

| Service | Provider | Free Tier Limits | Target URL |
| :- | :- | :- | :- |
| **Frontend SPA** | **Vercel** | 100GB Bandwidth / Unlimited builds | `https://aiflow.vercel.app` |
| **FastAPI Backend** | **Render** | 512MB RAM / 750 free instance hours | `https://aiflow-backend.onrender.com` |
| **Database** | **Neon** | 0.5GiB Serverless PostgreSQL + pgvector | `ep-cool-sample-12345.us-east-2.aws.neon.tech` |
| **Redis Cache** | **Upstash** | 10,000 commands/day Serverless Redis | `cool-redis-12345.upstash.io` |

---

## 🚀 Quick Deployment Sequence

1. **Database Setup**: Create a free PostgreSQL instance on [Neon.tech](https://neon.tech) and copy `DATABASE_URL`.
2. **Redis Setup**: Create a free Redis cluster on [Upstash.com](https://upstash.com) and copy `REDIS_URL`.
3. **Backend Deployment**: Connect GitHub repo to [Render.com](https://render.com) using `render.yaml`.
4. **Frontend Deployment**: Connect GitHub repo to [Vercel.com](https://vercel.com) using `frontend/vercel.json`.
