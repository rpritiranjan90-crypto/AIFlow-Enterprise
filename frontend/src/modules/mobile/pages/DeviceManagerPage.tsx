import React from 'react';
import { Smartphone, Trash2 } from 'lucide-react';
import { PageHeader } from '@/components/ui/PageHeader';
import { Table, Column } from '@/components/ui/Table';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { MobileDeviceItem } from '../types/mobile';

export const DeviceManagerPage: React.FC = () => {
  const devices: MobileDeviceItem[] = [
    { id: 'mdev_01', userId: 'usr_01', deviceName: 'Executive iPhone 16 Pro', platform: 'iOS', osVersion: 'iOS 18.1', status: 'active', lastSyncAt: '2026-07-29' },
    { id: 'mdev_02', userId: 'usr_02', deviceName: 'Field Tablet Galaxy Tab S9', platform: 'Android', osVersion: 'Android 15', status: 'active', lastSyncAt: '2026-07-29' },
  ];

  const columns: Column<MobileDeviceItem>[] = [
    {
      key: 'deviceName',
      header: 'Device Name',
      render: (r) => (
        <div className="flex items-center gap-2">
          <Smartphone className="w-4 h-4 text-brand-400" />
          <span className="font-bold text-slate-100">{r.deviceName}</span>
        </div>
      ),
    },
    {
      key: 'platform',
      header: 'Platform & OS',
      render: (r) => <span className="font-mono text-xs text-cyan-300">{r.platform} ({r.osVersion})</span>,
    },
    {
      key: 'status',
      header: 'Device Status',
      render: (r) => <Badge variant="success">ACTIVE</Badge>,
    },
    {
      key: 'id',
      header: 'Remote Security Actions',
      render: (r) => (
        <Button variant="outline" size="sm" leftIcon={<Trash2 className="w-3.5 h-3.5 text-rose-400" />}>
          Remote Wipe
        </Button>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Zero-Trust Edge Device Management & Remote Wipe"
        description="Register iOS/Android devices, enforce biometric policies, monitor device health, and initiate remote wipe"
        breadcrumbs={[{ label: 'AIFlow' }, { label: 'Device Management' }]}
      />

      <Table columns={columns} data={devices} keyExtractor={(d) => d.id} />
    </div>
  );
};
