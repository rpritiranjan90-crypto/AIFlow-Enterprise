import React from 'react';
import { ShoppingBag } from 'lucide-react';
import { PageHeader } from '@/components/ui/PageHeader';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';

export const AssetDetailsPage: React.FC = () => {
  return (
    <div className="space-y-6 max-w-4xl">
      <PageHeader
        title="Enterprise Document OCR Extractor Node"
        description="Verified Plugin by Enterprise AI Labs • RSA 4096 Signed Package"
        breadcrumbs={[{ label: 'AIFlow' }, { label: 'Marketplace' }, { label: 'Asset Details' }]}
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card glow className="md:col-span-2 space-y-4">
          <Badge variant="glow">Workflow Node Plugin</Badge>
          <h2 className="text-xl font-bold text-slate-100">Enterprise Document OCR Extractor Node</h2>
          <p className="text-xs text-slate-300 leading-relaxed font-sans">
            High-precision OCR document text extraction for PDF and image scans. Supports multi-page document parsing, structured field extraction, and direct JSON formatting.
          </p>

          <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
            <h4 className="text-xs font-bold text-slate-200">Verified Publisher Guarantee</h4>
            <span className="text-xs text-slate-400 block">
              ✓ Scanned for malware & vulnerabilities • RSA 4096 Digital Signature Verified
            </span>
          </div>
        </Card>

        <Card glow className="space-y-4 flex flex-col justify-between">
          <div className="space-y-2">
            <span className="text-slate-400 text-xs block">Commercial License Price</span>
            <div className="font-mono text-2xl font-bold text-emerald-400">$49.00 / month</div>
            <span className="text-[10px] text-slate-500 block">Includes 25 Workspace Seat Licenses</span>
          </div>

          <Button variant="glow" leftIcon={<ShoppingBag className="w-4 h-4" />}>
            Proceed to Stripe Checkout
          </Button>
        </Card>
      </div>
    </div>
  );
};
