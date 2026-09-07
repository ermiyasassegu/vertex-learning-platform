# Implementation Prompt: Vertex All Courses Catalog Page

## Goal
Implement a simple, clean, and production-ready All Courses catalog page at `/courses` that fetches all published courses from the Sanity content lake. It will feature:
1. Header navigation with active "Courses" state and user auth controls.
2. Page title ("All Courses") in Playfair Display serif typography, accompanied by a descriptive subtitle and total course count.
3. Category filter pills ("All", "Web Development", "AI Engineering", "Languages", "Data", "Backend & Infrastructure", "Security") for easy exploration.
4. Comprehensive 3-column responsive course grid displaying all fetched courses with custom technology icons, serif titles, summaries, level, duration, and module count.
5. Direct navigation to each course's detail page (`/courses/[slug]`).
6. Updated links across the site (Header "Courses" nav item and Home page "View all courses →" link) pointing directly to `/courses`.
7. Weekly updates banner and decorative warm gradient equalizer footer.

---

## Skills Referenced
- `sanity-best-practices` (`.agents/skills/sanity-best-practices/SKILL.md`)
  - Server-side data fetching with `sanityFetch` and private dataset token (`references/nextjs.md`)
  - GROQ queries with projections (`references/groq.md`)
- `content-modeling-best-practices` (`.agents/skills/content-modeling-best-practices/SKILL.md`)
- Next.js App Router and Tailwind CSS v4 patterns
- `AGENTS.md` (Sections 1, 2, 3, 5, 8, 12, 13)

---

## Code & Config Inspected
- `app/courses/page.tsx`: Currently redirects to `/`.
- `sanity/lib/fetch.ts`: Existing `getCourses()` and `getCategories()` querying published documents from Sanity.
- `sanity/lib/queries.ts`: `COURSES_QUERY` and `CATEGORIES_QUERY` returning courses with titles, slugs, summaries, levels, durations, module counts, and categories.
- `components/home/home-header.tsx`: Header navigation where "Courses" currently links to `#`.
- `components/home/course-grid.tsx`: Homepage grid where "View all courses" currently links to `#courses`.
- `components/home/weekly-banner.tsx` & `components/home/decorative-footer.tsx`: Standard Vertex footer components.
- `design/vertex-home.png` & `design/vertex-course.png`: Source of truth for card styles, typography, spacing, and colors.

---

## Decisions & Assumptions
1. **Simple, High-Fidelity Catalog Page**:
   - Keep the design aligned with the Vertex design system without unnecessary complexity or bloated UI elements.
   - Server Component at `app/courses/page.tsx` fetches `courses` via `getCourses()` and `categories` via `getCategories()`.
   - Pass data to a client component `components/courses/courses-catalog.tsx` to handle category filter state with zero client latency.
2. **Category Filter**:
   - Provide a horizontal list of category pills: "All" plus each category present in the dataset ("Web Development", "AI Engineering", "Languages", "Data", "Backend & Infrastructure", "Security").
   - Active category styled with dark background (`bg-[#0F172A] text-white`), inactive with soft outline (`bg-white text-[#64748B] border border-[#E2E8F0] hover:border-[#CBD5E1]`).
3. **Course Cards**:
   - Reuse the exact card design language: 16px rounded corners, Playfair Display serif title, hover orange transition, and metadata footer (level, duration, modules).
   - Dynamic technology icons for all courses (Next.js, Docker/DevOps, TypeScript, React, Python, PostgreSQL, AI/LLM, System Design, Security).
4. **Site-Wide Navigation Links**:
   - Update `HomeHeader` so the "Courses" link points to `/courses`.
   - Update `CourseGrid` on the home page so "View all courses →" links to `/courses`.

---

## Files to Touch / Create
- `app/courses/page.tsx`: Server Component for `/courses` fetching courses and categories.
- `components/courses/courses-catalog.tsx`: Client Component rendering catalog hero, category filter pills, and responsive course grid.
- `components/home/home-header.tsx`: Update "Courses" link from `href="#"` to `href="/courses"`.
- `components/home/course-grid.tsx`: Update "View all courses" link from `href="#courses"` to `href="/courses"`.

---

## Security & Performance Considerations
- Server-side data fetching via `sanityFetch` with private `SANITY_API_READ_TOKEN`.
- No sensitive keys or tokens exposed to client bundles.
- Fast, client-side category filtering without round-trip network reloads.

---

## Acceptance Criteria
- [ ] Navigating to `/courses` renders the All Courses catalog page with all published courses from Sanity.
- [ ] Category filter pills filter the visible courses immediately upon selection.
- [ ] Each course card displays its technology icon, serif title, summary, level, duration, and module count.
- [ ] Clicking any course card opens the corresponding course detail page (`/courses/[slug]`).
- [ ] Clicking "Courses" in the navigation bar navigates to `/courses`.
- [ ] Clicking "View all courses →" on the homepage navigates to `/courses`.
- [ ] `npm run lint` and `npm run build` pass with 0 errors.

---

## Checks to Run
1. `npm run lint` — ESLint verification with 0 errors.
2. `npm run build` — Next.js production build verification with 0 errors.
3. Test HTTP response on `http://localhost:3000/courses`.

---

## Manual Test Steps
1. Start dev server (`npm run dev`) and visit `http://localhost:3000/`.
2. Click "View all courses →" or "Courses" in the top navigation to navigate to `http://localhost:3000/courses`.
3. Verify that the All Courses page displays all published courses from Sanity.
4. Click on different category filter pills (e.g. "AI Engineering", "Web Development", "Data") and verify that the grid filters accordingly.
5. Click "All" to restore the full course catalog.
6. Click any course card to verify navigation to its detail page.
