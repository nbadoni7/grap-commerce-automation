import type { Page } from "@playwright/test";
import { WomenPage } from "../pages/WomenPage";
import { ProductPage } from "../pages/ProductPage";
import { Product } from "../models/product";

export async function addProducts(page: Page, products: Product[]) {
  const women = new WomenPage(page);
  const pdp = new ProductPage(page);

  // Assert the products whether they are visible or not
  await Promise.all(products.map(async product => {
    await women.assertProductsVisible(product.name);
  }));

  // Navigate, select size and add to cart
  for (const product of products) {
      await women.navigateToProductPage(product.name);
      await pdp.selectSize(product.size);
      await pdp.assertPrice(women.currency + product.price);
      await pdp.addToCart();
      await pdp.cancelViewCart();

      // Navigate back via browser (UI back button could also be used if present)
      await pdp.goBack();
  }

  // Go to cart via UI
  await pdp.goToCart();

  // Added a wait for cart to update and render the cart UI
  await page.waitForTimeout(2000);
}