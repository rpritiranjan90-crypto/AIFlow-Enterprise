# Database & Schema Migration Guide

## Alembic Database Migration Steps
1. Apply PostgreSQL Alembic schema migrations:
   ```bash
   cd backend
   alembic upgrade head
   ```
2. Verify vector index extensions:
   ```sql
   CREATE EXTENSION IF NOT EXISTS vector;
   ```
