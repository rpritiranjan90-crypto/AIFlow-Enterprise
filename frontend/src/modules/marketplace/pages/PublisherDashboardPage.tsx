import React from 'react';
import { DollarSign, Package, Download, Star, Sparkles } from 'lucide-react';
import { PageHeader } from '@/components/ui/PageHeader';
import { KpiCard } from '@/components/ui/KpiCard';
import { Button } from '@/components/ui/Button';

export const PublisherDashboardPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Publisher Portal & Revenue Analytics"
        description="Manage published assets, version releases, revenue payouts, and user reviews"
        breadcrumbs={[{ label: 'AIFlow' }, { label: 'Publisher Portal' }]}
        actions={
          <Button variant="glow" leftIcon={<Sparkles className="w-4 h-4" />}>
            Create New Commercial Listing
          </Button>
        }
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KpiCard title="Gross Sales Revenue" value="$14,820.00" icon={<DollarSign className="w-5 h-5 text-emerald-400" />} trend="up" description="70% Publisher Payout" />
        <KpiCard title="Active Listings" value="3 Assets" icon={<Package className="w-5 h-5" />} trend="neutral" description="Verified Publisher" />
        <KpiCard title="Total Installs" value="2,930 Installs" icon={<Download className="w-5 h-5" />} trend="up" description="+18% vs last month" />
        <KpiCard title="Average Rating" value="4.9 / 5.0" icon={<Star className="w-5 h-5 text-amber-400 fill-amber-400" />} trend="up" description="Across 142 Reviews" />
      </div>
    </div>
  );
};
