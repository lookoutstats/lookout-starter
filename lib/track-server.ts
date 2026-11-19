import { track } from "@vercel/analytics/server";
import type { Conversion } from "./track";

// The same conversions, sent from the server (a route handler or a server action), for actions you confirm there:
// a payment webhook, a sign-up your API accepted. Needs Vercel Pro, like the browser helper.

/** Sends a conversion from the server, after the action succeeded. el and label are fixed names, never user input. */
export async function trackConversionOnServer(name: Conversion, props: { el?: string; label?: string } = {}): Promise<void> {
  const clean: Record<string, string> = {};
  if (props.el) clean.el = props.el.slice(0, 255);
  if (props.label) clean.label = props.label.slice(0, 255);
  await track(name, clean);
}
