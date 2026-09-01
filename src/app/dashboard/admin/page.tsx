// ============================================================
// CrimeNet AI — Admin Panel Page
// ============================================================
'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Settings, Users, Key, Database, Shield, Clock, Edit, Trash2, Plus, Eye, Check, X } from 'lucide-react';
import { Card, CardHeader, CardTitle } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Tabs } from '@/components/ui/UIComponents';
import { Table, type Column } from '@/components/ui/Table';

const mockAdminUsers = [
  { id: 'U001', name: 'ACP Meera Joshi', email: 'meera.joshi@crimenet.gov.in', role: 'administrator', department: 'Delhi Police - Special Cell', status: 'active', lastLogin: '2025-08-31T09:00:00Z' },
  { id: 'U002', name: 'SP Karan Malhotra', email: 'karan.malhotra@crimenet.gov.in', role: 'senior_officer', department: 'UP Police - Crime Branch', status: 'active', lastLogin: '2025-08-31T08:30:00Z' },
  { id: 'U003', name: 'Inspector Neha Tripathi', email: 'neha.tripathi@crimenet.gov.in', role: 'intelligence_analyst', department: 'UP Police - IB', status: 'active', lastLogin: '2025-08-31T07:45:00Z' },
  { id: 'U004', name: 'SI Rahul Verma', email: 'rahul.verma@crimenet.gov.in', role: 'investigator', department: 'Delhi Police - Crime Branch', status: 'active', lastLogin: '2025-08-30T18:00:00Z' },
  { id: 'U005', name: 'ASI Pooja Singh', email: 'pooja.singh@crimenet.gov.in', role: 'investigator', department: 'Delhi Police - Special Cell', status: 'inactive', lastLogin: '2025-07-15T12:00:00Z' },
];

const mockAuditLog = [
  { id: 'AL001', user: 'ACP Meera Joshi', action: 'Logged in', resource: 'Auth', timestamp: '2025-08-31T09:00:00Z', ip: '192.168.1.45' },
  { id: 'AL002', user: 'SP Karan Malhotra', action: 'Generated report', resource: 'Reports', timestamp: '2025-08-31T08:45:00Z', ip: '10.0.0.12' },
  { id: 'AL003', user: 'Inspector Neha Tripathi', action: 'Searched entity', resource: 'Search', timestamp: '2025-08-31T08:30:00Z', ip: '172.16.0.5' },
  { id: 'AL004', user: 'SI Rahul Verma', action: 'Viewed case CASE001', resource: 'Cases', timestamp: '2025-08-31T08:15:00Z', ip: '192.168.1.78' },
  { id: 'AL005', user: 'ACP Meera Joshi', action: 'Added evidence E025', resource: 'Evidence', timestamp: '2025-08-31T08:00:00Z', ip: '192.168.1.45' },
  { id: 'AL006', user: 'SP Karan Malhotra', action: 'Ran network analysis', resource: 'Analysis', timestamp: '2025-08-30T22:30:00Z', ip: '10.0.0.12' },
  { id: 'AL007', user: 'ACP Meera Joshi', action: 'Modified user permissions', resource: 'Admin', timestamp: '2025-08-30T20:00:00Z', ip: '192.168.1.45' },
];

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState('users');

  const tabs = [
    { id: 'users', label: 'Users', icon: <Users size={14} />, count: mockAdminUsers.length },
    { id: 'audit', label: 'Audit Log', icon: <Clock size={14} />, count: mockAuditLog.length },
    { id: 'api', label: 'API Keys', icon: <Key size={14} /> },
    { id: 'system', label: 'System', icon: <Database size={14} /> },
  ];

  const userColumns: Column<typeof mockAdminUsers[0]>[] = [
    { key: 'name', header: 'Name', sortable: true, render: (item) => (
      <div>
        <p className="text-sm font-medium text-white">{item.name}</p>
        <p className="text-[10px] text-slate-500">{item.email}</p>
      </div>
    )},
    { key: 'role', header: 'Role', sortable: true, render: (item) => (
      <Badge variant={item.role === 'administrator' ? 'danger' : item.role === 'senior_officer' ? 'warning' : item.role === 'intelligence_analyst' ? 'purple' : 'info'} size="sm">
        {item.role.replace('_', ' ')}
      </Badge>
    )},
    { key: 'department', header: 'Department', render: (item) => <span className="text-xs text-slate-400">{item.department}</span> },
    { key: 'status', header: 'Status', render: (item) => <Badge variant={item.status === 'active' ? 'success' : 'default'} size="sm" dot>{item.status}</Badge> },
    { key: 'actions', header: '', width: '100px', render: () => (
      <div className="flex gap-1">
        <button className="p-1.5 rounded text-slate-400 hover:text-white hover:bg-white/5"><Edit size={12} /></button>
        <button className="p-1.5 rounded text-slate-400 hover:text-red-400 hover:bg-red-500/10"><Trash2 size={12} /></button>
      </div>
    )},
  ];

  const auditColumns: Column<typeof mockAuditLog[0]>[] = [
    { key: 'user', header: 'User', sortable: true, render: (item) => <span className="text-sm text-white">{item.user}</span> },
    { key: 'action', header: 'Action', render: (item) => <span className="text-sm text-slate-300">{item.action}</span> },
    { key: 'resource', header: 'Resource', render: (item) => <Badge variant="outline" size="sm">{item.resource}</Badge> },
    { key: 'ip', header: 'IP Address', render: (item) => <span className="text-xs font-mono text-slate-500">{item.ip}</span> },
    { key: 'timestamp', header: 'Time', sortable: true, render: (item) => <span className="text-xs text-slate-400">{new Date(item.timestamp).toLocaleString()}</span> },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Admin Panel</h1>
          <p className="text-sm text-slate-400 mt-1">System administration, user management, and audit logs</p>
        </div>
        <Badge variant="danger" size="md"><Shield size={12} /> Admin Access</Badge>
      </div>

      <Tabs items={tabs} activeTab={activeTab} onChange={setActiveTab} />

      {activeTab === 'users' && (
        <div className="space-y-4">
          <div className="flex justify-end">
            <Button size="sm" icon={<Plus size={14} />}>Add User</Button>
          </div>
          <Table columns={userColumns} data={mockAdminUsers} pageSize={10} />
        </div>
      )}

      {activeTab === 'audit' && (
        <Table columns={auditColumns} data={mockAuditLog} pageSize={10} />
      )}

      {activeTab === 'api' && (
        <Card hover={false}>
          <CardHeader>
            <CardTitle>API Keys</CardTitle>
            <Button size="sm" icon={<Plus size={14} />}>Generate Key</Button>
          </CardHeader>
          <div className="space-y-3 mt-4">
            {[
              { name: 'Production API Key', key: 'cn_prod_****_****_8f2a', created: '2025-01-15', status: 'active' },
              { name: 'Staging API Key', key: 'cn_stag_****_****_3b7c', created: '2025-03-20', status: 'active' },
              { name: 'Development API Key', key: 'cn_dev_****_****_9d1e', created: '2025-06-10', status: 'revoked' },
            ].map(apiKey => (
              <div key={apiKey.key} className="flex items-center gap-4 p-3 rounded-lg bg-white/[0.02]">
                <Key size={16} className="text-slate-400" />
                <div className="flex-1">
                  <p className="text-sm text-white">{apiKey.name}</p>
                  <p className="text-xs font-mono text-slate-500">{apiKey.key}</p>
                </div>
                <Badge variant={apiKey.status === 'active' ? 'success' : 'danger'} size="sm">{apiKey.status}</Badge>
                <div className="flex gap-1">
                  <Button size="sm" variant="ghost" icon={<Eye size={12} />}>Show</Button>
                  <Button size="sm" variant="ghost" icon={<X size={12} />}>Revoke</Button>
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}

      {activeTab === 'system' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            { label: 'Database', value: 'PostgreSQL 16.2', status: 'healthy', uptime: '99.99%' },
            { label: 'Graph DB', value: 'Neo4j 5.15', status: 'healthy', uptime: '99.97%' },
            { label: 'Cache', value: 'Redis 7.2', status: 'healthy', uptime: '99.99%' },
            { label: 'Search', value: 'Elasticsearch 8.12', status: 'healthy', uptime: '99.95%' },
            { label: 'API Server', value: 'FastAPI 0.109', status: 'healthy', uptime: '99.98%' },
            { label: 'ML Pipeline', value: 'spaCy 3.7 + PyTorch 2.1', status: 'healthy', uptime: '99.90%' },
          ].map(service => (
            <Card key={service.label} hover={false} padding="md">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Database size={18} className="text-cyber-blue" />
                  <div>
                    <p className="text-sm font-medium text-white">{service.label}</p>
                    <p className="text-xs text-slate-500">{service.value}</p>
                  </div>
                </div>
                <div className="text-right">
                  <Badge variant="success" size="sm" dot pulse>{service.status}</Badge>
                  <p className="text-[10px] text-slate-600 mt-1">Uptime: {service.uptime}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
