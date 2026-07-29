import React from 'react';
import { ShoppingCart, PackageSearch, TrendingUp, Bot } from 'lucide-react';
import { PageHeader } from '@/components/ui/PageHeader';
import { Card } from '@/components/ui/Card';
import { KpiCard } from '@/components/ui/KpiCard';

export const RetailPortalPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Retail & E-Commerce Portal"
        description="Order automation, inventory optimization, marketing workflows, and sales forecasting."
        breadcrumbs={[{ label: 'Industry' }, { label: 'Retail' }]}
      />

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <KpiCard title="Orders Processed" value="18,240" icon={<ShoppingCart className="w-5 h-5 text-cyan-400" />} trend="up" description="Today's volume" />
        <KpiCard title="Inventory Alerts" value="5" icon={<PackageSearch className="w-5 h-5 text-amber-400" />} trend="down" description="Low stock items" />
        <KpiCard title="Sales Forecast" value="+12%" icon={<TrendingUp className="w-5 h-5 text-emerald-400" />} trend="up" description="Next 30 days" />
        <KpiCard title="Commerce API" value="Healthy" icon={<Activity className="w-5 h-5 text-brand-400" />} trend="neutral" description="Shopify Sync" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card glow className="col-span-2 space-y-4">
          <h3 className="font-bold text-slate-100 flex items-center gap-2">
            <Activity className="w-4 h-4 text-cyan-400" />
            Order Fulfillment Pipeline
          </h3>
          <div className="h-48 flex items-center justify-center border-t border-slate-800 text-slate-500 text-sm">
            [ Workflow Visual Placeholder ]
          </div>
        </Card>
        
        <Card className="bg-slate-950/80 space-y-4">
          <h3 className="font-bold text-slate-100 flex items-center gap-2">
            <Bot className="w-4 h-4 text-emerald-400" />
            Retail Copilot
          </h3>
          <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 text-sm text-slate-300">
            Copilot is active. Providing customer support assistance and dynamic pricing recommendations.
          </div>
        </Card>
      </div>
    </div>
  );
};

// Mock import
function Activity(props: any) {
  return <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline></svg>;
}
