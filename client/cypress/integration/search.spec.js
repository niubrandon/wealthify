describe("Search", () => {
  it("should be able to search for a stock", () => {
    cy.visit("/");
    
    cy.contains('Search').click()
    cy.get('#search-bar').type("AAPL")
  });
})