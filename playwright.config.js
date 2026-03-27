// @ts-check
import { defineConfig, devices } from '@playwright/test';



/**
 * @see https://playwright.dev/docs/test-configuration
 */
const config = ({
  testDir: './tests',

  // if we want to override the default timeout of 30 seconds for all tests, we can do it here in the config file. 
  // This is useful if you have some tests that are expected to take longer than the default timeout.
  timeout: 40 * 1000, // 40 seconds
  expect: {
    timeout: 40 * 1000 // 40 seconds
  },

  reporter : 'html',
 
  use: {

    browserName: 'chromium', // Use chrome browser to run all the tests by default. 
    //browserName: 'firefox' // Use Firefox browser to run all tests by default. 

    //browserName: 'webkit', // Use Safari browser to run all tests by default.
      headless: false // Run tests in headed mode (with a visible browser window). Set to true for headless mode.
  },

});

module.exports = config // Export the configuration object so that Playwright can use it when running tests.

