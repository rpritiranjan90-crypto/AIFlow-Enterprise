import React from 'react';

export interface AvatarProps {
  src?: string;
  name?: string;
  size?: 'sm' | 'md' | 'lg';
  status?: 'online' | 'offline' | 'busy';
}

export const Avatar: React.FC<AvatarProps> = ({
  src,
  name = 'User',
  size = 'md',
  status,
}) => {
  const getInitials = (n: string) => {
    return n
      .split(' ')
      .map((part) => part[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const sizeClasses = {
    sm: 'w-7 h-7 text-xs',
    md: 'w-9 h-9 text-sm',
    lg: 'w-11 h-11 text-base',
  };

  const statusClasses = {
    online: 'bg-emerald-500',
    offline: 'bg-slate-500',
    busy: 'bg-rose-500',
  };

  return (
    <div className="relative inline-block">
      {src ? (
        <img
          src={src}
          alt={name}
          className={`${sizeClasses[size]} rounded-full object-cover border border-slate-700`}
        />
      ) : (
        <div
          className={`${sizeClasses[size]} rounded-full bg-gradient-to-tr from-brand-600 to-cyan-600 flex items-center justify-center font-bold text-white shadow-sm border border-slate-700`}
        >
          {getInitials(name)}
        </div>
      )}
      {status && (
        <span
          className={`absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full ring-2 ring-slate-900 ${statusClasses[status]}`}
        />
      )}
    </div>
  );
};
