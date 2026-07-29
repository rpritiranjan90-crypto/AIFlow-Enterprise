import re
from typing import Any, Dict


class VariableEngine:
    """
    Evaluates dynamic template expressions in node configurations:
    e.g. {{trigger.email}}, {{nodes.n1.output.score}}, {{workflow.id}}, {{execution.id}}
    """
    EXPRESSION_REGEX = re.compile(r"\{\{\s*([\w\.\-\_]+)\s*\}\}")

    def resolve(self, template: Any, context: Dict[str, Any]) -> Any:
        if isinstance(template, str):
            def replacer(match):
                path = match.group(1).split(".")
                val = context
                for key in path:
                    if isinstance(val, dict):
                        val = val.get(key, "")
                    else:
                        return match.group(0)
                return str(val) if val is not None else ""

            return self.EXPRESSION_REGEX.sub(replacer, template)

        elif isinstance(template, dict):
            return {k: self.resolve(v, context) for k, v in template.items()}

        elif isinstance(template, list):
            return [self.resolve(item, context) for item in template]

        return template

variable_engine = VariableEngine()
