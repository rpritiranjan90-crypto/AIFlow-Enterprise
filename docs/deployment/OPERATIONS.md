# Day-2 Operations Manual

## Maintenance Procedures

### 1. Database Backups
Automated hourly WAL archiving and daily full PostgreSQL pg_dump:

```bash
# Manual Database Backup
kubectl exec -it -n aiflow-prod sts/aiflow-postgres -- pg_dump -U aiflow_user -F c aiflow_db > backup_$(date +%F).dump
```

### 2. Redis Persistence & Flush
```bash
# Save Redis state
kubectl exec -it -n aiflow-prod sts/aiflow-redis -- redis-cli BGSAVE
```
