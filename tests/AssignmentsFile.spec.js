const { test, expect } = require('@playwright/test');

test.only('Register & login Playwright Test', async ({ browser }) => {
    
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


    console.log(await registerLink.textContent());
    console.log(await registerLink.innerText());

    await registerLink.click();

    await userFirstName.fill("Arunprasadh")
    await userLastName.fill ("SAP")
    await userEmail.fill("validityforhappinessisnull@gmail.com");
    await userPhoneNumber.fill("9788814455");
    await maleRadioBtn.click();
    await userPassword.fill("Arun@!234");
    await userConfirmPassword.fill("Arun@!234");
    await checkBox.click();
    await registerButton.click();

    console.log(await registrationSuccessValidation.textContent());


});