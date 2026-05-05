# SPEC 12 — Bento Card 02: ARISE (Shadow Monarch Transformation)

**Branch:** `feat/12-bento-arise-card`
**Section:** Features (Bento Grid)
**Component:** `components/Features.tsx`

## Goal
Replace the second bento card with Jin-Woo Shadow Monarch transformation card.

## Acceptance Criteria
- Label: `SHADOW MONARCH` — Space Mono, uppercase, small
- Headline: `AR<b>I</b>SE` using bento-title + special-font
- Sub-copy: `The title no living hunter had ever held. Sovereign of all shadow.`
- Video: `BENTO_VID_02` placeholder = `/videos/story-arise.mp4`
- Card occupies col-span-1, row-span-2 on desktop (tall narrow layout)
- Gradient overlay from bottom for text visibility

## Mobile Requirements
- Collapses to full-width single column on mobile
- Maintains aspect ratio — does not clip content
