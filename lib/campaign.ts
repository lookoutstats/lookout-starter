// Campaign links: tag every link you share outside your site (a newsletter, an ad, a social post) the same way, so
// each campaign shows up under one name. Never use it for links inside your own site: a UTM tag on an internal link
// starts a new visit source and hides where the visitor really came from.

export interface Campaign {
  /** Where the link is shared: "newsletter", "x", "google". */
  source: string;
  /** The kind of link: "email", "social", "cpc". */
  medium: string;
  /** The campaign's name: "Spring launch" becomes "spring_launch". */
  campaign: string;
}

/** Lowercase, trimmed, spaces as underscores: "Spring Launch " → "spring_launch". */
export const utmValue = (v: string) => v.trim().toLowerCase().replace(/\s+/g, "_");

/**
 * The link with utm_source, utm_medium and utm_campaign set (replacing any already there). Needs a full https://
 * address, which also keeps it away from in-site links like "/pricing".
 *
 *   campaignUrl("https://yoursite.com/launch", { source: "newsletter", medium: "email", campaign: "Spring launch" })
 *   // → https://yoursite.com/launch?utm_source=newsletter&utm_medium=email&utm_campaign=spring_launch
 */
export function campaignUrl(url: string, c: Campaign): string {
  let u: URL;
  try {
    u = new URL(url);
  } catch {
    throw new Error(`campaignUrl needs a full address such as https://yoursite.com/page, not "${url}". It is for links you share outside your site.`);
  }
  if (u.protocol !== "https:" && u.protocol !== "http:") throw new Error(`campaignUrl needs an http(s) address, not "${url}".`);
  for (const [key, value] of [["utm_source", c.source], ["utm_medium", c.medium], ["utm_campaign", c.campaign]] as const) {
    const clean = utmValue(value);
    if (!clean) throw new Error(`campaignUrl: ${key} is empty.`);
    u.searchParams.set(key, clean);
  }
  return u.toString();
}
