import React from 'react';
import { Bell } from 'lucide-react';
import { PageHeader } from '@/components/ui/PageHeader';
import { Table, Column } from '@/components/ui/Table';
import { Badge } from '@/components/ui/Badge';
import { PushNotificationItem } from '../types/mobile';

export const NotificationCenterPage: React.FC = () => {
  const notifications: PushNotificationItem[] = [
    { id: 'pnotif_01', deviceId: 'mdev_01', title: 'Pending AI Human Approval', body: 'High-risk $14,850 SAP invoice requires your approval.', type: 'Approval', isRead: false, createdAt: '2026-07-29 12:00' },
  ];

  const columns: Column<PushNotificationItem>[] = [
    {
      key: 'title',
      header: 'Push Notification Title',
      render: (r) => (
        <div className="flex items-center gap-2">
          <Bell className="w-4 h-4 text-brand-400" />
          <span className="font-bold text-slate-100">{r.title}</span>
        </div>
      ),
    },
    {
      key: 'body',
      header: 'Alert Content',
      render: (r) => <span className="text-xs text-slate-300">{r.body}</span>,
    },
    {
      key: 'type',
      header: 'Category',
      render: (r) => <Badge variant="warning">{r.type}</Badge>,
    },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Push Notification Platform & Alert Center"
        description="Real-time APNS & FCM push notifications for workflow approvals, security alerts, and disaster recovery"
        breadcrumbs={[{ label: 'AIFlow' }, { label: 'Notification Center' }]}
      />

      <Table columns={columns} data={notifications} keyExtractor={(n) => n.id} />
    </div>
  );
};
