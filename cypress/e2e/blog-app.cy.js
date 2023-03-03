describe("Blog app", () => {
  beforeEach(() => {
    cy.request("post", `${Cypress.env("BACKEND")}/testing/reset`);
    cy.request("post", `${Cypress.env("BACKEND")}/users/`, {
      name: "Marek Zelinka",
      username: "mzelinka",
      password: "123456",
    });
    cy.visit("");
  });

  it("should display the login form", () => {
    cy.findByText(/sign in to application/i);
    cy.findByRole("textbox", { name: /username/i }).should("exist");
    cy.findByLabelText(/password/i).should("exist");
    cy.findByRole("button", { name: /sign in/i }).should("exist");
  });

  describe("logging in", () => {
    it("succeeds with valid credentails", () => {
      cy.findByRole("textbox", { name: /username/i }).type("mzelinka");
      cy.findByLabelText(/password/i).type("123456");
      cy.findByRole("button", { name: /sign in/i }).click();

      cy.findByText(/signed in as marek zelinka/i).should("exist");
    });

    it("fails with error message if credentails are invalid", () => {
      cy.findByRole("textbox", { name: /username/i }).type("mzelinka");
      cy.findByLabelText(/password/i).type("wrongpassword");
      cy.findByRole("button", { name: /sign in/i }).click();

      cy.findByText(/signed in as marek zelinka/i).should("not.exist");
      cy.findByText(/wrong username or password/i).should("exist");
    });
  });
});
