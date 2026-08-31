# Implementation Prompt: Step 6 - Visible Auth Controls Integration

## Goal
Integrate clear, polished, and responsive Clerk authentication controls into the Vertex navigation header (`components/home/home-header.tsx`). Ensure signed-out users see distinct "Sign in" and "Sign up" buttons that launch Clerk modals, and signed-in users see the `<UserButton />` and notifications bell.

---

## Skills Referenced
- `clerk` (`.agents/skills/clerk/SKILL.md`)
- `clerk-setup` (`.agents/skills/clerk-setup/SKILL.md`)
- `clerk-custom-ui` (`.agents/skills/clerk-custom-ui/SKILL.md`)
- `AGENTS.md` (Rules, layout, and boundaries)

---

## Code & Config Inspected
- `components/home/home-header.tsx`: Currently renders a static placeholder avatar (`Unsplash` image) and notification bell regardless of auth state.
- `components/ui/button.tsx`: Existing Vertex button component with `primary`, `secondary`, `tertiary`, and `text` variants.
- `app/layout.tsx`: Root layout with `<ClerkProvider>` configured inside `<body>`.
- `proxy.ts`: Next.js 16 `clerkMiddleware` with proxy matchers.

---

## Decisions & Assumptions
1. **Component State Rendering**:
   - Use `<Show when="signed-out">` (or `<SignedOut>`) to show authentication actions for unauthenticated visitors.
   - Use `<Show when="signed-in">` (or `<SignedIn>`) to render the interactive `<UserButton />` alongside the notifications bell.
2. **Visual Design & Typography**:
   - Match Vertex design tokens:
     - **Sign in**: Subtle text/ghost button (`text-[#64748B] hover:text-[#0F172A] text-sm font-medium`).
     - **Sign up**: Brand primary pill button using Vertex `<Button variant="primary" size="sm">` (`bg-[#F97316] text-white rounded-full`).
     - **Signed-in user**: `<UserButton />` seamlessly aligned with the header.
3. **Modal Mode for Seamless UX**:
   - Configure `<SignInButton mode="modal">` and `<SignUpButton mode="modal">` so learners can authenticate without losing their page context.

---

## Files to Touch
- `components/home/home-header.tsx`: Replace static avatar with Clerk conditional components (`Show`, `SignInButton`, `SignUpButton`, `UserButton`).

---

## Requirements & Acceptance Criteria
- [ ] Unauthenticated state renders clean "Sign in" and "Sign up" buttons.
- [ ] Authenticated state renders `<UserButton />` and notification bell.
- [ ] Modal sign-in and sign-up flows open properly on click.
- [ ] Mobile and desktop responsive layouts remain intact without layout shifts.
- [ ] `npm run lint` and `npm run build` pass with 0 errors.

---

## Security Considerations
- Client components only use Clerk UI components and publishable key.
- No sensitive keys or tokens exposed.

---

## Checks to Run
1. `npm run lint`
2. `npm run build`

---

## Manual Test Steps
1. Start dev server: `npm run dev`.
2. Visit `http://localhost:3000` while signed out.
3. Verify "Sign in" and "Sign up" buttons appear in the top-right navigation.
4. Click "Sign up" to verify Clerk modal opens.
5. Sign in with a test account and verify `<UserButton />` appears in place of the auth buttons.
6. Click `<UserButton />` to verify profile menu opens and sign out works cleanly.
