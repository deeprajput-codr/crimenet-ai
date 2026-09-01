// ============================================================
// CrimeNet AI — Additional UI Components
// Tabs, Tooltip, SearchBar, StatCard, RiskMeter, etc.
// ============================================================
'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { cn, animateValue } from '@/lib/utils';

// ============================================================
// Tabs
// ============================================================
interface TabItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
  count?: number;
}

interface TabsProps {
  items: TabItem[];
  activeTab: string;
  onChange: (id: string) => void;
  className?: string;
}

export function Tabs({ items, activeTab, onChange, className }: TabsProps) {
  return (
    <div className={cn('flex gap-1 p-1 rounded-lg bg-white/5', className)}>
      {items.map(item => (
        <button
          key={item.id}
          onClick={() => onChange(item.id)}
          className={cn(
            'relative flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all duration-200',
            activeTab === item.id
              ? 'text-white'
              : 'text-slate-400 hover:text-slate-200'
          )}
        >
          {activeTab === item.id && (
            <motion.div
              layoutId="activeTab"
              className="absolute inset-0 rounded-md bg-cyber-blue/15 border border-cyber-blue/30"
              transition={{ duration: 0.2, ease: 'easeOut' }}
            />
          )}
          <span className="relative z-10 flex items-center gap-2">
            {item.icon}
            {item.label}
            {item.count !== undefined && (
              <span className="ml-1 px-1.5 py-0.5 text-[10px] rounded-full bg-white/10">
                {item.count}
              </span>
            )}
          </span>
        </button>
      ))}
    </div>
  );
}

// ============================================================
// Tooltip
// ============================================================
interface TooltipProps {
  content: string;
  children: React.ReactNode;
  position?: 'top' | 'bottom' | 'left' | 'right';
}

export function Tooltip({ content, children, position = 'top' }: TooltipProps) {
  const [show, setShow] = useState(false);
  
  const positions = {
    top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
    bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
    left: 'right-full top-1/2 -translate-y-1/2 mr-2',
    right: 'left-full top-1/2 -translate-y-1/2 ml-2',
  };

  return (
    <div
      className="relative inline-flex"
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
    >
      {children}
      <AnimatePresence>
        {show && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.1 }}
            className={cn(
              'absolute z-50 px-2.5 py-1.5 text-xs font-medium text-white bg-slate-800 border border-white/10 rounded-md whitespace-nowrap pointer-events-none',
              positions[position]
            )}
          >
            {content}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ============================================================
// SearchBar
// ============================================================
interface SearchBarProps {
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  onSubmit?: (value: string) => void;
  suggestions?: string[];
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export function SearchBar({
  placeholder = 'Search...',
  value,
  onChange,
  onSubmit,
  suggestions = [],
  className,
  size = 'md',
}: SearchBarProps) {
  const [showSuggestions, setShowSuggestions] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const filteredSuggestions = suggestions.filter(s =>
    s.toLowerCase().includes(value.toLowerCase())
  ).slice(0, 5);

  const sizes = {
    sm: 'py-2 pl-9 pr-4 text-sm',
    md: 'py-2.5 pl-10 pr-4 text-sm',
    lg: 'py-3.5 pl-12 pr-6 text-base',
  };

  const iconSizes = {
    sm: 'left-3 w-4 h-4',
    md: 'left-3 w-4 h-4',
    lg: 'left-4 w-5 h-5',
  };

  return (
    <div className={cn('relative', className)}>
      <Search className={cn('absolute top-1/2 -translate-y-1/2 text-slate-400', iconSizes[size])} />
      <input
        ref={inputRef}
        type="text"
        value={value}
        onChange={e => {
          onChange(e.target.value);
          setShowSuggestions(true);
        }}
        onFocus={() => setShowSuggestions(true)}
        onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
        onKeyDown={e => {
          if (e.key === 'Enter' && onSubmit) {
            onSubmit(value);
            setShowSuggestions(false);
          }
        }}
        placeholder={placeholder}
        className={cn('w-full glass-input rounded-lg', sizes[size])}
      />
      
      <AnimatePresence>
        {showSuggestions && filteredSuggestions.length > 0 && value && (
          <motion.div
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            className="absolute top-full left-0 right-0 mt-1 glass-card-static rounded-lg overflow-hidden z-50"
          >
            {filteredSuggestions.map((suggestion, i) => (
              <button
                key={i}
                className="w-full px-4 py-2.5 text-sm text-left text-slate-300 hover:bg-white/5 hover:text-white transition-colors"
                onClick={() => {
                  onChange(suggestion);
                  onSubmit?.(suggestion);
                  setShowSuggestions(false);
                }}
              >
                <Search size={14} className="inline mr-2 text-slate-500" />
                {suggestion}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ============================================================
// StatCard
// ============================================================
interface StatCardProps {
  title: string;
  value: number;
  prefix?: string;
  suffix?: string;
  icon: React.ReactNode;
  trend?: { value: number; isPositive: boolean };
  color?: 'blue' | 'green' | 'red' | 'purple' | 'amber';
  className?: string;
}

export function StatCard({ title, value, prefix, suffix, icon, trend, color = 'blue', className }: StatCardProps) {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    animateValue(0, value, 1500, setDisplayValue);
  }, [value]);

  const colors = {
    blue: 'from-sky-500/20 to-blue-600/20 border-sky-500/30',
    green: 'from-emerald-500/20 to-teal-600/20 border-emerald-500/30',
    red: 'from-red-500/20 to-rose-600/20 border-red-500/30',
    purple: 'from-purple-500/20 to-violet-600/20 border-purple-500/30',
    amber: 'from-amber-500/20 to-orange-600/20 border-amber-500/30',
  };

  const iconColors = {
    blue: 'text-sky-400 bg-sky-500/20',
    green: 'text-emerald-400 bg-emerald-500/20',
    red: 'text-red-400 bg-red-500/20',
    purple: 'text-purple-400 bg-purple-500/20',
    amber: 'text-amber-400 bg-amber-500/20',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn(
        'relative overflow-hidden rounded-xl border bg-gradient-to-br p-5',
        colors[color],
        className
      )}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-medium uppercase tracking-wider text-slate-400">{title}</p>
          <p className="mt-2 text-3xl font-bold text-white tabular-nums">
            {prefix}{displayValue.toLocaleString()}{suffix}
          </p>
          {trend && (
            <div className={cn(
              'mt-2 flex items-center gap-1 text-xs font-medium',
              trend.isPositive ? 'text-emerald-400' : 'text-red-400'
            )}>
              {trend.isPositive ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
              {trend.value}% from last month
            </div>
          )}
        </div>
        <div className={cn('p-2.5 rounded-lg', iconColors[color])}>
          {icon}
        </div>
      </div>

      {/* Decorative gradient orb */}
      <div className="absolute -bottom-4 -right-4 w-24 h-24 rounded-full bg-white/5 blur-2xl" />
    </motion.div>
  );
}

// ============================================================
// RiskMeter (Circular gauge)
// ============================================================
interface RiskMeterProps {
  score: number; // 0-100
  size?: number;
  strokeWidth?: number;
  label?: string;
  className?: string;
}

export function RiskMeter({ score, size = 120, strokeWidth = 8, label, className }: RiskMeterProps) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;

  const getColor = (s: number) => {
    if (s >= 80) return '#ef4444';
    if (s >= 60) return '#f97316';
    if (s >= 40) return '#f59e0b';
    if (s >= 20) return '#3b82f6';
    return '#22c55e';
  };

  return (
    <div className={cn('flex flex-col items-center gap-2', className)}>
      <svg width={size} height={size} className="transform -rotate-90">
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="rgba(255,255,255,0.05)"
          strokeWidth={strokeWidth}
        />
        {/* Progress circle */}
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={getColor(score)}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1.5, ease: 'easeOut' }}
          style={{
            filter: `drop-shadow(0 0 6px ${getColor(score)}60)`,
          }}
        />
        {/* Score text */}
        <text
          x={size / 2}
          y={size / 2}
          textAnchor="middle"
          dominantBaseline="central"
          fill="white"
          fontSize={size * 0.22}
          fontWeight="bold"
          className="transform rotate-90 origin-center"
        >
          {score}
        </text>
      </svg>
      {label && <span className="text-xs font-medium text-slate-400">{label}</span>}
    </div>
  );
}

// ============================================================
// ConfidenceBar
// ============================================================
interface ConfidenceBarProps {
  score: number; // 0-100
  label?: string;
  showValue?: boolean;
  size?: 'sm' | 'md';
  className?: string;
}

export function ConfidenceBar({ score, label, showValue = true, size = 'md', className }: ConfidenceBarProps) {
  const getColor = (s: number) => {
    if (s >= 80) return 'bg-emerald-400';
    if (s >= 60) return 'bg-sky-400';
    if (s >= 40) return 'bg-amber-400';
    return 'bg-red-400';
  };

  return (
    <div className={cn('space-y-1', className)}>
      {(label || showValue) && (
        <div className="flex items-center justify-between">
          {label && <span className="text-xs text-slate-400">{label}</span>}
          {showValue && <span className="text-xs font-mono text-slate-300">{score}%</span>}
        </div>
      )}
      <div className={cn('w-full rounded-full bg-white/5', size === 'sm' ? 'h-1.5' : 'h-2.5')}>
        <motion.div
          className={cn('h-full rounded-full', getColor(score))}
          initial={{ width: 0 }}
          animate={{ width: `${score}%` }}
          transition={{ duration: 1, ease: 'easeOut' }}
        />
      </div>
    </div>
  );
}

// ============================================================
// Timeline
// ============================================================
interface TimelineItemData {
  id: string;
  title: string;
  description: string;
  timestamp: string;
  icon?: React.ReactNode;
  color?: string;
  metadata?: { label: string; value: string }[];
}

interface TimelineProps {
  items: TimelineItemData[];
  className?: string;
}

export function Timeline({ items, className }: TimelineProps) {
  return (
    <div className={cn('relative', className)}>
      {/* Vertical line */}
      <div className="absolute left-5 top-0 bottom-0 w-px bg-gradient-to-b from-cyber-blue/40 via-purple-accent/30 to-transparent" />

      <div className="space-y-6">
        {items.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="relative flex gap-4 pl-12"
          >
            {/* Dot */}
            <div
              className="absolute left-3.5 top-1 w-3 h-3 rounded-full border-2 border-cyber-blue bg-navy-800"
              style={{ borderColor: item.color || 'var(--cyber-blue)' }}
            />

            <div className="glass-card-static rounded-lg p-4 flex-1">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-2">
                  {item.icon}
                  <h4 className="text-sm font-semibold text-white">{item.title}</h4>
                </div>
                <time className="text-xs text-slate-500 whitespace-nowrap">{item.timestamp}</time>
              </div>
              <p className="mt-1.5 text-sm text-slate-400">{item.description}</p>
              {item.metadata && (
                <div className="mt-3 flex flex-wrap gap-2">
                  {item.metadata.map((m, i) => (
                    <span key={i} className="px-2 py-0.5 text-[10px] rounded-full bg-white/5 text-slate-400">
                      {m.label}: <span className="text-slate-300">{m.value}</span>
                    </span>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

// ============================================================
// FileUpload
// ============================================================
interface FileUploadProps {
  onFilesSelected: (files: File[]) => void;
  accept?: string;
  multiple?: boolean;
  label?: string;
  className?: string;
}

export function FileUpload({
  onFilesSelected,
  accept = '.pdf,.csv,.json,.txt',
  multiple = false,
  label = 'Drop files here or click to upload',
  className,
}: FileUploadProps) {
  const [isDragging, setIsDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => setIsDragging(false);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const files = Array.from(e.dataTransfer.files);
    onFilesSelected(files);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    onFilesSelected(files);
  };

  return (
    <div
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onClick={() => inputRef.current?.click()}
      className={cn(
        'relative flex flex-col items-center justify-center gap-3 p-8 rounded-xl border-2 border-dashed cursor-pointer transition-all duration-200',
        isDragging
          ? 'border-cyber-blue bg-cyber-blue/5'
          : 'border-white/10 hover:border-white/20 hover:bg-white/[0.02]',
        className
      )}
    >
      <div className="p-3 rounded-xl bg-white/5">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-slate-400">
          <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M17 8l-5-5-5 5M12 3v12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
      <div className="text-center">
        <p className="text-sm text-slate-300">{label}</p>
        <p className="mt-1 text-xs text-slate-500">PDF, CSV, JSON, TXT</p>
      </div>
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        multiple={multiple}
        onChange={handleChange}
        className="hidden"
      />
    </div>
  );
}
