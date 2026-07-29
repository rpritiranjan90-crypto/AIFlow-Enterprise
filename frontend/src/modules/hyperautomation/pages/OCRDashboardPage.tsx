import React from 'react';
import { FileText } from 'lucide-react';
import { PageHeader } from '@/components/ui/PageHeader';
import { Table, Column } from '@/components/ui/Table';
import { Badge } from '@/components/ui/Badge';
import { OCRJobItem } from '../types/hyperautomation';

export const OCRDashboardPage: React.FC = () => {
  const jobs: OCRJobItem[] = [
    { id: 'ocr_01', documentName: 'vendor_invoice_9901.pdf', extractedText: 'INVOICE #99402 Amount: $14,850.00', confidenceScore: 0.985, status: 'completed', createdAt: '2026-07-29 12:30' },
  ];

  const columns: Column<OCRJobItem>[] = [
    {
      key: 'documentName',
      header: 'Document File Name',
      render: (r) => (
        <div className="flex items-center gap-2">
          <FileText className="w-4 h-4 text-brand-400" />
          <span className="font-bold text-slate-100">{r.documentName}</span>
        </div>
      ),
    },
    {
      key: 'extractedText',
      header: 'OCR Text Snippet',
      render: (r) => <span className="font-mono text-xs text-slate-300 truncate max-w-xs block">{r.extractedText}</span>,
    },
    {
      key: 'confidenceScore',
      header: 'OCR Confidence',
      render: (r) => <span className="font-mono text-xs text-emerald-400 font-bold">{(r.confidenceScore * 100).toFixed(1)}%</span>,
    },
    {
      key: 'status',
      header: 'Job Status',
      render: (r) => <Badge variant="success">{r.status.toUpperCase()}</Badge>,
    },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Multi-Language OCR Engine Dashboard"
        description="Monitor OCR text extraction batch jobs, table parsing accuracy, and layout analysis logs"
        breadcrumbs={[{ label: 'AIFlow' }, { label: 'OCR Dashboard' }]}
      />

      <Table columns={columns} data={jobs} keyExtractor={(j) => j.id} />
    </div>
  );
};
