# Commercial Launch Readiness Checklist

Before transitioning from Beta to General Availability (GA), the following operational elements must be verified.

## 1. Public Production Environment
- [ ] **Production Domain**: Verify `aiflow.enterprise.com` routes correctly to the Kubernetes Ingress Controller via A/CNAME records.
- [ ] **SSL Verification**: Confirm Let's Encrypt `cert-manager` has successfully issued and applied the wildcard TLS certificate for the production domain.
- [ ] **WAF & CDN**: Ensure Cloudflare (or AWS CloudFront/WAF) is proxying traffic and caching static assets.

## 2. Status & Maintenance
- [ ] **Status Page**: Configure `status.aiflow.enterprise.com` (e.g. using Atlassian Statuspage) and link it to Alertmanager webhooks for automated incident reporting.
- [ ] **Maintenance Mode**: Verify the Nginx Ingress `maintenance-page` config map is ready to deploy custom 503 error pages during scheduled downtime.

## 3. Compliance & Security
- [ ] **Data Processing Agreement (DPA)**: DPA published and linked on the pricing page for enterprise customers.
- [ ] **SOC2/ISO27001 Readiness**: Audit logs (stored in PostgreSQL) are being replicated to cold storage.
