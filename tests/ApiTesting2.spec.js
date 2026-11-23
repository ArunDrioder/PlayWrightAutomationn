const { test, expect } = require('@playwright/test');
let webContext;

test.beforeAll(async ({browser})=> {
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto('https://rahulshettyacademy.com/client/#/auth/login'); 
    console.log(await page.title());
    const userEmail =  page.locator('#userEmail');
    const userPassword = page.locator('#userPassword');
    const loginButton = page.locator("#login");
    await userEmail.fill("thecoolbeautybujjy@gmail.com");
    await userPassword.fill("Arun@!234");
    await loginButton.click();
    await page.waitForLoadState('networkidle');
    await context.storageState({path: 'state.json'});
    await browser.newContext({storageState: 'state.json'});
    webContext = await browser.newContext({storageState: 'state.json'});
})



test ('End-to-End Test', async () => 
{
    const page = await webContext.newPage();
    
    // const context = await browser.newContext(); 
    

     await page.goto("https://rahulshettyacademy.com/client"); 
    // console.log(await page.title());

    // const registerLink = page.locator('p.login-wrapper-footer-text');
    // const userFirstName =  page.locator('#firstName');
    // const userLastName =  page.locator('#lastName');
    // const userEmail =  page.locator('#userEmail');
    // const userPhoneNumber = page.locator('#userMobile');
    // const maleRadioBtn = page.locator("//input[@value='Male']");
    // const userPassword = page.locator('#userPassword');
    // const userConfirmPassword = page.locator('#confirmPassword');
    // const checkBox = page.locator("//input[@type='checkbox']");
    // const registerButton = page.locator('[name="login"]')
    // const registrationSuccessValidation = page.locator('h1:has-text("Account Created Successfully")');
    // const navToLoginFromReg = page.locator(':text-is("Login")');
    // const loginButton = page.locator("#login");

   


    

    // // console.log(await registerLink.textContent());
    // // console.log(await registerLink.innerText());

    // // await registerLink.click();

    // // await userFirstName.fill("BeautyBujjy")
    // // await userLastName.fill ("Heyya")
    // // await userEmail.fill("thecoolbeautybujjy@gmail.com");
    // // await userPhoneNumber.fill("7402191727");
    // // await maleRadioBtn.click();
    // // await userPassword.fill("Arun@!234");
    // // await userConfirmPassword.fill("Arun@!234");
    // // await checkBox.click();
    // // await registerButton.click();

    // // console.log(await registrationSuccessValidation.textContent());

    // // await navToLoginFromReg.click();
     const products = page.locator(".card-body");
     const productNameToBeAdded = "ZARA COAT 3";
     const singleItemName = page.locator(".card-body b");
     const cartHeaderButton = page.locator("[routerlink*='cart']");

    // await userEmail.fill("thecoolbeautybujjy@gmail.com");
    // await userPassword.fill("Arun@!234");
    // await loginButton.click();
    // await page.waitForLoadState('networkidle'); // This will wait until there are no network connections for at least 500 ms. This is useful to ensure that the page has fully loaded and all network requests have completed before proceeding with the test.
    //const page = await webContext.newPage();
    
    await singleItemName.first().waitFor(); // This will wait until the first element matching the locator is attached to the DOM and has a non-empty text content. This is useful to ensure that the element is fully loaded and ready for interaction before proceeding with the test.
    const allProductTitles = await singleItemName.allTextContents();
    console.log(allProductTitles);
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
await page.locator(':text-is("Checkout")').click();
await page.locator("[placeholder*='Select Country']").pressSequentially("Ind", { delay: 150 });
const countryOptions = page.locator(".ta-results");
await countryOptions.waitFor();
const countryDropDownOptionsCount = await countryOptions.locator("button").count();

for (let i = 0; i < countryDropDownOptionsCount; ++i) {
    if (await countryOptions.locator("button").nth(i).textContent() === " India") {

        console.log("India found in the dropdown.., selecting it...");
        await countryOptions.locator("button").nth(i).click();
        break;
    }
}

expect (page.locator(".user__name [type ='text']").first()).toHaveText("thecoolbeautybujjy@gmail.com"); // This is an assertion to check if the first element with the class 'user__name' that contains an input field of type 'text' has the text content 'thecoolbeautybujjy@gmail.com'
await page.locator(".form__cc [type = 'text']").nth(1).fill("671");
page.locator(".form__cc [type = 'text']").nth(2).fill("Arun");
await page.locator(".action__submit").click(); // This will click the element with the class 'action__submit', which is likely a button to submit the order. You can use this locator to interact with the submit button later in your test, such as checking its visibility or clicking on it.

expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. "); // This is an assertion to check if the element with the class 'hero-primary' has the text content 'Thank you for the order.'. If it does not have this text, the test will fail. This is likely used to verify that the order was successfully placed and the confirmation message is displayed on the page.
// await console.log("Order placed successfully., the Order ID is:");
// await console.log(await page.locator(".ng-star-inserted").nth(2).textContent());   // This will print the text content of the third element with the class 'ng-star-in

const orderId = await page.locator(".em-spacer-1 .ng-star-inserted").textContent(); // This will wait until the element with the class 'em-spacer-1' and 'ng-star-inserted' is attached to the DOM and has a non-empty text content. This is useful to ensure that the order confirmation page has fully loaded and the order ID is available before proceeding with the test.

await console.log(orderId);

await page.locator('button:has-text("ORDERS")').click(); // This will click the button that contains the text 'ORDERS', which is likely a button to navigate to the orders page. You can use this locator to interact with the orders button later in your test, such as checking its visibility or clicking on it.
await page.locator("tbody").waitFor();

const ordersTableRows = await page.locator("tbody tr");

for (let i = 0; i < await ordersTableRows.count(); ++i) {

    const allRowOrderIds = await ordersTableRows.nth(i).locator("th").textContent(); // This will retrieve the text content of the 'th' element within the current row of the orders table, which is likely the order ID for that row. This is used to compare with the previously extracted order ID to find the matching order in the orders table.

    if(orderId.includes(allRowOrderIds))
    {
        await ordersTableRows.nth(i).locator("button").first().click(); // This will click the first button within the current row of the orders table, which is likely a button to view the details of that order. This is used to navigate to the order details page for the matching order ID.
        break;

    }
}

const orderDetails = await page.locator(".col-text").textContent();
expect (orderId.includes(orderDetails)).toBeTruthy(); // This is an assertion to check if the order ID extracted from the order confirmation page includes the text content of the element with the class 'col-text' on the order details page. If it does not include this text, the test will fail. This is likely used to verify that the correct order details are displayed for the order that was placed.

await page.pause(); // This will pause the test execution and open the Playwright Inspector, allowing you to interact with the page and debug your test. You can resume the test execution from the Inspector once you have finished debugging.

})

test ('Second Test', async () => 
{
    const page = await webContext.newPage();
    
    // const context = await browser.newContext(); 
    

     await page.goto("https://rahulshettyacademy.com/client"); 
     console.log(await page.title());
     await page.pause();

    

})

test ('Third Test', async () => 
{
    const page = await webContext.newPage();
    
    // const context = await browser.newContext(); 
    

     await page.goto("https://rahulshettyacademy.com/client"); 
     await page.waitForLoadState('networkidle');
     console.log(await page.title());
     await page.pause();

    

})