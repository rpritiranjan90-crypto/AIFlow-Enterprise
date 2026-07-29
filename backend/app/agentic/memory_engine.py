import uuid
from typing import Any, Dict, List, Optional


class MemoryEngine:
    """
    Long-Term Agent Memory Engine.
    Manages semantic, episodic, workspace, and conversation memory with
    vector-based semantic search, importance scoring, and memory pruning.
    """

    _store: List[Dict[str, Any]] = [
        {
            "id": "mem_001", "agent_id": "agent_planner_01",
            "memory_type": "semantic",
            "content": "Enterprise invoice approval workflows require human-in-the-loop for amounts exceeding $10,000.",
            "importance_score": 0.95, "tags": ["finance", "approval", "policy"],
        },
        {
            "id": "mem_002", "agent_id": "agent_exec_01",
            "memory_type": "episodic",
            "content": "On 2026-07-15, processed 1,420 vendor invoices across SAP and NetSuite with zero failures.",
            "importance_score": 0.88, "tags": ["execution", "finance", "success"],
        },
        {
            "id": "mem_003", "agent_id": "agent_planner_01",
            "memory_type": "workspace",
            "content": "Current active goal: Automate Q3 Financial Close Process across 14 business units.",
            "importance_score": 0.91, "tags": ["goal", "finance", "active"],
        },
    ]

    def search_memory(self, query: str, memory_type: Optional[str] = None) -> List[Dict[str, Any]]:
        results = self._store
        if memory_type:
            results = [m for m in results if m["memory_type"] == memory_type]
        # Simple keyword match (production: vector cosine similarity)
        query_lower = query.lower()
        matched = [m for m in results if any(w in m["content"].lower() for w in query_lower.split())]
        return matched if matched else results[:2]

    def store_memory(self, agent_id: str, memory_type: str, content: str, importance: float = 0.75) -> Dict[str, Any]:
        entry = {
            "id": f"mem_{uuid.uuid4().hex[:8]}",
            "agent_id": agent_id,
            "memory_type": memory_type,
            "content": content,
            "importance_score": importance,
            "tags": [],
        }
        self._store.append(entry)
        return entry

    def prune_memory(self, threshold: float = 0.5) -> Dict[str, Any]:
        before = len(self._store)
        self._store = [m for m in self._store if m["importance_score"] >= threshold]
        pruned = before - len(self._store)
        return {"pruned_count": pruned, "remaining_count": len(self._store), "threshold": threshold}

    def get_all(self) -> List[Dict[str, Any]]:
        return self._store


memory_engine = MemoryEngine()
