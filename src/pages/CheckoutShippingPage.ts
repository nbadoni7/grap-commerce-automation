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
    await this.fill('input[name="email"]', d.email);
    await this.fill('input[name="firstname"]', d.firstName);
    await this.fill('input[name="lastname"]', d.lastName);
    await this.fill('input[name="street[0]"]', d.street);
    await this.fill('input[name="houseNumber"]', d.houseNumber);
    await this.fill('input[name="postcode"]', d.postcode);
    await this.fill('input[name="city"]', d.city);

    // Country: many checkout UIs use select/combobox; this is a safe “try-click by text”
    await this.$("Country").click().catch(() => {});
    await this.$(d.country).click().catch(() => {});

    await this.fill('input[name="telephone"]', d.telephone);
  }

  async selectNonPickupShipping() {
    // non-pickup example (site labels may vary)
    await this.$("Flat Rate Fixed").click();
  }

  async goNext() {
    await this.$("Next").click();
  }
}