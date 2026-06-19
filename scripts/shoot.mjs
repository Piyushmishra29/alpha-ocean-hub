import { chromium } from "playwright";

const URL = process.env.URL || "http://localhost:3001";
const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });
const page = await ctx.newPage();
await page.goto(URL, { waitUntil: "networkidle" });

async function shootSection(sel, name) {
  await page.evaluate((s) => {
    const el = document.querySelector(s);
    if (el) el.scrollIntoView({ behavior: "instant", block: "start" });
  }, sel);
  await page.waitForTimeout(1100);
  await page.screenshot({ path: `/tmp/aoh-${name}.png` });
}

await shootSection("#lessons", "lessons");
await shootSection("#rentals", "rentals");
await shootSection("#location", "whyus-gallery");

await browser.close();
console.log("done");
