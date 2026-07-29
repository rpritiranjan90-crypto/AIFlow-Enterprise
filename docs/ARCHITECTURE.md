# Architecture Documentation

AIFlow Enterprise is an AI-Powered Business Automation Platform designed for scalability, security, and high performance.

## 1. High-Level Architecture Overview

The system follows a microservices-based decoupled architecture:
- **Frontend (SPA)**: React + Vite, communicating with the backend over REST APIs.
- **Backend (API Engine)**: FastAPI application providing stateless, asynchronous business logic, authorization, and workflow orchestration.
- **Background Workers**: Celery workers responsible for executing long-running AI tasks, polling external LLMs, and performing intensive asynchronous operations.
- **State & Persistence**:
  - **PostgreSQL**: Primary relational datastore (Multi-tenant schema, ACLs, Workflow metadata).
  - **Redis**: In-memory cache, rate-limiting store, and Celery broker.
- **Telemetry & Monitoring**: OpenTelemetry and Prometheus emitting structured JSON logs, metrics, and distributed traces.

## 2. Component Diagram

```mermaid
flowchart TD
    User([End User]) --> |HTTPS| Ingress[Kubernetes Nginx Ingress]
    Ingress --> |"/"| FE[React Frontend SPA]
    Ingress --> |"/api"| BE[FastAPI Backend Engine]
    
    BE --> |Async queries| PG[(PostgreSQL)]
    BE --> |Cache / Broker| Redis[(Redis)]
    BE --> |Auth| JWT[JWT Authentication]
    
    Redis <--> |Task Queue| Celery[Celery Workers]
    Celery --> |LLM Prompts| LLM[External AI Providers]
    Celery --> |State Updates| PG
```

## 3. Deployment Architecture

The platform runs atop Kubernetes, orchestrated by `Deployment`, `Service`, and `Ingress` resources.

```mermaid
flowchart LR
    subgraph Kubernetes Cluster
        Ingress(Ingress Controller)
        
        subgraph Services
            svc_fe(Frontend Service)
            svc_be(Backend Service)
            svc_pg(Database Service)
            svc_rd(Redis Service)
        end
        
        subgraph Pods
            pod_fe(Frontend Pods)
            pod_be(Backend Pods - HPA)
            pod_w(Worker Pods - HPA)
            pod_pg[(PostgreSQL Pod)]
            pod_rd[(Redis Pod)]
        end
        
        Ingress --> svc_fe
        Ingress --> svc_be
        
        svc_fe --> pod_fe
        svc_be --> pod_be
        
        pod_be --> svc_pg
        pod_be --> svc_rd
        
        pod_w --> svc_pg
        pod_w --> svc_rd
        
        svc_pg --> pod_pg
        svc_rd --> pod_rd
    end
```

## 4. Data Flow: AI Workflow Execution

```mermaid
sequenceDiagram
    participant User
    participant API as FastAPI Backend
    participant Redis
    participant Worker as Celery Worker
    participant LLM as External AI Provider
    
    User->>API: POST /api/v1/workflows/execute {payload}
    API->>API: Validate Request & Rate Limit
    API->>Redis: Enqueue Task
    API-->>User: Return 202 Accepted {task_id}
    
    Redis-->>Worker: Dequeue Task
    Worker->>LLM: Send Prompt / Inference Request
    LLM-->>Worker: Return LLM Response
    Worker->>Redis: Store Task Result
    
    User->>API: GET /api/v1/workflows/status/{task_id}
    API->>Redis: Fetch Task Status
    API-->>User: Return 200 OK {result}
```

## 5. Integration Points
- **External AI Providers**: Integrates via unified `BaseAIProvider` class to support OpenAI, Anthropic, etc.
- **Monitoring Stack**: Exposes `/metrics` endpoint for Prometheus and emits OpenTelemetry OTLP traces to collectors.
