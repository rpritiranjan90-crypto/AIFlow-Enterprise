import uuid
from datetime import datetime

from sqlalchemy import Boolean, Column, DateTime, Float, ForeignKey, Integer, String, Text

from app.core.database import Base


class CompliancePolicy(Base):
    __tablename__ = "enterprise_compliance_policies"

    id = Column(String, primary_key=True, default=lambda: f"cpol_{uuid.uuid4().hex[:12]}")
    name = Column(String, nullable=False)
    framework = Column(String, default="SOC 2 Type II") # SOC 2, ISO 27001, GDPR, HIPAA, PCI DSS, NIST
    status = Column(String, default="compliant", index=True) # compliant, warning, non_compliant
    last_audit_at = Column(DateTime, default=datetime.utcnow)

class ComplianceEvidence(Base):
    __tablename__ = "enterprise_compliance_evidences"

    id = Column(String, primary_key=True, default=lambda: f"evid_{uuid.uuid4().hex[:12]}")
    policy_id = Column(String, ForeignKey("enterprise_compliance_policies.id"), nullable=False)
    evidence_type = Column(String, default="Automated Telemetry Log")
    signature_hash = Column(String, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)

class RiskRecord(Base):
    __tablename__ = "enterprise_risk_records"

    id = Column(String, primary_key=True, default=lambda: f"risk_{uuid.uuid4().hex[:12]}")
    title = Column(String, nullable=False)
    severity = Column(String, default="medium") # low, medium, high, critical
    mitigation_plan = Column(Text, nullable=False)
    status = Column(String, default="mitigated", index=True)
    created_at = Column(DateTime, default=datetime.utcnow)

class Partner(Base):
    __tablename__ = "enterprise_partners"

    id = Column(String, primary_key=True, default=lambda: f"part_{uuid.uuid4().hex[:12]}")
    name = Column(String, nullable=False)
    tier = Column(String, default="Platinum Partner") # Silver, Gold, Platinum, MSP
    commission_pct = Column(Float, default=20.0)
    status = Column(String, default="active", index=True)
    created_at = Column(DateTime, default=datetime.utcnow)

class PartnerCertification(Base):
    __tablename__ = "enterprise_partner_certifications"

    id = Column(String, primary_key=True, default=lambda: f"pcert_{uuid.uuid4().hex[:12]}")
    partner_id = Column(String, ForeignKey("enterprise_partners.id"), nullable=False)
    certification_name = Column(String, nullable=False)
    issued_at = Column(DateTime, default=datetime.utcnow)
    expires_at = Column(DateTime, nullable=True)

class SupportTicket(Base):
    __tablename__ = "enterprise_support_tickets"

    id = Column(String, primary_key=True, default=lambda: f"tkt_{uuid.uuid4().hex[:12]}")
    subject = Column(String, nullable=False)
    priority = Column(String, default="P1 - Critical") # P1, P2, P3, P4
    sla_status = Column(String, default="within_sla")
    status = Column(String, default="open", index=True) # open, in_progress, resolved
    created_at = Column(DateTime, default=datetime.utcnow)

class Incident(Base):
    __tablename__ = "enterprise_incidents"

    id = Column(String, primary_key=True, default=lambda: f"inc_{uuid.uuid4().hex[:12]}")
    title = Column(String, nullable=False)
    severity = Column(String, default="P2 Major")
    affected_region = Column(String, default="us-east-1")
    status = Column(String, default="investigating", index=True)
    created_at = Column(DateTime, default=datetime.utcnow)

class CustomerHealth(Base):
    __tablename__ = "enterprise_customer_health"

    id = Column(String, primary_key=True, default=lambda: f"chealth_{uuid.uuid4().hex[:12]}")
    org_id = Column(String, nullable=False)
    health_score = Column(Float, default=98.5)
    churn_risk = Column(String, default="low") # low, medium, high
    nps_score = Column(Integer, default=72)
    updated_at = Column(DateTime, default=datetime.utcnow)

class AdoptionMetric(Base):
    __tablename__ = "enterprise_adoption_metrics"

    id = Column(String, primary_key=True, default=lambda: f"ametric_{uuid.uuid4().hex[:12]}")
    org_id = Column(String, nullable=False)
    active_workflows_count = Column(Integer, default=142)
    monthly_execution_volume = Column(Integer, default=450000)
    updated_at = Column(DateTime, default=datetime.utcnow)

class WhiteLabelConfiguration(Base):
    __tablename__ = "enterprise_whitelabel_configs"

    id = Column(String, primary_key=True, default=lambda: f"wlabel_{uuid.uuid4().hex[:12]}")
    org_id = Column(String, nullable=False)
    custom_domain = Column(String, default="automation.acme-corp.com")
    brand_color = Column(String, default="#6366f1")
    logo_url = Column(String, default="https://acme-corp.com/assets/logo.png")
    is_active = Column(Boolean, default=True)
