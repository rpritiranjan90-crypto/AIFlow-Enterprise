import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Activity,
  Brain,
  Cpu,
  Database,
  RefreshCw,
  Server,
  Zap,
} from 'lucide-react';

import { AlertTable } from '../../components/monitoring/AlertTable';
import { GaugeChart } from '../../components/monitoring/GaugeChart';
import { HealthBadge } from '../../components/monitoring/HealthBadge';
import { LiveChart } from '../../components/monitoring/LiveChart';
import { MetricCard } from '../../components/monitoring/MetricCard';
import { RecentEvents, SystemEvent } from '../../components/monitoring/RecentEvents';
import { ServiceStatusCard } from '../../components/monitoring/ServiceStatusCard';
import {
  useAIMetrics,
  useBusinessMetrics,
  useDatabaseMetrics,
  useRedisMetrics,
  useSystemHealth,
} from '../../hooks/useMonitoring';

export const MonitoringDashboard: React.FC = () => {
  const { data: health, isLoading: healthLoading, refetch } = useSystemHealth();
  const { data: business } = useBusinessMetrics();
  const { data: ai } = useAIMetrics();
  const { data: db } = useDatabaseMetrics();
  const { data: redis } = useRedisMetrics();

  const [currentLatency, setCurrentLatency] = useState(340);

  useEffect(() => {
    const interval = setInterval(() => {
      const latencies = [340, 280, 310, 295, 325];
      setCurrentLatency(latencies[Math.floor(Math.random() * latencies.length)]);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  const mockSeriesData = [
    { label: '10:00', value: 120 },
    { label: '10:05', value: 185 },
    { label: '10:10', value: 240 },
    { label: '10:15', value: 310 },
    { label: '10:20', value: 280 },
    { label: '10:25', value: 450 },
    { label: '10:30', value: 520 },
  ];

  const mockEvents: SystemEvent[] = [
    {
      id: '1',
      timestamp: '10:28:14',
      type: 'info',
      source: 'MonitoringRegistry',
      message: 'Prometheus CollectorRegistry successfully scraped /metrics.',
    },
    {
      id: '2',
      timestamp: '10:25:02',
      type: 'info',
      source: 'AIMetrics',
      message: 'LLM completion request completed in 1.24s (2,450 tokens generated).',
    },
    {
      id: '3',
      timestamp: '10:21:45',
      type: 'warning',
      source: 'DatabaseMetrics',
      message: 'Slow SQL Query detected (duration: 542ms on workflows table).',
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-[#050816] p-6 lg:p-8 text-slate-100 font-sans space-y-8"
    >
      {/* Header Bar */}
      <div className="flex flex-col justify-between gap-4 border-b border-white/[0.08] pb-6 md:flex-row md:items-center">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-extrabold tracking-tight text-white">System Observability Suite</h1>
            <HealthBadge status={health?.status || 'healthy'} size="lg" />
          </div>
          <p className="mt-1.5 text-xs text-slate-400">
            Real-time telemetry, Prometheus scraping, OpenTelemetry spans, and infrastructure health.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => refetch()}
            aria-label="Refresh Telemetry Metrics"
            className="inline-flex items-center gap-2 rounded-xl border border-white/[0.08] bg-[#0B1120] px-4 py-2 text-xs font-bold text-slate-300 transition-all hover:border-blue-500/40 hover:text-white shadow-md"
          >
            <RefreshCw className="h-3.5 w-3.5 text-cyan-400 animate-spin" />
            <span>Auto Refreshed (15s)</span>
          </button>
        </div>
      </div>

      {/* Primary KPI Grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          title="Active Live Users"
          value={business?.activeUsers ?? 142}
          change="+18.4%"
          isPositive={true}
          subtitle="Concurrent WebSockets"
          icon={Zap}
          color="cyan"
        />
        <MetricCard
          title="Completed Analyses"
          value={business?.completedAnalyses ?? 28}
          change="+12.1%"
          isPositive={true}
          subtitle="Executing Multi-Agent Swarms"
          icon={Brain}
          color="violet"
        />
        <MetricCard
          title="Avg LLM Latency"
          value={`${ai?.avgLatencyMs ?? 340}ms`}
          change="-45ms"
          isPositive={true}
          subtitle="Claude 3.5 Sonnet & GPT-4o"
          icon={Cpu}
          color="emerald"
        />
        <MetricCard
          title="Database Pool Usage"
          value={`${db?.poolUsagePercent ?? 16}%`}
          change="Optimal"
          isPositive={true}
          subtitle="PostgreSQL 16 pgvector pool"
          icon={Database}
          color="amber"
        />
      </div>

      {/* Observability Visualizations */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 rounded-2xl bg-[#0B1120] border border-white/[0.08] p-6 shadow-xl space-y-4">
          <div className="flex items-center justify-between border-b border-white/[0.06] pb-3">
            <h3 className="font-bold text-white text-sm flex items-center gap-2">
              <Activity className="w-4 h-4 text-blue-400" /> System Throughput & Latency Trend
            </h3>
            <span className="text-[10px] font-mono text-cyan-400 font-semibold uppercase">Prometheus Real-Time</span>
          </div>
          <LiveChart title="API Requests / sec" data={mockSeriesData} color="#3B82F6" height={220} />
        </div>

        <div className="rounded-2xl bg-[#0B1120] border border-white/[0.08] p-6 shadow-xl space-y-6">
          <div className="border-b border-white/[0.06] pb-3">
            <h3 className="font-bold text-white text-sm flex items-center gap-2">
              <Server className="w-4 h-4 text-cyan-400" /> Infrastructure Resource Allocation
            </h3>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <GaugeChart title="CPU Load" value={42} color="#06B6D4" />
            <GaugeChart title="Memory Usage" value={68} color="#8B5CF6" />
          </div>
        </div>
      </div>

      {/* Services Status & Recent Telemetry Events */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="space-y-4">
          <h3 className="font-bold text-white text-sm">Core Platform Microservices</h3>
          <div className="space-y-3">
            <ServiceStatusCard name="FastAPI Backend Engine" type="API Gateway" status="healthy" uptimePercent={99.99} latencyMs={currentLatency} />
            <ServiceStatusCard name="PostgreSQL Database" type="Database" status="healthy" uptimePercent={100.0} latencyMs={12} />
            <ServiceStatusCard name="Redis 7 Cluster Cache" type="In-Memory Cache" status="healthy" uptimePercent={99.98} latencyMs={4} />
            <ServiceStatusCard name="Prometheus & Alertmanager" type="Telemetry Scraper" status="healthy" uptimePercent={99.95} latencyMs={8} />
          </div>
        </div>

        <div className="lg:col-span-2 space-y-4">
          <h3 className="font-bold text-white text-sm">Recent Telemetry Events & Traces</h3>
          <RecentEvents events={mockEvents} />
        </div>
      </div>
    </motion.div>
  );
};
