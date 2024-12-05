const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: "y8xjgw",
  video: false,
  e2e: {
    baseUrl: "https://santa-secret.ru",
    testIsolation: false,
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    pageLoadTimeout: 8000,
    viewportWidth: 1920, // ширина экрана 24-дюймового монитора
    viewportHeight: 1080, // высота экрана 24-дюймового монитора
  },
});