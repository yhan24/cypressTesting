/// <reference types = "cypress" />

const { defineConfig } = require("cypress");
const happoTask = require('happo-cypress/task');
const { initPlugin } = require('cypress-plugin-snapshots/plugin');



module.exports = defineConfig({
  chromeWebSecurity: false,
  e2e: {
    baseUrl: 'https://cms-lyart.vercel.app/',
    setupNodeEvents(on, config) {
      happoTask.register(on);

      // implement node event listeners here
    }
  }
})
require('@applitools/eyes-cypress')(module)
