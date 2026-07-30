"""
Unit and integration tests for Data Warehouse & Lakehouse Connectors (Snowflake, BigQuery, Databricks).
"""

import pytest
from app.connectors.data_warehouse_hub import data_warehouse_hub


@pytest.mark.asyncio
async def test_data_warehouse_query_execution():
    res = await data_warehouse_hub.execute_query(
        warehouse="snowflake",
        query="SELECT customer_id, mrr FROM enterprise_sales_db.public.customers",
        connection_params={"account": "xy12345", "user": "admin"},
    )
    assert res.warehouse == "snowflake"
    assert res.rows_affected == 2
    assert len(res.data) == 2
    assert res.data[0]["mrr"] > 0


@pytest.mark.asyncio
async def test_data_warehouse_to_rag_vector_sync():
    res = await data_warehouse_hub.sync_warehouse_to_vector_db(
        warehouse="bigquery",
        table_name="customer_mrr_summary",
        target_knowledge_base_id="kb_dw_bigquery",
    )
    assert res["status"] == "completed"
    assert res["chunks_indexed"] > 0
    assert res["warehouse"] == "bigquery"
