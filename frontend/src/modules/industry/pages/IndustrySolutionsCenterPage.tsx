import React from 'react';
import { Heart, Landmark, Factory, ShoppingCart, Building2, GraduationCap, Download } from 'lucide-react';
import { PageHeader } from '@/components/ui/PageHeader';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';

const SOLUTIONS = [
  { id: 'health', name: 'Healthcare Suite', icon: <Heart className="text-rose-400" />, desc: 'Patient workflows & claims automation', versions: ['v1.0', 'v1.1', 'v2.0'] },
  { id: 'finance', name: 'Banking & Finance', icon: <Landmark className="text-emerald-400" />, desc: 'Loan processing & KYC automation', versions: ['v1.0'] },
  { id: 'mfg', name: 'Manufacturing', icon: <Factory className="text-amber-400" />, desc: 'Predictive maintenance & SCADA', versions: ['v1.0', 'v1.2'] },
  { id: 'retail', name: 'Retail & E-Com', icon: <ShoppingCart className="text-cyan-400" />, desc: 'Order automation & forecasting', versions: ['v1.0'] },
  { id: 'gov', name: 'Government', icon: <Building2 className="text-blue-400" />, desc: 'Citizen portals & public records', versions: ['v1.0', 'v1.1'] },
  { id: 'edu', name: 'Education', icon: <GraduationCap className="text-violet-400" />, desc: 'Student onboarding & LMS', versions: ['v1.0'] },
];

export const IndustrySolutionsCenterPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Industry Solutions Marketplace"
        description="Browse and deploy pre-configured vertical solutions with workflows, compliance packs, and AI copilots."
        breadcrumbs={[{ label: 'Industry' }, { label: 'Solutions Center' }]}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {SOLUTIONS.map(sol => (
          <Card key={sol.id} glow className="space-y-4">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-slate-900 border border-slate-700 flex items-center justify-center shrink-0">
                {sol.icon}
              </div>
              <div>
                <h3 className="font-bold text-slate-100">{sol.name}</h3>
                <p className="text-xs text-slate-400 leading-tight mt-1">{sol.desc}</p>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-2 pt-2 border-t border-slate-800">
              {sol.versions.map(v => (
                <Badge key={v} variant="neutral">{v}</Badge>
              ))}
            </div>

            <Button variant="glow" className="w-full text-xs" leftIcon={<Download className="w-4 h-4"/>}>
              Deploy Solution
            </Button>
          </Card>
        ))}
      </div>
    </div>
  );
};
