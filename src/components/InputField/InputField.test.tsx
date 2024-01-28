import { expect, it, describe, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { InputField } from '.';
import React from 'react';

describe('InputField Component', () => {
  it('should render correct to the snapshot', () => {
    const { asFragment } = render(<InputField label="Test Label" />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('should update value on change', () => {
    render(<InputField label="Test Label" />);
    const input = screen.getByTestId('input-field') as HTMLInputElement;
    fireEvent.change(input, { target: { value: 'New Value' } });
    expect(input.value).toBe('New Value');
  });

  it('should call onChange handler', () => {
    const handleChange = vi.fn();
    render(<InputField label="Test Label" onChange={handleChange} />);
    const input = screen.getByTestId('input-field');
    fireEvent.change(input, { target: { value: 'New Value' } });
    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  it('should display error message when provided', () => {
    const errorMessage = 'Error message';
    render(<InputField label="Test Label" errorMessage={errorMessage} />);
    expect(screen.getByText(errorMessage)).toBeInTheDocument();
  });

  it('should forward additional props to input', () => {
    render(<InputField label="Test Label" placeholder="Enter text" />);
    expect(screen.getByPlaceholderText(/enter text/i)).toBeInTheDocument();
  });

  it('should forward ref to input element', () => {
    const ref = React.createRef<HTMLInputElement>();
    render(<InputField label="Test Label" ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLInputElement);
  });
});
