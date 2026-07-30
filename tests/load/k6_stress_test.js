import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  stages: [
    { duration: '1m', target: 50 },  // Smoke & Ramp up
    { duration: '3m', target: 200 }, // Stress test load
    { duration: '30s', target: 500 }, // Spike test
    { duration: '2m', target: 200 }, // Sustained load
    { duration: '1m', target: 0 },   // Cool down
  ],
  thresholds: {
    http_req_duration: ['p(95)<500', 'p(99)<1000'], // 95% of requests under 500ms
    http_req_failed: ['rate<0.01'],                 // Error rate < 1%
  },
};

const BASE_URL = __ENV.TARGET_URL || 'http://localhost:8000';

export default function () {
  // 1. Health Endpoint Test
  const healthRes = http.get(`${BASE_URL}/health`);
  check(healthRes, {
    'health status is 200': (r) => r.status === 200,
  });

  // 2. Metrics Endpoint Test
  const metricsRes = http.get(`${BASE_URL}/metrics`);
  check(metricsRes, {
    'metrics status is 200': (r) => r.status === 200,
  });

  sleep(1);
}
