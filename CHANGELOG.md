# Changelog

All notable changes to **AIFlow Enterprise** will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [1.0.0] - 2026-07-30

### Added
- **Multi-Provider AI Gateway**: Provider abstraction supporting OpenAI, Anthropic Claude, Google Gemini, Azure OpenAI, Ollama (Llama 3.1), and OpenRouter with automatic fallbacks and retries.
- **Enterprise RAG & Vector Database Engine**: Native integration with Pinecone, Qdrant, Weaviate, Milvus, Chroma, and FAISS. Hybrid vector similarity search with document ingestion for PDF, DOCX, Excel, CSV, Markdown, and HTML.
- **Multi-Agent Swarm Framework**: 8 specialized AI agents (Planner, Research, Data Analyst, Code Gen, Reviewer, Execution, Memory, Coordinator) with inter-agent message buses and execution graphs.
- **Model Context Protocol (MCP)**: Dynamic tool discovery and remote MCP server execution.
- **Visual Workflow Engine**: Asynchronous DAG compilation runtime with WebSockets status broadcasting, conditional branching, loops, and retry policies.
- **30+ Enterprise Connectors**: Pre-built integration connectors for Google Workspace, Microsoft 365, Slack, GitHub, Jira, Salesforce, HubSpot, Stripe, AWS, Azure, GCP, Kubernetes, Docker, Webhooks, REST, GraphQL, Kafka, and RabbitMQ.
- **Commercial SaaS & Billing Platform**: 5-tier subscription plans (Free, Starter, Pro, Business, Enterprise) with Stripe, Razorpay, and PayPal gateway integrations, usage-based quota metering, and automated invoices.
- **DevSecOps Security & Compliance**: Enterprise RBAC (8 roles), structured audit logging with CSV/JSON exports, GDPR/CCPA Right to be Forgotten, and data portability exports.
- **Production Observability**: Full Prometheus metrics, OpenTelemetry tracing, Alertmanager rules, and 6 Grafana dashboards.
- **Production Kubernetes & Helm Stack**: Multi-stage Python 3.13 Gunicorn backend container, React 19 Nginx Alpine frontend container, Helm charts, and GitHub Actions CD pipelines.
