import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';
import { terminalThemes, defaultTheme } from '../data/colorThemes';
import type { TerminalTheme, TerminalColorRole } from '../data/colorThemes';

interface ThemeContextType {
  currentTheme: TerminalTheme;
  themeName: string;
  setTheme: (themeName: string) => void;
  getThemeNames: () => string[];
  getColorForRole: (role: TerminalColorRole) => string;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [themeName, setThemeName] = useState(defaultTheme);
  const currentTheme = terminalThemes[themeName];

  const setTheme = (newThemeName: string) => {
    if (terminalThemes[newThemeName]) {
      setThemeName(newThemeName);
    }
  };

  const getThemeNames = () => Object.keys(terminalThemes);

  const getColorForRole = (role: TerminalColorRole) => {
    return currentTheme.colors[role];
  };

  return (
    <ThemeContext.Provider 
      value={{ 
        currentTheme, 
        themeName, 
        setTheme, 
        getThemeNames, 
        getColorForRole 
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}