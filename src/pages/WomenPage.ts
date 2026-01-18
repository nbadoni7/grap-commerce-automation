import { BasePage } from "./BasePage";
import { expect } from "@playwright/test";
import { X } from "../locators/xpaths";

export class WomenPage extends BasePage {
  async assertProductsVisible(name: string) {
    await expect(this.$(X.getAnchorByText(name))).toBeVisible();
  }

  async navigateToProductPage(name: string) {
    await this.click(X.getAnchorByText(name));
  }
}