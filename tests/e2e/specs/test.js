// https://docs.cypress.io/api/introduction/api.html
describe("Test Header", () => {
  it("Route change from home to sign in ", () => {
    cy.visit("#/");
    cy.get('.nav-link').contains('Sign in').click();
    cy.contains("h1", "Sign in");
  });
});
 
describe("Open Home  Article", () => {
  it("Visits the Home url via login", () => {
    cy.visit("#/login");
    cy.get('.nav-link').contains('Home').click();
    cy.contains("h1", "My Medium");
  });
});
