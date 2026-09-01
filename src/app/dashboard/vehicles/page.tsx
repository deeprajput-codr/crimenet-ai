// ============================================================
// CrimeNet AI — Vehicle Tracking Page
// ============================================================
'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Car, Search, MapPin, AlertTriangle, Eye, Clock } from 'lucide-react';
import { Card, CardHeader, CardTitle } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { mockVehicles } from '@/lib/mock-data';
import { formatRelativeTime, cn } from '@/lib/utils';

const statusColors: Record<string, string> = {
  active: 'bg-emerald-500', stolen: 'bg-red-500', seized: 'bg-amber-500',
  wanted: 'bg-red-500', cleared: 'bg-slate-500',
};

export default function VehiclesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedVehicle, setSelectedVehicle] = useState<typeof mockVehicles[0] | null>(null);
  const [statusFilter, setStatusFilter] = useState('all');

  const filtered = mockVehicles
    .filter(v => statusFilter === 'all' || v.status === statusFilter)
    .filter(v => !searchQuery || v.registrationNumber.toLowerCase().includes(searchQuery.toLowerCase()) || v.ownerName.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Live Vehicle Tracking</h1>
        <p className="text-sm text-slate-400 mt-1">Real-time vehicle surveillance with ANPR integration</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Vehicle List */}
        <div className="space-y-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <input
              type="text" value={searchQuery} onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search by plate number or owner..."
              className="w-full pl-10 pr-4 py-2.5 glass-input rounded-lg text-sm"
            />
          </div>

          {/* Status filters */}
          <div className="flex gap-1 flex-wrap">
            {['all', 'active', 'wanted', 'seized', 'stolen', 'cleared'].map(status => (
              <button
                key={status}
                onClick={() => setStatusFilter(status)}
                className={cn(
                  'px-2.5 py-1 rounded-md text-xs font-medium capitalize transition-all',
                  statusFilter === status
                    ? 'bg-cyber-blue/15 text-cyber-blue border border-cyber-blue/30'
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                )}
              >
                {status}
              </button>
            ))}
          </div>

          {/* Vehicle cards */}
          <div className="space-y-2 max-h-[calc(100vh-320px)] overflow-y-auto no-scrollbar">
            {filtered.map((vehicle, i) => (
              <motion.div
                key={vehicle.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                <button
                  onClick={() => setSelectedVehicle(vehicle)}
                  className={cn(
                    'w-full glass-card-static rounded-lg p-3 text-left transition-all',
                    selectedVehicle?.id === vehicle.id && 'border-cyber-blue/40 bg-cyber-blue/5'
                  )}
                >
                  <div className="flex items-center gap-3">
                    <div className={cn(
                      'p-2 rounded-lg',
                      vehicle.status === 'wanted' ? 'bg-red-500/15 text-red-400' :
                      vehicle.status === 'seized' ? 'bg-amber-500/15 text-amber-400' :
                      'bg-emerald-500/15 text-emerald-400'
                    )}>
                      <Car size={16} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-mono font-bold text-white">{vehicle.registrationNumber}</p>
                      <p className="text-[10px] text-slate-500">{vehicle.make} {vehicle.model} ({vehicle.color})</p>
                    </div>
                    <Badge
                      variant={vehicle.status === 'wanted' ? 'danger' : vehicle.status === 'seized' ? 'warning' : vehicle.status === 'active' ? 'success' : 'default'}
                      size="sm" dot
                    >
                      {vehicle.status}
                    </Badge>
                  </div>
                </button>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Map Area / Detail */}
        <div className="lg:col-span-2 space-y-4">
          {selectedVehicle ? (
            <>
              <Card hover={false}>
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="p-3 rounded-xl bg-gradient-to-br from-cyber-blue/20 to-purple-accent/20">
                      <Car size={24} className="text-cyber-blue" />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold font-mono text-white">{selectedVehicle.registrationNumber}</h2>
                      <p className="text-sm text-slate-400">{selectedVehicle.make} {selectedVehicle.model} • {selectedVehicle.color} • {selectedVehicle.year}</p>
                    </div>
                  </div>
                  <Badge
                    variant={selectedVehicle.status === 'wanted' ? 'danger' : selectedVehicle.status === 'seized' ? 'warning' : 'success'}
                    size="md" dot pulse={selectedVehicle.status === 'wanted'}
                  >
                    {selectedVehicle.status}
                  </Badge>
                </CardHeader>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-4">
                  {[
                    { label: 'Owner', value: selectedVehicle.ownerName || 'Unknown', icon: <Eye size={14} /> },
                    { label: 'Risk Score', value: selectedVehicle.riskScore.toString(), icon: <AlertTriangle size={14} /> },
                    { label: 'Linked Cases', value: selectedVehicle.associatedCases.length.toString(), icon: <Car size={14} /> },
                    { label: 'Last Seen', value: selectedVehicle.lastSeen ? formatRelativeTime(selectedVehicle.lastSeen) : 'N/A', icon: <Clock size={14} /> },
                  ].map(item => (
                    <div key={item.label} className="glass-card-static rounded-lg p-3">
                      <div className="flex items-center gap-1.5 text-slate-500 mb-1">
                        {item.icon}
                        <span className="text-[10px] uppercase tracking-wider">{item.label}</span>
                      </div>
                      <p className="text-sm font-semibold text-white">{item.value}</p>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Tracking History */}
              <Card hover={false}>
                <CardHeader>
                  <CardTitle>Tracking History</CardTitle>
                </CardHeader>
                {selectedVehicle.trackingHistory.length > 0 ? (
                  <div className="space-y-3">
                    {selectedVehicle.trackingHistory.map((track, i) => (
                      <div key={i} className="flex items-center gap-3 p-3 rounded-lg bg-white/[0.02]">
                        <MapPin size={14} className="text-cyber-blue shrink-0" />
                        <div className="flex-1">
                          <p className="text-xs text-white">Lat: {track.location.lat.toFixed(4)}, Lng: {track.location.lng.toFixed(4)}</p>
                          <p className="text-[10px] text-slate-500">Source: {track.source.toUpperCase()} {track.speed ? `• ${track.speed} km/h` : ''}</p>
                        </div>
                        <span className="text-[10px] text-slate-500">{formatRelativeTime(track.timestamp)}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-slate-500 text-center py-4">No tracking history available</p>
                )}
              </Card>
            </>
          ) : (
            <Card hover={false} className="flex items-center justify-center" style={{ height: '400px' }}>
              <div className="text-center">
                <Car size={48} className="text-slate-700 mx-auto mb-4" />
                <p className="text-slate-400">Select a vehicle to view details and tracking history</p>
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
