// ============================================================
// CrimeNet AI — Intelligence Search Page
// ============================================================
'use client';

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, User, Briefcase, Car, Building, FileText, Filter, ArrowRight } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { RiskMeter, ConfidenceBar } from '@/components/ui/UIComponents';
import { mockPersons } from '@/lib/mock-data/persons';
import { mockCases } from '@/lib/mock-data/cases';
import { mockVehicles, mockOrganizations } from '@/lib/mock-data';
import { getRiskColor, cn } from '@/lib/utils';
import type { RiskLevel } from '@/types/entities';

type EntityType = 'all' | 'person' | 'case' | 'vehicle' | 'organization';

const entityTypes: { id: EntityType; label: string; icon: React.ReactNode }[] = [
  { id: 'all', label: 'All', icon: <Search size={14} /> },
  { id: 'person', label: 'Persons', icon: <User size={14} /> },
  { id: 'case', label: 'Cases', icon: <Briefcase size={14} /> },
  { id: 'vehicle', label: 'Vehicles', icon: <Car size={14} /> },
  { id: 'organization', label: 'Organizations', icon: <Building size={14} /> },
];

export default function SearchPage() {
  const [query, setQuery] = useState('');
  const [entityFilter, setEntityFilter] = useState<EntityType>('all');

  const results = useMemo(() => {
    const q = query.toLowerCase();
    if (!q) return [];

    const items: { id: string; type: EntityType; title: string; subtitle: string; riskScore: number; riskLevel: RiskLevel; status: string; relatedCount: number }[] = [];

    if (entityFilter === 'all' || entityFilter === 'person') {
      mockPersons.filter(p => p.name.toLowerCase().includes(q) || p.aliases.some(a => a.toLowerCase().includes(q)) || p.phone.some(ph => ph.includes(q)))
        .forEach(p => items.push({ id: p.id, type: 'person', title: p.name, subtitle: `${p.address.city}, ${p.address.state} | ${p.status}`, riskScore: p.riskScore, riskLevel: p.riskLevel, status: p.status, relatedCount: p.associatedCases.length + p.knownAssociates.length }));
    }

    if (entityFilter === 'all' || entityFilter === 'case') {
      mockCases.filter(c => c.title.toLowerCase().includes(q) || c.firNumber.toLowerCase().includes(q) || c.description.toLowerCase().includes(q))
        .forEach(c => items.push({ id: c.id, type: 'case', title: c.title, subtitle: `${c.firNumber} | ${c.policeStation}`, riskScore: c.riskScore, riskLevel: c.priority, status: c.status, relatedCount: c.suspects.length + c.evidence.length }));
    }

    if (entityFilter === 'all' || entityFilter === 'vehicle') {
      mockVehicles.filter(v => v.registrationNumber.toLowerCase().includes(q) || v.ownerName.toLowerCase().includes(q) || v.make.toLowerCase().includes(q))
        .forEach(v => items.push({ id: v.id, type: 'vehicle', title: v.registrationNumber, subtitle: `${v.make} ${v.model} (${v.color}) | Owner: ${v.ownerName}`, riskScore: v.riskScore, riskLevel: v.riskScore >= 80 ? 'critical' : v.riskScore >= 60 ? 'high' : v.riskScore >= 40 ? 'medium' : 'low', status: v.status, relatedCount: v.associatedCases.length }));
    }

    if (entityFilter === 'all' || entityFilter === 'organization') {
      mockOrganizations.filter(o => o.name.toLowerCase().includes(q) || o.description.toLowerCase().includes(q))
        .forEach(o => items.push({ id: o.id, type: 'organization', title: o.name, subtitle: `${o.type} | ${o.status}`, riskScore: o.riskScore, riskLevel: o.riskScore >= 80 ? 'critical' : o.riskScore >= 60 ? 'high' : o.riskScore >= 40 ? 'medium' : 'low', status: o.status, relatedCount: o.members.length + o.associatedCases.length }));
    }

    return items.sort((a, b) => b.riskScore - a.riskScore);
  }, [query, entityFilter]);

  const typeIcons: Record<string, React.ReactNode> = {
    person: <User size={16} />, case: <Briefcase size={16} />, vehicle: <Car size={16} />, organization: <Building size={16} />,
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Universal Intelligence Search</h1>
        <p className="text-sm text-slate-400 mt-1">Search across all entities — persons, cases, vehicles, organizations</p>
      </div>

      {/* Search Bar */}
      <div className="glass-card-static rounded-xl p-6">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
          <input
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search by name, FIR number, vehicle plate, phone number, organization..."
            className="w-full pl-12 pr-4 py-4 text-lg glass-input rounded-xl"
            autoFocus
          />
        </div>

        {/* Entity type filters */}
        <div className="flex gap-2 mt-4">
          {entityTypes.map(type => (
            <button
              key={type.id}
              onClick={() => setEntityFilter(type.id)}
              className={cn(
                'flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all',
                entityFilter === type.id
                  ? 'bg-cyber-blue/15 text-cyber-blue border border-cyber-blue/30'
                  : 'text-slate-400 hover:text-white hover:bg-white/5 border border-transparent'
              )}
            >
              {type.icon} {type.label}
            </button>
          ))}
        </div>
      </div>

      {/* Results */}
      {query && (
        <div className="text-sm text-slate-400 mb-2">
          {results.length} result{results.length !== 1 ? 's' : ''} found
        </div>
      )}

      <AnimatePresence>
        <div className="space-y-3">
          {results.map((result, i) => (
            <motion.div
              key={result.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.03 }}
            >
              <Card className="flex items-center gap-4 cursor-pointer" padding="md">
                <div className={cn('p-2.5 rounded-lg', getRiskColor(result.riskLevel).split(' ')[1])}>
                  {typeIcons[result.type]}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-semibold text-white">{result.title}</h3>
                    <Badge variant={result.riskLevel === 'critical' ? 'danger' : result.riskLevel === 'high' ? 'warning' : 'info'} size="sm">
                      {result.status}
                    </Badge>
                  </div>
                  <p className="text-xs text-slate-500 mt-0.5">{result.subtitle}</p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-center">
                    <p className="text-lg font-bold text-white">{result.riskScore}</p>
                    <p className="text-[10px] text-slate-500">Risk</p>
                  </div>
                  <div className="text-center">
                    <p className="text-lg font-bold text-slate-300">{result.relatedCount}</p>
                    <p className="text-[10px] text-slate-500">Links</p>
                  </div>
                  <ArrowRight size={16} className="text-slate-600" />
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </AnimatePresence>

      {query && results.length === 0 && (
        <div className="text-center py-16">
          <Search size={48} className="text-slate-700 mx-auto mb-4" />
          <p className="text-slate-400">No results found for &ldquo;{query}&rdquo;</p>
          <p className="text-sm text-slate-600 mt-1">Try searching with different keywords or entity type</p>
        </div>
      )}

      {!query && (
        <div className="text-center py-16">
          <Search size={48} className="text-slate-700 mx-auto mb-4" />
          <p className="text-slate-400">Start typing to search across all intelligence data</p>
          <div className="mt-4 flex flex-wrap gap-2 justify-center">
            {['Vikram Rathore', 'DL-01-AB-1234', 'CASE001', 'Rohini Syndicate', 'drug trafficking'].map(suggestion => (
              <button
                key={suggestion}
                onClick={() => setQuery(suggestion)}
                className="px-3 py-1.5 rounded-full text-xs text-slate-400 bg-white/5 hover:bg-white/10 hover:text-white transition-colors"
              >
                {suggestion}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
