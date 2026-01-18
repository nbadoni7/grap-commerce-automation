import { expect } from "@playwright/test";
import { X } from "../locators/xpaths";
import { Address } from "../models/address";
import { ShippingMethod } from "../models/shippingMethods";
import { BasePage } from "./BasePage";

export class CheckoutShippingPage extends BasePage {
  async fillShippingForm(d: Address) {
    await this.fill('//input[@name="email"]', d.email);
    await this.fill('//input[@name="firstname"]', d.firstName);
    await this.fill('//input[@name="lastname"]', d.lastName);
    await this.fill('//input[@name="street"]', d.street);
    await this.fill('//input[@name="houseNumber"]', d.houseNumber);
    await this.fill('//input[@name="postcode"]', d.postcode);
    await this.fill('//input[@name="city"]', d.city);

    // Click the Country MUI Select
    await this.click('//label[contains(text(), "Country")]/following-sibling::div//div[@role="combobox"]');

    // Click the option by text
    await this.click(`//li[@data-value="${d.country}"]`);

    await this.fill('//input[@name="telephone"]', d.telephone);
  }

  async selectNonPickupShipping(method: ShippingMethod) {
    await this.click(`//*[contains(text(), "${method.name}")]/ancestor::div[@role="button"]`);
    await expect(this.$(`//*[contains(text(), "${method.name}")]/ancestor::div[@role="button"]//div[contains(@class, "ActionCard-price")]//span[contains(., "${this.currency + method.price}")]`)).toBeVisible();
  }

  async goNext() {
    await this.click(X.getButtonById(this.labels.next.toLowerCase()));
  }
}