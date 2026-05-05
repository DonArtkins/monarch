# SPEC 20 — ARISE CTA Section (Final Call to Action)

**Branch:** `feat/20-arise-cta-section`
**Section:** Replace/upgrade Contact section
**Component:** `components/Contact.tsx` (upgrade)

## Goal
Transform the current Contact section into a cinematic ARISE CTA — the climax of the story flow.

## Acceptance Criteria
- Headline: `AR<b>I</b>SE` — full viewport width, Zentry font, compressed
- Sub: `The Shadow Monarch is ready. Are you?`
- CTA button: `[ENTER THE SYSTEM]` — glowing blue border, dark fill
- Background: `/videos/story-arise.mp4` looping at low opacity (0.3) behind content
- Overlay: Dark gradient with monarch-blue glow emanating from center bottom
- Existing clip-path images (Beru + system-ui) kept but repositioned cleanly

## Mobile Requirements
- Video background: `object-cover` full section
- Headline scales down to `clamp(3rem, 10vw, 8rem)`
- CTA button full-width on mobile (`w-full max-w-xs mx-auto`)
