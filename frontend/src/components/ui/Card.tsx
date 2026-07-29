import React from 'react';

export interface CardProps {
  children: React.ReactNode;
  className?: string;
  glow?: boolean;
  onClick?: () => void;
}

export const Card: React.FC<CardProps> = ({ children, className = '', glow = false, onClick }) => {
  return (
    <div
      onClick={onClick}
      className={`rounded-xl bg-slate-900/60 dark:bg-slate-900/80 backdrop-blur-md border border-slate-800/80 dark:border-slate-800 p-5 shadow-card transition-all duration-200 ${
        glow ? 'hover:border-brand-500/50 hover:shadow-glow' : ''
      } ${onClick ? 'cursor-pointer hover:bg-slate-800/60' : ''} ${className}`}
    >
      {children}
    </div>
  );
};
