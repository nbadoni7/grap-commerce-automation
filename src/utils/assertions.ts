import { expect, type Locator } from "@playwright/test";

/** Assert a locator has visible text (non-empty) */
export async function expectHasText(locator: Locator) {
  await expect(locator).toBeVisible();
  const txt = (await locator.textContent())?.trim();
  expect(txt, "Expected element to have non-empty text").toBeTruthy();
}

/** Assert currency-like value exists (loose check) */
export async function expectLooksLikePrice(locator: Locator) {
  await expect(locator).toBeVisible();
  const txt = (await locator.textContent())?.trim() ?? "";
  // loose: £12.34 or 12.34 etc.
  expect(txt, `Expected a price-like text, got: "${txt}"`).toMatch(/[\d]+([.,]\d{2})?/);
}

/** Assert multiple texts exist somewhere on page */
export async function expectTextsPresent(root: Locator, texts: string[]) {
  for (const t of texts) {
    await expect(root.getByText(t, { exact: false })).toBeVisible();
  }
}