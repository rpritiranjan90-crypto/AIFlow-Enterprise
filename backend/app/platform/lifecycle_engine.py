from typing import Any, Dict, List


class LifecycleEngine:
    def get_releases(self) -> List[Dict[str, Any]]:
        return [
            {
                "id": "rel_v2_20",
                "version": "2.0.20",
                "release_notes": "Enterprise AI Operating System (AIOS)",
                "is_active": True,
                "deployed_at": "2026-07-29T10:00:00Z"
            }
        ]

lifecycle_engine = LifecycleEngine()
