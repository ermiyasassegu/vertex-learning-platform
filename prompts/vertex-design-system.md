# Implementation Prompt: Vertex Design System

## Goal
Implement the complete Vertex Design System based on `design/vertex-designsystem.png` (Version 1.0 • May 2025). This establishes the visual design tokens, typography, component primitives, and an interactive showcase page for the Vertex AI-powered learning platform.

---

## Skills Referenced
- `sanity-best-practices` (`.agents/skills/sanity-best-practices/SKILL.md`)
- `content-modeling-best-practices` (`.agents/skills/content-modeling-best-practices/SKILL.md`)
- Next.js documentation and Tailwind CSS patterns

---

## Code & Config Inspected
- `package.json`: Next.js 16.3.2 (App Router), React 19, Tailwind CSS v4, Lucide React, clsx, tailwind-merge.
- `app/globals.css`: Base Tailwind CSS v4 setup.
- `app/layout.tsx`: Root layout with font imports.
- `app/page.tsx`: Landing page / showcase container.
- `design/vertex-designsystem.png`: Definitive design system spec sheet.

---

## Decisions & Assumptions
1. **Tailwind CSS v4 Configuration**: Define custom theme tokens in `app/globals.css` matching exact hex codes and type scales from `vertex-designsystem.png`:
   - **Primary Palette**:
     - `primary-500`: `#F97316`
     - `primary-400`: `#FB923C`
     - `primary-300`: `#FDBA74`
     - `primary-200`: `#FED7AA`
     - `primary-100`: `#FFEEE5`
   - **Neutral Palette**:
     - `neutral-900`: `#0F172A`
     - `neutral-700`: `#334155`
     - `neutral-500`: `#64748B`
     - `neutral-300`: `#CBD5E1`
     - `neutral-200`: `#E2E8F0`
     - `neutral-100`: `#F1F5F9`
     - `neutral-50`: `#FAFAFC`
     - `white`: `#FFFFFF`
   - **Radius**:
     - `radius-xs`: 4px
     - `radius-sm`: 8px
     - `radius-md`: 12px
     - `radius-lg`: 16px
     - `radius-xl`: 24px
     - `radius-full`: 9999px
   - **Shadows**:
     - `shadow-sm`: `0 1px 2px 0 rgba(15, 23, 42, 0.05)`
     - `shadow-md`: `0 4px 12px -2px rgba(15, 23, 42, 0.08)`
     - `shadow-lg`: `0 12px 24px -4px rgba(15, 23, 42, 0.10)`
     - `shadow-xl`: `0 20px 40px -8px rgba(15, 23, 42, 0.12)`
2. **Typography**:
   - Headings / Display: `Playfair Display` (configured via `next/font/google`)
   - Body / UI: `Inter` (configured via `next/font/google`)
   - Type scale utilities:
     - `display-1`: 48px / line-height 56px / Bold (700)
     - `display-2`: 36px / line-height 44px / Bold (700)
     - `heading-1`: 28px / line-height 36px / SemiBold (600)
     - `heading-2`: 22px / line-height 30px / SemiBold (600)
     - `heading-3`: 18px / line-height 26px / Medium (500)
     - `body-large`: 16px / line-height 24px / Regular (400)
     - `body`: 14px / line-height 20px / Regular (400)
     - `small`: 12px / line-height 16px / Regular (400)
3. **Modular Component Library**:
   Create clean, reusable components in `components/ui/`:
   - `Button`: Primary, Secondary, Tertiary, Text variants; default/hover/disabled states; with icon support.
   - `Badge`: Video (red/orange tint), Lesson (blue tint), Popular (amber tint).
   - `Input` & `SearchInput`: 44px height, 12px radius, icon & `⌘ K` keyboard badge.
   - `Select`: 44px height, 12px radius, chevron icon.
   - `StatusIndicator`: In Progress (orange ring), Completed (green check), Now Playing (orange play), Locked (slate lock).
   - `ProgressBar`: 8px bar with fill and percentage label.
   - `Cards`:
     - `CourseCard`: Header with logo badge, title, description, level/duration/modules footer.
     - `LessonCard`: Video variant (with timestamp & "Watch from" button) and Lesson variant (with module tag & "View lesson" button).
     - `ResourceCard`: Document icon, title, description, file type & size, external link icon.
   - `Navigation`: Vertex Logo (orange V icon + brand name), navigation links with active state.
   - `Breadcrumbs`: Path navigation with chevron separators.
   - `Pagination`: Previous/next controls, page numbers, active page indicator.
   - `PrinciplesCard`: 4 core principle items with icons and descriptions.
4. **Interactive Design System Showcase**:
   Render the full design system layout matching `vertex-designsystem.png` section-by-section (01 Colors through 14 Principles) on the main page (`app/page.tsx`).

---

## Files to Touch / Create
- `lib/utils.ts`: `cn` classnames merger utility.
- `app/globals.css`: Theme variables, font definitions, and custom utility classes.
- `app/layout.tsx`: Font loading (`Playfair_Display` and `Inter`).
- `components/ui/button.tsx`: Button component primitives.
- `components/ui/badge.tsx`: Badge component primitives.
- `components/ui/input.tsx`: Input and Search input components.
- `components/ui/select.tsx`: Select dropdown component.
- `components/ui/status-indicator.tsx`: Status badges & indicators.
- `components/ui/progress-bar.tsx`: Progress bar component.
- `components/ui/course-card.tsx`: Course card component.
- `components/ui/lesson-card.tsx`: Lesson cards (Video & Text lesson variants).
- `components/ui/resource-card.tsx`: Resource card component.
- `components/ui/navigation.tsx`: Header navigation and Vertex Logo.
- `components/ui/breadcrumbs.tsx`: Breadcrumb trail component.
- `components/ui/pagination.tsx`: Pagination component.
- `components/ui/principles.tsx`: Core design principles component.
- `app/page.tsx`: Interactive showcase presenting all 14 design system sections.

---

## Requirements & Acceptance Criteria
- [x] Exact color palette match (`Primary 100-500`, `Neutral 50-900`, `White`).
- [x] Exact font integration: `Playfair Display` for Display styles, `Inter` for Headings and Body.
- [x] Spacing scale (4px base) and Border radius scales (4px, 8px, 12px, 16px, 24px, Full) properly defined.
- [x] Box shadows matching specs (`Sm`, `Md`, `Lg`, `Xl`).
- [x] Button variants (`Primary`, `Secondary`, `Tertiary`, `Text`) with Default, Hover, and Disabled states.
- [x] Badges for `VIDEO`, `LESSON`, `POPULAR`.
- [x] Status indicators for `In Progress`, `Completed`, `Now Playing`, `Locked`.
- [x] Progress bar with fill indicator and percentage.
- [x] Search input with `⌘ K` badge and select dropdown.
- [x] Course Card, Video Lesson Card, Standard Lesson Card, and Resource Card components matching visual specs.
- [x] Breadcrumbs, Navigation header with Vertex logo, and Pagination component.
- [x] Principles section showcasing the 4 core design tenets.
- [x] Pixel-perfect responsiveness down to mobile screens.
- [x] `npm run build` and `npm run lint` execute with 0 errors.

---

## Security & Performance Considerations
- No client-side tokens or private keys exposed.
- Fonts loaded via `next/font/google` with `display: swap` for zero layout shift (CLS).
- Lightweight modular components using Tailwind utility classes.

---

## Verification & Checks to Run
1. `npm run lint` — ESLint verification.
2. `npm run build` — Next.js production build verification.
3. Dev server visual verification of all 14 design system sections.

---

## Manual Test Steps
1. Run `npm run dev` and navigate to `http://localhost:3000`.
2. Verify Header and title "Design System" in Playfair Display.
3. Verify Color Palette grid (01 Colors) displaying all Primary and Neutral swatches with hex values.
4. Verify Typography scale samples (02 Typography & 03 Type Scale) with exact line heights and font weights.
5. Verify Spacing and Radius/Shadows preview cards (04 & 05).
6. Verify Icon grid (06 Icons) with 24x24 outline and filled icons.
7. Verify Buttons matrix (07 Buttons) across Primary, Secondary, Tertiary, Text with hover/disabled states.
8. Verify Inputs (08) including Search with `⌘ K` and Select dropdown.
9. Verify Badges & Status Indicators (09 & 10) and Progress Bar (11).
10. Verify all 4 Card variants (12 Cards): Course Card, Lesson Card (Video), Lesson Card (Lesson), and Resource Card.
11. Verify Navigation, Breadcrumbs, and Pagination (13).
12. Verify Principles cards (14).
