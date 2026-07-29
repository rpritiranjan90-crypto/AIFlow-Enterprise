# Developer Guide

Welcome to the AIFlow Enterprise engineering team. This guide outlines how to contribute code.

## 1. Local Development Setup

### Backend (Python)
1. Install Python 3.10 and `uv`.
2. Navigate to the `backend/` directory.
3. Install dependencies:
   ```bash
   uv pip install -r requirements.txt
   uv pip install pytest pytest-cov
   ```
4. Start the server (Requires local Postgres and Redis):
   ```bash
   uvicorn app.main:app --reload
   ```

### Frontend (React/Vite)
1. Install Node.js 20+.
2. Navigate to the `frontend/` directory.
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```

## 2. Coding Standards

- **Python**: Enforce strict type hints. Formatting is done via `black`, linting via `flake8`, and static analysis via `mypy`.
- **React**: Use functional components and hooks exclusively. Follow the Airbnb JavaScript Style Guide.
- **Security**: Never commit secrets. Validate all inputs via Pydantic on the backend.

## 3. Testing Workflow

We use Test-Driven Development (TDD) where applicable.
- **Backend Tests**: `pytest`
  ```bash
  python -m pytest tests/
  ```
- **Frontend Tests**: `vitest`
  ```bash
  npx vitest
  ```

Code cannot be merged into `main` unless coverage is >= 80% (enforced by GitHub Actions).

## 4. CI/CD Release Lifecycle

We employ a trunk-based development strategy.
1. Branch from `develop`.
2. Open a Pull Request (PR).
3. The CI pipeline (`.github/workflows/ci.yml`) executes static analysis, unit tests, and security audits (`pip-audit`, `npm audit`).
4. Upon approval, merge to `develop` deploys to the Staging Environment automatically.
5. Pushing to `main` creates a release candidate and requires manual approval to deploy to Production.

## 5. Extension Points

- **New AI Providers**: Subclass the `BaseAIProvider` in `backend/app/services/ai/`.
- **New Workflow Nodes**: Register logic in `backend/app/services/workflow_engine.py`.
