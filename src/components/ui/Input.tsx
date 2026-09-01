// ============================================================
// CrimeNet AI — Input Component
// ============================================================
'use client';

import React from 'react';
import { cn } from '@/lib/utils';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  helperText?: string;
}

export function Input({
  label,
  error,
  icon,
  iconPosition = 'left',
  helperText,
  className,
  id,
  ...props
}: InputProps) {
  const inputId = id || label?.toLowerCase().replace(/\s+/g, '-');

  return (
    <div className="space-y-1.5">
      {label && (
        <label htmlFor={inputId} className="block text-sm font-medium text-slate-300">
          {label}
        </label>
      )}
      <div className="relative">
        {icon && iconPosition === 'left' && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
            {icon}
          </div>
        )}
        <input
          id={inputId}
          className={cn(
            'glass-input w-full px-4 py-2.5 text-sm',
            icon && iconPosition === 'left' && 'pl-10',
            icon && iconPosition === 'right' && 'pr-10',
            error && 'border-alert-red/50 focus:border-alert-red focus:shadow-[0_0_0_3px_rgba(239,68,68,0.15)]',
            className
          )}
          {...props}
        />
        {icon && iconPosition === 'right' && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">
            {icon}
          </div>
        )}
      </div>
      {error && <p className="text-xs text-alert-red">{error}</p>}
      {helperText && !error && <p className="text-xs text-slate-500">{helperText}</p>}
    </div>
  );
}

// Textarea variant
interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export function Textarea({ label, error, helperText, className, id, ...props }: TextareaProps) {
  const inputId = id || label?.toLowerCase().replace(/\s+/g, '-');

  return (
    <div className="space-y-1.5">
      {label && (
        <label htmlFor={inputId} className="block text-sm font-medium text-slate-300">
          {label}
        </label>
      )}
      <textarea
        id={inputId}
        className={cn(
          'glass-input w-full px-4 py-2.5 text-sm resize-none min-h-[100px]',
          error && 'border-alert-red/50',
          className
        )}
        {...props}
      />
      {error && <p className="text-xs text-alert-red">{error}</p>}
      {helperText && !error && <p className="text-xs text-slate-500">{helperText}</p>}
    </div>
  );
}

// Select variant
interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  options: { value: string; label: string }[];
}

export function Select({ label, error, options, className, id, ...props }: SelectProps) {
  const inputId = id || label?.toLowerCase().replace(/\s+/g, '-');

  return (
    <div className="space-y-1.5">
      {label && (
        <label htmlFor={inputId} className="block text-sm font-medium text-slate-300">
          {label}
        </label>
      )}
      <select
        id={inputId}
        className={cn(
          'glass-input w-full px-4 py-2.5 text-sm appearance-none bg-[url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 24 24\' fill=\'none\' stroke=\'%2394a3b8\' stroke-width=\'2\' stroke-linecap=\'round\' stroke-linejoin=\'round\'%3e%3cpolyline points=\'6 9 12 15 18 9\'%3e%3c/polyline%3e%3c/svg%3e")] bg-[length:16px] bg-[right_12px_center] bg-no-repeat pr-10',
          error && 'border-alert-red/50',
          className
        )}
        {...props}
      >
        {options.map(opt => (
          <option key={opt.value} value={opt.value}>{opt.label}</option>
        ))}
      </select>
      {error && <p className="text-xs text-alert-red">{error}</p>}
    </div>
  );
}
