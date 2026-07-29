# AIFlow Enterprise

> **"The AI-Powered Business Automation Platform"**

Production-grade Enterprise SaaS platform inspired by Microsoft Power Automate, Zapier, n8n, Notion, Linear, GitHub, and Vercel Dashboard.

---

## Sprint 1 Architectural Overview

```
AIFlow Enterprise/
├── .github/workflows/         # CI/CD: frontend.yml, backend.yml, lint.yml
├── docker-compose.yml         # Local PostgreSQL 16 & Redis 7 services
├── packages/                  # Monorepo Shared Package Layer
│   ├── shared-types/          # Shared TypeScript interfaces & DTOs
│   ├── ui-tokens/             # Design system tokens & constants
│   ├── eslint-config/         # Shared ESLint rules
│   └── tsconfig/              # Shared base tsconfig files
├── frontend/                  # React 19 + TypeScript + Vite + Tailwind CSS
│   ├── src/
│   │   ├── components/
│   │   │   ├── layout/        # Sidebar, Header, DashboardLayout, Footer
│   │   │   └── ui/            # Reusable UI System (20+ Enterprise components)
│   │   ├── context/           # Theme Context (Dark / Light / System)
│   │   ├── modules/           # Domain-driven frontend modules
│   │   │   ├── analytics/     # Telemetry & KPI charts
│   │   │   ├── auth/          # Login, Signup, Forgot/Reset Password
│   │   │   ├── dashboard/     # Enterprise KPI widgets & activity streams
│   │   │   ├── executions/    # Execution logs & payload viewer
│   │   │   ├── integrations/  # 16+ Enterprise app connectors
│   │   │   ├── settings/      # Workspace settings, team invite modal, RBAC
│   │   │   └── workflow/      # Workflow listing & run triggers
│   │   └── pages/             # Landing page, Pricing, Docs
└── backend/                   # FastAPI + Async SQLAlchemy + PostgreSQL
    ├── app/
    │   ├── ai/                # Autonomous AI Module Framework
    │   ├── api/v1/            # Auth, Workspace, Health APIs
    │   ├── core/              # Config, Database, Security (JWT, Lockout)
    │   ├── logging/           # Structured JSON Logger
    │   ├── middleware/        # Request ID, Security Headers, Rate Limiting
    │   ├── models/            # SQLAlchemy 2.0 ORM Models (User, Org, Workspace, etc.)
    │   ├── schemas/           # Pydantic v2 schemas
    │   ├── storage/           # Local, S3, GCS File Storage Abstraction
    │   ├── tasks/             # Task Queue definition
    │   └── workers/           # Background Workers skeleton
```

---

## Quick Start Commands

### 1. Start Infrastructure (PostgreSQL & Redis)
```bash
docker-compose up -d
```

### 2. Run Backend Engine (FastAPI)
```bash
cd backend
python -m pip install -r requirements.txt
python -m uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```
API Documentation: `http://localhost:8000/docs`
Health Status: `http://localhost:8000/api/v1/health`

### 3. Run Frontend Web Application (React + Vite)
```bash
cd frontend
npm install
npm run dev
```
Web Application: `http://localhost:3000`

---

## Verification & Build Validation

- **TypeScript Compilation Check**:
  ```bash
  cd frontend && npm run build
  ```
- **Backend Startup Verification**:
  ```bash
  cd backend && python -c "from app.main import app; print('Backend app loaded!')"
  ```
