/* eslint-disable react-refresh/only-export-components */
import React,
{ createContext,
  useState,
  useMemo,
  useCallback } from 'react';
import type { ReactNode, Dispatch, SetStateAction } from 'react';

// 2.1 Create AppContext.tsx
//   - State fields : numWindows (1-100), layout ('uniform'/'scattered'), speed, theme, controlsVisible
//   - Default values (numWindows: 1, uniform, 10 chunks/s, dark, true)
//   - Bound-checked setter helpers (e.g., for numWindows)

export type LayoutMode = 'uniform' | 'scattered';
export type ThemeMode = 'dark' | 'light';

interface AppState {
  numWindows: number;
  layout: LayoutMode;
  speed: number; // 1-20 chunks/s
  theme: ThemeMode;
  controlsVisible: boolean;
  // Future state for text content might go here
  // textContent: string | null;
}

interface AppContextProps extends AppState {
  setNumWindows: (num: number | ((prev: number) => number)) => void;
  setLayout: Dispatch<SetStateAction<LayoutMode>>;
  setSpeed: (speed: number | ((prev: number) => number)) => void;
  setTheme: Dispatch<SetStateAction<ThemeMode>>;
  setControlsVisible: Dispatch<SetStateAction<boolean>>;
  toggleLayout: () => void;
  toggleTheme: () => void;
  toggleControlsVisible: () => void;
  // setTextContent: Dispatch<SetStateAction<string | null>>;
}

const MIN_WINDOWS = 1;
const MAX_WINDOWS = 100;
const MIN_SPEED = 1;
const MAX_SPEED = 20;

const defaultState: AppState = {
  numWindows: 1,
  layout: 'uniform',
  speed: 10, // Default 10 chunks/s
  theme: 'dark',
  controlsVisible: true,
  // textContent: null,
};

export const AppContext = createContext<AppContextProps | undefined>(undefined);

interface AppProviderProps {
  children: ReactNode;
}

export function AppProvider({ children }: AppProviderProps) {
  const [numWindows, setNumWindowsState] = useState<number>(defaultState.numWindows);
  const [layout, setLayout] = useState<LayoutMode>(defaultState.layout);
  const [speed, setSpeedState] = useState<number>(defaultState.speed);
  const [theme, setTheme] = useState<ThemeMode>(defaultState.theme);
  const [controlsVisible, setControlsVisible] = useState<boolean>(defaultState.controlsVisible);
  // const [textContent, setTextContent] = useState<string | null>(defaultState.textContent);

  const setNumWindows = useCallback((numOrFn: number | ((prev: number) => number)) => {
    setNumWindowsState(prev => {
      const newValue = typeof numOrFn === 'function' ? numOrFn(prev) : numOrFn;
      return Math.max(MIN_WINDOWS, Math.min(MAX_WINDOWS, newValue));
    });
  }, []);

  const setSpeed = useCallback((speedOrFn: number | ((prev: number) => number)) => {
    setSpeedState(prev => {
      const newValue = typeof speedOrFn === 'function' ? speedOrFn(prev) : speedOrFn;
      return Math.max(MIN_SPEED, Math.min(MAX_SPEED, newValue));
    });
  }, []);
  
  const toggleLayout = useCallback(() => {
    setLayout(prevLayout => prevLayout === 'uniform' ? 'scattered' : 'uniform');
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme(prevTheme => prevTheme === 'dark' ? 'light' : 'dark');
  }, []);

  const toggleControlsVisible = useCallback(() => {
    setControlsVisible(prev => !prev);
  }, []);


  const contextValue = useMemo(() => ({
    numWindows,
    layout,
    speed,
    theme,
    controlsVisible,
    setNumWindows,
    setLayout,
    setSpeed,
    setTheme,
    setControlsVisible,
    toggleLayout,
    toggleTheme,
    toggleControlsVisible,
    // textContent,
    // setTextContent,
  }), [
    numWindows, layout, speed, theme, controlsVisible,
    setNumWindows, setLayout, setSpeed, setTheme, setControlsVisible,
    toggleLayout, toggleTheme, toggleControlsVisible,
    // textContent, setTextContent
  ]);

  return (
    <AppContext.Provider value={contextValue}>
      {children}
    </AppContext.Provider>
  );
}

// Custom hook for consuming the context
export const useAppContext = (): AppContextProps => {
  const context = React.useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
}; 