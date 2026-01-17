import { BasePage } from "./BasePage";
import { expect } from "@playwright/test";
import { X } from "../locators/xpaths";

export class WomenPage extends BasePage {
  async assertProductsVisible() {
    await expect(this.$(X.getAnchorByText("Fluffy Maracas"))).toBeVisible();
    await expect(this.$(X.getAnchorByText("Super Squeaky"))).toBeVisible();
  }

  async openFluffyMaracas() {
    await this.click(X.getAnchorByText("Fluffy Maracas"));
  }

  async openSuperSqueaky() {
    await this.click(X.getAnchorByText("Super Squeaky"));
  }
}