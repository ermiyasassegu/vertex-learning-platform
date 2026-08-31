# Implementation Prompt: Clerk Authentication Setup

## Goal
Set up and integrate Clerk authentication in the Vertex learning platform using the Clerk CLI linked to Clerk application `app_3IRwIHwfWE4WdoBlXNmiFCa49QU`. Ensure seamless integration with Next.js App Router (Next.js 16 / React 19), configure middleware/proxy matchers, wrap the application with `ClerkProvider`, update the navigation header with sign-in/sign-up and user controls, and verify setup health.

---

## Skills Referenced
- `clerk-cli` (`.agents/skills/clerk-cli/SKILL.md`)
- `clerk-setup` (`.agents/skills/clerk-setup/SKILL.md`)
- `clerk-nextjs-patterns` (`.agents/skills/clerk-nextjs-patterns/SKILL.md`)
- `AGENTS.md` (Project Rules & Boundaries)

---

## Code & Config Inspected
- `package.json`: Next.js 16.3.2, React 19.2.8, Tailwind CSS v4.
- `app/layout.tsx`: Root layout with `Inter` and `Playfair_Display` fonts, `<html>` and `<body>` structure.
- `components/home/home-header.tsx`: Navigation header currently using a static user avatar.
- `app/globals.css`: Tailwind v4 theme styles.

---

## Decisions & Assumptions
1. **Target Clerk Application**:
   - Explicitly link to Clerk application `app_3IRwIHwfWE4WdoBlXNmiFCa49QU` via `clerk init --app app_3IRwIHwfWE4WdoBlXNmiFCa49QU`.

2. **Clerk CLI Tooling**:
   - Check if `clerk` CLI is installed (`clerk --version`). If present, update via `clerk update --yes`. If not, install via `npm install -g clerk` or use `npx clerk@latest`.
   - Authenticate via `clerk auth login` if required.

3. **Provider Placement & Next.js 16 Integration**:
   - Place `<ClerkProvider>` directly inside `<body>` (not wrapping `<html>`), adhering to Next.js App Router requirements.
   - For Next.js 16, configure `middleware.ts` (or `proxy.ts`) using `clerkMiddleware` from `@clerk/nextjs/server`.
   - Matcher configuration must include:
     - `'/(api|trpc)(.*)'`
     - `'/__clerk/:path*'`
     - Static file exclusion rules `'/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)'`

4. **User Auth Controls & Visual Design**:
   - Update `components/home/home-header.tsx` with Clerk authentication state components:
     - When signed out: `<Show when="signed-out">` showing clean styled "Sign in" (`<SignInButton mode="modal">`) and "Sign up" (`<SignUpButton mode="modal">`) actions styled to match Vertex design language.
     - When signed in: `<Show when="signed-in">` showing `<UserButton />` and notifications bell.
   - Maintain responsiveness and visual hierarchy.

5. **Verification & Diagnostics**:
   - Run `clerk doctor` / `clerk doctor --json` to verify integration health and key resolution.

---

## Files to Touch / Create
- `package.json` / `package-lock.json`: Dependency installation for `@clerk/nextjs`.
- `middleware.ts`: Next.js Clerk middleware with proxy matcher.
- `app/layout.tsx`: Inject `<ClerkProvider>` inside `<body>`.
- `components/home/home-header.tsx`: Embed Clerk auth controls (`<Show>`, `<SignInButton>`, `<SignUpButton>`, `<UserButton>`).
- `.env.local`: Environment variables with `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` and `CLERK_SECRET_KEY` (configured via `clerk init` / `clerk env pull`).

---

## Requirements & Acceptance Criteria
- [ ] Clerk CLI installed / updated to latest.
- [ ] Clerk initialized and linked to application `app_3IRwIHwfWE4WdoBlXNmiFCa49QU`.
- [ ] `@clerk/nextjs` installed and configured.
- [ ] Root layout wraps page contents in `<ClerkProvider>` inside `<body>`.
- [ ] `middleware.ts` configured with `clerkMiddleware` and matcher containing `'/(api|trpc)(.*)'` and `'/__clerk/:path*'`.
- [ ] Navigation header displays "Sign In" and "Sign Up" buttons when signed out, and `<UserButton />` when signed in.
- [ ] `clerk doctor` reports passing health checks.
- [ ] `npm run lint` and `npm run build` pass with 0 errors.

---

## Security Considerations
- `CLERK_SECRET_KEY` remains server-only and is stored in git-ignored `.env.local`.
- Only `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` is exposed to the browser.
- No secrets printed to console or logs.

---

## Verification & Checks to Run
1. `clerk doctor`
2. `npm run lint`
3. `npm run build`

---

## Manual Test Steps
1. Run `npm run dev` and navigate to `http://localhost:3000`.
2. Verify when signed out: "Sign in" and "Sign up" buttons are visible in the navigation header.
3. Click "Sign up" and complete sign up as a test user.
4. Verify user avatar / `<UserButton />` appears in the navigation header once signed in.
5. Click `<UserButton />` to verify account management popup opens.
6. Sign out and verify that the header returns to the signed-out state with "Sign in" / "Sign up" buttons.
