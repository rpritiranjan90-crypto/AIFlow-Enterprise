from typing import Any, Dict


class KnowledgeGraphEngine:
    """
    Enterprise Knowledge Graph Query Builder.
    Models relationships between Users, Departments, Workflows, Agents, Documents, and Connectors.
    """
    def get_graph_data(self) -> Dict[str, Any]:
        nodes = [
          {"id": "usr_01", "type": "User", "label": "Sarah Jenkins (Principal Architect)"},
          {"id": "dept_fin", "type": "Department", "label": "Finance Operations"},
          {"id": "wf_01", "type": "Workflow", "label": "Salesforce Lead AI Pipeline"},
          {"id": "ag_01", "type": "Agent", "label": "Salesforce Lead AI Agent"},
          {"id": "doc_01", "type": "Document", "label": "Q3 Financial Audit PDF"},
          {"id": "conn_sf", "type": "Connector", "label": "Salesforce CRM Connector"},
        ]
        edges = [
          {"source": "usr_01", "target": "dept_fin", "relationship": "MANAGES"},
          {"source": "dept_fin", "target": "wf_01", "relationship": "OWNS"},
          {"source": "wf_01", "target": "ag_01", "relationship": "EXECUTES"},
          {"source": "ag_01", "target": "conn_sf", "relationship": "USES_CONNECTOR"},
          {"source": "ag_01", "target": "doc_01", "relationship": "READS"},
        ]
        return {"nodes": nodes, "edges": edges}

knowledge_graph_engine = KnowledgeGraphEngine()
