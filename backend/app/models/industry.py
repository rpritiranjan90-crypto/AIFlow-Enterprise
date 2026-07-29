import uuid
from datetime import datetime

from sqlalchemy import JSON, Boolean, Column, DateTime, Float, ForeignKey, String, Text

from app.core.database import Base


class IndustrySolution(Base):
    __tablename__ = "industry_solutions"

    id = Column(String, primary_key=True, default=lambda: f"isol_{uuid.uuid4().hex[:12]}")
    name = Column(String, nullable=False)
    industry = Column(String, nullable=False)  # healthcare, finance, manufacturing, retail, government, education
    description = Column(Text, nullable=True)
    icon = Column(String, nullable=True)
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime, default=datetime.utcnow)


class DeploymentTemplate(Base):
    __tablename__ = "industry_deployment_templates"

    id = Column(String, primary_key=True, default=lambda: f"tpl_{uuid.uuid4().hex[:12]}")
    solution_id = Column(String, ForeignKey("industry_solutions.id"), nullable=False)
    name = Column(String, nullable=False)
    base_config = Column(JSON, default=dict)
    created_at = Column(DateTime, default=datetime.utcnow)


class TemplateVersion(Base):
    __tablename__ = "industry_template_versions"

    id = Column(String, primary_key=True, default=lambda: f"tplv_{uuid.uuid4().hex[:12]}")
    template_id = Column(String, ForeignKey("industry_deployment_templates.id"), nullable=False)
    version = Column(String, nullable=False)  # e.g., "1.0.0"
    changes = Column(Text, nullable=True)
    compatibility_matrix = Column(JSON, default=dict)
    rollback_version_id = Column(String, nullable=True)
    is_stable = Column(Boolean, default=True)
    created_at = Column(DateTime, default=datetime.utcnow)


class IndustryConnector(Base):
    __tablename__ = "industry_connectors"

    id = Column(String, primary_key=True, default=lambda: f"conn_{uuid.uuid4().hex[:12]}")
    industry = Column(String, nullable=False)
    name = Column(String, nullable=False)  # e.g., "Epic EHR", "Salesforce CRM"
    type = Column(String, nullable=False)  # e.g., "ehr", "core_banking", "erp"
    config_schema = Column(JSON, default=dict)
    created_at = Column(DateTime, default=datetime.utcnow)


class IndustryRoleTemplate(Base):
    __tablename__ = "industry_role_templates"

    id = Column(String, primary_key=True, default=lambda: f"irole_{uuid.uuid4().hex[:12]}")
    industry = Column(String, nullable=False)
    role_name = Column(String, nullable=False)  # e.g., "Clinical Approver", "Loan Officer"
    permissions = Column(JSON, default=list)
    created_at = Column(DateTime, default=datetime.utcnow)


class CompliancePack(Base):
    __tablename__ = "industry_compliance_packs"

    id = Column(String, primary_key=True, default=lambda: f"cpack_{uuid.uuid4().hex[:12]}")
    industry = Column(String, nullable=False)
    standard = Column(String, nullable=False)  # e.g., "HIPAA", "PCI-DSS"
    policy_mappings = Column(JSON, default=dict)  # Maps to Release 15 CompliancePolicy IDs
    created_at = Column(DateTime, default=datetime.utcnow)


class IndustryKnowledgeBase(Base):
    __tablename__ = "industry_knowledge_bases"

    id = Column(String, primary_key=True, default=lambda: f"ikb_{uuid.uuid4().hex[:12]}")
    industry = Column(String, nullable=False)
    name = Column(String, nullable=False)
    corpus_size_mb = Column(Float, default=0.0)
    last_indexed = Column(DateTime, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)


class IndustryCopilot(Base):
    __tablename__ = "industry_copilots"

    id = Column(String, primary_key=True, default=lambda: f"copilot_{uuid.uuid4().hex[:12]}")
    industry = Column(String, nullable=False)
    name = Column(String, nullable=False)
    capabilities = Column(JSON, default=list)  # e.g., ["claims_assistance", "patient_workflow"]
    knowledge_base_id = Column(String, ForeignKey("industry_knowledge_bases.id"), nullable=True)
    system_prompt = Column(Text, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)


class SolutionDeployment(Base):
    __tablename__ = "industry_solution_deployments"

    id = Column(String, primary_key=True, default=lambda: f"dep_{uuid.uuid4().hex[:12]}")
    tenant_id = Column(String, nullable=False, index=True)
    workspace_id = Column(String, nullable=False, index=True)
    solution_id = Column(String, ForeignKey("industry_solutions.id"), nullable=False)
    version_id = Column(String, ForeignKey("industry_template_versions.id"), nullable=False)
    status = Column(String, default="deployed", index=True)  # provisioning, deployed, failed
    config_applied = Column(JSON, default=dict)
    created_at = Column(DateTime, default=datetime.utcnow)


class IndustryWorkflow(Base):
    __tablename__ = "industry_workflows"

    id = Column(String, primary_key=True, default=lambda: f"iwf_{uuid.uuid4().hex[:12]}")
    deployment_id = Column(String, ForeignKey("industry_solution_deployments.id"), nullable=False)
    name = Column(String, nullable=False)
    workflow_type = Column(String, nullable=False)
    status = Column(String, default="active", index=True)
    metrics = Column(JSON, default=dict)
    created_at = Column(DateTime, default=datetime.utcnow)
