from datetime import datetime, timedelta
from typing import List

from fastapi import APIRouter, HTTPException

from app.schemas.execution import ScheduleCreateRequest, ScheduledJobResponse, ScheduleUpdateRequest

router = APIRouter(prefix="/schedules", tags=["Schedules"])

mock_schedules: List[ScheduledJobResponse] = [
    ScheduledJobResponse(
        id="sched_01",
        workflow_id="wf_03",
        cron_expr="0 0 * * *",
        is_active=True,
        last_run_at=datetime.utcnow() - timedelta(hours=8),
        next_run_at=datetime.utcnow() + timedelta(hours=16),
        created_at=datetime.utcnow(),
    )
]

@router.get("", response_model=List[ScheduledJobResponse])
async def list_schedules():
    return mock_schedules

@router.post("", response_model=ScheduledJobResponse)
async def create_schedule(body: ScheduleCreateRequest):
    new_sched = ScheduledJobResponse(
        id=f"sched_{datetime.utcnow().strftime('%M%S')}",
        workflow_id=body.workflow_id,
        cron_expr=body.cron_expr,
        is_active=True,
        last_run_at=None,
        next_run_at=datetime.utcnow() + timedelta(hours=1),
        created_at=datetime.utcnow(),
    )
    mock_schedules.append(new_sched)
    return new_sched

@router.patch("/{id}", response_model=ScheduledJobResponse)
async def update_schedule(id: str, body: ScheduleUpdateRequest):
    for s in mock_schedules:
        if s.id == id:
            if body.cron_expr:
                s.cron_expr = body.cron_expr
            if body.is_active is not None:
                s.is_active = body.is_active
            return s
    raise HTTPException(status_code=404, detail="Schedule not found")

@router.delete("/{id}")
async def delete_schedule(id: str):
    global mock_schedules
    mock_schedules = [s for s in mock_schedules if s.id != id]
    return {"message": "Schedule deleted successfully"}
