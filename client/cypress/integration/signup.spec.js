describe("Signup", () => {
  it("should signup with an account", () => {
    cy.visit("/");
    cy.contains('Sign Up').click()
    cy.get('[name=first_name]').type("New")
    cy.get('[name=last_name]').type("Account")
    cy.get('[name=email]').type("NewAccount@gmail.com")
    cy.get('[name=password]').type("Super12345")
    // cy.get("[data-testid=signup-button]").click()
    // cy.contains("10,250")
  });
})
