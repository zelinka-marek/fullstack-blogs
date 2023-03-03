describe("Blog app", () => {
  beforeEach(() => {
    cy.request("post", `${Cypress.env("BACKEND")}/testing/reset`);
    cy.visit("");
  });

  it("should display the login form", () => {
    cy.findByText(/sign in to application/i);
    cy.findByRole("textbox", { name: /username/i }).should("exist");
    cy.findByLabelText(/password/i).should("exist");
    cy.findByRole("button", { name: /sign in/i }).should("exist");
  });
});
