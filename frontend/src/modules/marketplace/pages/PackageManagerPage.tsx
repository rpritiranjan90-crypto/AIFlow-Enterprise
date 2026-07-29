import React from 'react';
import { RefreshCw, Trash2, Package } from 'lucide-react';
import { PageHeader } from '@/components/ui/PageHeader';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

export const PackageManagerPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Package Manager"
        description="Manage installed extensions, update versions, and review dependencies."
        breadcrumbs={[{ label: 'Ecosystem' }, { label: 'Package Manager' }]}
      />

      <Card glow className="space-y-4">
        <h3 className="font-bold text-slate-100 flex items-center gap-2">
          <Package className="w-5 h-5 text-brand-400" />
          Installed Packages
        </h3>
        
        <div className="divide-y divide-slate-800 border-t border-slate-800">
          <div className="py-4 flex items-center justify-between">
            <div>
              <h4 className="font-bold text-slate-200">Slack Advanced Notify</h4>
              <p className="text-xs text-slate-400">v1.2.0 (Latest: v1.2.1)</p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" className="text-xs" leftIcon={<RefreshCw className="w-3 h-3" />}>Update</Button>
              <Button variant="outline" className="text-xs text-rose-400 border-rose-900/30" leftIcon={<Trash2 className="w-3 h-3" />}>Uninstall</Button>
            </div>
          </div>

          <div className="py-4 flex items-center justify-between">
            <div>
              <h4 className="font-bold text-slate-200">CyberSec Code Auditor</h4>
              <p className="text-xs text-slate-400">v2.0.0 (Up to date)</p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" className="text-xs" disabled leftIcon={<RefreshCw className="w-3 h-3" />}>Update</Button>
              <Button variant="outline" className="text-xs text-rose-400 border-rose-900/30" leftIcon={<Trash2 className="w-3 h-3" />}>Uninstall</Button>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};
