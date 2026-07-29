import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Radio, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { ExecutionTimeline } from './ExecutionTimeline';
import { ExecutionDetail, WsExecutionMessage } from '../types/execution';

export const LiveExecutionMonitor: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [execution, setExecution] = useState<ExecutionDetail>({
    id: id || 'exec_9901',
    workflowId: 'wf_01',
    workspaceId: 'ws_prod_01',
    status: 'completed',
    triggerType: 'webhook',
    startedAt: new Date().toISOString(),
    finishedAt: new Date().toISOString(),
    durationMs: 1240,
    createdAt: new Date().toISOString(),
    nodes: [
      { id: 'ex_1', executionId: id || 'exec_9901', nodeId: 'n1', nodeName: 'Manual Trigger', nodeType: 'manual_trigger', status: 'completed', durationMs: 50, inputJson: '{}', outputJson: '{"status": "started"}', retryCount: 0 },
      { id: 'ex_2', executionId: id || 'exec_9901', nodeId: 'n2', nodeName: 'Salesforce AI Enrichment', nodeType: 'ai_agent', status: 'completed', durationMs: 840, inputJson: '{"model": "gpt-4o"}', outputJson: '{"enriched": true, "lead_score": 98}', retryCount: 0 },
      { id: 'ex_3', executionId: id || 'exec_9901', nodeId: 'n3', nodeName: 'Slack Alert Notice', nodeType: 'slack', status: 'completed', durationMs: 350, inputJson: '{"channel": "#sales-alerts"}', outputJson: '{"delivered": true}', retryCount: 0 },
    ],
    logs: [
      { id: 'l1', executionId: id || 'exec_9901', level: 'INFO', message: 'DAG Compiled successfully (3 nodes)', timestamp: new Date().toISOString() },
      { id: 'l2', executionId: id || 'exec_9901', level: 'INFO', message: 'Executing step 2 [Salesforce AI Enrichment]', timestamp: new Date().toISOString() },
      { id: 'l3', executionId: id || 'exec_9901', level: 'INFO', message: 'Workflow execution completed in 1240ms', timestamp: new Date().toISOString() },
    ],
  });

  const [wsConnected, setWsConnected] = useState(false);

  useEffect(() => {
    const wsUrl = `ws://${window.location.hostname}:8000/api/v1/ws/executions/${id || 'exec_9901'}`;
    const ws = new WebSocket(wsUrl);

    ws.onopen = () => {
      setWsConnected(true);
    };

    ws.onmessage = (event) => {
      try {
        const msg: WsExecutionMessage = JSON.parse(event.data);
        if (msg.type === 'EXECUTION_STARTED') {
          setExecution((prev) => ({ ...prev, status: 'running' }));
        } else if (msg.type === 'NODE_FINISHED' && msg.node_id) {
          setExecution((prev) => ({
            ...prev,
            nodes: prev.nodes.map((n) =>
              n.nodeId === msg.node_id ? { ...n, status: (msg.status as any) || 'completed', durationMs: msg.duration_ms || 100 } : n
            ),
          }));
        } else if (msg.type === 'EXECUTION_COMPLETED') {
          setExecution((prev) => ({ ...prev, status: 'completed', durationMs: msg.duration_ms || prev.durationMs }));
        }
      } catch (e) {
        console.error('WebSocket parse error', e);
      }
    };

    ws.onclose = () => setWsConnected(false);
    return () => ws.close();
  }, [id]);

  return (
    <div className="space-y-6">
      {/* Top Header Controls */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded-xl bg-slate-900 border border-slate-800">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate('/executions')} className="p-1.5 rounded-lg text-slate-400 hover:text-slate-100 hover:bg-slate-800">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono font-bold text-sm text-brand-400">{execution.id}</span>
              <Badge variant={execution.status === 'completed' ? 'success' : 'warning'}>{execution.status.toUpperCase()}</Badge>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">Workflow: {execution.workflowId} • Trigger: {execution.triggerType}</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 text-xs text-slate-400">
            <Radio className={`w-3.5 h-3.5 ${wsConnected ? 'text-emerald-400 animate-pulse' : 'text-slate-600'}`} />
            <span>{wsConnected ? 'WebSocket Live Stream' : 'Mock Stream'}</span>
          </div>
          <Button variant="outline" size="sm" leftIcon={<RefreshCw className="w-3.5 h-3.5" />}>
            Replay Run
          </Button>
        </div>
      </div>

      {/* Timeline Component */}
      <ExecutionTimeline nodes={execution.nodes} logs={execution.logs} durationMs={execution.durationMs} />
    </div>
  );
};
