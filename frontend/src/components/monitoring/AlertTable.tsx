import React from 'react';
import { AlertTriangle, CheckCircle, Info } from 'lucide-react';

export interface AlertItem {
  id: string;
  name: string;
  severity: 'critical' | 'warning' | 'info';
  summary: string;
  activeSince: string;
  runbookUrl: string;
}

interface AlertTableProps {
  alerts: AlertItem[];
}

export const AlertTable: React.FC<AlertTableProps> = ({ alerts }) => {
  if (!alerts || alerts.length === 0) {
    return (
      <div className="flex items-center gap-3 rounded-xl border border-slate-800 bg-slate-900/80 p-5 text-sm text-emerald-400">
        <CheckCircle className="h-5 w-5 text-emerald-400" />
        <span>No active Prometheus alerts triggering across the platform.</span>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-xl border border-slate-800 bg-slate-900/80 backdrop-blur-md">
      <div className="border-b border-slate-800 px-5 py-3">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400">
          Active Prometheus Alert Rules ({alerts.length})
        </h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-950/60 text-slate-400 uppercase tracking-wider">
            <tr>
              <th className="px-4 py-3">Severity</th>
              <th className="px-4 py-3">Alert Name</th>
              <th className="px-4 py-3">Summary</th>
              <th className="px-4 py-3">Active Since</th>
              <th className="px-4 py-3 text-right">Runbook</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60 text-slate-300">
            {alerts.map((alert) => (
              <tr key={alert.id} className="hover:bg-slate-800/40">
                <td className="px-4 py-3">
                  <span
                    className={`inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 font-semibold ${
                      alert.severity === 'critical'
                        ? 'bg-rose-500/10 text-rose-400 border border-rose-500/30'
                        : alert.severity === 'warning'
                        ? 'bg-amber-500/10 text-amber-400 border border-amber-500/30'
                        : 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/30'
                    }`}
                  >
                    <AlertTriangle className="h-3 w-3" />
                    <span className="capitalize">{alert.severity}</span>
                  </span>
                </td>
                <td className="px-4 py-3 font-semibold text-white">{alert.name}</td>
                <td className="px-4 py-3 text-slate-400">{alert.summary}</td>
                <td className="px-4 py-3 text-slate-500">{alert.activeSince}</td>
                <td className="px-4 py-3 text-right">
                  <a
                    href={alert.runbookUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-cyan-400 hover:underline"
                  >
                    Runbook &rarr;
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
