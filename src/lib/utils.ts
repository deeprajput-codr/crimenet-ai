// ============================================================
// CrimeNet AI — Utility Functions
// ============================================================

import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { format, formatDistanceToNow, parseISO } from 'date-fns';
import type { RiskLevel, AlertSeverity, CaseStatus, CrimeCategory } from '@/types/entities';

/** Tailwind class merge utility */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Format a date string */
export function formatDate(dateStr: string, fmt: string = 'dd MMM yyyy'): string {
  try {
    return format(parseISO(dateStr), fmt);
  } catch {
    return dateStr;
  }
}

/** Format date as relative time (e.g. "2 hours ago") */
export function formatRelativeTime(dateStr: string): string {
  try {
    return formatDistanceToNow(parseISO(dateStr), { addSuffix: true });
  } catch {
    return dateStr;
  }
}

/** Get risk level color classes */
export function getRiskColor(level: RiskLevel): string {
  const colors: Record<RiskLevel, string> = {
    critical: 'text-red-400 bg-red-500/10 border-red-500/30',
    high: 'text-orange-400 bg-orange-500/10 border-orange-500/30',
    medium: 'text-yellow-400 bg-yellow-500/10 border-yellow-500/30',
    low: 'text-blue-400 bg-blue-500/10 border-blue-500/30',
    none: 'text-slate-400 bg-slate-500/10 border-slate-500/30',
  };
  return colors[level] || colors.none;
}

/** Get alert severity color */
export function getSeverityColor(severity: AlertSeverity): string {
  const colors: Record<AlertSeverity, string> = {
    critical: 'text-red-400 bg-red-500/15 border-red-500/40',
    high: 'text-orange-400 bg-orange-500/15 border-orange-500/40',
    medium: 'text-amber-400 bg-amber-500/15 border-amber-500/40',
    low: 'text-sky-400 bg-sky-500/15 border-sky-500/40',
  };
  return colors[severity] || colors.low;
}

/** Get case status color */
export function getStatusColor(status: CaseStatus): string {
  const colors: Record<CaseStatus, string> = {
    active: 'text-emerald-400 bg-emerald-500/15 border-emerald-500/40',
    closed: 'text-slate-400 bg-slate-500/15 border-slate-500/40',
    cold: 'text-blue-400 bg-blue-500/15 border-blue-500/40',
    pending: 'text-amber-400 bg-amber-500/15 border-amber-500/40',
    'under-review': 'text-purple-400 bg-purple-500/15 border-purple-500/40',
  };
  return colors[status] || colors.pending;
}

/** Get crime category display label */
export function getCrimeCategoryLabel(category: CrimeCategory): string {
  const labels: Record<CrimeCategory, string> = {
    murder: 'Murder',
    robbery: 'Robbery',
    cybercrime: 'Cybercrime',
    narcotics: 'Narcotics',
    fraud: 'Fraud',
    kidnapping: 'Kidnapping',
    extortion: 'Extortion',
    terrorism: 'Terrorism',
    'human-trafficking': 'Human Trafficking',
    'organized-crime': 'Organized Crime',
    'arms-dealing': 'Arms Dealing',
    'money-laundering': 'Money Laundering',
    assault: 'Assault',
    theft: 'Theft',
    other: 'Other',
  };
  return labels[category] || 'Unknown';
}

/** Generate a mock ID */
export function generateId(): string {
  return `cn_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
}

/** Truncate text with ellipsis */
export function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength - 3) + '...';
}

/** Format a number with Indian comma system (lakhs/crores) */
export function formatIndianNumber(num: number): string {
  const str = num.toString();
  let lastThree = str.substring(str.length - 3);
  const remaining = str.substring(0, str.length - 3);
  if (remaining !== '') {
    lastThree = ',' + lastThree;
  }
  return remaining.replace(/\B(?=(\d{2})+(?!\d))/g, ',') + lastThree;
}

/** Animate a number counter */
export function animateValue(
  start: number,
  end: number,
  duration: number,
  callback: (value: number) => void
): void {
  const startTime = performance.now();
  const update = (currentTime: number) => {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
    const current = Math.round(start + (end - start) * eased);
    callback(current);
    if (progress < 1) {
      requestAnimationFrame(update);
    }
  };
  requestAnimationFrame(update);
}

/** Debounce a function */
export function debounce<T extends (...args: unknown[]) => unknown>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

/** Get risk score label */
export function getRiskLabel(score: number): RiskLevel {
  if (score >= 80) return 'critical';
  if (score >= 60) return 'high';
  if (score >= 40) return 'medium';
  if (score >= 20) return 'low';
  return 'none';
}

/** Delay (for simulating API calls) */
export function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/** Get node type color for graph */
export function getNodeColor(type: string): string {
  const colors: Record<string, string> = {
    criminal: '#ef4444',
    suspect: '#f97316',
    case: '#3b82f6',
    vehicle: '#22c55e',
    phone: '#a855f7',
    location: '#eab308',
    organization: '#06b6d4',
    evidence: '#ec4899',
    event: '#64748b',
  };
  return colors[type] || '#64748b';
}
