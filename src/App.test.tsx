import { render, screen } from '@testing-library/react';
import App from './App';

// Mock window.innerWidth and innerHeight for the terminal layout
Object.defineProperty(window, 'innerWidth', {
  writable: true,
  configurable: true,
  value: 1024,
});
Object.defineProperty(window, 'innerHeight', {
  writable: true,
  configurable: true,
  value: 768,
});

describe('<App />', () => {
  it('renders terminal controls panel', () => {
    // App already includes Router, so we don't need to wrap it
    render(<App />);
    
    // Check for terminal controls
    expect(screen.getByText('Terminal Controls')).toBeInTheDocument();
    expect(screen.getByText('1 terminal')).toBeInTheDocument();
    expect(screen.getByText('Arrange')).toBeInTheDocument();
    expect(screen.getByText(/Theme:/)).toBeInTheDocument();
  });
}); 