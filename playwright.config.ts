import { defineConfig, devices } from "@playwright/test";
import path from "path";

export default defineConfig({
  testDir: "./tests/e2e",
  outputDir: "./tests/results",
  snapshotDir: "./tests/screenshots",
  fullyParallel: true,
  reporter: [["html", { outputFolder: "tests/report", open: "never" }]],
  use: {
    baseURL: `file://${path.resolve("examples")}/`,
    screenshot: "only-on-failure",
  },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],
});
