const {test, expect, request} = require('@playwright/test');
const {ApiUtils} = require('./utils/ApiUtils');
const loginPayload = {userEmail: "thecoolbeautybujjy@gmail.com", userPassword: "Arun@!234"}
const orderPayload = {"orders":[{country:"India",productOrderedId:"6960eae1c941646b7a8b3ed3"}]}
const fakePayLoadOrders = {data:[], message:"No Orders"};
let response;

test.beforeAll(async ()=>
{
    const apiContext = await request.newContext();
    const apiUtils = new ApiUtils(apiContext,loginPayload);
     response =  await apiUtils.createOrder(orderPayload);
});





test.only ('End-to-End Test', async ({ browser }) => {
    
    const context = await browser.newContext(); 
    const page = await context.newPage(); 


    await page.addInitScript(value =>{

        window.localStorage.setItem('token', value);
    }, response.token);


    await page.goto("https://rahulshettyacademy.com/client/");
   await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*",// This will intercept the network request made to the specified URL pattern. The asterisk (*) acts as a wildcard, allowing the interception of requests with any customer ID in the URL. You can use this to mock or modify the response for testing purposes.
    async route=>
    {
        //Here we are intercepting the request and mocking the response with our own data. This is useful for testing how the application behaves with specific data without relying on the actual backend service.
        const fetchedResponse = await page.request.fetch(route.request());
        let body = JSON.stringify(fakePayLoadOrders);
        route.fulfill(
            {
                fetchedResponse,
                body,
            }
        );

    }
);

await page.locator('button:has-text("ORDERS")').click(); // This will click the button that contains the text 'ORDERS', which is likely a button to navigate to the orders page. You can use this locator to interact with the orders button later in your test, such as checking its visibility or clicking on it.
await page.waitForResponse("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*")
console.log(await page.locator(".mt-4").textContent()); // This will log the text content of the element with the class 'mt-4', which is likely a message displayed on the orders page. You can use this to verify that the correct message is displayed when there are no orders for the customer.
//await page.locator("tbody").waitFor();

//const ordersTableRows = await page.locator("tbody tr");
})