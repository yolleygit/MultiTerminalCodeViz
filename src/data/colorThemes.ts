// Semantic color roles for terminal output
export type TerminalColorRole = 
  | 'muted'      // gray, secondary text
  | 'success'    // green, success messages
  | 'warning'    // yellow/orange, warnings
  | 'error'      // red, errors
  | 'info'       // blue, informational
  | 'accent'     // purple/cyan, highlights
  | 'primary'    // main text color
  | 'secondary'  // slightly dimmed text
  | 'command';   // command/input text

export interface TerminalTheme {
  name: string;
  background: string;
  colors: Record<TerminalColorRole, string>;
}

export const terminalThemes: Record<string, TerminalTheme> = {
  dark: {
    name: 'Dark',
    background: 'bg-black',
    colors: {
      muted: 'text-gray-400',
      success: 'text-green-400',
      warning: 'text-yellow-400', 
      error: 'text-red-400',
      info: 'text-blue-400',
      accent: 'text-purple-400',
      primary: 'text-green-200',
      secondary: 'text-gray-300',
      command: 'text-gray-500'
    }
  },
  light: {
    name: 'Light',
    background: 'bg-gray-50',
    colors: {
      muted: 'text-gray-500',
      success: 'text-green-600',
      warning: 'text-orange-600',
      error: 'text-red-600', 
      info: 'text-blue-600',
      accent: 'text-purple-600',
      primary: 'text-gray-800',
      secondary: 'text-gray-600',
      command: 'text-gray-700'
    }
  },
  minimal: {
    name: 'Minimal',
    background: 'bg-white',
    colors: {
      muted: 'text-gray-400',
      success: 'text-gray-600',
      warning: 'text-gray-600',
      error: 'text-gray-700',
      info: 'text-gray-600', 
      accent: 'text-gray-700',
      primary: 'text-gray-800',
      secondary: 'text-gray-600',
      command: 'text-gray-500'
    }
  },
  retro: {
    name: 'Retro Green',
    background: 'bg-black',
    colors: {
      muted: 'text-green-600',
      success: 'text-green-400',
      warning: 'text-green-300',
      error: 'text-green-500',
      info: 'text-green-400',
      accent: 'text-green-300',
      primary: 'text-green-400',
      secondary: 'text-green-500',
      command: 'text-green-600'
    }
  }
};

export const defaultTheme = 'dark';