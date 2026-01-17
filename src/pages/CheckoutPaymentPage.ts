import { BasePage } from "./BasePage";
import { expect } from "@playwright/test";
import { ShippingData } from "./CheckoutShippingPage";

export class CheckoutPaymentPage extends BasePage {
  async assertReviewDetails(shipping: ShippingData) {
    // Wait for Payment page to load
    await this.page.waitForSelector('//div[contains(@class, "LayoutHeaderContent-center")]//*[contains(text(), "Payment")]', { timeout: 10000 });

    // Assert Confirmation + Track & trace section
    await expect(this.$('//div[contains(text(), "Confirmation + Track & trace")]')).toBeVisible();
    await expect(this.$(`//p[contains(text(), "${shipping.email}")]`)).toBeVisible();

    // Assert Shipping address
    const shippingAddressBox = this.$('//div[contains(text(), "Shipping address")]/ancestor::div[contains(@class,"SectionContainer-root")]/parent::div[contains(@class, "MuiBox-root")]');
    await expect(shippingAddressBox).toBeVisible();
    await expect(shippingAddressBox.locator(`text=/${shipping.firstName}/`)).toBeVisible();
    await expect(shippingAddressBox.locator(`text=/${shipping.street}/`)).toBeVisible();
    await expect(shippingAddressBox.locator(`text=/${shipping.postcode}/`)).toBeVisible();
    await expect(shippingAddressBox.locator(`text=/${shipping.city}/`)).toHaveCount(2);

    // Assert Billing address
    const billingAddressBox = this.$('//div[contains(text(), "Billing address")]/ancestor::div[contains(@class,"SectionContainer-root")]/parent::div[contains(@class, "MuiBox-root")]');
    await expect(billingAddressBox).toBeVisible();
    await expect(billingAddressBox.locator(`text=/${shipping.firstName}/`)).toBeVisible();
    await expect(billingAddressBox.locator(`text=/${shipping.street}/`)).toBeVisible();
    await expect(billingAddressBox.locator(`text=/${shipping.postcode}/`)).toBeVisible();
    await expect(billingAddressBox.locator(`text=/${shipping.city}/`)).toHaveCount(2);

    // Assert order summary
    const productBox = this.$('//div[contains(text(), "Products")]/parent::div');
    await expect(productBox).toContainText("£13.60"); // Assuming total price for 2 products is £40.80
    const shippingBox = this.$('//div[contains(text(), "Shipping (Flat Rate Fixed)")]/parent::div');
    await expect(shippingBox).toContainText("£8.50");
    const grandTotalBox = this.$('//div[contains(text(), "Grand total")]/parent::div');
    await expect(grandTotalBox).toContainText("£22.10");
  }
}