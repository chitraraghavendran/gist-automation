import { defineConfig } from 'cypress';

export const config: Cypress.ConfigOptions = {
  viewportWidth: 1920,
  viewportHeight: 1080,
  pageLoadTimeout: 80000,
  chromeWebSecurity: false,
  reporter: 'mochawesome',
  reporterOptions: {
    charts: true,
    overwrite: false,
    html: false,
    json: true,
    reportDir: 'cypress/reports',
  },
  screenshotsFolder: 'cypress/screenshots',
  video: true, // Enable video recording
  videoCompression: 32, // Reduce video size (1-100, 32 is default)
  videosFolder: 'cypress/videos', // Default path for videos
  e2e: {
    responseTimeout: 30000, // Waits up to 3 seconds for a response from API requests
    //defaultCommandTimeout: 40000, // General timeout for all Cypress commands
    setupNodeEvents(on, conf) {
      // eslint-disable-next-line global-require, import/extensions, @typescript-eslint/no-var-requires
      return require('./cypress/plugins/index.js')(on, conf);
    },
    specPattern: 'cypress/features/**/*.{feature,features}',
  },
};

export default defineConfig(config);
