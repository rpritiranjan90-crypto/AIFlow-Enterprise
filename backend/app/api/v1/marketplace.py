from datetime import datetime
from typing import List

from fastapi import APIRouter, Header, HTTPException

from app.marketplace.catalog_engine import catalog_engine
from app.marketplace.certification_engine import certification_engine
from app.marketplace.installation_engine import installation_engine
from app.marketplace.publisher_engine import publisher_engine
from app.marketplace.stripe_service import stripe_service
from app.schemas.marketplace import (
    CheckoutSessionRequest,
    CheckoutSessionResponse,
    LicenseResponse,
    MarketplaceAssetResponse,
    ReviewResponse,
    SubscriptionResponse,
)
from app.schemas.marketplace_ecosystem import (
    CertificationRequest,
    InstallRequest,
    InstallResponse,
    PackageCreateRequest,
    PublisherCreateRequest,
)

router = APIRouter(tags=["Commercial Marketplace & Billing"])

mock_assets: List[MarketplaceAssetResponse] = [
    MarketplaceAssetResponse(
        id="asset_ocr_pro",
        name="Enterprise Document OCR Extractor Node",
        type="Plugin",
        price_usd=49.00,
        publisher_id="pub_enterprise_ai",
        publisher_name="Enterprise AI Labs",
        rating=4.9,
        downloads_count=1420,
        status="active",
        description="High-precision OCR document text extraction for PDF and image scans",
        created_at=datetime.utcnow(),
    ),
    MarketplaceAssetResponse(
        id="asset_salesforce_pack",
        name="Salesforce Lead AI Enrichment Bundle",
        type="Workflow Template",
        price_usd=99.00,
        publisher_id="pub_enterprise_ai",
        publisher_name="Enterprise AI Labs",
        rating=5.0,
        downloads_count=890,
        status="active",
        description="Turnkey Salesforce lead scoring, AI summary, and Slack notification pipeline",
        created_at=datetime.utcnow(),
    ),
    MarketplaceAssetResponse(
        id="asset_sec_audit_agent",
        name="GitHub PR Security Code Auditor Agent",
        type="AI Agent",
        price_usd=149.00,
        publisher_id="pub_cyber_sec",
        publisher_name="CyberSec Intelligence",
        rating=4.8,
        downloads_count=620,
        status="active",
        description="Autonomous AI security agent performing automated OWASP vulnerability scans on GitHub PRs",
        created_at=datetime.utcnow(),
    ),
]

mock_subscriptions: List[SubscriptionResponse] = [
    SubscriptionResponse(id="sub_enterprise_01", workspace_id="ws_prod_01", tier="Enterprise Cloud", seats=25, status="active", created_at=datetime.utcnow())
]

mock_licenses: List[LicenseResponse] = [
    LicenseResponse(id="lic_ocr_01", workspace_id="ws_prod_01", asset_id="asset_ocr_pro", license_key="aiflow_lic_99A8F72B001", seats_allocated=25, status="active")
]

mock_reviews: List[ReviewResponse] = [
    ReviewResponse(id="rev_01", asset_id="asset_ocr_pro", user_name="Sarah Jenkins (Principal Lead)", rating=5, comment="Extremely high accuracy OCR extraction. Saves our team 15 hours a week!", is_verified_purchase=True, created_at=datetime.utcnow())
]

@router.get("/api/v1/marketplace/assets", response_model=List[MarketplaceAssetResponse])
async def list_marketplace_assets():
    return mock_assets

@router.get("/api/v1/marketplace/assets/{id}", response_model=MarketplaceAssetResponse)
async def get_marketplace_asset(id: str):
    for a in mock_assets:
        if a.id == id:
            return a
    raise HTTPException(status_code=404, detail="Marketplace asset not found")

@router.get("/api/v1/marketplace/reviews", response_model=List[ReviewResponse])
async def list_asset_reviews():
    return mock_reviews

@router.post("/api/v1/billing/checkout", response_model=CheckoutSessionResponse)
async def create_checkout_session(body: CheckoutSessionRequest):
    amount = 499.00 if body.tier == "Enterprise" else 99.00
    res = stripe_service.create_checkout_session("ws_prod_01", "subscription", body.tier or "Pro", amount)
    return CheckoutSessionResponse(checkout_url=res["checkout_url"], session_id=res["session_id"])

@router.post("/api/v1/billing/webhooks")
async def handle_stripe_webhook(payload: dict, stripe_signature: str = Header(None)):
    return stripe_service.process_webhook(payload, stripe_signature or "")

@router.get("/api/v1/billing/subscriptions", response_model=List[SubscriptionResponse])
async def list_subscriptions():
    return mock_subscriptions

@router.get("/api/v1/licenses", response_model=List[LicenseResponse])
async def list_licenses():
    return mock_licenses


# Release 19 - Community Marketplace & Enterprise Ecosystem

@router.get("/api/v1/marketplace/packages")
async def list_marketplace_packages(query: str = ""):
    if query:
        return catalog_engine.search_packages(query)
    return catalog_engine.get_public_packages()

@router.post("/api/v1/marketplace/packages")
async def publish_package(body: PackageCreateRequest):
    return publisher_engine.publish_package(body.publisher_id, body.dict())

@router.post("/api/v1/marketplace/install", response_model=InstallResponse)
async def install_package(body: InstallRequest):
    return installation_engine.install_package(
        body.tenant_id, body.workspace_id, body.package_id, body.version_id
    )

@router.get("/api/v1/publishers")
async def list_publishers():
    return publisher_engine.get_publishers()

@router.post("/api/v1/publishers")
async def create_publisher(body: PublisherCreateRequest):
    # Mock response
    return {"id": "pub_new", "message": "Publisher created", "name": body.name}

@router.get("/api/v1/certifications")
async def list_certifications():
    return []

@router.post("/api/v1/certifications")
async def request_certification(body: CertificationRequest):
    return certification_engine.scan_package(body.version_id)

