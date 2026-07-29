from typing import Any, Dict


class TenantEngine:
    def provision_tenant(self, name: str, region: str, tier: str) -> Dict[str, Any]:
        return {
            "status": "provisioning",
            "name": name,
            "region": region,
            "tier": tier,
            "message": "Tenant provisioning started"
        }

tenant_engine = TenantEngine()
