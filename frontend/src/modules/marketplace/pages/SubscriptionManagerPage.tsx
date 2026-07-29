import React from 'react';
import { Check } from 'lucide-react';
import { PageHeader } from '@/components/ui/PageHeader';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';

export const SubscriptionManagerPage: React.FC = () => {
  const plans = [
    { name: 'Free Tier', price: '$0', seats: '3 Seats', features: ['5 Active Workflows', 'Standard Node Catalog', 'Community Support'], current: false },
    { name: 'Professional', price: '$49/mo', seats: '10 Seats', features: ['25 Active Workflows', 'AI Agent Runtime', 'Email & Slack Alerts'], current: false },
    { name: 'Enterprise Cloud', price: '$499/mo', seats: '25 Seats', features: ['Unlimited Workflows', 'Multi-Region Failover', 'SSO & Vault Security', '24/7 Dedicated SRE'], current: true },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Subscription Tier & Workspace Seat Manager"
        description="Choose workspace subscription tier (Free, Pro, Business, Enterprise Cloud) and allocate user seat licenses"
        breadcrumbs={[{ label: 'AIFlow' }, { label: 'Subscriptions' }]}
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {plans.map((plan) => (
          <Card key={plan.name} glow={plan.current} className="flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <h3 className="font-bold text-lg text-slate-100">{plan.name}</h3>
                {plan.current && <Badge variant="success">Current Plan</Badge>}
              </div>
              <div className="font-mono text-2xl font-bold text-brand-400">{plan.price}</div>
              <span className="text-xs text-slate-400 font-mono block">{plan.seats} Included</span>

              <div className="pt-3 border-t border-slate-800 space-y-2 text-xs text-slate-300">
                {plan.features.map((f) => (
                  <div key={f} className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span>{f}</span>
                  </div>
                ))}
              </div>
            </div>

            <Button variant={plan.current ? 'outline' : 'glow'} disabled={plan.current}>
              {plan.current ? 'Active Workspace Plan' : 'Upgrade Plan'}
            </Button>
          </Card>
        ))}
      </div>
    </div>
  );
};
