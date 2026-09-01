// ============================================================
// CrimeNet AI — Table Component
// ============================================================
'use client';

import React, { useState, useMemo } from 'react';
import { ChevronUp, ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface Column<T> {
  key: string;
  header: string;
  sortable?: boolean;
  width?: string;
  render?: (item: T, index: number) => React.ReactNode;
  align?: 'left' | 'center' | 'right';
}

interface TableProps<T> {
  columns: Column<T>[];
  data: T[];
  pageSize?: number;
  onRowClick?: (item: T) => void;
  emptyMessage?: string;
  className?: string;
  stickyHeader?: boolean;
  isLoading?: boolean;
}

export function Table<T extends Record<string, unknown>>({
  columns,
  data,
  pageSize = 10,
  onRowClick,
  emptyMessage = 'No data available',
  className,
  stickyHeader = false,
  isLoading = false,
}: TableProps<T>) {
  const [sortKey, setSortKey] = useState<string | null>(null);
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('asc');
  const [currentPage, setCurrentPage] = useState(1);

  const sortedData = useMemo(() => {
    if (!sortKey) return data;
    return [...data].sort((a, b) => {
      const aVal = a[sortKey];
      const bVal = b[sortKey];
      if (aVal === bVal) return 0;
      if (aVal == null) return 1;
      if (bVal == null) return -1;
      const cmp = aVal < bVal ? -1 : 1;
      return sortDir === 'asc' ? cmp : -cmp;
    });
  }, [data, sortKey, sortDir]);

  const totalPages = Math.ceil(sortedData.length / pageSize);
  const paginatedData = sortedData.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const handleSort = (key: string) => {
    if (sortKey === key) {
      setSortDir(d => d === 'asc' ? 'desc' : 'asc');
    } else {
      setSortKey(key);
      setSortDir('asc');
    }
  };

  return (
    <div className={cn('glass-card-static overflow-hidden', className)}>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className={cn(
              'border-b border-white/10',
              stickyHeader && 'sticky top-0 z-10 bg-navy-800'
            )}>
              {columns.map(col => (
                <th
                  key={col.key}
                  className={cn(
                    'px-4 py-3 text-xs font-semibold uppercase tracking-wider text-slate-400',
                    col.align === 'center' && 'text-center',
                    col.align === 'right' && 'text-right',
                    col.sortable && 'cursor-pointer select-none hover:text-cyber-blue transition-colors',
                  )}
                  style={{ width: col.width }}
                  onClick={() => col.sortable && handleSort(col.key)}
                >
                  <div className={cn(
                    'flex items-center gap-1',
                    col.align === 'center' && 'justify-center',
                    col.align === 'right' && 'justify-end',
                  )}>
                    {col.header}
                    {col.sortable && sortKey === col.key && (
                      sortDir === 'asc' ? <ChevronUp size={14} /> : <ChevronDown size={14} />
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              Array.from({ length: 5 }).map((_, i) => (
                <tr key={i} className="border-b border-white/5">
                  {columns.map(col => (
                    <td key={col.key} className="px-4 py-3">
                      <div className="skeleton h-4 w-3/4" />
                    </td>
                  ))}
                </tr>
              ))
            ) : paginatedData.length === 0 ? (
              <tr>
                <td colSpan={columns.length} className="px-4 py-12 text-center text-slate-500">
                  {emptyMessage}
                </td>
              </tr>
            ) : (
              paginatedData.map((item, index) => (
                <tr
                  key={index}
                  className={cn(
                    'border-b border-white/5 transition-colors',
                    onRowClick && 'cursor-pointer hover:bg-white/5',
                  )}
                  onClick={() => onRowClick?.(item)}
                >
                  {columns.map(col => (
                    <td
                      key={col.key}
                      className={cn(
                        'px-4 py-3 text-sm',
                        col.align === 'center' && 'text-center',
                        col.align === 'right' && 'text-right',
                      )}
                    >
                      {col.render
                        ? col.render(item, (currentPage - 1) * pageSize + index)
                        : (item[col.key] as React.ReactNode)}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between px-4 py-3 border-t border-white/5">
          <span className="text-xs text-slate-500">
            Showing {(currentPage - 1) * pageSize + 1}–{Math.min(currentPage * pageSize, sortedData.length)} of {sortedData.length}
          </span>
          <div className="flex items-center gap-1">
            <button
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="p-1.5 rounded-md text-slate-400 hover:text-white hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronLeft size={16} />
            </button>
            {Array.from({ length: Math.min(5, totalPages) }).map((_, i) => {
              const page = currentPage <= 3 ? i + 1 : currentPage - 2 + i;
              if (page > totalPages) return null;
              return (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={cn(
                    'w-8 h-8 rounded-md text-xs font-medium transition-colors',
                    page === currentPage
                      ? 'bg-cyber-blue/20 text-cyber-blue'
                      : 'text-slate-400 hover:text-white hover:bg-white/10'
                  )}
                >
                  {page}
                </button>
              );
            })}
            <button
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="p-1.5 rounded-md text-slate-400 hover:text-white hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
