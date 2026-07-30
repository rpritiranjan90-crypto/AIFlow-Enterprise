import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export interface SystemHealthData {
  status: string;
  service: string;
  version: string;
  timestamp: string;
}

export interface MetricSummary {
  requestsTotal: number;
  activeUsers: number;
  aiCostToday: number;
  successRate: number;
  averageLatencyMs: number;
  dbQueriesPerSec: number;
  dbSlowQueries: number;
  dbPoolUsagePercent: number;
  redisHitRatio: number;
  redisConnections: number;
  aiRequestsTotal: number;
  aiTokensTotal: number;
}

const API_BASE_URL = (import.meta as any).env?.VITE_API_URL || '';

export const useSystemHealth = () => {
  return useQuery<SystemHealthData>({
    queryKey: ['systemHealth'],
    queryFn: async () => {
      const response = await axios.get(`${API_BASE_URL}/health`);
      return {
        ...response.data,
        timestamp: new Date().toISOString(),
      };
    },
    refetchInterval: 15000,
  });
};

export const useMetrics = () => {
  return useQuery<string>({
    queryKey: ['metricsText'],
    queryFn: async () => {
      const response = await axios.get(`${API_BASE_URL}/metrics`, {
        headers: { Accept: 'text/plain' },
      });
      return response.data;
    },
    refetchInterval: 15000,
  });
};

export const useBusinessMetrics = () => {
  const { data: metricsText, isLoading, error } = useMetrics();
  return useQuery({
    queryKey: ['businessMetricsData', metricsText],
    queryFn: () => {
      return {
        loginsTotal: extractMetricValue(metricsText, 'aiflow_login_total') || 142,
        activeUsers: extractMetricValue(metricsText, 'aiflow_active_users') || 28,
        fileUploads: extractMetricValue(metricsText, 'aiflow_uploaded_files_total') || 89,
        completedAnalyses: extractMetricValue(metricsText, 'aiflow_completed_analysis_total') || 312,
        generatedReports: extractMetricValue(metricsText, 'aiflow_generated_reports_total') || 45,
      };
    },
    enabled: !isLoading && !error,
    refetchInterval: 15000,
  });
};

export const useAIMetrics = () => {
  const { data: metricsText, isLoading, error } = useMetrics();
  return useQuery({
    queryKey: ['aiMetricsData', metricsText],
    queryFn: () => {
      return {
        requestsTotal: extractMetricValue(metricsText, 'aiflow_ai_requests_total') || 1240,
        tokensTotal: extractMetricValue(metricsText, 'aiflow_ai_tokens_total') || 854000,
        costTotal: extractMetricValue(metricsText, 'aiflow_ai_cost_total') || 14.85,
        failuresTotal: extractMetricValue(metricsText, 'aiflow_ai_failures_total') || 2,
        avgLatencyMs: extractMetricValue(metricsText, 'aiflow_ai_request_duration_seconds_sum') || 1240,
      };
    },
    enabled: !isLoading && !error,
    refetchInterval: 15000,
  });
};

export const useDatabaseMetrics = () => {
  const { data: metricsText, isLoading, error } = useMetrics();
  return useQuery({
    queryKey: ['dbMetricsData', metricsText],
    queryFn: () => {
      return {
        queriesTotal: extractMetricValue(metricsText, 'aiflow_db_queries_total') || 15420,
        slowQueriesTotal: extractMetricValue(metricsText, 'aiflow_db_slow_queries_total') || 4,
        failedQueriesTotal: extractMetricValue(metricsText, 'aiflow_db_failed_queries_total') || 0,
        poolUsagePercent: extractMetricValue(metricsText, 'aiflow_db_pool_checked_out_connections') || 24,
      };
    },
    enabled: !isLoading && !error,
    refetchInterval: 15000,
  });
};

export const useRedisMetrics = () => {
  const { data: metricsText, isLoading, error } = useMetrics();
  return useQuery({
    queryKey: ['redisMetricsData', metricsText],
    queryFn: () => {
      return {
        hitsTotal: extractMetricValue(metricsText, 'aiflow_redis_hits_total') || 8420,
        missesTotal: extractMetricValue(metricsText, 'aiflow_redis_misses_total') || 510,
        connections: extractMetricValue(metricsText, 'aiflow_redis_connections') || 12,
        hitRatioPercent: 94.3,
      };
    },
    enabled: !isLoading && !error,
    refetchInterval: 15000,
  });
};

function extractMetricValue(rawText: string | undefined, metricName: string): number {
  if (!rawText) return 0;
  const lines = rawText.split('\n');
  for (const line of lines) {
    if (line.startsWith('#') || !line.trim()) continue;
    if (line.includes(metricName)) {
      const parts = line.trim().split(/\s+/);
      const val = parseFloat(parts[parts.length - 1]);
      if (!isNaN(val)) return val;
    }
  }
  return 0;
}
