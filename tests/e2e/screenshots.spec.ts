import { test, expect } from "@playwright/test";
import path from "path";

const pages = [
  { name: "brand-guide", file: "index.html" },
  { name: "chms", file: "chms.html" },
  { name: "accounting", file: "accounting.html" },
  { name: "crm", file: "crm.html" },
  { name: "pos", file: "pos.html" },
  { name: "website", file: "website.html" },
  { name: "auth", file: "auth.html" },
];

const examplesDir = path.resolve("examples");

for (const { name, file } of pages) {
  test.describe(name, () => {
    test("light mode", async ({ page }) => {
      await page.goto(`file://${examplesDir}/${file}`);
      await page.evaluate(() => {
        document.documentElement.classList.remove("dark");
        localStorage.setItem("steward-theme", "light");
      });
      await page.waitForLoadState("networkidle");
      await expect(page).toHaveScreenshot(`${name}-light.png`, {
        fullPage: true,
        animations: "disabled",
      });
    });

    test("dark mode", async ({ page }) => {
      await page.goto(`file://${examplesDir}/${file}`);
      await page.evaluate(() => {
        document.documentElement.classList.add("dark");
        localStorage.setItem("steward-theme", "dark");
      });
      await page.waitForLoadState("networkidle");
      await expect(page).toHaveScreenshot(`${name}-dark.png`, {
        fullPage: true,
        animations: "disabled",
      });
    });
  });
}
