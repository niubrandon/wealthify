describe("Navigation", () => {
  it("should visit root", () => {
    cy.visit("/");
    cy.contains("Top 10")
  });
})