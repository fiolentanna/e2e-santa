const users = require("../fixtures/users.json");
import { faker } from "@faker-js/faker";
let newBoxName = faker.word.noun({ length: { min: 5, max: 10 } });
let boxId =
  faker.random.alpha({ count: 3, upcase: false }) +
  faker.random.alpha({ count: 3, upcase: true });
let minAmount = 50;
let maxAmount = 100;
let currency = "eur";
let inviteLink;
let currentBoxId;
let wishText = faker.word.noun() + faker.word.adverb() + faker.word.adjective();
let inviteKey;
let userAutorCardId;
let user2CardId;
let user1CardId;
let user3CardId;

describe("user can create a box and run it", () => {
  it("user logins and create a box API", () => {
    cy.loginAPI(users.userAutor.email, users.userAutor.password);
    //создадим коробку
    cy.request({
      method: "POST",
      url: "/api/box",
      Headers: {
        Cookies: users.userAutor.cookies
      },
      body: {
        email: null,
        name: newBoxName,
        key: boxId,
        picture: "santa",
        usePost: false,
        useCashLimit: true,
        cashLimit: maxAmount,
        cashLimitMin: minAmount,
        cashLimitCurrency: currency,
        useWish: true,
        useCircleDraw: null,
        isInviteAfterDraw: null,
        isArchived: null,
        createAdminCard: null,
        isCreated: true,
        useNames: true,
        isPhoneRequired: false,
        logo: null,
      },
    }).then((response) => {
      expect(response.status).to.eq(200);
      // Проверяем наличие параметров в теле ответа
      const responseBody = response.body;
      const responseBodyBox = response.body.box;
      expect(responseBody).to.have.property("box");
      expect(responseBodyBox).to.have.property("name", newBoxName);
      expect(responseBodyBox).to.have.property("key", boxId);
      expect(responseBody).to.have.property("inviteLink");
      expect(responseBodyBox).to.have.property("inviteKey")
      inviteLink = response.body.inviteLink;
      inviteKey = response.body.box.inviteKey;
      currentBoxId = boxId;
      cy.log(currentBoxId);
      cy.log(inviteLink);
    });
  });

  it("Add participant from created boxPage by username and email. API", () => {
    cy.request({
      method: "POST",
      url: `/api/box/${currentBoxId}/invite`,
      headers: {
        Cookies: users.userAutor.cookies
      },
      body: {
        isInviteAfterDraw: false,
        users: [
          {
            username: users.user2.name,
            email: users.user2.email,
            id: "input-table-0",
          },
        ],
      },
    }).then((response) => {
      expect(response.status).to.eq(200);
    });
  });

  it("Сreate a member card by main user. API", () => {
    cy.request({
      method: 'POST',
      url: `/api/box/${currentBoxId}/card`,
      headers: {
        Cookies: users.userAutor.cookies
      },
      body: {
        "picture": "chipmunk",
        "avatar": "",
        "wardId": null,
        "email": users.userAutor.email,
        "username": users.userAutor.name,
        "wish": wishText,
        "postalCode": null,
        "postalAddress": null,
        "postalRecipient": null,
        "drawColors": null,
        "isVerified": true,
        "isWardKnown": null,
        "phone": null
      },
    }).then((response) => {
      expect(response.status).to.eq(200);
      const responseBody = response.body;
      expect (responseBody).to.have.property("id");
      userAutorCardId = response.body.id;
    }); 
    cy.clearCookies(); 
  });

  it("confirmation of invitation in the box by user 2. API", () => {
    cy.loginAPI(users.user2.email, users.userAutor.password);
    cy.request({
      method: 'POST',
      url: `/api/box/${currentBoxId}/card`,
      headers: {
        Cookies: users.user2.cookies
      },
      body: {
        "picture": "lama",
        "avatar": "",
        "wardId": null,
        "email": users.user2.email,
        "username": users.user2.name,
        "wish": wishText,
        "postalCode": null,
        "postalAddress": null,
        "postalRecipient": null,
        "drawColors": null,
        "isVerified": true,
        "isWardKnown": null,
        "phone": null
      },
    }).then((response) => {
      expect(response.status).to.eq(200);
      const responseBody = response.body;
      expect (responseBody).to.have.property("id");
      user2CardId = response.body.id;
    });
    cy.clearCookies();   
  })

  it("approve as user1 by invite link. API", () => {
    cy.request({
      method: 'GET',
      url: inviteLink
    }).then((response) => {
      expect(response.status).to.eq(200);
    });
    cy.loginAPI(users.user1.email, users.user1.password);
    cy.request({
      method: 'POST',
      url: `/api/box/${currentBoxId}/card?join=${inviteKey}`,
      headers: {
        Cookies: users.user1.cookies
      },
      body: {
        "picture": "lama",
        "avatar": "",
        "wardId": null,
        "email": users.user1.email,
        "username": users.user1.name,
        "wish": wishText,
        "postalCode": null,
        "postalAddress": null,
        "postalRecipient": null,
        "drawColors": null,
        "isVerified": true,
        "isWardKnown": null,
        "phone": null
      },
    }).then((response) => {
      expect(response.status).to.eq(200);
      const responseBody = response.body;
      expect (responseBody).to.have.property("id");
      user1CardId = response.body.id;
    });
    cy.clearCookies();
  });

  it("approve as user3 by invite link. API", () => {
    cy.request({
      method: 'GET',
      url: inviteLink
    }).then((response) => {
      expect(response.status).to.eq(200);
    });
    cy.loginAPI(users.user3.email, users.user3.password);
    cy.request({
      method: 'POST',
      url: `/api/box/${currentBoxId}/card?join=${inviteKey}`,
      headers: {
        Cookies: users.user3.cookies
      },
      body: {
        "picture": "lama",
        "avatar": "",
        "wardId": null,
        "email": users.user3.email,
        "username": users.user3.name,
        "wish": wishText,
        "postalCode": null,
        "postalAddress": null,
        "postalRecipient": null,
        "drawColors": null,
        "isVerified": true,
        "isWardKnown": null,
        "phone": null
      },
    }).then((response) => {
      expect(response.status).to.eq(200);
      const responseBody = response.body;
      expect (responseBody).to.have.property("id");
      user3CardId = response.body.id;
    });
    cy.clearCookies();
  });

  it("the main user starts the draw on randomizer.API", () => {
    cy.loginAPI(users.userAutor.email, users.userAutor.password);
    cy.request({
      method: 'POST',
      url: `/api/box/${currentBoxId}/draw`,
      headers: {
        Cookies: users.userAutor.cookies
      },
      body: {
          "cards": [
              {
                  "id": userAutorCardId,
                  "wardId": user3CardId
              },
              {
                  "id": user1CardId,
                  "wardId": user2CardId
              },
              {
                  "id": user2CardId,
                  "wardId": user1CardId
              },
              {
                  "id": user3CardId,
                  "wardId": userAutorCardId
              }
          ]
      },
    }).then((response) => {
      expect(response.status).to.eq(200);
    });
  });

  after("delete box", () => {
    cy.request({
      method: "DELETE",
      url: `/api/box/${currentBoxId}`,
      headers: {
        Cookies:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjY4MjE2ODksImlhdCI6MTczMjMxNDczMSwiZXhwIjoxNzM0OTA2NzMxfQ.ByM7TfA1jm36EXgIwqeHvfDlNNT4QbZthYw3pXYUFgE; Max-Age=2592000",
      },
    }).then((response) => {
      expect(response.status).to.eq(200);
    });
  });
})
