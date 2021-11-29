describe("Search", () => {
  it("should be able to search for a stock", () => {
    cy.visit("/");
    cy.contains('Login').click()
    cy.get("[data-testid=input-email]").type("aaron@gmail.com")
    cy.get("[data-testid=input-password]").type("Super12345")
    cy.get("[data-testid=login-button]").click()
    cy.contains("Welcome")

    // cy.contains('Search').click()
    // cy.get('#search-bar').type("AAPL")
    // cy.contains("Apple").click()
    // cy.contains("Buy")

  });
})