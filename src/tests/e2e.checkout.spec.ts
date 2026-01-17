import { test, expect } from "@playwright/test";
import { URLs } from "../config/urls";
import { WomenPage } from "../pages/WomenPage";
import { CartPage } from "../pages/CartPage";
import { addTwoProductsFromWomen } from "../flows/addProducts.flow";
import { checkoutUntilPaymentReview } from "../flows/checkout.flow";
import { testData } from "../config/testData";

test.describe("E2E Checkout Flow (2 products)", () => {
  test("Home -> Women -> Add 2 products (size 36-40) -> Cart -> Shipping -> Payment review", async ({ page }) => {
    // 1. Home
    await page.goto(URLs.home);
    await expect(page).toHaveURL(/\/en-gb\/?$/);

    // 2. Women
    await page.goto(URLs.women);
    const women = new WomenPage(page);
    await women.assertProductsVisible();

    // 3-5. Add 2 products + size 36-40
    await addTwoProductsFromWomen(page);

    // 6. Cart validations
    const cart = new CartPage(page);
    await expect(page).toHaveURL(/\/cart/);

    await cart.assertLineItem(testData.products.fluffyMaracasName, testData.cart.sizeAssertionText);
    await cart.assertLineItem(testData.products.superSqueakyName, testData.cart.sizeAssertionText);
    await cart.assertTotalsPresent();

    // 7-8. Shipping + Payment review
    await checkoutUntilPaymentReview(page, {
      email: `${testData.shipping.emailPrefix}${Date.now()}@example.com`,
      firstName: testData.shipping.firstName,
      lastName: testData.shipping.lastName,
      street: testData.shipping.street,
      houseNumber: testData.shipping.houseNumber,
      postcode: testData.shipping.postcode,
      city: testData.shipping.city,
      country: testData.shipping.country,
      telephone: testData.shipping.telephone
    });
  });
});