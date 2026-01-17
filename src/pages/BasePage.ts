import type { Page, Locator } from "@playwright/test";
import { $ } from "../utils/locator";
import { ENV } from "../config/env";

export class BasePage {
  constructor(protected page: Page) {}

  protected $(selector: string): Locator {
    return $(this.page, selector);
  }

  async click(selector: string) {
    await this.$(selector).click({ timeout: ENV.timeoutMs });
  }

  async fill(selector: string, value: string) {
    await this.$(selector).fill(value, { timeout: ENV.timeoutMs });
  }
}