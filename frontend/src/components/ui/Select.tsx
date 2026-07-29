import React from 'react';

export interface SelectOption {
  value: string;
  label: string;
}

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options: SelectOption[];
  error?: string;
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(({
  label,
  options,
  error,
  className = '',
  id,
  ...props
}, ref) => {
  const selectId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

  return (
    <div className="w-full space-y-1.5">
      {label && (
        <label htmlFor={selectId} className="block text-xs font-semibold uppercase tracking-wider text-slate-400">
          {label}
        </label>
      )}
      <select
        ref={ref}
        id={selectId}
        className={`w-full rounded-lg border bg-slate-900/60 dark:bg-slate-950/70 border-slate-800 text-slate-100 focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500 text-sm px-3.5 py-2.5 transition-all ${
          error ? 'border-rose-500' : ''
        } ${className}`}
        {...props}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value} className="bg-slate-900 text-slate-100">
            {opt.label}
          </option>
        ))}
      </select>
      {error && <p className="text-xs text-rose-500 font-medium">{error}</p>}
    </div>
  );
});

Select.displayName = 'Select';
