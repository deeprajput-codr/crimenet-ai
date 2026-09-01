// ============================================================
// CrimeNet AI — Auth Store (Zustand)
// ============================================================
'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { User, Permission, UserRole } from '@/types/entities';

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  
  // Actions
  login: (user: User, token: string) => void;
  logout: () => void;
  setLoading: (loading: boolean) => void;
  updateUser: (updates: Partial<User>) => void;
  hasPermission: (permission: Permission) => boolean;
  hasRole: (role: UserRole) => boolean;
}

const ROLE_PERMISSIONS: Record<UserRole, Permission[]> = {
  investigator: [
    'view_cases', 'edit_cases', 'create_cases', 'view_persons', 'view_evidence',
    'view_graph', 'view_reports', 'use_copilot', 'view_vehicles', 'manage_alerts',
  ],
  intelligence_analyst: [
    'view_cases', 'edit_cases', 'create_cases', 'view_persons', 'edit_persons',
    'view_evidence', 'manage_evidence', 'view_graph', 'edit_graph', 'run_analysis',
    'view_reports', 'generate_reports', 'use_copilot', 'view_vehicles', 'manage_alerts',
  ],
  senior_officer: [
    'view_cases', 'edit_cases', 'create_cases', 'delete_cases', 'view_persons',
    'edit_persons', 'view_evidence', 'manage_evidence', 'view_graph', 'edit_graph',
    'run_analysis', 'view_reports', 'generate_reports', 'use_copilot', 'view_vehicles',
    'manage_alerts', 'view_audit_log',
  ],
  administrator: [
    'view_cases', 'edit_cases', 'create_cases', 'delete_cases', 'view_persons',
    'edit_persons', 'view_evidence', 'manage_evidence', 'view_graph', 'edit_graph',
    'run_analysis', 'view_reports', 'generate_reports', 'manage_users', 'manage_system',
    'view_audit_log', 'use_copilot', 'view_vehicles', 'manage_alerts',
  ],
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,

      login: (user, token) => set({
        user,
        token,
        isAuthenticated: true,
        isLoading: false,
      }),

      logout: () => set({
        user: null,
        token: null,
        isAuthenticated: false,
        isLoading: false,
      }),

      setLoading: (loading) => set({ isLoading: loading }),

      updateUser: (updates) => {
        const current = get().user;
        if (current) {
          set({ user: { ...current, ...updates } });
        }
      },

      hasPermission: (permission) => {
        const user = get().user;
        if (!user) return false;
        return ROLE_PERMISSIONS[user.role]?.includes(permission) ?? false;
      },

      hasRole: (role) => {
        const user = get().user;
        if (!user) return false;
        const hierarchy: UserRole[] = ['investigator', 'intelligence_analyst', 'senior_officer', 'administrator'];
        return hierarchy.indexOf(user.role) >= hierarchy.indexOf(role);
      },
    }),
    {
      name: 'crimenet-auth',
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);
