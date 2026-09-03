# Implementation Prompt: Standalone Sanity Studio Workspace

## Goal
Extract and configure Sanity Studio as an independent, standalone workspace located in `studio/` with its own `package.json`, TypeScript configuration, Vite-compatible environment variables (`SANITY_STUDIO_*`), schema types, and structure. Simultaneously, decouple Next.js by removing the embedded studio route (`app/studio/[[...tool]]`) and maintaining the web server-side data access layer in `sanity/lib/`.

---

## Skills Referenced
- `sanity-best-practices` (`.agents/skills/sanity-best-practices/SKILL.md`)
  - `references/project-structure.md` (Standalone Studio and monorepo structure)
  - `references/nextjs.md` (Standalone Studio setup vs embedded studio migration)
  - `references/schema.md` (Strict schema definitions and icon imports)
  - `references/typegen.md` (TypeGen CLI config)
- `content-modeling-best-practices` (`.agents/skills/content-modeling-best-practices/SKILL.md`)
- `AGENTS.md` (Sections 5, 6, 12, 13)

---

## Code & Config Inspected
- `package.json`: Contains root dependencies including `sanity`, `@sanity/vision`, `@sanity/icons`, Next.js 16, React 19.
- `sanity.config.ts` (root): Currently mounted for embedded studio with `/studio` base path.
- `sanity.cli.ts` (root): Currently points to `NEXT_PUBLIC_SANITY_*` variables.
- `app/studio/[[...tool]]/page.tsx`: Embedded Studio Next.js catch-all page route.
- `sanity/schemaTypes/`: Schemas for `course`, `module`, `lesson`, `instructor`, `category`, `learningOutcome`, `resource`, and `blockContent`.
- `sanity/structure.ts`: Studio structure definition.
- `sanity/lib/`: Server-side client, data fetchers, queries, image builder, helpers, and types.

---

## Decisions & Assumptions

1. **Standalone Studio Workspace Structure (`studio/`)**:
   - Create a dedicated `studio/` directory containing:
     - `studio/package.json`: Independent package scripts (`dev`, `build`, `start`, `deploy`, `typegen`) with dependencies on `sanity`, `@sanity/vision`, `@sanity/icons`, `react`, `react-dom`, `styled-components`.
     - `studio/sanity.config.ts`: Configured with Vite/Sanity Studio conventions (`SANITY_STUDIO_PROJECT_ID`, `SANITY_STUDIO_DATASET`), plugins (`structureTool({ structure })`, `visionTool()`), schemas from `./schemaTypes`, and `title: 'Vertex Studio'`.
     - `studio/sanity.cli.ts`: Standalone CLI config reading `SANITY_STUDIO_*` env vars and configuring TypeGen.
     - `studio/schemaTypes/`: Clean content model definitions (`course.ts`, `module.ts`, `lesson.ts`, `instructor.ts`, `category.ts`, `learningOutcome.ts`, `resource.ts`, `blockContent.ts`, and `index.ts`).
     - `studio/structure.ts`: Custom desk structure with `@sanity/icons`.
     - `studio/tsconfig.json`: Independent TypeScript config tailored for Sanity Studio / Vite.
     - `studio/.env` / `studio/.env.example`: Following Vite/Studio convention `SANITY_STUDIO_PROJECT_ID="5t2b9v1m"` and `SANITY_STUDIO_DATASET="production"`.
     - `studio/.gitignore`: Ignoring `.sanity/`, `dist/`, `node_modules/`, `.env.local`.

2. **Web App Decoupling & Clean Data Layer**:
   - Remove the embedded studio page route `app/studio/[[...tool]]/page.tsx`.
   - Remove root-level `sanity.config.ts` and `sanity.cli.ts` to prevent ambiguity.
   - Retain and maintain `sanity/lib/` and `sanity/types.ts` in the web application for server-side read client, GROQ queries, and data access.
   - Add convenience scripts to root `package.json` for running the studio (`"studio:dev"`, `"studio:build"`).
   - Update `.env.example` in the root to clearly separate Web (`NEXT_PUBLIC_SANITY_*`) and Studio (`SANITY_STUDIO_*`) environment conventions.

3. **Port & Dev Isolation**:
   - Studio runs independently on port 3333 (`http://localhost:3333`) via `sanity dev`.
   - Web application runs independently on port 3000 (`http://localhost:3000`) via `next dev`.

---

## Files to Touch / Create / Remove

### Create in `studio/`:
- `studio/package.json`
- `studio/sanity.config.ts`
- `studio/sanity.cli.ts`
- `studio/structure.ts`
- `studio/tsconfig.json`
- `studio/.env`
- `studio/.env.example`
- `studio/.gitignore`
- `studio/schemaTypes/index.ts`
- `studio/schemaTypes/course.ts`
- `studio/schemaTypes/module.ts`
- `studio/schemaTypes/lesson.ts`
- `studio/schemaTypes/instructor.ts`
- `studio/schemaTypes/category.ts`
- `studio/schemaTypes/learningOutcome.ts`
- `studio/schemaTypes/resource.ts`
- `studio/schemaTypes/blockContent.ts`

### Remove from Web:
- `app/studio/[[...tool]]/page.tsx` (and `app/studio/` directory)
- `sanity.config.ts` (root)
- `sanity.cli.ts` (root)

### Modify in Web:
- `package.json`: Add `"studio:dev"` and `"studio:build"` convenience scripts
- `.env.example`: Update documentation for web and studio env conventions
- `tsconfig.json`: Clean up excludes/includes if necessary

---

## Requirements & Acceptance Criteria

- [ ] `studio/` created as a standalone workspace with its own `package.json` and scripts (`dev`, `build`, `typegen`, `deploy`).
- [ ] `studio/sanity.config.ts` configured with `SANITY_STUDIO_PROJECT_ID` and `SANITY_STUDIO_DATASET`.
- [ ] `studio/sanity.cli.ts` configured for Studio CLI and TypeGen.
- [ ] All 5 document/object schemas migrated to `studio/schemaTypes/`.
- [ ] `studio/structure.ts` configured with `@sanity/icons`.
- [ ] `studio/.env` and `studio/.env.example` created with `SANITY_STUDIO_*` convention.
- [ ] Embedded Next.js Studio route `app/studio/[[...tool]]` deleted.
- [ ] Root `sanity.config.ts` and `sanity.cli.ts` cleaned up.
- [ ] Web application data layer in `sanity/lib/` remains intact and functional.
- [ ] Web app builds cleanly (`npm run build`) with zero errors.
- [ ] Studio workspace packages installed and verified.

---

## Security Considerations
- Studio env variables use the `SANITY_STUDIO_` prefix which are exposed to the Studio browser runtime by Vite design (only projectId and dataset).
- Sensitive tokens (`SANITY_API_READ_TOKEN`, `SANITY_API_WRITE_TOKEN`, `CLERK_SECRET_KEY`) remain strictly server-side in the web application and are never placed in the studio workspace.

---

## Verification & Checks to Run
1. `npm run build` in web workspace to verify Next.js builds without embedded studio route.
2. `npm --prefix studio run build` or `sanity build` in `studio/` to verify Studio builds cleanly.

---

## Manual Test Steps
1. Run `npm run studio:dev` (or `cd studio && npm run dev`) and navigate to `http://localhost:3333`.
2. Verify standalone Sanity Studio loads at `localhost:3333` with Courses, Lessons, Instructors, and Categories.
3. Run `npm run dev` and navigate to `http://localhost:3000` to verify the Next.js frontend runs smoothly.
4. Verify `http://localhost:3000/studio` returns a 404 (confirming embedded studio has been cleanly removed).
