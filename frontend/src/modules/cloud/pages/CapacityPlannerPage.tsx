import React from 'react';
import { Cpu, HardDrive, Zap, BarChart2 } from 'lucide-react';
import { PageHeader } from '@/components/ui/PageHeader';
import { KpiCard } from '@/components/ui/KpiCard';

export const CapacityPlannerPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Capacity Management & Autoscaling Planner"
        description="Global cluster resource utilization metrics across CPU, Memory, GPU, Storage, and HPA autoscaling policies"
        breadcrumbs={[{ label: 'AIFlow' }, { label: 'Capacity Planner' }]}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KpiCard title="CPU Utilization" value="42.8%" icon={<Cpu className="w-5 h-5" />} trend="neutral" description="38 Kubernetes Nodes" />
        <KpiCard title="Memory Allocation" value="56.4%" icon={<BarChart2 className="w-5 h-5" />} trend="neutral" description="128 GB Total RAM" />
        <KpiCard title="GPU Resource Pool" value="12 NVIDIA H100" icon={<Zap className="w-5 h-5 text-amber-400" />} trend="up" description="Sub-10ms Inference" />
        <KpiCard title="Storage Capacity" value="1.4 TB / 10 TB" icon={<HardDrive className="w-5 h-5" />} trend="neutral" description="NVMe Persistent Disks" />
      </div>
    </div>
  );
};
