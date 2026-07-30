"""
Enterprise Role-Based Access Control (RBAC) Engine for AIFlow Enterprise.

Defines role hierarchies, permission matrices, role inheritance, and fine-grained authorization checkers.
"""

from enum import Enum
from typing import Dict, List, Set

from fastapi import HTTPException, Security, status
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer

security_scheme = HTTPBearer()


class Role(str, Enum):
    SUPER_ADMIN = "super_admin"
    ORG_ADMIN = "org_admin"
    WORKSPACE_ADMIN = "workspace_admin"
    MANAGER = "manager"
    ANALYST = "analyst"
    DEVELOPER = "developer"
    OPERATOR = "operator"
    VIEWER = "viewer"


class Permission(str, Enum):
    # System & Admin
    SYSTEM_ADMIN = "system:admin"
    ORG_MANAGE = "org:manage"
    WORKSPACE_MANAGE = "workspace:manage"
    ROLE_MANAGE = "role:manage"
    AUDIT_READ = "audit:read"
    AUDIT_EXPORT = "audit:export"

    # Business & SaaS
    BILLING_MANAGE = "billing:manage"
    USER_INVITE = "user:invite"
    USER_MANAGE = "user:manage"

    # Workflows & AI
    WORKFLOW_READ = "workflow:read"
    WORKFLOW_CREATE = "workflow:create"
    WORKFLOW_EXECUTE = "workflow:execute"
    WORKFLOW_DELETE = "workflow:delete"
    AI_INFERENCE = "ai:inference"

    # Compliance & Data
    DATA_EXPORT = "data:export"
    DATA_DELETE = "data:delete"


# Permission Inheritance Matrix
ROLE_PERMISSIONS: Dict[Role, Set[Permission]] = {
    Role.SUPER_ADMIN: set(Permission),
    Role.ORG_ADMIN: {
        Permission.ORG_MANAGE,
        Permission.WORKSPACE_MANAGE,
        Permission.ROLE_MANAGE,
        Permission.AUDIT_READ,
        Permission.AUDIT_EXPORT,
        Permission.BILLING_MANAGE,
        Permission.USER_INVITE,
        Permission.USER_MANAGE,
        Permission.WORKFLOW_READ,
        Permission.WORKFLOW_CREATE,
        Permission.WORKFLOW_EXECUTE,
        Permission.WORKFLOW_DELETE,
        Permission.AI_INFERENCE,
        Permission.DATA_EXPORT,
        Permission.DATA_DELETE,
    },
    Role.WORKSPACE_ADMIN: {
        Permission.WORKSPACE_MANAGE,
        Permission.USER_INVITE,
        Permission.WORKFLOW_READ,
        Permission.WORKFLOW_CREATE,
        Permission.WORKFLOW_EXECUTE,
        Permission.WORKFLOW_DELETE,
        Permission.AI_INFERENCE,
        Permission.DATA_EXPORT,
    },
    Role.MANAGER: {
        Permission.USER_INVITE,
        Permission.WORKFLOW_READ,
        Permission.WORKFLOW_CREATE,
        Permission.WORKFLOW_EXECUTE,
        Permission.AI_INFERENCE,
        Permission.DATA_EXPORT,
    },
    Role.ANALYST: {
        Permission.WORKFLOW_READ,
        Permission.WORKFLOW_EXECUTE,
        Permission.AI_INFERENCE,
        Permission.DATA_EXPORT,
    },
    Role.DEVELOPER: {
        Permission.WORKFLOW_READ,
        Permission.WORKFLOW_CREATE,
        Permission.WORKFLOW_EXECUTE,
        Permission.AI_INFERENCE,
    },
    Role.OPERATOR: {
        Permission.WORKFLOW_READ,
        Permission.WORKFLOW_EXECUTE,
    },
    Role.VIEWER: {
        Permission.WORKFLOW_READ,
    },
}


def has_permission(user_role: str, required_permission: Permission) -> bool:
    """Check if given role string possesses required permission."""
    try:
        role_enum = Role(user_role)
        allowed_permissions = ROLE_PERMISSIONS.get(role_enum, set())
        return required_permission in allowed_permissions
    except ValueError:
        return False


def require_permission(required_permission: Permission):
    """FastAPI Dependency for fine-grained permission enforcement."""
    def dependency(credentials: HTTPAuthorizationCredentials = Security(security_scheme)) -> str:
        from app.core.security import decode_token

        payload = decode_token(credentials.credentials)
        if not payload:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid or expired authentication credentials.",
            )

        user_role = payload.get("role", "viewer")
        if not has_permission(user_role, required_permission):
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail=f"Permission denied. Required: {required_permission.value}",
            )
        return payload.get("sub", "")

    return dependency
