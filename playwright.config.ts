import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'], // Use the predefined device configuration for Desktop Chrome
        deviceScaleFactor: undefined, // Remove the device scale factor setting
        viewport: null, // Set viewport to null so the browser can be maximized
        launchOptions: {
          args: ['--start-maximized'], // Start the browser maximized
        },
      },
    },
  ],
  use: {
    baseURL: 'https://magento.softwaretestingboard.com',
    headless: true,
    viewport: { width: 1280, height: 720 },
  },
  testDir: './tests',
});
