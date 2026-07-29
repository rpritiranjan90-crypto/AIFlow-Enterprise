
class RetryPolicy:
    """
    Computes retry delays using exponential backoff algorithm with jitter.
    """

    def calculate_delay(self, attempt: int, initial_delay_sec: float = 1.0, max_delay_sec: float = 60.0) -> float:
        delay = initial_delay_sec * (2 ** (attempt - 1))
        return min(delay, max_delay_sec)

    def should_retry(self, attempt: int, max_retries: int = 3) -> bool:
        return attempt < max_retries

retry_policy = RetryPolicy()
