from typing import Any, Dict, List


class SolutionsEngine:
    def get_catalog(self) -> List[Dict[str, Any]]:
        return [
            {
                "id": "sol_health_01",
                "name": "Healthcare Suite",
                "industry": "healthcare",
                "description": "Patient workflow, appointments, claims automation",
                "versions": ["v1.0", "v1.1", "v2.0"],
                "connectors": ["Epic EHR", "HL7 Integration"],
                "compliance": ["HIPAA"]
            },
            {
                "id": "sol_fin_01",
                "name": "Banking & Finance Suite",
                "industry": "finance",
                "description": "Loan processing, KYC, fraud monitoring",
                "versions": ["v1.0"],
                "connectors": ["Core Banking API", "Plaid"],
                "compliance": ["PCI-DSS", "SOX"]
            },
            {
                "id": "sol_mfg_01",
                "name": "Manufacturing Suite",
                "industry": "manufacturing",
                "description": "Predictive maintenance, supply chain dashboard",
                "versions": ["v1.0", "v1.2"],
                "connectors": ["SAP ERP", "SCADA Integration"],
                "compliance": ["ISO 9001"]
            },
            {
                "id": "sol_ret_01",
                "name": "Retail Suite",
                "industry": "retail",
                "description": "Order automation, inventory optimization",
                "versions": ["v1.0"],
                "connectors": ["Shopify", "Stripe"],
                "compliance": ["PCI-DSS"]
            },
            {
                "id": "sol_gov_01",
                "name": "Government Suite",
                "industry": "government",
                "description": "Citizen service portal, permit workflows",
                "versions": ["v1.0", "v1.1"],
                "connectors": ["GovID", "DocuSign"],
                "compliance": ["FedRAMP"]
            },
            {
                "id": "sol_edu_01",
                "name": "Education Suite",
                "industry": "education",
                "description": "Student onboarding, admissions, attendance",
                "versions": ["v1.0"],
                "connectors": ["Canvas LMS", "Blackboard"],
                "compliance": ["FERPA"]
            }
        ]

    def get_industry_solutions(self, industry: str) -> List[Dict[str, Any]]:
        catalog = self.get_catalog()
        return [s for s in catalog if s["industry"] == industry.lower()]

solutions_engine = SolutionsEngine()
