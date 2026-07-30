"""
Enterprise Marketplace Engine for AIFlow Enterprise.

Manages publishing workflows, ratings, reviews, downloads, and versioning across Connectors,
Workflows, AI Agents, Prompts, and Template Marketplaces.
"""

from dataclasses import dataclass, field
import datetime
import logging
from typing import Any, Dict, List, Optional

logger = logging.getLogger(__name__)


@dataclass
class MarketplaceItem:
    id: str
    title: str
    category: str  # connector, workflow, agent, prompt, template
    author: str
    version: str
    description: str
    rating: float = 4.8
    downloads: int = 120
    is_verified: bool = True
    tags: List[str] = field(default_factory=list)
    published_at: str = field(default_factory=lambda: datetime.datetime.now(datetime.timezone.utc).isoformat())


class MarketplaceEngine:
    """Catalog and publishing engine for Enterprise AI & Workflow Marketplace."""

    def __init__(self) -> None:
        self.catalog: Dict[str, MarketplaceItem] = {}
        self._seed_default_marketplace()

    def _seed_default_marketplace(self) -> None:
        items = [
            MarketplaceItem("tpl_01", "Automated Security Audit Workflow", "template", "AIFlow Security", "1.0.0", "Scans dependencies, runs Trivy, posts Slack alerts.", 4.9, 1420, True, ["security", "devops"]),
            MarketplaceItem("tpl_02", "Customer Support Ticket Summarizer", "agent", "Support Ops", "1.2.0", "AI Agent that ingests Zendesk tickets and generates solutions.", 4.7, 890, True, ["ai", "support"]),
            MarketplaceItem("tpl_03", "Stripe Invoice Processing Automation", "workflow", "Finance Team", "2.0.0", "Automates invoice sync between Stripe and SAP/ServiceNow.", 4.8, 2300, True, ["finance", "stripe"]),
            MarketplaceItem("tpl_04", "GitHub PR Security Review Agent", "agent", "DevSecOps", "1.1.0", "Autonomous agent reviewing PR code against OWASP guidelines.", 4.9, 3100, True, ["github", "security"]),
            MarketplaceItem("tpl_05", "Enterprise RAG Document Indexer", "template", "Data Team", "1.0.0", "Ingests PDF/DOCX into vector databases automatically.", 4.8, 760, True, ["rag", "ai"]),
        ]
        for it in items:
            self.catalog[it.id] = it

    def list_items(self, category: Optional[str] = None, tag: Optional[str] = None) -> List[MarketplaceItem]:
        """Query marketplace items with category and tag filtering."""
        results = list(self.catalog.values())
        if category:
            results = [r for r in results if r.category.lower() == category.lower()]
        if tag:
            results = [r for r in results if tag.lower() in [t.lower() for t in r.tags]]
        return results

    def publish_item(self, item: MarketplaceItem) -> Dict[str, Any]:
        """Publish a new item or template to the Enterprise Marketplace."""
        self.catalog[item.id] = item
        logger.info("Published Marketplace Item '%s' [%s]", item.title, item.category)
        return {"status": "published", "item_id": item.id, "version": item.version}

    def install_item(self, item_id: str) -> Dict[str, Any]:
        """Install a marketplace item into workspace."""
        item = self.catalog.get(item_id)
        if not item:
            return {"status": "error", "message": f"Marketplace item '{item_id}' not found."}

        item.downloads += 1
        return {"status": "installed", "item_id": item_id, "title": item.title, "version": item.version}


marketplace_engine = MarketplaceEngine()
