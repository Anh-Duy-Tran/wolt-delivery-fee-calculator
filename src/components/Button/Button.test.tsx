import { expect, it, describe, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Button } from '.';

describe('Button Component', () => {
  // Snapshot test
  it('should render correct to the snapshot', () => {
    const { asFragment } = render(<Button>label</Button>);
    expect(asFragment()).toMatchSnapshot();
  });

  // Test for class application
  it('should apply default and custom classes', () => {
    render(<Button className="custom-class" />);
    const button = screen.getByRole('button');
    expect(button).toHaveClass(
      'rounded-[6px] bg-wolt-blue text-white p-3 custom-class'
    );
  });

  // Test for props spreading
  it('should spread additional props to the button element', () => {
    render(<Button aria-label="Test Button" />);
    expect(
      screen.getByRole('button', { name: 'Test Button' })
    ).toBeInTheDocument();
  });

  // Test for handling click events
  it('should handle click events', () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick} />);
    const button = screen.getByRole('button');
    button.click();
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
