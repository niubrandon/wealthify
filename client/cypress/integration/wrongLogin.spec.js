describe("Login with wrong credentials", () => {
  it("should show an error message", () => {
    cy.visit("/");
    cy.contains('Login').click()
    
    cy.get("[data-testid=input-email]").type("wrongemail@gmail.com")
    cy.get("[data-testid=input-password]").type("wrongpassword")

    cy.get("[data-testid=login-button]").click()

    cy.contains("Wrong credential")
  });
})