// ============================================================
// CrimeNet AI — Auth Service (Mock)
// ============================================================

import type { User } from '@/types/entities';
import type { LoginRequest, LoginResponse, RegisterRequest } from '@/types/api';
import { delay } from '@/lib/utils';

// Mock users for demo
const mockUsers: (User & { password: string })[] = [
  {
    id: 'U001',
    name: 'ACP Meera Joshi',
    email: 'meera.joshi@crimenet.gov.in',
    password: 'admin123',
    badgeNumber: 'DLP-2847',
    role: 'administrator',
    department: 'Delhi Police - Special Cell',
    rank: 'Assistant Commissioner of Police',
    phone: '+91-98765-11111',
    permissions: [],
    lastLogin: '2025-08-31T09:00:00Z',
    isActive: true,
    mfaEnabled: true,
    createdAt: '2020-01-15T00:00:00Z',
  },
  {
    id: 'U002',
    name: 'SP Karan Malhotra',
    email: 'karan.malhotra@crimenet.gov.in',
    password: 'officer123',
    badgeNumber: 'UPP-1923',
    role: 'senior_officer',
    department: 'UP Police - Crime Branch',
    rank: 'Superintendent of Police',
    phone: '+91-98765-22222',
    permissions: [],
    lastLogin: '2025-08-31T08:30:00Z',
    isActive: true,
    mfaEnabled: true,
    createdAt: '2019-06-10T00:00:00Z',
  },
  {
    id: 'U003',
    name: 'Inspector Neha Tripathi',
    email: 'neha.tripathi@crimenet.gov.in',
    password: 'analyst123',
    badgeNumber: 'UPP-3456',
    role: 'intelligence_analyst',
    department: 'UP Police - Intelligence Bureau',
    rank: 'Inspector',
    phone: '+91-98765-33333',
    permissions: [],
    lastLogin: '2025-08-31T07:45:00Z',
    isActive: true,
    mfaEnabled: false,
    createdAt: '2021-03-20T00:00:00Z',
  },
  {
    id: 'U004',
    name: 'SI Rahul Verma',
    email: 'rahul.verma@crimenet.gov.in',
    password: 'invest123',
    badgeNumber: 'DLP-4521',
    role: 'investigator',
    department: 'Delhi Police - Crime Branch',
    rank: 'Sub Inspector',
    phone: '+91-98765-44444',
    permissions: [],
    lastLogin: '2025-08-30T18:00:00Z',
    isActive: true,
    mfaEnabled: false,
    createdAt: '2022-08-05T00:00:00Z',
  },
];

export async function loginUser(request: LoginRequest): Promise<LoginResponse> {
  await delay(800); // Simulate network delay

  const user = mockUsers.find(u => u.email === request.email && u.password === request.password);

  if (!user) {
    throw new Error('Invalid email or password. Please check your credentials.');
  }

  if (!user.isActive) {
    throw new Error('Account is deactivated. Contact your administrator.');
  }

  // Simulate MFA check
  if (user.mfaEnabled && request.mfaCode !== '123456') {
    if (!request.mfaCode) {
      throw new Error('MFA_REQUIRED');
    }
    throw new Error('Invalid MFA code. Please try again.');
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { password, ...userWithoutPassword } = user;

  return {
    token: `mock_jwt_${user.id}_${Date.now()}`,
    refreshToken: `mock_refresh_${user.id}_${Date.now()}`,
    user: userWithoutPassword,
    expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
  };
}

export async function registerUser(request: RegisterRequest): Promise<{ success: boolean; message: string }> {
  await delay(1000);

  const exists = mockUsers.some(u => u.email === request.email);
  if (exists) {
    throw new Error('An account with this email already exists.');
  }

  return {
    success: true,
    message: 'Registration submitted for approval. You will receive a confirmation email within 24 hours.',
  };
}

export function getAvailableUsers() {
  return mockUsers.map(u => ({
    email: u.email,
    name: u.name,
    role: u.role,
    password: u.password,
  }));
}
