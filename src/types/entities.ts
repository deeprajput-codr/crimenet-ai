// ============================================================
// CrimeNet AI — Entity Type Definitions
// ============================================================

// ---- Common Types ----
export type RiskLevel = 'critical' | 'high' | 'medium' | 'low' | 'none';
export type CaseStatus = 'active' | 'closed' | 'cold' | 'pending' | 'under-review';
export type EvidenceType = 'document' | 'digital' | 'physical' | 'testimony' | 'surveillance' | 'forensic';
export type AlertSeverity = 'critical' | 'high' | 'medium' | 'low';
export type UserRole = 'investigator' | 'intelligence_analyst' | 'senior_officer' | 'administrator';

export interface DateRange {
  start: string;
  end: string;
}

// ---- Person / POI ----
export interface Person {
  id: string;
  name: string;
  aliases: string[];
  age: number;
  gender: 'male' | 'female' | 'other';
  photo?: string;
  aadharNumber?: string;
  panNumber?: string;
  phone: string[];
  email?: string;
  address: Address;
  occupation?: string;
  riskScore: number; // 0-100
  riskLevel: RiskLevel;
  status: 'wanted' | 'arrested' | 'under-surveillance' | 'suspect' | 'witness' | 'informant' | 'cleared';
  associatedCases: string[];
  knownAssociates: string[];
  criminalHistory: CriminalRecord[];
  lastKnownLocation?: GeoLocation;
  lastSeen?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CriminalRecord {
  id: string;
  ipcSection: string;
  description: string;
  date: string;
  court?: string;
  verdict?: 'convicted' | 'acquitted' | 'pending' | 'absconding';
  sentence?: string;
}

export interface Address {
  street: string;
  area: string;
  city: string;
  state: string;
  pincode: string;
  coordinates?: GeoLocation;
}

export interface GeoLocation {
  lat: number;
  lng: number;
}

// ---- Cases ----
export interface Case {
  id: string;
  firNumber: string;
  title: string;
  description: string;
  status: CaseStatus;
  priority: RiskLevel;
  category: CrimeCategory;
  ipcSections: string[];
  policeStation: string;
  district: string;
  state: string;
  leadInvestigator: string;
  team: string[];
  suspects: string[];
  victims: string[];
  witnesses: string[];
  evidence: string[];
  vehicles: string[];
  organizations: string[];
  timeline: TimelineEvent[];
  location: Address;
  filedDate: string;
  lastUpdated: string;
  closedDate?: string;
  riskScore: number;
  notes: string[];
}

export type CrimeCategory =
  | 'murder'
  | 'robbery'
  | 'cybercrime'
  | 'narcotics'
  | 'fraud'
  | 'kidnapping'
  | 'extortion'
  | 'terrorism'
  | 'human-trafficking'
  | 'organized-crime'
  | 'arms-dealing'
  | 'money-laundering'
  | 'assault'
  | 'theft'
  | 'other';

// ---- Vehicles ----
export interface Vehicle {
  id: string;
  registrationNumber: string;
  type: 'car' | 'motorcycle' | 'truck' | 'auto-rickshaw' | 'bus' | 'van' | 'other';
  make: string;
  model: string;
  color: string;
  year: number;
  ownerName: string;
  ownerId: string;
  status: 'active' | 'stolen' | 'seized' | 'wanted' | 'cleared';
  associatedCases: string[];
  lastKnownLocation?: GeoLocation;
  lastSeen?: string;
  trackingHistory: VehicleTracking[];
  riskScore: number;
}

export interface VehicleTracking {
  timestamp: string;
  location: GeoLocation;
  speed?: number;
  source: 'anpr' | 'gps' | 'manual' | 'cctv';
}

// ---- Organizations ----
export interface Organization {
  id: string;
  name: string;
  type: 'gang' | 'syndicate' | 'shell-company' | 'ngo' | 'business' | 'political' | 'other';
  description: string;
  status: 'active' | 'disbanded' | 'under-investigation' | 'banned';
  leaders: string[];
  members: string[];
  associatedCases: string[];
  territory?: string[];
  riskScore: number;
  financialLinks?: string[];
  establishedDate?: string;
}

// ---- Evidence ----
export interface Evidence {
  id: string;
  caseId: string;
  type: EvidenceType;
  title: string;
  description: string;
  source: string;
  content: string;
  extractedEntities: ExtractedEntity[];
  confidenceScore: number; // 0-100
  verificationStatus: 'verified' | 'unverified' | 'disputed' | 'pending';
  addedBy: string;
  addedAt: string;
  tags: string[];
  fileUrl?: string;
  fileType?: string;
}

export interface ExtractedEntity {
  id: string;
  text: string;
  type: 'person' | 'phone' | 'vehicle' | 'location' | 'organization' | 'date' | 'money' | 'weapon';
  confidence: number;
  startIndex: number;
  endIndex: number;
  linkedEntityId?: string;
}

// ---- Timeline ----
export interface TimelineEvent {
  id: string;
  caseId?: string;
  type: 'call' | 'meeting' | 'transaction' | 'arrest' | 'movement' | 'surveillance' | 'incident' | 'court' | 'evidence-found' | 'tip-received';
  title: string;
  description: string;
  timestamp: string;
  location?: Address;
  persons: string[];
  evidence?: string[];
  severity: AlertSeverity;
  verified: boolean;
}

// ---- Alerts ----
export interface Alert {
  id: string;
  type: 'new-connection' | 'emerging-cluster' | 'high-risk-entity' | 'repeat-offender' | 'pattern-detected' | 'geofence-breach' | 'new-evidence' | 'case-update';
  severity: AlertSeverity;
  title: string;
  description: string;
  entityId?: string;
  entityType?: string;
  caseId?: string;
  timestamp: string;
  read: boolean;
  acknowledged: boolean;
  actionTaken?: string;
  generatedBy: 'ai' | 'system' | 'manual';
}

// ---- User ----
export interface User {
  id: string;
  name: string;
  email: string;
  badgeNumber: string;
  role: UserRole;
  department: string;
  rank: string;
  phone: string;
  avatar?: string;
  permissions: Permission[];
  lastLogin: string;
  isActive: boolean;
  mfaEnabled: boolean;
  createdAt: string;
}

export type Permission =
  | 'view_cases'
  | 'edit_cases'
  | 'create_cases'
  | 'delete_cases'
  | 'view_persons'
  | 'edit_persons'
  | 'view_evidence'
  | 'manage_evidence'
  | 'view_graph'
  | 'edit_graph'
  | 'run_analysis'
  | 'view_reports'
  | 'generate_reports'
  | 'manage_users'
  | 'manage_system'
  | 'view_audit_log'
  | 'use_copilot'
  | 'view_vehicles'
  | 'manage_alerts';

// ---- Report ----
export interface Report {
  id: string;
  title: string;
  type: 'investigation-brief' | 'network-analysis' | 'risk-assessment' | 'case-summary' | 'intelligence-report';
  caseId?: string;
  generatedBy: string;
  generatedAt: string;
  sections: ReportSection[];
  status: 'draft' | 'final' | 'archived';
}

export interface ReportSection {
  title: string;
  content: string;
  type: 'text' | 'table' | 'chart' | 'graph' | 'image';
}

// ---- Analytics ----
export interface AnalyticsData {
  caseTrends: { date: string; count: number; category: CrimeCategory }[];
  crimeDistribution: { category: CrimeCategory; count: number; percentage: number }[];
  riskDistribution: { level: RiskLevel; count: number }[];
  networkGrowth: { date: string; nodes: number; edges: number }[];
  resolutionRate: { month: string; resolved: number; total: number; rate: number }[];
  topHotspots: { location: string; crimeCount: number; riskScore: number }[];
}

// ---- Search ----
export interface SearchResult {
  id: string;
  type: 'person' | 'case' | 'vehicle' | 'organization' | 'evidence';
  title: string;
  subtitle: string;
  riskScore?: number;
  matchedFields: string[];
  relatedCount: number;
  timestamp: string;
}

export interface SearchFilters {
  query: string;
  entityType?: SearchResult['type'];
  riskLevel?: RiskLevel;
  dateRange?: DateRange;
  status?: string;
  location?: string;
}
