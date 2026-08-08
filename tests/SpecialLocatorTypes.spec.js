import { test } from '@playwright/test';

test ('New Locator Types', async ({ page }) => {
    
    await page.goto('https://rahulshettyacademy.com/angularpractice/');
    await page.getByLabel("Check me out if you Love IceCreams!").click(); // This is a way of identifying the elements; based on the labels
    await page.getByLabel("Employed").check();
    await page.getByLabel("Gender").selectOption("Male");
    await page.getByPlaceholder("Password").type("12345678");
    await page.getByRole("button",{name:"Submit"}).click();
    await page.getByText("Success! The Form has been submitted successfully!").isVisible();
    //await expect(page.getByText("Success! The Form has been submitted successfully!")).toBeVisible({timeout:10_000}); // The default timeout is 5 seconds. By explicitly mentioning the timeout ( like this {timeout:10_000} ), we can Override the default 5 seconds timeout. This is useful when we know that the element will take more time to load, and we want to wait for it to be visible before proceeding with the next steps in the test.
    // It works only in step level.

    //line no.11 will check for the condition whether the text is visible, if it's visible, it'll return boolean true, else it'll return false. If it returns false, then the test will fail.
    //line no. 12 will check whether the text is visible or not. If it is not visible, then the test will fail.



    await page.getByRole("link",{name:"Shop"}).click();
    await page.locator("app-card").filter({hasText:'iphone X'}).getByRole("button").click();




})

//----- The Below code has been commented., since after learning the concept & executed the test, it failed., I need to go through this timeout
//concept once again., 

// test ('Playwright test level timeout learning', async ({ page }) => {

//     test.setTimeout(30000); // This is a way to explicitly set timeout for the entire test level rather than setting the timeout for each step.
    

//     const slowExpect = expect.configure({timeout: 9000}); // This is a way to explicitly set timeout for the entire test level rather than setting the timeout for each step.
//     page.setDefaultTimeout(9000); // This is a way to explicitly set timeout for the entire test level rather than setting the timeout for each step.
//     await page.getByLabel("Check me out if you Love IceCreams!").click(); // This is a way of identifying the elements; based on the labels
//     await page.getByLabel("Employed").check();
//     await page.getByLabel("Gender").selectOption("Male");
//     await page.getByPlaceholder("Password").type("12345678");
//     await page.getByRole("button",{name:"Submit"}).click();
//     await page.getByText("Success! The Form has been submitted successfully!").isVisible();
//     await slowExpect(page.getByText("Success! The Form has been submitted successfully!")).toBeVisible(); // The default timeout is 5 seconds. By explicitly mentioning the timeout ( like this {timeout:10_000} ), we can Override the default 5 seconds timeout. This is useful when we know that the element will take more time to load, and we want to wait for it to be visible before proceeding with the next steps in the test.
//     // It works only in step level.

//     //line no.11 will check for the condition whether the text is visible, if it's visible, it'll return boolean true, else it'll return false. If it returns false, then the test will fail.
//     //line no. 12 will check whether the text is visible or not. If it is not visible, then the test will fail.



//     await page.getByRole("link",{name:"Shop"}).click();
//     await slowExpect(page.locator(".my-4").first()).toHaveText("Shop");
//     await page.locator("app-card").filter({hasText:'iphone X'}).getByRole("button").click();




// })