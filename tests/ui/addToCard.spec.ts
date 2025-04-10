// tests/addToCard.spec.ts
import { test, expect } from '@playwright/test';
import { login } from '../../utils/login';
import { SearchPage } from '../../pages/SearchPage';
import { CartPage } from '../../pages/CardPage';

let searchPage: SearchPage;
let cartPage: CartPage;

test.beforeEach(async ({ page }) => {
  await login(page);  // Perform login before each test (ideally should be done via API, done via UI here due to luck of time to resource the login request on the test site)
  searchPage = new SearchPage(page);
  cartPage = new CartPage(page);
});

test('Verify item from search results can be added to shopping cart', async ({ page }) => {
  const searchItem = 'top';

  // Search for the item
  await searchPage.performSearch(searchItem);
  const resultCount = await searchPage.getResultCount();
  expect(resultCount).toBeGreaterThan(0);

  // Click the first found item
  await page.locator('[data-container="product-grid"]').first().click();
  
  // Get the item name
  const itemName = await page.locator('[data-ui-id="page-title-wrapper"]').innerText();

  // Select size and color options
  await page.locator('[attribute-code="size"] [role="option"]').first().click();
  await page.locator('[attribute-code="color"] [role="option"]').first().click();

  // Add to cart
  await page.locator('[class="product-options-bottom"] button[type="submit"]').click();

  // Go to the shopping cart
  await page.locator('#maincontent a[href*="/checkout/cart/"]').click();

  // Verify the item in the cart is the same as selected
  const itemNameInCart = await cartPage.getItemNameInCart();
  expect(itemNameInCart).toBe(itemName);

  // Verify URL
  await expect(page).toHaveURL(/.*checkout\/cart\//);

  // Proceed to checkout
  await cartPage.verifyGrandTotalVisible();
  await cartPage.proceedToCheckout();

  // Verify Fee information on Checkout page is visible
  await cartPage.verifyFeeInfoIsVisible();
});
