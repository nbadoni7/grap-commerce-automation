import { BasePage } from "./BasePage";
import { expect } from "@playwright/test";
import { X } from "../locators/xpaths";

export class WomenPage extends BasePage {
  async assertProductsVisible() {
    await expect(this.$(X.fluffyMaracasTile)).toBeVisible();
    await expect(this.$(X.superSqueakyTile)).toBeVisible();
  }

  async openFluffyMaracas() {
    await this.click(X.fluffyMaracasTile);
  }

  async openSuperSqueaky() {
    await this.click(X.superSqueakyTile);
  }
}