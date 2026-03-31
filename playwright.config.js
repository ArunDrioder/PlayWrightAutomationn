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

  //This 40 seconds timeout is a maximum execution time allowed for a single test, including all steps and assertions. 
  // If a test takes longer than this time to complete, it will be considered a failure.


  
  expect: {
    timeout: 5 * 1000 // 5 seconds

    //This timeout inside expect block is for individual assertions. If an assertion takes longer than this time to pass, it will be considered a failure. 
    // This is useful for cases where you expect certain conditions to be met within a specific timeframe, such as waiting for an element to appear on the page or for a certain state to be reached.
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

