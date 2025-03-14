import dotenv from 'dotenv';

// Class to hold configuration settings for the test environment.
export const configurations = {
  browser:'chromium' // Default browser to use for tests.
}

// Load environment variables from .env file.
dotenv.config({
  path: `./env/.env.${process.env.ENV}`
}); 