import React from 'react';
import { Loader2 } from 'lucide-react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'glow';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  leftIcon,
  rightIcon,
  className = '',
  disabled,
  ...props
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed select-none rounded-lg';

  const variantStyles = {
    primary: 'bg-brand-500 hover:bg-brand-600 text-white focus:ring-brand-500 shadow-sm hover:shadow-glow',
    secondary: 'bg-slate-800 hover:bg-slate-700 text-slate-100 dark:bg-slate-800 dark:hover:bg-slate-700 focus:ring-slate-500 border border-slate-700',
    outline: 'border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800/80 text-slate-700 dark:text-slate-200 focus:ring-brand-500',
    ghost: 'hover:bg-slate-100 dark:hover:bg-slate-800/60 text-slate-700 dark:text-slate-300 focus:ring-brand-500',
    danger: 'bg-rose-600 hover:bg-rose-700 text-white focus:ring-rose-500 shadow-sm',
    glow: 'bg-gradient-to-r from-brand-500 to-brand-cyan hover:from-brand-600 hover:to-cyan-600 text-white shadow-glow focus:ring-brand-500',
  };

  const sizeStyles = {
    sm: 'px-3 py-1.5 text-xs gap-1.5',
    md: 'px-4 py-2 text-sm gap-2',
    lg: 'px-6 py-3 text-base gap-2.5',
  };

  return (
    <button
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <Loader2 className="w-4 h-4 animate-spin text-current" />
      ) : (
        leftIcon
      )}
      <span>{children}</span>
      {!isLoading && rightIcon}
    </button>
  );
};
