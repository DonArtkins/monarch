# Feature 07: Scroll Frame Sequence — Arise Animation

## Overview
Canvas-based scroll-scrubbed frame animation using 120 extracted JPG frames from the "Arise" sequence. This is the key differentiator from Zentry.

## Architecture
```
ScrollTrigger → progress (0→1) → frameIndex = Math.floor(progress * 119)
→ canvas.getContext('2d').drawImage(frames[frameIndex], 0, 0, w, h)
```

## Tasks
1. **ScrollSequence Component**: New `components/ScrollSequence.tsx`
2. **Frame Preloading**: Load all 120 frames (`arise-frames/ezgif-frame-001.jpg` → `120.jpg`) into `HTMLImageElement[]`
3. **Canvas Rendering**: Full-viewport `<canvas>` element draws current frame based on scroll progress
4. **GSAP ScrollTrigger**: `scrub: true`, `pin: true` for smooth playback
5. **Loading State**: Progress bar during frame preload
6. **Responsive**: ResizeObserver to handle canvas dimensions on viewport change
7. **Integration**: Place between About and Features sections in page layout

## Acceptance Criteria
- Scrolling forward/backward scrubs through the arise sequence smoothly
- Canvas fills the viewport during the pinned scroll section
- All 120 frames preload before the section becomes interactive
- Performance: 60fps scroll scrubbing on desktop
- Graceful degradation on mobile (reduce frame count or use video fallback)
