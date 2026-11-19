import { describe, expect, it } from "vitest";
import { campaignUrl, utmValue } from "./campaign";

describe("campaign links", () => {
  it("sets the three utm values lowercase, trimmed, with spaces as underscores", () => {
    expect(campaignUrl("https://yoursite.com/launch", { source: " Newsletter", medium: "EMAIL", campaign: "Spring launch" })).toBe(
      "https://yoursite.com/launch?utm_source=newsletter&utm_medium=email&utm_campaign=spring_launch",
    );
    expect(utmValue("Black  Friday ")).toBe("black_friday");
  });

  it("keeps other query values and replaces old utm ones", () => {
    expect(campaignUrl("https://yoursite.com/?ref=a&utm_source=old", { source: "x", medium: "social", campaign: "q4" })).toBe("https://yoursite.com/?ref=a&utm_source=x&utm_medium=social&utm_campaign=q4");
  });

  it("refuses in-site links, other schemes and empty values", () => {
    expect(() => campaignUrl("/pricing", { source: "a", medium: "b", campaign: "c" })).toThrow(/full address/);
    expect(() => campaignUrl("mailto:hi@yoursite.com", { source: "a", medium: "b", campaign: "c" })).toThrow(/http/);
    expect(() => campaignUrl("https://yoursite.com", { source: " ", medium: "b", campaign: "c" })).toThrow(/utm_source is empty/);
  });
});
