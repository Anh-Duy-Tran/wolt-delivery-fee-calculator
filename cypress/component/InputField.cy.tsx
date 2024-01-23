import { InputField } from '../../src/components/InputField';

describe('InputField Component', () => {
  it('renders with initial styles', () => {
    cy.mount(<InputField type="text" label="Test Label" />);
    cy.get('label').should(
      'have.css',
      'transform',
      'matrix(1, 0, 0, 1, 16, 0)' // TODO: bad fixed value / magic number need to find a fix
    ); // tailwind equivalent of scale(1)
  });

  it('changes label position and size on input focus', () => {
    cy.mount(<InputField label="Test Label" />);
    cy.get('[data-testid=input-field]').focus();
    cy.get('label').should(
      'have.css',
      'transform',
      'matrix(0.65, 0, 0, 0.65, 16, -12)' // TODO: bad fixed value / magic number need to find a fix
    );
  });

  it('displays error message with correct styles when provided', () => {
    cy.mount(<InputField label="Test Label" errorMessage="Error message" />);
    cy.get('[data-testid=errorMessage]')
      .should('be.visible')
      .and('have.class', 'text-red-500');
  });
});
