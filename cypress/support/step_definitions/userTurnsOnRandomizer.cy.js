import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
const users = require("../../fixtures/users.json");
const boxPage = require("../../fixtures/pages/boxPage.json");
const generalElements = require("../../fixtures/pages/general.json");
const dashboardPage = require("../../fixtures/pages/dashboardPage.json");
const invitePage = require("../../fixtures/pages/invitePage.json");
const inviteeBoxPage = require("../../fixtures/pages/inviteeBoxPage.json");
const inviteeDashboardPage = require("../../fixtures/pages/inviteeDashboardPage.json");
const mainPage = require("../../fixtures/pages/mainPage.json");
const randomizerPage = require("../../fixtures/pages/randomizerPage.json");
import { faker } from "@faker-js/faker";

let boxId =
  faker.random.alpha({ count: 3, upcase: false }) +
  faker.random.alpha({ count: 3, upcase: true });
let newBoxName = faker.word.noun({ length: { min: 5, max: 10 } });
let wishes = faker.word.noun() + faker.word.adverb() + faker.word.adjective();
let minAmount = 50;
let maxAmount = 100;
let currency = "Евро";
let inviteLink;
let currentBox;

const clickArrowRight = (times = 1) => {
  for (let i = 0; i < times; i++) {
    cy.get(generalElements.arrowRight).click({ force: true });
  }
};

Given ("main user is on login page", function () {
    cy.visit("/login");
});

When("main user logs in successfully", function () {
  cy.login(users.userAutor.email, users.userAutor.password);
});

When("main user clicks the Create Box button", function () {
  cy.contains("Создать коробку").click();
});

When("main user fills in the box name field", function () {
  cy.get(boxPage.boxNameField).type(newBoxName, { force: true });
  currentBox = newBoxName;
});

When("main user clears the box ID field and fills it with new text", function () {
  cy.get(boxPage.boxIdField).focus().clear();
  cy.get(boxPage.boxIdField).type(boxId, { force: true });
  clickArrowRight(1);
});

When("main user selects icon 6", function () {
  cy.get(boxPage.sixthIcon).click();
    clickArrowRight(1);
});

When("main user activates the gift price setting toggle", function () {
  cy.get(boxPage.giftPriceToggle).click({ force: true });
});

When("main user sets the minimum gift amount", function () {
  cy.get(boxPage.minAmount).type(minAmount);
});

When("main user sets the maximum gift amount", function () {
  cy.get(boxPage.maxAmount).type(maxAmount);
});


When("main user selects the Euro currency", function () {  
  cy.get(boxPage.currency).select(currency);
  clickArrowRight(3);
});

When("box is created, the main user is on the box page", () {
  cy.get(dashboardPage.createdBoxName).should("have.text", newBoxName);
});

When("main user clicks the Add members button", function () {
  cy.get(generalElements.submitButton).click({ force: true });
});

When("main user copies the invitation link", function () {
  cy.get(invitePage.inviteLink)
      .invoke("text")
      .then((link) => {
        inviteLink = link;
      });
});

When("main user adds manual invitation for user 2", function () {
  cy.get(invitePage.firstInviteeNameField).type(users.user2.name);
  cy.get(invitePage.firstInviteeEmailField).type(users.user2.email);
  cy.get(invitePage.inviteeSubmitButton).click({ force: true });
});

When("main user creates his own card for the box", function () {
  cy.get(invitePage.createParticipantButton).click();
  clickArrowRight(1);
  cy.get(boxPage.twentyNineIcon).click();
  clickArrowRight(1);
  cy.get(boxPage.wishesFrame).type(wishes);
  clickArrowRight(1);
  cy.clearCookies();
})

When("user1 follows the invitation link", function () {
  cy.visit(inviteLink);
});

When("user1 clicks on the Create Member Card button", function () {
  cy.get(generalElements.submitButton).click();
});

When("user1 clicks button Sign in", function () {
  cy.contains("войдите").click();
});

When("user1 logs in successfully", function () {
  cy.login(users.user1.email, users.user1.password);
});

When("user1 clicks on Create Member Card", function () {
  cy.contains("Создать карточку участника").should("exist");
  cy.get(generalElements.submitButton).click({ force: true });
  clickArrowRight(2);
});

When("user1 writes wishes", function () {
  cy.get(inviteeBoxPage.wishesInput).type(wishes);
  clickArrowRight(1);
});

When("user1 successfully created his card", function () {
  cy.get(inviteeDashboardPage.noticeForInvitee)
    .invoke("text")
    .then((text) => {
      expect(text).to.contain("Это — анонимный чат с вашим Тайным Сантой");
    });
  cy.clearCookies();
});

When("user3 follows the invitation link", function () {
  cy.visit(inviteLink);
});

When("user3 clicks on the Create Member Card button", function () {
  cy.get(generalElements.submitButton).click();
});

When("user3 clicks button Sign in", function () {
  cy.contains("войдите").click();
});

When("user3 logs in successfully", function () {
  cy.login(users.user3.email, users.user3.password);
});

When("user3 clicks on Create Member Card", function () {
  cy.contains("Создать карточку участника").should("exist");
  cy.get(generalElements.submitButton).click({ force: true });
  clickArrowRight(2);
});

When("user3 writes wishes", function () {
  cy.get(inviteeBoxPage.wishesInput).type(wishes);
  clickArrowRight(1);
});

When("user3 successfully created his card", function () {
  cy.get(inviteeDashboardPage.noticeForInvitee)
    .invoke("text")
    .then((text) => {
      expect(text).to.contain("Это — анонимный чат с вашим Тайным Сантой");
    });
  cy.clearCookies();
});

When("user2 is on login page", function () {
  cy.visit("/login");
});

When("user2 logs in successfully", function () {
  cy.login(users.user2.email, users.user2.password);
});

When("user2 clicks the Boxes button in the header", function () {
  cy.get(generalElements.boxesInHeader).click({ force: true });
});

When("user2 finds the box and clicks on his unverified card on the Boxes page", function () {
  cy.contains(currentBox).click({ force: true });
  cy.get(boxPage.unconfirmedUserCard).click();
});

When("user2 confirms card creation", function () {
  cy.get(generalElements.submitButton).click({ force: true });
  clickArrowRight(1);
});

When("user2 selects icon 12", function () {
  cy.get(boxPage.twelveIcon).click({ force: true });
  clickArrowRight(1);
});

When("user2 writes wishes", function () {
  cy.get(boxPage.wishesFrame).type(wishes);
  clickArrowRight(1);
});

When("user2 successfully created his card", function () {
  cy.contains("Это — анонимный чат с вашим Тайным Сантой");
  cy.clearCookies();
});

When("main user is on login page", function () {
  cy.visit("/login");
});

When("main user logs in successfully to start randomizer", function () {
  cy.login(users.userAutor.email, users.userAutor.password);
});

When("main user clicks the Boxes button in the header", function () {
  cy.get(generalElements.boxesInHeader).click({ force: true });
});

When("main user finds the box and clicks on it", function () {
  cy.contains(currentBox).click({ force: true });
});

When("main user clicks the button Go to the randomizer", function () {
  cy.get(boxPage.randomizerButton).click({ force: true });
});

When("main user clicks the Run randomizer button and confirms his actions", function () {
  cy.get(generalElements.submitButton).click({ force: true });
  cy.get(randomizerPage.randomiserSubmitButton).click({ force: true });
});

When(
  "the main user receives confirmation that the randomizer was successfully run",
  function () {
    cy.contains("Жеребьевка проведена").should("exist");
});

Then("main user deletes box", function () {
  cy.request({
    method: "DELETE",
    url: `/api/box/${currentBoxId}`,
    headers: {
      Cookies: users.userAutor.cookies,
    },
  }).then((response) => {
    expect(response.status).to.eq(200);
  });
});
