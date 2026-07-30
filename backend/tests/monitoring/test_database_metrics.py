from types import SimpleNamespace
from unittest.mock import MagicMock, patch

from sqlalchemy import create_engine

from app.monitoring.database_metrics import DatabaseMetrics


def teardown_function():
    if DatabaseMetrics._instance is not None:
        DatabaseMetrics._instance.shutdown()


def test_initialize_returns_singleton():
    db1 = DatabaseMetrics.initialize()
    db2 = DatabaseMetrics.initialize()

    assert db1 is db2


def test_extract_operation():
    db = DatabaseMetrics.initialize()

    assert db._extract_operation("SELECT * FROM users") == "SELECT"
    assert db._extract_operation("insert into users values (1)") == "INSERT"
    assert db._extract_operation("") == "UNKNOWN"


def test_extract_table_name():
    db = DatabaseMetrics.initialize()

    assert db._extract_table_name("SELECT * FROM users") == "users"
    assert db._extract_table_name("INSERT INTO orders VALUES (1)") == "orders"
    assert db._extract_table_name("UPDATE customers SET name='A'") == "customers"
    assert db._extract_table_name("") == "unknown"


def test_get_request_id():
    db = DatabaseMetrics.initialize()

    assert db._get_request_id() == "N/A"


def test_before_cursor_execute_sets_start_time():
    db = DatabaseMetrics.initialize()

    context = SimpleNamespace()

    db._on_before_cursor_execute(
        conn=None,
        cursor=None,
        statement="SELECT 1",
        parameters=None,
        context=context,
        executemany=False,
    )

    assert hasattr(context, "_query_start_time")


def test_extract_database_name_default():
    db = DatabaseMetrics.initialize()

    class Engine:
        url = None

    assert db._get_database_name(Engine()) == "postgresql"


def test_extract_database_name_from_url():
    db = DatabaseMetrics.initialize()

    class URL:
        database = "aiflow"

    class Engine:
        url = URL()

    assert db._get_database_name(Engine()) == "aiflow"


def test_after_cursor_execute_success():
    db = DatabaseMetrics.initialize()

    conn = MagicMock()
    conn.engine.url.database = "aiflow"

    cursor = MagicMock()
    cursor.rowcount = 5

    context = MagicMock()
    context._query_start_time = 0.0

    with patch(
        "app.monitoring.database_metrics.time.perf_counter",
        return_value=0.1,
    ), patch.object(db, "_log_query") as log_mock, patch.object(
        db, "_record_opentelemetry_span"
    ) as otel_mock:

        db._on_after_cursor_execute(
            conn=conn,
            cursor=cursor,
            statement="SELECT * FROM users",
            parameters=None,
            context=context,
            executemany=False,
        )

        log_mock.assert_called_once()
        otel_mock.assert_called_once()


def test_handle_error():
    db = DatabaseMetrics.initialize()

    conn = MagicMock()
    conn.engine.url.database = "aiflow"

    exc = ValueError("boom")

    exception_context = MagicMock()
    exception_context.connection = conn
    exception_context.statement = "SELECT * FROM users"
    exception_context.original_exception = exc
    exception_context.sqlalchemy_exception = None

    with patch.object(db, "_log_query") as log_mock:
        db._on_handle_error(exception_context)

    log_mock.assert_called_once()


def test_connection_pool_events():
    db = DatabaseMetrics.initialize()

    db._on_connect(None, None)
    db._on_checkout(None, None, None)
    db._on_checkin(None, None)
    db._on_close(None, None)


def test_transaction_events():
    db = DatabaseMetrics.initialize()

    db._on_begin(None)
    db._on_commit(None)
    db._on_rollback(None)


def test_register_engine():
    db = DatabaseMetrics.initialize()

    engine = create_engine("sqlite:///:memory:")

    db.register_engine(engine)

    assert engine in db._registered_engines

    db.unregister_engine(engine)


def test_unregister_engine():
    db = DatabaseMetrics.initialize()

    engine = create_engine("sqlite:///:memory:")

    db.register_engine(engine)

    assert engine in db._registered_engines

    db.unregister_engine(engine)

    assert engine not in db._registered_engines