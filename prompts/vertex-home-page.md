# Implementation Prompt: Vertex Home Page

## Goal
Implement the production-ready Vertex Home Page (`/`) matching the provided design specification in `design/vertex-home.png`. This includes the top navigation header with user avatar, the hero section with the "Intelligent Learning" badge, serif headline, search bar with `⌘ K` keyboard shortcut, the "All Courses" grid featuring Next.js, Docker, and TypeScript courses, the weekly updates banner, and the decorative warm gradient equalizer graphic at the bottom.

---

## Skills Referenced
- `sanity-best-practices` (`.agents/skills/sanity-best-practices/SKILL.md`)
- `content-modeling-best-practices` (`.agents/skills/content-modeling-best-practices/SKILL.md`)
- Next.js App Router and Tailwind CSS v4 patterns

---

## Code & Config Inspected
- `design/vertex-home.png`: Source of truth for visual layout, typography, spacing, components, and colors.
- `app/layout.tsx`: Root layout importing `Inter` and `Playfair_Display` Google Fonts.
- `app/globals.css`: Tailwind v4 theme configuration with primary colors (`#F97316`, `#FB923C`, etc.), neutral colors, and typography utility classes.
- `components/ui/*`: Existing design system components (`CourseCard`, `Navigation`, `Button`, `Badge`, `Input`, `ProgressBar`, `VertexLogo`).
- `app/page.tsx`: Existing Design System showcase (to be relocated to `/design-system` so no work is lost).

---

## Decisions & Assumptions
1. **Design System Preservation**:
   - Move existing design system showcase to `app/design-system/page.tsx` so all component documentation and design tokens remain accessible.
   - Implement the new Vertex Home Page at `app/page.tsx`.

2. **Visual Fidelity & Typography**:
   - **Hero Headline**: `Playfair Display` serif font (`text-display-1` / 48px–56px bold), text centered, deep `#0F172A`.
   - **Hero Tag**: "INTELLIGENT LEARNING" pill badge with uppercase tracked text, soft orange background (`#FFEEE5`), border (`#FED7AA`), and orange text (`#F97316`).
   - **Subtitle**: `Inter` sans-serif, `#64748B`, 16px/24px leading.
   - **Primary CTA**: "Explore Courses →" button with `#F97316` background, white text, subtle hover lift and arrow icon.
   - **Search Input**: Prominent search bar with magnifying glass icon, placeholder `"Ask anything about your learning..."`, and `⌘ K` shortcut badge. Includes keyboard listener for `Cmd+K` / `Ctrl+K` to focus the search input.
   - **Course Cards**:
     - Card 1: **Next.js for Production** (Next.js "N" logo badge, Intermediate, 18h 24m, 12 modules).
     - Card 2: **Docker Essentials** (Docker whale logo illustration, Beginner, 10h 12m, 8 modules).
     - Card 3: **TypeScript Deep Dive** (TypeScript "TS" logo badge, Intermediate, 14h 36m, 10 modules).
     - Course card titles styled in `Playfair Display` serif matching `vertex-home.png`.
   - **Weekly Updates Banner**: Star icon outline (`#F97316`), `"New courses and lessons added every week."` with horizontal divider lines on both sides.
   - **Bottom Graphic**: Warm peach/orange gradient equalizer / bar-chart wave visual fading gracefully into the footer.
   - **Background Texture**: Subtle diagonal striped hatching pattern on side margins matching the reference canvas.

3. **Responsiveness**:
   - Responsive layout adapting seamlessly from mobile (single column stack, compact search) to tablet (2-col grid) and desktop (3-col course grid, max-w-6xl container).

---

## Files to Touch / Create
- `app/design-system/page.tsx`: Move previous design system showcase here.
- `app/page.tsx`: Main Vertex Home Page implementation.
- `components/home/hero-section.tsx`: Hero section with search input and CTA.
- `components/home/course-grid.tsx`: "All Courses" section with course cards and custom icons.
- `components/home/weekly-banner.tsx`: Weekly updates banner with divider lines.
- `components/home/decorative-footer.tsx`: Bottom gradient equalizer graphic.
- `components/home/home-header.tsx`: Header navigation with logo, Courses/My Learning links, notifications bell, and user avatar.
- `components/ui/course-card.tsx`: Enhance with serif title variant and custom icon container options.

---

## Requirements & Acceptance Criteria
- [x] Header matches `vertex-home.png`: Vertex logo, "Courses", "My Learning", notification bell icon, and circular user avatar.
- [x] Hero section displays "INTELLIGENT LEARNING" pill, "Search your learning in plain English." serif headline, subtitle, "Explore Courses →" CTA button, and interactive search input with `⌘ K`.
- [x] Search input focuses on clicking or pressing `Cmd+K` / `Ctrl+K`.
- [x] "All Courses" section features header with "View all courses →" link and 3 cards: Next.js for Production, Docker Essentials, and TypeScript Deep Dive.
- [x] Course cards feature custom technology icons, serif titles, concise descriptions, and metadata footer (level, duration, modules).
- [x] Weekly updates banner with star icon and dividing lines.
- [x] Bottom warm peach/orange gradient equalizer graphic rendered accurately.
- [x] Diagonal stripe texture on container margins.
- [x] Fully responsive across mobile, tablet, and desktop viewports.
- [x] `npm run build` and `npm run lint` execute with 0 errors.

---

## Security & Performance Considerations
- No sensitive keys or tokens exposed.
- Image assets and fonts optimized for zero layout shift (CLS).
- Accessible interactive elements (ARIA labels, keyboard navigation).

---

## Verification & Checks to Run
1. `npm run lint` — ESLint verification.
2. `npm run build` — Next.js production build verification.
3. Visual verification of all sections matching `vertex-home.png`.

---

## Manual Test Steps
1. Start dev server (`npm run dev`) and visit `http://localhost:3000`.
2. Verify Navigation: Vertex Logo, "Courses" and "My Learning" links, Bell icon, User Avatar.
3. Verify Hero: "INTELLIGENT LEARNING" badge, Serif headline, Subtitle, "Explore Courses →" button.
4. Verify Search Input: Click or press `Cmd+K` / `Ctrl+K` to confirm focus behavior.
5. Verify "All Courses" section: Check 3 course cards (Next.js, Docker, TypeScript) with accurate icons, titles, descriptions, and metadata.
6. Verify Weekly updates banner and bottom equalizer graphic.
7. Visit `http://localhost:3000/design-system` to ensure design system showcase remains fully functional.
8. Test responsiveness by resizing browser viewport from 375px to 1440px.
