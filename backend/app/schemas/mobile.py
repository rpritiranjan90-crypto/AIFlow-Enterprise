from datetime import datetime
from typing import Optional

from pydantic import BaseModel


class MobileDeviceResponse(BaseModel):
    id: str
    user_id: str
    device_name: str
    platform: str
    os_version: str
    status: str
    last_sync_at: datetime

    class Config:
        from_attributes = True

class PushNotificationResponse(BaseModel):
    id: str
    device_id: str
    title: str
    body: str
    type: str
    is_read: bool
    created_at: datetime

    class Config:
        from_attributes = True

class SyncRequest(BaseModel):
    device_id: str
    sync_mode: Optional[str] = "Delta" # Delta, Full
    client_timestamp: Optional[datetime] = None

class SyncResponse(BaseModel):
    session_id: str
    records_synced: int
    conflict_count: int
    status: str

class ApprovalActionRequest(BaseModel):
    task_id: str
    action: str # approve, reject, escalate
    comment: Optional[str] = None

class DeviceRegisterRequest(BaseModel):
    device_name: str
    platform: str = "iOS"
    os_version: str = "iOS 18.1"
    push_token: Optional[str] = None

class EdgeModelResponse(BaseModel):
    id: str
    model_name: str
    size_mb: int
    quantization: str
    is_downloaded: bool

    class Config:
        from_attributes = True

class ApprovalTaskResponse(BaseModel):
    id: str
    title: str
    requester: str
    risk_level: str
    status: str
    created_at: datetime

    class Config:
        from_attributes = True
