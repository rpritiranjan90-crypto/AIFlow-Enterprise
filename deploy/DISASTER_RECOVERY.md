# Disaster Recovery Plan - AIFlow Enterprise

This document outlines the disaster recovery (DR) procedures for AIFlow Enterprise infrastructure, focusing on database backups, recovery validation, and persistence strategies.

## 1. Database Backups (PostgreSQL)

### 1.1 Automated Backup Strategy
PostgreSQL backups are automated using a CronJob in Kubernetes that executes `pg_dumpall` and archives the backup to S3-compatible Object Storage (e.g., AWS S3, MinIO) nightly at 02:00 AM UTC.

**Backup Script Excerpt (`/scripts/backup.sh`)**:
```bash
#!/bin/bash
DATE=$(date +%Y-%m-%d_%H-%M-%S)
pg_dumpall -U postgres > /tmp/backup_$DATE.sql
gzip /tmp/backup_$DATE.sql
aws s3 cp /tmp/backup_$DATE.sql.gz s3://aiflow-backups/postgres/
```

### 1.2 Point-in-Time Recovery (PITR)
For enterprise-tier deployments, WAL (Write-Ahead Logging) archiving is enabled via `pgBackRest` or `wal-g`, allowing recovery to any specific second before a catastrophic event.

## 2. Restore Testing Procedure

To guarantee backup integrity, automated restore tests run weekly on an isolated staging cluster.

**Validation Steps**:
1. Provision a temporary PostgreSQL pod.
2. Download the latest backup from S3: `aws s3 cp s3://aiflow-backups/postgres/latest.sql.gz .`
3. Unzip and restore: `gunzip -c latest.sql.gz | psql -U postgres`
4. Run validation queries (e.g., `SELECT count(*) FROM workspaces;`).
5. Destroy the temporary pod.

## 3. Redis Persistence

The Redis cluster acts as both a fast cache and the Celery broker.
- **Persistence Mode**: AOF (Append Only File) is enabled (`--appendonly yes`) in the Kubernetes deployment.
- **RDB Snapshots**: Snapshots are taken every 5 minutes if at least 100 keys changed (`save 300 100`).
- **Recovery**: If the Redis pod crashes, the persistent volume claim (PVC) is re-attached, and Redis automatically replays the AOF log to restore the exact state of the task queues.

## 4. Infrastructure Failover (Multi-Region)

For `Tier-1` enterprise availability:
1. **DNS Routing**: Cloudflare or Route53 is configured with active-passive routing.
2. **Database Replication**: PostgreSQL uses asynchronous streaming replication to a cross-region read-replica.
3. **Failover Execution**: If the primary region goes offline, the replica is promoted to primary, and DNS routing is updated to point to the secondary region's Ingress controller. Expected RTO (Recovery Time Objective) < 15 minutes. Expected RPO (Recovery Point Objective) < 1 minute.
