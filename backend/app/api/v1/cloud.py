from datetime import datetime
from typing import List

from fastapi import APIRouter, HTTPException

from app.schemas.cloud import (
    BackupResponse,
    CloudMetricsResponse,
    ClusterResponse,
    DeploymentResponse,
    FeatureFlagResponse,
    RegionResponse,
)

router = APIRouter(prefix="/cloud", tags=["Enterprise Cloud Platform"])

mock_regions: List[RegionResponse] = [
    RegionResponse(id="us-east-1", name="US East (N. Virginia)", code="us-east-1", is_primary=True, status="healthy"),
    RegionResponse(id="eu-central-1", name="EU Central (Frankfurt)", code="eu-central-1", is_primary=False, status="healthy"),
    RegionResponse(id="ap-southeast-1", name="Asia Pacific (Tokyo)", code="ap-southeast-1", is_primary=False, status="healthy"),
]

mock_clusters: List[ClusterResponse] = [
    ClusterResponse(id="cluster_us_east_prod", name="aiflow-us-east-production", region_id="us-east-1", provider="AWS EKS", nodes_count=18, k8s_version="1.30", status="active"),
    ClusterResponse(id="cluster_eu_central_prod", name="aiflow-eu-central-production", region_id="eu-central-1", provider="AWS EKS", nodes_count=12, k8s_version="1.30", status="active"),
    ClusterResponse(id="cluster_ap_tokyo_prod", name="aiflow-ap-tokyo-production", region_id="ap-southeast-1", provider="GCP GKE", nodes_count=8, k8s_version="1.30", status="active"),
]

mock_deployments: List[DeploymentResponse] = [
    DeploymentResponse(id="dep_2026_08", release_version="v2.4.0", strategy="Canary (20%)", status="succeeded", created_at=datetime.utcnow()),
    DeploymentResponse(id="dep_2026_07", release_version="v2.3.9", strategy="Blue/Green", status="succeeded", created_at=datetime.utcnow()),
]

mock_backups: List[BackupResponse] = [
    BackupResponse(id="bak_snapshot_01", workspace_id="ws_prod_01", backup_type="PostgreSQL Snapshot", size_bytes=4200000000, status="completed", created_at=datetime.utcnow()),
]

mock_flags: List[FeatureFlagResponse] = [
    FeatureFlagResponse(id="ff_canary_v2", flag_key="ENABLE_CANARY_ROUTING", is_enabled=True, description="Enables Envoy Canary traffic splitting across regions", percentage_rollout=100),
    FeatureFlagResponse(id="ff_vector_rag_v2", flag_key="ENABLE_VECTOR_RAG_V2", is_enabled=True, description="Enables PgVector HNSW indexing algorithm", percentage_rollout=50),
]

@router.get("/regions", response_model=List[RegionResponse])
async def list_regions():
    return mock_regions

@router.get("/clusters", response_model=List[ClusterResponse])
async def list_clusters():
    return mock_clusters

@router.get("/deployments", response_model=List[DeploymentResponse])
async def list_deployments():
    return mock_deployments

@router.post("/deployments", response_model=DeploymentResponse)
async def trigger_deployment(payload: dict):
    new_dep = DeploymentResponse(
        id=f"dep_{datetime.utcnow().strftime('%M%S')}",
        release_version=payload.get("release_version", "v2.5.0"),
        strategy=payload.get("strategy", "Canary"),
        status="in_progress",
        created_at=datetime.utcnow(),
    )
    mock_deployments.insert(0, new_dep)
    return new_dep

@router.post("/rollback")
async def rollback_deployment(deployment_id: str):
    for d in mock_deployments:
        if d.id == deployment_id:
            d.status = "rolled_back"
            return {"status": "success", "message": f"Deployment [{deployment_id}] rolled back cleanly."}
    raise HTTPException(status_code=404, detail="Deployment not found")

@router.get("/backups", response_model=List[BackupResponse])
async def list_backups():
    return mock_backups

@router.post("/backups", response_model=BackupResponse)
async def create_backup(workspace_id: str = "ws_prod_01"):
    new_bak = BackupResponse(
        id=f"bak_{datetime.utcnow().strftime('%M%S')}",
        workspace_id=workspace_id,
        backup_type="Automated Snapshot",
        size_bytes=4250000000,
        status="completed",
        created_at=datetime.utcnow(),
    )
    mock_backups.insert(0, new_bak)
    return new_bak

@router.post("/restore")
async def trigger_restore(backup_id: str, target_region: str = "eu-central-1"):
    return {
        "status": "completed",
        "backup_id": backup_id,
        "target_region": target_region,
        "rpo_seconds": 12,
        "rto_seconds": 180,
        "message": f"Backup [{backup_id}] restored into [{target_region}] in 180 seconds.",
    }

@router.get("/health")
async def get_cloud_health():
    return {
        "status": "healthy",
        "primary_region": "us-east-1",
        "active_clusters": 3,
        "geo_dns_failover": "operational",
        "active_active_sync": "synced (4ms latency)",
    }

@router.get("/metrics", response_model=CloudMetricsResponse)
async def get_cloud_metrics():
    return CloudMetricsResponse(
        total_clusters=3,
        total_nodes=38,
        global_traffic_rps=14200,
        avg_region_latency_ms=18,
        cpu_utilization_pct=42.8,
        memory_utilization_pct=56.4,
        active_canary_deployments=1,
    )

@router.get("/flags", response_model=List[FeatureFlagResponse])
async def list_feature_flags():
    return mock_flags
