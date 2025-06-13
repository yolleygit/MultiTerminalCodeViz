import { describe, it, expect, vi } from 'vitest';
import { render, screen, act } from '@testing-library/react';
import { AppProvider, useAppContext } from '../AppContext';

// Test component that uses the context
function TestComponent() {
  const {
    numWindows,
    setNumWindows,
    speed,
    setSpeed,
    layout,
    toggleLayout,
    theme,
    toggleTheme,
    controlsVisible,
    toggleControlsVisible,
  } = useAppContext();

  return (
    <div>
      <span data-testid="numWindows">{numWindows}</span>
      <span data-testid="speed">{speed}</span>
      <span data-testid="layout">{layout}</span>
      <span data-testid="theme">{theme}</span>
      <span data-testid="controlsVisible">{controlsVisible.toString()}</span>
      
      <button 
        data-testid="increment-windows" 
        onClick={() => setNumWindows(n => n + 1)}
      />
      <button 
        data-testid="decrement-windows" 
        onClick={() => setNumWindows(n => n - 1)}
      />
      <button 
        data-testid="set-windows-direct" 
        onClick={() => setNumWindows(5)}
      />
      <button 
        data-testid="set-speed" 
        onClick={() => setSpeed(15)}
      />
      <button 
        data-testid="toggle-layout" 
        onClick={toggleLayout}
      />
      <button 
        data-testid="toggle-theme" 
        onClick={toggleTheme}
      />
      <button 
        data-testid="toggle-controls" 
        onClick={toggleControlsVisible}
      />
    </div>
  );
}

function renderWithProvider() {
  return render(
    <AppProvider>
      <TestComponent />
    </AppProvider>
  );
}

describe('AppContext', () => {
  // 2.3 Unit tests: default values, bounds enforcement for numWindows
  describe('Default values', () => {
    it('should have correct default values', () => {
      renderWithProvider();
      
      expect(screen.getByTestId('numWindows')).toHaveTextContent('1');
      expect(screen.getByTestId('speed')).toHaveTextContent('10');
      expect(screen.getByTestId('layout')).toHaveTextContent('uniform');
      expect(screen.getByTestId('theme')).toHaveTextContent('dark');
      expect(screen.getByTestId('controlsVisible')).toHaveTextContent('true');
    });
  });

  describe('numWindows bounds enforcement', () => {
    it('should enforce minimum bound (1)', async () => {
      renderWithProvider();
      
      const decrementButton = screen.getByTestId('decrement-windows');
      
      // Try to decrement below 1
      await act(async () => {
        decrementButton.click();
      });
      
      expect(screen.getByTestId('numWindows')).toHaveTextContent('1');
    });

    it('should enforce maximum bound (100)', async () => {
      renderWithProvider();
      
      screen.getByTestId('increment-windows');
      
      // Set to 100 first
      await act(async () => {
        screen.getByTestId('set-windows-direct').click();
      });
      
      // Manually set to 100 by calling setNumWindows(100)
      await act(async () => {
        // We need a way to set it to 100. Let's modify our test component
      });
    });

    it('should clamp values above 100 to 100', async () => {
      const TestClampComponent = () => {
        const { numWindows, setNumWindows } = useAppContext();
        return (
          <div>
            <span data-testid="numWindows">{numWindows}</span>
            <button 
              data-testid="set-150" 
              onClick={() => setNumWindows(150)}
            />
          </div>
        );
      };

      render(
        <AppProvider>
          <TestClampComponent />
        </AppProvider>
      );
      
      await act(async () => {
        screen.getByTestId('set-150').click();
      });
      
      expect(screen.getByTestId('numWindows')).toHaveTextContent('100');
    });

    it('should clamp values below 1 to 1', async () => {
      const TestClampComponent = () => {
        const { numWindows, setNumWindows } = useAppContext();
        return (
          <div>
            <span data-testid="numWindows">{numWindows}</span>
            <button 
              data-testid="set-negative" 
              onClick={() => setNumWindows(-5)}
            />
          </div>
        );
      };

      render(
        <AppProvider>
          <TestClampComponent />
        </AppProvider>
      );
      
      await act(async () => {
        screen.getByTestId('set-negative').click();
      });
      
      expect(screen.getByTestId('numWindows')).toHaveTextContent('1');
    });
  });

  // 2.6 Unit tests: numWindows increment/decrement, slider updates speed
  describe('numWindows increment/decrement', () => {
    it('should increment numWindows', async () => {
      renderWithProvider();
      
      const incrementButton = screen.getByTestId('increment-windows');
      
      await act(async () => {
        incrementButton.click();
      });
      
      expect(screen.getByTestId('numWindows')).toHaveTextContent('2');
      
      await act(async () => {
        incrementButton.click();
      });
      
      expect(screen.getByTestId('numWindows')).toHaveTextContent('3');
    });

    it('should decrement numWindows', async () => {
      renderWithProvider();
      
      // First set to 5
      await act(async () => {
        screen.getByTestId('set-windows-direct').click();
      });
      
      expect(screen.getByTestId('numWindows')).toHaveTextContent('5');
      
      const decrementButton = screen.getByTestId('decrement-windows');
      
      await act(async () => {
        decrementButton.click();
      });
      
      expect(screen.getByTestId('numWindows')).toHaveTextContent('4');
      
      await act(async () => {
        decrementButton.click();
      });
      
      expect(screen.getByTestId('numWindows')).toHaveTextContent('3');
    });
  });

  describe('speed updates', () => {
    it('should update speed value', async () => {
      renderWithProvider();
      
      expect(screen.getByTestId('speed')).toHaveTextContent('10');
      
      await act(async () => {
        screen.getByTestId('set-speed').click();
      });
      
      expect(screen.getByTestId('speed')).toHaveTextContent('15');
    });

    it('should enforce speed bounds (1-20)', async () => {
      const TestSpeedBounds = () => {
        const { speed, setSpeed } = useAppContext();
        return (
          <div>
            <span data-testid="speed">{speed}</span>
            <button data-testid="set-speed-high" onClick={() => setSpeed(25)} />
            <button data-testid="set-speed-low" onClick={() => setSpeed(-5)} />
          </div>
        );
      };

      render(
        <AppProvider>
          <TestSpeedBounds />
        </AppProvider>
      );
      
      // Test upper bound
      await act(async () => {
        screen.getByTestId('set-speed-high').click();
      });
      expect(screen.getByTestId('speed')).toHaveTextContent('20');
      
      // Test lower bound
      await act(async () => {
        screen.getByTestId('set-speed-low').click();
      });
      expect(screen.getByTestId('speed')).toHaveTextContent('1');
    });
  });

  describe('toggles', () => {
    it('should toggle layout between uniform and scattered', async () => {
      renderWithProvider();
      
      expect(screen.getByTestId('layout')).toHaveTextContent('uniform');
      
      await act(async () => {
        screen.getByTestId('toggle-layout').click();
      });
      
      expect(screen.getByTestId('layout')).toHaveTextContent('scattered');
      
      await act(async () => {
        screen.getByTestId('toggle-layout').click();
      });
      
      expect(screen.getByTestId('layout')).toHaveTextContent('uniform');
    });

    it('should toggle theme between dark and light', async () => {
      renderWithProvider();
      
      expect(screen.getByTestId('theme')).toHaveTextContent('dark');
      
      await act(async () => {
        screen.getByTestId('toggle-theme').click();
      });
      
      expect(screen.getByTestId('theme')).toHaveTextContent('light');
      
      await act(async () => {
        screen.getByTestId('toggle-theme').click();
      });
      
      expect(screen.getByTestId('theme')).toHaveTextContent('dark');
    });

    it('should toggle controlsVisible', async () => {
      renderWithProvider();
      
      expect(screen.getByTestId('controlsVisible')).toHaveTextContent('true');
      
      await act(async () => {
        screen.getByTestId('toggle-controls').click();
      });
      
      expect(screen.getByTestId('controlsVisible')).toHaveTextContent('false');
      
      await act(async () => {
        screen.getByTestId('toggle-controls').click();
      });
      
      expect(screen.getByTestId('controlsVisible')).toHaveTextContent('true');
    });
  });

  it('should throw error when useAppContext is used outside provider', () => {
    // Suppress console.error for this test since we expect an error
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    
    expect(() => {
      render(<TestComponent />);
    }).toThrow('useAppContext must be used within an AppProvider');
    
    consoleSpy.mockRestore();
  });
}); 