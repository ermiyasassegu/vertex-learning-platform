# Implementation Prompt: Fix Syntax Error in Courses Catalog

## Goal
Fix the ECMAScript / JSX parsing syntax error in `components/courses/courses-catalog.tsx`:
```text
Error: Expected '</', got 'ident'
  258 |                 posthog.capture("course_category_filtered", { category: nextCategory });
  259 |               }}
> 260 |               className={`px-4 py-2 rounded-full text-xs sm:text-sm font-medium trans...
```
This error occurred because accidental characters (`${`}, {`) were introduced on line 237 into the `className` template literal of the "All" category filter button.

---

## Skills Read
- `AGENTS.md` (Sections 2, 6, 7, 13)
- Next.js App Router guidelines (`node_modules/next/dist/docs/`)

---

## Code & Config Inspected
- `components/courses/courses-catalog.tsx`:
  - Line 237 currently contains:
    ```tsx
    className={`px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-150 shrink-0 cursor-pointer ${`}, {
      selectedCategory === "all"
        ? "bg-[#0F172A] text-white shadow-sm"
        : "bg-white text-[#64748B] hover:text-[#0F172A] border border-[#E2E8F0] hover:border-[#CBD5E1]"
    }`}
    ```
  - The extraneous `` `}, { `` breaks the template string and causes the JSX parser to fail on subsequent tokens.

---

## Decisions & Assumptions
1. Remove the stray `` `}, { `` on line 237 of `components/courses/courses-catalog.tsx`.
2. Restore the proper template literal interpolation:
   ```tsx
   className={`px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-150 shrink-0 cursor-pointer ${
     selectedCategory === "all"
       ? "bg-[#0F172A] text-white shadow-sm"
       : "bg-white text-[#64748B] hover:text-[#0F172A] border border-[#E2E8F0] hover:border-[#CBD5E1]"
   }`}
   ```
3. Ensure the PostHog capture logic added to the buttons remains intact and syntactically valid.

---

## Files to Touch
- `components/courses/courses-catalog.tsx`

---

## Requirements
- Fix the syntax error in `components/courses/courses-catalog.tsx`.
- Ensure TypeScript compilation and ESLint pass without parsing errors.

---

## Security Considerations
- Client-side code change only affecting styling / JSX parsing and existing PostHog event logging. No secrets or tokens are exposed.

---

## Acceptance Criteria
- [ ] `components/courses/courses-catalog.tsx` parses cleanly without ECMAScript syntax errors.
- [ ] `npx tsc --noEmit` and `npm run lint` succeed without errors.
- [ ] Catalog page (`/courses`) loads and functions properly (category filtering and course navigation).

---

## Checks to Run
1. Type check: `npx tsc --noEmit`
2. Lint: `npm run lint`
3. Build check: `npm run build`

---

## Exact Manual Test Steps
1. Run `npm run dev` (or visit running dev server at `http://localhost:3000/courses`).
2. Navigate to `/courses`.
3. Verify that the course catalog renders with all category pills ("All", "Backend", "Full Stack", etc.).
4. Click on category filter pills and verify active styling toggles without errors.
