const {test, expect} = require('@playwright/test'); // This is the new way to import test and expect in Playwright 1.30.0 and later versions
const { text } = require('node:stream/consumers');

// ============================================================================
// METHOD 1: Creating a Custom Browser Context (Used for advanced scenarios)
// ============================================================================
test ('Browser Context Playwright Test', async ({ browser }) => {
    
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
    const cardTitle = page.locator(".card-body a"); // This will create a locator for all anchor elements within an element with the class 'card-body'. You can use this locator to interact with the elements later in your test, such as checking their text content or clicking on them.
    const dropDown = page.locator("select.form-control"); // This will create a locator for the select element with the class 'form-control'. You can use this locator to interact with the dropdown menu later in your test, such as selecting an option or checking its value.


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
    // console.log(await cardTitle.first().textContent()); // This will print the text content of the first anchor element within an element with the class 'card-body' to the console.
    // console.log(await cardTitle.nth(1).textContent());

  console.log(await cardTitle.first().textContent()); // This will print the text content of the first anchor element within an element with the class 'card-body' to the console.
 console.log(await cardTitle.nth(1).textContent());

    const allProductTitle = await cardTitle.allTextContents();
    console.log(allProductTitle); // This will also print the text content of the first anchor element within an element with the class 'card-body' to the console. The nth(0) method is used to select the first element in the list of matching elements, which is equivalent to using .first().
    //=======NOTE : Both the lines 44 & 45 will give the same result, but the line 34 is more concise and easier to read. The line 35 uses the nth() method to select the first element in the list of matching elements, which is less straightforward than using the .first() method. Therefore, it is generally recommended to use the more concise and readable approach shown in line 34.=======

    // if we commented the line 45 & 46., the test will pass, but will not print any products name., bcoz., the textContent() will wait until the firstProduct is completely
    //loaded into the webPage., (i.,e until it gets attached to the DOM)., eventhough it gets message as no element exception, this method in playwright will still wait for 30secs
    //for the element (i.e, the 1st element to be )
    // but allTextContents() method won't wait, since this method will return the array of elements., it will not know whether the array contains 1 single element or many 
    //number of elements.., so allTextContents() will still pass., but it will simply return the empty array., there won't be any values
    //inside it., 

});



// ============================================================================
// METHOD 2: Using the Default Page Fixture (The standard, everyday approach)
// ============================================================================
test ('UI Controls', async ({ page }) => {

    const userName = page.locator('#username'); // This will create a locator for the input field with the id 'username'. You can use this locator to interact with the element later in your test.
    const password = page.locator("[type='password']"); // This will create a locator for the input field with the type 'password'. You can use this locator to interact with the element later in your test.
    const signInButton = page.locator("[type='submit']");
    const dropDown = page.locator("select.form-control"); // This will create a locator for the select element with the class 'form-control'. You can use this locator to interact with the dropdown menu later in your test.
    const  radioButton = page.locator(".radiotextsty"); // This will create a locator for the element with the class 'radiotextsty'. You can use this locator to interact with the radio button later in your test, such as checking its state or clicking on it.
    const webPopUp = page.locator("#okayBtn"); // This will create a locator for the element with the class 'modal-content'. You can use this locator to interact with the web popup later in your test, such as checking its visibility or clicking on elements within it.
    const tAndC = page.locator("#terms"); // This will create a locator for the element with the id 'terms'. You can use this locator to interact with the terms and conditions checkbox later in your test, such as checking its state or clicking on it.
    const documentLink = page.locator("a[href*='documents-request']"); // This will create a locator for the anchor element with an href attribute that contains 'documents-request'. You can use this locator to interact with the document request link later in your test, such as checking its visibility or clicking on it. 

    
    // Playwright is smart: by passing { page } into the function, it automatically 
    // creates the Browser and Context for us behind the scenes!

    //test.only() is a method provided by Playwright's test runner that allows you to run only a specific test or a group of tests. 
    // When you use test.only(), it will ignore all other tests in the file and execute only the test(s) marked with .only(). 
    // This is useful for debugging or when you want to focus on a particular test without running the entire test suite.
    
    // WHY use this method? This is the fastest and cleanest way to write 95% of your tests 
    // when you don't need any special browser setups or custom cookies.
    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
    await userName.fill("rahulshetty");
    await password.fill("Learning@830$3mK2");
    await dropDown.selectOption("consult"); // This will select the option with the value 'consult' from the dropdown menu with the class 'form-control'.
    await radioButton.last().click(); // This will click the last element with the class 'radiotextsty', which is likely a radio button. You can use this locator to interact with the radio button later in your test, such as checking its state or clicking on it.
    await webPopUp.click(); // This will click the element with the id 'okayBtn', which is likely a button within a web popup. You can use this locator to interact with the web popup later in your test, such as checking its visibility or clicking on elements within it.
    console.log(await radioButton.last().isChecked()); // This will print the text content of the last element with the class 'radiotextsty' to the console. This is likely used to verify the label or description associated with the radio button that was clicked in the previous step.
   await expect (radioButton.last()).toBeChecked(); // This is an assertion to check if the last element with the class 'radiotextsty' (which is likely a radio button) is checked. If it is not checked, the test will fail.
   await tAndC.click(); // This will check the checkbox with the id 'terms'. You can use this locator to interact with the terms and conditions checkbox later in your test, such as checking its state or clicking on it.
   expect(await tAndC.isChecked()).toBeTruthy(); // This is an assertion to check if the checkbox with the id 'terms' is checked. If it is not checked, the test will fail.
   await tAndC.uncheck(); // This will uncheck the checkbox with the id 'terms'. You can use this locator to interact with the terms and conditions checkbox later in your test, such as checking its state or clicking on it.
   expect(await tAndC.isChecked()).toBeFalsy(); // This is another way to assert that the checkbox with the id 'terms' is not checked. The isChecked() method returns a boolean value, and toBeFalsy() checks if that value is false. If the checkbox is checked, the test will fail.
    //await page.pause(); // This will pause the test execution and open the Playwright Inspector, allowing you to interact with the page and debug your test. You can resume the test execution from the Inspector once you have finished debugging.
    await expect(documentLink).toHaveAttribute("class","blinkingText") // This is an assertion to check if the anchor element with an href attribute that contains 'documents-request' is visible on the page. If it is not visible, the test will fail.




    //NOTE : In some cases, the await keyword will come before the locatots & in some places, it'll be there after the expect keyword., 
    
    //  for eg : await expect (radioButton.last()).toBeChecked(); // Here, the await keyword is used before the expect function, bcoz the action is performed outside the bracket;
    // but in this case : expect(await tAndC.isChecked()).toBeTruthy(); // Here, the await keyword is used inside the expect function, bcoz the action is performed inside the bracket;
//javascript is asynchronous, it means that the code will not wait for the previous line to finish before moving on to the next line. This can lead to unexpected behavior if you are not careful. To handle this, you can use async/await syntax to make your code more readable and easier to understand.

    // To use async/await, you need to declare your test function as async. This allows you to use the await keyword inside the function to wait for asynchronous operations to complete before moving on to the next line of code.

 // This is a basic test case in Playwright. You can add your test steps inside the function. For example, you can navigate to a webpage, interact with elements, and make assertions.

 // By default Playwiwright won't run the tests in browsers, instead it will run the tests in a headless mode. 
 // If you want to see the browser in action, you can set the headless option to false in the 
 // Playwright configuration file (playwright.config.js).

 //we can also specify the test to run in browser using this command : npx playwright test --headed
})

test ('Child Window handling', async ({ browser }) => {

    const context = await browser.newContext();
    const page = await context.newPage();


    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
    const docLink = page.locator("[href*='documents-request']");
    const [newPage] =  await Promise.all(
        
[  
            
    context.waitForEvent('page'), // This will wait for a new page to be opened as a result of clicking the document link. The waitForEvent('page') method listens for the 'page' event, which is triggered when a new page is opened in the browser context. Once the new page is opened, it will be assigned to the variable newpage, allowing you to interact with it in your test.

    docLink.click(),

]) // This will click the anchor element with an href attribute that contains 'documents-request', which is likely a link that opens a new page. You can use this locator to interact with the document request link later in your test, such as checking its visibility or clicking on it.

 const newWindowText = await newPage.locator(".red").textContent(); // This will create a locator for the element with the class 'red' on the new page that was opened as a result of clicking the document link. The textContent() method will retrieve the text content of that element and assign it to the variable newWindowText.

 const extractedText = newWindowText.split("@"); // This will split the text content of the element with the class 'red' on the new page at the "@" character, and then take the second part of the split (which is likely an email address) and trim any leading or trailing whitespace from it. This is likely used to extract the email address from the text content for further verification or use in the test.
 const expectedText =  extractedText[1].split(" ")[0]; // This will split the second part of the previously extracted text at the first occurrence of a space character and take the first part of that split, which is likely the email address without any additional text. This is likely used to further refine the extracted email address for verification or use in the test.

await page.locator("#username").fill(expectedText); // This will fill the input field with the id 'username' on the original page with the expected text that was extracted from the new page. This is likely used to verify that the extracted email address can be successfully entered into the username field on the original page.
console.log(await page.locator("#username").inputValue()); // This will print the text content of the input field with the id 'username' on the original page to the console. This is likely used to verify that the expected text was successfully entered into the username field.

})


test.only ('End-to-End Test', async ({ browser }) => {
    
    const context = await browser.newContext(); 
    const page = await context.newPage(); 

    await page.goto('https://rahulshettyacademy.com/client/#/auth/login'); 
    console.log(await page.title());

    const registerLink = page.locator('p.login-wrapper-footer-text');
    const userFirstName =  page.locator('#firstName');
    const userLastName =  page.locator('#lastName');
    const userEmail =  page.locator('#userEmail');
    const userPhoneNumber = page.locator('#userMobile');
    const maleRadioBtn = page.locator("//input[@value='Male']");
    const userPassword = page.locator('#userPassword');
    const userConfirmPassword = page.locator('#confirmPassword');
    const checkBox = page.locator("//input[@type='checkbox']");
    const registerButton = page.locator('[name="login"]')
    const registrationSuccessValidation = page.locator('h1:has-text("Account Created Successfully")');
    const navToLoginFromReg = page.locator(':text-is("Login")');
    const loginButton = page.locator("#login");

   


    

    // console.log(await registerLink.textContent());
    // console.log(await registerLink.innerText());

    // await registerLink.click();

    // await userFirstName.fill("BeautyBujjy")
    // await userLastName.fill ("Heyya")
    // await userEmail.fill("thecoolbeautybujjy@gmail.com");
    // await userPhoneNumber.fill("7402191727");
    // await maleRadioBtn.click();
    // await userPassword.fill("Arun@!234");
    // await userConfirmPassword.fill("Arun@!234");
    // await checkBox.click();
    // await registerButton.click();

    // console.log(await registrationSuccessValidation.textContent());

    // await navToLoginFromReg.click();
     const products = page.locator(".card-body");
     const productNameToBeAdded = "ZARA COAT 3";
     const singleItemName = page.locator(".card-body b");
     const cartHeaderButton = page.locator("[routerlink*='cart']");

    await userEmail.fill("thecoolbeautybujjy@gmail.com");
    await userPassword.fill("Arun@!234");
    await loginButton.click();
    await page.waitForLoadState('networkidle'); // This will wait until there are no network connections for at least 500 ms. This is useful to ensure that the page has fully loaded and all network requests have completed before proceeding with the test.
    await singleItemName.first().waitFor(); // This will wait until the first element matching the locator is attached to the DOM and has a non-empty text content. This is useful to ensure that the element is fully loaded and ready for interaction before proceeding with the test.
    const allProductTitles = await singleItemName.allTextContents();
    //console.log(allProductTitles);
    const actualProductCount = await products.count();
    await console.log("Total number of products available in the page : " + actualProductCount);
    await console.log("Now going to iterate through the products to find the desired product and add it to the cart...");

    for (let i = 0; i < actualProductCount; ++i) {
        if( await products.nth(i).locator("b").textContent() === productNameToBeAdded ) {
            await console.log("Product found., adding it to the cart...");
            await products.nth(i).locator("text= Add To Cart").click();
            await console.log("Product added to the cart successfully!");
            break;
            
        }
}
await cartHeaderButton.click();
await page.locator("div li").first().waitFor(); // This will wait until at least one element matching the locator is attached to the DOM and has a non-empty text content. This is useful to ensure that the cart page has fully loaded and the list items are ready for interaction before proceeding with the test.
const bool = await page.locator("h3:has-text('ZARA COAT 3')").isVisible(); // This will check if the element with the tag name 'h3' that contains the text 'ZARA COAT 3' is visible on the page. If it is not visible, the test will fail. This is likely used to verify that the product was successfully added to the cart and is now visible in the cart page.
expect(bool).toBeTruthy(); // This is an assertion to check if the boolean value stored in the variable bool is true. If it is not true, the test will fail. This is likely used to confirm that the product 'ZARA COAT 3' is indeed visible in the cart page after being added.    

})
