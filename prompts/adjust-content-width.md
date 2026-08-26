# Implementation Prompt: Adjust Main Content Width to 1440px

## Goal
Ensure the main content layout and internal sections (Top Header, Course Cards Grid, Weekly Updates Banner, and Decorative Footer) take about 1440px (`max-w-[1440px]`) on desktop screens, expanding from the narrower 1152px (`max-w-6xl`) container while maintaining clean proportions, responsive scaling, and the diagonal stripe canvas framing.

---

## Skills Referenced
- `sanity-best-practices` (`.agents/skills/sanity-best-practices/SKILL.md`)
- Tailwind CSS v4 layout and container patterns

---

## Code & Config Inspected
- `app/page.tsx`: Root page wrapper with central content container currently using `max-w-[1400px]`.
- `components/home/home-header.tsx`: Header container currently using `max-w-6xl` (1152px).
- `components/home/course-grid.tsx`: Courses grid container currently using `max-w-6xl` (1152px).
- `components/home/weekly-banner.tsx`: Weekly updates banner container currently using `max-w-6xl` (1152px).
- `components/home/decorative-footer.tsx`: Decorative equalizer graphic container currently using `max-w-6xl` (1152px).

---

## Decisions & Assumptions
1. **Container Width Standardization**:
   - Update `app/page.tsx` central canvas container from `max-w-[1400px]` to `max-w-[1440px]`.
   - Update inner section containers in `home-header.tsx`, `course-grid.tsx`, `weekly-banner.tsx`, and `decorative-footer.tsx` to `max-w-[1440px]` so the content fills the full 1440px canvas seamlessly.
2. **Hero Section Proportions**:
   - Keep the hero title, subtitle, and search bar centered and comfortable for reading (`max-w-3xl` / `max-w-2xl`) while allowing the full page canvas to span 1440px.
3. **Course Cards Spacing**:
   - In `course-grid.tsx`, the 3 course cards will now expand across the 1440px container with generous padding and spacing (`gap-6` or `gap-8`) matching desktop layout standards.
4. **Framing & Responsiveness**:
   - On screens wider than 1440px, the subtle diagonal hatch pattern remains visible in the margins.
   - On screens below 1440px, the layout smoothly resizes with fluid horizontal padding.

---

## Files to Touch / Create
- `prompts/adjust-content-width.md`
- `app/page.tsx`: Update canvas max width to `max-w-[1440px]`.
- `components/home/home-header.tsx`: Update container to `max-w-[1440px]`.
- `components/home/course-grid.tsx`: Update container to `max-w-[1440px]` with balanced card spacing.
- `components/home/weekly-banner.tsx`: Update container to `max-w-[1440px]`.
- `components/home/decorative-footer.tsx`: Update container to `max-w-[1440px]`.

---

## Requirements & Acceptance Criteria
- [x] Main content container explicitly spans up to 1440px on desktop screens.
- [x] Header, Course Grid, Weekly Banner, and Decorative Footer all align to the 1440px grid.
- [x] Diagonal stripe texture remains cleanly displayed on viewport margins when screen width exceeds 1440px.
- [x] Fluid responsiveness maintained on tablet and mobile viewports.
- [x] `npm run lint` and `npm run build` pass with 0 errors.

---

## Security & Performance Considerations
- Pure CSS/Tailwind class adjustments with zero impact on bundle size or runtime performance.

---

## Verification & Checks to Run
1. `npm run lint` — ESLint check.
2. `npm run build` — Next.js production build verification.
3. Viewport width verification at 1440px, 1680px, and 1920px.

---

## Manual Test Steps
1. Run `npm run dev` and navigate to `http://localhost:3000`.
2. Inspect the main container in Developer Tools and confirm its rendered max-width is 1440px.
3. Verify that the Course Cards, Header, and Banner expand smoothly across the 1440px content area.
4. Verify that side margins show the subtle diagonal stripe pattern on displays >= 1440px.
5. Resize window down to tablet (768px) and mobile (375px) to verify responsive behavior.
