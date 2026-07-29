
class CostCalculator:
    """
    Tracks token consumption and spend across providers, workspaces, and agents.
    """
    def calculate_cost(self, input_tokens: int, output_tokens: int, model: str = "gpt-4o") -> float:
        if "claude" in model:
            return (input_tokens * 0.000003) + (output_tokens * 0.000015)
        elif "gemini" in model:
            return (input_tokens * 0.00000125) + (output_tokens * 0.000005)
        return (input_tokens * 0.0000025) + (output_tokens * 0.000010)

cost_calculator = CostCalculator()
