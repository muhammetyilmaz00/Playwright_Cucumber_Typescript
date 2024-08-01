import { Page } from "@playwright/test";

// Singleton object to store the Playwright page instance for tests.
export const pageFixture = {
  page: undefined as unknown as Page,
};
