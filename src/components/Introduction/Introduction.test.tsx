import { Introduction } from '.';
import { render } from '@testing-library/react';
import { expect, it, describe } from 'vitest';

describe('Introduction Component', () => {
  it('should render correct to the snapshot', () => {
    const { asFragment } = render(<Introduction />);
    expect(asFragment()).toMatchSnapshot();
  });
});
