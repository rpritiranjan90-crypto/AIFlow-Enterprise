# AIFlow Enterprise — Security Audit

**Assessment type:** Source code and configuration review  
**Scope:** Backend, frontend, deployment manifests, dependency-audit artifacts, and CI configuration  
**Assessment date:** 2026-08-06  
**Change policy:** No application or configuration files were modified during this review.

## Executive Summary

The application is **not ready for production exposure**. The highest-risk findings are broken authentication and authorization, a committed/default JWT signing secret, unauthenticated administrative endpoints, and unprotected execution WebSockets. Together, these allow an unauthenticated user to present as authenticated in the UI, mint backend access tokens, access administrative data and functions, and observe workflow execution streams.

The codebase includes helpful security building blocks—JWT decoding, password-hash helpers, rate limiting, security headers, Pydantic validation, parameterized SQLAlchemy queries, and secret-injection points in Kubernetes—but they are not consistently enforced.

### Severity summary

| Severity | Count | Required response |
|---|---:|---|
| Critical | 4 | Block production release; remediate immediately |
| High | 4 | Remediate before production exposure |
| Medium | 6 | Include in the immediate hardening release |
| Low | 3 | Track and address through normal engineering work |

## Scope and Method

The review examined source-controlled code and deployment configuration. It included authentication and authorization controls, JWT handling, secrets, environment configuration, injection defenses, browser risks, server-side request behavior, dependency-audit artifacts, and OWASP Top 10 mapping.

This was a static audit. It does not replace authenticated dynamic testing, production infrastructure review, penetration testing, cloud IAM review, or a fresh dependency scan performed in a clean build environment.

## Critical Findings

### C-01 — Authentication is a demo bypass

**Affected:** `backend/app/api/v1/auth.py`, `frontend/src/modules/auth/LoginPage.tsx`, `frontend/src/store/authStore.ts`  
**Category:** Broken Authentication / OWASP A07

The backend login endpoint accepts every password except the literal value `wrong`; it does not load a user or verify a password hash. The signup endpoint issues tokens without creating or validating an account. Independently, the frontend login page never calls the backend: it creates mock tokens after a timer. The persisted Zustand store initializes with an authenticated demo administrator.

**Impact:** Any visitor can access protected frontend routes. Any caller can obtain a backend JWT for an arbitrary email address. This makes the claimed authentication boundary ineffective.

**Remediation:**

1. Block release until login and signup use persistent user records and `verify_password` against stored password hashes.
2. Remove mock tokens, pre-authenticated store state, demo identities, and client-only login behavior from production builds.
3. Enforce email verification, password policy, password-reset flow, and account status checks.
4. Add negative tests proving invalid credentials cannot obtain either access or refresh tokens.

### C-02 — JWT signing secret and infrastructure credentials are committed or have insecure defaults

**Affected:** `backend/app/core/config.py`, `docker-compose.yml`, `deploy/docker-compose.prod.yml`, `deploy/docker-compose.production.yml`, `deploy/k8s/config.yaml`  
**Category:** Identification and Authentication Failures / Security Misconfiguration

`Settings.SECRET_KEY` has a usable hard-coded default. PostgreSQL, Grafana, and Docker Compose credentials are also embedded in source-controlled files. The Kubernetes Secret manifest includes placeholder secret values and the database URL embeds a password in a ConfigMap.

**Impact:** A deployed instance that uses the default signing key permits token forgery. Committed secrets can be harvested from source history, logs, container layers, or copied environments. Database credentials exposed through ConfigMaps are readable to identities with ConfigMap access.

**Remediation:**

1. Rotate every exposed or default secret immediately; treat all committed values as compromised.
2. Require `SECRET_KEY`, database credentials, and monitoring credentials at startup; do not provide usable defaults.
3. Use a managed secret store with workload identity, short-lived credentials, and rotation.
4. Move `DATABASE_URL` and all credential-bearing configuration into a Secret; never store credentials in a ConfigMap.
5. Add secret scanning to pre-commit and CI, and review Git history for leaked values.

### C-03 — Authorization defaults to administrator and is absent from sensitive routes

**Affected:** `backend/app/api/deps.py`, `backend/app/api/v1/admin.py`, multiple API routers  
**Category:** Broken Access Control / OWASP A01

`require_role` obtains roles from the token but falls back to `admin` when no role claim exists. Tokens created by the authentication module contain no roles, so a route using this dependency can treat an ordinary token as administrator. The admin router itself has no authentication or authorization dependency and exposes system, audit, user, credential, role, and settings endpoints without a server-side access check.

**Impact:** Anonymous or low-privilege callers can access administrative data and invoke administrative operations. The default-admin behavior enables privilege escalation whenever `require_role` is used.

**Remediation:**

1. Apply `get_current_active_user` and explicit permission dependencies to every protected router and endpoint, starting with `/admin/*`.
2. Remove all permissive defaults. Missing, invalid, or unrecognized roles must deny access.
3. Resolve roles and permissions from the authoritative database/session context, not only untrusted JWT claims.
4. Enforce workspace and tenant ownership checks for every object lookup; test cross-tenant IDOR attempts.
5. Add deny-by-default route tests and an API authorization matrix to CI.

### C-04 — Execution WebSocket is unauthenticated and susceptible to IDOR

**Affected:** `backend/app/api/v1/ws_execution.py`  
**Category:** Broken Access Control / OWASP A01

The execution WebSocket accepts connections to `/ws/executions/{execution_id}` without validating a token, user identity, tenant, workspace, or execution ownership.

**Impact:** An attacker who can guess or obtain an execution ID can subscribe to live workflow status and potentially sensitive node output.

**Remediation:**

1. Authenticate WebSocket connections before calling `accept` using a short-lived, audience-bound token or secure session cookie.
2. Authorize the caller against the execution, workflow, workspace, and tenant.
3. Use opaque, high-entropy identifiers; never rely on ID entropy alone.
4. Apply connection quotas, message-size limits, idle timeouts, and guaranteed cleanup of disconnected sockets.

## High Findings

### H-01 — SSRF through arbitrary HTTP workflow nodes

**Affected:** `backend/app/engine/node_runners/http_runner.py`  
**Category:** Server-Side Request Forgery / OWASP A10

The HTTP node accepts a user-configured URL, resolves variables into it, and performs `GET` or `POST` with `httpx` without hostname, IP-range, scheme, port, redirect, or DNS-rebinding controls. It returns the remote response body to the workflow context.

**Impact:** A user can direct the backend to internal services, cloud metadata endpoints, localhost services, or private network targets and exfiltrate responses.

**Remediation:**

1. Allow only HTTPS and explicitly approved hostnames or connector-defined destinations.
2. Resolve DNS and reject loopback, link-local, private, multicast, and reserved IP ranges; repeat validation after redirects and connection resolution.
3. Disable redirects by default and enforce an egress proxy/firewall policy.
4. Restrict methods, headers, request bodies, response sizes, and timeouts.
5. Do not return arbitrary upstream response bodies to untrusted users.

### H-02 — Use of Python `eval` for AI tool input

**Affected:** `backend/app/ai/tool_calling_engine.py`  
**Category:** Injection / OWASP A03

The calculator tool evaluates caller-controlled expressions with Python `eval`. Removing builtins does not provide a robust Python sandbox; object graph and language-level escape techniques are well known.

**Impact:** If an attacker controls tool arguments, this can lead to arbitrary code execution or denial of service.

**Remediation:** Replace `eval` with a strict expression parser that permits only numeric literals, arithmetic operators, and bounded expression depth. Execute untrusted code only in an isolated sandbox with no host filesystem, network, credentials, or excessive CPU/memory access.

### H-03 — Tokens are persisted in browser storage

**Affected:** `frontend/src/store/authStore.ts`  
**Category:** Identification and Authentication Failures / OWASP A07

Zustand persistence stores access and refresh tokens in browser storage. Any successful XSS can extract long-lived tokens.

**Impact:** Token theft enables account takeover until expiry or revocation.

**Remediation:** Prefer short-lived access tokens held in memory and refresh tokens in `HttpOnly`, `Secure`, `SameSite` cookies. If browser storage must be used, use short token lifetimes, strong CSP, refresh rotation, device/session management, and XSS testing.

### H-04 — Dependency audit artifacts report high-severity vulnerabilities

**Affected:** `backend/tests/security/npm_audit.json`, `backend/tests/security/pip_audit.json`  
**Category:** Vulnerable and Outdated Components / OWASP A06

The committed npm audit artifact reports **18 findings: 15 high and 3 moderate**. The committed pip-audit artifact lists vulnerable packages, including many `aiohttp` findings and vulnerable `cryptography`, `lxml`, and other components.

**Evidence limitation:** The Python artifact includes packages not declared in this project's `requirements.txt`, indicating it was likely generated from a broad local environment. It is evidence of scan debt, not proof that every listed package ships with the application. The audit artifact timestamp and package provenance are not reliable enough to substitute for a clean, current scan.

**Remediation:**

1. Generate fresh `npm audit --omit=dev` and `pip-audit -r backend/requirements.txt` reports in an isolated build environment.
2. Upgrade or replace every reachable vulnerable package, beginning with high and critical findings.
3. Pin direct dependencies and generate deterministic lockfiles/constraints.
4. Fail CI on newly introduced high or critical runtime vulnerabilities, with time-bound exceptions only.

## Medium Findings

### M-01 — Rate limiting and account lockout are process-local and client-IP based

**Affected:** `backend/app/middleware/rate_limit.py`, `backend/app/core/security.py`  
**Category:** Security Misconfiguration / OWASP A05

Rate-limit counters, failed-login counters, and revoked tokens live in Python process memory. They reset on restart and are not shared across Gunicorn workers or Kubernetes replicas. The limiter uses the directly observed client IP and does not safely establish trusted proxy boundaries.

**Impact:** Attackers can bypass limits by distributing requests across pods or IPs; legitimate clients behind a proxy can be misidentified. Logout and lockout behavior is inconsistent in a scaled deployment.

**Remediation:** Use Redis-backed, atomic rate limiting and lockout counters. Define trusted proxy networks before accepting forwarding headers. Scope limits by account, API key, tenant, and IP as appropriate.

### M-02 — CORS policy is broader than a strict production allowlist

**Affected:** `backend/app/main.py`  
**Category:** Security Misconfiguration / OWASP A05

The application permits a regex matching all `https://*.vercel.app` origins while allowing credentials. This grants every Vercel subdomain—not only controlled deployment domains—the ability to make credentialed cross-origin requests when browser authentication is introduced.

**Remediation:** Remove the wildcard regex. Maintain an exact, environment-specific allowlist, separate preview environments from production, and validate CORS behavior in integration tests.

### M-03 — Frontend lacks a clearly enforced Content Security Policy

**Affected:** `frontend/Dockerfile`, `backend/app/middleware/security_headers.py`  
**Category:** XSS / OWASP A03

The backend emits a CSP, but the frontend is served separately by Nginx and its generated Nginx configuration does not set CSP. The backend CSP also permits `unsafe-inline` scripts and styles and a third-party CDN for documentation assets.

**Impact:** React safely escapes normal rendered values, and no direct `dangerouslySetInnerHTML` use was identified in the application source; however, a future or supply-chain XSS has less browser containment. This also increases the impact of token persistence in browser storage.

**Remediation:** Set CSP at the frontend edge. Use nonce- or hash-based scripts, remove `unsafe-inline` where feasible, tightly restrict `connect-src`, and avoid loading runtime JavaScript from third-party CDNs in production.

### M-04 — Unbounded document uploads and unsafe file-processing posture

**Affected:** `backend/app/api/v1/knowledge.py`  
**Category:** Software and Data Integrity Failures / OWASP A08

The document-upload endpoint reads the complete upload into memory, accepts file types based only on filename extension, and invokes PDF/DOCX parsing without explicit size, page, archive, or content limits.

**Impact:** Attackers can cause memory exhaustion or parser denial-of-service and can submit malformed or deceptive files.

**Remediation:** Enforce server/proxy upload limits, inspect content types and magic bytes, cap PDF pages/text size/chunk count, isolate parsing in a resource-constrained worker, scan uploads for malware, and store files outside the application container.

### M-05 — Metrics access fails open when production key/IP controls are unset

**Affected:** `backend/app/api/metrics.py`, `backend/app/core/config.py`  
**Category:** Security Misconfiguration / OWASP A05

In production, `/metrics` requires an API key only if `METRICS_API_KEY` is configured and IP filtering only if `METRICS_ALLOWED_IPS` is configured. If both are unset, metrics remain reachable.

**Impact:** Infrastructure topology, request volume, and operational metadata may be exposed.

**Remediation:** Make production metrics deny by default. Require service authentication or network isolation and use a dedicated scrape path accessible only to Prometheus.

### M-06 — Excessive sensitive data in logs and API error detail

**Affected:** `backend/app/api/v1/knowledge.py`, `backend/app/ai/vector_store.py`, `backend/app/monitoring/middleware.py`  
**Category:** Security Logging and Monitoring Failures / OWASP A09

RAG uploads and searches log file names, query text, knowledge-base identifiers, and database diagnostics. The upload endpoint returns raw exception text in its HTTP 500 detail. Request middleware logs client IP and user agent on every request.

**Impact:** Sensitive documents, business queries, and internal implementation details can leak through logs or error responses.

**Remediation:** Establish data-classification rules for logs, redact prompt/document content and secrets, return generic client errors with correlation IDs, and protect log retention/access.

## Low Findings

### L-01 — CSRF is not presently the primary risk, but future cookie authentication needs a defense

**Affected:** Frontend token model and future session design  
**Category:** CSRF

The current API uses bearer tokens in request headers rather than cookies, so traditional browser CSRF is not the main exposure today. If the recommended `HttpOnly` cookie model is adopted, cross-site requests will require CSRF defenses.

**Remediation:** Use `SameSite=Lax` or `Strict` where compatible, verify Origin/Referer on unsafe requests, and add a synchronizer token or double-submit mechanism before using cookie-authenticated APIs.

### L-02 — SQL injection controls are generally sound, but must remain policy

**Affected:** SQLAlchemy query use in API and vector-store code  
**Category:** Injection / OWASP A03

The reviewed application queries use SQLAlchemy expressions and bound values. No user-controlled SQL concatenation was identified. The raw SQL statements found are static extension-management operations.

**Remediation:** Preserve parameterized ORM/bound-query requirements, prohibit dynamic SQL concatenation in code review, and add SAST rules/tests for raw query construction.

### L-03 — Security headers can be improved at the edge

**Affected:** `backend/app/middleware/security_headers.py`, frontend Nginx Docker configuration  
**Category:** Security Misconfiguration / OWASP A05

The backend supplies several useful headers: `X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy`, `Permissions-Policy`, HSTS on HTTPS, and CSP. HSTS depends on the backend seeing an HTTPS scheme; that may not be true behind TLS-terminating ingress without trusted proxy configuration.

**Remediation:** Set headers at the ingress/frontend edge, configure trusted proxy behavior, validate headers with integration tests, and keep a single authoritative header policy.

## Focus Areas

### Authentication and JWT

- **Status:** Critical deficiencies. JWT token generation and parsing work technically, but issuance, secret management, frontend integration, session revocation, and identity verification are not production-safe.
- **Required control:** Database-backed account validation; asymmetric or strongly managed signing keys; issuer, audience, and clock-skew validation; refresh rotation; Redis-backed revocation; no usable default key.

### Authorization

- **Status:** Critical deficiencies. The role fallback to administrator and missing dependencies on sensitive routers violate deny-by-default principles.
- **Required control:** Centralized RBAC/ABAC enforcement at every route and object access, tenant/workspace scoping, and comprehensive authorization tests.

### Secrets and Environment Variables

- **Status:** Critical deficiencies. Secrets and credentials appear in source-controlled configuration; environment defaults are usable.
- **Required control:** External secret manager, startup validation, rotation, least-privilege service accounts, and secret scanning.

### SQL Injection

- **Status:** No direct SQL injection found in the reviewed code. SQLAlchemy expression APIs are used appropriately.
- **Required control:** Keep parameterization mandatory; validate any future dynamic filtering, reporting, or raw SQL.

### XSS

- **Status:** No direct dangerous HTML sink was found in reviewed React code; React escaping provides a baseline. The absence of a frontend CSP and browser-stored tokens materially increases the consequence of any future XSS.
- **Required control:** Edge CSP, trusted rendering policy, dependency hygiene, and automated DOM XSS tests.

### CSRF

- **Status:** Low with the present Authorization-header approach. It becomes material if browser cookies are used for refresh/session tokens.
- **Required control:** SameSite cookies plus Origin validation and CSRF tokens for unsafe methods when cookie authentication is adopted.

### SSRF

- **Status:** High. Arbitrary HTTP workflow nodes lack egress policy and target validation.
- **Required control:** Destination allowlists, DNS/IP validation, disabled redirects, egress proxy, and response restrictions.

## Dependency Vulnerabilities

The repository contains audit artifacts that report npm and Python vulnerabilities. The npm artifact reports 15 high and 3 moderate findings. The pip artifact is not directly attributable to the declared production dependency set and must be regenerated cleanly.

**Required process:**

1. Build from lockfiles in a clean CI runner.
2. Run package-manager and container vulnerability scans on every change.
3. Publish SBOMs for release artifacts.
4. Define patch SLAs: critical within 24 hours, high within 7 days, medium within 30 days.
5. Track exceptions with owner, rationale, compensating control, and expiry date.

## OWASP Top 10 Mapping

| OWASP category | Assessment |
|---|---|
| A01 Broken Access Control | **Critical:** admin endpoints lack enforcement, role defaults to admin, WebSockets are unauthenticated, tenant/object checks are incomplete. |
| A02 Cryptographic Failures | **Critical:** default/committed JWT and infrastructure secrets; no enforced external secret management. |
| A03 Injection | **High:** Python `eval` and SSRF-capable HTTP runner. SQL injection was not found in reviewed queries. |
| A04 Insecure Design | **High:** demo auth and in-memory security state are incompatible with a multi-user, multi-tenant service. |
| A05 Security Misconfiguration | **High:** permissive CORS regex, metrics fail-open configuration, frontend CSP gap, source-controlled deployment credentials. |
| A06 Vulnerable and Outdated Components | **High:** committed audit artifacts report high-severity package findings; a fresh attributable scan is required. |
| A07 Identification and Authentication Failures | **Critical:** arbitrary token issuance and browser-persisted tokens. |
| A08 Software and Data Integrity Failures | **Medium:** unbounded document parsing and insufficient upload verification. |
| A09 Security Logging and Monitoring Failures | **Medium:** sensitive RAG/query data and raw internal error text can be logged or returned. |
| A10 Server-Side Request Forgery | **High:** arbitrary destination support in the HTTP workflow runner. |

## Remediation Roadmap

### Immediate release blockers

1. Replace demo authentication and UI mock login with real identity validation.
2. Rotate and remove all committed/default secrets; enforce required runtime configuration.
3. Apply authentication and authorization to admin routes and WebSockets; remove default-admin behavior.
4. Disable arbitrary HTTP workflow nodes or implement SSRF controls before exposing them.
5. Remove `eval` and regenerate dependency scans from a clean build.

### Next hardening release

1. Move rate limits, lockouts, sessions, and revocation state to Redis/PostgreSQL.
2. Enforce strict CORS, edge CSP, secure token storage, and protected metrics.
3. Add upload limits and isolated document processing.
4. Redact sensitive logs and standardize safe client error handling.
5. Add SAST, DAST, secret scanning, SBOM generation, and authorization regression tests to required CI checks.

### Ongoing controls

- Quarterly external penetration test and threat-model review.
- Dependency patch management and vulnerability SLA reporting.
- Secrets rotation and access review at least every 90 days.
- Tenant-isolation and WebSocket authorization tests on every release.
- Centralized security logging with retention, alerting, and incident response runbooks.

