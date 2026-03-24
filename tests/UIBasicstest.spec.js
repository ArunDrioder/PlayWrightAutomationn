const {test} = require('@playwright/test'); // This is the new way to import test and expect in Playwright 1.30.0 and later versions

// ============================================================================
// METHOD 1: Creating a Custom Browser Context (Used for advanced scenarios)
// ============================================================================
test('Custom Browser Context Test', async ({ browser }) => {
    
    // 1. Create a fresh, isolated environment (Context).
    // WHY use this method? If you need to inject cookies, block location permissions, 
    // or simulate a specific mobile device, you MUST do it here at the context level.
    const context = await browser.newContext(); 
    
    // 2. Open a new tab/window within that specific context.
    const page = await context.newPage(); 
    
    // 3. Navigate to the application.
    await page.goto('https://rahulshettyacademy.com/loginpagePractise/'); 
});


// ============================================================================
// METHOD 2: Using the Default Page Fixture (The standard, everyday approach)
// ============================================================================
test.only('Default Page Fixture Test', async ({ page }) => {
    
    // Playwright is smart: by passing { page } into the function, it automatically 
    // creates the Browser and Context for us behind the scenes!

    //test.only() is a method provided by Playwright's test runner that allows you to run only a specific test or a group of tests. 
    // When you use test.only(), it will ignore all other tests in the file and execute only the test(s) marked with .only(). This is useful for debugging or when you want to focus on a particular test without running the entire test suite.
    
    // WHY use this method? This is the fastest and cleanest way to write 95% of your tests 
    // when you don't need any special browser setups or custom cookies.
    await page.goto('https://google.com'); 

});



//javascript is asynchronous, it means that the code will not wait for the previous line to finish before moving on to the next line. This can lead to unexpected behavior if you are not careful. To handle this, you can use async/await syntax to make your code more readable and easier to understand.

    // To use async/await, you need to declare your test function as async. This allows you to use the await keyword inside the function to wait for asynchronous operations to complete before moving on to the next line of code.

 // This is a basic test case in Playwright. You can add your test steps inside the function. For example, you can navigate to a webpage, interact with elements, and make assertions.

 // By default Playwiwright won't run the tests in browsers, instead it will run the tests in a headless mode. 
 // If you want to see the browser in action, you can set the headless option to false in the 
 // Playwright configuration file (playwright.config.js).

 //we can also specify the test to run in browser using this command : npx playwright test --headed
