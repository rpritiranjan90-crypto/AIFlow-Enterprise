from abc import ABC, abstractmethod
from typing import Any, Dict


class BaseNodeRunner(ABC):
    """
    Abstract base interface for all node execution runners in AIFlow Enterprise.
    """

    @abstractmethod
    async def execute(self, node_data: Dict[str, Any], context: Dict[str, Any]) -> Dict[str, Any]:
        """Execute node business logic and return output payload dictionary."""
        pass

    async def validate(self, node_data: Dict[str, Any]) -> bool:
        """Validate node configuration before execution."""
        return True

    async def cancel(self, node_id: str) -> None:
        """Cancel running execution task."""
        pass

    async def cleanup(self, node_id: str) -> None:
        """Clean up temporary resources."""
        pass
