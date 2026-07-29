import React, { useState } from 'react';
import { ChevronRight, ChevronDown } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { ExecutionNodeRecord, ExecutionLogRecord } from '../types/execution';

export interface ExecutionTimelineProps {
  nodes: ExecutionNodeRecord[];
  logs: ExecutionLogRecord[];
  durationMs: number;
}

export const ExecutionTimeline: React.FC<ExecutionTimelineProps> = ({
  nodes,
  logs,
  durationMs,
}) => {
  const [expandedNodeId, setExpandedNodeId] = useState<string | null>(nodes[0]?.nodeId || null);

  const getStatusBadge = (status: string) => {
    if (status === 'completed') return <Badge variant="success">Completed</Badge>;
    if (status === 'failed') return <Badge variant="error">Failed</Badge>;
    if (status === 'running') return <Badge variant="warning">Running...</Badge>;
    return <Badge variant="neutral">Queued</Badge>;
  };

  return (
    <div className="space-y-6">
      {/* Node Step Timeline */}
      <div className="space-y-3">
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Node Step Execution Plan</h4>
        <div className="space-y-2">
          {nodes.map((node, idx) => {
            const isExpanded = expandedNodeId === node.nodeId;
            const percentWidth = Math.max(5, Math.min(100, (node.durationMs / (durationMs || 1)) * 100));

            return (
              <div key={node.nodeId} className="rounded-xl bg-slate-900 border border-slate-800 overflow-hidden">
                <div
                  onClick={() => setExpandedNodeId(isExpanded ? null : node.nodeId)}
                  className="p-3 flex items-center justify-between cursor-pointer hover:bg-slate-800/50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <span className="w-5 h-5 rounded-full bg-slate-800 text-slate-400 font-mono text-xs flex items-center justify-center font-bold">
                      {idx + 1}
                    </span>
                    <div>
                      <h5 className="text-sm font-semibold text-slate-100">{node.nodeName}</h5>
                      <span className="text-[10px] text-slate-400 font-mono">Type: {node.nodeType}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="hidden sm:flex flex-col items-end w-32">
                      <span className="font-mono text-xs text-slate-300">{node.durationMs} ms</span>
                      <div className="w-full bg-slate-800 rounded-full h-1 mt-1">
                        <div className="bg-brand-500 h-full rounded-full" style={{ width: `${percentWidth}%` }} />
                      </div>
                    </div>

                    {getStatusBadge(node.status)}
                    {isExpanded ? <ChevronDown className="w-4 h-4 text-slate-400" /> : <ChevronRight className="w-4 h-4 text-slate-400" />}
                  </div>
                </div>

                {isExpanded && (
                  <div className="p-4 bg-slate-950 border-t border-slate-800 space-y-3 text-xs">
                    {node.errorMessage && (
                      <div className="p-3 rounded-lg bg-rose-500/10 border border-rose-500/30 text-rose-400 font-mono text-xs">
                        Error: {node.errorMessage}
                      </div>
                    )}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <span className="text-slate-400 font-semibold block mb-1">Input Configuration Payload</span>
                        <pre className="p-3 rounded-lg bg-slate-900 border border-slate-800 font-mono text-[11px] text-slate-300 overflow-x-auto">
                          {node.inputJson || '{}'}
                        </pre>
                      </div>
                      <div>
                        <span className="text-slate-400 font-semibold block mb-1">Output Result Payload</span>
                        <pre className="p-3 rounded-lg bg-slate-900 border border-slate-800 font-mono text-[11px] text-cyan-300 overflow-x-auto">
                          {node.outputJson || '{}'}
                        </pre>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Raw Log Telemetry Stream */}
      <div className="space-y-2">
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Execution Log Telemetry</h4>
        <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 max-h-48 overflow-y-auto font-mono text-xs space-y-1">
          {logs.map((log) => (
            <div key={log.id} className="flex items-center gap-3">
              <span className="text-slate-500 text-[10px]">{log.timestamp.split('T')[1]?.slice(0, 8) || '12:00:00'}</span>
              <span className={log.level === 'ERROR' ? 'text-rose-400 font-bold' : 'text-brand-400 font-bold'}>
                [{log.level}]
              </span>
              <span className="text-slate-300">{log.message}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
