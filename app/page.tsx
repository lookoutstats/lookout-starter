import { campaignUrl } from "@/lib/campaign";
import { SignupButton } from "./signup-button";

// The starter's home page: a placeholder that shows the two helpers in use. Replace it with your own.
export default function Home() {
  const newsletterLink = campaignUrl("https://yoursite.com/launch", { source: "newsletter", medium: "email", campaign: "Spring launch" });
  return (
    <main>
      <h1>Your Vercel project, with analytics already wired in.</h1>
      <p>
        Web Analytics and Speed Insights are mounted in <code>app/layout.tsx</code>. Turn both on in the Vercel dashboard
        (Analytics › Enable, Speed Insights › Enable) after your first deploy.
      </p>
      <section>
        <strong>Conversion events</strong>
        <p>
          <code>lib/track.ts</code> sends a <code>signup</code> event only once the action succeeds. Custom events need
          a Vercel Pro plan.
        </p>
        <SignupButton />
      </section>
      <section>
        <strong>Campaign links</strong>
        <p>
          <code>lib/campaign.ts</code> tags links you share outside your site, the same way every time:
        </p>
        <a href={newsletterLink}>{newsletterLink}</a>
      </section>
    </main>
  );
}
