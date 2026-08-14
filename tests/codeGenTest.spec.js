import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://rahulshettyacademy.com/angularpractice/');
  await page.locator('form input[name="name"]').click();
  await page.locator('form input[name="name"]').fill('Arunprasadh.S');
  await page.locator('form input[name="name"]').press('Tab');
  await page.locator('input[name="email"]').fill('arunprasadh.s@gmail.com');
  await page.locator('input[name="email"]').press('Tab');
  await page.getByRole('textbox', { name: 'Password' }).fill('Arun@!234');
  await page.getByRole('checkbox', { name: 'Check me out if you Love' }).check();
  await page.getByRole('radio', { name: 'Employed' }).check();
  await page.locator('input[name="bday"]').fill('1993-12-20');
  await page.getByRole('button', { name: 'Submit' }).click();
  await expect(page.getByText('× Success! The Form has been')).toBeVisible();
});