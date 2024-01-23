describe('Whole application end-to-end test suite', () => {
  /* ==== Test Created with Cypress Studio ==== */
  it('calculate the right fee with the fee component in the tooltip', function () {
    /* ==== Generated with Cypress Studio ==== */
    cy.visit('/');
    cy.get('[data-testid="cartValue"]').clear();
    cy.get('[data-testid="cartValue"]').type('100');
    cy.get('[data-testid="deliveryDistance"]').clear();
    cy.get('[data-testid="deliveryDistance"]').type('2000');
    cy.get('[data-testid="numberOfItems"]').clear();
    cy.get('[data-testid="numberOfItems"]').type('10');
    cy.get('[data-testid="orderTime"]').clear();
    cy.get('[data-testid="orderTime"]').type('2024-10-10T20:20');
    cy.get('[data-testid="calculateFee"]').click();
    cy.get('[data-testid="fee"]').should('contain.text', '7.00€');
    cy.get('[data-testid="submittedCartValue"]').should(
      'contain.text',
      '100.00€'
    );
    cy.get('[data-testid="submittedNumberOfItems"]').should(
      'contain.text',
      '10'
    );
    cy.get('[data-testid="submittedDeliveryDistance"]').should(
      'contain.text',
      '2000m'
    );
    cy.get('[data-testid="submittedOrderTime"]').should(
      'contain.text',
      'Thu Oct 10 2024 at 20:20:00'
    );
    cy.get('[data-testid="tooltip"] > .flex > :nth-child(1)').should(
      'contain.text',
      '4.00€'
    );
    cy.get('[data-testid="tooltip"] > .flex > :nth-child(2)').should(
      'contain.text',
      '3.00€'
    );
    /* ==== End Cypress Studio ==== */
  });

  /* ==== Test Created with Cypress Studio ==== */
  it('show tooltip when hover or focus on', function () {
    /* ==== Generated with Cypress Studio ==== */
    cy.visit('/');
    cy.get('[data-testid="cartValue"]').clear();
    cy.get('[data-testid="cartValue"]').type('20');
    cy.get('[data-testid="deliveryDistance"]').clear();
    cy.get('[data-testid="deliveryDistance"]').type('20');
    cy.get('[data-testid="numberOfItems"]').clear();
    cy.get('[data-testid="numberOfItems"]').type('20');
    cy.get('[data-testid="orderTime"]').clear();
    cy.get('[data-testid="orderTime"]').type('2020-02-20T20:20');
    cy.get('[data-testid="calculateFee"]').click();
    cy.get('[data-testid="tooltip"]').should('not.be.visible');

    // hover on the info icon
    cy.get('[data-testid="tooltip"]').realHover();
    cy.get('[data-testid="tooltip"]').should('be.visible');
    // move hover to other element, should cause the tool box to be invisible
    cy.get('[data-testid="calculateFee"]').realHover();
    cy.get('[data-testid="tooltip"]').should('not.be.visible');

    // focus on the info icon
    cy.get('[data-testid="info-icon"]').focus();
    cy.get('[data-testid="tooltip"]').should('be.visible');
    // move focus elsewhere
    cy.get('[data-testid="calculateFee"]').focus();
    cy.get('[data-testid="tooltip"]').should('not.be.visible');
    /* ==== End Cypress Studio ==== */
  });

  /* ==== Test Created with Cypress Studio ==== */
  it('Cart Value field invalidation', function () {
    /* ==== Generated with Cypress Studio ==== */
    cy.visit('/');
    cy.get('[data-testid="cartValue"]').click();
    cy.get('body').click();
    cy.get('[data-testid="cartValueErrorMessage"]').should(
      'contain.text',
      'required'
    );
    cy.get('[data-testid="cartValue"]').type('0');
    cy.get('[data-testid="cartValueErrorMessage"]').should(
      'contain.text',
      'positive number' // some error message that mention must be a positive number
    );
    cy.get('[data-testid="cartValue"]').clear();
    cy.get('[data-testid="cartValue"]').type('-10');
    cy.get('[data-testid="cartValueErrorMessage"]').should(
      'contain.text',
      'positive number' // some error message that mention must be a positive number
    );
    cy.get('[data-testid="cartValue"]').clear();
    cy.get('[data-testid="cartValue"]').type('100');
    cy.get('[data-testid="cartValueErrorMessage"]').should('not.exist');
    /* ==== End Cypress Studio ==== */
  });

  /* ==== Test Created with Cypress Studio ==== */
  it('Delivery distance field invalidation', function () {
    /* ==== Generated with Cypress Studio ==== */
    cy.visit('/');
    cy.get('[data-testid="deliveryDistance"]').click();
    cy.get('body').click();
    cy.get('[data-testid="deliveryDistanceErrorMessage"]').should(
      'contain.text',
      'required'
    );
    cy.get('[data-testid="deliveryDistance"]').type('0');
    cy.get('[data-testid="deliveryDistanceErrorMessage"]').should(
      'contain.text',
      'positive number' // some error message that mention must be a positive number
    );
    cy.get('[data-testid="deliveryDistance"]').clear();
    cy.get('[data-testid="deliveryDistance"]').type('-10');
    cy.get('[data-testid="deliveryDistanceErrorMessage"]').should(
      'contain.text',
      'positive number' // some error message that mention must be a positive number
    );
    cy.get('[data-testid="deliveryDistance"]').clear();
    cy.get('[data-testid="deliveryDistance"]').type('100.5');
    cy.get('[data-testid="deliveryDistanceErrorMessage"]').should(
      'contain.text',
      'whole number' // some error message that mention must be a whole number
    );
    cy.get('[data-testid="deliveryDistance"]').clear();
    cy.get('[data-testid="deliveryDistance"]').type('100');
    cy.get('[data-testid="deliveryDistanceErrorMessage"]').should('not.exist');
    /* ==== End Cypress Studio ==== */
  });

  /* ==== Test Created with Cypress Studio ==== */
  it('Number of items field invalidation', function () {
    /* ==== Generated with Cypress Studio ==== */
    cy.visit('/');
    cy.get('[data-testid="numberOfItems"]').click();
    cy.get('body').click();
    cy.get('[data-testid="numberOfItemsErrorMessage"]').should(
      'contain.text',
      'required'
    );
    cy.get('[data-testid="numberOfItems"]').type('0');
    cy.get('[data-testid="numberOfItemsErrorMessage"]').should(
      'contain.text',
      'positive number' // some error message that mention must be a positive number
    );
    cy.get('[data-testid="numberOfItems"]').clear();
    cy.get('[data-testid="numberOfItems"]').type('-10');
    cy.get('[data-testid="numberOfItemsErrorMessage"]').should(
      'contain.text',
      'positive number' // some error message that mention must be a positive number
    );
    cy.get('[data-testid="numberOfItems"]').clear();
    cy.get('[data-testid="numberOfItems"]').type('100.5');
    cy.get('[data-testid="numberOfItemsErrorMessage"]').should(
      'contain.text',
      'whole number' // some error message that mention must be a whole number
    );
    cy.get('[data-testid="numberOfItems"]').clear();
    cy.get('[data-testid="numberOfItems"]').type('100');
    cy.get('[data-testid="numberOfItemsErrorMessage"]').should('not.exist');
    /* ==== End Cypress Studio ==== */
  });

  /* ==== Test Created with Cypress Studio ==== */
  it('Order time field invalidation', function () {
    /* ==== Generated with Cypress Studio ==== */
    cy.visit('/');
    cy.get('[data-testid="orderTime"]').click();
    cy.get('body').click();
    cy.get('[data-testid="orderTimeErrorMessage"]').should(
      'contain.text',
      'valid time' // some error message that mention must be a valid time
    );
    cy.get('[data-testid="orderTime"]').type('2020-02-30T20:20'); // an invalid date
    cy.get('[data-testid="orderTimeErrorMessage"]').should(
      'contain.text',
      'valid time' // some error message that mention must be a valid time
    );

    cy.get('[data-testid="orderTime"]').clear();
    cy.get('[data-testid="orderTime"]').type('2020-02-10T20:20');
    cy.get('[data-testid="orderTimeErrorMessage"]').should('not.exist');
    /* ==== End Cypress Studio ==== */
  });
});
