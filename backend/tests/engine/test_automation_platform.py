"""
Comprehensive unit & integration tests for Enterprise Automation Engine,
Integration Hub, and Marketplace.
"""

import pytest
from app.connectors.integration_hub import integration_hub
from app.engine.execution_engine import execution_engine
from app.marketplace.marketplace_engine import MarketplaceItem, marketplace_engine


@pytest.mark.asyncio
async def test_integration_hub_connectors():
    connectors = integration_hub.list_connectors()
    assert len(connectors) >= 20

    slack_connectors = integration_hub.list_connectors(category="Communication")
    assert len(slack_connectors) >= 2

    res = await integration_hub.execute_connector_action(
        connector_id="slack",
        action_name="send_channel_message",
        params={"channel": "#general", "message": "Build passed!"},
    )
    assert res["status"] == "success"
    assert res["connector_id"] == "slack"


def test_marketplace_catalog_and_install():
    items = marketplace_engine.list_items()
    assert len(items) >= 4

    agents = marketplace_engine.list_items(category="agent")
    assert len(agents) >= 1

    new_item = MarketplaceItem(
        id="tpl_custom_99",
        title="Automated SAP ERP Billing Sync",
        category="workflow",
        author="Enterprise Integration Team",
        version="1.0.0",
        description="Syncs SAP ERP billing with Stripe automatically.",
    )
    pub_res = marketplace_engine.publish_item(new_item)
    assert pub_res["status"] == "published"

    inst_res = marketplace_engine.install_item("tpl_custom_99")
    assert inst_res["status"] == "installed"
    assert inst_res["title"] == "Automated SAP ERP Billing Sync"


@pytest.mark.asyncio
async def test_workflow_execution_engine_run():
    nodes = [
        {"id": "node_1", "nodeType": "manual_trigger", "name": "Start Event"},
        {"id": "node_2", "nodeType": "http_request", "name": "Fetch API Data"},
    ]
    edges = [
        {"id": "e1-2", "source": "node_1", "target": "node_2"},
    ]

    res = await execution_engine.run_workflow(
        execution_id="exec_test_999",
        workflow_id="wf_automation_001",
        nodes=nodes,
        edges=edges,
        trigger_payload={"user": "alex@enterprise.io"},
    )

    assert res["status"] == "completed"
    assert res["execution_id"] == "exec_test_999"
    assert len(res["nodes"]) == 2
