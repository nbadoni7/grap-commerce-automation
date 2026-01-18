import { BasePage } from "./BasePage";
import { X } from "../locators/xpaths";

export class HomePage extends BasePage {
  async navigateToCategory(name: string) {
    await this.click(X.getCategoryByName(name));
  }
}