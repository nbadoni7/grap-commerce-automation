import { BasePage } from "./BasePage";
import { expect } from "@playwright/test";

export class CheckoutPaymentPage extends BasePage {
  async assertReviewDetails(productNames: string[]) {
    await expect(this.$("Payment")).toBeVisible();

    for (const name of productNames) {
      await expect(this.$(name)).toBeVisible();
    }

    await expect(this.$("Products")).toBeVisible();
    await expect(this.$("Shipping")).toBeVisible();
    await expect(this.$("Grand total")).toBeVisible();
  }
}