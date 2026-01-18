import { test, expect } from "@playwright/test";
import { URLS } from "../config/urls";
import { CartPage } from "../pages/CartPage";
import { addProducts } from "../flows/addProducts.flow";
import { checkoutUntilPaymentReview } from "../flows/checkout.flow";
import { testData } from "../config/testData";
import { HomePage } from "../pages/HomePage";

test.describe("E2E Checkout Flow (2 products)", () => {
  test("Home -> Women -> Add 2 products (size 36-40) -> Cart -> Shipping -> Payment review", async ({ page }) => {
    const products = testData.products;
    const shippingAddress = testData.shipping.address;
    
    // 1. Home
    await page.goto(URLS.home);
    await expect(page).toHaveURL(/\/en-gb\/?$/);

    // 2. Women
    const home = new HomePage(page);
    home.navigateToCategory(testData.categories.women);
    await expect(page).toHaveURL(/\/en-gb\/women\/?$/);

    // 3-5. Add 2 products + size 36-40
    await addProducts(page, products);

    // 6. Cart validations
    const cart = new CartPage(page);
    await expect(page).toHaveURL(/\/cart/);

    // Assert whether the correct products are reflecting in cart
    await Promise.all(products.map(async (product, index) => {
      await cart.assertLineItem(product, index);
    }));

    // Calculate the total and assert
    const cartTotal: number = products.reduce((sum, product) => sum + product.price, 0);
    await cart.assertTotalsPresent(cartTotal);

    // 7-8. Shipping + Payment review
    await checkoutUntilPaymentReview(page, shippingAddress, cartTotal);
  });
});