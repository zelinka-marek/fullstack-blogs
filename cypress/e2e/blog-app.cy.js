describe("Blog app", () => {
  beforeEach(() => {
    cy.request("post", `${Cypress.env("BACKEND")}/testing/reset`);
    cy.request("post", `${Cypress.env("BACKEND")}/users/`, {
      name: "Matti Luukkainen",
      username: "mluukkai",
      password: "salainen",
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
      cy.findByRole("textbox", { name: /username/i }).type("mluukkai");
      cy.findByLabelText(/password/i).type("salainen");
      cy.findByRole("button", { name: /sign in/i }).click();

      cy.findByText(/signed in as matti luukkainen/i).should("exist");
    });

    it("fails with error message if credentails are invalid", () => {
      cy.findByRole("textbox", { name: /username/i }).type("mluukkai");
      cy.findByLabelText(/password/i).type("wrongpassword");
      cy.findByRole("button", { name: /sign in/i }).click();

      cy.findByText(/signed in as matti luukkainen/i).should("not.exist");
      cy.findByText(/wrong username or password/i).should("exist");
    });
  });

  describe("when logged in", () => {
    beforeEach(() => {
      cy.findByRole("textbox", { name: /username/i }).type("mluukkai");
      cy.findByLabelText(/password/i).type("salainen");
      cy.findByRole("button", { name: /sign in/i }).click();
    });

    it("should create a new blog when form is submitted", () => {
      const validBlog = {
        title: "TDD harms architecture",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
      };

      cy.findByRole("button", { name: /new blog/i }).click();

      cy.findByRole("textbox", { name: /title/i }).type(validBlog.title);
      cy.findByRole("textbox", { name: /author/i }).type(validBlog.author);
      cy.findByRole("textbox", { name: /url/i }).type(validBlog.url);
      cy.findByRole("button", { name: /save blog/i }).click();

      cy.findByText(validBlog.title).should("exist");
    });

    describe("several blogs exists", () => {
      beforeEach(() => {
        cy.findByRole("button", { name: /new blog/i }).click();
        cy.findByRole("textbox", { name: /title/i }).type(
          "Intro to React: Part 1"
        );
        cy.findByRole("textbox", { name: /author/i }).type("Marek zelinka");
        cy.findByRole("textbox", { name: /url/i }).type(
          "https://marekzelinka.dev/blog/intro-to-react-part-1"
        );
        cy.findByRole("button", { name: /save blog/i }).click();
        cy.findByRole("button", { name: /new blog/i }).click();
        cy.findByRole("textbox", { name: /title/i }).type(
          "Intro to React: Part 2"
        );
        cy.findByRole("textbox", { name: /author/i }).type("Marek zelinka");
        cy.findByRole("textbox", { name: /url/i }).type(
          "https://marekzelinka.dev/blog/intro-to-react-part-2"
        );
        cy.findByRole("button", { name: /save blog/i }).click();
        cy.findByRole("button", { name: /new blog/i }).click();
        cy.findByRole("textbox", { name: /title/i }).type(
          "Intro to React: Part 3"
        );
        cy.findByRole("textbox", { name: /author/i }).type("Marek zelinka");
        cy.findByRole("textbox", { name: /url/i }).type(
          "https://marekzelinka.dev/blog/intro-to-react-part-3"
        );
        cy.findByRole("button", { name: /save blog/i }).click();
      });

      describe("with an expanded blog", () => {
        beforeEach(() => {
          cy.findByText(/intro to react: part 2/i)
            .parent()
            .parent()
            .findByRole("button", { name: /view/i })
            .click();
        });

        it.only("should be able to like a blog", () => {
          cy.findByText(/intro to react: part 2/i)
            .parent()
            .parent()
            .parent()
            .findByRole("button", { name: /like/i })
            .click();
          cy.findByText(/intro to react: part 2/i)
            .parent()
            .parent()
            .parent()
            .findByText(/1 like/i)
            .should("exist");
        });
      });
    });
  });
});
