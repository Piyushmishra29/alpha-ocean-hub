import { chromium } from "playwright";
const URL = "https://pi-vps-mumbai.tail641fa8.ts.net/alpha/";
const b = await chromium.launch();

// Desktop hero
const d = await b.newPage({ viewport: { width: 1440, height: 860 }, deviceScaleFactor: 2 });
await d.goto(URL, { waitUntil: "load", timeout: 45000 });
await d.waitForTimeout(2500);
await d.screenshot({ path: "docs/images/hero.png" });

// Scroll to gallery + reveal tide widget
await d.evaluate(() => window.scrollTo({ top: document.body.scrollHeight * 0.62, behavior: "instant" }));
await d.waitForTimeout(2500);
await d.screenshot({ path: "docs/images/gallery-live.png" });
await d.close();

// Mobile
const m = await b.newPage({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 3, isMobile: true });
await m.goto(URL, { waitUntil: "load", timeout: 45000 });
await m.waitForTimeout(2500);
await m.screenshot({ path: "docs/images/mobile.png" });
await m.close();
await b.close();
console.log("shots done");
