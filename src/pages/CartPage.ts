import { BasePage } from "./BasePage";
import { X } from "../locators/xpaths";
import { expect } from "@playwright/test";
import { Product } from "../models/product";

export class CartPage extends BasePage {
  async assertLineItem(product: Product, index: number = 0) {
    const overlay = this.$(X.cartOverlay);
    const productCards = overlay.locator('//div[contains(@class, "ActionCard-rootInner") and contains(@class, "layoutList")]');
    const specificCard = productCards.nth(index);
    await expect(specificCard.locator(`text=/${product.name}/`)).toBeVisible();
    await expect(specificCard.locator(`text=/${product.size}/`)).toBeVisible();
    await expect(specificCard.locator(`text=/${this.currency + product.price}/`)).toHaveCount(2);
  }

  async startCheckout() {
    await this.click(X.getAnchorByText(this.labels.startCheckout));
  }

  async assertTotalsPresent(total: number) {
    const grandTotal = this.$(this.labels.grandTotal);
    const totalAmount = grandTotal.locator('xpath=./following-sibling::div[contains(@class, "CartTotals-money")]');

    await expect(grandTotal).toBeVisible();
    await expect(totalAmount).toBeVisible();
    await expect(totalAmount).toHaveText(this.currency + total.toFixed(2));
  }
}