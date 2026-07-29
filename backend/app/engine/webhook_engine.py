from datetime import datetime
from typing import Any, Dict


class WebhookEngine:
    def process_incoming_webhook(self, workflow_key: str, headers: dict, body: dict) -> Dict[str, Any]:
        return {
            "workflow_key": workflow_key,
            "received_at": datetime.utcnow().isoformat() + "Z",
            "headers": headers,
            "body": body,
            "trigger_type": "webhook",
        }

webhook_engine = WebhookEngine()
