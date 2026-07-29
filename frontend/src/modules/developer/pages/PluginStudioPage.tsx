import React, { useState } from 'react';
import { Upload, FileText } from 'lucide-react';
import { PageHeader } from '@/components/ui/PageHeader';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

export const PluginStudioPage: React.FC = () => {
  const [manifestText, setManifestText] = useState(
    JSON.stringify(
      {
        id: 'plugin_custom_ocr',
        name: 'Document OCR Extractor Node',
        version: '1.2.0',
        author: 'Enterprise AI Labs',
        category: 'Workflow Node',
        entryPoint: 'dist/index.js',
        permissions: ['vault:read', 'http:outbound'],
      },
      null,
      2
    )
  );

  return (
    <div className="space-y-6">
      <PageHeader
        title="Plugin Studio & Manifest Editor"
        description="Configure plugin manifests (plugin.json), digital signatures, and release packages"
        breadcrumbs={[{ label: 'AIFlow' }, { label: 'Plugin Studio' }]}
        actions={
          <Button variant="glow" leftIcon={<Upload className="w-4 h-4" />}>
            Publish Plugin Package
          </Button>
        }
      />

      <Card glow className="space-y-4">
        <h3 className="text-base font-bold text-slate-100 flex items-center gap-2">
          <FileText className="w-4 h-4 text-brand-400" /> plugin.json Manifest Definition
        </h3>
        <textarea
          rows={12}
          value={manifestText}
          onChange={(e) => setManifestText(e.target.value)}
          className="w-full rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono text-cyan-300 p-4 focus:border-brand-500 focus:outline-none leading-relaxed"
        />
      </Card>
    </div>
  );
};
