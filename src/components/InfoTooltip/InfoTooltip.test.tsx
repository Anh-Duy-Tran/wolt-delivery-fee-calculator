import { render, screen } from '@testing-library/react';
import { expect, it, describe } from 'vitest';
import { InfoTooltip } from '.';

describe('InfoTooltip Component', () => {
  // Snapshot test
  it('renders correctly', () => {
    const { asFragment } = render(
      <InfoTooltip tipContent={<p>Tooltip content</p>}>Tooltip</InfoTooltip>
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('applies custom class name', () => {
    render(
      <InfoTooltip
        className={'custom-class'}
        tipContent={<p>Tooltip content</p>}
      >
        Tooltip
      </InfoTooltip>
    );
    expect(screen.getByText('Tooltip')).toHaveClass('custom-class');
  });

  it('displays the correct tooltip content', () => {
    const tooltipContent = 'Tooltip content';
    render(<InfoTooltip tipContent={<p>{tooltipContent}</p>} />);
    expect(screen.getByText(tooltipContent)).toBeInTheDocument();
  });

  it('renders children correctly', () => {
    render(
      <InfoTooltip tipContent={<p>Tooltip content</p>}>
        <button>Click me</button>
      </InfoTooltip>
    );
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  it('would shows tooltip content on hover', () => {
    render(
      <InfoTooltip
        data-testid={'info-icon'}
        tipContent={<p>Tooltip content</p>}
      >
        hover me!
      </InfoTooltip>
    );

    expect(screen.getByTestId('info-icon')).toHaveClass('group');
    expect(screen.getByTestId('tooltip')).toHaveClass('opacity-0');
    expect(screen.getByTestId('tooltip')).toHaveClass('group-hover:opacity-100');
  });

  it('would shows tooltip content on focus', () => {
    render(
      <InfoTooltip
        data-testid={'info-icon'}
        tipContent={<p>Tooltip content</p>}
      >
        focus me!
      </InfoTooltip>
    );

    expect(screen.getByTestId('info-icon')).toHaveClass('group');
    expect(screen.getByTestId('tooltip')).toHaveClass('opacity-0');
    expect(screen.getByTestId('tooltip')).toHaveClass('group-focus:opacity-100');
  });
});
