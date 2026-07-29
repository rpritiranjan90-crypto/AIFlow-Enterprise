
class APIGatewayEngine:
    def get_regions(self) -> list:
        return [
            {"id": "us-east-1", "name": "N. Virginia", "status": "active", "latency": 24},
            {"id": "eu-west-1", "name": "Ireland", "status": "active", "latency": 88},
            {"id": "ap-northeast-1", "name": "Tokyo", "status": "active", "latency": 142}
        ]

api_gateway_engine = APIGatewayEngine()
