from datetime import datetime
from typing import Optional

from pydantic import BaseModel


class MarketplaceAssetResponse(BaseModel):
    id: str
    name: str
    type: str
    price_usd: float
    publisher_id: str
    publisher_name: Optional[str] = "Enterprise AI Labs"
    rating: float
    downloads_count: int
    status: str
    description: Optional[str]
    created_at: datetime

    class Config:
        from_attributes = True

class SubscriptionResponse(BaseModel):
    id: str
    workspace_id: str
    tier: str
    seats: int
    status: str
    created_at: datetime

    class Config:
        from_attributes = True

class InvoiceResponse(BaseModel):
    id: str
    workspace_id: str
    amount_usd: float
    status: str
    paid_at: datetime

    class Config:
        from_attributes = True

class LicenseResponse(BaseModel):
    id: str
    workspace_id: str
    asset_id: str
    license_key: str
    seats_allocated: int
    status: str

    class Config:
        from_attributes = True

class ReviewResponse(BaseModel):
    id: str
    asset_id: str
    user_name: str
    rating: int
    comment: str
    is_verified_purchase: bool
    created_at: datetime

    class Config:
        from_attributes = True

class CheckoutSessionRequest(BaseModel):
    asset_id: Optional[str] = None
    tier: Optional[str] = "Pro"
    seats: int = 10

class CheckoutSessionResponse(BaseModel):
    checkout_url: str
    session_id: str
