from typing import Any, Dict


class GraphEngine:
    def get_enterprise_graph(self) -> Dict[str, Any]:
        return {
            "id": "g_ent_main",
            "name": "Global Enterprise Topology",
            "tenant_id": "t_master",
            "is_active": True,
            "created_at": "2026-07-29T10:00:00Z",
            "nodes": [
                {"id": "n1", "graph_id": "g_ent_main", "node_type": "user", "entity_id": "u_ceo", "metadata_json": {"name": "CEO"}, "created_at": "2026-07-29T10:00:00Z"},
                {"id": "n2", "graph_id": "g_ent_main", "node_type": "agent", "entity_id": "ag_finance", "metadata_json": {"name": "Finance Agent"}, "created_at": "2026-07-29T10:00:00Z"}
            ],
            "edges": [
                {"id": "e1", "graph_id": "g_ent_main", "source_node_id": "n1", "target_node_id": "n2", "relationship_type": "manages", "weight": 1.0, "created_at": "2026-07-29T10:00:00Z"}
            ]
        }

graph_engine = GraphEngine()
