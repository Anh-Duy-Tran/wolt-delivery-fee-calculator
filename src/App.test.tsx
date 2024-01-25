import { render, screen } from '@testing-library/react';
import { expect, it, describe } from 'vitest';
import App from './App';

describe('App Component', () => {
  it('render correctly', () => {
    const { asFragment } = render(<App />);
    expect(asFragment()).toMatchSnapshot();
  });
  it('should contains 3 card (form, result, introduction)', () => {
    render(<App />);
    expect(screen.getAllByTestId('card').length).toBe(3);
  });
});
