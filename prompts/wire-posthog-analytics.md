# Implementation Prompt: Add Clerk Identity and Engagement Events to PostHog

## Goal
Build on the PostHog foundation already on `main` (browser init in
`instrumentation-client.ts`, server client in `lib/posthog-server.ts`, and the
`/ingest` reverse proxy in `next.config.ts`) and add the pieces it lacks:
identify the signed-in Clerk user, and capture the engagement events for the
surfaces that exist today.

---

## Skills Referenced
- `instrument-product-analytics` (`~/.claude/skills/instrument-product-analytics`).

## Code & Config Inspected
- `instrumentation-client.ts`, `lib/posthog-server.ts`, `next.config.ts`: the
  PostHog foundation from `main`. Reused as-is, not changed.
- `app/layout.tsx`: root layout, wraps children in `ClerkProvider`.
- `components/courses/courses-catalog.tsx`: client catalog. Already captures
  `course_category_filtered` and `course_catalog_card_clicked` on `main`.
- `app/courses/[slug]/page.tsx`: server course detail page.

## Decisions & Assumptions
1. Adopt `main`'s init pattern and env var (`NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN`,
   `/ingest` reverse proxy). Do not re-initialize PostHog; the Clerk identity
   bridge only calls `identify`.
2. Do not duplicate events already on `main`. Add only `catalog_viewed` and
   `course_viewed`.
3. Instrument only surfaces that exist today. Search, video play, and lesson
   completion have no surface yet, so they are left for the pages that add them.

## Files Touched / Created
- `components/analytics/posthog-identify.tsx` (new): Clerk identify / reset.
- `components/analytics/track-course-view.tsx` (new): `course_viewed` marker.
- `app/layout.tsx`: mount `PostHogIdentify`.
- `app/courses/[slug]/page.tsx`: mount `TrackCourseView`.
- `components/courses/courses-catalog.tsx`: add `catalog_viewed`.
- `.env.example` (new) and `.gitignore`: canonical env list.

## Events Added
- `catalog_viewed` — `{ course_count, category_count }`.
- `course_viewed` — `{ course_slug, course_title, course_category, course_level }`.

## Acceptance Criteria
- [x] Clerk user identified on sign-in, reset on sign-out.
- [x] The two new events fire from the existing surfaces.
- [x] No PostHog secret reaches the browser; a missing token never breaks the build.

## Checks
- [x] `npx tsc --noEmit`
- [x] `npx eslint` on the changed files
- [x] `npm run build` (with Sanity env set)
