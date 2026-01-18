import type { Page, Locator } from "@playwright/test";
import { $ } from "../utils/locator";
import { ENV } from "../config/env";
import { testData } from "../config/testData";
import { ShippingMethod } from "../models/shippingMethods";

export class BasePage {

  protected _currency: string;
  protected _labels: Record<string, string>;
  protected _shippingMethods: ShippingMethod[];
  protected _defaultShippingMethod: ShippingMethod | null;

  constructor(protected page: Page, currency?: string, labels?: Record<string, string>) {
    this._currency = currency || ENV.currency;
    this._labels = labels || testData.labels;
    this._shippingMethods = testData.shipping.methods;
    this._defaultShippingMethod = this._shippingMethods.find((m) => m.name === testData.shipping.default) ?? null;
  }

  get currency(): string {
    return this._currency;
  }

  get labels(): Record<string, string> {
    return this._labels;
  }

  get shippingMethods(): ShippingMethod[] {
    return this._shippingMethods;
  }

  get defaultShippingMethod(): ShippingMethod | null {
    return this._defaultShippingMethod;
  }

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