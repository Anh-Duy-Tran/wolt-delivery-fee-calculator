import { InfoTooltip } from '../../src/components/InfoTooltip';

// These tests are UNINTENTIONALLY testing not only the scale of the tooltip to
// be 1 when triggered but also its transformX transformY skewX skewY since all
// those values are coupled together in TailwindCSS transform property as a
// matrix.

// TODO: Write a helper function to retrieve and parse the value of the css
// transform for example:
// matrix(a, b, c, d, tx, ty)
// to (scaleX, skewY,
// skewX, scaleY, translateX, translateY)
//
// https://developer.mozilla.org/en-US/docs/Web/CSS/transform-function/matrix

describe('InfoTooltip Component', () => {
  beforeEach(() => {
    cy.mount(<InfoTooltip tipContent="Tooltip content">Tooltip</InfoTooltip>);
  });
  it('should change styling on hover', () => {
    // Trigger hover
    cy.get('[data-testid="tooltip"]').should('have.css', 'opacity', '0');
    cy.get('[data-testid="tooltip"]')
      .should('not.have.css', 'opacity', '1')
      .should('not.have.css', 'transform', 'matrix(1, 0, 0, 1, 0, 0)'); // tailwind equivalent of scale(1)

    cy.get('.peer').realHover();

    // Assert the tooltip styling changes
    cy.get('[data-testid="tooltip"]')
      .should('have.css', 'opacity', '1')
      .should('have.css', 'transform', 'matrix(1, 0, 0, 1, 0, 0)'); // tailwind equivalent of scale(1)
  });

  it('should change styling on focus', () => {
    cy.get('[data-testid="tooltip"]')
      .should('not.have.css', 'opacity', '1')
      .should('not.have.css', 'transform', 'matrix(1, 0, 0, 1, 0, 0)'); // tailwind equivalent of scale(1)

    // Trigger focus
    cy.get('.peer').focus();

    // Assert the tooltip styling changes
    cy.get('[data-testid="tooltip"]')
      .should('have.css', 'opacity', '1')
      .should('have.css', 'transform', 'matrix(1, 0, 0, 1, 0, 0)'); // tailwind equivalent of scale(1)
  });
});
