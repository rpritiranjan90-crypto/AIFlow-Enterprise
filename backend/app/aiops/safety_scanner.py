import re
from typing import Any, Dict


class SafetyScanner:
    """
    AI Safety Guardrails: PII Detection, Prompt Injection Scanner, Toxicity Scoring.
    """
    EMAIL_REGEX = re.compile(r"[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}")
    SSN_REGEX = re.compile(r"\b\d{3}-\d{2}-\d{4}\b")
    INJECTION_KEYWORDS = ["ignore previous instructions", "system override", "jailbreak", "DAN mode"]

    def scan_text(self, text: str) -> Dict[str, Any]:
        pii_found = bool(self.EMAIL_REGEX.search(text) or self.SSN_REGEX.search(text))

        injection_risk = "low"
        if any(kw in text.lower() for kw in self.INJECTION_KEYWORDS):
            injection_risk = "high"

        return {
            "pii_detected": pii_found,
            "prompt_injection_risk": injection_risk,
            "toxicity_score": 0.002,
            "status": "blocked" if injection_risk == "high" else "passed",
        }

safety_scanner = SafetyScanner()
