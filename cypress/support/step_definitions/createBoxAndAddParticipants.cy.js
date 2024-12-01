import { Given, When } from "@badeball/cypress-cucumber-preprocessor";
import { faker } from "@faker-js/faker";

const boxPage = require("../../fixtures/pages/boxPage.json");
const dashboardPage = require("../../fixtures/pages/dashboardPage.json");
const generalElements = require("../../fixtures/pages/general.json");
const invitePage = require("../../fixtures/pages/invitePage.json")
const users = require("../../fixtures/users.json")

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
let inviteLink;

Given("main user is on secret santa login page", function () {
  cy.visit("/login");
});

When("main user logs in as {string} and {string}", function (login, password) {
  cy.login(login, password);
});

When("main user is on dashboard page", function () {
  cy.contains("Создать коробку").click();
});

When("main user create box", function () {
  cy.get(boxPage.boxNameField).type(newBoxName, { force: true });
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
});

When("box is created", function () {
  cy.get(dashboardPage.createdBoxName).should("have.text", newBoxName);
});

When("main user click button Добавить участников", function () {
  cy.get(generalElements.submitButton).click({ force: true });
});

When("main user copies the invite link", function () {
  cy.get(invitePage.inviteLink)
    .invoke("text")
    .then((link) => {
      inviteLink = link;
    });
});

When("main user adds participant from created boxPage by hand", function () {
  cy.get(invitePage.firstInviteeNameField).type(users.user2.name);
  cy.get(invitePage.firstInviteeEmailField).type(users.user2.email);
  cy.get(invitePage.inviteeSubmitButton).click({ force: true });
});

When("main user creates a member card for himself", function () {
  cy.get(invitePage.createParticipantButton).click();
  clickArrowRight(1);
  cy.get(boxPage.twentyNineIcon).click();
  clickArrowRight(1);
  cy.get(boxPage.wishesFrame).type(wishes);
  clickArrowRight(1);
});
