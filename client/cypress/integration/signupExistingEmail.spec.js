describe("Signup with existing account", () => {
  it("should provide error message", () => {
    cy.visit("/");
    cy.contains('Sign Up').click()
    cy.get('[name=first_name]').type("Aaron")
    cy.get('[name=last_name]').type("Tenn")
    cy.get('[name=email]').type("aaron@gmail.com")
    cy.get('[name=password]').type("Super12345")
    cy.get("[data-testid=signup-button]").click()
    cy.contains("Email address is taken")
  });
})
