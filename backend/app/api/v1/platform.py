from typing import List

from fastapi import APIRouter

from app.platform.command_center_engine import command_center_engine
from app.platform.digital_twin_engine import digital_twin_engine
from app.platform.executive_engine import executive_engine
from app.platform.graph_engine import graph_engine
from app.platform.orchestration_engine import orchestration_engine
from app.platform.predictive_engine import predictive_engine
from app.platform.search_engine import search_engine
from app.schemas.platform import (
    EnterpriseGraphResponse,
    EnterpriseTwinResponse,
    ExecutiveReportResponse,
    GlobalSearchResponse,
    PredictiveInsightResponse,
    ScheduleRequest,
    ScheduleResponse,
    SimulateRequest,
    SimulateResponse,
)

router = APIRouter(tags=["Enterprise AI Operating System (AIOS)"])

@router.get("/api/v1/platform/overview")
async def get_platform_overview():
    return command_center_engine.get_overview()

@router.get("/api/v1/platform/search", response_model=List[GlobalSearchResponse])
async def global_search(query: str):
    return search_engine.global_search(query)

@router.get("/api/v1/platform/graph", response_model=EnterpriseGraphResponse)
async def get_enterprise_graph():
    return graph_engine.get_enterprise_graph()

@router.get("/api/v1/platform/intelligence", response_model=List[PredictiveInsightResponse])
async def get_predictive_insights():
    return predictive_engine.get_insights()

@router.get("/api/v1/platform/twin", response_model=List[EnterpriseTwinResponse])
async def get_twins():
    return digital_twin_engine.get_twins()

@router.post("/api/v1/platform/schedule", response_model=ScheduleResponse)
async def schedule_orchestration(body: ScheduleRequest):
    return orchestration_engine.schedule_execution(body.dict())

@router.post("/api/v1/platform/simulate", response_model=SimulateResponse)
async def run_simulation(body: SimulateRequest):
    return digital_twin_engine.simulate(body.dict())

@router.get("/api/v1/platform/executive", response_model=List[ExecutiveReportResponse])
async def get_executive_reports():
    return executive_engine.get_reports()
