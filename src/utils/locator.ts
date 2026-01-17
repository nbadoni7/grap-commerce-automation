import type { Page, Locator } from "@playwright/test";

export function toSelector(input: string): string {
  const s = input.trim();

  if (s.startsWith("xpath=") || s.startsWith("text=") || s.startsWith("css=")) return s;

  if (s.startsWith("//") || s.startsWith("(//") || s.startsWith("..") || s.startsWith("./")) {
    return `xpath=${s}`;
  }

  return `text=${s}`;
}

export function $(page: Page, input: string): Locator {
  return page.locator(toSelector(input));
}