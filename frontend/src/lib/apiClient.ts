import axios from 'axios';
import { useAuthStore } from '@/store/authStore';

// Normalize BASE_URL so it ALWAYS includes /api/v1 prefix regardless of VITE_API_BASE_URL formatting
let rawBaseUrl = (import.meta as any).env?.VITE_API_BASE_URL || 'http://localhost:8000/api/v1';
if (typeof rawBaseUrl === 'string') {
  rawBaseUrl = rawBaseUrl.trim().replace(/\/$/, '');
  if (!rawBaseUrl.endsWith('/api/v1')) {
    rawBaseUrl = `${rawBaseUrl}/api/v1`;
  }
}
const BASE_URL = rawBaseUrl;

export const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to append JWT Bearer token
apiClient.interceptors.request.use((config) => {
  const token = useAuthStore.getState().tokens?.accessToken;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor for automatic 401 refresh handling
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      // Clear token and redirect to login if session expired
      useAuthStore.getState().logout();
    }
    return Promise.reject(error);
  }
);
