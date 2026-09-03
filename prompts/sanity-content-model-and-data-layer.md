# Implementation Prompt: Sanity Content Model, Studio Configuration & Data Layer

## Goal
Implement the core content model in Sanity for the Vertex learning platform (Course, Module, Lesson, Instructor, Category, Learning Outcome, Resource, and Portable Text Notes), configure the Sanity Studio structure with appropriate icons and hierarchy, and create the server-side read client and type-safe GROQ data access layer.

---

## Skills Referenced
- `sanity-best-practices` (`.agents/skills/sanity-best-practices/SKILL.md`)
  - `references/schema.md` (Schema definition, `defineType`, `defineField`, `defineArrayMember`, icons, validation, reference vs embedded object patterns)
  - `references/groq.md` (GROQ queries with `defineQuery`, projections, reverse references, ordering, expansions)
  - `references/nextjs.md` (Server-side fetching, `defineLive`, server read tokens, Stega / clean data)
- `content-modeling-best-practices` (`.agents/skills/content-modeling-best-practices/SKILL.md`)
- `AGENTS.md` (Sections 5, 6, 7, 8, 12, 13)

---

## Code & Config Inspected
- `package.json`: Contains `sanity` (^5.31.2), `next-sanity` (^13.3.3), `@sanity/image-url` (^2.1.1), `@sanity/vision` (^5.31.2), `@sanity/icons`, `@portabletext/react`.
- `sanity.config.ts`: Configured with `/studio` base path, `projectId`, `dataset`, schema, `structureTool`, and `visionTool`.
- `sanity.cli.ts`: Cli configuration for project id and dataset.
- `sanity/env.ts`: Exposes `apiVersion`, `dataset`, and `projectId` with fallback defaults and assertions.
- `sanity/schemaTypes/index.ts`: Schema entrypoint currently empty (`types: []`).
- `sanity/structure.ts`: Studio structure builder configured with `S.documentTypeListItems()`.
- `sanity/lib/client.ts`: Basic client creation using `createClient`.
- `sanity/lib/image.ts`: Helper with `createImageUrlBuilder`.
- `sanity/lib/live.ts`: `defineLive` wrapper.
- `.env.local`: Contains `NEXT_PUBLIC_SANITY_DATASET="production"` and `NEXT_PUBLIC_SANITY_PROJECT_ID="5t2b9v1m"`.

---

## Decisions & Assumptions

1. **Content Schema Architecture (Strict conformance with AGENTS.md Section 8)**:
   - **Course (`course`) [Document]**:
     - `title`: string (required)
     - `slug`: slug with source `title` (required)
     - `summary`: text (marketing summary)
     - `coverImage`: image with `hotspot: true` and alt text
     - `level`: string with options (`beginner`, `intermediate`, `advanced`, `all-levels`), radio layout
     - `price`: number (min: 0, USD price, 0 for free)
     - `isPopular`: boolean flag for catalog badges
     - `studentCount`: number (display-only enrollment count)
     - `instructor`: reference to `instructor` (required)
     - `category`: reference to `category` (required)
     - `learningOutcomes`: array of embedded `learningOutcome` objects
     - `modules`: ordered array of embedded `module` objects
   - **Module (`module`) [Embedded Object]**:
     - Embedded object directly in `course` (not a separate document).
     - `title`: string (required)
     - `summary`: text
     - `lessons`: ordered array of references to `lesson` documents
     - Note: Module and lesson numbers (e.g., "Module 5", "Lesson 5.1") are derived from order at runtime/query-time, not stored.
   - **Lesson (`lesson`) [Document]**:
     - `title`: string (required)
     - `slug`: slug with source `title` (required)
     - `videoUrl`: url (YouTube, Vimeo, Bunny embed URL)
     - `thumbnail`: image with `hotspot: true` and alt text
     - `duration`: number (total duration in seconds for precise seeking and format calculation)
     - `isFreePreview`: boolean flag for free preview badge
     - `studentCount`: number (display-only learner count)
     - `notes`: array of Portable Text blocks (`block`, `image`, code blocks)
     - `keyPoints`: array of strings ("In this lesson you will" section)
     - `proTip`: text (optional instructor tip)
     - `resources`: array of embedded `resource` objects
     - Note: Lesson does not store parent course; parent course is resolved via reverse reference lookup in GROQ.
   - **Instructor (`instructor`) [Document]**:
     - `name`: string (required)
     - `slug`: slug with source `name` (required)
     - `photo`: image with `hotspot: true` and alt text
     - `expertise`: string (role/title, e.g. "Next.js Core Contributor")
     - `bio`: text (biography)
   - **Category (`category`) [Document]**:
     - `title`: string (required)
     - `slug`: slug with source `title` (required)
     - `description`: text
   - **Objects**:
     - `learningOutcome`: object with `title`, `description`, `icon` (Lucide icon identifier)
     - `resource`: object with `type` (link, github, download, tool), `title`, `description`, `url`
     - `blockContent`: Portable Text configuration for notes

2. **Studio Structure & Presentation**:
   - Custom structure in `sanity/structure.ts` with dedicated lists and icons for Courses (`BookIcon`), Lessons (`PlayIcon`), Instructors (`UserIcon`), and Categories (`TagIcon`).
   - Use individual `@sanity/icons/*` subpath imports for proper tree-shaking and bundler compatibility.

3. **Server-side Data Layer & Client**:
   - `sanity/lib/token.ts`: Reads `SANITY_API_READ_TOKEN` on server only.
   - `sanity/lib/client.ts`: Configures client with `projectId`, `dataset`, `apiVersion`, `useCdn: true`, and attaches server token when executed in a server context.
   - `sanity/lib/live.ts`: Integrates `defineLive` with server token for real-time live content updates.
   - `sanity/lib/queries.ts`: Comprehensive, optimized GROQ queries using `defineQuery`:
     - `COURSES_QUERY`: All published courses with instructor, category, module count, lesson count, total duration sum.
     - `COURSE_BY_SLUG_QUERY`: Single course by slug with expanded modules, resolved lessons, learning outcomes, instructor, category.
     - `COURSE_SLUGS_QUERY`: Slugs for static param generation.
     - `LESSON_BY_SLUG_QUERY`: Single lesson by slug with notes, key points, pro tip, resources, plus reverse reference to find parent course, full course module/lesson hierarchy for course navigation sidebar, next/prev lesson links.
     - `LESSON_SLUGS_QUERY`: Slugs for static param generation.
     - `INSTRUCTORS_QUERY` & `INSTRUCTOR_BY_SLUG_QUERY`: Instructor profiles and their associated courses.
     - `CATEGORIES_QUERY` & `CATEGORY_BY_SLUG_QUERY`: Categories and their associated courses.
   - `sanity/lib/fetch.ts`: Server-side data access functions (`getCourses`, `getCourseBySlug`, `getLessonBySlug`, `getInstructors`, `getInstructorBySlug`, `getCategories`, `getCategoryBySlug`) with type safety and formatting utilities.
   - `sanity/types.ts`: Full TypeScript definitions and interfaces for all content models and query results.
   - `sanity/lib/helpers.ts`: Runtime formatting helpers (duration, numbering).

4. **Environment & Security**:
   - Create `.env.example` documenting all required environment variables:
     - `NEXT_PUBLIC_SANITY_PROJECT_ID`
     - `NEXT_PUBLIC_SANITY_DATASET`
     - `NEXT_PUBLIC_SANITY_API_VERSION`
     - `SANITY_API_READ_TOKEN`
     - `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`
     - `CLERK_SECRET_KEY`
     - Clerk URL variables
   - Ensure `SANITY_API_READ_TOKEN` is never exposed with `NEXT_PUBLIC_` prefix and remains strictly server-side.

---

## Files to Touch / Create

### Create:
- `sanity/schemaTypes/course.ts`: Course document schema
- `sanity/schemaTypes/module.ts`: Module embedded object schema
- `sanity/schemaTypes/lesson.ts`: Lesson document schema
- `sanity/schemaTypes/instructor.ts`: Instructor document schema
- `sanity/schemaTypes/category.ts`: Category document schema
- `sanity/schemaTypes/learningOutcome.ts`: Learning outcome object schema
- `sanity/schemaTypes/resource.ts`: Resource object schema
- `sanity/schemaTypes/blockContent.ts`: Portable Text rich text schema for lesson notes
- `sanity/types.ts`: TypeScript interfaces and types for models and query responses
- `sanity/lib/token.ts`: Server-only token access helper
- `sanity/lib/queries.ts`: GROQ queries with `defineQuery`
- `sanity/lib/fetch.ts`: Server-side data fetching functions and helpers
- `sanity/lib/helpers.ts`: Runtime formatting helpers (duration, numbering)
- `.env.example`: Canonical environment variable list

### Modify:
- `sanity/schemaTypes/index.ts`: Register all schema definitions and objects
- `sanity/structure.ts`: Configure custom Studio structure with icons and document lists
- `sanity/lib/client.ts`: Update client to support server-only token and proper config
- `sanity/lib/live.ts`: Wire server token into `defineLive`
- `sanity/env.ts`: Provide clean fallback for api version and export helper

---

## Requirements & Acceptance Criteria

- [ ] All 5 core content types + supporting object types implemented according to specification:
  - `course` (Document): title, slug, summary, coverImage, level, price, isPopular, studentCount, learningOutcomes, instructor ref, category ref, modules array.
  - `module` (Object): title, summary, lessons array (references to `lesson`).
  - `lesson` (Document): title, slug, videoUrl, thumbnail, duration, isFreePreview, studentCount, notes (Portable Text), keyPoints, proTip, resources array.
  - `instructor` (Document): name, slug, photo, expertise, bio.
  - `category` (Document): title, slug, description.
  - `learningOutcome` (Object): title, description, icon.
  - `resource` (Object): type, title, description, url.
  - `blockContent` (Object): Portable Text definitions.
- [ ] Schema registered in `sanity/schemaTypes/index.ts`.
- [ ] Custom Studio structure defined in `sanity/structure.ts` with icons from `@sanity/icons`.
- [ ] TypeScript types created in `sanity/types.ts`.
- [ ] GROQ queries created in `sanity/lib/queries.ts` with `defineQuery`.
- [ ] Server-side data access layer implemented in `sanity/lib/fetch.ts` with reverse reference lookups.
- [ ] `.env.example` created with all client and server variables.
- [ ] Server token kept secure and never exposed to browser.
- [ ] TypeScript check and linting pass with 0 errors.

---

## Security Considerations
- `SANITY_API_READ_TOKEN` must never have a `NEXT_PUBLIC_` prefix and must only be read in server modules.
- Browser client never executes raw write mutations or exposes private API tokens.
- All URL fields validate protocols (`http`, `https`) to prevent script injection via `javascript:` URI schemes.

---

## Verification & Checks to Run
1. `npx tsc --noEmit` to verify type safety across all schema definitions and queries.
2. `npm run lint` to verify ESLint compliance.
3. `npm run build` to verify production Next.js compilation including Studio routes.

---

## Manual Test Steps
1. Navigate to `http://localhost:3000/studio`.
2. Verify Studio loads with navigation sections for Courses, Lessons, Instructors, and Categories with correct icons.
3. Create a test Category (e.g. "Frontend Engineering").
4. Create a test Instructor (e.g. "Sarah Chen").
5. Create a test Lesson (e.g. "Introduction to Server Components") with duration, video URL, key points, resources, and notes.
6. Create a test Course (e.g. "Advanced Next.js Architecture") referencing the category, instructor, and containing a module referencing the lesson.
7. Verify GROQ queries in the Vision Tool (`/studio/vision`) fetch the course with expanded modules, lessons, and instructor details.
