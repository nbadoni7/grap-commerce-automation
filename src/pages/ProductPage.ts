import { BasePage } from "./BasePage";
import { X } from "../locators/xpaths";
import { expect } from "@playwright/test";
import { testData } from "../config/testData";

export class ProductPage extends BasePage {
  sizeOption(sizeLabel: string) {
    // your requirement: accept string or xpath
    return sizeLabel; // will become text=36-40 via locator.ts
  }

  async selectSize(sizeLabel: string) {
    await this.click(this.sizeOption(sizeLabel));
    await expect(this.$(this.sizeOption(sizeLabel))).toBeVisible();
  }

  async addToCart() {
    await this.click(X.getButtonByText(testData.addToCartLabel));
  }

  async cancelViewCart() {
    await this.click(X.getButtonByAria(testData.closeLabel));
  }

  async goBack() {
    await this.click(X.getButtonByAria(testData.goBackLabel));
  }

  async goToCart() {
    await this.click(X.getAnchorByText(testData.viewShoppingCartLabel));
  }
}