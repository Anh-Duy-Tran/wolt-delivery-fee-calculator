import { expect, it, describe } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Card } from '.';

describe('Card Component', () => {
  // Snapshot test
  it('should render correct to the snapshot', () => {
    const { asFragment } = render(<Card>Cart Title</Card>);
    expect(asFragment()).toMatchSnapshot();
  });

  // Test for class application
  it('should apply default and custom classes', () => {
    render(<Card className="custom-class" />);
    const cardElement = screen.getByTestId('card');
    expect(cardElement).toHaveClass(
      'w-full rounded-xl bg-white p-5 shadow-xl custom-class'
    );
  });

  // Test for props spreading
  it('should spread additional props to the div element', () => {
    render(<Card aria-label="Test Card" />);
    const cardElement = screen.getByTestId('card');
    expect(cardElement).toHaveAttribute('aria-label', 'Test Card');
  });

  // Test for children rendering
  it('should render children correctly', () => {
    render(
      <Card>
        <p>Test Child</p>
      </Card>
    );
    expect(screen.getByText('Test Child')).toBeInTheDocument();
  });
});
