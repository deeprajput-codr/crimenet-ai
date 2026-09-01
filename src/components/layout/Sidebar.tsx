// ============================================================
// CrimeNet AI — Sidebar Component (Dashboard)
// ============================================================
'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard, Search, FileText, GitMerge, Network, Clock,
  FolderOpen, MessageSquare, MapPin, Car, Bell, BarChart3,
  Shield, Users, ChevronLeft, ChevronRight, LogOut, Settings,
  Brain, Radar, Map
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuthStore } from '@/store/authStore';
import { Tooltip } from '@/components/ui/UIComponents';
import { Badge, NotificationBadge } from '@/components/ui/Badge';

interface NavSection {
  title: string;
  items: NavItem[];
}

interface NavItem {
  href: string;
  icon: React.ReactNode;
  label: string;
  badge?: number;
  badgeVariant?: 'danger' | 'warning' | 'info';
}

const navSections: NavSection[] = [
  {
    title: 'Overview',
    items: [
      { href: '/dashboard', icon: <LayoutDashboard size={18} />, label: 'Dashboard' },
      { href: '/dashboard/search', icon: <Search size={18} />, label: 'Intel Search' },
      { href: '/dashboard/alerts', icon: <Bell size={18} />, label: 'Smart Alerts', badge: 12, badgeVariant: 'danger' },
    ],
  },
  {
    title: 'Investigation',
    items: [
      { href: '/dashboard/graph', icon: <Network size={18} />, label: 'Knowledge Graph' },
      { href: '/dashboard/timeline', icon: <Clock size={18} />, label: 'Timeline' },
      { href: '/dashboard/evidence', icon: <FolderOpen size={18} />, label: 'Evidence Center' },
      { href: '/dashboard/copilot', icon: <MessageSquare size={18} />, label: 'AI Copilot', badge: 0, badgeVariant: 'info' },
    ],
  },
  {
    title: 'Analysis',
    items: [
      { href: '/dashboard/extraction', icon: <FileText size={18} />, label: 'Entity Extraction' },
      { href: '/dashboard/resolution', icon: <GitMerge size={18} />, label: 'Entity Resolution' },
      { href: '/dashboard/network', icon: <Radar size={18} />, label: 'Network Analysis' },
      { href: '/dashboard/analytics', icon: <BarChart3 size={18} />, label: 'Analytics' },
    ],
  },
  {
    title: 'Tracking',
    items: [
      { href: '/dashboard/heatmap', icon: <Map size={18} />, label: 'Crime Heatmap' },
      { href: '/dashboard/vehicles', icon: <Car size={18} />, label: 'Vehicle Tracking' },
    ],
  },
  {
    title: 'Reports',
    items: [
      { href: '/dashboard/reports', icon: <Brain size={18} />, label: 'Brief Generator' },
    ],
  },
];

const adminSection: NavSection = {
  title: 'Administration',
  items: [
    { href: '/dashboard/admin', icon: <Settings size={18} />, label: 'Admin Panel' },
  ],
};

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout, hasRole } = useAuthStore();

  const allSections = hasRole('administrator')
    ? [...navSections, adminSection]
    : navSections;

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  return (
    <motion.aside
      initial={false}
      animate={{ width: collapsed ? 72 : 260 }}
      transition={{ duration: 0.2, ease: 'easeInOut' }}
      className="fixed left-0 top-0 bottom-0 z-40 flex flex-col border-r border-white/5 bg-navy-800/80 backdrop-blur-xl"
    >
      {/* Logo */}
      <div className="flex items-center gap-3 px-4 h-16 border-b border-white/5 shrink-0">
        <Link href="/" className="flex items-center gap-3">
          <Shield className="w-8 h-8 text-cyber-blue shrink-0" />
          <AnimatePresence>
            {!collapsed && (
              <motion.div
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: 'auto' }}
                exit={{ opacity: 0, width: 0 }}
                className="overflow-hidden whitespace-nowrap"
              >
                <span className="text-lg font-bold text-white">
                  Crime<span className="text-cyber-blue">Net</span>
                </span>
              </motion.div>
            )}
          </AnimatePresence>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-6 no-scrollbar">
        {allSections.map((section) => (
          <div key={section.title}>
            <AnimatePresence>
              {!collapsed && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="px-3 mb-2 text-[10px] font-semibold uppercase tracking-widest text-slate-500"
                >
                  {section.title}
                </motion.p>
              )}
            </AnimatePresence>

            <div className="space-y-0.5">
              {section.items.map((item) => {
                const isActive = pathname === item.href;
                const linkContent = (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      'relative flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 group',
                      isActive
                        ? 'text-cyber-blue bg-cyber-blue/10'
                        : 'text-slate-400 hover:text-white hover:bg-white/5'
                    )}
                  >
                    {/* Active indicator */}
                    {isActive && (
                      <motion.div
                        layoutId="sidebar-active"
                        className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 rounded-r-full bg-cyber-blue"
                        transition={{ duration: 0.2 }}
                      />
                    )}

                    <span className="shrink-0">{item.icon}</span>
                    
                    <AnimatePresence>
                      {!collapsed && (
                        <motion.span
                          initial={{ opacity: 0, width: 0 }}
                          animate={{ opacity: 1, width: 'auto' }}
                          exit={{ opacity: 0, width: 0 }}
                          className="overflow-hidden whitespace-nowrap flex-1"
                        >
                          {item.label}
                        </motion.span>
                      )}
                    </AnimatePresence>

                    {!collapsed && item.badge !== undefined && item.badge > 0 && (
                      <Badge
                        variant={item.badgeVariant === 'danger' ? 'danger' : item.badgeVariant === 'warning' ? 'warning' : 'info'}
                        size="sm"
                      >
                        {item.badge}
                      </Badge>
                    )}

                    {collapsed && item.badge !== undefined && item.badge > 0 && (
                      <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-alert-red" />
                    )}
                  </Link>
                );

                return collapsed ? (
                  <Tooltip key={item.href} content={item.label} position="right">
                    {linkContent}
                  </Tooltip>
                ) : (
                  <React.Fragment key={item.href}>{linkContent}</React.Fragment>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      {/* User section */}
      <div className="shrink-0 border-t border-white/5 p-3 space-y-2">
        {user && !collapsed && (
          <div className="flex items-center gap-3 px-3 py-2">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-cyber-blue to-purple-accent flex items-center justify-center text-sm font-bold text-white shrink-0">
              {user.name.charAt(0)}
            </div>
            <div className="overflow-hidden">
              <p className="text-sm font-medium text-white truncate">{user.name}</p>
              <p className="text-[10px] text-slate-500 capitalize">{user.role.replace('_', ' ')}</p>
            </div>
          </div>
        )}

        <button
          onClick={handleLogout}
          className={cn(
            'w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-slate-400 hover:text-red-400 hover:bg-red-500/10 transition-colors',
            collapsed && 'justify-center'
          )}
        >
          <LogOut size={18} />
          {!collapsed && 'Sign Out'}
        </button>
      </div>

      {/* Collapse toggle */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="absolute -right-3 top-20 w-6 h-6 rounded-full bg-navy-700 border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:bg-navy-600 transition-colors z-50"
      >
        {collapsed ? <ChevronRight size={12} /> : <ChevronLeft size={12} />}
      </button>
    </motion.aside>
  );
}
