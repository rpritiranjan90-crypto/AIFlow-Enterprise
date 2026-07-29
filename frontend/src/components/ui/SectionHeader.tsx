import React from 'react';

export interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  rightSlot?: React.ReactNode;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  subtitle,
  rightSlot,
}) => {
  return (
    <div className="flex items-center justify-between mb-4">
      <div>
        <h3 className="text-base font-semibold text-slate-100">{title}</h3>
        {subtitle && <p className="text-xs text-slate-400 mt-0.5">{subtitle}</p>}
      </div>
      {rightSlot}
    </div>
  );
};
