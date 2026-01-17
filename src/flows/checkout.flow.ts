import type { Page } from "@playwright/test";
import { CartPage } from "../pages/CartPage";
import { CheckoutShippingPage, ShippingData } from "../pages/CheckoutShippingPage";
import { CheckoutPaymentPage } from "../pages/CheckoutPaymentPage";

export async function checkoutUntilPaymentReview(page: Page, shipping: ShippingData) {
  const cart = new CartPage(page);
  const ship = new CheckoutShippingPage(page);
  const pay = new CheckoutPaymentPage(page);

  await cart.startCheckout();
  await ship.fillShippingForm(shipping);
  await ship.selectNonPickupShipping();

  await page.waitForTimeout(2000); // Wait for cart to update

  await ship.goNext();

  await pay.assertReviewDetails(shipping);
}