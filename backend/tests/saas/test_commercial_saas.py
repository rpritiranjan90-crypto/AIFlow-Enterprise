"""
Commercial SaaS unit and integration tests for Billing, Payment Gateways,
Usage Metering, and Quotas.
"""

import pytest
from app.saas.billing_engine import PLANS, billing_engine
from app.saas.payment_gateway import payment_gateway
from app.saas.quota_manager import quota_manager


def test_billing_subscription_lifecycle():
    tenant_id = "tenant_test_88"

    sub = billing_engine.create_subscription(tenant_id, plan_id="professional", billing_cycle="monthly", coupon_code="WELCOME20")
    assert sub.status == "active"
    assert sub.plan_id == "professional"

    fetched_sub = billing_engine.get_tenant_subscription(tenant_id)
    assert fetched_sub.plan_id == "professional"
    assert len(billing_engine.invoices) > 0


@pytest.mark.asyncio
async def test_payment_gateway_processing_and_refund():
    tenant_id = "tenant_test_88"

    payment_res = await payment_gateway.process_payment(
        tenant_id=tenant_id,
        amount_usd=199.0,
        provider="stripe",
    )
    assert payment_res["status"] == "succeeded"
    assert payment_res["provider"] == "stripe"

    refund_res = await payment_gateway.process_refund(
        transaction_id=payment_res["transaction_id"],
        amount_usd=199.0,
    )
    assert refund_res["status"] == "refunded"


def test_quota_metering_and_enforcement():
    tenant_id = "tenant_quota_01"

    # Start with free plan
    billing_engine.create_subscription(tenant_id, plan_id="free")

    assert quota_manager.check_quota_available(tenant_id, "ai_tokens") is True

    # Record usage under quota
    quota_manager.record_usage(tenant_id, ai_tokens=10000)
    assert quota_manager.check_quota_available(tenant_id, "ai_tokens") is True

    # Record usage exceeding 50,000 free token limit
    quota_manager.record_usage(tenant_id, ai_tokens=45000)
    assert quota_manager.check_quota_available(tenant_id, "ai_tokens") is False
