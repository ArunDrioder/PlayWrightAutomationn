import { test } from '@playwright/test';

test ('New Locator Types', async ({ page }) => {
    
    await page.goto('https://rahulshettyacademy.com/angularpractice/');
    await page.getByLabel("Check me out if you Love IceCreams!").click(); // This is a way of identifying the elements; based on the labels
    await page.getByLabel("Employed").check();
    await page.getByLabel("Gender").selectOption("Male");



})