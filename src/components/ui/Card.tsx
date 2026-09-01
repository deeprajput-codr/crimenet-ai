// ============================================================
// CrimeNet AI — Card Component
// ============================================================
'use client';

import React from 'react';
import { cn } from '@/lib/utils';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'glow' | 'static' | 'danger' | 'success';
  padding?: 'none' | 'sm' | 'md' | 'lg';
  hover?: boolean;
}

export function Card({
  children,
  variant = 'default',
  padding = 'md',
  hover = true,
  className,
  ...props
}: CardProps) {
  const variants = {
    default: hover ? 'glass-card' : 'glass-card-static',
    glow: `glass-card animate-border-glow ${hover ? '' : ''}`,
    static: 'glass-card-static',
    danger: 'glass-card-static border-alert-red/30 bg-red-500/5',
    success: 'glass-card-static border-emerald-500/30 bg-emerald-500/5',
  };

  const paddings = {
    none: '',
    sm: 'p-3',
    md: 'p-5',
    lg: 'p-6',
  };

  return (
    <div
      className={cn(variants[variant], paddings[padding], className)}
      {...props}
    >
      {children}
    </div>
  );
}

// Card Header
export function CardHeader({ children, className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn('flex items-center justify-between mb-4', className)} {...props}>
      {children}
    </div>
  );
}

// Card Title
export function CardTitle({ children, className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3 className={cn('text-lg font-semibold text-white', className)} {...props}>
      {children}
    </h3>
  );
}

// Card Description
export function CardDescription({ children, className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p className={cn('text-sm text-slate-400', className)} {...props}>
      {children}
    </p>
  );
}

// Card Content
export function CardContent({ children, className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn('', className)} {...props}>
      {children}
    </div>
  );
}

// Card Footer
export function CardFooter({ children, className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn('flex items-center gap-3 mt-4 pt-4 border-t border-white/5', className)} {...props}>
      {children}
    </div>
  );
}
