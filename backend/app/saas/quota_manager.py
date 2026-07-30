"""
SaaS Usage Metering & Quota Enforcement Subsystem for AIFlow Enterprise.

Monitors token consumption, workflow executions, API requests, and enforces plan quotas.
"""

from dataclasses import dataclass, field
import logging
from typing import Dict

from app.saas.billing_engine import PLANS, billing_engine

logger = logging.getLogger(__name__)


@dataclass
class UsageRecord:
    ai_tokens_used: int = 0
    workflows_executed: int = 0
    api_requests_count: int = 0
    storage_mb_used: float = 0.0


class QuotaManager:
    """Enforces tenant limits and usage quotas."""

    def __init__(self) -> None:
        self.usage_records: Dict[str, UsageRecord] = {}

    def get_tenant_usage(self, tenant_id: str) -> UsageRecord:
        """Fetch current usage meter for a tenant."""
        if tenant_id not in self.usage_records:
            self.usage_records[tenant_id] = UsageRecord()
        return self.usage_records[tenant_id]

    def record_usage(
        self,
        tenant_id: str,
        ai_tokens: int = 0,
        workflow_count: int = 0,
        api_requests: int = 0,
    ) -> UsageRecord:
        """Meter usage for AI tokens, workflow executions, and API requests."""
        usage = self.get_tenant_usage(tenant_id)
        usage.ai_tokens_used += ai_tokens
        usage.workflows_executed += workflow_count
        usage.api_requests_count += api_requests
        return usage

    def check_quota_available(self, tenant_id: str, resource_type: str = "ai_tokens") -> bool:
        """Check if tenant has quota available for requested resource."""
        sub = billing_engine.get_tenant_subscription(tenant_id)
        plan = PLANS.get(sub.plan_id, PLANS["free"])
        usage = self.get_tenant_usage(tenant_id)

        if resource_type == "ai_tokens":
            return usage.ai_tokens_used < plan.included_ai_tokens
        elif resource_type == "workflows":
            return usage.workflows_executed < plan.included_workflows
        return True


quota_manager = QuotaManager()
