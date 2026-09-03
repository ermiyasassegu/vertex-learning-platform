# Implementation Prompt: Remove Embedded Studio Remnants from Web App

## Goal
Complete the full removal of embedded studio remnants from the Next.js web application. Clean up legacy schema types and desk structure from the root `sanity/` directory (now exclusively maintained in `studio/`), update Stega studio URL configuration to reference the standalone Studio at `http://localhost:3333`, and verify clean separation between web data layer and studio authoring workspace.

---

## Skills Referenced
- `sanity-best-practices` (`.agents/skills/sanity-best-practices/SKILL.md`)
  - `references/project-structure.md` (Standalone Studio & Monorepo patterns)
  - `references/nextjs.md` (Standalone Studio migration & Stega configuration)
- `AGENTS.md` (Sections 5, 6, 12, 13)

---

## Code & Config Inspected
- `sanity/`: Contains `env.ts`, `types.ts`, `lib/` (client, fetch, queries, live, image, token, helpers), as well as residual `schemaTypes/` and `structure.ts` which are now housed in `studio/`.
- `sanity/lib/client.ts`: Currently points `stega.studioUrl` to legacy `/studio` route instead of standalone studio URL.
- `studio/`: Contains full standalone studio workspace with schema types, structure, and config.

---

## Decisions & Assumptions
1. **Root `sanity/` Directory Scope**:
   - Retain solely the server-side data access layer (`sanity/lib/`), environment loader (`sanity/env.ts`), and TypeScript domain definitions (`sanity/types.ts`).
   - Remove root `sanity/schemaTypes/` and `sanity/structure.ts`.
2. **Stega Configuration**:
   - Update `stega.studioUrl` in `sanity/lib/client.ts` to `process.env.NEXT_PUBLIC_SANITY_STUDIO_URL || 'http://localhost:3333'` to support Visual Editing overlays pointing to the standalone Studio.
3. **Environment Documentation**:
   - Add `NEXT_PUBLIC_SANITY_STUDIO_URL` to `.env.example`.

---

## Files to Touch / Remove
- Remove: `sanity/schemaTypes/` (all files: `index.ts`, `course.ts`, `module.ts`, `lesson.ts`, `instructor.ts`, `category.ts`, `learningOutcome.ts`, `resource.ts`, `blockContent.ts`)
- Remove: `sanity/structure.ts`
- Modify: `sanity/lib/client.ts`
- Modify: `.env.example`

---

## Requirements & Acceptance Criteria
- [ ] Residual `sanity/schemaTypes/` and `sanity/structure.ts` removed from root.
- [ ] `sanity/lib/client.ts` updated to reference `http://localhost:3333` for `stega.studioUrl`.
- [ ] `.env.example` updated with `NEXT_PUBLIC_SANITY_STUDIO_URL`.
- [ ] `npm run build` runs with 0 errors.

---

## Verification & Checks to Run
1. `npm run build` in web workspace.

---

## Manual Test Steps
1. Run `npm run build` and ensure Next.js builds cleanly.
2. Verify root `sanity/` only contains `env.ts`, `types.ts`, and `lib/`.
3. Verify `studio/` contains all active schema types and desk structure.
