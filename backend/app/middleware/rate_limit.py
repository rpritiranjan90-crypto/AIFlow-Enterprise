import time
from typing import Dict

from starlette.middleware.base import BaseHTTPMiddleware
from starlette.requests import Request
from starlette.responses import JSONResponse


class RateLimiterMiddleware(BaseHTTPMiddleware):
    def __init__(self, app, max_requests: int = 100, window_seconds: int = 60):
        super().__init__(app)
        self.max_requests = max_requests
        self.window_seconds = window_seconds
        self.clients: Dict[str, list] = {}

    async def dispatch(self, request: Request, call_next):
        client_ip = request.client.host if request.client else "127.0.0.1"
        now = time.time()

        timestamps = self.clients.get(client_ip, [])
        # Filter timestamps within the window
        timestamps = [t for t in timestamps if now - t < self.window_seconds]

        if len(timestamps) >= self.max_requests:
            return JSONResponse(
                status_code=429,
                content={"detail": "Rate limit exceeded. Please slow down requests."}
            )

        timestamps.append(now)
        self.clients[client_ip] = timestamps
        return await call_next(request)
