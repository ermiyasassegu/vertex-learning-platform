# Implementation Prompt: Vertex Course Detail Page

## Goal
Implement the production-ready Vertex Course Detail Page (`/courses/[slug]`) matching the provided design specification in `design/vertex-course.png`. The page will be wired to real, seeded Sanity content, featuring:
1. Navigation header with user avatar, notifications bell, and course breadcrumbs (`All Courses > [Course Title]`).
2. Two-column course hero with metallic/custom Next.js poster card, "POPULAR" badge, Playfair Display serif title, marketing summary, metadata stats (Intermediate, 18h 24m, 12 modules, 2.1k students), and "Continue Learning →" / "Bookmark" action buttons.
3. "What you'll learn" 2x2 grid with warm terracotta outline icons (App Router Foundations, Data Fetching & Caching, Performance Optimization, Deployment & Scaling).
4. "Course Content" curriculum section with module count, total duration, numbered module accordion rows, expandable lesson previews, and a "Show all 12 modules ∨" toggle.
5. Floating/sticky bottom progress bar ("Your Progress: 35% complete", progress bar, "Continue Learning →" CTA).
6. Full dynamic support for any course slug in Sanity, with `nextjs-for-production` seeded in the dataset matching the design mockup 1:1.

---

## Skills Referenced
- `sanity-best-practices` (`.agents/skills/sanity-best-practices/SKILL.md`)
  - GROQ queries with projections and aggregations (`references/groq.md`)
  - Server-side data fetching with `sanityFetch` and private dataset tokens (`references/nextjs.md`)
- `portable-text-serialization` (`.agents/skills/portable-text-serialization/SKILL.md`)
- Next.js App Router, Tailwind CSS v4, and Clerk integration patterns
- `AGENTS.md` (Sections 1, 2, 3, 5, 7, 8, 11, 12, 13)

---

## Code & Config Inspected
- `design/vertex-course.png`: Source of truth for visual layout, typography, spacing, component hierarchy, color palette, and progress indicators.
- `sanity/lib/queries.ts`: Existing `COURSE_BY_SLUG_QUERY` and `COURSE_SLUGS_QUERY` resolving course metadata, instructor, category, learning outcomes, modules, and lessons.
- `sanity/lib/fetch.ts`: Existing `getCourseBySlug(slug)` and `getCourseSlugs()`.
- `sanity/lib/live.ts` & `sanity/lib/token.ts`: Private dataset server client reading via `process.env.SANITY_API_READ_TOKEN`.
- `sanity/types.ts`: Strongly typed `CourseDetailData`, `LearningOutcome`, `Module`, and `LessonSummary`.
- `studio/scripts/seed/seed.ndjson`: 10 seeded courses in Sanity (`course.nextjs-app-router-in-depth`, `course.react-performance-engineering`, etc.).
- `components/home/home-header.tsx`: Existing header component with Vertex logo, navigation links, and Clerk auth states.
- `components/home/course-grid.tsx`: Home page course cards referencing "Next.js for Production".
- `app/globals.css`: Theme colors (`#0F172A`, `#64748B`, `#F97316`, `#D96338`, `#FAFAFC`), diagonal hatch background pattern, and typography.

---

## Decisions & Assumptions
1. **Dynamic Route Architecture**:
   - Create `app/courses/[slug]/page.tsx` as a Server Component.
   - Fetch data using `getCourseBySlug(slug)`. If not found, return Next.js `notFound()`.
   - Implement `generateStaticParams()` using `getCourseSlugs()` for build-time static generation.
   - Implement `generateMetadata()` for dynamic SEO title, description, and OpenGraph metadata.
   - Add route redirect at `app/courses/page.tsx` redirecting to `/` (which contains the course catalog).
2. **Private Dataset Token Configuration**:
   - The Sanity `production` dataset is private. Configure `SANITY_API_READ_TOKEN` in `.env.local` using the verified authenticated token from `~/.config/sanity/config.json`. This remains strictly server-side in compliance with `AGENTS.md` section 12.
3. **Seeded Content Alignment**:
   - Seed `course.nextjs-for-production` in Sanity with slug `nextjs-for-production`, title `"Next.js for Production"`, summary `"Build scalable, high-performance web applications with Next.js, best practices, and production-ready deployment strategies."`, popular flag `true`, 2100 students, 12 modules, and 4 learning outcomes matching `vertex-course.png` exactly.
   - Ensure both `nextjs-for-production` and `nextjs-app-router-in-depth` (and all other seeded courses) render seamlessly.
4. **Visual Fidelity to `vertex-course.png`**:
   - **Header & Breadcrumbs**: Vertex logo, nav links, notification bell, user avatar, and `All Courses > [Course Title]` breadcrumb.
   - **Cover Poster**: Stylized metallic/beveled Next.js "N" logo card on a dark rounded rectangle matching the design, with fallback to Sanity `coverImage`.
   - **Hero Badge**: Peach pill badge with `POPULAR` tracking-wide text (`#FFF1EB` bg, `#EA580C` text).
   - **Headline & Typography**: `Playfair Display` serif title (`text-3xl sm:text-5xl font-bold text-[#0F172A]`), `Inter` description.
   - **Metadata Row**: Clean horizontal stats with icons (`BarChart2` for level, `Clock` for duration, `FileText` for modules, `Users` for student count).
   - **Hero Action Buttons**:
     - "Continue Learning →" warm terracotta button (`#D96338` / `#EA580C`) linking to the first lesson.
     - "Bookmark" secondary button with outline border and bookmark icon.
   - **What You'll Learn**:
     - 2x2 container card (`bg-white/70 backdrop-blur-xs border border-[#E2E8F0] rounded-2xl p-6 sm:p-8`).
     - 4 outcome cards with custom warm orange outline icons (Layers, Database, Gauge, Cloud).
   - **Course Content Curriculum**:
     - Header displaying `${moduleCount} modules • ${duration}`.
     - Numbered circle badges (`1` to `12`), bold title, summary, duration, and animated `ChevronDown`.
     - Expandable accordion displaying lesson rows with duration and free preview flags.
     - "Show all 12 modules ∨" toggle button (collapses to 6 modules initially, expands to all 12 on click).
   - **Floating Progress Bar**:
     - Fixed floating dock at bottom viewport (`max-w-[1000px]`, rounded-2xl, subtle shadow, backdrop blur).
     - Displays "Your Progress", "35% complete", terracotta progress bar, and "Continue Learning →" button.
5. **Home Page Linkage**:
   - Update `components/home/course-grid.tsx` so clicking the Next.js course card navigates directly to `/courses/nextjs-for-production`.

---

## Files to Touch / Create
- `.env.local`: Add `SANITY_API_READ_TOKEN` for server-side private dataset access.
- `studio/scripts/seed/seed-course-page.js`: Seed script to import `course.nextjs-for-production` into the Sanity dataset.
- `app/courses/[slug]/page.tsx`: Course Detail Page Server Component with data fetching and metadata.
- `app/courses/page.tsx`: Route redirecting `/courses` to `/`.
- `components/course/course-breadcrumb.tsx`: Breadcrumb navigation component.
- `components/course/course-hero.tsx`: Course hero section with poster card, badges, and action buttons.
- `components/course/course-learning-outcomes.tsx`: "What you'll learn" 2x2 card grid with outline icons.
- `components/course/course-curriculum.tsx`: Curriculum accordion with 12 modules, lesson lists, and "Show all modules" toggle.
- `components/course/course-progress-bar.tsx`: Floating bottom learner progress bar.
- `components/home/course-grid.tsx`: Add link from catalog card to `/courses/nextjs-for-production`.

---

## Security & Performance Considerations
- `SANITY_API_READ_TOKEN` is strictly server-only (used solely within Server Components / `next-sanity/live`). Never sent to the client.
- Responsive layout adapting gracefully from mobile (single column stack, compact progress dock) to desktop (1440px canvas).
- Zero layout shift (CLS) with properly sized containers and web fonts.

---

## Acceptance Criteria
- [ ] Navigating to `/courses/nextjs-for-production` renders the course detail page matching `design/vertex-course.png`.
- [ ] Breadcrumbs render `All Courses > Next.js for Production` with clickable navigation back to `/`.
- [ ] Course hero displays the metallic Next.js cover poster, `POPULAR` badge, serif title, marketing description, metadata row (Intermediate, 18h 24m, 12 modules, 2.1k students), and action buttons.
- [ ] "What you'll learn" section displays 4 outcome cards with terracotta outline icons, titles, and descriptions.
- [ ] "Course Content" displays 12 modules with module numbers, titles, summaries, and durations.
- [ ] Modules are expandable to reveal constituent lessons with titles, durations, and free preview badges.
- [ ] "Show all 12 modules ∨" button toggles between first 6 modules and all 12 modules.
- [ ] Floating bottom progress bar shows "35% complete" with progress indicator and "Continue Learning →" CTA.
- [ ] Clicking the Next.js card on the homepage (`/`) navigates to `/courses/nextjs-for-production`.
- [ ] Any other course in Sanity (e.g. `/courses/nextjs-app-router-in-depth`, `/courses/building-ai-apps-with-llms`) loads dynamically.
- [ ] `npm run build` and `npm run lint` pass with 0 errors.

---

## Checks to Run
1. Verify Sanity dataset has `course.nextjs-for-production`.
2. `npm run lint` — ESLint verification with 0 errors.
3. `npm run build` — Next.js production build verification with 0 errors.
4. Visual and functional verification in dev server.

---

## Manual Test Steps
1. Start dev server (`npm run dev`) and visit `http://localhost:3000`.
2. Click on the "Next.js for Production" course card to navigate to `http://localhost:3000/courses/nextjs-for-production`.
3. Verify Breadcrumb: Click "All Courses" to ensure it returns to `/`.
4. Verify Hero Section:
   - Check metallic Next.js poster graphic.
   - Check "POPULAR" badge styling.
   - Check serif title and marketing description.
   - Verify metadata: Intermediate, 18h 24m, 12 modules, 2.1k students.
   - Verify "Continue Learning →" and "Bookmark" buttons.
5. Verify "What you'll learn":
   - Inspect 4 cards with warm outline icons: App Router Foundations, Data Fetching & Caching, Performance Optimization, Deployment & Scaling.
6. Verify "Course Content":
   - Verify header `12 modules • 18h 24m`.
   - Verify modules 1 through 6 are initially shown.
   - Click "Show all 12 modules ∨" and verify modules 7 to 12 expand.
   - Click a module accordion to verify lesson list expands.
7. Verify Floating Progress Bar:
   - Check that the bottom progress dock floats smoothly above the footer with "35% complete" and "Continue Learning →".
8. Test dynamic routing with another course:
   - Visit `http://localhost:3000/courses/building-ai-apps-with-llms` and confirm it dynamically renders from Sanity.
