import React, { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'dark' | 'light' | 'system';

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  actualTheme: 'dark' | 'light';
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>(() => {
    return (localStorage.getItem('aiflow-theme') as Theme) || 'dark';
  });

  const [actualTheme, setActualTheme] = useState<'dark' | 'light'>('dark');

  useEffect(() => {
    const root = document.documentElement;
    localStorage.setItem('aiflow-theme', theme);

    if (theme === 'system') {
      const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setActualTheme(systemDark ? 'dark' : 'light');
      if (systemDark) {
        root.classList.add('dark');
      } else {
        root.classList.remove('dark');
      }
    } else if (theme === 'dark') {
      setActualTheme('dark');
      root.classList.add('dark');
    } else {
      setActualTheme('light');
      root.classList.remove('dark');
    }
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, actualTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
