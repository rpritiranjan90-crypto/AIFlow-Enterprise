import React, { useState, useRef, useEffect } from 'react';

export interface DropdownOption {
  id: string;
  label: string;
  icon?: React.ReactNode;
  danger?: boolean;
}

export interface DropdownProps {
  trigger: React.ReactNode;
  options: DropdownOption[];
  onSelect: (option: DropdownOption) => void;
  align?: 'left' | 'right';
}

export const Dropdown: React.FC<DropdownProps> = ({
  trigger,
  options,
  onSelect,
  align = 'right',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative inline-block text-left" ref={menuRef}>
      <div onClick={() => setIsOpen(!isOpen)}>{trigger}</div>
      {isOpen && (
        <div
          className={`absolute ${
            align === 'right' ? 'right-0' : 'left-0'
          } mt-2 w-48 rounded-xl bg-slate-900 border border-slate-800 shadow-2xl z-50 py-1 divide-y divide-slate-800/60`}
        >
          {options.map((opt) => (
            <button
              key={opt.id}
              onClick={() => {
                onSelect(opt);
                setIsOpen(false);
              }}
              className={`w-full flex items-center gap-2 px-3 py-2 text-xs font-medium transition-colors ${
                opt.danger
                  ? 'text-rose-400 hover:bg-rose-500/10'
                  : 'text-slate-300 hover:bg-slate-800 hover:text-slate-100'
              }`}
            >
              {opt.icon}
              <span>{opt.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
