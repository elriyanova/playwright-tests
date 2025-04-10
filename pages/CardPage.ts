// src/pages/cart.page.ts
import { Page } from '@playwright/test';

export class CartPage {
  constructor(private page: Page) {}

  // Locators
  itemNameInCart = '#shopping-cart-table [class="product-item-name"] a[href]';
  proceedToCheckoutButton = 'button[data-role="proceed-to-checkout"]';
  grandTotal = '[class="grand totals"]';
  checkoutShippingMethod = "#checkout-shipping-method-load #label_carrier_flatrate_flatrate";

  // Actions
  async getItemNameInCart() {
    return await this.page.locator(this.itemNameInCart).first().innerText();
  }

  async proceedToCheckout() {
    await this.page.locator(this.proceedToCheckoutButton).click();
  }

  async verifyGrandTotalVisible() {
    await this.page.locator(this.grandTotal).waitFor({ state: 'visible' });
  }

  async verifyFeeInfoIsVisible() {
    await this.page.locator(this.checkoutShippingMethod).waitFor({ state: 'visible' });
    //there could be more items in card, so the fee will be different (mutiply in depends of item count)
    //skipped the price checking, ideally need to remove all items via API before test run
  }
}
