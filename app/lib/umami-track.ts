// Umami custom events — copied into a site by /add-analytics --events (sites-ops/templates).
// Use for things a data-umami-event attribute can't express, e.g. "form sent successfully".
// Never pass personal data (names, emails, phone numbers, message text) as event data.
type UmamiEventData = Record<string, string | number | boolean>;

declare global {
  interface Window {
    umami?: { track: (event: string, data?: UmamiEventData) => void };
  }
}

export function trackEvent(name: string, data?: UmamiEventData) {
  if (typeof window !== 'undefined') window.umami?.track(name, data);
}
