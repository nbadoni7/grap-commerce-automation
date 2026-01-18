import { PaymentSummaryDetails } from "../models/PaymentSummaryDetails";
import { BasePage } from "./BasePage";
import { expect } from "@playwright/test";

export class CheckoutPaymentPage extends BasePage {
  async assertReviewDetails(paymentSummaryDetails: PaymentSummaryDetails) {
    // Destructure the payment summary details
    const { shippingAddress, billingAddress, cartTotal, shippingCost, grandTotal } = paymentSummaryDetails;

    // Wait for Payment page to load
    await this.page.waitForSelector(
      `//div[contains(@class, "LayoutHeaderContent-center")]//*[contains(text(), "${this.labels.payment}")]`,
      { timeout: 10000 },
    );

    // Assert Confirmation + Track & trace section
    await expect(this.$(`//div[contains(text(), "${this.labels.confirmationTrackTrace}")]`)).toBeVisible();
    await expect(this.$(`//p[contains(text(), "${shippingAddress.email}")]`)).toBeVisible();

    // Assert Shipping address
    const shippingAddressBox = this.$(
      `//div[contains(text(), "${this.labels.shippingAddress}")]/ancestor::div[contains(@class,"SectionContainer-root")]/parent::div[contains(@class, "MuiBox-root")]`,
    );
    await expect(shippingAddressBox).toBeVisible();
    await expect(shippingAddressBox.locator(`text=/${shippingAddress.firstName}/`)).toBeVisible();
    await expect(shippingAddressBox.locator(`text=/${shippingAddress.street}/`)).toBeVisible();
    await expect(shippingAddressBox.locator(`text=/${shippingAddress.postcode}/`)).toBeVisible();
    await expect(shippingAddressBox.locator(`text=/${shippingAddress.city}/`)).toHaveCount(2);

    // Assert Billing address
    const billingAddressBox = this.$(
      `//div[contains(text(), "${this.labels.billingAddress}")]/ancestor::div[contains(@class,"SectionContainer-root")]/parent::div[contains(@class, "MuiBox-root")]`,
    );
    await expect(billingAddressBox).toBeVisible();
    await expect(billingAddressBox.locator(`text=/${billingAddress.firstName}/`)).toBeVisible();
    await expect(billingAddressBox.locator(`text=/${billingAddress.street}/`)).toBeVisible();
    await expect(billingAddressBox.locator(`text=/${billingAddress.postcode}/`)).toBeVisible();
    await expect(billingAddressBox.locator(`text=/${billingAddress.city}/`)).toHaveCount(2);

    // Assert order summary
    const productBox = this.$(`//div[contains(text(), "${this.labels.products}")]/parent::div`);
    await expect(productBox).toContainText(cartTotal);
    const shippingBox = this.$(
      `//div[contains(text(), "${this.labels.shippingFlatRateFixed.replace("{method}", this.defaultShippingMethod?.name ?? "")}")]/parent::div`,
    );
    await expect(shippingBox).toContainText(shippingCost);
    const grandTotalBox = this.$(`//div[contains(text(), "${this.labels.grandTotal}")]/parent::div`);
    await expect(grandTotalBox).toContainText(grandTotal);
  }
}