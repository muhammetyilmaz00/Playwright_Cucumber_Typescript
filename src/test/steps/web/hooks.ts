import { BeforeAll, AfterAll, After, Before, Status, setDefaultTimeout } from "@cucumber/cucumber";
import { chromium, firefox, webkit, LaunchOptions, Browser, BrowserContext } from "@playwright/test";
import { configurations } from '../../../../support/config'
import { pageFixture } from "./pageFixture";
import { ObjectsService } from "../../../apiService/objectsService";
import { ContextStore } from "../../../../support/contextStore";

// Launch options for the browser, with headless mode enabled/disabled.
const options: LaunchOptions = {
    headless: process.env.HEADLESS === 'true'
};

const objectService = new ObjectsService();
const contextStore = new ContextStore()
export const hooks = {
    context: contextStore
}
let browser: Browser;
let context: BrowserContext;

// Set the default timeout for Cucumber steps.
setDefaultTimeout(60000);

BeforeAll(async () => {
    // Start the browser based on the configuration setting.
    console.log("Starting browser");
    switch (process.env.BROWSER || configurations.browser) {
        case "firefox":
            console.log("Starting firefox");
            browser = await firefox.launch(options);
            break;
        case "webkit":
            console.log("Starting webkit");
            browser = await webkit.launch(options);
            break;
        default:
            console.log("Starting chromium");
            browser = await chromium.launch(options);
    }
});

Before("@web", async function () {
    // Create a new browser context and page for each scenario.
    console.log("Opening page");
    context = await browser.newContext();
    const page = await context.newPage();
    pageFixture.page = page;
});

After("@web", async function (scenario) {
    // Take a screenshot if the scenario fails, then close the page and context.
    console.log(`Closing page`);
    if (scenario.result!.status === Status.FAILED) {
        console.log(`Screenshot taken for the failed scenario: ${scenario.pickle.name}`);
        const buffer = await pageFixture.page.screenshot({
            path: `test-results/screenshots/${scenario.pickle.name}.png`,
            fullPage: true,
        });
        this.attach(buffer, "image/png");
    }
    await pageFixture.page.close();
    await context.close();
});

After({ tags: '@createObject' }, async () => {
    // Delete the created object after all tests are done.
    console.log(`Deleting the created object at the after-step`);
    await objectService.deleteObject(contextStore.get("objectId"));
});

AfterAll(async () => {
    // Close the browser after all tests are done.
    console.log("Closing browser");
    await browser.close();
});
