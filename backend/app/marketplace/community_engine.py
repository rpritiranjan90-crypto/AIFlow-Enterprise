from typing import Any, Dict, List


class CommunityEngine:
    def get_developers(self) -> List[Dict[str, Any]]:
        return [
            {
                "id": "dev_alex_w",
                "username": "alex_w",
                "reputation": 450,
                "badges": ["Top Contributor", "Security Expert"]
            }
        ]

    def get_discussions(self, package_id: str) -> List[Dict[str, Any]]:
        return []

community_engine = CommunityEngine()
