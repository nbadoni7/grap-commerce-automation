# GraphCommerce E2E Automation (Playwright + TypeScript)

Senior Quality Automation Engineer take-home assignment: an end-to-end checkout flow automation suite for the GraphCommerce demo storefront.

The suite follows a maintainable structure (Page Objects + reusable Flows) and uses data-driven configuration for products, shipping method, and expected UI labels.

## Quick Start

Prerequisites:

- Node.js (LTS recommended)
- npm

Install dependencies:

```bash
npm install
```

Install Playwright browsers (first time only):

```bash
npx playwright install
```

Run tests (headless by default):

```bash
npm test
```

Open Playwright HTML report:

```bash
npm run report:html
```

## Project Overview

This project validates a realistic e2e user journey:

- Navigate to category
- Add multiple products (with size selection)
- Validate cart line items and totals
- Complete shipping step
- Validate payment review summary (addresses + totals)

## Tech Stack

- Playwright Test (test runner + assertions)
- TypeScript (strict mode)
- Allure reporting via `allure-playwright` reporter

## Architecture

Core folders:

- `src/pages/`: Page Object Model (POM) abstractions over UI pages/components
- `src/flows/`: Business flows composed from page objects (reusable journey steps)
- `src/tests/`: Test specs (high-level orchestration; minimal UI details)
- `src/config/`: Environment and test configuration (`ENV`, `URLS`, `testData`)
- `src/models/`: Typed interfaces used across pages/flows/tests
- `src/locators/`: Centralized XPath builders / shared locators
- `src/utils/`: Small utilities (notably a selector wrapper to unify XPath/text/CSS)

Key design choices:

- **Pages expose intent, not mechanics** (e.g., `addToCart()`, `fillShippingForm()`)
- **Flows reduce duplication** across specs and keep test files readable
- **Data-driven** inputs and labels live in `src/config/testData.ts`
- **Selector normalization** in `src/utils/locator.ts` allows using `text=...` or raw XPath like `//div[...]` consistently

## Configuration

### Base URL

The base URL is configured in `playwright.config.ts`:

- `use.baseURL`: `https://graphcommerce.vercel.app/en-gb`

### ENV

`src/config/env.ts` contains:

- `ENV.currency` (e.g., `£`)
- `ENV.timeoutMs`
- `ENV.localePath`

### Test Data

`src/config/testData.ts` contains:

- Products to add (name/size/price)
- Shipping configuration (default method, method list, address)
- UI labels used in selectors/assertions

## How To Run

All commands should be run from the repository root.

### Run all tests

```bash
npm test
```

### Run in UI mode

```bash
npm run test:ui
```

### Run in debug mode

```bash
npm run test:debug
```

### Run a single spec

```bash
npx playwright test src/tests/e2e.checkout.spec.ts
```

### Run by test title (grep)

```bash
npx playwright test -g "E2E Checkout Flow"
```

### Run headed (visible browser)

```bash
npx playwright test --headed
```

## Reports

### Playwright HTML report

The suite generates the HTML report automatically on runs. To open it:

```bash
npm run report:html
```

### Allure report

The reporter writes results into `allure-results/`.

Generate and open the Allure report:

```bash
npm run report:allure
```

If you see `allure: command not found`, ensure dependencies are installed (`npm install`). If your environment still can’t resolve Allure, you can run it explicitly via `npx`:

```bash
npx allure generate allure-results --clean -o allure-report
npx allure open allure-report
```