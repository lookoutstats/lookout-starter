import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: "Lookout Starter",
  description: "A Next.js starter with Vercel Web Analytics and Speed Insights already set up.",
};

// Both are mounted once, in the root layout, so every page is counted. In local development they send nothing
// (Analytics logs each page view to the browser console instead).
export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
