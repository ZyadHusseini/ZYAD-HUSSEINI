// ===================================================================
// IndexNow ping — same pattern as the PNM sites (Agency/Solutions):
// runs automatically after every build (npm postbuild), which on Vercel
// means every deploy. Tells Bing/Yandex/Seznam/Naver to re-crawl the
// site's public URLs, parsed straight from public/sitemap.xml so the
// list never drifts from what the sitemap declares.
//
// Bing matters beyond Bing: it feeds ChatGPT search and Microsoft
// Copilot, so this is the AI-assistant submission path that needs no
// account or login. Google does not consume IndexNow — Google discovery
// comes from crawlable links and Search Console.
//
// Non-blocking by design: any failure logs a warning and exits 0. It
// must never fail the build.
// ===================================================================
import { readFile } from 'node:fs/promises';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const HOST = 'www.zyadhusseini.com';
const KEY = '20f1b0218a548453af857dd0b50876a1';
const KEY_LOCATION = `https://${HOST}/${KEY}.txt`;

async function getSitemapUrls() {
  const xml = await readFile(resolve(root, 'public/sitemap.xml'), 'utf-8');
  return [...xml.matchAll(/<loc>(.*?)<\/loc>/g)].map((m) => m[1]);
}

async function main() {
  // Skip in local/dev builds — only ping from CI/deploy environments.
  if (!process.env.CI && !process.env.VERCEL) {
    console.log('[indexnow] skipping ping (not a CI/Vercel build)');
    return;
  }
  const urlList = await getSitemapUrls();
  if (!urlList.length) return;

  const res = await fetch('https://api.indexnow.org/indexnow', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify({ host: HOST, key: KEY, keyLocation: KEY_LOCATION, urlList }),
  });
  console.log(`[indexnow] pinged ${urlList.length} URLs — status ${res.status}`);
}

main().catch((err) => {
  console.warn('[indexnow] ping failed (non-fatal):', err.message);
});
