import React from 'react';

interface GaugeChartProps {
  title: string;
  value: number; // 0 to 100
  label?: string;
  color?: string;
}

export const GaugeChart: React.FC<GaugeChartProps> = ({
  title,
  value,
  label = '%',
  color = '#10b981',
}) => {
  const percentage = Math.min(Math.max(value, 0), 100);
  const strokeDashoffset = 251.2 - (251.2 * percentage) / 100;

  return (
    <div className="flex flex-col items-center rounded-xl border border-slate-800 bg-slate-900/80 p-4 backdrop-blur-md">
      <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">{title}</span>
      <div className="relative mt-2 flex h-28 w-28 items-center justify-center">
        <svg className="h-full w-full -rotate-90 transform" viewBox="0 0 100 100">
          <circle
            cx="50"
            cy="50"
            r="40"
            stroke="currentColor"
            strokeWidth="8"
            className="text-slate-800"
            fill="transparent"
          />
          <circle
            cx="50"
            cy="50"
            r="40"
            stroke={color}
            strokeWidth="8"
            strokeDasharray="251.2"
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            fill="transparent"
            className="transition-all duration-700 ease-out"
          />
        </svg>
        <div className="absolute flex flex-col items-center">
          <span className="text-xl font-bold text-white">{percentage.toFixed(1)}</span>
          <span className="text-[10px] text-slate-500">{label}</span>
        </div>
      </div>
    </div>
  );
};
