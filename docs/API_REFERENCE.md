# API Reference Guide

AIFlow Enterprise provides a RESTful JSON API.

## Base URL
All API requests are prefixed with `/api/v1`.
Local development: `http://localhost:8000/api/v1`

## 1. Authentication Guide

Authentication is implemented via OAuth2 Bearer Tokens (JWT).
To authenticate, acquire a token and pass it in the HTTP headers:
```http
Authorization: Bearer <your_jwt_token>
```

### Obtain a Token
**Endpoint**: `POST /api/v1/auth/login`
**Payload**:
```json
{
  "email": "admin@enterprise.io",
  "password": "securepassword"
}
```

## 2. Core Endpoints

### Workflows
- **`POST /workflows`**: Create a new workflow definition.
- **`GET /workflows/{id}`**: Retrieve a specific workflow.
- **`POST /workflows/{id}/execute`**: Trigger an async execution.

### Agents
- **`POST /agents`**: Register an AI Agent.
- **`GET /agents`**: List available agents.

## 3. SDK Usage Examples

**Python SDK Example (Fictional)**:
```python
import aiflow_sdk

client = aiflow_sdk.Client(api_key="your_api_key")

workflow = client.workflows.execute(
    workflow_id="wf-12345",
    inputs={"prompt": "Analyze market trends"}
)

print(f"Task ID: {workflow.task_id}")
```

## 4. Rate Limits
The API is protected by strict rate limiting.
- **Global Limit**: 120 requests per 60 seconds per IP.
- Responses hitting limits will receive a `429 Too Many Requests` status code with a `Retry-After` header.

## 5. Error Code Catalog

| HTTP Code | Error | Description |
|-----------|-------|-------------|
| 400 | `Bad Request` | Validation failed (e.g. invalid JSON payload). |
| 401 | `Unauthorized` | Missing or expired JWT token. |
| 403 | `Forbidden` | User lacks required RBAC permissions. |
| 404 | `Not Found` | Resource does not exist. |
| 422 | `Unprocessable`| Pydantic schema validation failure. |
| 429 | `Rate Limited` | Exceeded API quota. |
| 500 | `Server Error` | Internal infrastructure error. |
