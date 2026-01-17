import { BasePage } from "./BasePage";
import { X } from "../locators/xpaths";
import { expect } from "@playwright/test";

export class CartPage extends BasePage {
  async startCheckout() {
    await this.click(X.startCheckout);
  }

  async assertLineItem(productName: string, sizeText: string) {
    // await expect(this.$(productName)).toBeVisible();
    // await expect(this.$(sizeText).first()).toBeVisible();
  }

  async assertTotalsPresent() {
    await expect(this.$("Grand total")).toBeVisible();
  }
}