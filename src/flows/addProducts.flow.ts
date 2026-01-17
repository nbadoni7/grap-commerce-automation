import type { Page } from "@playwright/test";
import { WomenPage } from "../pages/WomenPage";
import { ProductPage } from "../pages/ProductPage";
import { testData } from "../config/testData";

export async function addTwoProductsFromWomen(page: Page) {
  const women = new WomenPage(page);
  const pdp = new ProductPage(page);

  await women.assertProductsVisible();

  // 1) Fluffy Maracas
  await women.openFluffyMaracas();
  await pdp.selectSize(testData.sizeLabel);
  await pdp.addToCart();
  await pdp.cancelViewCart();

  // Navigate back via browser (UI back button could also be used if present)
  await pdp.goBack();

  // 2) Super Squeaky
  await women.openSuperSqueaky();
  await pdp.selectSize(testData.sizeLabel);
  await pdp.addToCart();

  // Go to cart via UI
  await pdp.goToCart();

  await page.waitForTimeout(2000); // Wait for cart to update
}