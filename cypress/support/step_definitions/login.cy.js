import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
const users = require("../../fixtures/users.json");

Given("user is on secret santa login page", function () {
  cy.visit("/login");
});

When("user logs in as {string} and {string}", function (login, password) {
    cy.login(login, password);
});

// When("user logs in with table", function (dataTable) {
//   cy.log(dataTable.hashes()[0].login);
//   cy.log(dataTable.hashes()[0].password);
//   cy.login(dataTable.hashes()[0].login, dataTable.hashes()[0].password);
// });

Then("user is on dashboard page", function () {
  cy.contains("Создать коробку").click();
});


