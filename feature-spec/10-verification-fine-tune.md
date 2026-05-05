# Feature 10: Verification & Fine-Tuning

## Overview
Full site audit pass to achieve Awwwards-level quality and Lighthouse 90+ scores across all devices and browsers.

## Tasks

### Lighthouse & Core Web Vitals
1. Run Lighthouse audit in Chrome DevTools (desktop + mobile presets)
2. Target Performance ≥ 90, Accessibility ≥ 95, Best Practices ≥ 90, SEO ≥ 90
3. CLS audit — target < 0.1 (check About clip animation, Hero load)
4. LCP audit — target < 2.5s (hero video preload effectiveness)
5. INP/FID — ensure no long tasks blocking main thread

### Cross-Browser Verification
6. Chrome (latest) — full page scroll, animations, hover states
7. Firefox (latest) — GSAP ScrollTrigger, clip-path, mix-blend-difference
8. Safari (latest) — backdrop-blur, will-change, scroll animations

### Responsive Breakpoints (320px → 1920px)
9. 320px (iPhone SE) — Hero text overflow, NavBar, Features bento grid
10. 375px (iPhone 14) — standard mobile baseline
11. 768px (iPad) — tablet layout switches, NavBar desktop/mobile boundary
12. 1024px (iPad Pro / small laptop) — Features grid, Contact layout
13. 1440px (standard desktop) — full layout audit
14. 1920px (large desktop) — scaling, max-width containers, typography

### Touch & Mobile
15. iOS Safari — scroll animations with ScrollTrigger (touch scroll momentum)
16. Android Chrome — intersection observer video lazy loading
17. Touch hover fallbacks — BentoTilt mouse events on touch devices

### Animation Fine-Tuning
18. AnimatedTitle stagger timing (currently 0.02s — verify feel at different viewport sizes)
19. Hero clip-path scrub smoothness on mid-range devices
20. NavBar show/hide animation duration (currently 0.2s)
21. BentoTilt perspective + rotation values on mobile (disable on touch if jank)
22. Story image tilt effect on mobile

### Typography & Spacing Polish
23. Verify zentry/special-font rendering on all platforms (fallback stack)
24. About section subtext line spacing and max-width
25. Footer watermark size at narrow viewports
26. Contact section heading responsive sizing (currently `text-5xl md:text-[96px]`)

### Accessibility Verification
27. Tab order walkthrough — ensure logical focus flow through all sections
28. Screen reader test on NavBar, Hero CTA, Footer links
29. Colour contrast check — monarch-text-dim (#9090B0) on void (#030014) — must meet AA
30. Reduced-motion media query — wrap GSAP animations

### Console & Error Audit
31. Zero console errors in production build (`npm run build && npm start`)
32. Verify no hydration mismatch warnings (dynamic imports with `ssr: false`)
33. Check for missing `key` props or React warnings

## Acceptance Criteria
- Lighthouse Performance ≥ 90 (mobile), ≥ 95 (desktop)
- Lighthouse Accessibility ≥ 95
- Lighthouse Best Practices ≥ 90
- Lighthouse SEO ≥ 90
- CLS < 0.1
- LCP < 2.5s
- All animations at 60fps on mobile mid-range device
- Zero console errors in production build
- All sections render correctly from 320px to 1920px
- Touch scroll animations function on iOS and Android
- Reduced-motion: animations respect `prefers-reduced-motion`

## Design Constraints
- Void Black `#030014` · Shadow Purple `#7B2FF7` · Neon Blue `#00D4FF`
- Never break the dark void aesthetic during polish
- All fixes must maintain Awwwards-level interaction quality
