# AIFlow Enterprise v4.0 — Vercel Free Tier Frontend Setup

---

## ⚡ Vercel Deployment Configuration

**AIFlow Enterprise** is pre-configured for instant 1-click deployment to **Vercel Free Tier** using `frontend/vercel.json`.

---

## 🛠️ Step-by-Step Vercel Setup

1. **Connect Repository**: Log in to [Vercel](https://vercel.com) and click **"Add New Project"**.
2. **Select Import Folder**: Set **Root Directory** to `frontend`.
3. **Build Settings**:
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
4. **Environment Variables**:
   - `VITE_API_BASE_URL`: `https://aiflow-backend.onrender.com`
5. **Click Deploy**: Vercel will build and assign your free production URL (`https://aiflow.vercel.app`).

---

## 🔄 SPA Single-Page Routing Configuration

`frontend/vercel.json` contains automated rewrites to prevent HTTP 404 errors on browser page refreshes:

```json
{
  "version": 2,
  "rewrites": [
    { "source": "/api/(.*)", "destination": "https://aiflow-backend.onrender.com/api/$1" },
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```
