from fastapi import APIRouter

from app.api.v1.admin import router as admin_router
from app.api.v1.agentic import router as agentic_router
from app.api.v1.ai_agents import router as ai_agents_router
from app.api.v1.aiops import router as aiops_router
from app.api.v1.auth import router as auth_router
from app.api.v1.cloud import router as cloud_router
from app.api.v1.connectors import router as connectors_router
from app.api.v1.data_platform import router as data_platform_router
from app.api.v1.enterprise import router as enterprise_router
from app.api.v1.execution import router as execution_router
from app.api.v1.health import router as health_router
from app.api.v1.hyperautomation import router as hyperautomation_router
from app.api.v1.industry import router as industry_router
from app.api.v1.intelligence import router as intelligence_router
from app.api.v1.knowledge import router as knowledge_router
from app.api.v1.marketplace import router as marketplace_router
from app.api.v1.memory import router as memory_router
from app.api.v1.mobile import router as mobile_router
from app.api.v1.platform import router as platform_router
from app.api.v1.plugins import router as plugins_router
from app.api.v1.prompts import router as prompts_router
from app.api.v1.saas import router as saas_router
from app.api.v1.schedules import router as schedules_router
from app.api.v1.webhooks import router as webhooks_router
from app.api.v1.workflow import router as workflow_router
from app.api.v1.workspace import router as workspace_router
from app.api.v1.ws_execution import router as ws_router

api_v1_router = APIRouter(prefix="/api/v1")
api_v1_router.include_router(health_router)
api_v1_router.include_router(auth_router)
api_v1_router.include_router(workspace_router)
api_v1_router.include_router(workflow_router)
api_v1_router.include_router(execution_router)
api_v1_router.include_router(webhooks_router)
api_v1_router.include_router(schedules_router)
api_v1_router.include_router(ws_router)
api_v1_router.include_router(ai_agents_router)
api_v1_router.include_router(prompts_router)
api_v1_router.include_router(knowledge_router)
api_v1_router.include_router(memory_router)
api_v1_router.include_router(admin_router)
api_v1_router.include_router(connectors_router)
api_v1_router.include_router(aiops_router)
api_v1_router.include_router(plugins_router)
api_v1_router.include_router(cloud_router)
api_v1_router.include_router(marketplace_router)
api_v1_router.include_router(hyperautomation_router)
api_v1_router.include_router(intelligence_router)
api_v1_router.include_router(data_platform_router)
api_v1_router.include_router(mobile_router)
api_v1_router.include_router(enterprise_router)
api_v1_router.include_router(agentic_router)
api_v1_router.include_router(saas_router)
api_v1_router.include_router(industry_router)
api_v1_router.include_router(platform_router)
