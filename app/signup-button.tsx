"use client";

import { useState } from "react";
import { trackOnSuccess } from "@/lib/track";

// A conversion done right: the event is sent only once the sign-up succeeded, with a fixed name and label from the
// button's data attributes, never its text. Replace the fake request with your own.
export function SignupButton() {
  const [done, setDone] = useState(false);
  return (
    <button
      type="button"
      data-track="hero-signup"
      data-track-label="Start free"
      onClick={async (e) => {
        const button = e.currentTarget;
        await trackOnSuccess("signup", () => new Promise((resolve) => setTimeout(resolve, 300)), button);
        setDone(true);
      }}
    >
      {done ? "Signed up ✓" : "Start free"}
    </button>
  );
}
