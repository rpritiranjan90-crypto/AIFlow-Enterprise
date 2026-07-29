from typing import Any, Dict, List


class SearchEngine:
    def global_search(self, query: str) -> List[Dict[str, Any]]:
        # Mock hybrid search returning mixed results
        return [
            {
                "id": "wf_123",
                "entity_type": "workflow",
                "entity_id": "wf_finance_approval",
                "content": "Quarterly Finance Approval Workflow",
                "tags": ["finance", "approval", "q3"],
                "score": 0.95
            },
            {
                "id": "agent_456",
                "entity_type": "agent",
                "entity_id": "ag_sec_auditor",
                "content": "Security Auditor Autonomous Agent",
                "tags": ["security", "audit", "compliance"],
                "score": 0.88
            }
        ]

search_engine = SearchEngine()
