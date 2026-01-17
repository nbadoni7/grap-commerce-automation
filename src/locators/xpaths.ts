export const X = {
  getCategoryByName: (categoryName: string) => `//div[text()="${categoryName}"]`,
  getAnchorByText: (tileName: string) => `//a[contains(., "${tileName}") or .//span[contains(text(), "${tileName}")]]`,
  getButtonByText: (buttonText: string) => `//button[text()="${buttonText}" and @type="submit"]`,
  getButtonById: (buttonId: string) => `//button[@id="${buttonId}" and @type="submit"]`,
  getButtonByAria: (buttonText: string) => `//button[@aria-label="${buttonText}" and @type="button"]`,
  cartOverlay: `//div[contains(@class, "LayoutOverlayBase-overlay") and contains(@class, "variantSmBottom")]`,
  startCheckout: `//*[@id="__next"]/div[3]/div[2]/div[2]/div/div/div[1]/div[2]/div[3]/div/a[1]`
};