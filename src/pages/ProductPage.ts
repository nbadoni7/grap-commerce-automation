import { BasePage } from "./BasePage";
import { X } from "../locators/xpaths";
import { expect } from "@playwright/test";

export class ProductPage extends BasePage {
  sizeOption(sizeLabel: string) {
    // your requirement: accept string or xpath
    return sizeLabel; // will become text=36-40 via locator.ts
  }

  async selectSize(sizeLabel: string) {
    await this.click(this.sizeOption(sizeLabel));
    await expect(this.$(this.sizeOption(sizeLabel))).toBeVisible();
  }

  async assertPrice(price: string) {
    const priceLocator = this.$(X.productPriceByText(price));
    await expect(priceLocator).toBeVisible();
  }

  async addToCart() {
    await this.click(X.getButtonByText(this.labels.addToCart));
  }

  async cancelViewCart() {
    await this.click(X.getButtonByAria(this.labels.close));
  }

  async goBack() {
    await this.click(X.getButtonByAria(this.labels.goBack));
  }

  async goToCart() {
    await this.click(X.getAnchorByAria(this.labels.cart));
  }
}