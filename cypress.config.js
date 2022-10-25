/// <reference types = "cypress" />

const { defineConfig } = require("cypress");

module.exports = defineConfig({
  chromeWebSecurity: false,
  e2e: {
    baseUrl: 'https://cms-lyart.vercel.app/',
    setupNodeEvents(on, config) {
      // implement node event listeners here
    }
  }
});
