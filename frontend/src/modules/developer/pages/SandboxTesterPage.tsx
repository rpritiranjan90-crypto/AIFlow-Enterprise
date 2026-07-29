import React, { useState } from 'react';
import { Play, Terminal, Cpu } from 'lucide-react';
import { PageHeader } from '@/components/ui/PageHeader';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

export const SandboxTesterPage: React.FC = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [testOutput, setTestOutput] = useState<any>(null);

  const handleRunSandbox = () => {
    setIsRunning(true);
    setTestOutput(null);

    setTimeout(() => {
      setIsRunning(false);
      setTestOutput({
        plugin_id: 'plugin_custom_ocr',
        status: 'passed',
        latency_ms: 140,
        validation_report: {
          manifest: 'valid',
          permissions: 'approved (vault:read, http:outbound)',
          digital_signature: 'verified (RSA 4096)',
          output_payload: { processed: true, items_extracted: 42, text: 'Sample OCR document text output' },
        },
      });
    }, 700);
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Plugin Sandbox & Test Studio"
        description="Execute mock workflow runs and connector simulations in an isolated security sandbox"
        breadcrumbs={[{ label: 'AIFlow' }, { label: 'Sandbox Tester' }]}
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card glow className="space-y-4">
          <h3 className="text-base font-bold text-slate-100 flex items-center gap-2">
            <Cpu className="w-4 h-4 text-brand-400" /> Sandbox Mock Input Payload
          </h3>
          <textarea
            rows={8}
            defaultValue={JSON.stringify({ file_url: 'https://aiflow.enterprise.io/docs/sample.pdf', max_pages: 5 }, null, 2)}
            className="w-full rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono text-cyan-300 p-3 focus:border-brand-500 focus:outline-none"
          />
          <Button variant="glow" isLoading={isRunning} leftIcon={<Play className="w-4 h-4" />} onClick={handleRunSandbox}>
            Run Isolated Sandbox Test
          </Button>
        </Card>

        <Card className="space-y-4 bg-slate-950/80">
          <h3 className="text-base font-bold text-slate-100 flex items-center gap-2">
            <Terminal className="w-4 h-4 text-cyan-400" /> Validation Report & Output Logs
          </h3>
          {testOutput ? (
            <div className="space-y-3 font-mono text-xs text-slate-300">
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 space-y-1">
                <span className="text-emerald-400 font-bold block">✓ Status: {testOutput.status.toUpperCase()}</span>
                <span>Latency: {testOutput.latency_ms} ms</span>
              </div>
              <pre className="p-3 bg-slate-900 rounded-xl border border-slate-800 text-cyan-300 overflow-x-auto">
                {JSON.stringify(testOutput.validation_report, null, 2)}
              </pre>
            </div>
          ) : (
            <div className="p-12 text-center text-xs text-slate-500">
              Click "Run Isolated Sandbox Test" to inspect validation reports.
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};
