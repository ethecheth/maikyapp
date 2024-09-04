const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    experimentalStudio: true,
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl: process.env.CYPRESS_BASE_URL || 'http://localhost:3000', // Your base URL here
  },
});