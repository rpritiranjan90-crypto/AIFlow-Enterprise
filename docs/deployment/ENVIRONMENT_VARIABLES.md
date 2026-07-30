# AIFlow Enterprise v4.0 — Complete Production Environment Variable Dictionary

---

## 🔑 Complete Production Environment Variable Dictionary

### Frontend Variables (Vercel)

| Variable Name | Required | Default Value | Description |
| :- | :-: | :- | :- |
| `VITE_API_BASE_URL` | **Yes** | `https://aiflow-backend.onrender.com` | Live backend API URL for frontend fetch calls. |
| `VITE_APP_TITLE` | No | `AIFlow Enterprise v4.0` | Browser tab title. |

---

### Backend Variables (Render)

| Variable Name | Required | Default Value | Description |
| :- | :-: | :- | :- |
| `ENVIRONMENT` | **Yes** | `production` | Enables production security middleware and strict CORS rules. |
| `SECRET_KEY` | **Yes** | 64-char hex string | HMAC-SHA256 secret key for signing JWT tokens. |
| `DATABASE_URL` | **Yes** | `postgresql+asyncpg://...` | Neon PostgreSQL async connection string. |
| `REDIS_URL` | **Yes** | `rediss://...` | Upstash Redis TLS connection string. |
| `CORS_ORIGINS` | **Yes** | `["https://aiflow.vercel.app"]` | Allowed CORS origins for web client access. |
