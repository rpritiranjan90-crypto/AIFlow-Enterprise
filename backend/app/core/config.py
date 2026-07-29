from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    ENVIRONMENT: str = "development"
    PROJECT_NAME: str = "AIFlow Enterprise API"
    API_V1_STR: str = "/api/v1"
    SECRET_KEY: str = "aiflow-super-secret-jwt-key-for-enterprise-auth-2026"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60
    REFRESH_TOKEN_EXPIRE_DAYS: int = 7

    DATABASE_URL: str = "postgresql+asyncpg://postgres:postgrespassword@postgres:5432/aiflow_db"
    REDIS_URL: str = "redis://redis:6379/0"

    MAX_FAILED_LOGIN_ATTEMPTS: int = 5
    LOCKOUT_DURATION_MINUTES: int = 15

    class Config:
        env_file = ".env"
        extra = "ignore"

settings = Settings()
