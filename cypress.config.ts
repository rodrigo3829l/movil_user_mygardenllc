import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    supportFile: "tests/e2e/support/e2e.{js,jsx,ts,tsx}",
    specPattern: "tests/e2e/specs/**/*.cy.{js,jsx,ts,tsx}",
    videosFolder: "tests/e2e/videos",
    screenshotsFolder: "tests/e2e/screenshots",
    baseUrl: "https://stagingmovil.mygardenllcservices.com",
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
