import React from 'react';

export interface StatCardProps {
  label: string;
  stat: string;
  substat?: string;
  icon?: React.ReactNode;
}

export const StatCard: React.FC<StatCardProps> = ({
  label,
  stat,
  substat,
  icon,
}) => {
  return (
    <div className="flex items-center gap-4 p-4 rounded-xl bg-slate-900/50 border border-slate-800/80">
      {icon && (
        <div className="p-3 rounded-lg bg-slate-800/60 text-cyan-400">
          {icon}
        </div>
      )}
      <div>
        <div className="text-xs text-slate-400 font-medium">{label}</div>
        <div className="text-lg font-semibold text-slate-100">{stat}</div>
        {substat && <div className="text-[11px] text-slate-500">{substat}</div>}
      </div>
    </div>
  );
};
