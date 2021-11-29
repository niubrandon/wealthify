describe("Login", () => {
  it("should login succesfully", () => {
    cy.visit("/");
    cy.contains('Login').click()
    
    cy.get("[data-testid=input-email]").type("aaron@gmail.com")
    cy.get("[data-testid=input-password]").type("Super12345")

    cy.get("[data-testid=login-button]").click()

    cy.contains("Welcome")
  });
})