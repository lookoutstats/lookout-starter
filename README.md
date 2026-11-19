# Lookout Starter

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Flookoutstats%2Flookout-starter&project-name=lookout-starter&repository-name=lookout-starter)

A small Next.js (App Router, TypeScript) starter for Vercel with analytics already set up the right way:

| What | Where | Vercel plan |
|---|---|---|
| **Visitor analytics**: Vercel Web Analytics, mounted once so every page is counted | `app/layout.tsx` | Hobby and up |
| **Speed tracking**: Vercel Speed Insights, next to it | `app/layout.tsx` | Hobby and up |
| **Conversion events**: one helper for `signup`, `purchase` and `form_submit`, sent only when the action succeeds, with a fixed element name and label (never the page's text) | `lib/track.ts`, `lib/track-server.ts` | **Pro and up** (custom events) |
| **Campaign links**: one helper that tags links you share outside your site with `utm_source`, `utm_medium` and `utm_campaign`, lowercase | `lib/campaign.ts` | any |

It doesn't depend on any service but Vercel's own analytics.

## Live in about five minutes

1. **Deploy.** Click the button above. Vercel copies the starter into your GitHub account and deploys it.
2. **Turn on two switches.** In the Vercel dashboard, open the project and click **Enable** on the **Analytics** tab and on the **Speed Insights** tab.
3. **Optional: see every project on one board.** [Lookout](https://lookoutstats.com/?utm_source=lookout-starter&utm_medium=readme&utm_campaign=starter) reads the same data for all your Vercel projects with a read-only token.

## Conversion events

```tsx
import { trackOnSuccess } from "@/lib/track";

<button data-track="hero-signup" data-track-label="Start free" onClick={(e) => {
  const button = e.currentTarget;
  void trackOnSuccess("signup", () => fetch("/api/signup", { method: "POST" }), button);
}}>Start free</button>
```

- The event is sent only if the action succeeds: an error, or a `fetch` response that isn't OK, sends nothing.
- `el` and `label` come from `data-track` and `data-track-label` (or the element's `id`). Never put personal data in them.
- From a route handler or a server action, use `trackConversionOnServer` from `lib/track-server.ts`.
- Custom events need a Vercel **Pro** plan, which keeps 2 properties per event. On Hobby the calls send nothing.

## Campaign links

```ts
import { campaignUrl } from "@/lib/campaign";

campaignUrl("https://yoursite.com/launch", { source: "newsletter", medium: "email", campaign: "Spring launch" });
// https://yoursite.com/launch?utm_source=newsletter&utm_medium=email&utm_campaign=spring_launch
```

Use it for newsletters, ads and social posts. Never for links inside your own site: a UTM tag on an internal link hides where the visitor really came from.

## Develop

```bash
npm install
npm run dev      # http://localhost:3000
npm test         # the helpers' tests
npm run build
```

## Licence

MIT. See [LICENSE](LICENSE).
