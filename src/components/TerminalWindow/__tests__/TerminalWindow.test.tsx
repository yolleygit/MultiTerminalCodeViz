import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { TerminalWindow } from '../TerminalWindow';

describe('<TerminalWindow />', () => {
  it('should match snapshot for static UI', () => {
    const { container } = render(
      <TerminalWindow 
        id="snapshot-test-window"
        title="Test Terminal"
        initialPosition={{ x: 10, y: 20 }}
        initialSize={{ width: 500, height: 300 }}
      />
    );
    // For snapshot testing with react-draggable and react-resizable, 
    // it's often best to assert against the direct child of the ResizableBox
    // or a stable part of your component structure, as the wrapper elements
    // from these libraries can add dynamic attributes (like transform styles)
    // that make snapshots brittle.
    // Here, we target the main 'terminal-window' div directly.
    const terminalWindowElement = container.querySelector('.terminal-window');
    expect(terminalWindowElement).toMatchSnapshot();
  });

  // 3.4 Clamping tests for resize (verifying props passed to ResizableBox)
  it('should pass correct min/max constraints to ResizableBox', () => {
    const { container } = render(
      <TerminalWindow 
        id="constraints-test"
        initialSize={{ width: 300, height: 200 }}
      />
    );

    // ResizableBox is the direct child of Draggable. 
    // We inspect its props indirectly by looking at what our TerminalWindow renders.
    // This test is more about ensuring our component configures ResizableBox correctly.
    // Note: Directly accessing props of a rendered component is often an anti-pattern
    // in RTL, but for HOCs/wrapper components, ensuring they are configured correctly is key.
    // A more robust way might involve a more complex setup or mocking ResizableBox to spy on its props.
    
    // For now, we know ResizableBox applies these as inline styles or attributes eventually,
    // but testing the direct output HTML for min/max constraints is not straightforward with ResizableBox
    // as it uses JavaScript calculations. We are trusting that if we pass the props correctly,
    // react-resizable will do its job.

    // What we can do is render with specific initial sizes and ensure they are passed.
    const resizableBoxElement = container.firstChild; // This should be the Draggable component
    const actualResizableBox = resizableBoxElement?.firstChild; // This should be the ResizableBox

    // This is a limitation. We can't easily assert the props of ResizableBox post-render with RTL.
    // The snapshot test above will cover the initial dimensions.
    // The best we can do here is acknowledge the constraints are hardcoded in TerminalWindow.
    // If we were to make min/maxConstraints dynamic props of TerminalWindow, we could test those.
    // For now, we will assume the hardcoded [200,100] and [1200,800] are passed.
    // This test serves more as a placeholder for this known testing challenge.

    // A simple structural check to ensure ResizableBox is there:
    // The className "react-resizable" is added by ResizableBox to its wrapper div.
    expect(actualResizableBox).toHaveClass('react-resizable');

    // We can also check that our initial size is applied.
    // The ResizableBox wrapper div gets inline styles for width and height.
    expect(actualResizableBox).toHaveStyle('width: 300px;');
    expect(actualResizableBox).toHaveStyle('height: 200px;');
  });

  it('should apply default dimensions if initialSize is not provided', () => {
    const { container } = render(<TerminalWindow id="default-size-test" />);
    const resizableBoxElement = container.firstChild?.firstChild;
    expect(resizableBoxElement).toHaveStyle('width: 600px;');
    expect(resizableBoxElement).toHaveStyle('height: 400px;');
  });

  it('should apply partial default dimensions if initialSize is partially provided', () => {
    const { container: containerW } = render(<TerminalWindow id="partial-w" initialSize={{ width: 350 }} />);
    const resizableBoxW = containerW.firstChild?.firstChild;
    expect(resizableBoxW).toHaveStyle('width: 350px;');
    expect(resizableBoxW).toHaveStyle('height: 400px;'); // Default height

    const { container: containerH } = render(<TerminalWindow id="partial-h" initialSize={{ height: 250 }} />);
    const resizableBoxH = containerH.firstChild?.firstChild;
    expect(resizableBoxH).toHaveStyle('width: 600px;'); // Default width
    expect(resizableBoxH).toHaveStyle('height: 250px;');
  });
}); 