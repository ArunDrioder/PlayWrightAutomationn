const {test, expect, request} = require('@playwright/test');
const loginPayload = {userEmail: "thecoolbeautybujjy@gmail.com", userPassword: "Arun@!234"}
const orderPayload = {"orders":[{country:"India",productOrderedId:"6960eae1c941646b7a8b3ed3"}]}
let token;
let orderId;

test.beforeAll(async ()=>
{
    const apiContext = await request.newContext();
    const loginResponse = await apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login", 

        {
            data: loginPayload
        })  
        
        expect(loginResponse.ok()).toBeTruthy();
        const loginResponseJson = await loginResponse.json();
         token = loginResponseJson.token;
        console.log("The token is: "+" "+token)

        const orderResponse = await apiContext.post("https://rahulshettyacademy.com/api/ecom/order/create-order",
            {
                data: orderPayload,
                headers: {
                    'Authorization' : token,
                    'Content-Type': 'application/json'
                },

            })

            expect(orderResponse.ok()).toBeTruthy();
            const orderResponseJson = await orderResponse.json();
            console.log("The Order response is:\n" + JSON.stringify(orderResponseJson, null, 2));
            orderId = orderResponseJson.orders[0];

});


test.beforeEach(()=>
{



})


test.only ('End-to-End Test', async ({ browser }) => {
    
    const context = await browser.newContext(); 
    const page = await context.newPage(); 

    //await page.goto('https://rahulshettyacademy.com/client/#/auth/login'); 
    // console.log(await page.title());

    // const userEmail =  page.locator('#userEmail');
    // const userPassword = page.locator('#userPassword');
    // const loginButton = page.locator("#login");

    await page.addInitScript(value =>{

        window.localStorage.setItem('token', value);
    }, token);


    await page.goto("https://rahulshettyacademy.com/client/");

    //  const products = page.locator(".card-body");
    //  const productNameToBeAdded = "ZARA COAT 3";
//      const singleItemName = page.locator(".card-body b");
//      const cartHeaderButton = page.locator("[routerlink*='cart']");

//     // await userEmail.fill("thecoolbeautybujjy@gmail.com");
//     // await userPassword.fill("Arun@!234");
//     // await loginButton.click();
//     // await page.waitForLoadState('networkidle'); // This will wait until there are no network connections for at least 500 ms. This is useful to ensure that the page has fully loaded and all network requests have completed before proceeding with the test.
//     // await singleItemName.first().waitFor(); // This will wait until the first element matching the locator is attached to the DOM and has a non-empty text content. This is useful to ensure that the element is fully loaded and ready for interaction before proceeding with the test.
    
   
//     const actualProductCount = await products.count();
//     await console.log("Total number of products available in the page : " + actualProductCount);
//     await console.log("Now going to iterate through the products to find the desired product and add it to the cart...");

//     for (let i = 0; i < actualProductCount; ++i) {
//         if( await products.nth(i).locator("b").textContent() === productNameToBeAdded ) {
//             await console.log("Product found., adding it to the cart...");
//             await products.nth(i).locator("text= Add To Cart").click();
//             await console.log("Product added to the cart successfully!");
//             break;
            
//         }
// }
// // await cartHeaderButton.click();
// // await page.locator("div li").first().waitFor(); // This will wait until at least one element matching the locator is attached to the DOM and has a non-empty text content. This is useful to ensure that the cart page has fully loaded and the list items are ready for interaction before proceeding with the test.
// // const bool = await page.locator("h3:has-text('ZARA COAT 3')").isVisible(); // This will check if the element with the tag name 'h3' that contains the text 'ZARA COAT 3' is visible on the page. If it is not visible, the test will fail. This is likely used to verify that the product was successfully added to the cart and is now visible in the cart page.
// // expect(bool).toBeTruthy(); // This is an assertion to check if the boolean value stored in the variable bool is true. If it is not true, the test will fail. This is likely used to confirm that the product 'ZARA COAT 3' is indeed visible in the cart page after being added.    
// // await page.locator(':text-is("Checkout")').click();
// // await page.locator("[placeholder*='Select Country']").pressSequentially("Ind", { delay: 150 });
// // const countryOptions = page.locator(".ta-results");
// // await countryOptions.waitFor();
// // const countryDropDownOptionsCount = await countryOptions.locator("button").count();

// // for (let i = 0; i < countryDropDownOptionsCount; ++i) {
// //     if (await countryOptions.locator("button").nth(i).textContent() === " India") {

// //         console.log("India found in the dropdown.., selecting it...");
// //         await countryOptions.locator("button").nth(i).click();
// //         break;
// //     }
// // }

// // expect (page.locator(".user__name [type ='text']").first()).toHaveText("thecoolbeautybujjy@gmail.com"); // This is an assertion to check if the first element with the class 'user__name' that contains an input field of type 'text' has the text content 'thecoolbeautybujjy@gmail.com'
// // await page.locator(".form__cc [type = 'text']").nth(1).fill("671");
// // page.locator(".form__cc [type = 'text']").nth(2).fill("Arun");
// // await page.locator(".action__submit").click(); // This will click the element with the class 'action__submit', which is likely a button to submit the order. You can use this locator to interact with the submit button later in your test, such as checking its visibility or clicking on it.

// // expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. "); // This is an assertion to check if the element with the class 'hero-primary' has the text content 'Thank you for the order.'. If it does not have this text, the test will fail. This is likely used to verify that the order was successfully placed and the confirmation message is displayed on the page.
// // // await console.log("Order placed successfully., the Order ID is:");
// // // await console.log(await page.locator(".ng-star-inserted").nth(2).textContent());   // This will print the text content of the third element with the class 'ng-star-in

// const orderId = await page.locator(".em-spacer-1 .ng-star-inserted").textContent(); // This will wait until the element with the class 'em-spacer-1' and 'ng-star-inserted' is attached to the DOM and has a non-empty text content. This is useful to ensure that the order confirmation page has fully loaded and the order ID is available before proceeding with the test.

// await console.log(orderId);

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
await page.pause();
expect (orderId.includes(orderDetails)).toBeTruthy(); // This is an assertion to check if the order ID extracted from the order confirmation page includes the text content of the element with the class 'col-text' on the order details page. If it does not include this text, the test will fail. This is likely used to verify that the correct order details are displayed for the order that was placed.

//await page.pause(); // This will pause the test execution and open the Playwright Inspector, allowing you to interact with the page and debug your test. You can resume the test execution from the Inspector once you have finished debugging.

})