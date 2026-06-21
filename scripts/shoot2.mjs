import { chromium } from "playwright";
const b = await chromium.launch();
try {
  const ctx = await b.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });
  const p = await ctx.newPage();
  await p.goto("http://localhost:3001", { waitUntil: "load", timeout: 30000 });
  await p.waitForTimeout(4500);
  await p.screenshot({ path: "/tmp/aoh2-hero.png" });
  await p.evaluate(() => window.scrollTo(0, window.innerHeight - 170));
  await p.waitForTimeout(1400);
  await p.screenshot({ path: "/tmp/aoh2-tide.png" });
  const m = await b.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2 });
  const mp = await m.newPage();
  await mp.goto("http://localhost:3001", { waitUntil: "load", timeout: 30000 });
  await mp.waitForTimeout(4500);
  await mp.evaluate(() => window.scrollTo(0, window.innerHeight - 100));
  await mp.waitForTimeout(1200);
  await mp.screenshot({ path: "/tmp/aoh2-mobile-tide.png" });
  console.log("done");
} catch (e) { console.error("ERR", e.message); }
await b.close();
