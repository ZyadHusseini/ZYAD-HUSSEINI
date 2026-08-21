/**
 * Renders content/distribution/articles/*.md into standalone, indexable pages
 * under public/writing/.
 *
 * These are deliberately plain static HTML rather than routes in the React app.
 * The app is a single page with hash anchors, so it offers Google exactly one
 * URL; long-form writing needs its own URLs to rank for its own subjects, and a
 * static file needs no JavaScript to be read by a crawler or an AI agent.
 *
 * Vite copies public/ verbatim into dist/, so nothing here touches the bundle.
 *
 * The markdown subset is intentionally small — headings, paragraphs, lists,
 * tables, bold/italic, links, rules — because the articles are ours and stay
 * within it. Pulling in a markdown library for seven constructs would be more
 * dependency than the job needs.
 */
import { readFileSync, writeFileSync, readdirSync, mkdirSync } from "node:fs";
import { join } from "node:path";
import { execSync } from "node:child_process";

const SRC = "content/distribution/articles";
const OUT = "public/writing";
const ORIGIN = "https://www.zyadhusseini.com";
// Date of the last commit touching the article sources, so <lastmod> reflects
// the writing rather than the moment the build happened to run.
const LASTMOD = execSync(
  `git log -1 --format=%cs -- ${SRC} 2>/dev/null || date +%F`
).toString().trim() || new Date().toISOString().slice(0, 10);

const esc = (s) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

/** Frontmatter is a flat key: value block; values may be [a, b] lists. */
function parseFrontmatter(raw) {
  const m = raw.match(/^---\n([\s\S]*?)\n---\n/);
  if (!m) return { meta: {}, body: raw };
  const meta = {};
  for (const line of m[1].split("\n")) {
    const kv = line.match(/^(\w+):\s*(.*)$/);
    if (!kv) continue;
    let v = kv[2].trim().replace(/^"(.*)"$/, "$1");
    if (v.startsWith("[") && v.endsWith("]")) {
      v = v.slice(1, -1).split(",").map((x) => x.trim()).filter(Boolean);
    }
    meta[kv[1]] = v;
  }
  return { meta, body: raw.slice(m[0].length) };
}

/** Inline spans, applied after the block has already been escaped. */
const inline = (s) =>
  s
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, (_, t, h) => `<a href="${esc(h)}">${t}</a>`)
    .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
    .replace(/(^|[\s(])\*([^*]+)\*/g, "$1<em>$2</em>")
    .replace(/`([^`]+)`/g, "<code>$1</code>");

function render(body) {
  const out = [];
  // Blocks are separated by blank lines; each block is classified once rather
  // than parsed line-by-line, which keeps list and table handling contained.
  for (const raw of body.split(/\n{2,}/)) {
    const block = raw.trim();
    if (!block) continue;

    if (block === "---") { out.push("<hr />"); continue; }

    const h = block.match(/^(#{1,4})\s+(.*)$/);
    if (h && !block.includes("\n")) {
      const lvl = h[1].length;
      out.push(`<h${lvl}>${inline(esc(h[2]))}</h${lvl}>`);
      continue;
    }

    if (block.startsWith("| ")) {
      const rows = block.split("\n").filter((r) => !/^\|[\s|:-]+\|$/.test(r));
      const cells = (r) => r.split("|").slice(1, -1).map((c) => inline(esc(c.trim())));
      const [head, ...rest] = rows;
      out.push(
        `<div class="tw"><table><thead><tr>${cells(head).map((c) => `<th>${c}</th>`).join("")}</tr></thead><tbody>` +
          rest.map((r) => `<tr>${cells(r).map((c) => `<td>${c}</td>`).join("")}</tr>`).join("") +
          `</tbody></table></div>`
      );
      continue;
    }

    if (/^[-*]\s/.test(block)) {
      // Continuation lines are indented; join them back onto their bullet.
      const items = block.replace(/\n\s+/g, " ").split("\n").map((l) => l.replace(/^[-*]\s+/, ""));
      out.push(`<ul>${items.map((i) => `<li>${inline(esc(i))}</li>`).join("")}</ul>`);
      continue;
    }

    const text = inline(esc(block.replace(/\n/g, " ")));
    // A whole-paragraph italic is the article's sign-off block, not body copy.
    out.push(/^<em>[\s\S]*<\/em>$/.test(text) ? `<p class="note">${text}</p>` : `<p>${text}</p>`);
  }
  return out.join("\n      ");
}

const CSS = `
:root{--bg:#05070d;--fg:#e2e8f0;--dim:#94a3b8;--faint:#64748b;--line:rgba(148,163,184,.16);--accent:#a78bfa}
*{box-sizing:border-box}
body{margin:0;background:var(--bg);color:var(--fg);font:400 17px/1.75 ui-sans-serif,system-ui,-apple-system,"Segoe UI",Inter,sans-serif;-webkit-font-smoothing:antialiased}
.wrap{max-width:44rem;margin:0 auto;padding:2.5rem 1.5rem 5rem}
a{color:var(--accent);text-decoration:none;border-bottom:1px solid rgba(167,139,250,.35)}
a:hover{border-bottom-color:var(--accent)}
nav{display:flex;gap:1.25rem;font-size:.875rem;margin-bottom:3.5rem}
nav a{color:var(--faint);border:0}
nav a:hover{color:var(--fg)}
h1{font-size:clamp(1.9rem,5vw,2.6rem);line-height:1.15;letter-spacing:-.02em;margin:0 0 1rem;font-weight:700}
h2{font-size:1.4rem;line-height:1.3;letter-spacing:-.01em;margin:3rem 0 1rem;font-weight:650}
h3{font-size:1.12rem;margin:2.25rem 0 .75rem;font-weight:650}
p{margin:0 0 1.35rem;color:#cbd5e1}
ul{margin:0 0 1.35rem;padding-left:1.15rem;color:#cbd5e1}
li{margin:.4rem 0}
strong{color:#fff;font-weight:650}
code{font-family:ui-monospace,SFMono-Regular,Menlo,monospace;font-size:.88em;background:rgba(148,163,184,.12);padding:.15em .4em;border-radius:4px}
hr{border:0;border-top:1px solid var(--line);margin:3rem 0}
.meta{color:var(--faint);font-size:.875rem;margin:0 0 2.5rem}
.note{color:var(--faint);font-size:.925rem}
.tw{overflow-x:auto;margin:0 0 1.5rem}
table{border-collapse:collapse;width:100%;font-size:.9rem}
th,td{text-align:left;padding:.65rem .8rem;border-bottom:1px solid var(--line);vertical-align:top}
th{color:#fff;font-weight:650;white-space:nowrap}
td{color:#cbd5e1}
footer{margin-top:4rem;padding-top:2rem;border-top:1px solid var(--line);font-size:.9rem;color:var(--faint)}
@media(prefers-reduced-motion:no-preference){html{scroll-behavior:smooth}}
`.trim();

mkdirSync(OUT, { recursive: true });
const files = readdirSync(SRC).filter((f) => f.endsWith(".md")).sort();
const index = [];

for (const file of files) {
  const { meta, body } = parseFrontmatter(readFileSync(join(SRC, file), "utf-8"));
  const slug = file.replace(/^\d+-/, "").replace(/\.md$/, "");
  const url = `${ORIGIN}/writing/${slug}/`;
  // The H1 is rendered from the body, so drop the duplicate title line.
  const stripped = body.replace(/^#\s+.*\n/m, "");
  const title = meta.title;
  // First real paragraph doubles as the meta description.
  const firstPara = stripped.split(/\n{2,}/).map((b) => b.trim())
    .find((b) => b && !b.startsWith("#") && !b.startsWith("---") && !b.startsWith("|") && !/^[-*]\s/.test(b));
  const desc = firstPara.replace(/\n/g, " ").replace(/[*`]|\[|\]\([^)]+\)/g, "").slice(0, 175).trim();
  const tags = Array.isArray(meta.tags) ? meta.tags : [];

  const ld = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description: desc,
    author: {
      "@type": "Person",
      name: "Zyad Husseini",
      alternateName: ["Ziad Husseini", "Zeyad Husseini", "Ziyad Husseini"],
      url: ORIGIN + "/",
      image: `${ORIGIN}/assets/zyad-husseini.jpg`,
      sameAs: [
        "https://www.linkedin.com/in/zyadmhr/",
        "https://github.com/ZyadHusseini",
        "https://linktr.ee/zyadmhrhusseini",
      ],
    },
    publisher: { "@type": "Person", name: "Zyad Husseini", url: ORIGIN + "/" },
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    inLanguage: "en",
    keywords: tags.join(", "),
    image: `${ORIGIN}/assets/og-image.jpg`,
  };

  const html = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${esc(title)} — Zyad Husseini</title>
    <meta name="description" content="${esc(desc)}" />
    <meta name="author" content="Zyad Husseini" />
    <link rel="canonical" href="${url}" />
    <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1" />
    <meta name="keywords" content="${esc(tags.join(", "))}" />
    <meta property="og:type" content="article" />
    <meta property="og:title" content="${esc(title)}" />
    <meta property="og:description" content="${esc(desc)}" />
    <meta property="og:url" content="${url}" />
    <meta property="og:image" content="${ORIGIN}/assets/og-image.jpg" />
    <meta property="og:site_name" content="Zyad Husseini" />
    <meta property="article:author" content="Zyad Husseini" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${esc(title)}" />
    <meta name="twitter:description" content="${esc(desc)}" />
    <meta name="twitter:image" content="${ORIGIN}/assets/og-image.jpg" />
    <link rel="icon" href="/favicon.ico" sizes="any" />
    <script type="application/ld+json">
${JSON.stringify(ld, null, 2)}
    </script>
    <style>${CSS}</style>
  </head>
  <body>
    <div class="wrap">
      <nav>
        <a href="/">← Zyad Husseini</a>
        <a href="/writing/">Writing</a>
        <a href="/#research">Research</a>
      </nav>
      <article>
      <h1>${esc(title)}</h1>
      <p class="meta">By <a href="/">Zyad Husseini</a> · Data analyst and economist, France &amp; Egypt</p>
      ${render(stripped)}
      </article>
      <footer>
        Written by <strong>Zyad Husseini</strong> — also written Ziad, Zeyad or Ziyad Husseini.
        MSc Data Analytics at Kedge Business School; BA Econometrics &amp; Quantitative Economics,
        The American University in Cairo.<br /><br />
        <a href="/">zyadhusseini.com</a> ·
        <a href="https://www.linkedin.com/in/zyadmhr/">LinkedIn</a> ·
        <a href="https://github.com/ZyadHusseini">GitHub</a>
      </footer>
    </div>
  </body>
</html>
`;
  mkdirSync(join(OUT, slug), { recursive: true });
  writeFileSync(join(OUT, slug, "index.html"), html);
  index.push({ slug, title, desc, url, tags });
}

// Hub page: gives the individual articles an internal link source and gives
// Google a single crawlable list of everything under /writing/.
const listHtml = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Writing — Zyad Husseini</title>
    <meta name="description" content="Essays by Zyad Husseini on econometrics, machine learning, green AI, Egyptian logistics data and competitive Tekken." />
    <link rel="canonical" href="${ORIGIN}/writing/" />
    <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1" />
    <meta property="og:type" content="website" />
    <meta property="og:title" content="Writing — Zyad Husseini" />
    <meta property="og:url" content="${ORIGIN}/writing/" />
    <meta property="og:image" content="${ORIGIN}/assets/og-image.jpg" />
    <link rel="icon" href="/favicon.ico" sizes="any" />
    <script type="application/ld+json">
${JSON.stringify({
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "Writing — Zyad Husseini",
  url: ORIGIN + "/writing/",
  author: { "@type": "Person", name: "Zyad Husseini", url: ORIGIN + "/" },
  hasPart: index.map((a) => ({ "@type": "Article", headline: a.title, url: a.url })),
}, null, 2)}
    </script>
    <style>${CSS}
    .card{display:block;padding:1.5rem 0;border-bottom:1px solid var(--line);border-radius:0}
    .card:hover h2{color:#fff}
    .card h2{margin:0 0 .5rem;font-size:1.18rem;color:var(--accent);transition:color .2s}
    .card p{margin:0;color:var(--dim);font-size:.95rem}
    </style>
  </head>
  <body>
    <div class="wrap">
      <nav><a href="/">← Zyad Husseini</a></nav>
      <h1>Writing</h1>
      <p class="meta">Essays on econometrics, machine learning, data work in Egypt, and competitive Tekken.</p>
      ${index.map((a) => `<a class="card" href="/writing/${a.slug}/"><h2>${esc(a.title)}</h2><p>${esc(a.desc)}</p></a>`).join("\n      ")}
      <footer>
        <strong>Zyad Husseini</strong> — data analyst and economist, France &amp; Egypt.<br /><br />
        <a href="/">zyadhusseini.com</a> ·
        <a href="https://www.linkedin.com/in/zyadmhr/">LinkedIn</a> ·
        <a href="https://github.com/ZyadHusseini">GitHub</a>
      </footer>
    </div>
  </body>
</html>
`;
writeFileSync(join(OUT, "index.html"), listHtml);

// Sitemap entries are regenerated in place so adding an article never means
// remembering to hand-edit sitemap.xml — the same marker pattern the FAQ and
// video schema syncs already use.
const MAP = "public/sitemap.xml";
const sm = readFileSync(MAP, "utf-8");
const START = "<!-- WRITING-SITEMAP:START (generated by scripts/build-writing.mjs) -->";
const END = "<!-- WRITING-SITEMAP:END -->";
const entry = (loc, prio) =>
  `  <url>\n    <loc>${loc}</loc>\n    <lastmod>${LASTMOD}</lastmod>\n` +
  `    <changefreq>monthly</changefreq>\n    <priority>${prio}</priority>\n  </url>`;
const block = [entry(`${ORIGIN}/writing/`, "0.7"), ...index.map((a) => entry(a.url, "0.7"))].join("\n");
const i = sm.indexOf(START);
const j = sm.indexOf(END);
if (i === -1 || j === -1) throw new Error("WRITING-SITEMAP markers missing from sitemap.xml");
writeFileSync(MAP, sm.slice(0, i + START.length) + "\n" + block + "\n  " + sm.slice(j));

console.log(`Writing pages built: ${index.length} articles + hub`);
console.log(`Writing sitemap synced: ${index.length + 1} URLs`);
for (const a of index) console.log(`  /writing/${a.slug}/`);
