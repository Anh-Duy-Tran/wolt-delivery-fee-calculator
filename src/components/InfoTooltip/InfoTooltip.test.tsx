import { render, screen } from '@testing-library/react';
import { expect, it, describe } from 'vitest';
import { InfoTooltip } from '.';

describe('InfoTooltip Component', () => {
  // Snapshot test
  it('should render correct to the snapshot', () => {
    const { asFragment } = render(
      <InfoTooltip tipContent={<p>Tooltip content</p>}>Tooltip</InfoTooltip>
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should apply props class name', () => {
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

  it('should display the expected tooltip content', () => {
    const tooltipContent = 'Tooltip content';
    render(<InfoTooltip tipContent={<p>{tooltipContent}</p>} />);
    expect(screen.getByText(tooltipContent)).toBeInTheDocument();
  });

  it('should render children correctly', () => {
    render(
      <InfoTooltip tipContent={<p>Tooltip content</p>}>
        <button>Click me</button>
      </InfoTooltip>
    );
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  it('should show tooltip content on hover', () => {
    render(
      <InfoTooltip
        data-testid={'info-icon'}
        tipContent={<p>Tooltip content</p>}
      >
        hover me!
      </InfoTooltip>
    );

    expect(screen.getByTestId('info-icon')).toHaveClass('peer');
    expect(screen.getByTestId('tooltip')).toHaveClass('opacity-0');
    expect(screen.getByTestId('tooltip')).toHaveClass('peer-hover:opacity-100');
  });

  it('should shows tooltip content on focus', () => {
    render(
      <InfoTooltip
        data-testid={'info-icon'}
        tipContent={<p>Tooltip content</p>}
      >
        focus me!
      </InfoTooltip>
    );

    expect(screen.getByTestId('info-icon')).toHaveClass('peer');
    expect(screen.getByTestId('tooltip')).toHaveClass('opacity-0');
    expect(screen.getByTestId('tooltip')).toHaveClass('peer-focus:opacity-100');
  });
});
