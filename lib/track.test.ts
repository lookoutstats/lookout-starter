import { beforeEach, describe, expect, it, vi } from "vitest";

const sent: unknown[][] = [];
vi.mock("@vercel/analytics", () => ({ track: (...a: unknown[]) => void sent.push(a) }));
vi.mock("@vercel/analytics/server", () => ({ track: async (...a: unknown[]) => void sent.push(["server", ...a]) }));

const { conversionProps, trackConversion, trackOnSuccess } = await import("./track");
const { trackConversionOnServer } = await import("./track-server");

beforeEach(() => void (sent.length = 0));

describe("conversion events", () => {
  it("names the element by data-track, else its id, and labels it by data-track-label, never its text", () => {
    expect(conversionProps({ id: "start", dataset: { track: "hero-signup", trackLabel: "Start free" } })).toEqual({ el: "hero-signup", label: "Start free" });
    expect(conversionProps({ id: "start", dataset: {} })).toEqual({ el: "#start" });
    expect(conversionProps(null)).toEqual({});
  });

  it("at most two properties (Vercel Pro's limit), each at most 255 characters", () => {
    const p = conversionProps({ dataset: { track: "x".repeat(300), trackLabel: "y" } });
    expect(Object.keys(p)).toHaveLength(2);
    expect(p.el).toHaveLength(255);
  });

  it("sends only when the action succeeds: not on an error, not on a failed response", async () => {
    await trackOnSuccess("signup", async () => "ok", { dataset: { track: "hero-signup" } });
    expect(sent).toEqual([["signup", { el: "hero-signup" }]]);
    await expect(trackOnSuccess("purchase", async () => { throw new Error("declined"); })).rejects.toThrow("declined");
    await trackOnSuccess("form_submit", async () => new Response("", { status: 500 }));
    expect(sent).toHaveLength(1);
    await trackOnSuccess("form_submit", async () => new Response("", { status: 200 }));
    expect(sent).toHaveLength(2);
  });

  it("sends now with trackConversion, and from the server with trackConversionOnServer", async () => {
    trackConversion("purchase");
    await trackConversionOnServer("signup", { el: "api", label: "" });
    expect(sent).toEqual([["purchase", {}], ["server", "signup", { el: "api" }]]);
  });
});
