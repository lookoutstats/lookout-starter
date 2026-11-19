import { track } from "@vercel/analytics";

// Conversion events, sent from the browser with Vercel Web Analytics.
//
// Custom events need a Vercel Pro (or Enterprise) plan. On Hobby, track() sends nothing, and the rest of the starter
// works as usual. Pro keeps 2 properties per event, which is exactly what this helper sends: `el` and `label`.

/** The conversions this site counts. Add your own names here, so every call uses the same spelling. */
export type Conversion = "signup" | "purchase" | "form_submit";

/** The element a conversion came from. Set data-track and data-track-label on it; ids work too. */
export interface TrackedElement {
  id?: string;
  dataset?: { track?: string; trackLabel?: string };
}

/**
 * Where a conversion happened: a fixed name (data-track, else #id) and a fixed label (data-track-label) that you set on
 * the element. Never the element's visible text, which can hold personal data ("Continue as jane@example.com").
 */
export function conversionProps(el?: TrackedElement | null): Record<string, string> {
  const props: Record<string, string> = {};
  const name = el?.dataset?.track || (el?.id ? `#${el.id}` : "");
  const label = el?.dataset?.trackLabel ?? "";
  if (name) props.el = name.slice(0, 255);
  if (label) props.label = label.slice(0, 255);
  return props;
}

/** Sends a conversion now. Call it only once the action has succeeded; trackOnSuccess does that for you. */
export function trackConversion(name: Conversion, el?: TrackedElement | null): void {
  track(name, conversionProps(el));
}

/**
 * Runs the action and sends the conversion only if it succeeds: a thrown error, or a fetch Response that isn't ok,
 * sends nothing. Returns the action's result.
 *
 *   await trackOnSuccess("signup", () => fetch("/api/signup", { method: "POST", body }), event.currentTarget);
 */
export async function trackOnSuccess<T>(name: Conversion, action: () => Promise<T>, el?: TrackedElement | null): Promise<T> {
  const result = await action();
  if (typeof Response !== "undefined" && result instanceof Response && !result.ok) return result;
  trackConversion(name, el);
  return result;
}
