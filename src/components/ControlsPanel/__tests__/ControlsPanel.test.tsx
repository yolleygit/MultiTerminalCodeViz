import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { ControlsPanel } from '../ControlsPanel';
import { AppProvider } from '../../../contexts/AppContext';

function renderControlsPanel() {
  const mockOnTerminalCountChange = () => {};
  const mockOnArrangeTerminals = () => {};
  
  return render(
    <AppProvider>
      <ControlsPanel 
        terminalCount={1}
        onTerminalCountChange={mockOnTerminalCountChange}
        onArrangeTerminals={mockOnArrangeTerminals}
      />
    </AppProvider>
  );
}

describe('ControlsPanel', () => {
  // 2.6 Unit tests: numWindows increment/decrement, slider updates speed
  
  it('should render with default values', () => {
    renderControlsPanel();
    
    expect(screen.getByText('1 terminal')).toBeInTheDocument();
    expect(screen.getByText('+')).toBeInTheDocument();
    expect(screen.getByText('-')).toBeInTheDocument();
    expect(screen.getByText('Arrange')).toBeInTheDocument();
  });

  describe('numWindows controls', () => {
    it('should increment numWindows when + button is clicked', () => {
      renderControlsPanel();
      
      const incrementButton = screen.getByText('+');
      fireEvent.click(incrementButton);
      
      expect(screen.getByText('Number of Windows: 2')).toBeInTheDocument();
    });

    it('should decrement numWindows when - button is clicked', () => {
      renderControlsPanel();
      
      // First increment to 2
      const incrementButton = screen.getByText('+');
      fireEvent.click(incrementButton);
      expect(screen.getByText('Number of Windows: 2')).toBeInTheDocument();
      
      // Then decrement back to 1
      const decrementButton = screen.getByText('–');
      fireEvent.click(decrementButton);
      expect(screen.getByText('Number of Windows: 1')).toBeInTheDocument();
    });

    it('should disable decrement button when at minimum (1)', () => {
      renderControlsPanel();
      
      const decrementButton = screen.getByText('–');
      expect(decrementButton).toBeDisabled();
    });

    it('should disable increment button when at maximum (100)', () => {
      renderControlsPanel();
      
      // We need to set to 100 first - click increment 99 times
      const incrementButton = screen.getByText('+');
      
      // Click 99 times to reach 100
      for (let i = 0; i < 99; i++) {
        fireEvent.click(incrementButton);
      }
      
      expect(screen.getByText('Number of Windows: 100')).toBeInTheDocument();
      expect(incrementButton).toBeDisabled();
    });
  });

  describe('speed slider', () => {
    it('should update speed when slider value changes', () => {
      renderControlsPanel();
      
      const speedSlider = screen.getByRole('slider');
      
      // Change slider value to 15
      fireEvent.change(speedSlider, { target: { value: '15' } });
      
      expect(screen.getByText('Speed: 15 chunks/s')).toBeInTheDocument();
    });

    it('should have correct min and max values', () => {
      renderControlsPanel();
      
      const speedSlider = screen.getByRole('slider');
      
      expect(speedSlider).toHaveAttribute('min', '1');
      expect(speedSlider).toHaveAttribute('max', '20');
      expect(speedSlider).toHaveAttribute('value', '10');
    });
  });

  describe('layout toggle', () => {
    it('should toggle layout when button is clicked', () => {
      renderControlsPanel();
      
      const layoutButton = screen.getByText('Toggle Layout (Current: uniform)');
      fireEvent.click(layoutButton);
      
      expect(screen.getByText('Toggle Layout (Current: scattered)')).toBeInTheDocument();
      expect(screen.getByText('Layout: scattered')).toBeInTheDocument();
      
      // Toggle back
      fireEvent.click(layoutButton);
      expect(screen.getByText('Toggle Layout (Current: uniform)')).toBeInTheDocument();
      expect(screen.getByText('Layout: uniform')).toBeInTheDocument();
    });
  });

  describe('theme toggle', () => {
    it('should toggle theme when button is clicked', () => {
      renderControlsPanel();
      
      const themeButton = screen.getByText('Toggle Theme (Current: dark)');
      fireEvent.click(themeButton);
      
      expect(screen.getByText('Toggle Theme (Current: light)')).toBeInTheDocument();
      expect(screen.getByText('Theme: light')).toBeInTheDocument();
      
      // Toggle back
      fireEvent.click(themeButton);
      expect(screen.getByText('Toggle Theme (Current: dark)')).toBeInTheDocument();
      expect(screen.getByText('Theme: dark')).toBeInTheDocument();
    });
  });

  describe('hide controls', () => {
    it('should have hide controls button', () => {
      renderControlsPanel();
      
      const hideButton = screen.getByText('Hide Controls');
      expect(hideButton).toBeInTheDocument();
    });
    
    // Note: Testing the actual hide functionality would require testing the parent App component
    // since the hiding logic is handled there with conditional rendering
  });

  it('should render all control sections', () => {
    renderControlsPanel();
    
    // Check that all main sections are present
    expect(screen.getByText('Controls')).toBeInTheDocument();
    expect(screen.getByText(/Number of Windows:/)).toBeInTheDocument();
    expect(screen.getByLabelText(/Speed/)).toBeInTheDocument();
    expect(screen.getByText(/Layout:/)).toBeInTheDocument();
    expect(screen.getByText(/Theme:/)).toBeInTheDocument();
    expect(screen.getByText('Hide Controls')).toBeInTheDocument();
  });
}); 