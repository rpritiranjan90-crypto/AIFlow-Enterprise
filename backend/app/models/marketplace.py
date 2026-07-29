import uuid
from datetime import datetime

from sqlalchemy import JSON, Boolean, Column, DateTime, Float, ForeignKey, Integer, String, Text

from app.core.database import Base


class Publisher(Base):
    __tablename__ = "marketplace_publishers"

    id = Column(String, primary_key=True, default=lambda: f"pub_{uuid.uuid4().hex[:12]}")
    name = Column(String, nullable=False)
    type = Column(String, default="organization")  # organization, individual
    description = Column(Text, nullable=True)
    website = Column(String, nullable=True)
    is_verified = Column(Boolean, default=False)
    created_at = Column(DateTime, default=datetime.utcnow)


class DeveloperProfile(Base):
    __tablename__ = "marketplace_developer_profiles"

    id = Column(String, primary_key=True, default=lambda: f"dev_{uuid.uuid4().hex[:12]}")
    publisher_id = Column(String, ForeignKey("marketplace_publishers.id"), nullable=True)
    user_id = Column(String, nullable=False, index=True)
    username = Column(String, nullable=False, unique=True)
    bio = Column(Text, nullable=True)
    github_handle = Column(String, nullable=True)
    reputation_score = Column(Integer, default=0)
    created_at = Column(DateTime, default=datetime.utcnow)


class MarketplacePackage(Base):
    __tablename__ = "marketplace_packages"

    id = Column(String, primary_key=True, default=lambda: f"pkg_{uuid.uuid4().hex[:12]}")
    publisher_id = Column(String, ForeignKey("marketplace_publishers.id"), nullable=False)
    name = Column(String, nullable=False)
    slug = Column(String, nullable=False, unique=True)
    type = Column(String, nullable=False)  # workflow, connector, agent, prompt_pack, dashboard, industry_template
    description = Column(Text, nullable=True)
    is_public = Column(Boolean, default=True)  # False means it's an internal enterprise package
    categories = Column(JSON, default=list)
    created_at = Column(DateTime, default=datetime.utcnow)


class PackageVersion(Base):
    __tablename__ = "marketplace_package_versions"

    id = Column(String, primary_key=True, default=lambda: f"pver_{uuid.uuid4().hex[:12]}")
    package_id = Column(String, ForeignKey("marketplace_packages.id"), nullable=False)
    version = Column(String, nullable=False)  # semantic version e.g. "1.0.0"
    status = Column(String, default="draft", index=True)  # draft, beta, stable, deprecated
    release_notes = Column(Text, nullable=True)
    manifest = Column(JSON, default=dict)
    created_at = Column(DateTime, default=datetime.utcnow)


class Certification(Base):
    __tablename__ = "marketplace_certifications"

    id = Column(String, primary_key=True, default=lambda: f"cert_{uuid.uuid4().hex[:12]}")
    version_id = Column(String, ForeignKey("marketplace_package_versions.id"), nullable=False)
    status = Column(String, default="pending", index=True)  # pending, scanning, passed, failed
    security_scan_results = Column(JSON, default=dict)
    license_verification = Column(JSON, default=dict)
    certified_at = Column(DateTime, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)


class Installation(Base):
    __tablename__ = "marketplace_installations"

    id = Column(String, primary_key=True, default=lambda: f"inst_{uuid.uuid4().hex[:12]}")
    tenant_id = Column(String, nullable=False, index=True)
    workspace_id = Column(String, nullable=False, index=True)
    version_id = Column(String, ForeignKey("marketplace_package_versions.id"), nullable=False)
    installed_by = Column(String, nullable=False)
    status = Column(String, default="active", index=True)
    installed_at = Column(DateTime, default=datetime.utcnow)


class MarketplaceReview(Base):
    __tablename__ = "marketplace_reviews"

    id = Column(String, primary_key=True, default=lambda: f"mrev_{uuid.uuid4().hex[:12]}")
    package_id = Column(String, ForeignKey("marketplace_packages.id"), nullable=False)
    user_id = Column(String, nullable=False, index=True)
    rating = Column(Integer, nullable=False)  # 1-5
    comment = Column(Text, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)


class MarketplaceRevenue(Base):
    __tablename__ = "marketplace_revenues"

    id = Column(String, primary_key=True, default=lambda: f"mrevn_{uuid.uuid4().hex[:12]}")
    publisher_id = Column(String, ForeignKey("marketplace_publishers.id"), nullable=False)
    package_id = Column(String, ForeignKey("marketplace_packages.id"), nullable=False)
    amount_usd = Column(Float, nullable=False)
    transaction_type = Column(String, default="purchase")  # purchase, subscription, payout
    status = Column(String, default="completed", index=True)
    created_at = Column(DateTime, default=datetime.utcnow)

# Legacy Models for Commercial Marketplace (Release 10)
class MarketplaceAsset(Base):
    __tablename__ = "legacy_marketplace_assets"
    id = Column(String, primary_key=True)

class AssetVersion(Base):
    __tablename__ = "legacy_asset_versions"
    id = Column(String, primary_key=True)

class Subscription(Base):
    __tablename__ = "legacy_subscriptions"
    id = Column(String, primary_key=True)

class Invoice(Base):
    __tablename__ = "legacy_invoices"
    id = Column(String, primary_key=True)

class Payment(Base):
    __tablename__ = "legacy_payments"
    id = Column(String, primary_key=True)

class License(Base):
    __tablename__ = "legacy_licenses"
    id = Column(String, primary_key=True)

class Review(Base):
    __tablename__ = "legacy_reviews"
    id = Column(String, primary_key=True)

class Purchase(Base):
    __tablename__ = "legacy_purchases"
    id = Column(String, primary_key=True)

class RevenueRecord(Base):
    __tablename__ = "legacy_revenue_records"
    id = Column(String, primary_key=True)

