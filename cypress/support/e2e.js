import "./commands";
import "cypress-real-events/support";
Cypress.on("uncaught:exception", (err) => {
    if (err.message.includes("google_trackConversion is not a function")) {
        return false;
    }
});
afterEach(function () {
  cy.screenshot(this.currentTest.title);
});