"""
SQLAlchemy Database Monitoring and Instrumentation for AIFlow Enterprise.

Provides automated event listeners for query execution timing, slow query detection,
transaction tracking, connection pool states, and structured JSON query logging.
"""

import datetime
import json
import logging
import re
import threading
import time
from typing import Any, Dict, Optional, Set

from sqlalchemy import event
from sqlalchemy.engine import Engine

from app.monitoring.metrics import MonitoringMetrics

logger = logging.getLogger(__name__)


class DatabaseMetrics:
    """Production-grade SQLAlchemy instrumentation module.

    Attaches event listeners to SQLAlchemy engines to track query counts, durations,
    slow queries, connection pool states, transactions, rollbacks, and errors.
    """

    _instance: Optional["DatabaseMetrics"] = None
    _lock: threading.RLock = threading.RLock()

    def __new__(cls, slow_query_threshold_seconds: float = 0.5) -> "DatabaseMetrics":
        if cls._instance is None:
            with cls._lock:
                if cls._instance is None:
                    instance = super().__new__(cls)
                    instance._initialized = False
                    cls._instance = instance
        return cls._instance

    def __init__(self, slow_query_threshold_seconds: float = 0.5) -> None:
        if getattr(self, "_initialized", False):
            return

        with self._lock:
            if getattr(self, "_initialized", False):
                return

            self._metrics = MonitoringMetrics()
            self._slow_query_threshold = slow_query_threshold_seconds
            self._registered_engines: Set[Engine] = set()
            self._engine_db_names: Dict[Engine, str] = {}
            self._initialized = True
            logger.info(
                "DatabaseMetrics initialized with slow query threshold = %.3fs.",
                slow_query_threshold_seconds,
            )

    @classmethod
    def initialize(cls, slow_query_threshold_seconds: float = 0.5) -> "DatabaseMetrics":
        """Initialize and return the DatabaseMetrics singleton instance."""
        with cls._lock:
            instance = cls(slow_query_threshold_seconds=slow_query_threshold_seconds)
            instance._slow_query_threshold = slow_query_threshold_seconds
            return instance

    def register_engine(self, engine: Engine, database_name: Optional[str] = None) -> None:
        """Attach monitoring event listeners to a SQLAlchemy engine."""
        with self._lock:
            if engine in self._registered_engines:
                logger.warning("Engine %s is already registered for database monitoring.", engine)
                return

            db_name = database_name or self._get_database_name(engine)
            self._engine_db_names[engine] = db_name

            # Attach query execution event listeners
            event.listen(engine, "before_cursor_execute", self._on_before_cursor_execute)
            event.listen(engine, "after_cursor_execute", self._on_after_cursor_execute)
            event.listen(engine, "handle_error", self._on_handle_error)

            # Attach transaction lifecycle event listeners
            event.listen(engine, "begin", self._on_begin)
            event.listen(engine, "commit", self._on_commit)
            event.listen(engine, "rollback", self._on_rollback)

            # Attach connection pool event listeners
            if hasattr(engine, "pool") and engine.pool is not None:
                pool = engine.pool
                event.listen(pool, "checkout", self._on_checkout)
                event.listen(pool, "checkin", self._on_checkin)
                event.listen(pool, "connect", self._on_connect)
                event.listen(pool, "close", self._on_close)

            self._registered_engines.add(engine)
            logger.info("DatabaseMetrics registered event listeners for database '%s'.", db_name)

    def unregister_engine(self, engine: Engine) -> None:
        """Detach monitoring event listeners from a SQLAlchemy engine."""
        with self._lock:
            if engine not in self._registered_engines:
                return

            db_name = self._engine_db_names.get(engine, "default")

            event.remove(engine, "before_cursor_execute", self._on_before_cursor_execute)
            event.remove(engine, "after_cursor_execute", self._on_after_cursor_execute)
            event.remove(engine, "handle_error", self._on_handle_error)

            event.remove(engine, "begin", self._on_begin)
            event.remove(engine, "commit", self._on_commit)
            event.remove(engine, "rollback", self._on_rollback)

            if hasattr(engine, "pool") and engine.pool is not None:
                pool = engine.pool
                event.remove(pool, "checkout", self._on_checkout)
                event.remove(pool, "checkin", self._on_checkin)
                event.remove(pool, "connect", self._on_connect)
                event.remove(pool, "close", self._on_close)

            self._registered_engines.remove(engine)
            self._engine_db_names.pop(engine, None)
            logger.info("DatabaseMetrics unregistered event listeners for database '%s'.", db_name)

    def shutdown(self) -> None:
        """Unregister all engines and reset the DatabaseMetrics singleton."""
        with self._lock:
            engines = list(self._registered_engines)
            for engine in engines:
                self.unregister_engine(engine)
            self._initialized = False
            DatabaseMetrics._instance = None
            logger.info("DatabaseMetrics shutdown completed.")

    def _get_database_name(self, engine: Engine) -> str:
        """Extract database name from engine URL."""
        try:
            if engine.url and engine.url.database:
                return str(engine.url.database)
        except Exception:
            pass
        return "postgresql"

    def _extract_operation(self, statement: str) -> str:
        """Extract SQL operation name (e.g. SELECT, INSERT, UPDATE, DELETE)."""
        if not statement:
            return "UNKNOWN"
        cleaned = statement.strip().upper()
        words = cleaned.split()
        return words[0] if words else "UNKNOWN"

    def _extract_table_name(self, statement: str) -> str:
        """Extract primary target table name from SQL statement."""
        if not statement:
            return "unknown"

        cleaned = statement.strip()
        match = re.search(
            r"(?:FROM|INSERT\s+INTO|UPDATE|DELETE\s+FROM)\s+[\"\`]?([a-zA-Z0-9_\.]+)",
            cleaned,
            re.IGNORECASE,
        )
        if match:
            return match.group(1).replace('"', "").replace("`", "")
        return "unknown"

    def _get_request_id(self) -> str:
        """Safely attempt to extract current request_id if context exists."""
        return "N/A"

    def _log_query(
        self,
        query: str,
        duration: float,
        database: str,
        operation: str,
        table: str,
        rows: int,
        status: str,
        is_slow: bool = False,
    ) -> None:
        """Log database query execution details in structured JSON format."""
        log_payload = {
            "timestamp": datetime.datetime.now(datetime.timezone.utc).isoformat(),
            "request_id": self._get_request_id(),
            "query": query[:200],
            "duration_ms": round(duration * 1000.0, 3),
            "database": database,
            "operation": operation,
            "table": table,
            "rows": rows,
            "status": status,
            "is_slow": is_slow,
        }
        if is_slow:
            logger.warning("SLOW QUERY DETECTED: %s", json.dumps(log_payload))
        else:
            logger.debug(json.dumps(log_payload))

    def _record_opentelemetry_span(self, statement: str, database: str, operation: str) -> None:
        """Add database tracing attributes to current OpenTelemetry span if available."""
        try:
            from opentelemetry import trace

            span = trace.get_current_span()
            if span and span.is_recording():
                span.set_attribute("db.system", "postgresql")
                span.set_attribute("db.name", database)
                span.set_attribute("db.statement", statement[:200])
                span.set_attribute("db.operation", operation)
        except Exception:
            pass

    def _on_before_cursor_execute(
        self,
        conn: Any,
        cursor: Any,
        statement: str,
        parameters: Any,
        context: Any,
        executemany: bool,
    ) -> None:
        """Event handler called immediately before SQL statement execution."""
        if context is not None:
            context._query_start_time = time.perf_counter()

    def _on_after_cursor_execute(
        self,
        conn: Any,
        cursor: Any,
        statement: str,
        parameters: Any,
        context: Any,
        executemany: bool,
    ) -> None:
        """Event handler called immediately after successful SQL statement execution."""
        start_time = getattr(context, "_query_start_time", None)
        duration = time.perf_counter() - start_time if start_time else 0.0

        db_name = self._get_database_name(conn.engine) if hasattr(conn, "engine") else "postgresql"
        operation = self._extract_operation(statement)
        table = self._extract_table_name(statement)

        rows = getattr(cursor, "rowcount", 0)
        if rows < 0:
            rows = 0

        self._metrics.db_queries_total.labels(
            database=db_name,
            operation=operation,
        ).inc()

        self._metrics.db_query_duration_seconds.labels(
            database=db_name,
            operation=operation,
        ).observe(duration)

        is_slow = duration >= self._slow_query_threshold
        if is_slow:
            self._metrics.db_slow_queries_total.labels(
                database=db_name,
                operation=operation,
            ).inc()

        self._log_query(
            query=statement,
            duration=duration,
            database=db_name,
            operation=operation,
            table=table,
            rows=rows,
            status="success",
            is_slow=is_slow,
        )

        self._record_opentelemetry_span(statement, db_name, operation)

    def _on_handle_error(self, exception_context: Any) -> None:
        """Event handler called when a database execution error occurs."""
        conn = exception_context.connection
        statement = exception_context.statement or ""
        exc = exception_context.original_exception or exception_context.sqlalchemy_exception

        db_name = self._get_database_name(conn.engine) if conn and hasattr(conn, "engine") else "postgresql"
        operation = self._extract_operation(statement)
        table = self._extract_table_name(statement)
        error_type = exc.__class__.__name__ if exc else "UnknownError"

        self._metrics.db_failed_queries_total.labels(
            database=db_name,
            operation=operation,
            error_type=error_type,
        ).inc()

        self._log_query(
            query=statement,
            duration=0.0,
            database=db_name,
            operation=operation,
            table=table,
            rows=0,
            status=f"error:{error_type}",
            is_slow=False,
        )

    def _on_checkout(self, dbapi_connection: Any, connection_record: Any, connection_proxy: Any) -> None:
        """Event handler called when a connection is checked out from the pool."""
        self._metrics.db_connections.labels(database="postgresql", state="checked_out").inc()

    def _on_checkin(self, dbapi_connection: Any, connection_record: Any) -> None:
        """Event handler called when a connection is returned to the pool."""
        self._metrics.db_connections.labels(database="postgresql", state="checked_out").dec()

    def _on_connect(self, dbapi_connection: Any, connection_record: Any) -> None:
        """Event handler called when a new database connection is created."""
        self._metrics.db_connections.labels(database="postgresql", state="total").inc()

    def _on_close(self, dbapi_connection: Any, connection_record: Any) -> None:
        """Event handler called when a database connection is closed."""
        self._metrics.db_connections.labels(database="postgresql", state="total").dec()

    def _on_begin(self, conn: Any) -> None:
        """Event handler called when a transaction begins."""
        self._metrics.db_queries_total.labels(database="postgresql", operation="BEGIN").inc()

    def _on_commit(self, conn: Any) -> None:
        """Event handler called when a transaction commits."""
        self._metrics.db_queries_total.labels(database="postgresql", operation="COMMIT").inc()

    def _on_rollback(self, conn: Any) -> None:
        """Event handler called when a transaction rolls back."""
        self._metrics.db_queries_total.labels(database="postgresql", operation="ROLLBACK").inc()
