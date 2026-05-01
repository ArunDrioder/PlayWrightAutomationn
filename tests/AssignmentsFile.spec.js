const { test, expect } = require('@playwright/test');

test ('Register & login Playwright Test', async ({ browser }) => {
    
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


    const singleItemName = page.locator(".card-body b");

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

    await userEmail.fill("thecoolbeautybujjy@gmail.com");
    await userPassword.fill("Arun@!234");
    await loginButton.click();
    
     //await page.waitForLoadState('networkidle'); // This will wait until there are no network connections for at least 500 ms. This is useful to ensure that the page has fully loaded and all network requests have completed before proceeding with the test.
     await singleItemName.first().waitFor(); // This will wait until the first element matching the locator is attached to the DOM and has a non-empty text content. This is useful to ensure that the element is fully loaded and ready for interaction before proceeding with the test.
     const allProductTitles = await singleItemName.allTextContents();
     console.log(allProductTitles);

});