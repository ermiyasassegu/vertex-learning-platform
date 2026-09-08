"use client";

import * as React from "react";
import posthog from "posthog-js";

interface LessonViewTrackerProps {
  courseSlug: string;
  lessonSlug: string;
  lessonTitle: string;
  lessonLabel: string;
  isFreePreview: boolean;
}

export function LessonViewTracker({
  courseSlug,
  lessonSlug,
  lessonTitle,
  lessonLabel,
  isFreePreview,
}: LessonViewTrackerProps) {
  React.useEffect(() => {
    posthog.capture("lesson_viewed", {
      course_slug: courseSlug,
      lesson_slug: lessonSlug,
      lesson_title: lessonTitle,
      lesson_label: lessonLabel,
      is_free_preview: isFreePreview,
    });
  }, [courseSlug, lessonSlug, lessonTitle, lessonLabel, isFreePreview]);

  return null;
}
