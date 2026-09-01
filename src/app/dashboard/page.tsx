// ============================================================
// CrimeNet AI — Main Dashboard Page
// ============================================================
'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
  Briefcase, Users, Car, AlertTriangle, Network,
  TrendingUp, Activity, Eye
} from 'lucide-react';
import { StatCard, RiskMeter } from '@/components/ui/UIComponents';
import { Card, CardHeader, CardTitle } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { mockCases } from '@/lib/mock-data/cases';
import { mockPersons } from '@/lib/mock-data/persons';
import { mockAlerts, mockTimelineEvents, mockAnalytics } from '@/lib/mock-data';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip,
  ResponsiveContainer, PieChart, Pie, Cell
} from 'recharts';
import { formatRelativeTime } from '@/lib/utils';
import Link from 'next/link';

const CHART_COLORS = ['#38bdf8', '#a78bfa', '#22d3ee', '#f59e0b', '#ef4444', '#22c55e', '#ec4899', '#64748b'];

export default function DashboardPage() {
  const activeCases = mockCases.filter(c => c.status === 'active').length;
  const wantedPersons = mockPersons.filter(p => p.status === 'wanted').length;
  const unreadAlerts = mockAlerts.filter(a => !a.read).length;

  const casesByMonth = [
    { month: 'Mar', cases: 8, resolved: 6 },
    { month: 'Apr', cases: 12, resolved: 9 },
    { month: 'May', cases: 10, resolved: 8 },
    { month: 'Jun', cases: 15, resolved: 12 },
    { month: 'Jul', cases: 11, resolved: 8 },
    { month: 'Aug', cases: 18, resolved: 14 },
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Intelligence Dashboard</h1>
          <p className="text-sm text-slate-400 mt-1">Real-time overview of criminal intelligence operations</p>
        </div>
        <Badge variant="success" dot pulse size="md">System Online</Badge>
      </div>

      {/* Stat Cards Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Active Cases"
          value={activeCases}
          icon={<Briefcase size={20} />}
          trend={{ value: 15, isPositive: true }}
          color="blue"
        />
        <StatCard
          title="Persons of Interest"
          value={mockPersons.length}
          icon={<Users size={20} />}
          trend={{ value: 8, isPositive: true }}
          color="purple"
        />
        <StatCard
          title="Wanted Suspects"
          value={wantedPersons}
          icon={<Eye size={20} />}
          trend={{ value: 3, isPositive: false }}
          color="red"
        />
        <StatCard
          title="Active Alerts"
          value={unreadAlerts}
          icon={<AlertTriangle size={20} />}
          trend={{ value: 22, isPositive: true }}
          color="amber"
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Case Trends */}
        <Card className="lg:col-span-2" hover={false}>
          <CardHeader>
            <CardTitle>Case Trends</CardTitle>
            <Badge variant="info" size="sm">Last 6 months</Badge>
          </CardHeader>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={casesByMonth}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="month" stroke="#64748b" fontSize={12} />
                <YAxis stroke="#64748b" fontSize={12} />
                <RechartsTooltip
                  contentStyle={{ background: 'rgba(15,23,42,0.9)', border: '1px solid rgba(56,189,248,0.2)', borderRadius: '8px', color: '#e2e8f0' }}
                />
                <Line type="monotone" dataKey="cases" stroke="#38bdf8" strokeWidth={2} dot={{ fill: '#38bdf8', r: 4 }} name="Filed" />
                <Line type="monotone" dataKey="resolved" stroke="#22d3ee" strokeWidth={2} dot={{ fill: '#22d3ee', r: 4 }} name="Resolved" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Crime Distribution Pie */}
        <Card hover={false}>
          <CardHeader>
            <CardTitle>Crime Distribution</CardTitle>
          </CardHeader>
          <div className="h-64 flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={mockAnalytics.crimeDistribution.slice(0, 6)}
                  cx="50%" cy="50%" innerRadius={50} outerRadius={80}
                  dataKey="count" nameKey="category"
                  stroke="rgba(3,7,18,0.5)" strokeWidth={2}
                >
                  {mockAnalytics.crimeDistribution.slice(0, 6).map((_, index) => (
                    <Cell key={index} fill={CHART_COLORS[index % CHART_COLORS.length]} />
                  ))}
                </Pie>
                <RechartsTooltip
                  contentStyle={{ background: 'rgba(15,23,42,0.9)', border: '1px solid rgba(56,189,248,0.2)', borderRadius: '8px', color: '#e2e8f0', fontSize: '12px' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex flex-wrap gap-2 mt-2">
            {mockAnalytics.crimeDistribution.slice(0, 6).map((item, i) => (
              <span key={item.category} className="flex items-center gap-1 text-[10px] text-slate-400">
                <span className="w-2 h-2 rounded-full" style={{ background: CHART_COLORS[i] }} />
                {item.category}
              </span>
            ))}
          </div>
        </Card>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Recent Activity */}
        <Card className="lg:col-span-2" hover={false}>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <Link href="/dashboard/timeline" className="text-xs text-cyber-blue hover:text-cyber-blue/80">View All</Link>
          </CardHeader>
          <div className="space-y-3 max-h-80 overflow-y-auto no-scrollbar">
            {mockTimelineEvents.slice(0, 8).map((event, i) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                className="flex items-start gap-3 p-3 rounded-lg hover:bg-white/[0.02] transition-colors"
              >
                <div className={`p-2 rounded-lg shrink-0 ${
                  event.severity === 'critical' ? 'bg-red-500/15 text-red-400' :
                  event.severity === 'high' ? 'bg-orange-500/15 text-orange-400' :
                  event.severity === 'medium' ? 'bg-amber-500/15 text-amber-400' :
                  'bg-slate-500/15 text-slate-400'
                }`}>
                  <Activity size={14} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-white truncate">{event.title}</p>
                  <p className="text-xs text-slate-500 mt-0.5 truncate">{event.description}</p>
                </div>
                <span className="text-[10px] text-slate-600 whitespace-nowrap">{formatRelativeTime(event.timestamp)}</span>
              </motion.div>
            ))}
          </div>
        </Card>

        {/* Risk Overview + Quick Actions */}
        <div className="space-y-4">
          <Card hover={false}>
            <CardHeader>
              <CardTitle>Overall Risk</CardTitle>
            </CardHeader>
            <div className="flex justify-center">
              <RiskMeter score={78} size={140} label="System Risk Score" />
            </div>
            <div className="mt-4 grid grid-cols-2 gap-2">
              {[
                { label: 'Critical', count: 15, color: 'text-red-400' },
                { label: 'High', count: 32, color: 'text-orange-400' },
                { label: 'Medium', count: 48, color: 'text-amber-400' },
                { label: 'Low', count: 65, color: 'text-blue-400' },
              ].map(item => (
                <div key={item.label} className="flex items-center justify-between p-2 rounded-lg bg-white/[0.02]">
                  <span className="text-xs text-slate-400">{item.label}</span>
                  <span className={`text-sm font-bold ${item.color}`}>{item.count}</span>
                </div>
              ))}
            </div>
          </Card>

          <Card hover={false}>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <div className="grid grid-cols-2 gap-2">
              {[
                { label: 'New Case', href: '/dashboard/search', icon: <Briefcase size={14} />, color: 'bg-blue-500/10 text-blue-400 hover:bg-blue-500/20' },
                { label: 'Graph', href: '/dashboard/graph', icon: <Network size={14} />, color: 'bg-purple-500/10 text-purple-400 hover:bg-purple-500/20' },
                { label: 'Search', href: '/dashboard/search', icon: <Users size={14} />, color: 'bg-cyan-500/10 text-cyan-400 hover:bg-cyan-500/20' },
                { label: 'Reports', href: '/dashboard/reports', icon: <TrendingUp size={14} />, color: 'bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20' },
              ].map(action => (
                <Link
                  key={action.label}
                  href={action.href}
                  className={`flex items-center gap-2 p-3 rounded-lg text-xs font-medium transition-colors ${action.color}`}
                >
                  {action.icon}
                  {action.label}
                </Link>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
