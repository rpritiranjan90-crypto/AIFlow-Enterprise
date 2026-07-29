/**
 * Enterprise Dark Intelligence UI Design Tokens
 */

export const colors = {
  bg: {
    darkBase: '#080C14',
    darkSurface: '#0F172A',
    darkElevated: '#1E293B',
    darkCard: 'rgba(15, 23, 42, 0.75)',
    lightBase: '#F8FAFC',
    lightSurface: '#FFFFFF',
    lightElevated: '#F1F5F9',
  },
  accent: {
    primary: '#6366F1', // Indigo Glow
    primaryHover: '#4F46E5',
    secondary: '#06B6D4', // Cyan Intelligence
    secondaryHover: '#0891B2',
    emerald: '#10B981',
    amber: '#F59E0B',
    rose: '#F43F5E',
  },
  border: {
    darkSubtle: 'rgba(255, 255, 255, 0.08)',
    darkGlow: 'rgba(99, 102, 241, 0.25)',
    lightSubtle: 'rgba(0, 0, 0, 0.08)',
  },
  text: {
    darkPrimary: '#F8FAFC',
    darkSecondary: '#94A3B8',
    darkMuted: '#64748B',
    lightPrimary: '#0F172A',
    lightSecondary: '#475569',
    lightMuted: '#94A3B8',
  }
};

export const fonts = {
  sans: 'Inter, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  mono: 'JetBrains Mono, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
};

export const animations = {
  fast: '150ms cubic-bezier(0.4, 0, 0.2, 1)',
  normal: '250ms cubic-bezier(0.4, 0, 0.2, 1)',
  spring: '400ms cubic-bezier(0.175, 0.885, 0.32, 1.275)',
};
