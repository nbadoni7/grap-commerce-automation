import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./src/tests",
  timeout: 60_000,
  retries: 0,
  use: {
    baseURL: "https://graphcommerce.vercel.app/en-gb",
    headless: true,
    trace: "on-first-retry",
    screenshot: "only-on-failure"
  },
  reporter: [
    ["list"],
    ["allure-playwright", { outputFolder: "allure-results", detail: true }],
    ["html", { open: "never" }],
  ],
});