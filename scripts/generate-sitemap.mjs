// Generates public/sitemap.xml from the app's routes + shop catalog.
// Runs automatically as part of `npm run build`.
import { writeFileSync, existsSync, mkdirSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, "..");
const BASE = "https://ratulkoley.dpdns.org";
const today = new Date().toISOString().slice(0, 10);

// Paths are mirrored here; keep in sync with src/App.jsx routes and
// src/data/products.js (live products are read from a simple JSON export).
let productPaths = [];
try {
  const { products } = await import(resolve(root, "src/data/products.js"));
  productPaths = products.filter((p) => p.live !== false).map((p) => `/shop/${p.slug}`);
} catch {
  console.warn("sitemap: could not import products.js — generating base routes only");
}

const routes = ["/", "/shop", ...productPaths];
const urls = routes
  .map(
    (path) =>
      `  <url><loc>${BASE}${path === "/" ? "/" : path}</loc><lastmod>${today}</lastmod><changefreq>weekly</changefreq><priority>${path === "/" ? "1.0" : "0.7"}</priority></url>`,
  )
  .join("\n");

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;

const publicDir = resolve(root, "public");
if (!existsSync(publicDir)) mkdirSync(publicDir, { recursive: true });
writeFileSync(resolve(publicDir, "sitemap.xml"), xml);
console.log(`sitemap.xml generated with ${routes.length} URLs`);
