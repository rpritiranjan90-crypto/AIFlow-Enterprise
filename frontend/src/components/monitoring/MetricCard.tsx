import React from 'react';
import { LucideIcon } from 'lucide-react';

interface MetricCardProps {
  title: string;
  value: string | number;
  change?: string;
  isPositive?: boolean;
  icon: LucideIcon;
  color?: 'emerald' | 'cyan' | 'violet' | 'amber' | 'rose' | 'indigo';
  subtitle?: string;
}

export const MetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  change,
  isPositive = true,
  icon: Icon,
  color = 'cyan',
  subtitle,
}) => {
  const colorMap = {
    emerald: 'border-emerald-500/30 bg-emerald-500/10 text-emerald-400',
    cyan: 'border-cyan-500/30 bg-cyan-500/10 text-cyan-400',
    violet: 'border-violet-500/30 bg-violet-500/10 text-violet-400',
    amber: 'border-amber-500/30 bg-amber-500/10 text-amber-400',
    rose: 'border-rose-500/30 bg-rose-500/10 text-rose-400',
    indigo: 'border-indigo-500/30 bg-indigo-500/10 text-indigo-400',
  };

  return (
    <div className="relative overflow-hidden rounded-xl border border-slate-800 bg-slate-900/80 p-5 backdrop-blur-md transition-all hover:border-slate-700 hover:shadow-lg hover:shadow-slate-950/50">
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">{title}</span>
        <div className={`rounded-lg border p-2.5 ${colorMap[color]}`}>
          <Icon className="h-5 w-5" />
        </div>
      </div>
      <div className="mt-3 flex items-baseline justify-between">
        <span className="text-2xl font-bold tracking-tight text-white">{value}</span>
        {change && (
          <span
            className={`text-xs font-medium ${
              isPositive ? 'text-emerald-400' : 'text-rose-400'
            }`}
          >
            {change}
          </span>
        )}
      </div>
      {subtitle && <p className="mt-1 text-xs text-slate-500">{subtitle}</p>}
    </div>
  );
};
