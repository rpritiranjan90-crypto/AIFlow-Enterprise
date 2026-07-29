import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User, AuthTokens } from '@aiflow/shared-types';

interface AuthState {
  user: User | null;
  tokens: AuthTokens | null;
  isAuthenticated: boolean;
  login: (user: User, tokens: AuthTokens) => void;
  logout: () => void;
  setUser: (user: User) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: {
        id: 'usr_demo_1001',
        email: 'alex.architect@enterprise.io',
        fullName: 'Alex Mercer',
        avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
        isActive: true,
        isSuperuser: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      tokens: {
        accessToken: 'mock_jwt_access_token_aiflow_enterprise_demo',
        refreshToken: 'mock_jwt_refresh_token_aiflow_enterprise_demo',
        tokenType: 'bearer',
        expiresIn: 3600,
      },
      isAuthenticated: true,
      login: (user, tokens) => set({ user, tokens, isAuthenticated: true }),
      logout: () => set({ user: null, tokens: null, isAuthenticated: false }),
      setUser: (user) => set({ user }),
    }),
    {
      name: 'aiflow-auth-storage',
    }
  )
);
