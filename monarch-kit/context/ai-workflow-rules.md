# AI Workflow Rules — Monarch Upscale

## Mandatory Startup Routine

Before implementing any feature spec:

1. Read `AGENTS.md`.
2. Read `context/architecture-context.md`.
3. Read `context/ui-context.md`.
4. Read `context/code-standards.md`.
5. Read the current feature spec from `feature-specs/`.
6. Read `context/progress-tracker.md`.
7. Check the current state of `components/` to understand existing code.
8. Update `context/progress-tracker.md` when done.

## Planning Gate

- **Never jump directly to implementation.**
- Present a concrete implementation plan before writing code.
- Wait for explicit user approval before executing.
- If user requests changes, update the plan before executing.

This gate applies to:
- New component creation
- Modifying existing components
- Adding new sections to `app/page.tsx`
- Changing `globals.css` design tokens
- Adding new dependencies

## Scoping Rules

- Work on **one feature spec at a time**.
- Do not combine multiple specs into one implementation.
- Do not start the next spec until the current one passes `npm run build`.
- Build exactly what the spec requires — no speculative features.
- Do not prebuild future components because they seem likely to be needed.

## Feature Spec Shape

Every feature spec in this project uses this structure:

```markdown
# SPEC XX — Feature Name

**What:** What this feature adds/changes.  
**Component:** Which file(s) are created or modified.

## Acceptance Criteria
- Specific, binary pass/fail criteria.

## Mobile Requirements
- Mobile-specific behavior.
```

## Preservation Rules (CRITICAL)

The following must NEVER be broken:

| What | Why |
|---|---|
| `VideoPlayer` component API | Used in Features.tsx and other sections |
| `AnimatedTitle` props (`title`, `containerClass`) | Used in all sections |
| `BentoTilt` behavior in Features.tsx | Core interaction pattern |
| `Button` props (`title`, `id`, `rightIcon`, `leftIcon`, `containerClass`, `onClick`) | Used throughout |
| Hero video loading logic | Complex, working state |
| NavBar audio toggle | Working with refs |
| About clip-path animation | Working GSAP timeline |
| Story frame tilting | Working GSAP hover |

## New Section Integration

When adding a new section to `app/page.tsx`:

```typescript
// 1. Create the component file
// components/NewSection.tsx

// 2. Add dynamic import in page.tsx
const NewSection = dynamic(() => import("../components/NewSection"), { ssr: false });

// 3. Add in story order between existing sections
export default function Page() {
  return (
    <main id="main-content" className="relative min-h-screen w-screen overflow-x-hidden">
      <NavBar />
      <Hero />
      <About />
      <Features />
      {/* NEW: Add after Features if it's a Gates/Ranks/etc. section */}
      <NewSection />
      <Story />
      <Contact />
      <Footer />
    </main>
  );
}
```

## GSAP Plugin Rules

- Plugins are registered ONCE at module level outside components.
- SplitText from `gsap/SplitText` — requires GSAP Club membership or is included in gsap@3.15+.
- ScrollTrigger from `gsap/ScrollTrigger` — always available.
- Never import plugins inside `useGSAP` callbacks.

```typescript
// ✅ CORRECT — module level
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, SplitText);
}

// ❌ WRONG — inside component/hook
useGSAP(() => {
  gsap.registerPlugin(ScrollTrigger); // TOO LATE, causes issues
});
```

## Handling Missing Assets

When a video or image asset referenced in a spec doesn't exist yet:

1. Use a placeholder from existing assets (e.g., existing hero video as placeholder).
2. Comment in the code: `{/* TODO: Replace with /videos/bento-vid-01.mp4 when generated */}`.
3. The feature is still considered complete — asset generation is separate workflow.

## Mobile Testing Checklist

After every spec implementation:
- [ ] No horizontal scroll at 375px viewport width.
- [ ] Touch targets ≥ 44px.
- [ ] Text is readable (≥ 14px, sufficient contrast).
- [ ] Video autoplay disabled or replaced with poster on mobile where appropriate.
- [ ] GSAP ScrollTrigger works with touch scrolling.

## Branch Workflow

```bash
# Start a feature
git checkout -b feat/11-nav-refinement

# Implement the spec...

# Verify build
npm run build

# Commit
git add -A
git commit -m "feat(spec-11): story-based navigation labels and active highlight"

# Push
git push origin feat/11-nav-refinement
```

## When to Ask for Help

Ask before proceeding if:
- A spec references an asset (`/videos/xxx.mp4`) that doesn't exist and no placeholder is reasonable.
- A spec requires a GSAP plugin (like `SplitText`) that may not be installed.
- A spec conflicts with existing animation behavior.
- `npm run build` fails with a type error that can't be resolved without changing existing component APIs.

## Progress Tracking

Update `context/progress-tracker.md` after each spec:
- Mark spec as done with date.
- Note any deviations or TODOs.
- List any assets still needed.
- Note next spec to implement.
