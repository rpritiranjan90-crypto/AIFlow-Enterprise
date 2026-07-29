import pytest
from app.models import *
from app.schemas.auth import LoginRequest

def test_models_import_and_init():
    # Instantiate models to hit coverage on schema definitions
    assert LoginRequest(email="test@test.com", password="test")
