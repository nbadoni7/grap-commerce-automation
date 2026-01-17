import { BasePage } from "./BasePage";
import { X } from "../locators/xpaths";
import { expect } from "@playwright/test";
import { testData } from "../config/testData";

export class CartPage extends BasePage {
  async startCheckout() {
    await this.click(X.getAnchorByText(testData.startCheckoutLabel));
  }

  // async assertLineItem(productName: string, sizeText: string) {
  //   const overlay = this.$(X.cartOverlay);
  //   await expect(overlay.locator(`text=${productName}`)).toBeVisible();
  //   await expect(overlay.locator(`text=${sizeText}`)).toBeVisible();
  // }
  async assertLineItem(productName: string, sizeText: string, index: number = 0) {
    const overlay = this.$(X.cartOverlay);
    const productCards = overlay.locator('//div[contains(@class, "ActionCard-rootInner") and contains(@class, "layoutList")]');
    const specificCard = productCards.nth(index);
    await expect(specificCard.locator(`text=/${productName}/`)).toBeVisible();
    await expect(specificCard.locator(`text=/${sizeText}/`)).toBeVisible();
  }

  async assertTotalsPresent() {
    await expect(this.$(testData.grandTotalLabel)).toBeVisible();
  }
}