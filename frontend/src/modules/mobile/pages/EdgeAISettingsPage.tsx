import React from 'react';
import { PageHeader } from '@/components/ui/PageHeader';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';

export const EdgeAISettingsPage: React.FC = () => {
  const models = [
    { name: 'Llama-3-Micro-1B-INT8', task: 'Offline LLM Inference', size: '450 MB', status: 'Downloaded' },
    { name: 'MobileOCR-v2-ONNX', task: 'Local OCR Field Parsing', size: '85 MB', status: 'Downloaded' },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="On-Device Edge AI Runtime & Model Manager"
        description="Manage on-device micro-LLM weights, local OCR models, local speech recognition, and NPU acceleration"
        breadcrumbs={[{ label: 'AIFlow' }, { label: 'Edge AI Settings' }]}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {models.map((m) => (
          <Card key={m.name} glow className="space-y-4">
            <div className="flex justify-between items-center">
              <Badge variant="glow">{m.task}</Badge>
              <Badge variant="success">{m.status.toUpperCase()}</Badge>
            </div>
            <h3 className="font-bold text-base text-slate-100">{m.name}</h3>
            <span className="text-xs font-mono text-slate-400 block">Model Size: {m.size} • Quantization: INT8 / ONNX</span>
          </Card>
        ))}
      </div>
    </div>
  );
};
