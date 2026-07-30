"""
Enterprise Audit Logger for AIFlow Enterprise.

Tracks security events, logins, role changes, AI requests, workflow executions, and provides
export capabilities in CSV and JSON formats.
"""

import csv
import datetime
import io
import json
import logging
from typing import Any, Dict, List, Optional

logger = logging.getLogger(__name__)

_audit_log_store: List[Dict[str, Any]] = []


def record_audit_event(
    event_type: str,
    actor_id: str,
    action: str,
    status: str = "success",
    ip_address: str = "127.0.0.1",
    details: Optional[Dict[str, Any]] = None,
) -> Dict[str, Any]:
    """Record structured security audit log entry."""
    entry = {
        "id": f"audit_{len(_audit_log_store) + 1}",
        "timestamp": datetime.datetime.now(datetime.timezone.utc).isoformat(),
        "event_type": event_type,
        "actor_id": actor_id,
        "action": action,
        "status": status,
        "ip_address": ip_address,
        "details": details or {},
    }
    _audit_log_store.append(entry)
    logger.info("Audit Event: %s", json.dumps(entry))
    return entry


def get_audit_logs(
    actor_id: Optional[str] = None,
    event_type: Optional[str] = None,
    limit: int = 50,
) -> List[Dict[str, Any]]:
    """Query audit log entries with filtering."""
    results = _audit_log_store
    if actor_id:
        results = [r for r in results if r["actor_id"] == actor_id]
    if event_type:
        results = [r for r in results if r["event_type"] == event_type]
    return results[-limit:]


def export_audit_logs_json() -> str:
    """Export all audit logs as formatted JSON string."""
    return json.dumps(_audit_log_store, indent=2)


def export_audit_logs_csv() -> str:
    """Export all audit logs as CSV string."""
    output = io.StringIO()
    writer = csv.writer(output)
    writer.writerow(["id", "timestamp", "event_type", "actor_id", "action", "status", "ip_address", "details"])

    for r in _audit_log_store:
        writer.writerow([
            r["id"],
            r["timestamp"],
            r["event_type"],
            r["actor_id"],
            r["action"],
            r["status"],
            r["ip_address"],
            json.dumps(r["details"]),
        ])

    return output.getvalue()
