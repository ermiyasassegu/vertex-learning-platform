"use client";

import * as React from "react";
import posthog from "posthog-js";

interface TrackCourseViewProps {
  slug: string;
  title: string;
  category?: string;
  level?: string;
}

// Captures a single course_viewed event when a course detail page mounts.
// The server page stays a server component; only this marker is client-side.
export function TrackCourseView({ slug, title, category, level }: TrackCourseViewProps) {
  React.useEffect(() => {
    posthog.capture("course_viewed", {
      course_slug: slug,
      course_title: title,
      course_category: category,
      course_level: level,
    });
  }, [slug, title, category, level]);

  return null;
}
