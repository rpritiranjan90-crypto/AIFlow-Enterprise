import uuid
from datetime import datetime

from sqlalchemy import Boolean, Column, DateTime, ForeignKey, Integer, String, Text

from app.core.database import Base


class CredentialVaultItem(Base):
    __tablename__ = "credential_vault"

    id = Column(String, primary_key=True, default=lambda: f"cred_{uuid.uuid4().hex[:12]}")
    workspace_id = Column(String, ForeignKey("workspaces.id", index=True), nullable=False, default="ws_prod_01")
    name = Column(String, nullable=False)
    credential_type = Column(String, nullable=False) # OpenAI_API_Key, Anthropic_Key, Slack_OAuth, AWS_Secret, DB_Pass
    encrypted_value = Column(Text, nullable=False)
    masked_value = Column(String, nullable=False)
    is_rotated = Column(Boolean, default=False)
    last_used_at = Column(DateTime, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)

class SSOProvider(Base):
    __tablename__ = "sso_providers"

    id = Column(String, primary_key=True, default=lambda: f"sso_{uuid.uuid4().hex[:12]}")
    workspace_id = Column(String, ForeignKey("workspaces.id", index=True), nullable=False, default="ws_prod_01")
    provider_type = Column(String, nullable=False) # SAML2, OIDC, Okta, AzureAD, GoogleWorkspace
    client_id = Column(String, nullable=False)
    issuer_url = Column(String, nullable=False)
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime, default=datetime.utcnow)

class EnterpriseQuota(Base):
    __tablename__ = "enterprise_quotas"

    id = Column(String, primary_key=True, default=lambda: f"qta_{uuid.uuid4().hex[:12]}")
    organization_id = Column(String, ForeignKey("organizations.id"), nullable=False, default="org_ent_01")
    max_workflows = Column(Integer, default=500)
    max_executions_per_month = Column(Integer, default=1000000)
    max_storage_gb = Column(Integer, default=1000)
    max_tokens_per_month = Column(Integer, default=100000000)
    created_at = Column(DateTime, default=datetime.utcnow)
