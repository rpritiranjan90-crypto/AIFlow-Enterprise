import React from 'react';
import { Table as TableIcon } from 'lucide-react';
import { PageHeader } from '@/components/ui/PageHeader';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';

export const DocumentStudioPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Intelligent Document Processing (IDP) Studio"
        description="Extract structured fields, tabular data, checkboxes, and signatures from invoices, receipts, and contracts"
        breadcrumbs={[{ label: 'AIFlow' }, { label: 'Document IDP Studio' }]}
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card glow className="space-y-4">
          <div className="flex justify-between items-center">
            <Badge variant="glow">Invoice Parser Model</Badge>
            <span className="text-xs font-mono text-emerald-400 font-bold">Confidence: 98.5%</span>
          </div>

          <h3 className="text-base font-bold text-slate-100">Sample Vendor Invoice PDF</h3>
          <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2 text-xs font-mono">
            <div className="flex justify-between">
              <span className="text-slate-400">Invoice Number:</span>
              <span className="text-slate-100 font-bold">#99402</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Vendor Name:</span>
              <span className="text-slate-100 font-bold">Enterprise AI Supplies Ltd</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Total Amount:</span>
              <span className="text-emerald-400 font-bold">$14,850.00 USD</span>
            </div>
          </div>
        </Card>

        <Card glow className="space-y-4">
          <h3 className="text-base font-bold text-slate-100 flex items-center gap-2">
            <TableIcon className="w-4 h-4 text-brand-400" /> Extracted Line Items Table
          </h3>
          <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-2 text-xs font-mono">
            <div className="flex justify-between border-b border-slate-800 pb-1 text-slate-400">
              <span>Item Description</span>
              <span>Qty</span>
              <span>Amount</span>
            </div>
            <div className="flex justify-between text-slate-200">
              <span>OCR Server Enterprise License</span>
              <span>1</span>
              <span>$14,850.00</span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};
