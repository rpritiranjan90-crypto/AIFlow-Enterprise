"""
AIFlow Enterprise - File Storage Abstraction (Local/S3/GCS)
"""

class LocalStorageProvider:
    async def save_file(self, file_name: str, content: bytes) -> str:
        return f"/storage/local/{file_name}"

class S3StorageProvider:
    async def save_file(self, file_name: str, content: bytes) -> str:
        return f"s3://aiflow-enterprise-bucket/{file_name}"

class GCSStorageProvider:
    async def save_file(self, file_name: str, content: bytes) -> str:
        return f"gs://aiflow-enterprise-gcs/{file_name}"
