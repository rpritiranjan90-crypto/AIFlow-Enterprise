import React from 'react';
import { render, screen } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { describe, expect, it, vi } from 'vitest';
import { MonitoringDashboard } from '../MonitoringDashboard';

vi.mock('../../../hooks/useMonitoring', () => ({
  useSystemHealth: () => ({
    data: { status: 'healthy', service: 'AIFlow Enterprise Backend API', version: '1.0.0' },
    isLoading: false,
    refetch: vi.fn(),
  }),
  useBusinessMetrics: () => ({
    data: { loginsTotal: 142, activeUsers: 28, fileUploads: 89, completedAnalyses: 312, generatedReports: 45 },
    isLoading: false,
  }),
  useAIMetrics: () => ({
    data: { requestsTotal: 1240, tokensTotal: 854000, costTotal: 14.85, failuresTotal: 2, avgLatencyMs: 1240 },
    isLoading: false,
  }),
  useDatabaseMetrics: () => ({
    data: { queriesTotal: 15420, slowQueriesTotal: 4, failedQueriesTotal: 0, poolUsagePercent: 24 },
    isLoading: false,
  }),
  useRedisMetrics: () => ({
    data: { hitsTotal: 8420, missesTotal: 510, connections: 12, hitRatioPercent: 94.3 },
    isLoading: false,
  }),
}));

describe('MonitoringDashboard Component', () => {
  it('renders observability header and metric cards cleanly', () => {
    const queryClient = new QueryClient({
      defaultOptions: { queries: { retry: false } },
    });

    render(
      <QueryClientProvider client={queryClient}>
        <MonitoringDashboard />
      </QueryClientProvider>
    );

    expect(screen.getByText('System Observability Suite')).toBeInTheDocument();
    expect(screen.getByText('Active Live Users')).toBeInTheDocument();
    expect(screen.getByText('FastAPI Backend Engine')).toBeInTheDocument();
    expect(screen.getByText('PostgreSQL Database')).toBeInTheDocument();
  });
});
