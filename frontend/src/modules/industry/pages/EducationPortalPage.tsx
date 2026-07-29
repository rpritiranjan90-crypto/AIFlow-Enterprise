import React from 'react';
import { GraduationCap, Users, BookOpen, Activity } from 'lucide-react';
import { PageHeader } from '@/components/ui/PageHeader';
import { Card } from '@/components/ui/Card';
import { KpiCard } from '@/components/ui/KpiCard';

export const EducationPortalPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Education Automation Portal"
        description="Student onboarding, admissions, course workflows, and faculty automation."
        breadcrumbs={[{ label: 'Industry' }, { label: 'Education' }]}
      />

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <KpiCard title="Active Students" value="45,210" icon={<Users className="w-5 h-5 text-violet-400" />} trend="up" description="Current semester" />
        <KpiCard title="Admissions Queue" value="1,240" icon={<GraduationCap className="w-5 h-5 text-emerald-400" />} trend="down" description="Pending review" />
        <KpiCard title="Active Courses" value="3,200" icon={<BookOpen className="w-5 h-5 text-brand-400" />} trend="neutral" description="Canvas LMS" />
        <KpiCard title="FERPA Status" value="Compliant" icon={<Activity className="w-5 h-5 text-emerald-400" />} trend="neutral" description="Policy pack v1.0" />
      </div>

      <Card glow className="space-y-4">
        <h3 className="font-bold text-slate-100 flex items-center gap-2">
          <Activity className="w-4 h-4 text-violet-400" />
          Admissions & Enrollment Workflow
        </h3>
        <div className="h-64 flex items-center justify-center border-t border-slate-800 text-slate-500 text-sm">
          [ Workflow Visual Placeholder ]
        </div>
      </Card>
    </div>
  );
};
