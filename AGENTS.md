# AGENTS.md — Monarch Project Directives

These directives are **mandatory** for all AI agents operating within the Monarch project.

## 1. Branching & Feature Workflow
- **One Feature, One Branch**: All work must be done on isolated `feat/XX-feature-name` branches. Never commit directly to `master`.
- **Feature Specs**: Always refer to the corresponding `feature-spec/XX-name.md` file before starting work to understand the full scope and acceptance criteria.
- **Incremental Steps**: Implement features incrementally. Run local build checks (`npm run build`) and verify via browser agent before committing.

## 2. Code Review & Quality Gates
- **CodeRabbit Review Mandatory**: No branch can be merged to `master` without passing a CodeRabbit review first.
- **Agent Roles**: When asked to review code, assume the role of an elite senior engineer. Focus on performance, GSAP optimization, strict TypeScript typing, and adherence to the Artkins Style Guide.

## 3. Skills Architecture & Usage
- **Skill Locations**: The `skills` CLI automatically downloads skill source code to `/skills/` and creates universal agent symlinks in `/.agents/skills/`. Agents must read from `/.agents/skills/` to utilize active skills.
- **Applying Skills**: When implementing functionality that relates to installed skills (e.g., CodeRabbit, GitHub workflows, Auth), you must read the skill's `SKILL.md` to ensure the correct patterns and standards are applied.

## 4. Documentation & Research
- **Always Read Official Docs**: Before configuring or using installed packages (e.g., Next.js App Router, GSAP, Tailwind 4), always use web search or framework-specific tools (like `npx ctx7`) to read the latest official documentation.
- **No Hallucinations**: Do not assume API surfaces or configuration schemas. Verify versions and usage syntax directly from the source.

## 5. Design Aesthetics
- **Solo Leveling Theme**: Maintain the dark void aesthetic (Void Black `#030014`, Shadow Purple `#7B2FF7`, Neon Blue `#00D4FF`).
- **High Performance**: Ensure GSAP animations use proper `context()` cleanup and `will-change` hints. The goal is an Awwwards-level interactive experience.
