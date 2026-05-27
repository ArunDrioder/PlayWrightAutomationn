import { test } from '@playwright/test';

test ('New Locator Types', async ({ page }) => {
    
    await page.goto('https://rahulshettyacademy.com/angularpractice/');
    await page.getByLabel("Check me out if you Love IceCreams!").click(); // This is a way of identifying the elements; based on the labels
    await page.getByLabel("Employed").check();
    await page.getByLabel("Gender").selectOption("Male");
    await page.getByPlaceholder("Password").type("12345678");
    await page.getByRole("button",{name:"Submit"}).click();
    await page.getByText("Success! The Form has been submitted successfully!").isVisible();
    await page.getByRole("link",{name:"Shop"}).click();
    await page.locator("app-card").filter({hasText:'iphone X'}).getByRole("button").click();




})