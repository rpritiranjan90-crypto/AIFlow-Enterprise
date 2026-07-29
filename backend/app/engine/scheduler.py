from datetime import datetime, timedelta


class SchedulerEngine:
    def calculate_next_run(self, cron_expr: str) -> datetime:
        # Standard hourly fallback
        return datetime.utcnow() + timedelta(hours=1)

scheduler_engine = SchedulerEngine()
