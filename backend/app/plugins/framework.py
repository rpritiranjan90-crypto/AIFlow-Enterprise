from typing import Any, Dict

from app.logging.logger import logger


class PluginFramework:
    """
    Validates plugin manifests (plugin.json) and registers custom node / agent extensions.
    """

    def validate_manifest(self, manifest: Dict[str, Any]) -> bool:
        required_fields = ["id", "name", "version", "author", "entryPoint"]
        for field in required_fields:
            if field not in manifest:
                logger.error(f"Plugin manifest missing required field [{field}]")
                return False
        return True

plugin_framework = PluginFramework()
