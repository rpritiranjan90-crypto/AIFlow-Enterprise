# ============================================================================
# AIFlow Enterprise
# AI Development Rulebook
# Version: 1.0
# Section 1 — Project Vision & Goals
# ============================================================================

## 1. Project Identity

Project Name:
AIFlow Enterprise

Project Type:
Enterprise AI Workflow Automation Platform

Development Status:
Production Development

Primary Goal:
Build a secure, scalable, production-ready AI workflow platform that allows organizations to design, automate, monitor, and manage intelligent business workflows using AI agents and modern cloud-native architecture.

---

## 2. Project Vision

AIFlow Enterprise is not a demo project.

Every line of code must be written as if it will be deployed in a real production environment.

The project must demonstrate enterprise software engineering practices, including:

- Clean Architecture
- Modular Design
- High Security
- Scalability
- Maintainability
- Performance
- Reliability
- Comprehensive Documentation

This project should be suitable for:

- Portfolio
- Internship applications
- Campus placements
- Production deployment
- Open-source contribution
- Enterprise demonstrations

---

## 3. Core Objectives

The platform must:

- Support multiple organizations.
- Support multiple users.
- Support role-based permissions.
- Execute AI-powered workflows.
- Provide secure authentication.
- Maintain complete audit logs.
- Offer real-time monitoring.
- Be cloud deployment ready.
- Be containerized with Docker.
- Be production ready from day one.

---

## 4. Development Philosophy

The project follows these principles:

### Build Once

Every feature should be designed correctly the first time.

Avoid temporary solutions whenever possible.

---

### Production First

Never generate prototype code.

Never generate placeholder logic for production features.

Every implementation should be deployable after testing.

---

### Simplicity

Prefer:

- Simple APIs
- Simple architecture
- Readable code
- Small modules
- Low coupling

Avoid unnecessary complexity.

---

### Maintainability

Every module should be:

- Easy to understand
- Easy to modify
- Easy to test
- Easy to extend

Future developers should understand the codebase quickly.

---

### Security by Default

Security is mandatory.

Never treat security as an optional improvement.

Every feature must consider:

- Authentication
- Authorization
- Validation
- Logging
- Encryption
- Secrets Management

before implementation.

---

## 5. Quality Standards

Every feature must satisfy these requirements:

✔ Readable

✔ Modular

✔ Documented

✔ Type-safe

✔ Tested

✔ Secure

✔ Performant

✔ Production Ready

Code that does not satisfy these requirements must not be considered complete.

---

## 6. Long-Term Goals

The finished system should demonstrate:

- Enterprise Backend Engineering
- Enterprise Frontend Engineering
- Secure Authentication
- Cloud Deployment
- CI/CD
- Monitoring
- AI Integration
- API Design
- Database Design
- Docker Deployment
- Production Architecture

---

## 7. AI Development Policy

Every AI-generated response must:

- Preserve existing architecture.
- Never modify unrelated files.
- Make the smallest correct change.
- Explain assumptions when necessary.
- Prefer maintainability over cleverness.
- Keep naming consistent.
- Avoid duplicated code.
- Follow existing project conventions.
- Generate production-quality implementations.
- Never remove existing functionality without explicit instruction.

---

## 8. Success Criteria

AIFlow Enterprise will be considered complete only when it includes:

- Production-ready architecture
- Authentication & authorization
- AI workflow engine
- Secure REST APIs
- Monitoring
- Logging
- Testing
- Documentation
- CI/CD
- Docker deployment
- Performance optimization
- Security hardening

---

## 9. Golden Rule

Every implementation must answer YES to these questions:

- Is this production ready?
- Is this secure?
- Is this maintainable?
- Is this scalable?
- Is this documented?
- Is this testable?
- Is this consistent with the project architecture?

If any answer is NO,
the implementation is incomplete.
# ============================================================================
# AIFlow Enterprise
# AI Development Rulebook
# Version: 1.0
# Section 2 — Enterprise Architecture Principles
# ============================================================================

## 2.1 Architecture Philosophy

AIFlow Enterprise follows a Production-First architecture.

The system must be:

- Modular
- Scalable
- Secure
- Testable
- Maintainable
- Observable
- Extensible

Every architectural decision must prioritize long-term maintainability over short-term convenience.

---

# 2.2 Primary Architecture

The application follows:

- Clean Architecture
- Layered Architecture
- Feature-Based Organization
- Domain-Driven Design (lightweight)
- SOLID Principles

Business logic must never depend on UI.

Infrastructure must never contain business rules.

Frameworks must remain replaceable.

---

# 2.3 High-Level Layers

The application is divided into:

Presentation Layer

↓

Application Layer

↓

Domain Layer

↓

Infrastructure Layer

↓

Persistence Layer

Each layer has a single responsibility.

No layer may bypass another without explicit architectural approval.

---

# 2.4 Layer Responsibilities

## Presentation Layer

Responsible for:

- React UI
- Pages
- Components
- Forms
- Routing
- Client-side validation
- User interactions

Never contains business logic.

---

## Application Layer

Responsible for:

- Use Cases
- Services
- Orchestration
- Workflow execution
- DTO mapping

Coordinates business operations.

Contains no database implementation.

---

## Domain Layer

Responsible for:

- Business Rules
- Entities
- Value Objects
- Interfaces
- Domain Events

This is the heart of the system.

Must remain framework-independent.

---

## Infrastructure Layer

Responsible for:

- Database access
- Redis
- External APIs
- File Storage
- Email
- AI Providers
- Authentication Providers

Contains implementation details only.

---

## Persistence Layer

Responsible for:

- PostgreSQL
- Migrations
- Repositories
- ORM configuration
- Database indexes

No business rules.

---

# 2.5 Feature-Based Organization

Code is organized by feature rather than by technology.

Example:

authentication/

workflow/

agents/

organizations/

users/

notifications/

audit/

billing/

Each feature contains its own:

- API
- Service
- Models
- Schemas
- Tests

This minimizes coupling.

---

# 2.6 Dependency Rules

Allowed dependencies:

Presentation
↓

Application
↓

Domain

Infrastructure
↓

Domain

Persistence
↓

Infrastructure

Forbidden:

❌ UI → Database

❌ Database → UI

❌ Domain → React

❌ Domain → FastAPI

❌ Domain → PostgreSQL

Domain must not depend on external frameworks.

---

# 2.7 SOLID Principles

Every implementation must follow:

S

Single Responsibility

One class

One reason to change.

---

O

Open / Closed

Open for extension.

Closed for modification.

---

L

Liskov Substitution

Child classes must behave like parents.

---

I

Interface Segregation

Small focused interfaces.

Avoid large generic interfaces.

---

D

Dependency Inversion

Depend on abstractions.

Never depend directly on implementations.

---

# 2.8 Separation of Concerns

Business Logic

≠

API

≠

Database

≠

Frontend

≠

Infrastructure

Each concern must remain isolated.

---

# 2.9 Folder Design Principles

Every folder must represent a business responsibility.

Avoid folders like:

helpers/

misc/

common/

utils/

unless they are genuinely shared.

Prefer:

authentication/

workflow/

organization/

notification/

audit/

---

# 2.10 Reusability Rules

Reusable code belongs in:

shared/

core/

common/

Only when used by multiple independent modules.

Never move feature-specific code into shared prematurely.

---

# 2.11 API Architecture

REST APIs must follow:

Controllers

↓

Services

↓

Repositories

↓

Database

Controllers remain thin.

Business logic belongs in Services.

Repositories only access data.

---

# 2.12 Frontend Architecture

React follows:

Pages

↓

Layouts

↓

Features

↓

Components

↓

Shared UI

Pages coordinate.

Components render.

Hooks manage logic.

Services communicate with APIs.

---

# 2.13 Backend Architecture

FastAPI follows:

Routers

↓

Services

↓

Repositories

↓

Database

Routers never contain business logic.

---

# 2.14 Error Flow

Every error follows:

Exception

↓

Logging

↓

Error Handler

↓

Standard Response

↓

Frontend

Never expose internal stack traces.

---

# 2.15 Logging Architecture

Every important operation logs:

User

Action

Timestamp

Resource

Status

Duration

Request ID

Sensitive information must never be logged.

---

# 2.16 Architecture Golden Rules

Every feature must:

✓ Be independent.

✓ Be testable.

✓ Be replaceable.

✓ Be documented.

✓ Follow dependency rules.

✓ Minimize coupling.

✓ Maximize cohesion.

✓ Avoid circular dependencies.

Architecture violations are treated as production defects.
# ============================================================================
# AIFlow Enterprise
# AI Development Rulebook
# Version: 1.0
# Section 3 — Technology Stack & Development Standards
# ============================================================================

# 3.1 Technology Philosophy

Technology choices must prioritize:

- Stability
- Long-term maintenance
- Security
- Community support
- Performance
- Production readiness

Avoid experimental technologies unless they provide a clear business benefit.

---

# 3.2 Frontend Stack

Framework:
- React 19

Language:
- TypeScript

Build Tool:
- Vite

Styling:
- Tailwind CSS v4

Routing:
- React Router

State Management:
- Zustand

Server State:
- TanStack Query

Forms:
- React Hook Form

Validation:
- Zod

Charts:
- Recharts

Animations:
- Framer Motion

Icons:
- Lucide React

Tables:
- TanStack Table

Notifications:
- Sonner

Date Utilities:
- date-fns

---

# 3.3 Backend Stack

Framework:
- FastAPI

Language:
- Python 3.12+

ASGI Server:
- Uvicorn

Validation:
- Pydantic v2

Authentication:
- JWT

Password Hashing:
- Argon2

Dependency Management:
- uv

Background Jobs:
- Celery

Task Queue:
- Redis

File Upload:
- Local Storage (Development)
- Object Storage (Production)

---

# 3.4 Database Stack

Primary Database:
- PostgreSQL

ORM:
- SQLAlchemy 2.x

Migration Tool:
- Alembic

Connection Pooling:
- SQLAlchemy Pool

Cache:
- Redis

---

# 3.5 AI Stack

Local Development:
- Ollama

Primary Coding Model:
- Qwen2.5-Coder 7B

IDE Assistant:
- Continue

Planning & Architecture:
- ChatGPT

Future AI Providers:
- OpenAI
- Anthropic
- Google
- Azure OpenAI

All providers must be abstracted behind a common interface.

---

# 3.6 Infrastructure

Containerization:
- Docker

Reverse Proxy:
- Nginx

Environment Management:
- .env

Configuration:
- Pydantic Settings

Health Checks:
- Required

Secrets:
- Environment Variables

---

# 3.7 Testing Stack

Frontend:
- Vitest
- React Testing Library

Backend:
- Pytest

API Testing:
- HTTPX

Coverage:
- Coverage.py

End-to-End:
- Playwright

---

# 3.8 Code Quality

Formatting:

Frontend:
- Prettier

Linting:
- ESLint

Backend Formatting:
- Ruff Format

Backend Linting:
- Ruff

Type Checking:
- TypeScript
- mypy

Every pull request must pass formatting and linting.

---

# 3.9 Documentation

Documentation includes:

- README
- API Documentation
- Architecture Documents
- Deployment Guide
- Environment Setup
- Database Schema
- Developer Guide

Every major feature must include documentation updates.

---

# 3.10 API Standards

REST APIs must use:

- JSON
- HTTPS
- Versioned endpoints
- Consistent naming
- Pagination
- Filtering
- Sorting
- Validation
- Standard error responses

---

# 3.11 Naming Conventions

React Components:
PascalCase

Hooks:
useSomething

Variables:
camelCase

Functions:
camelCase

Classes:
PascalCase

Python Files:
snake_case

Database Tables:
snake_case

API Routes:
kebab-case

Environment Variables:
UPPER_SNAKE_CASE

---

# 3.12 Dependency Policy

Allowed:

- Well-maintained
- Open source
- Production-tested
- Frequently updated
- Security-reviewed

Avoid packages that:

- Have no maintenance
- Have poor documentation
- Duplicate existing functionality
- Introduce unnecessary complexity

Always prefer fewer high-quality dependencies.

---

# 3.13 Version Management

Use semantic versioning.

Major:
Breaking changes

Minor:
New features

Patch:
Bug fixes

Lock dependency versions for production deployments.

---

# 3.14 Environment Configuration

Separate environments:

- Development
- Testing
- Staging
- Production

Never hardcode:

- API keys
- Secrets
- Passwords
- Tokens
- Database URLs

Use environment variables for all sensitive configuration.

---

# 3.15 Logging & Monitoring

Structured logging is mandatory.

Log levels:

- DEBUG
- INFO
- WARNING
- ERROR
- CRITICAL

Never log:

- Passwords
- Tokens
- Secrets
- Personal sensitive information

---

# 3.16 Technology Golden Rules

Every technology added to the project must:

✓ Be production ready

✓ Be actively maintained

✓ Have good documentation

✓ Support long-term maintenance

✓ Improve developer productivity

✓ Fit the existing architecture

Avoid introducing new technologies without architectural review.
# ============================================================================
# AIFlow Enterprise
# AI Development Rulebook
# Version: 1.0
# Section 4 — Coding Standards & Best Practices
# ============================================================================

# 4.1 Coding Philosophy

Every line of code must be:

- Readable
- Maintainable
- Testable
- Secure
- Performant
- Production Ready

Code is written for humans first, computers second.

Never sacrifice readability for cleverness.

---

# 4.2 General Coding Principles

Always follow:

- SOLID Principles
- DRY (Don't Repeat Yourself)
- KISS (Keep It Simple)
- YAGNI (You Aren't Gonna Need It)
- Separation of Concerns

Avoid unnecessary abstraction.

Prefer explicit code over hidden behavior.

---

# 4.3 Naming Conventions

Use meaningful names.

Good:

UserService

AuthenticationController

WorkflowEngine

Bad:

Manager

Helper

Temp

Data

Value

Thing

Never abbreviate unless universally understood.

---

# 4.4 Function Rules

Functions must:

- Perform one responsibility
- Have descriptive names
- Remain short (preferably under 40 lines)
- Return predictable results
- Avoid side effects where possible

Avoid deeply nested logic.

Prefer early returns.

---

# 4.5 Class Rules

Each class should:

- Represent one responsibility
- Be easy to test
- Avoid global state
- Depend on interfaces where practical

Large "God classes" are not allowed.

---

# 4.6 File Organization

One primary responsibility per file.

Example:

auth_service.py

user_repository.py

login_page.tsx

dashboard_layout.tsx

Avoid mixing unrelated features.

---

# 4.7 React Standards

Components should:

- Be functional components
- Use TypeScript
- Use hooks
- Keep rendering logic simple
- Extract reusable UI into shared components

Business logic belongs in hooks or services.

---

# 4.8 FastAPI Standards

Routers:

- Handle HTTP requests
- Validate input
- Return responses

Services:

- Contain business logic

Repositories:

- Access the database only

Never place business logic inside routers.

---

# 4.9 Error Handling

Never ignore exceptions.

Every error should:

- Be logged
- Return a meaningful message
- Avoid exposing internal implementation details

Use centralized exception handlers.

---

# 4.10 Validation

Validate all external input.

Frontend:

- User experience validation

Backend:

- Security validation

Never trust client-side validation alone.

---

# 4.11 Security Practices

Always:

- Hash passwords
- Validate JWTs
- Sanitize inputs
- Escape output where appropriate
- Use parameterized queries
- Protect secrets
- Apply least-privilege access

Never hardcode credentials.

---

# 4.12 Logging

Log important events:

- Login
- Logout
- Workflow execution
- AI requests
- Failures
- Security events

Do not log passwords, secrets, or tokens.

---

# 4.13 Comments

Write comments only when they explain *why*, not *what*.

Bad:

// Increment i

Good:

// Retry to handle temporary network failures

Keep comments accurate and remove outdated ones.

---

# 4.14 Documentation

Public functions, APIs, and complex modules should include clear documentation.

Update documentation whenever behavior changes.

---

# 4.15 Performance

Prefer efficient algorithms.

Avoid:

- Unnecessary database queries
- Duplicate API calls
- Repeated calculations
- Unbounded loops

Measure before optimizing.

---

# 4.16 Async Programming

Use asynchronous operations for:

- Database access
- Network requests
- File operations
- Background jobs

Avoid blocking the main execution flow.

---

# 4.17 Testing Requirements

Every new feature should include appropriate tests.

At minimum:

- Unit tests for business logic
- Integration tests for APIs
- End-to-end tests for critical user flows

Fix failing tests before merging changes.

---

# 4.18 Git Standards

One feature per branch.

Commit messages should be clear and descriptive.

Example:

feat(auth): add JWT refresh token support

fix(api): handle expired access tokens

Avoid large unrelated commits.

---

# 4.19 AI Code Generation Rules

When generating code, the AI must:

- Modify only the files required
- Preserve existing architecture
- Follow project naming conventions
- Produce production-ready code
- Avoid unnecessary dependencies
- Keep implementations focused
- Include tests where appropriate
- Explain assumptions if requirements are unclear

Never rewrite unrelated modules.

---

# 4.20 Coding Golden Rules

Before completing any task, verify:

✓ Code compiles

✓ Code is formatted

✓ Lint passes

✓ Types are correct

✓ Tests pass

✓ Security has been considered

✓ Documentation is updated

✓ Changes are limited to the required scope

If any item fails, the implementation is not complete.
# ============================================================================
# AIFlow Enterprise
# AI Development Rulebook
# Version: 1.0
# Section 5 — Security Standards & Authentication
# ============================================================================

# 5.1 Security Philosophy

Security is a core requirement.

Every feature must be designed with security in mind from the beginning.

Never postpone security until after implementation.

Security requirements are mandatory.

---

# 5.2 Zero Trust Principle

The system follows a Zero Trust architecture.

Never trust:

- User input
- Client applications
- Browsers
- APIs
- External services
- Internal requests without verification

Every request must be authenticated, authorized, validated, and logged.

---

# 5.3 Authentication

Authentication must support:

- Email & Password
- OAuth (future)
- Enterprise SSO (future)

Passwords are never stored in plain text.

Use Argon2 for password hashing.

---

# 5.4 Password Policy

Minimum requirements:

- At least 12 characters
- Uppercase letter
- Lowercase letter
- Number
- Special character

Prevent:

- Common passwords
- Previously breached passwords
- Reused passwords (future enhancement)

---

# 5.5 JWT Standards

Authentication uses:

- Short-lived Access Tokens
- Long-lived Refresh Tokens

Access tokens:

- Expire quickly
- Never stored in localStorage

Refresh tokens:

- Stored securely
- Rotated after use
- Revoked on logout

---

# 5.6 Session Management

Sessions must:

- Have expiration
- Support logout
- Support forced logout
- Record login history
- Allow administrators to revoke active sessions

---

# 5.7 Authorization

Use Role-Based Access Control (RBAC).

Every protected endpoint must verify:

- Authentication
- Role
- Permission

Never rely on frontend authorization.

---

# 5.8 Roles

Example roles:

- Super Admin
- Organization Admin
- Manager
- Operator
- Viewer

Roles should map to permissions rather than hardcoded logic.

---

# 5.9 Permission System

Permissions should be fine-grained.

Examples:

users.read

users.create

users.update

users.delete

workflows.execute

workflows.manage

agents.create

settings.update

Avoid embedding permissions directly in application code.

---

# 5.10 Input Validation

Validate every request on the backend.

Checks include:

- Required fields
- Length
- Format
- Allowed values
- Type validation
- Business rules

Reject invalid input with clear error messages.

---

# 5.11 Output Protection

Never expose:

- Password hashes
- API keys
- Secrets
- Internal file paths
- Stack traces
- Database errors

Return standardized error responses.

---

# 5.12 Secret Management

Never commit secrets to Git.

Store sensitive values in environment variables.

Examples:

OPENAI_API_KEY

DATABASE_URL

JWT_SECRET

REDIS_URL

Encrypt secrets where appropriate.

---

# 5.13 API Security

Every protected API must include:

- Authentication
- Authorization
- Validation
- Rate limiting
- Structured logging

Use HTTPS in production.

---

# 5.14 OWASP Practices

Protect against:

- SQL Injection
- Cross-Site Scripting (XSS)
- Cross-Site Request Forgery (CSRF)
- Broken Authentication
- Broken Access Control
- Security Misconfiguration
- Sensitive Data Exposure
- File Upload Vulnerabilities

Review implementations against the OWASP Top 10.

---

# 5.15 Rate Limiting

Rate limit:

- Login
- Password reset
- Registration
- Public APIs

Return appropriate HTTP status codes when limits are exceeded.

---

# 5.16 Audit Logging

Audit logs must record:

- Login
- Logout
- Password changes
- Role changes
- Permission changes
- Workflow execution
- Administrative actions

Audit logs must be immutable.

---

# 5.17 Encryption

Encrypt sensitive data:

- In transit (TLS/HTTPS)
- At rest where appropriate

Never invent custom encryption algorithms.

Use established cryptographic libraries.

---

# 5.18 File Upload Security

Validate:

- File type
- File size
- File extension
- MIME type

Scan uploads when malware detection is available.

Never execute uploaded files.

---

# 5.19 Error Handling

Security-related errors should:

- Be logged internally
- Avoid leaking implementation details
- Return generic client-facing messages

Example:

"Invalid credentials"

instead of

"User exists but password is incorrect"

---

# 5.20 Security Review Checklist

Before merging any security-sensitive feature, verify:

✓ Authentication implemented

✓ Authorization enforced

✓ Input validated

✓ Secrets protected

✓ Sensitive data not logged

✓ Tokens handled securely

✓ Rate limiting applied

✓ Audit logging added

✓ Error responses sanitized

✓ Security tests completed

If any item is missing, the feature is not production ready.
# ============================================================================
# AIFlow Enterprise
# AI Development Rulebook
# Version: 1.0
# Section 6 — Database Design & Data Management
# ============================================================================

# 6.1 Database Philosophy

The database is the single source of truth.

It must guarantee:

- Data integrity
- Consistency
- Reliability
- Scalability
- Recoverability

Business rules belong in the application layer, while the database enforces structural integrity.

---

# 6.2 Primary Database

Database Engine:

- PostgreSQL

Cache Layer:

- Redis

ORM:

- SQLAlchemy 2.x

Migration Tool:

- Alembic

---

# 6.3 Database Design Principles

Every table must:

- Represent one business entity
- Use a primary key
- Be normalized to at least Third Normal Form (3NF)
- Minimize duplication
- Preserve referential integrity

Denormalization is allowed only after measuring performance.

---

# 6.4 Naming Conventions

Tables:

snake_case

Examples:

users

organizations

workflow_runs

agent_logs

Columns:

snake_case

Primary Key:

id

Foreign Keys:

organization_id

user_id

workflow_id

---

# 6.5 Standard Columns

Every business table should contain:

id

created_at

updated_at

created_by

updated_by

These fields improve auditing and traceability.

---

# 6.6 Soft Delete Policy

Business data should support soft deletion where appropriate.

Example:

deleted_at

deleted_by

Never permanently delete critical business data unless required by policy.

---

# 6.7 Relationships

Always define explicit relationships.

Supported:

- One-to-One
- One-to-Many
- Many-to-Many

Avoid circular relationships whenever possible.

---

# 6.8 Constraints

Use database constraints:

- PRIMARY KEY
- FOREIGN KEY
- UNIQUE
- NOT NULL
- CHECK

Never rely solely on application validation.

---

# 6.9 Indexing

Create indexes for:

- Foreign Keys
- Search columns
- Frequently filtered fields
- Frequently sorted fields

Avoid unnecessary indexes.

Measure before adding.

---

# 6.10 Transactions

Use transactions whenever multiple operations must succeed together.

If one operation fails:

Rollback the entire transaction.

Never leave partial business operations.

---

# 6.11 Migrations

Schema changes must only be made using Alembic migrations.

Never modify production schemas manually.

Every migration must:

- Be reversible
- Be tested
- Include descriptive names

---

# 6.12 Data Validation

Validation occurs in two layers:

Frontend:

- User experience

Backend:

- Security
- Business rules

Database:

- Structural integrity

---

# 6.13 Backup Strategy

Support:

- Daily backups
- Point-in-time recovery
- Disaster recovery testing
- Backup verification

Backups must be encrypted.

---

# 6.14 Performance

Optimize:

- Query execution
- Index usage
- Connection pooling
- Pagination

Avoid:

SELECT *

N+1 queries

Unbounded scans

---

# 6.15 Database Golden Rules

✓ Every table has a purpose

✓ Every relationship is documented

✓ Every migration is reversible

✓ Every query is optimized

✓ Every change preserves integrity

✓ Every backup is verified
# ============================================================================
# AIFlow Enterprise
# AI Development Rulebook
# Version: 1.0
# Section 7 — API Design Standards
# ============================================================================

# 7.1 API Philosophy

APIs are products.

They must be:

- Predictable
- Consistent
- Secure
- Versioned
- Well documented

---

# 7.2 API Style

Use REST principles.

Resources should represent business entities.

Example:

/users

/workflows

/organizations

/agents

---

# 7.3 HTTP Methods

GET

Retrieve resources

POST

Create resources

PUT

Replace resources

PATCH

Partial updates

DELETE

Remove resources

---

# 7.4 Status Codes

Use standard HTTP status codes.

200 OK

201 Created

204 No Content

400 Bad Request

401 Unauthorized

403 Forbidden

404 Not Found

409 Conflict

422 Validation Error

429 Too Many Requests

500 Internal Server Error

---

# 7.5 URL Standards

Use:

kebab-case

Example:

/workflow-runs

/user-profile

Avoid verbs.

Prefer nouns.

---

# 7.6 Request Validation

Validate:

- Required fields
- Types
- Length
- Format
- Business rules

Reject invalid requests before business logic executes.

---

# 7.7 Response Format

Successful responses:

```json
{
  "success": true,
  "data": {}
}
```

Error responses:

```json
{
  "success": false,
  "error": {
    "code": "...",
    "message": "..."
  }
}
```

Maintain one consistent response structure.

---

# 7.8 Pagination

Large collections must support:

- page
- page_size
- total
- total_pages

Never return unlimited records.

---

# 7.9 Filtering

Support filtering through query parameters.

Example:

status=active

organization_id=123

---

# 7.10 Sorting

Allow sorting using:

sort_by

order

Example:

created_at desc

---

# 7.11 Versioning

Version every public API.

Example:

/api/v1/

Breaking changes require a new version.

---

# 7.12 Authentication

Protected APIs require:

JWT authentication

Permission validation

Audit logging

---

# 7.13 Rate Limiting

Apply limits to:

Authentication

Registration

Password reset

Public APIs

AI endpoints

---

# 7.14 Documentation

Every endpoint must include:

Purpose

Authentication

Request schema

Response schema

Status codes

Example request

Example response

---

# 7.15 API Golden Rules

✓ REST compliant

✓ Versioned

✓ Secure

✓ Documented

✓ Consistent

✓ Validated

✓ Paginated

✓ Logged

✓ Production ready

Never expose internal implementation details through the API.
# ============================================================================
# AIFlow Enterprise
# AI Development Rulebook
# Version: 1.0
# Section 8 — Frontend Engineering Standards
# ============================================================================

# 8.1 Frontend Philosophy

The frontend must be:

- Fast
- Accessible
- Responsive
- Secure
- Modular
- Reusable
- Production Ready

---

# 8.2 UI Principles

Every screen should prioritize:

- Simplicity
- Consistency
- Accessibility
- Performance

Avoid unnecessary animations and clutter.

---

# 8.3 Component Architecture

Hierarchy:

Pages

↓

Layouts

↓

Features

↓

Components

↓

Shared UI

↓

Utilities

Business logic belongs in hooks/services, not components.

---

# 8.4 Component Rules

Every component should:

- Have one responsibility
- Be reusable
- Be typed
- Receive minimal props
- Avoid deep nesting

---

# 8.5 State Management

Use:

Local State

↓

Zustand

↓

TanStack Query

↓

Backend

Avoid global state unless required.

---

# 8.6 Forms

Use:

React Hook Form

+

Zod

Validate:

- Required fields
- Length
- Format
- Business rules

---

# 8.7 Routing

Routes must:

- Be protected when required
- Support lazy loading
- Handle 404 pages
- Handle permission checks

---

# 8.8 Styling

Use:

Tailwind CSS

Never use inline styles except for dynamic calculations.

---

# 8.9 Performance

Optimize:

- Lazy loading
- Code splitting
- Memoization
- Image optimization

Avoid unnecessary re-renders.

---

# 8.10 Accessibility

Support:

- Keyboard navigation
- Screen readers
- Focus management
- ARIA labels
- Color contrast

Accessibility is mandatory.

---

# 8.11 Frontend Golden Rules

✓ Responsive

✓ Accessible

✓ Typed

✓ Reusable

✓ Tested

✓ Production Ready
# ============================================================================
# AIFlow Enterprise
# AI Development Rulebook
# Version: 1.0
# Section 9 — Backend Engineering Standards
# ============================================================================

# 9.1 Backend Philosophy

The backend is responsible for:

- Business logic
- Security
- Validation
- Data integrity
- Scalability

---

# 9.2 Architecture

FastAPI

↓

Routers

↓

Services

↓

Repositories

↓

Database

Never bypass layers.

---

# 9.3 Routers

Routers should:

- Parse requests
- Validate inputs
- Return responses

Never contain business logic.

---

# 9.4 Services

Services contain:

- Business rules
- Workflow orchestration
- Transactions

Services never return ORM models directly.

---

# 9.5 Repositories

Repositories:

- Query the database
- Return domain objects
- Hide SQL implementation

---

# 9.6 Dependency Injection

Use FastAPI dependency injection.

Avoid global objects.

---

# 9.7 Configuration

Load all configuration from environment variables.

Never hardcode credentials.

---

# 9.8 Background Jobs

Use Celery for:

- Email
- Notifications
- Reports
- AI processing

Never block API requests with long-running tasks.

---

# 9.9 Logging

Log:

- Requests
- Errors
- AI operations
- Security events
- Database failures

---

# 9.10 Exception Handling

Use centralized exception handlers.

Return standardized error responses.

Never expose stack traces.

---

# 9.11 Backend Golden Rules

✓ Secure

✓ Layered

✓ Tested

✓ Modular

✓ Scalable

✓ Production Ready
# ============================================================================
# AIFlow Enterprise
# AI Development Rulebook
# Version: 1.0
# Section 11 — Logging & Monitoring Standards
# ============================================================================

# 11.1 Monitoring Philosophy

Every production system must be observable.

If a problem cannot be detected,
it cannot be solved efficiently.

Monitoring is mandatory.

---

# 11.2 Logging Levels

Use:

DEBUG

INFO

WARNING

ERROR

CRITICAL

Choose the appropriate level.

Avoid excessive logging.

---

# 11.3 Structured Logging

Every log should include:

- Timestamp
- Request ID
- User ID (if available)
- Organization ID
- Module
- Action
- Status
- Duration

Prefer structured JSON logs.

---

# 11.4 Request Tracing

Each request receives a unique Request ID.

The same Request ID must appear in:

- API logs
- Database logs
- AI logs
- Worker logs

---

# 11.5 Audit Logging

Audit events include:

- Login
- Logout
- Role changes
- Permission updates
- Workflow execution
- AI execution
- Configuration changes

Audit logs are immutable.

---

# 11.6 Monitoring

Monitor:

- CPU
- Memory
- Disk
- Database
- Redis
- Queue
- API latency
- Error rate
- AI latency

---

# 11.7 Alerts

Alert when:

- Error rate increases
- Database unavailable
- Redis unavailable
- Queue backlog
- AI provider failure
- High latency

---

# 11.8 Metrics

Track:

- Active users
- API requests
- Failed requests
- Login failures
- Workflow executions
- AI requests
- Queue length

---

# 11.9 Sensitive Data

Never log:

- Passwords
- Secrets
- API Keys
- Tokens
- Personal confidential data

---

# 11.10 Logging Golden Rules

✓ Structured

✓ Searchable

✓ Consistent

✓ Secure

✓ Production Ready
# ============================================================================
# AIFlow Enterprise
# AI Development Rulebook
# Version: 1.0
# Section 12 — Testing Standards
# ============================================================================

# 12.1 Testing Philosophy

Every feature must be testable.

Testing is part of development,
not an optional activity.

---

# 12.2 Testing Pyramid

Use:

Unit Tests

↓

Integration Tests

↓

End-to-End Tests

---

# 12.3 Unit Tests

Test:

- Business logic
- Utility functions
- Validation
- Domain services

Unit tests should be fast and isolated.

---

# 12.4 Integration Tests

Verify:

- API endpoints
- Database interaction
- Authentication
- Authorization
- Redis
- Background jobs

---

# 12.5 End-to-End Tests

Validate complete user journeys.

Examples:

- Login
- Registration
- Workflow execution
- Dashboard
- AI interaction

---

# 12.6 Coverage

Target:

Backend ≥ 90%

Frontend ≥ 80%

Critical security code ≥ 100%

Coverage alone does not guarantee quality.

---

# 12.7 Test Naming

Tests should describe behavior.

Example:

test_login_rejects_invalid_password

Avoid vague names.

---

# 12.8 Mocking

Mock:

- External APIs
- AI Providers
- Email
- Payment
- File Storage

Avoid mocking core business logic.

---

# 12.9 Regression Testing

Every bug fix should include a test
that prevents the same issue from returning.

---

# 12.10 Continuous Testing

Tests must run:

- Before merge
- During CI
- Before deployment

Production deployment requires passing tests.

---

# 12.11 Testing Golden Rules

✓ Automated

✓ Repeatable

✓ Reliable

✓ Fast

✓ Independent

✓ Production Ready
# ============================================================================
# AIFlow Enterprise
# AI Development Rulebook
# Version: 1.0
# Section 13 — Performance & Optimization Standards
# ============================================================================

# 13.1 Performance Philosophy

Performance is a feature.

Every implementation should be designed
with efficiency in mind.

Measure before optimizing.

---

# 13.2 Backend Performance

Optimize:

- Database queries
- API latency
- Connection pooling
- Background jobs

Avoid unnecessary computation.

---

# 13.3 Database Performance

Prevent:

- N+1 queries
- Full table scans
- Missing indexes
- Long transactions

Use EXPLAIN for slow queries.

---

# 13.4 Frontend Performance

Optimize:

- Lazy loading
- Code splitting
- Memoization
- Virtualization
- Image optimization

Avoid unnecessary re-renders.

---

# 13.5 Caching

Use Redis for:

- Frequently requested data
- Sessions
- AI responses (when appropriate)
- Configuration

Invalidate cache correctly.

---

# 13.6 API Performance

Support:

- Pagination
- Filtering
- Compression
- Efficient serialization

Never return excessive data.

---

# 13.7 Background Processing

Move long-running operations to workers.

Examples:

- AI execution
- Email
- Report generation
- File processing

---

# 13.8 Scalability

Design for:

- Horizontal scaling
- Stateless APIs
- Multiple workers
- Distributed caching

Avoid single points of failure.

---

# 13.9 Resource Usage

Monitor:

- CPU
- Memory
- Network
- Disk

Investigate abnormal resource consumption.

---

# 13.10 Performance Golden Rules

✓ Fast

✓ Efficient

✓ Measured

✓ Scalable

✓ Optimized

✓ Production Ready
# ============================================================================
# AIFlow Enterprise
# AI Development Rulebook
# Version: 1.0
# Section 14 — Error Handling & Resilience
# ============================================================================

# 14.1 Error Handling Philosophy

Errors are expected.

The system must:

- Detect failures
- Recover gracefully
- Log useful information
- Protect user data
- Continue operating whenever possible

Never allow an unhandled exception to crash the application.

---

# 14.2 Error Categories

Errors should be classified as:

- Validation Errors
- Authentication Errors
- Authorization Errors
- Business Logic Errors
- Infrastructure Errors
- External Service Errors
- Database Errors
- AI Provider Errors
- Unexpected Internal Errors

---

# 14.3 Standard Error Response

Every API error should follow one format.

Example:

{
  "success": false,
  "error": {
    "code": "AUTH_001",
    "message": "Invalid credentials."
  }
}

Never expose stack traces.

---

# 14.4 Exception Handling

Use centralized exception handlers.

Avoid scattered try/catch blocks.

Handle exceptions close to their source when recovery is possible.

---

# 14.5 Retry Policy

Retry only transient failures.

Examples:

- Network timeout
- AI provider timeout
- Temporary database connection issue

Never retry:

- Validation failures
- Authentication failures
- Authorization failures

---

# 14.6 Circuit Breaker

External services should support:

- Timeout
- Retry
- Circuit breaker
- Graceful degradation

Prevent cascading failures.

---

# 14.7 Graceful Degradation

If a non-critical service fails:

Continue serving essential functionality.

Example:

AI unavailable

↓

Workflow editor still works

---

# 14.8 User Experience

Users should receive:

- Friendly messages
- Actionable guidance
- Stable interface

Avoid technical jargon.

---

# 14.9 Error Logging

Log:

- Request ID
- User ID
- Endpoint
- Error Code
- Stack Trace (internal only)

Never log sensitive information.

---

# 14.10 Resilience Golden Rules

✓ Predictable

✓ Recoverable

✓ Logged

✓ Secure

✓ User Friendly

✓ Production Ready
# ============================================================================
# AIFlow Enterprise
# AI Development Rulebook
# Version: 1.0
# Section 15 — DevOps & CI/CD Standards
# ============================================================================

# 15.1 DevOps Philosophy

Deployment should be:

- Automated
- Repeatable
- Reliable
- Secure

No manual production deployments.

---

# 15.2 Source Control

Use Git.

Main branches:

main

develop

feature/*

hotfix/*

release/*

---

# 15.3 CI Pipeline

Every push should execute:

- Install dependencies
- Lint
- Format check
- Type checking
- Unit tests
- Integration tests
- Security scan
- Build verification

---

# 15.4 CD Pipeline

Deployment stages:

Development

↓

Testing

↓

Staging

↓

Production

Every deployment should be reversible.

---

# 15.5 Docker

Every service must provide:

Dockerfile

Use multi-stage builds.

Keep images minimal.

---

# 15.6 Environment Management

Separate:

- Development
- Testing
- Staging
- Production

Never mix environment configuration.

---

# 15.7 Secrets

Secrets must come from:

Environment variables

Secret managers (future)

Never store secrets in Git.

---

# 15.8 Infrastructure

Infrastructure should be:

Version controlled

Documented

Repeatable

Automated

---

# 15.9 Health Checks

Every service must expose:

- Liveness endpoint

- Readiness endpoint

Containers should restart automatically when unhealthy.

---

# 15.10 DevOps Golden Rules

✓ Automated

✓ Secure

✓ Repeatable

✓ Observable

✓ Recoverable

✓ Production Ready
# ============================================================================
# AIFlow Enterprise
# AI Development Rulebook
# Version: 1.0
# Section 16 — Documentation Standards
# ============================================================================

# 16.1 Documentation Philosophy

Documentation is part of the product.

Code without documentation is incomplete.

---

# 16.2 Documentation Types

Maintain:

- README
- API Documentation
- Architecture Guide
- Deployment Guide
- Database Guide
- Developer Guide
- User Guide
- Security Guide

---

# 16.3 README

The project README must include:

- Project overview
- Features
- Technology stack
- Installation
- Environment setup
- Running locally
- Docker setup
- Contributing
- License

---

# 16.4 API Documentation

Every endpoint must document:

- Purpose
- Authentication
- Request
- Response
- Error codes
- Example requests
- Example responses

---

# 16.5 Code Documentation

Document:

- Public classes
- Public methods
- Complex algorithms
- Business rules

Avoid documenting obvious code.

---

# 16.6 Architecture Documents

Maintain:

- System architecture
- Database diagram
- Sequence diagrams
- Deployment diagram

Keep diagrams synchronized with implementation.

---

# 16.7 Changelog

Record:

- New features
- Bug fixes
- Breaking changes
- Performance improvements
- Security updates

Use semantic versioning.

---

# 16.8 Documentation Maintenance

Documentation must be updated whenever:

- APIs change
- Features change
- Database changes
- Deployment changes
- Security changes

Outdated documentation is considered a defect.

---

# 16.9 AI Documentation Rules

When AI generates code, it should also update:

- Relevant documentation
- README (if needed)
- API docs
- Architecture docs

Documentation should evolve with the codebase.

---

# 16.10 Documentation Golden Rules

✓ Accurate

✓ Current

✓ Clear

✓ Complete

✓ Searchable

✓ Production Ready
# ============================================================================
# AIFlow Enterprise
# AI Development Rulebook
# Version: 1.0
# Section 17 — Git Workflow & Versioning
# ============================================================================

# 17.1 Git Philosophy

Git history should clearly explain the evolution of the project.

Every commit should represent one logical change.

Never commit broken code.

---

# 17.2 Branch Strategy

Use:

main

develop

feature/<feature-name>

bugfix/<bug-name>

hotfix/<issue-name>

release/<version>

Never develop directly on main.

---

# 17.3 Commit Message Convention

Follow Conventional Commits.

Examples:

feat(auth): add JWT refresh token rotation

fix(api): validate expired access token

refactor(database): optimize repository layer

docs(readme): update installation guide

test(auth): add login integration tests

---

# 17.4 Pull Requests

Every Pull Request should include:

- Summary
- Scope
- Screenshots (UI changes)
- Testing evidence
- Related issue
- Deployment impact

---

# 17.5 Code Review Checklist

Review:

- Architecture
- Readability
- Security
- Performance
- Tests
- Documentation
- Backward compatibility

---

# 17.6 Versioning

Use Semantic Versioning.

MAJOR

Breaking changes

MINOR

New features

PATCH

Bug fixes

---

# 17.7 Release Rules

Every release requires:

✓ Passing CI

✓ Passing tests

✓ Updated documentation

✓ Changelog

✓ Tagged version

---

# 17.8 Git Golden Rules

✓ Small commits

✓ Clear history

✓ One feature per branch

✓ No broken code

✓ Production Ready
# ============================================================================
# AIFlow Enterprise
# AI Development Rulebook
# Version: 1.0
# Section 18 — AI Coding Rules (Continue & Ollama)
# ============================================================================

# 18.1 AI Philosophy

AI assists developers.

AI does not replace architecture, code review, or engineering judgment.

Every AI-generated change must be reviewed before merging.

---

# 18.2 AI Responsibilities

Continue + Ollama should:

- Generate code
- Edit files
- Refactor modules
- Generate tests
- Generate documentation

ChatGPT should assist with:

- Architecture
- Planning
- Reviews
- Security
- Performance
- Debugging
- Complex design decisions

---

# 18.3 Implementation Rules

AI must:

- Change only requested files
- Preserve existing architecture
- Avoid unrelated modifications
- Keep implementations focused
- Respect project conventions

---

# 18.4 Prompt Quality

Every implementation prompt should include:

- Goal
- Scope
- Constraints
- Expected output
- Files allowed to change

Prefer precise prompts over broad requests.

---

# 18.5 Code Generation Standards

Generated code must:

- Compile successfully
- Follow formatting rules
- Pass linting
- Be type-safe
- Handle errors
- Include logging where appropriate

---

# 18.6 AI Limitations

Never ask AI to:

- Rewrite the entire project
- Modify unrelated modules
- Invent missing requirements
- Expose secrets
- Disable security

Large changes should be split into smaller tasks.

---

# 18.7 AI Review Workflow

Architecture

↓

Implementation

↓

Compilation

↓

Testing

↓

Code Review

↓

Optimization

↓

Git Commit

---

# 18.8 AI Golden Rules

✓ Focused prompts

✓ Small changes

✓ Production quality

✓ Human reviewed

✓ Architecture preserved
# ============================================================================
# AIFlow Enterprise
# AI Development Rulebook
# Version: 1.0
# Section 19 — Production Readiness Checklist
# ============================================================================

# 19.1 Definition of Done

A feature is complete only when:

✓ Implemented

✓ Reviewed

✓ Tested

✓ Documented

✓ Secure

✓ Performance verified

✓ Production deployable

---

# 19.2 Backend Checklist

✓ API documented

✓ Validation complete

✓ Error handling implemented

✓ Logging added

✓ Authentication enforced

✓ Authorization verified

✓ Tests passing

---

# 19.3 Frontend Checklist

✓ Responsive

✓ Accessible

✓ Type-safe

✓ Loading states

✓ Error states

✓ Empty states

✓ Tested

---

# 19.4 Database Checklist

✓ Migration created

✓ Rollback verified

✓ Indexes reviewed

✓ Constraints added

✓ Performance checked

---

# 19.5 Security Checklist

✓ Secrets protected

✓ Tokens secure

✓ Inputs validated

✓ Permissions enforced

✓ Audit logs added

✓ OWASP review completed

---

# 19.6 Infrastructure Checklist

✓ Docker verified

✓ Environment variables configured

✓ Health checks working

✓ Monitoring enabled

✓ Logging configured

---

# 19.7 Deployment Checklist

✓ CI passed

✓ CD verified

✓ Rollback available

✓ Release notes updated

✓ Version tagged

---

# 19.8 Production Golden Rules

Never deploy:

✗ Untested code

✗ Unreviewed code

✗ Broken builds

✗ Undocumented features

✗ Failed security checks
# ============================================================================
# AIFlow Enterprise
# AI Development Rulebook
# Version: 1.0
# Section 20 — Final Validation & Golden Rules
# ============================================================================

# 20.1 Project Mission

AIFlow Enterprise must demonstrate enterprise-level software engineering through secure, scalable, maintainable, and production-ready implementation.

---

# 20.2 Engineering Principles

Every contribution should improve:

- Readability
- Reliability
- Maintainability
- Performance
- Security
- Developer Experience

---

# 20.3 Before Every Commit

Confirm:

✓ Code builds

✓ Lint passes

✓ Tests pass

✓ Documentation updated

✓ Security reviewed

✓ No unrelated files modified

---

# 20.4 Before Every Merge

Confirm:

✓ Code reviewed

✓ Architecture preserved

✓ Performance acceptable

✓ Backward compatibility maintained

✓ Release checklist complete

---

# 20.5 Before Every Deployment

Confirm:

✓ Environment configured

✓ Secrets verified

✓ Database migrations ready

✓ Monitoring active

✓ Rollback plan available

---

# 20.6 AI Validation

Every AI-generated implementation must:

- Follow this rulebook
- Respect architecture
- Produce maintainable code
- Avoid unnecessary complexity
- Include appropriate tests and documentation

---

# 20.7 Final Golden Rules

Every implementation must answer YES:

✓ Is it secure?

✓ Is it scalable?

✓ Is it maintainable?

✓ Is it testable?

✓ Is it documented?

✓ Is it production ready?

If any answer is NO, the implementation is incomplete.

---

# 20.8 Project Completion Criteria

AIFlow Enterprise is complete only when:

✓ All roadmap phases are finished

✓ All critical tests pass

✓ Documentation is complete

✓ Production deployment succeeds

✓ Security review is complete

✓ Performance targets are met

✓ Monitoring and logging are operational

The project is then considered production-ready.