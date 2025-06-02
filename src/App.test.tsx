import { render, screen } from '@testing-library/react';
import App from './App';

describe('<App />', () => {
  it('renders "Cloud Code Meme" with Tailwind classes', () => {
    render(<App />);
    const appElement = screen.getByText(/cloud code meme/i);
    expect(appElement).toBeInTheDocument();
    expect(appElement).toHaveClass('font-bold');
    expect(appElement).toHaveClass('text-2xl');
  });
}); 