// src/pages/search.page.ts
import { Page } from '@playwright/test';

export class SearchPage {
  constructor(private page: Page) {}

  // Locators
  searchInput = 'input#search';
  resultItems = "//dl[contains(@class, 'block')]//a";

  // Actions
  async performSearch(searchItem: string) {
    await this.page.fill(this.searchInput, searchItem);
    await this.page.press(this.searchInput, 'Enter');
  }

  async getResultCount() {
    const result = this.page.locator(this.resultItems);
    await result.first().waitFor({ state: 'visible' });
    return await result.count();
  }

  async getSuggestionText(index: number) {
    const result = this.page.locator(this.resultItems);
    return await result.nth(index).innerText();
  }
}
