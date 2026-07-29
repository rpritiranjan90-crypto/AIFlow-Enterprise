from datetime import datetime
from typing import Any, Dict, List, Optional

from pydantic import BaseModel


class ConnectorResponse(BaseModel):
    id: str
    name: str
    category: str
    provider: str
    auth_type: str
    icon_name: str
    version: str
    description: str
    is_featured: bool = False
    is_installed: bool = False

    class Config:
        from_attributes = True

class ConnectorInstallRequest(BaseModel):
    connector_id: str
    credential_payload: Dict[str, Any]

class InstalledConnectorResponse(BaseModel):
    id: str
    workspace_id: str
    connector_id: str
    name: str
    status: str # connected, expired, error
    health: str
    credential_id: Optional[str] = None
    installed_at: datetime

    class Config:
        from_attributes = True

class WorkflowTemplateCatalogResponse(BaseModel):
    id: str
    title: str
    category: str
    description: str
    graph_json: str
    required_connectors: List[str] = []
    install_count: int = 0
    created_at: datetime

    class Config:
        from_attributes = True

class MarketplaceSummaryResponse(BaseModel):
    total_connectors: int
    categories: List[str]
    featured_connectors: List[ConnectorResponse]
    popular_templates: List[WorkflowTemplateCatalogResponse]
