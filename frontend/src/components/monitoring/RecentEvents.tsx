import React from 'react';

export interface SystemEvent {
  id: string;
  timestamp: string;
  type: 'info' | 'warning' | 'error';
  source: string;
  message: string;
}

interface RecentEventsProps {
  events: SystemEvent[];
}

export const RecentEvents: React.FC<RecentEventsProps> = ({ events }) => {
  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900/80 p-5 backdrop-blur-md">
      <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400">
        System Telemetry Event Stream
      </h3>
      <div className="mt-4 space-y-3">
        {events.map((event) => {
          const badgeClass =
            event.type === 'error'
              ? 'bg-rose-500/10 text-rose-400 border-rose-500/30'
              : event.type === 'warning'
              ? 'bg-amber-500/10 text-amber-400 border-amber-500/30'
              : 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30';

          return (
            <div key={event.id} className="flex items-start gap-3 border-b border-slate-800/50 pb-3 text-xs">
              <span className={`rounded-md border px-2 py-0.5 font-mono uppercase text-[10px] ${badgeClass}`}>
                {event.type}
              </span>
              <div className="flex-1">
                <div className="flex justify-between text-slate-400">
                  <span className="font-semibold text-slate-200">{event.source}</span>
                  <span className="text-[10px] text-slate-500">{event.timestamp}</span>
                </div>
                <p className="mt-1 text-slate-400">{event.message}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
