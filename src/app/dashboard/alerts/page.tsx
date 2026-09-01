// ============================================================
// CrimeNet AI — Smart Alerts Page
// ============================================================
'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Bell, Check, Eye, AlertTriangle, Network, Repeat, Radar, MapPin, FileText, TrendingUp } from 'lucide-react';
import { Card, CardHeader, CardTitle } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Tabs } from '@/components/ui/UIComponents';
import { mockAlerts } from '@/lib/mock-data';
import { formatRelativeTime, cn } from '@/lib/utils';

const alertIcons: Record<string, React.ReactNode> = {
  'new-connection': <Network size={16} />, 'emerging-cluster': <Radar size={16} />,
  'high-risk-entity': <AlertTriangle size={16} />, 'repeat-offender': <Repeat size={16} />,
  'pattern-detected': <TrendingUp size={16} />, 'geofence-breach': <MapPin size={16} />,
  'new-evidence': <FileText size={16} />, 'case-update': <Bell size={16} />,
};

export default function AlertsPage() {
  const [alerts, setAlerts] = useState(mockAlerts);
  const [filter, setFilter] = useState('all');

  const tabs = [
    { id: 'all', label: 'All', count: alerts.length },
    { id: 'unread', label: 'Unread', count: alerts.filter(a => !a.read).length },
    { id: 'critical', label: 'Critical', count: alerts.filter(a => a.severity === 'critical').length },
    { id: 'high', label: 'High', count: alerts.filter(a => a.severity === 'high').length },
  ];

  const filtered = alerts.filter(a => {
    if (filter === 'unread') return !a.read;
    if (filter === 'critical') return a.severity === 'critical';
    if (filter === 'high') return a.severity === 'high';
    return true;
  });

  const markRead = (id: string) => {
    setAlerts(prev => prev.map(a => a.id === id ? { ...a, read: true } : a));
  };

  const acknowledge = (id: string) => {
    setAlerts(prev => prev.map(a => a.id === id ? { ...a, acknowledged: true, read: true } : a));
  };

  const severityColors = {
    critical: 'border-l-red-500 bg-red-500/5',
    high: 'border-l-orange-500 bg-orange-500/5',
    medium: 'border-l-amber-500 bg-amber-500/5',
    low: 'border-l-blue-500 bg-blue-500/5',
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Smart Alerts</h1>
          <p className="text-sm text-slate-400 mt-1">AI-generated threat alerts and system notifications</p>
        </div>
        <Button variant="secondary" size="sm" onClick={() => setAlerts(prev => prev.map(a => ({ ...a, read: true })))}>
          Mark All Read
        </Button>
      </div>

      <Tabs items={tabs} activeTab={filter} onChange={setFilter} />

      <div className="space-y-3">
        {filtered.map((alert, i) => (
          <motion.div
            key={alert.id}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.03 }}
          >
            <div className={cn(
              'glass-card-static rounded-xl p-4 border-l-4 transition-all',
              severityColors[alert.severity],
              !alert.read && 'ring-1 ring-white/5'
            )}>
              <div className="flex items-start gap-3">
                <div className={cn(
                  'p-2 rounded-lg shrink-0',
                  alert.severity === 'critical' ? 'bg-red-500/15 text-red-400' :
                  alert.severity === 'high' ? 'bg-orange-500/15 text-orange-400' :
                  alert.severity === 'medium' ? 'bg-amber-500/15 text-amber-400' :
                  'bg-blue-500/15 text-blue-400'
                )}>
                  {alertIcons[alert.type] || <Bell size={16} />}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className={cn('text-sm font-semibold', alert.read ? 'text-slate-300' : 'text-white')}>
                      {alert.title}
                    </h3>
                    {!alert.read && <span className="w-2 h-2 rounded-full bg-cyber-blue animate-pulse" />}
                    <Badge variant={alert.severity === 'critical' ? 'danger' : alert.severity === 'high' ? 'warning' : 'info'} size="sm">
                      {alert.severity}
                    </Badge>
                    <Badge variant={alert.generatedBy === 'ai' ? 'purple' : 'default'} size="sm">
                      {alert.generatedBy}
                    </Badge>
                  </div>
                  <p className="text-xs text-slate-400 mt-1">{alert.description}</p>
                  <div className="flex items-center gap-3 mt-3">
                    <span className="text-[10px] text-slate-600">{formatRelativeTime(alert.timestamp)}</span>
                    {alert.caseId && <Badge variant="outline" size="sm">{alert.caseId}</Badge>}
                    {alert.entityId && <Badge variant="outline" size="sm">{alert.entityId}</Badge>}
                  </div>
                </div>

                <div className="flex gap-1 shrink-0">
                  {!alert.read && (
                    <button onClick={() => markRead(alert.id)} className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-colors" title="Mark as read">
                      <Eye size={14} />
                    </button>
                  )}
                  {!alert.acknowledged && (
                    <button onClick={() => acknowledge(alert.id)} className="p-1.5 rounded-lg text-slate-400 hover:text-emerald-400 hover:bg-emerald-500/10 transition-colors" title="Acknowledge">
                      <Check size={14} />
                    </button>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
