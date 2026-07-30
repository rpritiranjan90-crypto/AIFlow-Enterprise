# Enterprise Workflow Execution Engine Architecture

## Overview
The **AIFlow Enterprise Workflow Engine** is a high-throughput, DAG-based workflow execution runtime supporting asynchronous step execution, retries, dead-letter queuing, and real-time state broadcasting via WebSockets.

---

## Key Capabilities
- **DAG Compilation**: Compiles complex visual node graphs into topological execution sequences.
- **Node Runners**:
  - `TriggerNodeRunner`: Webhooks, schedules, manual events.
  - `HTTPNodeRunner`: REST APIs, GraphQL endpoints.
  - `LogicNodeRunner`: Conditions, routers, loops, parallel branches, delays.
  - `CommunicationNodeRunner`: Slack, Email, SMS, Discord.
  - `AIRunnerAdapter`: Autonomous AI Agents & RAG inference.
  - `CodeNodeRunner`: Python / JavaScript snippet execution.
