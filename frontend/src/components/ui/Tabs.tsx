import React from 'react';
import { motion } from 'framer-motion';

export interface TabItem {
  id: string;
  label: string;
  count?: number;
  icon?: React.ReactNode;
}

export interface TabsProps {
  tabs: TabItem[];
  activeTab: string;
  onChange: (id: string) => void;
}

export const Tabs: React.FC<TabsProps> = ({ tabs, activeTab, onChange }) => {
  return (
    <div className="flex space-x-1 border-b border-slate-800 pb-1 overflow-x-auto">
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => onChange(tab.id)}
            className={`relative flex items-center gap-2 px-4 py-2 text-sm font-medium transition-colors rounded-lg ${
              isActive
                ? 'text-brand-400'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
            }`}
          >
            {tab.icon}
            <span>{tab.label}</span>
            {tab.count !== undefined && (
              <span
                className={`px-1.5 py-0.5 text-xs rounded-full ${
                  isActive
                    ? 'bg-brand-500/20 text-brand-300'
                    : 'bg-slate-800 text-slate-400'
                }`}
              >
                {tab.count}
              </span>
            )}
            {isActive && (
              <motion.div
                layoutId="activeTabIndicator"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-500 rounded-full"
                transition={{ type: 'spring', stiffness: 500, damping: 35 }}
              />
            )}
          </button>
        );
      })}
    </div>
  );
};
