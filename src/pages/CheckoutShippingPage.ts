import { testData } from "../config/testData";
import { X } from "../locators/xpaths";
import { BasePage } from "./BasePage";

export type ShippingData = {
  email: string;
  firstName: string;
  lastName: string;
  street: string;
  houseNumber: string;
  postcode: string;
  city: string;
  country: string;
  telephone: string;
};

export class CheckoutShippingPage extends BasePage {
  async fillShippingForm(d: ShippingData) {
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

  async selectNonPickupShipping() {
    await this.click('//*[contains(text(), "Flat Rate Fixed")]/ancestor::div[@role="button"]');
  }

  async goNext() {
    await this.click(X.getButtonById(testData.nextLabel.toLowerCase()));
  }
}