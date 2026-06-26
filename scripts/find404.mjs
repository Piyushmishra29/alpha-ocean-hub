import { chromium } from "playwright";
const b = await chromium.launch();
const p = await b.newPage();
const bad = [];
p.on("response", (r) => { if (r.status() >= 400) bad.push(r.status() + "  " + r.url()); });
await p.goto("https://pi-vps-mumbai.tail641fa8.ts.net/alpha/", { waitUntil: "load", timeout: 45000 });
await p.waitForTimeout(3000);
console.log("BAD RESPONSES:", bad.length ? bad.join("\n") : "none");
await b.close();
