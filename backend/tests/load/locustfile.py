from locust import HttpUser, task, between

class AIFlowEnterpriseUser(HttpUser):
    wait_time = between(1, 5)

    @task(3)
    def view_dashboard(self):
        """Simulates viewing the dashboard analytics (high read)."""
        self.client.get("/api/v1/health") # Replace with dashboard endpoints later

    @task(1)
    def search_marketplace(self):
        """Simulates searching for assets in the marketplace."""
        self.client.get("/api/v1/health?q=performance") # Mock

    @task(2)
    def check_workflows(self):
        """Simulates fetching workflows list."""
        self.client.get("/api/v1/health?target=workflows") # Mock

    @task(1)
    def invoke_ai_agent(self):
        """Simulates sending a prompt to an AI agent."""
        self.client.post("/api/v1/health", json={"prompt": "Hello", "agent_id": "default"}) # Mock

    def on_start(self):
        """Executed before tasks begin, useful for auth"""
        pass
