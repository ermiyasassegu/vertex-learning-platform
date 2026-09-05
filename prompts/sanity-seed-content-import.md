# Implementation Prompt: Sanity Sample Content Seed & Relational Consistency Verification

## Goal
Seed and verify the Sanity `production` dataset for project `5t2b9v1m` with sample content:
- A handful of instructors (5) and categories (6).
- At least 10 different courses related to programming, development, AI, data, systems, and security.
- Ensure strict relational consistency across the content hierarchy:
  - Each course equals the sum of its modules (4 modules per course, 40 modules total).
  - Each module equals the sum of its lessons (3 lessons per module, 12 lessons per course, 120 lessons total).
  - Course total duration equals the mathematical sum of its constituent lesson durations (`math::sum(modules[].lessons[]->duration)`).
  - Zero dangling references (all course-to-module-to-lesson, course-to-instructor, and course-to-category references resolve).
  - Cross-course search and catalog have rich real-world data (portable text notes, key points, resources, durations, video URLs, and thumbnails).

---

## Skills Referenced
- `sanity-best-practices` (`.agents/skills/sanity-best-practices/SKILL.md`)
  - `references/schema.md`: Content schema definitions (`course`, `module`, `lesson`, `instructor`, `category`, `blockContent`)
  - `references/groq.md`: GROQ query patterns for aggregated duration, module count, lesson count, and relational integrity
- `sanity-migration` (`.agents/skills/sanity-migration/SKILL.md`)
  - `references/general.md`: Sanity CLI dataset import, idempotent document replacement (`--replace`), asset handling, and post-import verification
- `AGENTS.md` (Sections 1, 2, 5, 8, 11, 12, 13)

---

## Code & Config Inspected
- `studio/scripts/seed/seed.ndjson`: 141 production-ready Sanity documents:
  - 6 `category` documents: Web Development, Languages, AI Engineering, Data, Backend & Infrastructure, Security
  - 5 `instructor` documents: Mira Kovac, Daniel Okafor, Priya Raman, Tomas Berg, Alina Costa
  - 10 `course` documents covering modern software development and AI:
    1. Next.js App Router in Depth (Web Development, Mira Kovac)
    2. React Performance Engineering (Web Development, Mira Kovac)
    3. TypeScript for Application Developers (Languages, Daniel Okafor)
    4. Building AI Apps with LLMs (AI Engineering, Priya Raman)
    5. Retrieval-Augmented Generation from Scratch (AI Engineering, Priya Raman)
    6. Python for Data Work (Data, Tomas Berg)
    7. System Design Foundations (Backend & Infrastructure, Tomas Berg)
    8. PostgreSQL for Developers (Data, Daniel Okafor)
    9. DevOps with Docker and Kubernetes (Backend & Infrastructure, Alina Costa)
    10. Practical Web Security (Security, Alina Costa)
  - 120 `lesson` documents containing rich Portable Text `notes`, `keyPoints`, `resources`, `duration` in seconds, and `videoUrl`.
- `studio/scripts/seed/videos.json`: 120 source video metadata records matching the 120 lessons 1:1.
- `studio/sanity.cli.ts` & `studio/sanity.config.ts`: Configured for project `5t2b9v1m` and dataset `production`.
- `sanity/lib/queries.ts`: `COURSES_QUERY` and `COURSE_BY_SLUG_QUERY` deriving:
  - `"moduleCount": count(modules)`
  - `"lessonCount": count(modules[].lessons[])`
  - `"totalDurationSeconds": math::sum(modules[].lessons[]->duration)`
- Live Sanity `production` dataset inspection:
  - Verified 6 categories, 5 instructors, 10 courses, 120 lessons, and 136 image assets exist.
  - Verified each course resolves 4 modules and 12 lessons without any broken references.
  - Verified zero orphan lessons exist (all 120 lessons are referenced by a parent course).

---

## Decisions & Assumptions
1. **Source File Immutability**:
   - `studio/scripts/seed/seed.ndjson` and `studio/scripts/seed/videos.json` represent the clean dataset designed for Vertex. They will remain untouched.
2. **Idempotent CLI Import & Verification**:
   - Ensure the `production` dataset is in sync with `seed.ndjson` using the Sanity CLI import:
     ```bash
     node ./node_modules/sanity/bin/sanity datasets import scripts/seed/seed.ndjson production --replace --allow-failing-assets
     ```
   - Using `--replace` ensures idempotency without duplicating documents.
3. **Rigorous Relational Consistency Auditing**:
   - Run automated GROQ queries to verify:
     1. Total document counts match exactly: 6 categories, 5 instructors, 10 courses, 120 lessons.
     2. Every course contains exactly 4 modules.
     3. Every module contains ordered lesson references.
     4. Every course contains exactly 12 resolved lessons (`count(modules[].lessons[]->{_id}) == 12`).
     5. Every lesson belongs to a course (zero unreferenced lessons).
     6. Every course references a valid instructor and a valid category.
     7. Every course's total duration equals the mathematical sum of its constituent lesson durations.
     8. Cross-course search readiness: every lesson contains searchable text fields (`title`, `notes` portable text, `keyPoints`).

---

## Files to Touch
- `prompts/sanity-seed-content-import.md` (this implementation prompt)
- No code or seed files will be modified.

---

## Security Considerations
- **CLI Authentication**: Uses the developer's local authenticated CLI credentials. No API write tokens are stored in the repo or committed.
- **Dataset Scope**: Strictly targets `production` on project `5t2b9v1m`.
- **Client & Secret Boundaries**: Adheres to `AGENTS.md` sections 5 and 12; tokens remain on the server and are never exposed to browser or client code.

---

## Requirements & Acceptance Criteria
- [ ] 6 categories and 5 instructors seeded and verified in Sanity.
- [ ] 10 distinct courses covering programming, development, AI, databases, DevOps, and security seeded and verified.
- [ ] 120 lessons seeded with titles, durations, video URLs, and Portable Text notes.
- [ ] Relational consistency satisfied:
  - [ ] Every course has 4 modules (`count(modules) == 4`).
  - [ ] Every module has 3 lesson references (`count(modules[].lessons[]) == 12` per course).
  - [ ] Sum of module lessons equals course lesson count (12 lessons per course * 10 courses = 120 lessons).
  - [ ] All lesson references resolve to existing lesson documents.
  - [ ] Zero unreferenced/orphan lessons.
  - [ ] Each course has valid instructor and category references.
  - [ ] `totalDurationSeconds` matches `math::sum(modules[].lessons[]->duration)` for every course.
- [ ] Source files `studio/scripts/seed/seed.ndjson` and `studio/scripts/seed/videos.json` remain unmodified.

---

## Checks to Run
1. Sanity CLI import execution:
   ```bash
   cd studio && node ./node_modules/sanity/bin/sanity datasets import scripts/seed/seed.ndjson production --replace --allow-failing-assets
   ```
2. Document count check:
   ```groq
   {
     "categories": count(*[_type == "category"]),
     "instructors": count(*[_type == "instructor"]),
     "courses": count(*[_type == "course"]),
     "lessons": count(*[_type == "lesson"]),
     "imageAssets": count(*[_type == "sanity.imageAsset"])
   }
   ```
3. Relational integrity audit query:
   ```groq
   *[_type == "course"]{
     title,
     "moduleCount": count(modules),
     "lessonCount": count(modules[].lessons[]),
     "resolvedLessons": count(modules[].lessons[]->{_id}),
     "totalDurationSeconds": math::sum(modules[].lessons[]->duration),
     "hasInstructor": defined(instructor->{_id}),
     "hasCategory": defined(category->{_id})
   }
   ```
4. Orphan lesson query:
   ```groq
   *[_type == "lesson" && !defined(*[_type == "course" && references(^._id)][0])]{ _id, title }
   ```
5. `git status` check confirming no seed or code regressions.

---

## Manual Test Steps
1. In `studio`, run or open Sanity Studio.
2. In Sanity Studio navigation, browse:
   - **Courses**: Open any course (e.g. *Building AI Apps with LLMs*). Verify title, summary, level, instructor reference, category reference, learning outcomes, and the 4 modules.
   - **Modules**: Inspect each module to confirm it contains 3 lesson references.
   - **Lessons**: Open a lesson to confirm videoUrl, duration, thumbnail, keyPoints, and rich Portable Text notes.
   - **Instructors**: Verify all 5 instructors have photos, expertise, and bios.
   - **Categories**: Verify all 6 categories have titles and descriptions.
3. Verify GROQ query execution confirms 0 broken references and 0 orphan lessons.

