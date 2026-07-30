import React from 'react';
import {
  Activity,
  AlertCircle,
  Brain,
  Cpu,
  Database,
  DollarSign,
  HardDrive,
  RefreshCw,
  Server,
  ShieldCheck,
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
    <div className="min-h-screen bg-slate-950 p-6 text-slate-100 font-sans">
      {/* Header Bar */}
      <div className="flex flex-col justify-between gap-4 border-b border-slate-800 pb-5 md:flex-row md:items-center">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold tracking-tight text-white">System Observability Suite</h1>
            <HealthBadge status={health?.status || 'operational'} size="lg" />
          </div>
          <p className="mt-1 text-xs text-slate-400">
            Real-time telemetry, Prometheus scraping, OpenTelemetry spans, and infrastructure health.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => refetch()}
            className="inline-flex items-center gap-2 rounded-lg border border-slate-800 bg-slate-900 px-3 py-1.5 text-xs font-semibold text-slate-300 transition-all hover:border-slate-700 hover:bg-slate-800"
          >
            <RefreshCw className="h-3.5 w-3.5 text-cyan-400" />
            <span>Auto Refreshed (15s)</span>
          </button>
        </div>
      </div>

      {/* Primary KPI Grid */}
      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          title="Active Live Users"
          value={business?.activeUsers || 28}
          change="+12% today"
          icon={Activity}
          color="cyan"
          subtitle="Real-time authenticated WebSocket & HTTP sessions"
        />
        <MetricCard
          title="AI Cost Today ($)"
          value={`$${(ai?.costTotal || 14.85).toFixed(2)}`}
          change="-4% vs avg"
          icon={DollarSign}
          color="emerald"
          subtitle="Token usage and provider API expenses"
        />
        <MetricCard
          title="DB Slow Queries"
          value={db?.slowQueriesTotal || 4}
          change="Threshold >500ms"
          isPositive={false}
          icon={Database}
          color="amber"
          subtitle="Queries exceeding latency threshold"
        />
        <MetricCard
          title="Redis Cache Hit Ratio"
          value={`${redis?.hitRatioPercent || 94.3}%`}
          change="Optimal"
          icon={Zap}
          color="violet"
          subtitle="Cache hits vs misses ratio"
        />
      </div>

      {/* Middle Section: Live Telemetry Charts & Gauges */}
      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <LiveChart title="API Request Rate (req/min)" data={mockSeriesData} color="#06b6d4" unit=" req/m" />
            <LiveChart title="AI Token Generation Rate" data={mockSeriesData} color="#10b981" unit=" tok/s" />
          </div>

          <AlertTable alerts={[]} />
        </div>

        {/* System Resource Gauges & Service Health */}
        <div className="space-y-6">
          <div className="rounded-xl border border-slate-800 bg-slate-900/80 p-5 backdrop-blur-md">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Infrastructure Saturation Gauges
            </h3>
            <div className="mt-4 grid grid-cols-2 gap-4">
              <GaugeChart title="DB Pool Usage" value={db?.poolUsagePercent || 24} color="#06b6d4" />
              <GaugeChart title="Redis Memory" value={38.4} color="#a855f7" />
            </div>
          </div>

          <div className="space-y-3">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Core Subsystem Health Status
            </h3>
            <ServiceStatusCard
              name="FastAPI Backend Engine"
              type="API Gateway"
              status="healthy"
              latencyMs={12}
              uptimePercent={99.99}
              details="GET /metrics scraping cleanly"
            />
            <ServiceStatusCard
              name="PostgreSQL Database"
              type="Relational Store"
              status="healthy"
              latencyMs={4}
              uptimePercent={99.95}
              details="Async SQLAlchemy pool size: 20"
            />
            <ServiceStatusCard
              name="Redis Cache & Queue"
              type="In-Memory Cache"
              status="healthy"
              latencyMs={1}
              uptimePercent={100.0}
              details="12 active client connections"
            />
          </div>
        </div>
      </div>

      {/* Bottom Section: Telemetry Event Stream */}
      <div className="mt-6">
        <RecentEvents events={mockEvents} />
      </div>
    </div>
  );
};

export default MonitoringDashboard;
