describe('end-to-end testing suite', () => {
  it('passes', () => {
    cy.visit('/');
    expect(true).to.equal(true);
  });
});
