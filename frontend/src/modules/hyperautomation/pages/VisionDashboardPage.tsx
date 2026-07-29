import React from 'react';
import { Eye } from 'lucide-react';
import { PageHeader } from '@/components/ui/PageHeader';
import { Table, Column } from '@/components/ui/Table';
import { Badge } from '@/components/ui/Badge';
import { VisionDetectionItem } from '../types/hyperautomation';

export const VisionDashboardPage: React.FC = () => {
  const visionItems: VisionDetectionItem[] = [
    { id: 'vis_01', imageName: 'ui_screen_capture.png', detectedObjectsCount: 4, qrCodeDetected: 'https://aiflow.enterprise.io/auth/qr_9901', status: 'completed', createdAt: '2026-07-29 12:40' },
  ];

  const columns: Column<VisionDetectionItem>[] = [
    {
      key: 'imageName',
      header: 'Source Image / Screen Capture',
      render: (r) => (
        <div className="flex items-center gap-2">
          <Eye className="w-4 h-4 text-brand-400" />
          <span className="font-bold text-slate-100">{r.imageName}</span>
        </div>
      ),
    },
    {
      key: 'detectedObjectsCount',
      header: 'Objects Detected',
      render: (r) => <Badge variant="glow">{r.detectedObjectsCount} UI Elements</Badge>,
    },
    {
      key: 'qrCodeDetected',
      header: 'Barcode / QR Code',
      render: (r) => <span className="font-mono text-xs text-cyan-300">{r.qrCodeDetected}</span>,
    },
    {
      key: 'status',
      header: 'Status',
      render: (r) => <Badge variant="success">{r.status.toUpperCase()}</Badge>,
    },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Computer Vision & Barcode / QR Recognition"
        description="Object detection, barcode/QR code scanning, template matching, and screen element recognition"
        breadcrumbs={[{ label: 'AIFlow' }, { label: 'Computer Vision' }]}
      />

      <Table columns={columns} data={visionItems} keyExtractor={(v) => v.id} />
    </div>
  );
};
