// ============================================================
// CrimeNet AI — Crime Heatmap Page (Canvas-based, no Leaflet SSR issues)
// ============================================================
'use client';

import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Map, Filter, Layers } from 'lucide-react';
import { Card, CardHeader, CardTitle } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Select } from '@/components/ui/Input';
import { mockAnalytics } from '@/lib/mock-data';
import { cn } from '@/lib/utils';

const crimeHotspots = [
  { id: 1, city: 'Delhi NCR', lat: 28.6139, lng: 77.2090, crimeCount: 67, riskScore: 92, topCrimes: ['Narcotics', 'Robbery', 'Cybercrime'] },
  { id: 2, city: 'Mumbai', lat: 19.0760, lng: 72.8777, crimeCount: 54, riskScore: 88, topCrimes: ['Money Laundering', 'Fraud', 'Extortion'] },
  { id: 3, city: 'Hyderabad', lat: 17.3850, lng: 78.4867, crimeCount: 38, riskScore: 75, topCrimes: ['Theft', 'Cybercrime', 'Fraud'] },
  { id: 4, city: 'Lucknow', lat: 26.8467, lng: 80.9462, crimeCount: 32, riskScore: 72, topCrimes: ['Fraud', 'Forgery', 'Extortion'] },
  { id: 5, city: 'Patna', lat: 25.6093, lng: 85.1376, crimeCount: 28, riskScore: 85, topCrimes: ['Arms Dealing', 'Extortion', 'Robbery'] },
  { id: 6, city: 'Jaipur', lat: 26.9124, lng: 75.7873, crimeCount: 22, riskScore: 55, topCrimes: ['Fraud', 'Mining Mafia', 'Robbery'] },
  { id: 7, city: 'Kochi', lat: 9.9312, lng: 76.2673, crimeCount: 18, riskScore: 68, topCrimes: ['Smuggling', 'Fraud', 'Narcotics'] },
  { id: 8, city: 'Chennai', lat: 13.0827, lng: 80.2707, crimeCount: 15, riskScore: 52, topCrimes: ['Cybercrime', 'Fraud', 'Theft'] },
  { id: 9, city: 'Kolkata', lat: 22.5726, lng: 88.3639, crimeCount: 20, riskScore: 60, topCrimes: ['Fraud', 'Robbery', 'Narcotics'] },
  { id: 10, city: 'Ludhiana', lat: 30.9010, lng: 75.8573, crimeCount: 25, riskScore: 80, topCrimes: ['Narcotics', 'Arms Dealing', 'Smuggling'] },
];

export default function HeatmapPage() {
  const [selectedCity, setSelectedCity] = useState<typeof crimeHotspots[0] | null>(null);
  const [crimeFilter, setCrimeFilter] = useState('all');

  // Simple India map visualization using positioned dots
  const mapBounds = { minLat: 8, maxLat: 35, minLng: 68, maxLng: 97 };
  const mapWidth = 600;
  const mapHeight = 700;

  const getPosition = (lat: number, lng: number) => ({
    x: ((lng - mapBounds.minLng) / (mapBounds.maxLng - mapBounds.minLng)) * mapWidth,
    y: ((mapBounds.maxLat - lat) / (mapBounds.maxLat - mapBounds.minLat)) * mapHeight,
  });

  const getHeatColor = (risk: number) => {
    if (risk >= 80) return 'rgba(239, 68, 68, 0.8)';
    if (risk >= 60) return 'rgba(249, 115, 22, 0.7)';
    if (risk >= 40) return 'rgba(245, 158, 11, 0.6)';
    return 'rgba(56, 189, 248, 0.5)';
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Criminal Network Heatmap</h1>
          <p className="text-sm text-slate-400 mt-1">Geographic crime density visualization across India</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Map */}
        <div className="lg:col-span-2">
          <Card hover={false} padding="md" className="relative overflow-hidden" style={{ height: '600px' }}>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative" style={{ width: mapWidth, height: mapHeight }}>
                {/* Grid background */}
                <div className="absolute inset-0 grid-pattern opacity-20 rounded-lg" />

                {/* India outline approximation */}
                <svg width={mapWidth} height={mapHeight} className="absolute inset-0 opacity-10">
                  <path d="M300,50 L350,80 L380,120 L400,180 L420,220 L440,260 L450,320 L440,380 L420,440 L380,500 L340,560 L300,600 L260,640 L220,660 L180,640 L160,600 L140,540 L120,480 L110,420 L120,360 L140,300 L170,240 L200,180 L240,120 L280,70 Z" fill="none" stroke="rgba(56,189,248,0.3)" strokeWidth="1" />
                </svg>

                {/* Hotspot markers */}
                {crimeHotspots.map((spot) => {
                  const pos = getPosition(spot.lat, spot.lng);
                  const size = 20 + (spot.crimeCount / 3);

                  return (
                    <motion.div
                      key={spot.id}
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: spot.id * 0.1 }}
                      className="absolute cursor-pointer group"
                      style={{ left: pos.x - size / 2, top: pos.y - size / 2 }}
                      onClick={() => setSelectedCity(spot)}
                    >
                      {/* Heat glow */}
                      <div
                        className="rounded-full animate-pulse"
                        style={{
                          width: size * 2, height: size * 2,
                          background: `radial-gradient(circle, ${getHeatColor(spot.riskScore)}, transparent)`,
                          position: 'absolute', left: -(size / 2), top: -(size / 2),
                        }}
                      />
                      {/* Dot */}
                      <div
                        className="rounded-full border-2 border-white/30 relative z-10"
                        style={{
                          width: size, height: size,
                          background: getHeatColor(spot.riskScore),
                          boxShadow: `0 0 ${size}px ${getHeatColor(spot.riskScore)}`,
                        }}
                      />
                      {/* Label */}
                      <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap text-[10px] text-slate-300 font-medium opacity-80 group-hover:opacity-100">
                        {spot.city}
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          {/* Selected city detail */}
          {selectedCity ? (
            <Card hover={false} variant="glow">
              <CardHeader>
                <CardTitle>{selectedCity.city}</CardTitle>
                <Badge variant={selectedCity.riskScore >= 80 ? 'danger' : selectedCity.riskScore >= 60 ? 'warning' : 'info'} size="md">
                  Risk: {selectedCity.riskScore}
                </Badge>
              </CardHeader>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400">Total Crimes</span>
                  <span className="text-white font-bold">{selectedCity.crimeCount}</span>
                </div>
                <div>
                  <p className="text-xs text-slate-500 mb-2">Top Crime Types:</p>
                  <div className="flex flex-wrap gap-1">
                    {selectedCity.topCrimes.map(c => (
                      <Badge key={c} variant="outline" size="sm">{c}</Badge>
                    ))}
                  </div>
                </div>
              </div>
            </Card>
          ) : (
            <Card hover={false}>
              <p className="text-sm text-slate-400 text-center py-4">Click a hotspot on the map to view details</p>
            </Card>
          )}

          {/* Hotspot rankings */}
          <Card hover={false}>
            <CardHeader>
              <CardTitle>Hotspot Rankings</CardTitle>
            </CardHeader>
            <div className="space-y-2">
              {crimeHotspots.sort((a, b) => b.riskScore - a.riskScore).map((spot, i) => (
                <button
                  key={spot.id}
                  onClick={() => setSelectedCity(spot)}
                  className={cn(
                    'w-full flex items-center gap-3 p-2.5 rounded-lg text-left transition-colors',
                    selectedCity?.id === spot.id ? 'bg-cyber-blue/10 border border-cyber-blue/20' : 'hover:bg-white/5'
                  )}
                >
                  <span className="text-xs font-mono text-slate-500 w-5">{i + 1}</span>
                  <div className="w-3 h-3 rounded-full shrink-0" style={{ background: getHeatColor(spot.riskScore) }} />
                  <div className="flex-1">
                    <p className="text-sm text-white">{spot.city}</p>
                    <p className="text-[10px] text-slate-500">{spot.crimeCount} crimes</p>
                  </div>
                  <span className={cn(
                    'text-xs font-bold',
                    spot.riskScore >= 80 ? 'text-red-400' : spot.riskScore >= 60 ? 'text-orange-400' : 'text-blue-400'
                  )}>
                    {spot.riskScore}
                  </span>
                </button>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
