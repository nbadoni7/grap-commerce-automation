export const X = {
  getCategoryByName: (categoryName: string) => `//div[text()="${categoryName}"]`,
  getAnchorByText: (tileName: string) => `//a[contains(., "${tileName}") or .//span[contains(text(), "${tileName}")]]`,
  getAnchorByAria: (ariaLabel: string) => `//a[@aria-label="${ariaLabel}"]`,
  getButtonByText: (buttonText: string) => `//button[text()="${buttonText}" and @type="submit"]`,
  getButtonById: (buttonId: string) => `//button[@id="${buttonId}" and @type="submit"]`,
  getButtonByAria: (buttonText: string) => `//button[@aria-label="${buttonText}" and @type="button"]`,
  productPriceByText: (price: string) => `//span[contains(@class, "ProductPagePrice-finalPrice")]//span[contains(., "${price}")]`,

  cartOverlay: `//div[contains(@class, "LayoutOverlayBase-overlay") and contains(@class, "variantSmBottom")]`,
};