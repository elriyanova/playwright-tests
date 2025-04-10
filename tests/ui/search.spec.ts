// tests/search.spec.ts
import { test, expect } from '@playwright/test';
import { login } from '../../utils/login';
import { SearchPage } from '../../pages/SearchPage';

let searchPage: SearchPage;

test.beforeEach(async ({ page }) => {
  await login(page);
  searchPage = new SearchPage(page);
});

test('Verify search returns valid results with valid input value', async ({ page }) => {
  const searchItem = 'top';

  await searchPage.performSearch(searchItem);
  const resultCount = await searchPage.getResultCount();
  expect(resultCount).toBeGreaterThan(0);

  for (let i = 0; i < resultCount; i++) {
    const suggestionText = await searchPage.getSuggestionText(i);
    expect(suggestionText.toLowerCase()).toContain(searchItem);
  }
});

test('Verify search returns valid message with invalid input value', async ({ page }) => {
  const invalidItem = 'invalidItem';

  await searchPage.performSearch(invalidItem);
  const noResultMessage = page.locator('div.message.notice >> text=Your search returned no results.');
  await expect(noResultMessage).toBeVisible();
});

test('Verify results dynamically update after input value changed', async ({ page }) => {
  const searchItem = 'top';
  const updatedItem = 'jacket';

  await searchPage.performSearch(searchItem);
  // const resultCount = await searchPage.getResultCount();
  // expect(resultCount).toBeGreaterThan(0);

  // for (let i = 0; i < resultCount; i++) {
  //   const suggestionText = await searchPage.getSuggestionText(i);
  //   expect(suggestionText.toLowerCase()).toContain(searchItem);
  // }

  await searchPage.performSearch(updatedItem);
  const updatedResultCount = await searchPage.getResultCount();
  expect(updatedResultCount).toBeGreaterThan(0);

  for (let i = 0; i < updatedResultCount; i++) {
    const suggestionText = await searchPage.getSuggestionText(i);
    expect(suggestionText.toLowerCase()).toContain(updatedItem);
  }
});
