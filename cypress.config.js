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
      require("cypress-localstorage-commands/plugin")(on,config);
      return config;

      // implement node event listeners here
    }
  },
  env:{
    apiUrl:'http://cms.chtoma.com/api/',
  }
})
require('@applitools/eyes-cypress')(module)
