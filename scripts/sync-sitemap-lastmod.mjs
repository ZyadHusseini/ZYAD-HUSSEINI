/**
 * Keeps the homepage <lastmod> in sitemap.xml equal to the date of the most
 * recent commit that actually changed page content.
 *
 * It was previously hand-edited, which meant it silently went stale every time
 * content shipped — it had already drifted 8 days once. A lastmod that claims
 * a page is older than it is tells Google not to bother recrawling, which is
 * the opposite of what a sitemap is for on a site still waiting to be indexed.
 *
 * Only the homepage is derived. The two research documents keep their own
 * hand-set dates: those files genuinely have not changed since they were
 * published, and tying them to repo activity would falsely advertise every
 * unrelated commit as a revision of the thesis.
 */
import { readFileSync, writeFileSync } from "node:fs";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const here = dirname(fileURLToPath(import.meta.url));
const root = resolve(here, "..");
const sitemapPath = resolve(root, "public/sitemap.xml");

// Paths whose changes are visible on the rendered homepage.
const CONTENT_PATHS = ["src", "index.html", "public/llms.txt"];

function latestContentCommitDate() {
  try {
    const out = execFileSync(
      "git",
      ["log", "-1", "--format=%ad", "--date=short", "--", ...CONTENT_PATHS],
      { cwd: root, encoding: "utf8" }
    ).trim();
    return /^\d{4}-\d{2}-\d{2}$/.test(out) ? out : null;
  } catch {
    // Shallow clone, no git, or a build box without history: leave the file
    // untouched rather than stamping today's date on unchanged content.
    return null;
  }
}

const date = latestContentCommitDate();
if (!date) {
  console.log("[sitemap] no git date available — leaving lastmod unchanged");
  process.exit(0);
}

const xml = readFileSync(sitemapPath, "utf8");

// Only the first <url> block is the homepage; the research documents follow.
const homepageBlock = /(<loc>https:\/\/www\.zyadhusseini\.com\/<\/loc>\s*<lastmod>)(\d{4}-\d{2}-\d{2})(<\/lastmod>)/;
const match = xml.match(homepageBlock);
if (!match) {
  throw new Error("[sitemap] homepage <loc>/<lastmod> pair not found — check sitemap.xml structure");
}

if (match[2] === date) {
  console.log(`[sitemap] homepage lastmod already ${date}`);
  process.exit(0);
}

writeFileSync(sitemapPath, xml.replace(homepageBlock, `$1${date}$3`));
console.log(`[sitemap] homepage lastmod ${match[2]} -> ${date}`);
