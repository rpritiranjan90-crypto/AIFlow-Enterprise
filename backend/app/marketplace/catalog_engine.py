from typing import Any, Dict, List


class CatalogEngine:
    def get_public_packages(self) -> List[Dict[str, Any]]:
        return [
            {
                "id": "pkg_slack_notify",
                "name": "Advanced Slack Notification Pack",
                "publisher": "Enterprise AI Labs",
                "type": "workflow",
                "rating": 4.9,
                "downloads": 15420,
                "description": "Send rich interactive messages to Slack with AI summaries."
            },
            {
                "id": "pkg_salesforce_crm",
                "name": "Salesforce CRM Sync Agent",
                "publisher": "DataSync Corp",
                "type": "agent",
                "rating": 4.8,
                "downloads": 8210,
                "description": "Bi-directional sync agent for Salesforce leads and opportunities."
            },
            {
                "id": "pkg_aws_audit",
                "name": "AWS Security Auditor",
                "publisher": "CyberSec Solutions",
                "type": "workflow",
                "rating": 5.0,
                "downloads": 3200,
                "description": "Automated AWS IAM and S3 security posture validation."
            }
        ]

    def search_packages(self, query: str) -> List[Dict[str, Any]]:
        return []

catalog_engine = CatalogEngine()
