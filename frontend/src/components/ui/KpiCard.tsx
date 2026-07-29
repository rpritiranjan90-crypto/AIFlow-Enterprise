import React from 'react';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { Card } from './Card';

export interface KpiCardProps {
  title: string;
  value: string | number;
  changePercent?: number;
  trend?: 'up' | 'down' | 'neutral';
  timeframe?: string;
  icon?: React.ReactNode;
  description?: string;
  badgeText?: string;
  badgeVariant?: 'success' | 'warning' | 'info' | 'error' | 'glow';
}

export const KpiCard: React.FC<KpiCardProps> = ({
  title,
  value,
  changePercent,
  trend = 'neutral',
  timeframe = 'vs last 30 days',
  icon,
  description,
  badgeText,
  badgeVariant = 'info',
}) => {
  const trendColor =
    trend === 'up'
      ? 'text-emerald-400'
      : trend === 'down'
      ? 'text-rose-400'
      : 'text-slate-400';

  const TrendIcon =
    trend === 'up' ? TrendingUp : trend === 'down' ? TrendingDown : Minus;

  const badgeClasses = {
    success: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
    warning: 'bg-amber-500/10 text-amber-400 border-amber-500/30',
    info: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30',
    error: 'bg-rose-500/10 text-rose-400 border-rose-500/30',
    glow: 'bg-brand-500/10 text-brand-400 border-brand-500/30 shadow-glow',
  };

  return (
    <Card glow className="relative overflow-hidden group">
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
            {title}
          </span>
          <div className="text-2xl font-bold tracking-tight text-slate-100 group-hover:text-brand-400 transition-colors">
            {value}
          </div>
        </div>
        {icon && (
          <div className="p-2.5 rounded-xl bg-slate-800/80 text-brand-400 border border-slate-700/60 group-hover:scale-110 transition-transform duration-200">
            {icon}
          </div>
        )}
      </div>

      <div className="mt-4 flex items-center justify-between text-xs">
        {changePercent !== undefined && (
          <div className={`flex items-center gap-1 font-medium ${trendColor}`}>
            <TrendIcon className="w-3.5 h-3.5" />
            <span>{changePercent > 0 ? `+${changePercent}%` : `${changePercent}%`}</span>
            <span className="text-slate-500 font-normal ml-1">{timeframe}</span>
          </div>
        )}
        {badgeText && (
          <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium border ${badgeClasses[badgeVariant]}`}>
            {badgeText}
          </span>
        )}
        {description && !changePercent && !badgeText && (
          <span className="text-slate-400">{description}</span>
        )}
      </div>
    </Card>
  );
};
