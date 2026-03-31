const {test, expect} = require('@playwright/test'); // This is the new way to import test and expect in Playwright 1.30.0 and later versions

// ============================================================================
// METHOD 1: Creating a Custom Browser Context (Used for advanced scenarios)
// ============================================================================
test.only('Browser Context Playwright Test', async ({ browser }) => {
    
    // 1. Create a fresh, isolated environment (Context).
    // WHY use this method? If you need to inject cookies, block location permissions, 
    // or simulate a specific mobile device, you MUST do it here at the context level.

   const context = await browser.newContext(); 
    
    // 2. Open a new tab/window within that specific context.
    
    
    const page = await context.newPage(); 

     const userName = page.locator('#username'); // This will create a locator for the input field with the id 'username'. You can use this locator to interact with the element later in your test.
    const password = page.locator("[type='password']"); // This will create a locator for the input field with the type 'password'. You can use this locator to interact with the element later in your test.
    const signInButton = page.locator("[type='submit']"); // This will create a locator for the input field with the type 'submit'. You can use this locator to interact with the element later in your test.
    const validationElement = page.locator("[style*='block']"); // This will create a locator for the element with a style attribute that contains 'block'. You can use this locator to interact with the element later in your test, such as checking its text content or visibility.
    
    
    // 3. Navigate to the application.
    await page.goto('https://rahulshettyacademy.com/loginpagePractise/'); 
    console.log(await page.title()); // This will print the title of the page to the console.
    await userName.fill("rahulshetty"); // This will type 'rahulshetty' into the input field with the id 'username'.
    await password.fill("Learning@830$3mK2");// This will type 'Learning@830$3mK2' into the input field with the type 'password'.
    await signInButton.click(); // This will click the sign-in button on the page.
    
    console.log(await validationElement.textContent()); // This will print the text content of the element with a style attribute that contains 'block' to the console. This is likely used to capture and display any error messages that appear after attempting to log in with the provided credentials.
    //await page.locator("[style*='block']").textContent().then(text => console.log(text)); // This will also print the text content of the element with a style attribute that contains 'block' to the console. This is likely used to capture and display any error messages that appear after attempting to log in with the provided credentials.
    
    //=======NOTE : Both the lines 23 & 24 will give the same result, but the line 23 is more concise and easier to read. The line 24 uses a promise and a then() method to achieve the same result, but it is less straightforward and can be more difficult to understand for someone who is not familiar with promises in JavaScript. Therefore, it is generally recommended to use the more concise and readable approach shown in line 23.=======
    
    //Error message's locator:
    // <div class="alert alert-danger col-md-12" style="display: none;"><strong>Empty</strong> username/password.</div>

    await expect(page.locator("[style*='block']")).toContainText("Incorrect"); // This is an assertion to check if the text content of the element with a style attribute that contains 'block' is 'Incorrect username/password.'. If not, the test will fail.
    
    await userName.fill(""); // This will clear the input field with the id 'username' by filling it with an empty string.
    await userName.fill("rahulshettyacademy"); // This will clear the input field with the id 'password' by filling it with an empty string.
    await signInButton.click(); // This will click the sign-in button on the page.
    console.log(await page.locator(".card-body a").first().textContent()); // This will print the text content of the first anchor element within an element with the class 'card-body' to the console.
    console.log(await page.locator(".card-body a").nth(1).textContent()); // This will also print the text content of the first anchor element within an element with the class 'card-body' to the console. The nth(0) method is used to select the first element in the list of matching elements, which is equivalent to using .first().
    //=======NOTE : Both the lines 44 & 45 will give the same result, but the line 34 is more concise and easier to read. The line 35 uses the nth() method to select the first element in the list of matching elements, which is less straightforward than using the .first() method. Therefore, it is generally recommended to use the more concise and readable approach shown in line 34.=======

});



// ============================================================================
// METHOD 2: Using the Default Page Fixture (The standard, everyday approach)
// ============================================================================
test('Default Page Fixture Test', async ({ page }) => {
    
    // Playwright is smart: by passing { page } into the function, it automatically 
    // creates the Browser and Context for us behind the scenes!

    //test.only() is a method provided by Playwright's test runner that allows you to run only a specific test or a group of tests. 
    // When you use test.only(), it will ignore all other tests in the file and execute only the test(s) marked with .only(). 
    // This is useful for debugging or when you want to focus on a particular test without running the entire test suite.
    
    // WHY use this method? This is the fastest and cleanest way to write 95% of your tests 
    // when you don't need any special browser setups or custom cookies.
    await page.goto('https://google.com');
    console.log(await page.title()); // This will print the title of the page to the console.
    await expect(page).toHaveTitle('Google'); // This is an assertion to check if the page title is 'Google'. If not, the test will fail.

});



//javascript is asynchronous, it means that the code will not wait for the previous line to finish before moving on to the next line. This can lead to unexpected behavior if you are not careful. To handle this, you can use async/await syntax to make your code more readable and easier to understand.

    // To use async/await, you need to declare your test function as async. This allows you to use the await keyword inside the function to wait for asynchronous operations to complete before moving on to the next line of code.

 // This is a basic test case in Playwright. You can add your test steps inside the function. For example, you can navigate to a webpage, interact with elements, and make assertions.

 // By default Playwiwright won't run the tests in browsers, instead it will run the tests in a headless mode. 
 // If you want to see the browser in action, you can set the headless option to false in the 
 // Playwright configuration file (playwright.config.js).

 //we can also specify the test to run in browser using this command : npx playwright test --headed

