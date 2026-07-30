import React from 'react';
import { HealthBadge } from './HealthBadge';

interface ServiceStatusCardProps {
  name: string;
  type: string;
  status: 'healthy' | 'degraded' | 'unhealthy' | string;
  latencyMs: number;
  uptimePercent: number;
  details?: string;
}

export const ServiceStatusCard: React.FC<ServiceStatusCardProps> = ({
  name,
  type,
  status,
  latencyMs,
  uptimePercent,
  details,
}) => {
  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900/80 p-4 backdrop-blur-md transition-all hover:border-slate-700">
      <div className="flex items-center justify-between">
        <div>
          <h4 className="text-sm font-semibold text-white">{name}</h4>
          <span className="text-xs text-slate-500 uppercase tracking-wider">{type}</span>
        </div>
        <HealthBadge status={status} size="sm" />
      </div>

      <div className="mt-4 grid grid-cols-2 gap-2 border-t border-slate-800/80 pt-3 text-xs">
        <div>
          <span className="text-slate-500">Latency</span>
          <p className="font-semibold text-slate-200">{latencyMs} ms</p>
        </div>
        <div>
          <span className="text-slate-500">Uptime</span>
          <p className="font-semibold text-emerald-400">{uptimePercent}%</p>
        </div>
      </div>
      {details && <p className="mt-2 text-[11px] text-slate-500">{details}</p>}
    </div>
  );
};
