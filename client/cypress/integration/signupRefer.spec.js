describe("Signup with referral", () => {
  it("should signup with an account with referral", () => {
    cy.visit("/");
    cy.contains('Sign Up').click()
    cy.get('[name=first_name]').type("New")
    cy.get('[name=last_name]').type("Account")
    cy.get('[name=email]').type("NewAccount@gmail.com")
    cy.get('[name=password]').type("Super12345")
    cy.get('name=referral_code').type("ac6b9h")
    // cy.get("[data-testid=signup-button]").click()
    // cy.contains("10,250")
  });
})
