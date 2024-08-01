// Class to hold configuration settings for the test environment.
export class Configurations {
  browser: string = 'chromium'; // Default browser to use for tests.
}

// Exporting an instance of Configurations for global access.
export const configurations = new Configurations();
