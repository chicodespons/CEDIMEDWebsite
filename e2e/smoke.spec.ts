// Smoke test for cedimed.brussels — read-only (GET requests only, no form submits).
// Setup once:  npm ci && npx playwright install chromium
// Run:         BASE_URL=https://cedimed.brussels STRAPI_URL=https://strapi.cedimed.brussels npx playwright test e2e
// Optional:    STRAPI_TOKEN=<read-only API token> enables the Strapi content checks.
//              Without it the Strapi API is only checked for "route exists, auth enforced" (403).
import { test, expect } from "@playwright/test";

const BASE_URL = (process.env.BASE_URL ?? "http://localhost:3000").replace(/\/$/, "");

// From i18n/routing.ts
const LOCALES = ["nl", "fr", "en"] as const;

// Every static route under app/[locale]. The pijler pages, about, home and news
// render Strapi content server-side, so a broken API shows up here too.
const ROUTES = [
  "",
  "/about",
  "/clinical-care",
  "/contact",
  "/education",
  "/innovation",
  "/news",
  "/privacy-policy",
  "/research",
];

// Text the site renders when Strapi returns nothing (PijlerText.tsx) or Next.js fails.
const BROKEN_PAGE = /Application error|Internal Server Error|This page could not be found|No data found for the provided locale and slug/i;

// Known third-party noise, matched narrowly (frame URL + message). reCAPTCHA's iframes log this
// whenever the browser blocks third-party storage (headless Chromium always does); not a site bug.
const IGNORED_CONSOLE_ERRORS = [
  { frame: /^https:\/\/www\.google\.com\/recaptcha\//, text: /^requestStorageAccess: Permission denied\.$/ },
];

async function checkPage(page: import("@playwright/test").Page, url: string) {
  const errors: string[] = [];
  page.on("pageerror", (e) => errors.push(e.message));
  page.on("console", (m) => {
    if (m.type() !== "error") return;
    const from = m.location().url;
    if (IGNORED_CONSOLE_ERRORS.some((i) => i.frame.test(from) && i.text.test(m.text()))) return;
    errors.push(`${m.text()} (${from})`);
  });

  const res = await page.goto(url, { waitUntil: "networkidle" });
  expect(res?.status(), `HTTP status for ${url}`).toBeLessThan(400);
  await expect(page.locator("body")).not.toContainText(BROKEN_PAGE);
  expect(errors, `browser errors on ${url}`).toEqual([]);
}

test("root redirects to default locale", async ({ page }) => {
  const res = await page.goto(BASE_URL + "/");
  expect(res?.status()).toBeLessThan(400);
  expect(new URL(page.url()).pathname).toMatch(/^\/(nl|fr|en)(\/|$)/);
});

for (const locale of LOCALES) {
  test.describe(`locale ${locale}`, () => {
    for (const route of ROUTES) {
      const path = `/${locale}${route}`;
      test(`page ${path} loads cleanly`, async ({ page }) => {
        await checkPage(page, BASE_URL + path);
      });
    }

    test(`first news article (/${locale}/news/[slug]) loads cleanly`, async ({ page }) => {
      await page.goto(`${BASE_URL}/${locale}/news`, { waitUntil: "networkidle" });
      const href = await page
        .locator(`a[href*="/news/"]`)
        .first()
        .getAttribute("href");
      expect(href, "news overview should link to at least one article").toBeTruthy();
      await checkPage(page, new URL(href!, BASE_URL).toString());
    });
  });
}

// The Strapi endpoints the website calls (see app/components/*, app/[locale]/news/*).
const STRAPI_URL = process.env.STRAPI_URL?.replace(/\/$/, "");
const STRAPI_TOKEN = process.env.STRAPI_TOKEN;

const strapiEndpoints = (locale: string) => [
  `/api/about?locale=${locale}`,
  `/api/pijlers?locale=${locale}`,
  ...["clinical-care", "education", "innovation", "research"].map(
    (slug) => `/api/pijlers?filters[link][$eq]=${slug}&locale=${locale}`,
  ),
  `/api/team-members?locale=${locale}&populate=*`,
  // News may be empty for fr/en — the site falls back to nl, so only nl must have items.
  `/api/newses?fields=title,slug&sort=publishedAt:desc&locale=${locale}`,
];

test.describe("strapi", () => {
  test.skip(!STRAPI_URL, "STRAPI_URL not set");

  for (const locale of LOCALES) {
    for (const ep of strapiEndpoints(locale)) {
      const mayBeEmpty = ep.startsWith("/api/newses") && locale !== "nl";

      test(`api ${ep}`, async ({ request }) => {
        if (!STRAPI_TOKEN) {
          // No token: the API is private, so 403 proves Strapi is up and the route exists
          // (a removed content type gives 404, a broken backend 5xx).
          const res = await request.get(STRAPI_URL + ep);
          expect(res.status(), `${ep} without token`).toBe(403);
          return;
        }
        const res = await request.get(STRAPI_URL + ep, {
          headers: { Authorization: `Bearer ${STRAPI_TOKEN}` },
        });
        expect(res.status(), ep).toBe(200);
        const body = await res.json();
        const count = Array.isArray(body.data) ? body.data.length : body.data ? 1 : 0;
        if (!mayBeEmpty) expect(count, `content survived for ${ep}`).toBeGreaterThan(0);
      });
    }
  }
});
