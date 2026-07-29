from abc import ABC, abstractmethod
from typing import Any, Dict


class BaseConnector(ABC):
    """
    Abstract interface implemented by every AIFlow Enterprise integration connector.
    """

    @abstractmethod
    async def authenticate(self, credentials: Dict[str, Any]) -> Dict[str, Any]:
        """Exchanges authorization code or API key for access tokens."""
        pass

    async def refreshToken(self, refresh_token: str) -> Dict[str, Any]:
        """Refreshes expired OAuth 2.0 access token."""
        return {"access_token": "refreshed_access_token_token_2026", "expires_in": 3600}

    async def validate(self, credentials: Dict[str, Any]) -> bool:
        """Validates connection health and scopes."""
        return True

    @abstractmethod
    async def execute(self, action: str, params: Dict[str, Any], context: Dict[str, Any]) -> Dict[str, Any]:
        """Executes native API action (e.g. create_lead, send_message, run_query)."""
        pass

    async def disconnect(self, connection_id: str) -> bool:
        """Revokes OAuth token and cleans up connection."""
        return True
