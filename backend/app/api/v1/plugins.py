from datetime import datetime
from typing import List

from fastapi import APIRouter, HTTPException

from app.plugins.sandbox import plugin_sandbox
from app.schemas.plugin import (
    PluginInstallRequest,
    PluginPublishRequest,
    PluginResponse,
)

router = APIRouter(prefix="/plugins", tags=["Developer Platform & Plugins"])

mock_plugins: List[PluginResponse] = [
    PluginResponse(
        id="plugin_custom_ocr",
        name="Document OCR Extractor Node",
        version="1.2.0",
        author="Enterprise AI Labs",
        description="High-precision OCR document text extraction for PDF and image scans",
        category="Workflow Node",
        license="MIT",
        status="verified",
        is_official=True,
        is_installed=True,
        created_at=datetime.utcnow(),
    ),
    PluginResponse(
        id="plugin_custom_memory",
        name="Redis Vector Memory Provider",
        version="1.0.0",
        author="Community Contributor",
        description="Pluggable Redis Enterprise vector store memory provider for Autonomous AI Agents",
        category="AI Agent",
        license="Apache-2.0",
        status="verified",
        is_official=False,
        is_installed=False,
        created_at=datetime.utcnow(),
    ),
]

@router.get("", response_model=List[PluginResponse])
async def list_plugins():
    return mock_plugins

@router.get("/{id}", response_model=PluginResponse)
async def get_plugin(id: str):
    for p in mock_plugins:
        if p.id == id:
            return p
    raise HTTPException(status_code=404, detail="Plugin not found")

@router.post("/install", response_model=PluginResponse)
async def install_plugin(body: PluginInstallRequest):
    for p in mock_plugins:
        if p.id == body.plugin_id:
            p.is_installed = True
            return p
    raise HTTPException(status_code=404, detail="Plugin not found")

@router.post("/publish", response_model=PluginResponse)
async def publish_plugin(body: PluginPublishRequest):
    new_p = PluginResponse(
        id=f"plugin_{datetime.utcnow().strftime('%M%S')}",
        name=body.name,
        version="1.0.0",
        author="Workspace Developer",
        description=body.description,
        category=body.category,
        license="MIT",
        status="verified",
        is_official=False,
        is_installed=True,
        created_at=datetime.utcnow(),
    )
    mock_plugins.insert(0, new_p)
    return new_p

@router.post("/sandbox/test")
async def test_plugin_sandbox(payload: dict):
    return await plugin_sandbox.run_sandbox_test(payload.get("plugin_id", "plugin_custom_ocr"), payload.get("input", {}))

@router.get("/sdk")
async def get_sdk_manifest():
    return {
        "sdk_version": "1.0.0",
        "supported_languages": ["TypeScript", "Python 3.11"],
        "download_url": "https://aiflow.enterprise.io/sdk/aiflow-sdk-v1.0.0.tar.gz",
    }
