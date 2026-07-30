import React from 'react';

interface DataPoint {
  label: string;
  value: number;
}

interface LiveChartProps {
  title: string;
  data: DataPoint[];
  color?: string;
  height?: number;
  unit?: string;
}

export const LiveChart: React.FC<LiveChartProps> = ({
  title,
  data,
  color = '#06b6d4',
  height = 140,
  unit = '',
}) => {
  if (!data || data.length === 0) {
    return (
      <div className="flex h-36 items-center justify-center rounded-xl border border-slate-800 bg-slate-900/80 p-4 text-xs text-slate-500">
        No telemetry data available
      </div>
    );
  }

  const maxValue = Math.max(...data.map((d) => d.value), 1);
  const points = data
    .map((d, i) => {
      const x = (i / (data.length - 1)) * 300;
      const y = height - (d.value / maxValue) * (height - 20);
      return `${x},${y}`;
    })
    .join(' ');

  const areaPoints = `0,${height} ${points} 300,${height}`;

  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900/80 p-4 backdrop-blur-md">
      <div className="flex items-center justify-between pb-2">
        <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400">{title}</h4>
        <span className="text-xs font-bold text-slate-200">
          {data[data.length - 1]?.value}
          {unit}
        </span>
      </div>
      <svg className="w-full overflow-visible" viewBox={`0 0 300 ${height}`}>
        <defs>
          <linearGradient id={`gradient-${title.replace(/\s+/g, '')}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity="0.4" />
            <stop offset="100%" stopColor={color} stopOpacity="0.0" />
          </linearGradient>
        </defs>
        <polygon points={areaPoints} fill={`url(#gradient-${title.replace(/\s+/g, '')})`} />
        <polyline fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" points={points} />
      </svg>
    </div>
  );
};
