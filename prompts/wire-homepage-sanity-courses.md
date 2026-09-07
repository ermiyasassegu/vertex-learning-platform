# Implementation Prompt: Wire Home Page Courses to Seeded Sanity Content

## Goal
Wire the "All Courses" section on the Vertex Home Page (`/`) to fetch and render courses dynamically from the seeded Sanity content lake instead of static hardcoded data, preserving the exact visual design shown in `Screenshot 2026-09-05 205600.png` and `design/vertex-home.png`.

---

## Skills Referenced
- `sanity-best-practices` (`.agents/skills/sanity-best-practices/SKILL.md`)
  - Server-side data fetching with `sanityFetch` and GROQ query projections (`references/groq.md`, `references/nextjs.md`)
- `content-modeling-best-practices` (`.agents/skills/content-modeling-best-practices/SKILL.md`)
- `AGENTS.md` (Sections 1, 2, 5, 8, 12, 13)

---

## Code & Config Inspected
- `Screenshot 2026-09-05 205600.png`: User screenshot showing the 3 course cards on the home page ("Next.js for Production", "Docker Essentials", "TypeScript Deep Dive") with custom logos, serif titles, summaries, and metadata row (Level, Duration, Modules).
- `app/page.tsx`: Currently renders `<CourseGrid />` statically without fetching Sanity courses.
- `components/home/course-grid.tsx`: Currently contains a static `const COURSES: CourseItem[]` array with hardcoded values.
- `sanity/lib/fetch.ts`: Contains `getCourses()` which executes `COURSES_QUERY` via `sanityFetch` using authenticated server client.
- `sanity/lib/queries.ts`: `COURSES_QUERY` projects `title`, `slug`, `summary`, `coverImage`, `level`, `price`, `isPopular`, `studentCount`, `moduleCount`, and `totalDurationSeconds`.
- `sanity/types.ts`: Strongly typed `CourseCardData`.

---

## Decisions & Assumptions
1. **Server-Side Data Fetching**:
   - Update `app/page.tsx` into an `async` Server Component that fetches published courses using `await getCourses()`.
   - Pass the fetched courses to `CourseGrid` as a prop (`courses: CourseCardData[]`).
2. **Seeded Sanity Data Alignment**:
   - Seed `course.docker-essentials` (slug: `docker-essentials`, title: "Docker Essentials", summary: "Containerize applications and streamline your development workflow.", level: "beginner", popular: true, 8 modules, 10h 12m) and `course.typescript-deep-dive` (slug: "typescript-deep-dive", title: "TypeScript Deep Dive", summary: "Go beyond the basics and write safer, more expressive code.", level: "intermediate", popular: true, 10 modules, 14h 36m) into the Sanity dataset.
   - Together with `course.nextjs-for-production`, the top 3 featured/popular courses from `getCourses()` will match the 3 cards in `Screenshot 2026-09-05 205600.png` 1:1.
3. **Dynamic Icon & Metadata Resolution**:
   - `CourseGrid` dynamically resolves the appropriate technology icon based on the course slug/title:
     - Next.js: Metallic/black Next.js "N" logo component.
     - Docker: Vector Docker container whale illustration.
     - TypeScript: Blue "TS" logo badge.
     - Other courses: Fallback to Sanity cover image or styled course badge.
   - Formats `course.totalDurationSeconds` using `formatDuration()` from `sanity/lib/helpers.ts`.
   - Capitalizes `course.level` (e.g. `Intermediate`, `Beginner`).
   - Dynamically displays `${course.moduleCount} modules`.
   - Each card links dynamically to `/courses/${course.slug}`.

---

## Files to Touch / Create
- `studio/scripts/seed/seed-home-courses.cjs`: Seed script to ensure `course.docker-essentials` and `course.typescript-deep-dive` are published in Sanity.
- `app/page.tsx`: Server Component fetching courses via `getCourses()` and passing them to `CourseGrid`.
- `components/home/course-grid.tsx`: Update to accept `courses?: CourseCardData[]` and render dynamic courses from Sanity with icon mapping and fallback.

---

## Security Considerations
- Data fetching occurs strictly on the server via `sanityFetch` and private `SANITY_API_READ_TOKEN`.
- No tokens or sensitive data are exposed to the client bundle.

---

## Acceptance Criteria
- [ ] `app/page.tsx` fetches courses from Sanity using `getCourses()`.
- [ ] `CourseGrid` displays courses dynamically fetched from Sanity content.
- [ ] The 3 cards matching `Screenshot 2026-09-05 205600.png` ("Next.js for Production", "Docker Essentials", "TypeScript Deep Dive") render with correct titles, descriptions, metadata (level, duration, modules), and icons.
- [ ] Clicking any of the 3 course cards navigates to its corresponding `/courses/[slug]` detail page.
- [ ] `npm run lint` and `npm run build` pass with 0 errors.

---

## Checks to Run
1. Run `node studio/scripts/seed/seed-home-courses.cjs` to verify all 3 home courses exist in Sanity.
2. `npm run lint` — ESLint verification with 0 errors.
3. `npm run build` — Next.js production build verification with 0 errors.
4. HTTP response verification on `http://localhost:3000/`.

---

## Manual Test Steps
1. Start the dev server (`npm run dev`) and visit `http://localhost:3000/`.
2. Verify that the "All Courses" section renders 3 cards fetched from Sanity:
   - "Next.js for Production" (Next.js "N" icon, Intermediate, 18h 24m, 12 modules).
   - "Docker Essentials" (Docker whale icon, Beginner, 10h 12m, 8 modules).
   - "TypeScript Deep Dive" (TypeScript "TS" icon, Intermediate, 14h 36m, 10 modules).
3. Click on "Next.js for Production" and confirm navigation to `/courses/nextjs-for-production`.
4. Click on "Docker Essentials" and confirm navigation to `/courses/docker-essentials`.
5. Click on "TypeScript Deep Dive" and confirm navigation to `/courses/typescript-deep-dive`.
