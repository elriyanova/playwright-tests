import { Page, expect } from '@playwright/test';
import { BASE_URL, USER } from './constants';

export async function login(page: Page, user = USER): Promise<void> {
  await page.goto(`${BASE_URL}/customer/account/login`);
  await page.fill('input#email', user.email);
  await page.fill('input#pass', user.password);

  const acceptBtn = page.locator('#accept-btn');
//   if (await acceptBtn.isVisible()) {
    await acceptBtn.click();
//   }

  await page.click('[class="login-container"] button[type="submit"]');
  await expect(page).toHaveURL(/.*customer\/account/);
}
