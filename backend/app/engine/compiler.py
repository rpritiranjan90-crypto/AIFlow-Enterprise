from typing import Any, Dict, List, Tuple

from app.logging.logger import logger


class DAGCompilationError(Exception):
    pass

class DAGCompiler:
    """
    Compiles React Flow nodes and edges into a validated Directed Acyclic Graph (DAG)
    using Kahn's algorithm for topological sorting & cycle detection.
    """

    def compile(self, nodes: List[Dict[str, Any]], edges: List[Dict[str, Any]]) -> Tuple[List[Dict[str, Any]], List[str]]:
        logger.info(f"Compiling workflow graph with {len(nodes)} nodes and {len(edges)} edges")

        if not nodes:
            raise DAGCompilationError("Workflow graph contains no nodes")

        node_map = {n["id"]: n for n in nodes}
        in_degree = {n["id"]: 0 for n in nodes}
        adj_list: Dict[str, List[str]] = {n["id"]: [] for n in nodes}

        # Build adjacency list & count in-degrees
        for edge in edges:
            src = str(edge.get("source") or edge.get("source_node_id"))
            tgt = str(edge.get("target") or edge.get("target_node_id"))

            if src in node_map and tgt in node_map:
                adj_list[src].append(tgt)
                in_degree[tgt] += 1

        # Check entry trigger
        entry_nodes = [nid for nid, deg in in_degree.items() if deg == 0]
        if not entry_nodes:
            raise DAGCompilationError("Workflow graph has a cycle or missing entry trigger node")

        # Kahn's algorithm for Topological Sort
        queue = list(entry_nodes)
        topological_order: List[Dict[str, Any]] = []

        while queue:
            curr_id = queue.pop(0)
            topological_order.append(node_map[curr_id])

            for neighbor in adj_list[curr_id]:
                in_degree[neighbor] -= 1
                if in_degree[neighbor] == 0:
                    queue.append(neighbor)

        if len(topological_order) != len(nodes):
            raise DAGCompilationError("Cycle detected in workflow graph! Workflows must be Directed Acyclic Graphs (DAGs)")

        execution_plan_ids = [n["id"] for n in topological_order]
        logger.info(f"DAG Compilation successful. Execution plan order: {execution_plan_ids}")
        return topological_order, execution_plan_ids

dag_compiler = DAGCompiler()
