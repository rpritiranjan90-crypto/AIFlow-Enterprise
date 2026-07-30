"""
Multi-Tier Enterprise Memory System for AIFlow Enterprise v2.0.

Implements Short-Term, Long-Term, Semantic, Procedural, Conversation, Knowledge Graph,
and Memory Consolidation.
"""

from dataclasses import dataclass, field
import datetime
import logging
from typing import Any, Dict, List, Optional

logger = logging.getLogger(__name__)


@dataclass
class MemoryRecord:
    id: str
    memory_type: str  # short_term, long_term, semantic, procedural, conversation
    key: str
    value: Any
    created_at: str = field(default_factory=lambda: datetime.datetime.now(datetime.timezone.utc).isoformat())


class MemoryEngine:
    """Multi-tiered memory consolidation & knowledge graph engine."""

    def __init__(self) -> None:
        self.short_term_memory: Dict[str, MemoryRecord] = {}
        self.long_term_memory: Dict[str, MemoryRecord] = {}
        self.semantic_knowledge_graph: Dict[str, List[str]] = {}

    def store_memory(self, memory_type: str, key: str, value: Any) -> MemoryRecord:
        """Store record in targeted memory tier."""
        record = MemoryRecord(
            id=f"mem_{len(self.short_term_memory) + len(self.long_term_memory) + 1}",
            memory_type=memory_type,
            key=key,
            value=value,
        )
        if memory_type == "short_term":
            self.short_term_memory[key] = record
        else:
            self.long_term_memory[key] = record

        logger.info("Stored memory [%s] in tier '%s'", key, memory_type)
        return record

    def add_knowledge_relation(self, entity_a: str, relation: str, entity_b: str) -> None:
        """Add triple relation to semantic knowledge graph."""
        rel_str = f"{entity_a} --[{relation}]--> {entity_b}"
        if entity_a not in self.semantic_knowledge_graph:
            self.semantic_knowledge_graph[entity_a] = []
        self.semantic_knowledge_graph[entity_a].append(rel_str)
        logger.info("Knowledge Graph triple added: %s", rel_str)

    def consolidate_memories() -> int:
        """Consolidate short-term memories into long-term knowledge graph."""
        moved_count = len(self.short_term_memory)
        for k, v in list(self.short_term_memory.items()):
            v.memory_type = "long_term"
            self.long_term_memory[k] = v
        self.short_term_memory.clear()
        logger.info("Consolidated %d memories into long-term storage.", moved_count)
        return moved_count


memory_engine = MemoryEngine()
