import { BasePage } from "./BasePage";
import { X } from "../locators/xpaths";

export class HomePage extends BasePage {
  async goWomenViaNav() {
    await this.click(X.getCategoryByName("Women"));
  }
}