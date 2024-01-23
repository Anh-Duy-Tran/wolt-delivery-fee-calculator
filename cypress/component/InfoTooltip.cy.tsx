import { InfoTooltip } from '../../src/components/InfoTooltip';

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
