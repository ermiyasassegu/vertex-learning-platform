# Lesson page route

## Goal

Every lesson link on the site returns a 404. The course pages build lesson
links as `/courses/<courseSlug>/lessons/<lessonSlug>` in three places
(`components/course/course-curriculum.tsx`, `app/courses/[slug]/page.tsx`,
`components/course/course-hero.tsx`), but the App Router has no matching
segment. Add the segment so lessons open and play on the site.

## Skills read

- AGENTS.md sections 1, 3, 5, 7 (lesson page, video embed, server/client
  boundaries, playback stays on the site through a provider embed).

## Code inspected

- `app/courses/[slug]/page.tsx` — page layout wrapper and static-params pattern.
- `sanity/lib/fetch.ts` — `getLessonBySlug` already fetches a lesson by slug,
  derives the parent course with a reverse reference, and computes the module
  hierarchy plus previous/next lessons. `getLessonSlugs` returns lesson and
  course slugs.
- `sanity/lib/queries.ts`, `sanity/types.ts` — `LESSON_BY_SLUG_QUERY` and
  `LessonPageData`.
- `studio/schemaTypes/lesson.ts`, `blockContent.ts` — lesson fields and the
  Portable Text block content the notes carry.
- `components/course/*`, `components/ui/resource-card.tsx`, `badge.tsx` — style
  patterns and reusable components.

## Decisions

- Reuse the existing `getLessonBySlug` fetch helper; no new query is needed.
- The page is a read-only server component. Playback uses the provider's own
  embed (`lib/video.ts` turns a YouTube, Vimeo, or Bunny URL into an iframe
  `src`, and starts at a second when a `t`/`start` query param is present).
- Notes render through `@portabletext/react` with a components map for the
  block content schema (headings, lists, marks, links, images, code blocks).
- A small client component fires the `lesson_viewed` PostHog event, matching
  the analytics decision in AGENTS section 7.

## Files touched

- `app/courses/[slug]/lessons/[lessonSlug]/page.tsx` (new)
- `components/lesson/lesson-notes.tsx` (new)
- `components/lesson/lesson-sidebar.tsx` (new)
- `components/lesson/lesson-view-tracker.tsx` (new)
- `lib/video.ts` (new)

## Security

- All content is fetched server side through the existing Sanity client; no
  token reaches the browser.
- The iframe uses `referrerPolicy="strict-origin-when-cross-origin"` and a
  scoped `allow` list.

## Acceptance criteria

- A lesson link from the catalog, the curriculum accordion, and the course hero
  opens a lesson page instead of the 404 page.
- The page shows the video embed, key points, notes, pro tip, and resources.
- The sidebar lists the course modules and lessons and marks the current one.
- Previous and next lesson links work.

## Checks

- `npx tsc --noEmit`
- `npx eslint .`
- `next build` (needs Sanity and Clerk credentials, so it runs where those are
  set).
