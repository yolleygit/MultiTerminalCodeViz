import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { ControlsPanel } from '../ControlsPanel';
import { AppProvider } from '../../../contexts/AppContext';
import { ThemeProvider } from '../../../contexts/ThemeContext';

function renderControlsPanel() {
  const mockOnTerminalCountChange = () => {};
  const mockOnArrangeTerminals = () => {};
  
  return render(
    <ThemeProvider>
      <AppProvider>
        <ControlsPanel 
          terminalCount={1}
          onTerminalCountChange={mockOnTerminalCountChange}
          onArrangeTerminals={mockOnArrangeTerminals}
        />
      </AppProvider>
    </ThemeProvider>
  );
}

describe('ControlsPanel', () => {
  it('should render with default values', () => {
    renderControlsPanel();
    
    expect(screen.getByText('Terminal Controls')).toBeInTheDocument();
    expect(screen.getByText('1 terminal')).toBeInTheDocument();
    expect(screen.getByText('+')).toBeInTheDocument();
    expect(screen.getByText('-')).toBeInTheDocument();
    expect(screen.getByText('Arrange')).toBeInTheDocument();
    expect(screen.getByText(/Theme:/)).toBeInTheDocument();
    expect(screen.getByText(/Made with ❤️ by/)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /use the vibe typer/i })).toBeInTheDocument();
  });

  it('should call onTerminalCountChange when + button is clicked', () => {
    const mockOnTerminalCountChange = vi.fn();
    const mockOnArrangeTerminals = vi.fn();
    
    render(
      <ThemeProvider>
        <AppProvider>
          <ControlsPanel 
            terminalCount={1}
            onTerminalCountChange={mockOnTerminalCountChange}
            onArrangeTerminals={mockOnArrangeTerminals}
          />
        </AppProvider>
      </ThemeProvider>
    );
    
    const incrementButton = screen.getByText('+');
    fireEvent.click(incrementButton);
    
    expect(mockOnTerminalCountChange).toHaveBeenCalledWith(2);
  });

  it('should call onArrangeTerminals when Arrange button is clicked', () => {
    const mockOnTerminalCountChange = vi.fn();
    const mockOnArrangeTerminals = vi.fn();
    
    render(
      <ThemeProvider>
        <AppProvider>
          <ControlsPanel 
            terminalCount={1}
            onTerminalCountChange={mockOnTerminalCountChange}
            onArrangeTerminals={mockOnArrangeTerminals}
          />
        </AppProvider>
      </ThemeProvider>
    );
    
    const arrangeButton = screen.getByText('Arrange');
    fireEvent.click(arrangeButton);
    
    expect(mockOnArrangeTerminals).toHaveBeenCalled();
  });

  it('should disable decrement button when at minimum (1)', () => {
    renderControlsPanel();
    
    const decrementButton = screen.getByText('-');
    expect(decrementButton).toBeDisabled();
  });
}); 