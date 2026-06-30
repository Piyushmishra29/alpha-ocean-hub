// Convert source images to high-res WebP in public/photos/
// Usage: node scripts/to-webp.mjs <file1> <file2> ...
//   e.g. node scripts/to-webp.mjs ~/Downloads/hero-*.jpg
import sharp from "sharp";
import { mkdir } from "node:fs/promises";
import path from "node:path";

const OUT = "public/photos";
await mkdir(OUT, { recursive: true });

const files = process.argv.slice(2);
if (files.length === 0) {
  console.error("Pass image paths: node scripts/to-webp.mjs <file ...>");
  process.exit(1);
}

for (const file of files) {
  const base = path.parse(file).name.toLowerCase().replace(/[^a-z0-9]+/g, "-");
  const out = path.join(OUT, `${base}.webp`);
  await sharp(file)
    .rotate()
    .resize({ width: 1200, withoutEnlargement: true })
    .webp({ quality: 80, effort: 6 })
    .toFile(out);
  const meta = await sharp(out).metadata();
  console.log(`✓ ${out}  (${meta.width}x${meta.height})`);
}
console.log("done:", files.length, "file(s)");
