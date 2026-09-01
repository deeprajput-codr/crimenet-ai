// ============================================================
// CrimeNet AI — Badge Component
// ============================================================
'use client';

import React from 'react';
import { cn } from '@/lib/utils';

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'success' | 'warning' | 'danger' | 'info' | 'purple' | 'outline';
  size?: 'sm' | 'md';
  dot?: boolean;
  pulse?: boolean;
}

export function Badge({
  children,
  variant = 'default',
  size = 'sm',
  dot = false,
  pulse = false,
  className,
  ...props
}: BadgeProps) {
  const variants = {
    default: 'bg-slate-500/15 text-slate-300 border-slate-500/30',
    success: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30',
    warning: 'bg-amber-500/15 text-amber-400 border-amber-500/30',
    danger: 'bg-red-500/15 text-red-400 border-red-500/30',
    info: 'bg-sky-500/15 text-sky-400 border-sky-500/30',
    purple: 'bg-purple-500/15 text-purple-400 border-purple-500/30',
    outline: 'bg-transparent text-slate-300 border-slate-500/40',
  };

  const sizes = {
    sm: 'px-2 py-0.5 text-[10px]',
    md: 'px-2.5 py-1 text-xs',
  };

  const dotColors = {
    default: 'bg-slate-400',
    success: 'bg-emerald-400',
    warning: 'bg-amber-400',
    danger: 'bg-red-400',
    info: 'bg-sky-400',
    purple: 'bg-purple-400',
    outline: 'bg-slate-400',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 font-medium rounded-full border',
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {dot && (
        <span className="relative flex h-2 w-2">
          {pulse && (
            <span className={cn(
              'animate-ping absolute inline-flex h-full w-full rounded-full opacity-75',
              dotColors[variant]
            )} />
          )}
          <span className={cn('relative inline-flex rounded-full h-2 w-2', dotColors[variant])} />
        </span>
      )}
      {children}
    </span>
  );
}

// Notification Badge (count)
interface NotificationBadgeProps {
  count: number;
  maxCount?: number;
  className?: string;
}

export function NotificationBadge({ count, maxCount = 99, className }: NotificationBadgeProps) {
  if (count <= 0) return null;

  const displayCount = count > maxCount ? `${maxCount}+` : count.toString();

  return (
    <span
      className={cn(
        'absolute -top-1 -right-1 inline-flex items-center justify-center min-w-[18px] h-[18px] px-1 text-[10px] font-bold text-white bg-alert-red rounded-full',
        className
      )}
    >
      {displayCount}
    </span>
  );
}
