// Umami analytics tag — copied into a site by the /add-analytics skill (sites-ops/templates).
// Cookieless, so it needs no consent hook. `domains` restricts tracking to the prod
// hostname(s), so dev/staging deploys of the same code never send data.
// The website ID is public (like a GA measurement ID) and safe to commit.
import Script from "next/script";

const UMAMI_URL = "https://analytics.dedycker.dev"; // e.g. https://analytics.dedycker.dev
const UMAMI_WEBSITE_ID = "f104ec71-0b24-4689-b531-bcd7ba7d5e55";
const UMAMI_DOMAINS = "cedimed.brussels,www.cedimed.brussels"; // comma-separated prod hostnames

export default function UmamiAnalytics() {
  return (
    <Script
      src={`${UMAMI_URL}/script.js`}
      data-website-id={UMAMI_WEBSITE_ID}
      data-domains={UMAMI_DOMAINS}
      strategy="afterInteractive"
    />
  );
}
