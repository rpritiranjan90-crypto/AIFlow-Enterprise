from datetime import datetime
from typing import Any, Dict, List, Optional

from pydantic import BaseModel


class PublisherResponse(BaseModel):
    id: str
    name: str
    type: str
    description: Optional[str] = None
    website: Optional[str] = None
    is_verified: bool
    created_at: datetime


class PublisherCreateRequest(BaseModel):
    name: str
    type: str = "organization"
    description: Optional[str] = None
    website: Optional[str] = None


class PackageResponse(BaseModel):
    id: str
    publisher_id: str
    name: str
    slug: str
    type: str
    description: Optional[str] = None
    is_public: bool
    categories: List[str] = []
    created_at: datetime
    publisher: Optional[PublisherResponse] = None
    latest_version: Optional[str] = None
    downloads_count: int = 0
    rating: float = 0.0


class PackageCreateRequest(BaseModel):
    name: str
    slug: str
    type: str
    description: Optional[str] = None
    is_public: bool = True
    categories: List[str] = []
    publisher_id: str
    initial_version: str = "1.0.0"
    manifest: Dict[str, Any] = {}


class CertificationResponse(BaseModel):
    id: str
    version_id: str
    status: str
    security_scan_results: Dict[str, Any] = {}
    license_verification: Dict[str, Any] = {}
    certified_at: Optional[datetime] = None
    created_at: datetime


class CertificationRequest(BaseModel):
    version_id: str


class InstallRequest(BaseModel):
    tenant_id: str
    workspace_id: str
    package_id: str
    version_id: str


class InstallResponse(BaseModel):
    install_id: str
    status: str
    message: str
    installed_at: datetime
