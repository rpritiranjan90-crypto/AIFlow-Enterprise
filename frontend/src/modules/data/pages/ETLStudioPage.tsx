import React, { useState } from 'react';
import { GitBranch, Play, CheckCircle2 } from 'lucide-react';
import { PageHeader } from '@/components/ui/PageHeader';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';

export const ETLStudioPage: React.FC = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [result, setResult] = useState<any>(null);

  const handleRunETL = () => {
    setIsRunning(true);
    setResult(null);

    setTimeout(() => {
      setIsRunning(false);
      setResult({
        job_id: 'job_9901',
        source: 'PostgreSQL://orders',
        destination: 'delta://lakehouse_sales_orders',
        mode: 'CDC Stream',
        rows_ingested: 45200,
        latency_ms: 840,
        status: 'succeeded',
      });
    }, 650);
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Visual ETL / ELT & Ingestion Studio"
        description="Build batch, CDC streaming, and API data pipelines with visual transformers and schema evolution"
        breadcrumbs={[{ label: 'AIFlow' }, { label: 'ETL Studio' }]}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card glow className="lg:col-span-2 space-y-4">
          <h3 className="text-base font-bold text-slate-100 flex items-center gap-2">
            <GitBranch className="w-4 h-4 text-brand-400" /> Pipeline Flow Nodes
          </h3>

          <div className="grid grid-cols-3 gap-3 text-xs font-mono text-center">
            <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
              <Badge variant="glow">Extract Source</Badge>
              <span className="font-bold text-slate-100 block">PostgreSQL orders DB</span>
              <span className="text-[10px] text-slate-400">CDC WAL Streaming</span>
            </div>

            <div className="p-4 bg-slate-950 rounded-xl border border-brand-500/30 space-y-2">
              <Badge variant="success">Transform Node</Badge>
              <span className="font-bold text-cyan-300 block">Cleanse & Mask PII</span>
              <span className="text-[10px] text-slate-400">Filter Null Values</span>
            </div>

            <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
              <Badge variant="glow">Load Target</Badge>
              <span className="font-bold text-slate-100 block">Delta Parquet S3</span>
              <span className="text-[10px] text-slate-400">Partition by Date</span>
            </div>
          </div>

          <Button variant="glow" isLoading={isRunning} leftIcon={<Play className="w-4 h-4" />} onClick={handleRunETL}>
            Execute Ingestion & Transformation Job
          </Button>
        </Card>

        <Card className="space-y-4 bg-slate-950/80">
          <h3 className="text-base font-bold text-slate-100 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Pipeline Execution Telemetry
          </h3>

          {result ? (
            <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 space-y-2 text-xs font-mono">
              <span className="text-emerald-400 font-bold block">✓ Status: {result.status.toUpperCase()}</span>
              <div className="flex justify-between text-slate-300">
                <span>Rows Ingested:</span>
                <span className="font-bold">{result.rows_ingested.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-slate-300">
                <span>Latency:</span>
                <span className="text-cyan-300 font-bold">{result.latency_ms} ms</span>
              </div>
            </div>
          ) : (
            <div className="p-12 text-center text-xs text-slate-500">
              Click "Execute Ingestion Job" to run pipeline.
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};
