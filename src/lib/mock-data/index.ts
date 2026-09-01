// ============================================================
// CrimeNet AI — Mock Data: Vehicles, Orgs, Evidence, Alerts, 
//                           Timeline, Graph, Analytics
// ============================================================

import type { Vehicle, Organization, Evidence, Alert, TimelineEvent, AnalyticsData } from '@/types/entities';
import type { CrimeNetNode, CrimeNetEdge } from '@/types/graph';

// ---- VEHICLES ----
export const mockVehicles: Vehicle[] = [
  { id: 'V001', registrationNumber: 'DL-01-AB-1234', type: 'car', make: 'Toyota', model: 'Fortuner', color: 'White', year: 2022, ownerName: 'Vikram Singh Rathore', ownerId: 'P001', status: 'wanted', associatedCases: ['CASE001'], lastKnownLocation: { lat: 28.7041, lng: 77.1025 }, lastSeen: '2025-08-28T14:30:00Z', trackingHistory: [{ timestamp: '2025-08-28T14:30:00Z', location: { lat: 28.7041, lng: 77.1025 }, speed: 0, source: 'anpr' }], riskScore: 90 },
  { id: 'V002', registrationNumber: 'UP-32-CD-5678', type: 'car', make: 'Honda', model: 'City', color: 'Silver', year: 2021, ownerName: 'Priya Sharma', ownerId: 'P003', status: 'active', associatedCases: ['CASE002'], lastKnownLocation: { lat: 26.8467, lng: 80.9462 }, lastSeen: '2025-08-29T08:45:00Z', trackingHistory: [], riskScore: 55 },
  { id: 'V003', registrationNumber: 'PB-10-EF-9012', type: 'truck', make: 'Tata', model: 'Prima', color: 'Blue', year: 2020, ownerName: 'Gurpreet Singh Sandhu', ownerId: 'P012', status: 'wanted', associatedCases: ['CASE001', 'CASE004'], lastKnownLocation: { lat: 30.9010, lng: 75.8573 }, lastSeen: '2025-08-25T22:00:00Z', trackingHistory: [{ timestamp: '2025-08-25T22:00:00Z', location: { lat: 30.9010, lng: 75.8573 }, speed: 65, source: 'gps' }, { timestamp: '2025-08-25T20:00:00Z', location: { lat: 30.7333, lng: 76.7794 }, speed: 80, source: 'anpr' }], riskScore: 88 },
  { id: 'V004', registrationNumber: 'TS-09-GH-3456', type: 'motorcycle', make: 'Royal Enfield', model: 'Classic 350', color: 'Black', year: 2023, ownerName: 'Mohammed Imran Khan', ownerId: 'P005', status: 'seized', associatedCases: ['CASE003'], lastKnownLocation: { lat: 17.3616, lng: 78.4747 }, lastSeen: '2025-08-20T16:00:00Z', trackingHistory: [], riskScore: 60 },
  { id: 'V005', registrationNumber: 'DL-05-IJ-7890', type: 'van', make: 'Maruti', model: 'Eeco', color: 'White', year: 2019, ownerName: 'Unknown', ownerId: '', status: 'wanted', associatedCases: ['CASE001'], lastKnownLocation: { lat: 28.6139, lng: 77.2090 }, lastSeen: '2025-08-27T03:15:00Z', trackingHistory: [{ timestamp: '2025-08-27T03:15:00Z', location: { lat: 28.6139, lng: 77.2090 }, speed: 45, source: 'cctv' }], riskScore: 75 },
  { id: 'V006', registrationNumber: 'AP-28-KL-1234', type: 'car', make: 'Hyundai', model: 'Creta', color: 'Red', year: 2024, ownerName: 'Suresh Reddy', ownerId: 'P008', status: 'active', associatedCases: ['CASE003'], lastKnownLocation: { lat: 17.4326, lng: 78.4071 }, lastSeen: '2025-08-30T20:00:00Z', trackingHistory: [], riskScore: 40 },
  { id: 'V007', registrationNumber: 'TS-12-MN-5678', type: 'auto-rickshaw', make: 'Bajaj', model: 'RE', color: 'Yellow-Green', year: 2018, ownerName: 'Unknown', ownerId: '', status: 'cleared', associatedCases: ['CASE003'], lastKnownLocation: { lat: 17.3850, lng: 78.4867 }, lastSeen: '2025-07-15T12:00:00Z', trackingHistory: [], riskScore: 10 },
  { id: 'V008', registrationNumber: 'BR-01-OP-9012', type: 'truck', make: 'Ashok Leyland', model: 'BOSS', color: 'Green', year: 2021, ownerName: 'Anil Tiwari', ownerId: 'P010', status: 'seized', associatedCases: ['CASE004'], lastKnownLocation: { lat: 25.6093, lng: 85.1376 }, lastSeen: '2025-08-10T04:00:00Z', trackingHistory: [], riskScore: 82 },
];

// ---- ORGANIZATIONS ----
export const mockOrganizations: Organization[] = [
  { id: 'ORG001', name: 'Rohini Syndicate', type: 'syndicate', description: 'Drug trafficking syndicate operating across Delhi-NCR and Punjab', status: 'active', leaders: ['P001'], members: ['P002', 'P005', 'P008', 'P012'], associatedCases: ['CASE001'], territory: ['Delhi', 'Haryana', 'Punjab'], riskScore: 95 },
  { id: 'ORG002', name: 'Sharma Financial Services Pvt. Ltd.', type: 'shell-company', description: 'Shell company used for money laundering and fake invoicing', status: 'under-investigation', leaders: ['P003'], members: ['P009'], associatedCases: ['CASE002', 'CASE007'], riskScore: 72 },
  { id: 'ORG003', name: 'FastTrack Logistics', type: 'business', description: 'Legitimate transport company suspected of being used for drug movement', status: 'under-investigation', leaders: ['P012'], members: ['P004'], associatedCases: ['CASE001'], riskScore: 68 },
  { id: 'ORG004', name: 'Lucknow Trade Corporation', type: 'shell-company', description: 'Shell entity for GST fraud operations', status: 'under-investigation', leaders: ['P003'], members: [], associatedCases: ['CASE002'], riskScore: 65 },
  { id: 'ORG005', name: 'Hyderabad Auto Exports', type: 'business', description: 'Front for stolen vehicle resale operations', status: 'active', leaders: ['P005'], members: [], associatedCases: ['CASE003'], riskScore: 70 },
  { id: 'ORG006', name: 'Patna Truckers Union', type: 'gang', description: 'Criminal gang posing as transport union. Involved in arms smuggling and extortion.', status: 'active', leaders: ['P010'], members: ['P004'], associatedCases: ['CASE004', 'CASE008'], territory: ['Bihar', 'Jharkhand'], riskScore: 85 },
  { id: 'ORG007', name: 'Rajasthan Marble Consortium', type: 'business', description: 'Illegal mining operations with political connections', status: 'under-investigation', leaders: ['P007'], members: [], associatedCases: ['CASE005', 'CASE009'], riskScore: 52 },
  { id: 'ORG008', name: 'Gulf Star Trading FZE', type: 'shell-company', description: 'Dubai-based company used for gold smuggling and hawala', status: 'active', leaders: ['P006'], members: ['P011'], associatedCases: ['CASE006', 'CASE007'], riskScore: 78 },
];

// ---- EVIDENCE ----
export const mockEvidence: Evidence[] = [
  { id: 'E001', caseId: 'CASE001', type: 'digital', title: 'CDR Analysis - Vikram Rathore', description: 'Call Detail Records showing communication pattern between suspects over 6 months', source: 'Telecom Provider', content: 'Analysis of 2,847 calls and 1,203 SMS between P001, P002, P005, P012. Peak communication during drug shipment dates.', extractedEntities: [{ id: 'EE001', text: 'Vikram Singh Rathore', type: 'person', confidence: 98, startIndex: 0, endIndex: 21, linkedEntityId: 'P001' }, { id: 'EE002', text: '+91-98765-43210', type: 'phone', confidence: 100, startIndex: 25, endIndex: 40 }], confidenceScore: 95, verificationStatus: 'verified', addedBy: 'SI Rahul Verma', addedAt: '2025-03-15T10:00:00Z', tags: ['CDR', 'phone-records', 'network-analysis'] },
  { id: 'E002', caseId: 'CASE002', type: 'document', title: 'Fake GST Invoice Bundle', description: 'Set of 47 fake GST invoices totaling ₹12.5 crores', source: 'Raid Recovery', content: 'Invoices from 12 non-existent companies. All bearing forged signatures and fake GSTIN numbers.', extractedEntities: [{ id: 'EE003', text: 'Sharma Financial Services', type: 'organization', confidence: 92, startIndex: 0, endIndex: 25, linkedEntityId: 'ORG002' }], confidenceScore: 88, verificationStatus: 'verified', addedBy: 'Inspector Sanjay Gupta', addedAt: '2025-04-20T14:30:00Z', tags: ['financial', 'forgery', 'GST-fraud'] },
  { id: 'E003', caseId: 'CASE001', type: 'surveillance', title: 'CCTV Footage - Rohini Warehouse', description: 'CCTV footage showing drug packaging operation at warehouse', source: 'Police Surveillance', content: '48-hour surveillance footage from hidden camera. Shows P001 and P005 handling contraband.', extractedEntities: [], confidenceScore: 92, verificationStatus: 'verified', addedBy: 'ASI Pooja Singh', addedAt: '2025-06-10T08:00:00Z', tags: ['CCTV', 'surveillance', 'visual-evidence'] },
  { id: 'E004', caseId: 'CASE003', type: 'digital', title: 'ANPR Hits - Stolen Vehicles', description: 'ANPR camera captures of vehicles with tampered number plates', source: 'Traffic Department', content: 'ANPR system flagged 8 vehicles with mismatched registration details on NH-44.', extractedEntities: [{ id: 'EE004', text: 'TS-09-GH-3456', type: 'vehicle', confidence: 97, startIndex: 0, endIndex: 14, linkedEntityId: 'V004' }], confidenceScore: 85, verificationStatus: 'verified', addedBy: 'Inspector Ramesh Babu', addedAt: '2025-01-05T16:00:00Z', tags: ['ANPR', 'vehicle', 'digital'] },
  { id: 'E005', caseId: 'CASE001', type: 'physical', title: 'Seized Drug Consignment', description: '15 kg heroin seized from truck at Panipat toll plaza', source: 'STF Raid', content: 'Heroin concealed in modified fuel tank. Street value estimated at ₹75 crores.', extractedEntities: [{ id: 'EE005', text: 'PB-10-EF-9012', type: 'vehicle', confidence: 100, startIndex: 0, endIndex: 14, linkedEntityId: 'V003' }], confidenceScore: 100, verificationStatus: 'verified', addedBy: 'ACP Meera Joshi', addedAt: '2025-07-22T04:30:00Z', tags: ['narcotics', 'seizure', 'physical'] },
  { id: 'E006', caseId: 'CASE002', type: 'digital', title: 'Bank Transaction Records', description: 'Suspicious transactions across 8 bank accounts linked to shell companies', source: 'Financial Intelligence Unit', content: '₹450 crore routed through multiple layers. Round-tripping pattern detected.', extractedEntities: [{ id: 'EE006', text: '₹450 crore', type: 'money', confidence: 95, startIndex: 0, endIndex: 10 }], confidenceScore: 90, verificationStatus: 'verified', addedBy: 'SP Karan Malhotra', addedAt: '2025-05-18T11:00:00Z', tags: ['financial', 'bank-records', 'money-trail'] },
  { id: 'E007', caseId: 'CASE003', type: 'testimony', title: 'Informant Statement - Vehicle Network', description: 'Confidential informant provides details about stolen vehicle distribution network', source: 'CI Report', content: 'CI states vehicles stolen in Hyderabad are transported to AP and Karnataka within 48 hours. New number plates arranged through RTO contacts.', extractedEntities: [{ id: 'EE007', text: 'Hyderabad', type: 'location', confidence: 100, startIndex: 0, endIndex: 9 }], confidenceScore: 72, verificationStatus: 'unverified', addedBy: 'DCP Anand Rao', addedAt: '2025-02-14T09:00:00Z', tags: ['informant', 'testimony', 'HUMINT'] },
  { id: 'E008', caseId: 'CASE004', type: 'physical', title: 'Arms Cache Recovery', description: '12 country-made pistols, 200 rounds ammunition recovered from farmhouse', source: 'STF Raid', content: 'Arms cache found buried in farmhouse premises. Serial numbers filed off. Ballistic analysis pending.', extractedEntities: [{ id: 'EE008', text: 'country-made pistols', type: 'weapon', confidence: 100, startIndex: 0, endIndex: 20 }], confidenceScore: 100, verificationStatus: 'verified', addedBy: 'SP Vikash Ranjan', addedAt: '2025-08-10T06:00:00Z', tags: ['arms', 'seizure', 'physical', 'ballistics'] },
];

// ---- ALERTS ----
export const mockAlerts: Alert[] = [
  { id: 'AL001', type: 'high-risk-entity', severity: 'critical', title: 'New Connection Detected: Vikram-Mumbai Link', description: 'Previously unknown connection between Vikram Rathore (P001) and Mumbai-based hawala operator detected through CDR analysis.', entityId: 'P001', entityType: 'person', caseId: 'CASE001', timestamp: '2025-08-31T10:30:00Z', read: false, acknowledged: false, generatedBy: 'ai' },
  { id: 'AL002', type: 'emerging-cluster', severity: 'high', title: 'New Criminal Cluster Forming in Bihar', description: 'AI analysis detected 4 new connections between previously unlinked suspects in Patna region.', caseId: 'CASE004', timestamp: '2025-08-31T09:15:00Z', read: false, acknowledged: false, generatedBy: 'ai' },
  { id: 'AL003', type: 'geofence-breach', severity: 'critical', title: 'Wanted Vehicle Spotted: DL-01-AB-1234', description: 'ANPR hit on vehicle registered to Vikram Rathore near Connaught Place, Delhi.', entityId: 'V001', entityType: 'vehicle', caseId: 'CASE001', timestamp: '2025-08-31T08:45:00Z', read: false, acknowledged: false, generatedBy: 'system' },
  { id: 'AL004', type: 'pattern-detected', severity: 'high', title: 'Unusual Financial Activity Pattern', description: 'Spike in transactions detected across shell company accounts linked to CASE002.', caseId: 'CASE002', timestamp: '2025-08-31T07:30:00Z', read: true, acknowledged: false, generatedBy: 'ai' },
  { id: 'AL005', type: 'new-evidence', severity: 'medium', title: 'New Digital Evidence Available', description: 'Fresh CDR data received from telecom provider for 3 phone numbers under surveillance.', caseId: 'CASE001', timestamp: '2025-08-30T22:00:00Z', read: true, acknowledged: true, generatedBy: 'system' },
  { id: 'AL006', type: 'repeat-offender', severity: 'high', title: 'Repeat Offender Activity: Anil Tiwari', description: 'Anil Tiwari (P010) detected at known arms dealing location despite bail conditions.', entityId: 'P010', entityType: 'person', caseId: 'CASE004', timestamp: '2025-08-30T18:30:00Z', read: false, acknowledged: false, generatedBy: 'system' },
  { id: 'AL007', type: 'case-update', severity: 'medium', title: 'Case CASE010 Status Changed', description: 'Cyber fraud case marked as closed. 22 arrests made successfully.', caseId: 'CASE010', timestamp: '2025-08-30T16:00:00Z', read: true, acknowledged: true, generatedBy: 'system' },
  { id: 'AL008', type: 'new-connection', severity: 'medium', title: 'Cross-State Link Identified', description: 'Entity resolution engine matched Kerala gold smuggling suspect with Mumbai hawala case.', caseId: 'CASE006', timestamp: '2025-08-30T14:15:00Z', read: true, acknowledged: false, generatedBy: 'ai' },
  { id: 'AL009', type: 'high-risk-entity', severity: 'critical', title: 'Absconding Suspect Near Border', description: 'Gurpreet Singh Sandhu (P012) mobile phone detected near Wagah border, Punjab.', entityId: 'P012', entityType: 'person', caseId: 'CASE001', timestamp: '2025-08-30T11:00:00Z', read: false, acknowledged: false, generatedBy: 'system' },
  { id: 'AL010', type: 'pattern-detected', severity: 'low', title: 'Communication Pattern Shift', description: 'Suspects in CASE003 have switched to encrypted messaging platforms.', caseId: 'CASE003', timestamp: '2025-08-30T09:45:00Z', read: true, acknowledged: true, generatedBy: 'ai' },
  { id: 'AL011', type: 'new-evidence', severity: 'high', title: 'Satellite Imagery Available', description: 'Fresh satellite imagery of suspected illegal mining site in Banswara, Rajasthan.', caseId: 'CASE009', timestamp: '2025-08-29T20:00:00Z', read: true, acknowledged: false, generatedBy: 'system' },
  { id: 'AL012', type: 'emerging-cluster', severity: 'medium', title: 'Financial Network Expansion', description: 'Two new shell companies identified as potential links to Mumbai hawala network.', caseId: 'CASE007', timestamp: '2025-08-29T15:30:00Z', read: true, acknowledged: true, generatedBy: 'ai' },
];

// ---- TIMELINE EVENTS ----
export const mockTimelineEvents: TimelineEvent[] = [
  { id: 'TL001', caseId: 'CASE001', type: 'tip-received', title: 'Intelligence Input Received', description: 'Confidential source reports drug shipment planned via Panipat-Delhi route.', timestamp: '2025-08-28T06:00:00Z', persons: ['P001'], severity: 'high', verified: true },
  { id: 'TL002', caseId: 'CASE001', type: 'surveillance', title: 'Surveillance Deployed', description: 'Technical and physical surveillance initiated on Rohini warehouse.', timestamp: '2025-08-28T10:00:00Z', persons: ['P001', 'P005'], severity: 'medium', verified: true },
  { id: 'TL003', caseId: 'CASE001', type: 'call', title: 'Intercepted Communication', description: 'P001 calls P012 discussing "consignment" arrival timing. Duration: 4 min 23 sec.', timestamp: '2025-08-28T14:30:00Z', persons: ['P001', 'P012'], severity: 'high', verified: true },
  { id: 'TL004', caseId: 'CASE001', type: 'movement', title: 'Vehicle Movement Detected', description: 'V003 (Tata Prima truck) enters Delhi via NH-44. ANPR hit at Sonipat toll.', timestamp: '2025-08-28T18:00:00Z', persons: ['P012'], evidence: ['E004'], severity: 'high', verified: true },
  { id: 'TL005', caseId: 'CASE001', type: 'arrest', title: 'Interception at Panipat Toll', description: 'STF intercepts V003 at Panipat toll plaza. 15 kg heroin seized from modified fuel tank.', timestamp: '2025-08-28T22:30:00Z', persons: ['P012'], evidence: ['E005'], severity: 'critical', verified: true },
  { id: 'TL006', caseId: 'CASE002', type: 'evidence-found', title: 'Fake Invoices Discovered', description: '47 fake GST invoices recovered during raid on Lucknow office.', timestamp: '2025-08-20T11:00:00Z', persons: ['P003'], evidence: ['E002'], severity: 'high', verified: true },
  { id: 'TL007', caseId: 'CASE002', type: 'transaction', title: 'Suspicious Transfer Flagged', description: '₹2.3 crore transferred to unknown Dubai account from shell company.', timestamp: '2025-08-25T15:30:00Z', persons: ['P003'], evidence: ['E006'], severity: 'high', verified: true },
  { id: 'TL008', caseId: 'CASE004', type: 'arrest', title: 'Arms Cache Recovered', description: '12 country-made pistols and 200 rounds seized from farmhouse near Patna.', timestamp: '2025-08-10T04:30:00Z', persons: ['P004', 'P010'], evidence: ['E008'], severity: 'critical', verified: true },
  { id: 'TL009', caseId: 'CASE003', type: 'incident', title: 'Vehicle Theft Reported', description: 'Hyundai Creta (TS-28-XX-4567) reported stolen from Banjara Hills, Hyderabad.', timestamp: '2025-08-15T07:00:00Z', persons: [], severity: 'medium', verified: true },
  { id: 'TL010', caseId: 'CASE007', type: 'meeting', title: 'Suspected Hawala Exchange', description: 'Surveillance shows P002 meeting unknown person at Bandra cafe. Cash exchange suspected.', timestamp: '2025-08-22T20:00:00Z', persons: ['P002'], severity: 'high', verified: false },
  { id: 'TL011', caseId: 'CASE006', type: 'evidence-found', title: 'Gold Bars Seized at Kochi Port', description: '5 kg gold bars found in diplomatic consignment at Kochi port.', timestamp: '2025-08-18T09:00:00Z', persons: ['P006'], evidence: ['E014'], severity: 'critical', verified: true },
  { id: 'TL012', caseId: 'CASE001', type: 'court', title: 'Bail Hearing - Rajesh Kumar', description: 'Court denies bail for P004. Next hearing scheduled for September 15.', timestamp: '2025-08-29T10:00:00Z', persons: ['P004'], severity: 'low', verified: true },
];

// ---- GRAPH DATA ----
export const mockGraphNodes: CrimeNetNode[] = [
  { id: 'P001', type: 'default', position: { x: 400, y: 300 }, data: { label: 'Vikram Rathore', nodeType: 'criminal', riskScore: 92, entityId: 'P001', subtitle: 'Drug Syndicate Leader', status: 'wanted' } },
  { id: 'P002', type: 'default', position: { x: 700, y: 200 }, data: { label: 'Arjun Deshmukh', nodeType: 'suspect', riskScore: 78, entityId: 'P002', subtitle: 'Real Estate Developer', status: 'surveillance' } },
  { id: 'P003', type: 'default', position: { x: 200, y: 500 }, data: { label: 'Priya Sharma', nodeType: 'suspect', riskScore: 65, entityId: 'P003', subtitle: 'Financial Consultant', status: 'suspect' } },
  { id: 'P004', type: 'default', position: { x: 100, y: 200 }, data: { label: 'Rajesh Yadav', nodeType: 'criminal', riskScore: 85, entityId: 'P004', subtitle: 'Transporter', status: 'arrested' } },
  { id: 'P005', type: 'default', position: { x: 550, y: 500 }, data: { label: 'Imran Khan', nodeType: 'suspect', riskScore: 71, entityId: 'P005', subtitle: 'Auto Parts Dealer', status: 'suspect' } },
  { id: 'P006', type: 'default', position: { x: 850, y: 400 }, data: { label: 'Kavitha Nair', nodeType: 'suspect', riskScore: 58, entityId: 'P006', subtitle: 'Import-Export', status: 'surveillance' } },
  { id: 'P010', type: 'default', position: { x: 100, y: 400 }, data: { label: 'Anil Tiwari', nodeType: 'suspect', riskScore: 73, entityId: 'P010', subtitle: 'Political Worker', status: 'suspect' } },
  { id: 'P012', type: 'default', position: { x: 300, y: 100 }, data: { label: 'Gurpreet Sandhu', nodeType: 'criminal', riskScore: 88, entityId: 'P012', subtitle: 'Truck Fleet Owner', status: 'wanted' } },
  { id: 'CASE001', type: 'default', position: { x: 400, y: 100 }, data: { label: 'Rohini Drug Syndicate', nodeType: 'case', riskScore: 95, entityId: 'CASE001', subtitle: 'FIR/2025/DL/001234' } },
  { id: 'CASE002', type: 'default', position: { x: 200, y: 650 }, data: { label: 'Lucknow Fraud Ring', nodeType: 'case', riskScore: 78, entityId: 'CASE002', subtitle: 'FIR/2025/UP/005678' } },
  { id: 'CASE007', type: 'default', position: { x: 800, y: 300 }, data: { label: 'Mumbai Hawala', nodeType: 'case', riskScore: 88, entityId: 'CASE007', subtitle: 'FIR/2024/MH/006789' } },
  { id: 'ORG001', type: 'default', position: { x: 500, y: 150 }, data: { label: 'Rohini Syndicate', nodeType: 'organization', riskScore: 95, entityId: 'ORG001', subtitle: 'Drug Network' } },
  { id: 'ORG002', type: 'default', position: { x: 350, y: 600 }, data: { label: 'Sharma Financial', nodeType: 'organization', riskScore: 72, entityId: 'ORG002', subtitle: 'Shell Company' } },
  { id: 'V001', type: 'default', position: { x: 550, y: 350 }, data: { label: 'DL-01-AB-1234', nodeType: 'vehicle', riskScore: 90, entityId: 'V001', subtitle: 'Toyota Fortuner' } },
  { id: 'V003', type: 'default', position: { x: 250, y: 200 }, data: { label: 'PB-10-EF-9012', nodeType: 'vehicle', riskScore: 88, entityId: 'V003', subtitle: 'Tata Prima Truck' } },
];

export const mockGraphEdges: CrimeNetEdge[] = [
  { id: 'e1', source: 'P001', target: 'P002', label: 'associates', data: { relationship: 'associates-with', weight: 8 } },
  { id: 'e2', source: 'P001', target: 'P005', label: 'associates', data: { relationship: 'associates-with', weight: 9 } },
  { id: 'e3', source: 'P001', target: 'P012', label: 'associates', data: { relationship: 'associates-with', weight: 10 } },
  { id: 'e4', source: 'P001', target: 'CASE001', label: 'suspect in', data: { relationship: 'suspects-in', weight: 10 } },
  { id: 'e5', source: 'P002', target: 'CASE001', label: 'suspect in', data: { relationship: 'suspects-in', weight: 7 } },
  { id: 'e6', source: 'P002', target: 'CASE007', label: 'suspect in', data: { relationship: 'suspects-in', weight: 8 } },
  { id: 'e7', source: 'P003', target: 'CASE002', label: 'suspect in', data: { relationship: 'suspects-in', weight: 9 } },
  { id: 'e8', source: 'P003', target: 'P002', label: 'financial link', data: { relationship: 'financial-link', weight: 6 } },
  { id: 'e9', source: 'P004', target: 'CASE002', label: 'suspect in', data: { relationship: 'suspects-in', weight: 7 } },
  { id: 'e10', source: 'P004', target: 'P010', label: 'associates', data: { relationship: 'associates-with', weight: 8 } },
  { id: 'e11', source: 'P005', target: 'CASE001', label: 'suspect in', data: { relationship: 'suspects-in', weight: 6 } },
  { id: 'e12', source: 'P012', target: 'CASE001', label: 'suspect in', data: { relationship: 'suspects-in', weight: 9 } },
  { id: 'e13', source: 'P001', target: 'ORG001', label: 'leads', data: { relationship: 'member-of', weight: 10 } },
  { id: 'e14', source: 'P003', target: 'ORG002', label: 'leads', data: { relationship: 'member-of', weight: 9 } },
  { id: 'e15', source: 'P001', target: 'V001', label: 'owns', data: { relationship: 'owns', weight: 10 } },
  { id: 'e16', source: 'P012', target: 'V003', label: 'owns', data: { relationship: 'owns', weight: 10 } },
  { id: 'e17', source: 'P006', target: 'CASE007', label: 'suspect in', data: { relationship: 'suspects-in', weight: 5 } },
  { id: 'e18', source: 'P006', target: 'P002', label: 'contacted', data: { relationship: 'contacted', weight: 4 } },
  { id: 'e19', source: 'P010', target: 'P012', label: 'associates', data: { relationship: 'associates-with', weight: 7 } },
  { id: 'e20', source: 'ORG001', target: 'CASE001', label: 'involved in', data: { relationship: 'involved-in', weight: 10 } },
  { id: 'e21', source: 'ORG002', target: 'CASE002', label: 'involved in', data: { relationship: 'involved-in', weight: 9 } },
  { id: 'e22', source: 'V003', target: 'CASE001', label: 'linked to', data: { relationship: 'linked-to', weight: 8 } },
];

// ---- ANALYTICS ----
export const mockAnalytics: AnalyticsData = {
  caseTrends: [
    { date: '2025-03', count: 8, category: 'narcotics' },
    { date: '2025-04', count: 12, category: 'fraud' },
    { date: '2025-05', count: 10, category: 'cybercrime' },
    { date: '2025-06', count: 15, category: 'narcotics' },
    { date: '2025-07', count: 9, category: 'robbery' },
    { date: '2025-08', count: 18, category: 'fraud' },
    { date: '2025-03', count: 5, category: 'fraud' },
    { date: '2025-04', count: 7, category: 'cybercrime' },
    { date: '2025-05', count: 14, category: 'narcotics' },
    { date: '2025-06', count: 6, category: 'cybercrime' },
    { date: '2025-07', count: 11, category: 'fraud' },
    { date: '2025-08', count: 8, category: 'cybercrime' },
  ],
  crimeDistribution: [
    { category: 'narcotics', count: 45, percentage: 22 },
    { category: 'fraud', count: 38, percentage: 18 },
    { category: 'cybercrime', count: 32, percentage: 15 },
    { category: 'robbery', count: 25, percentage: 12 },
    { category: 'organized-crime', count: 22, percentage: 10 },
    { category: 'extortion', count: 18, percentage: 9 },
    { category: 'arms-dealing', count: 12, percentage: 6 },
    { category: 'money-laundering', count: 10, percentage: 5 },
    { category: 'other', count: 6, percentage: 3 },
  ],
  riskDistribution: [
    { level: 'critical', count: 15 },
    { level: 'high', count: 32 },
    { level: 'medium', count: 48 },
    { level: 'low', count: 65 },
    { level: 'none', count: 40 },
  ],
  networkGrowth: [
    { date: '2025-01', nodes: 120, edges: 340 },
    { date: '2025-02', nodes: 145, edges: 420 },
    { date: '2025-03', nodes: 178, edges: 510 },
    { date: '2025-04', nodes: 210, edges: 620 },
    { date: '2025-05', nodes: 256, edges: 750 },
    { date: '2025-06', nodes: 298, edges: 880 },
    { date: '2025-07', nodes: 342, edges: 1020 },
    { date: '2025-08', nodes: 389, edges: 1180 },
  ],
  resolutionRate: [
    { month: 'Mar', resolved: 6, total: 8, rate: 75 },
    { month: 'Apr', resolved: 9, total: 12, rate: 75 },
    { month: 'May', resolved: 8, total: 10, rate: 80 },
    { month: 'Jun', resolved: 12, total: 15, rate: 80 },
    { month: 'Jul', resolved: 8, total: 11, rate: 73 },
    { month: 'Aug', resolved: 14, total: 18, rate: 78 },
  ],
  topHotspots: [
    { location: 'Delhi NCR', crimeCount: 67, riskScore: 92 },
    { location: 'Mumbai Metropolitan', crimeCount: 54, riskScore: 88 },
    { location: 'Hyderabad', crimeCount: 38, riskScore: 75 },
    { location: 'Lucknow', crimeCount: 32, riskScore: 72 },
    { location: 'Patna', crimeCount: 28, riskScore: 85 },
    { location: 'Jaipur', crimeCount: 22, riskScore: 55 },
    { location: 'Kochi', crimeCount: 18, riskScore: 68 },
    { location: 'Chennai', crimeCount: 15, riskScore: 52 },
  ],
};
