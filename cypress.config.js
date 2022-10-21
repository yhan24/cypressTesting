const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://cms-lyart.vercel.app/',
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
  timeouts:{
    execTimeout: 50000
  }
});
