import sharp from "sharp";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const publicDir = path.resolve(__dirname, "../public");

const files = fs.readdirSync(publicDir).filter((f) => f.endsWith(".png"));

let totalOriginal = 0;
let totalWebp = 0;

console.log("\n=== Converting PNGs to WebP ===\n");

for (const file of files) {
  const inputPath = path.join(publicDir, file);
  const outputName = file.replace(/\.png$/, ".webp");
  const outputPath = path.join(publicDir, outputName);

  const stat = fs.statSync(inputPath);
  const originalSize = stat.size;

  try {
    await sharp(inputPath)
      .webp({ quality: 85, effort: 6 })
      .toFile(outputPath);

    const webpStat = fs.statSync(outputPath);
    const saved = ((1 - webpStat.size / originalSize) * 100).toFixed(1);

    console.log(
      `  ${file.padEnd(35)} ${(originalSize / 1024).toFixed(0).padStart(5)} KB → ${(webpStat.size / 1024).toFixed(0).padStart(5)} KB  (${saved}% saved)`
    );

    totalOriginal += originalSize;
    totalWebp += webpStat.size;
  } catch (err) {
    console.error(`  ✗ ${file}: ${err.message}`);
  }
}

const totalSaved = ((1 - totalWebp / totalOriginal) * 100).toFixed(1);
console.log("\n────────────────────────────────────────────");
console.log(
  `  Total: ${(totalOriginal / 1024 / 1024).toFixed(1)} MB → ${(totalWebp / 1024 / 1024).toFixed(1)} MB  (${totalSaved}% saved)\n`
);
