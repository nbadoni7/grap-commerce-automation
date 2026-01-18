import type { Page } from "@playwright/test";
import { CartPage } from "../pages/CartPage";
import { CheckoutShippingPage } from "../pages/CheckoutShippingPage";
import { CheckoutPaymentPage } from "../pages/CheckoutPaymentPage";
import { Address } from "../models/address";

export async function checkoutUntilPaymentReview(page: Page, shippingAddress: Address, cartTotal: number) {
  const cart = new CartPage(page);
  const ship = new CheckoutShippingPage(page);
  const pay = new CheckoutPaymentPage(page);

  await cart.startCheckout();
  await ship.fillShippingForm(shippingAddress);
  // Select the Fixed Rate shipping method
  await ship.selectNonPickupShipping(ship.defaultShippingMethod!);

  await page.waitForTimeout(2000); // Wait for cart to update

  await ship.goNext();

  const paymentSummaryDetails = {
    shippingAddress: shippingAddress,
    billingAddress: shippingAddress,
    cartTotal: pay.currency + cartTotal.toFixed(2),
    shippingCost: pay.currency + pay.defaultShippingMethod!.price.toFixed(2),
    grandTotal: pay.currency + (cartTotal + pay.defaultShippingMethod!.price).toFixed(2),
  };

  await pay.assertReviewDetails(paymentSummaryDetails);
}