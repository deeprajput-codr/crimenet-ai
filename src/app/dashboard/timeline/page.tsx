// ============================================================
// CrimeNet AI — Investigation Timeline Page
// ============================================================
'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Clock, Phone, Users, DollarSign, Shield, MapPin, FileText, Gavel, Eye, Lightbulb, Filter } from 'lucide-react';
import { Card, CardHeader, CardTitle } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Tabs } from '@/components/ui/UIComponents';
import { mockTimelineEvents } from '@/lib/mock-data';
import { formatDate, cn } from '@/lib/utils';

const eventIcons: Record<string, React.ReactNode> = {
  call: <Phone size={16} />, meeting: <Users size={16} />, transaction: <DollarSign size={16} />,
  arrest: <Shield size={16} />, movement: <MapPin size={16} />, surveillance: <Eye size={16} />,
  incident: <Lightbulb size={16} />, court: <Gavel size={16} />, 'evidence-found': <FileText size={16} />,
  'tip-received': <Lightbulb size={16} />,
};

const eventColors: Record<string, string> = {
  call: 'border-purple-400 bg-purple-500/15 text-purple-400',
  meeting: 'border-blue-400 bg-blue-500/15 text-blue-400',
  transaction: 'border-amber-400 bg-amber-500/15 text-amber-400',
  arrest: 'border-red-400 bg-red-500/15 text-red-400',
  movement: 'border-green-400 bg-green-500/15 text-green-400',
  surveillance: 'border-cyan-400 bg-cyan-500/15 text-cyan-400',
  incident: 'border-orange-400 bg-orange-500/15 text-orange-400',
  court: 'border-slate-400 bg-slate-500/15 text-slate-400',
  'evidence-found': 'border-emerald-400 bg-emerald-500/15 text-emerald-400',
  'tip-received': 'border-yellow-400 bg-yellow-500/15 text-yellow-400',
};

const lineColors: Record<string, string> = {
  call: '#a855f7', meeting: '#3b82f6', transaction: '#f59e0b',
  arrest: '#ef4444', movement: '#22c55e', surveillance: '#06b6d4',
  incident: '#f97316', court: '#64748b', 'evidence-found': '#10b981', 'tip-received': '#eab308',
};

export default function TimelinePage() {
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [caseFilter, setCaseFilter] = useState<string>('all');

  const filteredEvents = mockTimelineEvents
    .filter(e => typeFilter === 'all' || e.type === typeFilter)
    .filter(e => caseFilter === 'all' || e.caseId === caseFilter)
    .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());

  const uniqueTypes = [...new Set(mockTimelineEvents.map(e => e.type))];
  const uniqueCases = [...new Set(mockTimelineEvents.map(e => e.caseId).filter(Boolean))];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Investigation Timeline</h1>
        <p className="text-sm text-slate-400 mt-1">Chronological view of investigation events across all cases</p>
      </div>

      {/* Filters */}
      <Card hover={false} padding="sm">
        <div className="flex flex-wrap gap-2">
          <button onClick={() => setTypeFilter('all')} className={cn('px-3 py-1.5 rounded-lg text-xs font-medium transition-all', typeFilter === 'all' ? 'bg-cyber-blue/15 text-cyber-blue border border-cyber-blue/30' : 'text-slate-400 hover:text-white hover:bg-white/5')}>
            All Events
          </button>
          {uniqueTypes.map(type => (
            <button key={type} onClick={() => setTypeFilter(type)} className={cn('flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium transition-all capitalize', typeFilter === type ? 'bg-cyber-blue/15 text-cyber-blue border border-cyber-blue/30' : 'text-slate-400 hover:text-white hover:bg-white/5')}>
              {eventIcons[type]} {type.replace('-', ' ')}
            </button>
          ))}
        </div>
      </Card>

      {/* Timeline */}
      <div className="relative pl-8">
        {/* Vertical line */}
        <div className="absolute left-3 top-0 bottom-0 w-px bg-gradient-to-b from-cyber-blue/40 via-purple-accent/30 to-transparent" />

        <div className="space-y-6">
          {filteredEvents.map((event, index) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              className="relative"
            >
              {/* Dot */}
              <div
                className="absolute -left-5 top-3 w-4 h-4 rounded-full border-2 bg-navy-900 z-10"
                style={{ borderColor: lineColors[event.type] || '#38bdf8' }}
              />

              <Card padding="md" className="ml-4">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3">
                    <div className={cn('p-2 rounded-lg shrink-0', eventColors[event.type] || 'bg-slate-500/15 text-slate-400')}>
                      {eventIcons[event.type] || <Clock size={16} />}
                    </div>
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="text-sm font-semibold text-white">{event.title}</h3>
                        <Badge variant={event.severity === 'critical' ? 'danger' : event.severity === 'high' ? 'warning' : event.severity === 'medium' ? 'info' : 'default'} size="sm">
                          {event.severity}
                        </Badge>
                        {event.verified && <Badge variant="success" size="sm">Verified</Badge>}
                      </div>
                      <p className="text-xs text-slate-400 mt-1">{event.description}</p>
                      {event.persons.length > 0 && (
                        <div className="flex gap-1 mt-2">
                          {event.persons.map(p => (
                            <Badge key={p} variant="outline" size="sm">{p}</Badge>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-xs text-slate-400">{formatDate(event.timestamp, 'dd MMM yyyy')}</p>
                    <p className="text-[10px] text-slate-600">{formatDate(event.timestamp, 'HH:mm')}</p>
                    {event.caseId && <Badge variant="info" size="sm" className="mt-1">{event.caseId}</Badge>}
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
