import json
import logging
from datetime import datetime
from pathlib import Path

# Setup structured JSON audit logging
audit_log_path = Path(__file__).parent.parent.parent / "logs" / "audit.jsonl"
audit_log_path.parent.mkdir(exist_ok=True)

class AuditLogger:
    def __init__(self):
        self.logger = logging.getLogger("audit_logger")
        self.logger.setLevel(logging.INFO)
        # Prevent propagation to avoid duplicating in console
        self.logger.propagate = False
        
        handler = logging.FileHandler(audit_log_path)
        handler.setFormatter(logging.Formatter("%(message)s"))
        self.logger.addHandler(handler)

    def log_event(self, action: str, user_id: str, resource: str, details: dict = None, ip_address: str = "unknown"):
        event = {
            "timestamp": datetime.utcnow().isoformat() + "Z",
            "action": action,
            "user_id": user_id,
            "resource": resource,
            "ip_address": ip_address,
            "details": details or {}
        }
        self.logger.info(json.dumps(event))

audit_logger = AuditLogger()
