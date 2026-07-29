from typing import Dict, Optional, Type

from app.connectors.base import BaseConnector


class ConnectorSDK:
    """
    Public Developer SDK for creating custom enterprise connectors.
    Developers subclass BaseConnector and register via register_connector().
    """

    def __init__(self):
        self._custom_connectors: Dict[str, Type[BaseConnector]] = {}

    def register_connector(self, connector_id: str, connector_cls: Type[BaseConnector]):
        self._custom_connectors[connector_id] = connector_cls

    def get_connector(self, connector_id: str) -> Optional[Type[BaseConnector]]:
        return self._custom_connectors.get(connector_id)

connector_sdk = ConnectorSDK()
