import React from 'react';

interface HealthBadgeProps {
  status: 'healthy' | 'degraded' | 'unhealthy' | 'operational' | string;
  size?: 'sm' | 'md' | 'lg';
}

export const HealthBadge: React.FC<HealthBadgeProps> = ({ status, size = 'md' }) => {
  const normalized = status.toLowerCase();

  const getStyle = () => {
    switch (normalized) {
      case 'healthy':
      case 'operational':
        return 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400 dot-emerald';
      case 'degraded':
      case 'warning':
        return 'bg-amber-500/10 border-amber-500/30 text-amber-400 dot-amber';
      case 'unhealthy':
      case 'critical':
      case 'error':
        return 'bg-rose-500/10 border-rose-500/30 text-rose-400 dot-rose';
      default:
        return 'bg-slate-500/10 border-slate-500/30 text-slate-400 dot-slate';
    }
  };

  const dotColor = () => {
    switch (normalized) {
      case 'healthy':
      case 'operational':
        return 'bg-emerald-400 shadow-emerald-500/50';
      case 'degraded':
      case 'warning':
        return 'bg-amber-400 shadow-amber-500/50';
      default:
        return 'bg-rose-400 shadow-rose-500/50';
    }
  };

  const sizeClasses = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-2.5 py-1 text-xs font-semibold',
    lg: 'px-3 py-1.5 text-sm font-semibold',
  };

  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full border ${getStyle()} ${
        sizeClasses[size]
      }`}
    >
      <span className={`h-2 w-2 rounded-full shadow-sm animate-pulse ${dotColor()}`} />
      <span className="capitalize">{status}</span>
    </span>
  );
};
