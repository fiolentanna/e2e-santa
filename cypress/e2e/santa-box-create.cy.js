const users = require("../fixtures/users.json");
const boxPage = require("../fixtures/pages/boxPage.json");
const generalElements = require("../fixtures/pages/general.json");
const dashboardPage = require("../fixtures/pages/dashboardPage.json");
const invitePage = require("../fixtures/pages/invitePage.json");
const inviteeBoxPage = require("../fixtures/pages/inviteeBoxPage.json");
const inviteeDashboardPage = require("../fixtures/pages/inviteeDashboardPage.json");
const mainPage = require("../fixtures/pages/mainPage.json");
const randomizerPage = require("../fixtures/pages/randomizerPage.json");
import { faker } from "@faker-js/faker";

describe("user can create a box and run it", () => {
  //пользователь 1 логинится
  //пользователь 1 создает коробку
  //пользователь 1 получает приглашение
  //пользователь 2 переходит по приглашению
  //пользователь 2 заполняет анкету
  //пользователь 3 переходит по приглашению
  //пользователь 3 заполняет анкету
  //пользователь 4 переходит по приглашению
  //пользователь 4 заполняет анкету
  //пользователь 1 логинится
  //пользователь 1 запускает жеребьевку
  let newBoxName = faker.word.noun({ length: { min: 5, max: 10 } });
  let wishes = faker.word.noun() + faker.word.adverb() + faker.word.adjective();
  let minAmount = 50;
  let maxAmount = 100;
  let currency = "Евро";
  let inviteLink;
  let currentBox;
  let boxId;

  const clickArrowRight = (times = 1) => {
    for (let i = 0; i < times; i++) {
      cy.get(generalElements.arrowRight).click({ force: true });
    }
  };

  it("user logins and create a box", () => {
    cy.visit("/login");
    cy.login(users.userAutor.email, users.userAutor.password);
    cy.contains("Создать коробку").click({ force: true });
    cy.get(boxPage.boxNameField).type(newBoxName, { force: true });
    currentBox = newBoxName;
    cy.get(boxPage.boxIdField)
      .invoke("val")
      .then(function (value) {
        boxId = value;
        cy.log("Box ID:", boxId);
        clickArrowRight(1);
        cy.get(boxPage.sixthIcon).click({ force: true });
        clickArrowRight(1);
        cy.get(boxPage.giftPriceToggle).click({ force: true });
        cy.get(boxPage.minAmount).type(minAmount);
        cy.get(boxPage.maxAmount).type(maxAmount);
        cy.get(boxPage.currency).select(currency);
        clickArrowRight(3);
        cy.get(dashboardPage.createdBoxName).should("have.text", newBoxName);
        cy.get(inviteeBoxPage.boxMenu)
          .invoke("text")
          .then((text) => {
            expect(text).to.include("Участники");
            expect(text).to.include("Моя карточка");
            expect(text).to.include("Подопечный");
          });
      });
  });

  it("add participants by invite link", () => {
    cy.get(generalElements.submitButton).click({ force: true });
    cy.get(invitePage.inviteLink)
      .invoke("text")
      .then((link) => {
        inviteLink = link;
      });
  });

  it("Add participant from created boxPage by hand", () => {
    cy.get(invitePage.firstInviteeNameField).type(users.user2.name);
    cy.get(invitePage.firstInviteeEmailField).type(users.user2.email);
    cy.get(invitePage.inviteeSubmitButton).click({ force: true });
  });

  it("Сreate a member card by main user", () => {
    cy.get(invitePage.createParticipantButton).click();
    clickArrowRight(1);
    cy.get(boxPage.twentyNineIcon).click({ force: true });
    clickArrowRight(1);
    cy.get(boxPage.wishesFrame).type(wishes);
    clickArrowRight(1);
    cy.clearCookies();
  });

  it("approve as user1 by invite link", () => {
    cy.visit(inviteLink);
    cy.get(generalElements.submitButton).click({ force: true });
    cy.contains("войдите").click({ force: true });
    cy.login(users.user1.email, users.user1.password);
    cy.contains("Создать карточку участника").should("exist");
    cy.get(generalElements.submitButton).click({ force: true });
    clickArrowRight(2);
    cy.get(inviteeBoxPage.wishesInput).type(wishes);
    clickArrowRight(1);
    cy.get(inviteeDashboardPage.noticeForInvitee)
      .invoke("text")
      .then((text) => {
        expect(text).to.contain("Это — анонимный чат с вашим Тайным Сантой");
      });
    cy.clearCookies();
  });

  it("confirmation of invitation in the box by user 2", () => {
    cy.visit("/login");
    cy.login(users.user2.email, users.user2.password);
    cy.get(generalElements.boxesInHeader).click({ force: true });
    cy.contains(currentBox).click({ force: true });
    cy.get(boxPage.unconfirmedUserCard).click();
    cy.get(generalElements.submitButton).click({ force: true });
    clickArrowRight(1);
    cy.get(boxPage.twelveIcon).click({ force: true });
    clickArrowRight(1);
    cy.get(boxPage.wishesFrame).type(wishes);
    clickArrowRight(1);
    cy.contains("Это — анонимный чат с вашим Тайным Сантой");
    cy.clearCookies();
  });

  it("approve as user3", () => {
    cy.visit(inviteLink);
    cy.get(generalElements.submitButton).click();
    cy.contains("войдите").click();
    cy.login(users.user3.email, users.user3.password);
    cy.contains("Создать карточку участника").should("exist");
    cy.get(generalElements.submitButton).click({ force: true });
    clickArrowRight(2);
    cy.get(inviteeBoxPage.wishesInput).type(wishes);
    clickArrowRight(1);
    cy.get(inviteeDashboardPage.noticeForInvitee)
      .invoke("text")
      .then((text) => {
        expect(text).to.contain("Это — анонимный чат с вашим Тайным Сантой");
      });
    cy.clearCookies();
  });

  it("the main user starts the draw on randomizer", () => {
    cy.visit("/login");
    cy.login(users.userAutor.email, users.userAutor.password);
    cy.get(mainPage.rundomizerButton).click({ force: true });
    clickArrowRight(1);
    cy.get(randomizerPage.firstUserNameField).type(users.user1.name);
    cy.get(randomizerPage.firstUserEmailField).type(users.user1.email);
    cy.get(randomizerPage.secondUserNameField).type(users.user2.name);
    cy.get(randomizerPage.secondUserEmailField).type(users.user2.email);
    cy.get(randomizerPage.thirdUserNameField).type(users.user3.name);
    cy.get(randomizerPage.thirdUserEmailField).type(users.user3.email);
    clickArrowRight(2);
    cy.contains("Жеребьевка проведена!").should("exist");
  });

  after("delete box", () => {
    cy.request({
      method: "DELETE",
      url: `/api/box/${boxId}`,
      headers: {
        Cookies:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjY4MjE2ODksImlhdCI6MTczMjMxNDczMSwiZXhwIjoxNzM0OTA2NzMxfQ.ByM7TfA1jm36EXgIwqeHvfDlNNT4QbZthYw3pXYUFgE; Max-Age=2592000",
      },
    }).then((response) => {
      expect(response.status).to.eq(200);
    });
  });
});
