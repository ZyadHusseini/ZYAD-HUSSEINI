/**
 * Fails the build if any schema.org alternateName is not also real, visible
 * page text.
 *
 * Google's structured data guidelines forbid marking up content that is not
 * visible to readers, and a manual action for it removes rich-result and
 * Knowledge Panel eligibility — the exact thing the aliases are there to earn.
 *
 * The subtle trap this guards against: the aliases live in index.html inside
 * the JSON-LD, so a naive "is this string anywhere in index.html?" check
 * passes trivially and proves nothing. The JSON-LD blocks are stripped before
 * searching.
 */
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const here = dirname(fileURLToPath(import.meta.url));
const root = resolve(here, "..");

const html = readFileSync(resolve(root, "index.html"), "utf8");
const { faqs, aboutParagraphs } = await import(resolve(root, "src/data/content.ts"));

// Everything a visitor can actually read: the static HTML minus its JSON-LD,
// plus the copy React renders from the content module.
const htmlWithoutMarkup = html.replace(
  /<script type="application\/ld\+json">[\s\S]*?<\/script>/g,
  ""
);
const renderedCopy = [
  ...faqs.flatMap((f) => [f.question, f.answer]),
  ...aboutParagraphs.flat().map((seg) => seg.text),
].join(" ");

// Segment boundaries are invisible to a reader, so join them before matching.
const visible = (htmlWithoutMarkup + " " + renderedCopy).replace(/\s+/g, " ");

const jsonLd = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)]
  .map((m) => JSON.parse(m[1]))
  .flatMap((d) => d["@graph"] ?? [d]);
const person = jsonLd.find((n) => n["@type"] === "Person");
const aliases = person?.alternateName ?? [];

const missing = aliases.filter((a) => !visible.includes(a));

if (missing.length) {
  console.error("alternateName values with no visible counterpart on the page:");
  for (const m of missing) console.error(`  - ${m}`);
  console.error(
    "\nEither remove them from the Person schema or add them to the page copy.\n" +
      "Marking up invisible content violates Google's structured data guidelines."
  );
  process.exit(1);
}

console.log(`alternateName check: ${aliases.length}/${aliases.length} aliases visible on page`);
