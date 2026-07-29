from typing import Any, Dict


class InstallationEngine:
    def install_package(self, tenant_id: str, workspace_id: str, package_id: str, version_id: str) -> Dict[str, Any]:
        return {
            "install_id": f"inst_{tenant_id}_{package_id}",
            "status": "success",
            "message": f"Successfully installed {package_id} v{version_id} into workspace {workspace_id}"
        }

installation_engine = InstallationEngine()
