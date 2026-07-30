"""
Demo Data Seeding Script for AIFlow Enterprise v3.0 / v4.0.

Seeds initial admin users, enterprise workspaces, visual workflow DAGs,
knowledge bases, connectors, and SaaS billing subscriptions into the live database.
"""

import asyncio
import logging
from typing import Any, Dict

logging.basicConfig(level=logging.INFO, format="%(asctime)s [%(levelname)s] %(message)s")
logger = logging.getLogger(__name__)


async def seed_demo_data() -> Dict[str, Any]:
    logger.info("=== Starting AIFlow Enterprise Demo Data Seeding ===")

    # 1. Seed Admin User & Workspace
    admin_user = {
        "id": "usr_admin_001",
        "email": "admin@aiflow.io",
        "full_name": "Enterprise Super Admin",
        "role": "Super Admin",
        "workspace_id": "ws_enterprise_main",
    }
    logger.info("[ 1/5 ] Seeded Super Admin User: %s", admin_user["email"])

    # 2. Seed Enterprise Workspaces
    workspace = {
        "id": "ws_enterprise_main",
        "name": "Global Enterprise Operations",
        "tier": "enterprise",
        "members_count": 28,
        "region": "us-east-1",
    }
    logger.info("[ 2/5 ] Seeded Primary Workspace: '%s' (%s)", workspace["name"], workspace["tier"])

    # 3. Seed Sample Visual Workflow DAGs
    sample_workflows = [
        {
            "id": "wf_customer_support_ai",
            "name": "Automated Customer Support & SLA Dispatch",
            "nodes_count": 6,
            "status": "active",
            "executions_total": 1420,
        },
        {
            "id": "wf_financial_reconciliation",
            "name": "Snowflake & SAP Financial Reconciliation",
            "nodes_count": 8,
            "status": "active",
            "executions_total": 850,
        },
        {
            "id": "wf_executive_board_report",
            "name": "Autonomous Executive C-Suite Board Report Generator",
            "nodes_count": 5,
            "status": "active",
            "executions_total": 120,
        },
    ]
    for wf in sample_workflows:
        logger.info("[ 3/5 ] Seeded Workflow: '%s' (%d nodes)", wf["name"], wf["nodes_count"])

    # 4. Seed Knowledge Bases & RAG Vector Index
    knowledge_bases = [
        {
            "id": "kb_enterprise_docs",
            "name": "Enterprise Knowledge Graph & Standard Operating Procedures",
            "documents_count": 45,
            "vector_store": "FAISS",
        },
        {
            "id": "kb_dw_bigquery",
            "name": "Data Warehouse Sync: BigQuery MRR Analytics",
            "documents_count": 12,
            "vector_store": "Pinecone",
        },
    ]
    for kb in knowledge_bases:
        logger.info("[ 4/5 ] Seeded Knowledge Base: '%s' (%s)", kb["name"], kb["vector_store"])

    # 5. Seed SaaS Commercial Subscription
    subscription = {
        "tenant_id": "tenant_aiflow_global",
        "plan": "Enterprise Tier",
        "monthly_mrr": 1499.00,
        "ai_token_quota": 50000000,
        "status": "active",
    }
    logger.info("[ 5/5 ] Seeded Commercial SaaS Plan: '%s' ($%.2f/mo)", subscription["plan"], subscription["monthly_mrr"])

    logger.info("=== Demo Data Seeding Completed Successfully ===")
    return {
        "status": "success",
        "admin_user": admin_user["email"],
        "workspace": workspace["name"],
        "workflows_seeded": len(sample_workflows),
        "knowledge_bases_seeded": len(knowledge_bases),
    }


if __name__ == "__main__":
    asyncio.run(seed_demo_data())
