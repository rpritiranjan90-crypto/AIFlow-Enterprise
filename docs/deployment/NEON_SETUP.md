# AIFlow Enterprise v4.0 — Neon Free Tier PostgreSQL Setup

---

## 🐘 Serverless PostgreSQL + pgvector Configuration

**Neon** provides a 100% free serverless PostgreSQL database with native `pgvector` support for AI embeddings.

---

## 🛠️ Step-by-Step Neon Setup

1. Sign up at [Neon.tech](https://neon.tech) and create a project named `aiflow-enterprise-prod`.
2. Enable `vector` extension in the Neon SQL Console:
   ```sql
   CREATE EXTENSION IF NOT EXISTS vector;
   ```
3. Copy the Connection String from Neon Dashboard.
4. Convert connection scheme from `postgresql://` to async SQLAlchemy driver format `postgresql+asyncpg://`:
   ```env
   DATABASE_URL="postgresql+asyncpg://user:password@ep-sample-12345.us-east-2.aws.neon.tech/neondb?sslmode=require"
   ```
5. Tables are automatically initialized on startup via FastAPI lifespan (`Base.metadata.create_all`).
