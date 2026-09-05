# Implementation Prompt: Fix Instructor Schema & Preview Configuration

## Goal
Fix schema type mismatches and preview configuration for the `instructor` document in Sanity Studio:
- Change `expertise` field from `string` to `array` of `string` (`options: { layout: 'tags' }`) to match stored dataset array values (e.g. `["React", "Next.js", "Web performance", "Rendering"]`).
- Change `bio` field from `text` (string) to `blockContent` (Portable Text blocks) to resolve the `"expected type string got array"` error in Sanity Studio.
- Update the `instructor` preview configuration in `studio/schemaTypes/instructor.ts` to cleanly format the `expertise` array into a formatted subtitle string (`expertise.join(' • ')`).
- Update TypeScript definitions in `sanity/types.ts` to reflect `expertise: string[]` and `bio: PortableTextBlock[]`.

---

## Skills Referenced
- `sanity-best-practices` (`.agents/skills/sanity-best-practices/SKILL.md`)
  - `references/schema.md`: Field definitions for array of strings with tag layout, Portable Text block arrays, and preview configuration.
- `AGENTS.md` (Sections 1, 2, 5, 8, 12, 13)

---

## Code & Config Inspected
- `studio/scripts/seed/seed.ndjson`: All 5 instructor documents store:
  - `expertise`: JSON array of strings (e.g. `["React", "Next.js", "Web performance", "Rendering"]`).
  - `bio`: JSON array of Portable Text blocks with `_type: 'block'`, `style: 'normal'`, mark definitions, and spans.
- `studio/schemaTypes/instructor.ts`: Currently defines `expertise` as `type: 'string'` and `bio` as `type: 'text'`. This triggers Sanity Studio document validation errors: `"expected type string got array"`.
- `studio/schemaTypes/blockContent.ts`: Registered `blockContent` Portable Text schema definition already present in Studio.
- `sanity/types.ts`: `Instructor` currently typed as `expertise?: string` and `bio?: string`.

---

## Decisions & Assumptions
1. **Schema Correction in Studio**:
   - Change `expertise` to `type: 'array'`, `of: [defineArrayMember({ type: 'string' })]`, with `options: { layout: 'tags' }`.
   - Change `bio` to `type: 'blockContent'` to support the stored Portable Text blocks and rich formatting.
2. **Preview Config**:
   - In `studio/schemaTypes/instructor.ts`, select `expertise: 'expertise'` and format it in `prepare({ title, expertise, media })`:
     - If `expertise` is an array: `expertise.join(' • ')`.
     - Fallback to `'Instructor'`.
3. **Web Types Sync**:
   - Update `Instructor` interface in `sanity/types.ts` so `expertise?: string[]` and `bio?: PortableTextBlock[]`.
   - Update `CourseCardData`, `CourseDetailData`, and `LessonPageData` nested instructor definitions to match.

---

## Files to Touch
- `studio/schemaTypes/instructor.ts`
- `sanity/types.ts`

---

## Security Considerations
- No authentication tokens or secrets modified.
- Schema definitions remain server/studio isolated.

---

## Requirements & Acceptance Criteria
- [ ] In `studio/schemaTypes/instructor.ts`:
  - [ ] `expertise` is defined as an array of strings.
  - [ ] `bio` is defined as `blockContent`.
  - [ ] `preview` configuration selects `expertise` and formats it gracefully into a readable string subtitle without errors.
- [ ] In `sanity/types.ts`:
  - [ ] `Instructor` reflects `expertise?: string[]` and `bio?: PortableTextBlock[]`.
- [ ] Studio builds cleanly (`npm --prefix studio run build`).
- [ ] Web workspace type check passes (`npx tsc --noEmit`).

---

## Checks to Run
1. Run `npm --prefix studio run build` in `vertex`.
2. Run `npx tsc --noEmit` in `vertex`.
3. Query Sanity document previews via GROQ to confirm schema compatibility:
   ```groq
   *[_type == "instructor"]{ name, expertise, "bioCount": count(bio) }
   ```

---

## Manual Test Steps
1. Start or open Sanity Studio (`npm run studio:dev`).
2. Navigate to **Instructors** in the desk menu.
3. Open any instructor document (e.g. *Mira Kovac* or *Daniel Okafor*).
4. Verify there are no schema validation errors ("expected type string got array").
5. Verify `expertise` renders as tags / array of strings.
6. Verify `bio` renders in the Portable Text editor.
7. Verify the list preview displays the instructor's photo, name, and joined expertise tags.
