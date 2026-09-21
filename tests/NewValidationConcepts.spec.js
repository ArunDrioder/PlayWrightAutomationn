import { test, expect } from '@playwright/test';

test("Popup Validations", async ({page})=>
    

    {
        await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
         await page.waitForLoadState('networkidle');
        // await page.goto("https://www.google.com/");
        // await page.goBack();
        // await page.goForward();

        // await expect(page.locator("#displayed-text")).toBeVisible();
        // await page.waitForLoadState('networkidle');
        // await page.locator("#hide-textbox").click();
        // await expect(page.locator("#displayed-text")).toBeHidden();

        //Alert popups handling
        
        await page.locator("#alertbtn").click();
        page.on('dialog', dialog => dialog.accept());
        await page.locator("#confirmbtn").click();
        page.on('dialog', dialog => dialog.dismiss());
        await page.locator("#mousehover").hover();


        //Handling frames

        const pageFrameLocator = page.frameLocator("#courses-iframe");
        await pageFrameLocator.locator("li a[href*='lifetime-access']:visible").click();
        const textCheck = await pageFrameLocator.locator(".text h2").textContent();
        console.log(textCheck.split(" ")[1]);

        //We've completed this code., but we didn't executed it., since at the time of completing this part., the iFrames were not loaded.




})