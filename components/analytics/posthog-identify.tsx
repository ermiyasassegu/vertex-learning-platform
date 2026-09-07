"use client";

import * as React from "react";
import { useUser } from "@clerk/nextjs";
import posthog from "posthog-js";

// Links PostHog events to the signed-in Clerk user, and resets the identity on
// sign-out so the next person in the browser starts clean. Renders nothing.
export function PostHogIdentify() {
  const { isLoaded, isSignedIn, user } = useUser();
  const identified = React.useRef(false);

  React.useEffect(() => {
    if (!isLoaded || !posthog.__loaded) return;

    if (isSignedIn && user) {
      posthog.identify(user.id, {
        email: user.primaryEmailAddress?.emailAddress,
        name: user.fullName ?? undefined,
      });
      identified.current = true;
    } else if (!isSignedIn && identified.current) {
      posthog.reset();
      identified.current = false;
    }
  }, [isLoaded, isSignedIn, user]);

  return null;
}
