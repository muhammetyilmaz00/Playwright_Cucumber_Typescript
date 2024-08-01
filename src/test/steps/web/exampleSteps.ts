import { When, Then } from "@cucumber/cucumber";
import { expect } from "playwright/test";
import { pageFixture } from "./pageFixture";

When("I open the browser", async () => {
  // The browser is already opened from the hooks
});

When("I navigate to {string}", async (url: string) => {
  // Navigate to the specified URL and wait for the page to load.
  await pageFixture.page.goto(url);
  await pageFixture.page.waitForLoadState("networkidle");
});

When("I click on the {string} link", async (link: string) => {
  // Click the link with the specified text and wait for the page to load.
  await pageFixture.page.getByText(link).click();
  await pageFixture.page.waitForLoadState("networkidle");
});

Then("a link with text {string} must be present", async (link: string) => {
  // Check that a link with the specified text is visible.
  expect(pageFixture.page.getByText(link)).toBeVisible;
});

Then("the {string} box must contain {string} at index {string}", async (textBox: string, text: string, index: string) => {
    // Navigate by clicking a specific link in the footer.
    const locator1 = pageFixture.page.locator("//*[@id='footer']//a[contains(.,'Domain')]");
    await locator1.click();
    await pageFixture.page.waitForLoadState("networkidle");

    // Verify that the specific list item in the box contains the expected text.
    const locator2 = `(//h2[text()='${textBox}']/parent::div//li/a)[${index}]`;
    const element = await pageFixture.page.locator(locator2).textContent();
    expect(element).toEqual(text);
  }
);
