// ============================================================
// CrimeNet AI — Analytics Dashboard Page
// ============================================================
'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { BarChart3, TrendingUp, Calendar } from 'lucide-react';
import { Card, CardHeader, CardTitle } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Tabs } from '@/components/ui/UIComponents';
import { mockAnalytics } from '@/lib/mock-data';
import {
  BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, AreaChart, Area,
  XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip,
  ResponsiveContainer, Legend
} from 'recharts';

const COLORS = ['#38bdf8', '#a78bfa', '#22d3ee', '#f59e0b', '#ef4444', '#22c55e', '#ec4899', '#64748b', '#f97316'];

const tooltipStyle = {
  contentStyle: { background: 'rgba(15,23,42,0.9)', border: '1px solid rgba(56,189,248,0.2)', borderRadius: '8px', color: '#e2e8f0', fontSize: '12px' },
};

export default function AnalyticsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Analytics Dashboard</h1>
          <p className="text-sm text-slate-400 mt-1">Comprehensive crime statistics and trend analysis</p>
        </div>
        <Badge variant="info" size="md" className="flex items-center gap-1"><Calendar size={12} /> Last 6 Months</Badge>
      </div>

      {/* Row 1: Trends and Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Network Growth */}
        <Card hover={false}>
          <CardHeader>
            <CardTitle>Network Growth</CardTitle>
            <Badge variant="success" size="sm"><TrendingUp size={12} /> Growing</Badge>
          </CardHeader>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={mockAnalytics.networkGrowth}>
                <defs>
                  <linearGradient id="nodesGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#38bdf8" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#38bdf8" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="edgesGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#a78bfa" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#a78bfa" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="date" stroke="#64748b" fontSize={11} />
                <YAxis stroke="#64748b" fontSize={11} />
                <RechartsTooltip {...tooltipStyle} />
                <Area type="monotone" dataKey="nodes" stroke="#38bdf8" fill="url(#nodesGrad)" strokeWidth={2} name="Nodes" />
                <Area type="monotone" dataKey="edges" stroke="#a78bfa" fill="url(#edgesGrad)" strokeWidth={2} name="Edges" />
                <Legend />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Resolution Rate */}
        <Card hover={false}>
          <CardHeader>
            <CardTitle>Case Resolution Rate</CardTitle>
          </CardHeader>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={mockAnalytics.resolutionRate}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="month" stroke="#64748b" fontSize={11} />
                <YAxis stroke="#64748b" fontSize={11} />
                <RechartsTooltip {...tooltipStyle} />
                <Bar dataKey="total" fill="rgba(56,189,248,0.2)" radius={[4, 4, 0, 0]} name="Total" />
                <Bar dataKey="resolved" fill="#38bdf8" radius={[4, 4, 0, 0]} name="Resolved" />
                <Legend />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      {/* Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Crime Distribution Pie */}
        <Card hover={false}>
          <CardHeader>
            <CardTitle>Crime Distribution</CardTitle>
          </CardHeader>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={mockAnalytics.crimeDistribution}
                  cx="50%" cy="50%" innerRadius={40} outerRadius={80}
                  dataKey="count" nameKey="category"
                  stroke="rgba(3,7,18,0.5)" strokeWidth={2}
                >
                  {mockAnalytics.crimeDistribution.map((_, i) => (
                    <Cell key={i} fill={COLORS[i % COLORS.length]} />
                  ))}
                </Pie>
                <RechartsTooltip {...tooltipStyle} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex flex-wrap gap-2">
            {mockAnalytics.crimeDistribution.map((item, i) => (
              <span key={item.category} className="flex items-center gap-1 text-[10px] text-slate-400">
                <span className="w-2 h-2 rounded-full" style={{ background: COLORS[i % COLORS.length] }} />
                {item.category} ({item.percentage}%)
              </span>
            ))}
          </div>
        </Card>

        {/* Risk Distribution */}
        <Card hover={false}>
          <CardHeader>
            <CardTitle>Risk Distribution</CardTitle>
          </CardHeader>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={mockAnalytics.riskDistribution} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis type="number" stroke="#64748b" fontSize={11} />
                <YAxis type="category" dataKey="level" stroke="#64748b" fontSize={11} />
                <RechartsTooltip {...tooltipStyle} />
                <Bar dataKey="count" radius={[0, 4, 4, 0]}>
                  {mockAnalytics.riskDistribution.map((entry, i) => (
                    <Cell key={i} fill={
                      entry.level === 'critical' ? '#ef4444' :
                      entry.level === 'high' ? '#f97316' :
                      entry.level === 'medium' ? '#f59e0b' :
                      entry.level === 'low' ? '#3b82f6' : '#64748b'
                    } />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Top Hotspots */}
        <Card hover={false}>
          <CardHeader>
            <CardTitle>Top Hotspots</CardTitle>
          </CardHeader>
          <div className="space-y-3 max-h-72 overflow-y-auto no-scrollbar">
            {mockAnalytics.topHotspots.map((hotspot, i) => (
              <div key={hotspot.location} className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/[0.02]">
                <span className="text-xs font-mono text-slate-600 w-5">{i + 1}</span>
                <div className="flex-1">
                  <p className="text-sm text-white">{hotspot.location}</p>
                  <p className="text-[10px] text-slate-500">{hotspot.crimeCount} crimes</p>
                </div>
                <div className="text-right">
                  <span className={`text-sm font-bold ${hotspot.riskScore >= 80 ? 'text-red-400' : hotspot.riskScore >= 60 ? 'text-orange-400' : 'text-blue-400'}`}>
                    {hotspot.riskScore}
                  </span>
                  <p className="text-[10px] text-slate-600">risk</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
