import axios from 'axios';
import { useAuthStore } from '@/store/authStore';

const BASE_URL = (import.meta as any).env?.VITE_API_BASE_URL || 'http://localhost:8000/api/v1';

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
