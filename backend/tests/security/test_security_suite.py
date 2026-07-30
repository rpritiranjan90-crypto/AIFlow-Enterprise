"""
Unit and integration security tests for RBAC, Audit Logging, and GDPR Compliance.
"""

import pytest
from app.core.audit_logger import export_audit_logs_csv, export_audit_logs_json, get_audit_logs, record_audit_event
from app.core.compliance import execute_right_to_be_forgotten, export_user_data, record_user_consent
from app.core.rbac import Permission, Role, has_permission
from app.core.security import create_access_token, decode_token, revoke_token


def test_jwt_token_lifecycle():
    token = create_access_token("user_123")
    assert token is not None

    payload = decode_token(token)
    assert payload is not None
    assert payload["sub"] == "user_123"

    jti = payload.get("jti")
    assert jti is not None

    revoke_token(jti)
    assert decode_token(token) is None


def test_rbac_permission_matrix():
    assert has_permission("super_admin", Permission.SYSTEM_ADMIN) is True
    assert has_permission("org_admin", Permission.ORG_MANAGE) is True
    assert has_permission("workspace_admin", Permission.WORKFLOW_DELETE) is True
    assert has_permission("viewer", Permission.WORKFLOW_READ) is True
    assert has_permission("viewer", Permission.SYSTEM_ADMIN) is False


def test_audit_logger_records_and_exports():
    entry = record_audit_event(
        event_type="TEST_EVENT",
        actor_id="user_admin",
        action="UPDATE_SETTING",
        details={"setting": "max_users"},
    )
    assert entry["id"] is not None

    logs = get_audit_logs(actor_id="user_admin")
    assert len(logs) > 0

    json_export = export_audit_logs_json()
    assert "TEST_EVENT" in json_export

    csv_export = export_audit_logs_csv()
    assert "user_admin" in csv_export


def test_gdpr_compliance_suite():
    user_id = "user_gdpr_test"

    record_user_consent(user_id, "analytics", True)
    record_user_consent(user_id, "marketing", False)

    exported_data = export_user_data(user_id)
    assert exported_data["user_id"] == user_id
    assert len(exported_data["consents"]) == 2

    purge_result = execute_right_to_be_forgotten(user_id)
    assert purge_result["status"] == "purged"

    data_after_purge = export_user_data(user_id)
    assert len(data_after_purge["consents"]) == 0
