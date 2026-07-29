# Administrator Guide

This manual covers the day-to-day administration of AIFlow Enterprise via the UI and API.

## 1. Tenant & User Management

AIFlow Enterprise operates on a multi-tenant model.
- **Tenants**: Logical boundaries for data isolation. To create a new Tenant, access the SuperAdmin dashboard.
- **Users**: Users must belong to at least one Tenant. Password policies are enforced (Min 8 chars, 1 uppercase, 1 symbol).

## 2. RBAC Administration

Role-Based Access Control limits what users can view or execute.
Available default roles:
- `owner`: Full administrative privileges over the tenant.
- `editor`: Can create, edit, and execute workflows/agents.
- `viewer`: Read-only access to workflow results.

You can modify user roles in the `Settings > Security` tab of the Admin Console.

## 3. Configuration Management

Most platform behavior is driven by environment variables defined in the `aiflow-config` ConfigMap.
Changes to the ConfigMap require a pod restart to take effect:
```bash
kubectl rollout restart deployment backend
```

## 4. AI Provider Configuration

By default, the platform routes inference requests based on tenant configuration.
To add a new AI Provider (e.g. OpenAI):
1. Navigate to `Settings > Integrations > AI Providers`.
2. Select Provider type.
3. Input the API Key (stored securely in the database utilizing AES encryption).
4. Define the usage rate limits (spend caps) to prevent runaway costs.

## 5. Security Settings

- **Session Expiry**: Default JWT expiry is 60 minutes.
- **Audit Logs**: All administrative actions (user invitations, role changes) are logged to the `audit_logs` table for compliance.
