from typing import Any, Dict


class CopilotEngine:
    def get_copilots(self) -> list:
        return [
            {"id": "cp_health", "industry": "healthcare", "name": "Healthcare Copilot", "capabilities": ["Patient workflow guidance", "Claims assistance", "Clinical document summaries"]},
            {"id": "cp_finance", "industry": "finance", "name": "Finance Copilot", "capabilities": ["KYC assistance", "Loan workflow guidance", "Fraud investigation support"]},
            {"id": "cp_mfg", "industry": "manufacturing", "name": "Manufacturing Copilot", "capabilities": ["Maintenance recommendations", "Production optimization", "Quality analysis"]},
            {"id": "cp_retail", "industry": "retail", "name": "Retail Copilot", "capabilities": ["Inventory insights", "Sales forecasting", "Customer service assistance"]},
            {"id": "cp_gov", "industry": "government", "name": "Government Copilot", "capabilities": ["Permit workflow assistance", "Case management guidance", "Document processing"]},
            {"id": "cp_edu", "industry": "education", "name": "Education Copilot", "capabilities": ["Admissions support", "Student analytics", "Course workflow generation"]}
        ]

    def process_chat(self, copilot_id: str, industry: str, query: str) -> Dict[str, Any]:
        return {
            "response": f"Processed '{query}' using domain-specific RAG for {industry}. Found relevant compliance and operational guidelines.",
            "sources": [f"{industry}_knowledge_base_v1", f"{industry}_policy_pack"],
            "confidence_score": 0.94
        }

copilot_engine = CopilotEngine()
