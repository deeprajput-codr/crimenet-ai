// ============================================================
// CrimeNet AI — Dashboard Layout Component
// ============================================================
'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import { ChevronRight, Bell, Search } from 'lucide-react';
import Link from 'next/link';
import { Sidebar } from './Sidebar';
import { NotificationBadge } from '@/components/ui/Badge';
import { cn } from '@/lib/utils';

const routeLabels: Record<string, string> = {
  '/dashboard': 'Dashboard',
  '/dashboard/search': 'Intelligence Search',
  '/dashboard/extraction': 'Entity Extraction',
  '/dashboard/resolution': 'Entity Resolution',
  '/dashboard/graph': 'Knowledge Graph',
  '/dashboard/network': 'Network Analysis',
  '/dashboard/timeline': 'Investigation Timeline',
  '/dashboard/evidence': 'Evidence Center',
  '/dashboard/copilot': 'AI Copilot',
  '/dashboard/heatmap': 'Crime Heatmap',
  '/dashboard/vehicles': 'Vehicle Tracking',
  '/dashboard/alerts': 'Smart Alerts',
  '/dashboard/reports': 'Brief Generator',
  '/dashboard/analytics': 'Analytics',
  '/dashboard/admin': 'Admin Panel',
};

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const breadcrumbs = pathname.split('/').filter(Boolean).map((segment, index, arr) => {
    const href = '/' + arr.slice(0, index + 1).join('/');
    const label = routeLabels[href] || segment.charAt(0).toUpperCase() + segment.slice(1);
    return { href, label };
  });

  return (
    <div className="flex min-h-screen bg-navy-900">
      <Sidebar />

      {/* Main Content */}
      <main className="flex-1 ml-[260px] transition-all duration-200">
        {/* Top bar */}
        <header className="sticky top-0 z-30 flex items-center justify-between h-16 px-6 border-b border-white/5 glass">
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-2 text-sm">
            {breadcrumbs.map((crumb, i) => (
              <React.Fragment key={crumb.href}>
                {i > 0 && <ChevronRight size={14} className="text-slate-600" />}
                {i === breadcrumbs.length - 1 ? (
                  <span className="text-white font-medium">{crumb.label}</span>
                ) : (
                  <Link href={crumb.href} className="text-slate-400 hover:text-white transition-colors">
                    {crumb.label}
                  </Link>
                )}
              </React.Fragment>
            ))}
          </nav>

          {/* Right actions */}
          <div className="flex items-center gap-3">
            {/* Quick search */}
            <button className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm text-slate-400 bg-white/5 hover:bg-white/10 transition-colors border border-white/5">
              <Search size={14} />
              <span className="hidden lg:inline">Quick search...</span>
              <kbd className="hidden lg:inline-flex items-center px-1.5 py-0.5 text-[10px] font-mono bg-white/5 rounded border border-white/10">
                ⌘K
              </kbd>
            </button>

            {/* Notifications */}
            <button className="relative p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-colors">
              <Bell size={18} />
              <NotificationBadge count={5} />
            </button>
          </div>
        </header>

        {/* Page Content */}
        <div className="p-6">
          {children}
        </div>
      </main>
    </div>
  );
}
