import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import { faker } from "@faker-js/faker";
const boxPage = require("../../fixtures/pages/boxPage.json");
const dashboardPage = require("../../fixtures/pages/dashboardPage.json");
const generalElements = require("../../fixtures/pages/general.json");
const invitePage = require("../../fixtures/pages/invitePage.json");
const users = require("../../fixtures/users.json");
const inviteeBoxPage = require("../../fixtures/pages/inviteeBoxPage.json");
const inviteeDashboardPage = require("../../fixtures/pages/inviteeDashboardPage.json");


const clickArrowRight = (times = 1) => {
  for (let i = 0; i < times; i++) {
    cy.get(generalElements.arrowRight).click({ force: true });
  }
};

let boxId =
  faker.random.alpha({ count: 3, upcase: false }) +
  faker.random.alpha({ count: 3, upcase: true });
let newBoxName = faker.word.noun({ length: { min: 5, max: 10 } });
let wishes = faker.word.noun() + faker.word.adverb() + faker.word.adjective();
let minAmount = 50;
let maxAmount = 100;
let currency = "Евро";
let currentBox;

Given(
  "main user creates box and adds participant from created boxPage by hand",
  function () {
    cy.visit("/login");
    cy.login(users.userAutor.email, users.userAutor.password);
    cy.contains("Создать коробку").click();
    cy.get(boxPage.boxNameField).type(newBoxName, { force: true });
    currentBox = newBoxName;
    cy.get(boxPage.boxIdField).focus().clear();
    cy.get(boxPage.boxIdField).type(boxId, { force: true });
    clickArrowRight(1);
    cy.get(boxPage.sixthIcon).click();
    clickArrowRight(1);
    cy.get(boxPage.giftPriceToggle).click({ force: true });
    cy.get(boxPage.minAmount).type(minAmount);
    cy.get(boxPage.maxAmount).type(maxAmount);
    cy.get(boxPage.currency).select(currency);
    clickArrowRight(3);
    cy.get(dashboardPage.createdBoxName).should("have.text", newBoxName);
    cy.get(generalElements.submitButton).click({ force: true });
    cy.get(invitePage.firstInviteeNameField).type(users.user2.name);
    cy.get(invitePage.firstInviteeEmailField).type(users.user2.email);
    cy.get(invitePage.inviteeSubmitButton).click({ force: true });
    cy.clearCookies();
  }
);

When("user2 goes to login page", function () {
  cy.visit("/login");
});

When("user2 logs in as {string} and {string}", function (login, password) {
  cy.login(login, password);
});

When("user2 goes to boxes page", function () {
  cy.get(generalElements.boxesInHeader).click({ force: true });
  cy.contains(currentBox).click({ force: true });
});

When("user2 finds unconfirmed usercard in the box", function () {
  cy.get(boxPage.unconfirmedUserCard).click();
});

When("user2 creates a member card", function () {
  cy.get(generalElements.submitButton).click({ force: true });
  clickArrowRight(1);
  cy.get(boxPage.twelveIcon).click({ force: true });
  clickArrowRight(1);
  cy.get(boxPage.wishesFrame).type(wishes);
  clickArrowRight(1);
});

Then("user2 is on his Dashboard Page", function () {
  cy.contains("Это — анонимный чат с вашим Тайным Сантой");
});
