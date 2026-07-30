import React from 'react';

interface TimelineBucket {
  timestamp: string;
  status: 'healthy' | 'degraded' | 'unhealthy';
  uptimePercent: number;
}

interface StatusTimelineProps {
  serviceName: string;
  buckets: TimelineBucket[];
  overallUptimePercent?: number;
}

export const StatusTimeline: React.FC<StatusTimelineProps> = ({
  serviceName,
  buckets,
  overallUptimePercent = 99.98,
}) => {
  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900/80 p-4 backdrop-blur-md">
      <div className="flex items-center justify-between text-xs font-semibold text-slate-300">
        <span>{serviceName}</span>
        <span className="text-emerald-400">{overallUptimePercent}% uptime</span>
      </div>
      <div className="mt-3 flex items-center gap-1">
        {buckets.map((b, i) => {
          const bg =
            b.status === 'healthy'
              ? 'bg-emerald-500 hover:bg-emerald-400'
              : b.status === 'degraded'
              ? 'bg-amber-500 hover:bg-amber-400'
              : 'bg-rose-500 hover:bg-rose-400';
          return (
            <div
              key={i}
              className={`h-7 flex-1 rounded-sm transition-all ${bg}`}
              title={`${b.timestamp}: ${b.status} (${b.uptimePercent}%)`}
            />
          );
        })}
      </div>
      <div className="mt-2 flex justify-between text-[10px] text-slate-500">
        <span>90 days ago</span>
        <span>Today</span>
      </div>
    </div>
  );
};
