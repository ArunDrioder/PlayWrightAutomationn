import { expect, test } from '@playwright/test';

test ('New Locator Types', async ({ page }) => {
    
    await page.goto('https://rahulshettyacademy.com/angularpractice/');
    await page.getByLabel("Check me out if you Love IceCreams!").click(); // This is a way of identifying the elements; based on the labels
    await page.getByLabel("Employed").check();
    await page.getByLabel("Gender").selectOption("Male");
    await page.getByPlaceholder("Password").type("12345678");
    await page.getByRole("button",{name:"Submit"}).click();
    await page.getByText("Success! The Form has been submitted successfully!").isVisible();
    await expect(page.getByText("Success! The Form has been submitted successfully!")).toBeVisible({ timeout: 10_000 });
    //All the expect assertions will wait by default for 5 seconds,
    // By specifying the timeout like this explicitly [{ timeout: 10_000 }], we can override the expect's default 5 seconds timeout., mainly useful
    //when the page takes more time to load the element that we're looking for.
    //---NOTE : This is Step level timeout.,  if incase the application itself is generally slow overall, then it's better to
    //set the override the global expect timeount in the expect block in config.js file
    
    await page.locator("app-card").filter({hasText:'iphone X'}).getByRole("button").click();
})

test ('New test level timeouts', async ({ page }) => {

    const slowExpect=expect.configure({timeout:9000}); // Rather than specifying timeout for each step, we can set the timeout for the entire test level., this is applicable for this entire test
    
    await page.goto('https://rahulshettyacademy.com/angularpractice/');
    await page.getByLabel("Check me out if you Love IceCreams!").click(); // This is a way of identifying the elements; based on the labels
    await page.getByLabel("Employed").check();
    await page.getByLabel("Gender").selectOption("Male");
    await page.getByPlaceholder("Password").type("12345678");
    await page.getByRole("button",{name:"Submit"}).click();
    await page.getByText("Success! The Form has been submitted successfully!").isVisible();
    await slowExpect(page.getByText("Success! The Form has been submitted successfully!")).toBeVisible();
    //All the expect assertions will wait by default for 5 seconds,
    // By specifying the timeout like this explicitly [{ timeout: 10_000 }], we can override the expect's default 5 seconds timeout., mainly useful
    //when the page takes more time to load the element that we're looking for.
    //---NOTE : This is Step level timeout.,  if incase the application itself is generally slow overall, then it's better to
    //set the override the global expect timeount in the expect block in config.js file
    await page.getByRole("link",{name:"Shop"}).click();
    await slowExpect(page.locator(".my-4").first()).toHaveText("Shop Name");
    await page.locator("app-card").filter({hasText:'iphone X'}).getByRole("button").click();
    
})

