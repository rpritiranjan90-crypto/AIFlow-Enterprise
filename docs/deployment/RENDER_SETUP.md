# AIFlow Enterprise v4.0 — Render Free Tier Backend Setup

---

## 🐍 Render Backend Deployment Configuration

The FastAPI backend is pre-configured for 1-click deployment to **Render Free Tier** using `render.yaml`.

---

## 🛠️ Step-by-Step Render Setup

1. Log in to [Render.com](https://render.com) and click **"New Blueprint Instance"**.
2. Connect your GitHub repository (`rpritiranjan90-crypto/AIFlow-Enterprise`).
3. Render automatically detects `render.yaml` in the root directory.
4. Fill in environment variables in the Render Dashboard:
   - `SECRET_KEY`: `<GENERATE_64_CHAR_HEX>`
   - `DATABASE_URL`: `postgresql+asyncpg://...neon.tech/neondb?sslmode=require`
   - `REDIS_URL`: `rediss://...upstash.io:6379/0`
5. Render will execute `pip install -r backend/requirements.txt` and start the server with Uvicorn on port `$PORT`.
