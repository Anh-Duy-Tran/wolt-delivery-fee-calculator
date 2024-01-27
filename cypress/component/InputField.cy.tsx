import { InputField } from '../../src/components/InputField';

// These tests are UNINTENTIONALLY testing value of scaleX scaleY transformX
// transformY skewX skewY since all those values are coupled together in
// TailwindCSS transform property as a matrix.

// TODO: Write a helper function to retrieve and parse the value of the css
// transform and return then separately to write test that assert the scale in
// the beginning state to be LARGER than the collapsed state. No magic number /
// fixed number should be required.
//
// For example: matrix(a, b, c, d, tx, ty) to (scaleX, skewY, skewX, scaleY,
// translateX, translateY)
//
// https://developer.mozilla.org/en-US/docs/Web/CSS/transform-function/matrix

describe('InputField Component', () => {
  it('renders with initial styles', () => {
    cy.mount(<InputField type="text" label="Test Label" />);
    cy.get('label').should(
      'have.css',
      'transform',
      'matrix(1, 0, 0, 1, 16, 0)' // NEED FIX: bad fixed value / magic number need to find a fix
    );
  });

  it('changes label position and size on input focus', () => {
    cy.mount(<InputField label="Test Label" />);
    cy.get('[data-testid=input-field]').focus();
    cy.get('label').should(
      'have.css',
      'transform',
      'matrix(0.65, 0, 0, 0.65, 16, -12)' // NEED FIX: bad fixed value / magic number need to find a fix
    );
  });

  it('displays error message with correct styles when provided', () => {
    cy.mount(<InputField label="Test Label" errorMessage="Error message" />);
    cy.get('[data-testid=errorMessage]')
      .should('be.visible')
      .and('have.class', 'text-red-500');
  });
});
