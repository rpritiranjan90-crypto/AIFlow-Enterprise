from datetime import datetime
from typing import List

from fastapi import APIRouter

from app.mobile.mobile_approval_engine import mobile_approval_engine
from app.mobile.offline_sync_engine import offline_sync_engine
from app.schemas.mobile import (
    ApprovalActionRequest,
    ApprovalTaskResponse,
    DeviceRegisterRequest,
    EdgeModelResponse,
    MobileDeviceResponse,
    PushNotificationResponse,
    SyncRequest,
    SyncResponse,
)

router = APIRouter(prefix="/mobile", tags=["AIFlow Mobile & Edge Platform"])

mock_devices: List[MobileDeviceResponse] = [
    MobileDeviceResponse(id="mdev_01", user_id="usr_01", device_name="Executive iPhone 16 Pro", platform="iOS", os_version="iOS 18.1", status="active", last_sync_at=datetime.utcnow()),
    MobileDeviceResponse(id="mdev_02", user_id="usr_02", device_name="Field Tablet Galaxy Tab S9", platform="Android", os_version="Android 15", status="active", last_sync_at=datetime.utcnow()),
]

mock_notifs: List[PushNotificationResponse] = [
    PushNotificationResponse(id="pnotif_01", device_id="mdev_01", title="Pending AI Human Approval", body="High-risk $14,850 SAP invoice requires your approval.", type="Approval", is_read=False, created_at=datetime.utcnow()),
]

mock_tasks: List[ApprovalTaskResponse] = [
    ApprovalTaskResponse(id="appr_9901", title="Approve SAP Vendor Invoice #99402", requester="Sarah Jenkins", risk_level="medium", status="pending", created_at=datetime.utcnow()),
]

mock_edge_models: List[EdgeModelResponse] = [
    EdgeModelResponse(id="emod_01", model_name="Llama-3-Micro-1B-INT8", size_mb=450, quantization="INT8", is_downloaded=True),
    EdgeModelResponse(id="emod_02", model_name="MobileOCR-v2-ONNX", size_mb=85, quantization="FP16", is_downloaded=True),
]

@router.get("/dashboard")
async def get_mobile_dashboard():
    return {
        "active_devices": len(mock_devices),
        "pending_approvals": len(mock_tasks),
        "unread_notifications": len(mock_notifs),
        "offline_queue_length": 0,
        "sync_status": "in_sync",
    }

@router.get("/workflows")
async def list_mobile_workflows():
    return [
        {"id": "wf_mobile_01", "name": "Mobile Receipt Scanner & Expense Approval", "type": "OCR & Mobile", "status": "active"},
        {"id": "wf_mobile_02", "name": "Field Technician Inspection Pipeline", "type": "Mobile", "status": "active"},
    ]

@router.post("/sync", response_model=SyncResponse)
async def process_mobile_sync(body: SyncRequest):
    res = offline_sync_engine.process_delta_sync(body.device_id, body.sync_mode or "Delta")
    return SyncResponse(
        session_id=res["session_id"],
        records_synced=res["records_synced"],
        conflict_count=res["conflict_count"],
        status=res["status"],
    )

@router.post("/approve")
async def process_approval_action(body: ApprovalActionRequest):
    return mobile_approval_engine.process_approval_action(body.task_id, body.action, body.comment or "")

@router.get("/notifications", response_model=List[PushNotificationResponse])
async def list_notifications():
    return mock_notifs

@router.get("/devices", response_model=List[MobileDeviceResponse])
async def list_devices():
    return mock_devices

@router.post("/register", response_model=MobileDeviceResponse)
async def register_device(body: DeviceRegisterRequest):
    return MobileDeviceResponse(
        id="mdev_new",
        user_id="usr_01",
        device_name=body.device_name,
        platform=body.platform,
        os_version=body.os_version,
        status="active",
        last_sync_at=datetime.utcnow(),
    )

@router.post("/push-token")
async def register_push_token(device_id: str = "mdev_01", push_token: str = "token_apns_9901"):
    return {"status": "registered", "device_id": device_id, "token": push_token}

@router.get("/approvals", response_model=List[ApprovalTaskResponse])
async def list_approval_tasks():
    return mock_tasks

@router.get("/edge-models", response_model=List[EdgeModelResponse])
async def list_edge_models():
    return mock_edge_models
