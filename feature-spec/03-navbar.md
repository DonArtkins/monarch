# Feature 03: NavBar — The System Interface

## Overview
Floating nav with scroll-aware visibility, Solo Leveling themed navigation items, audio controls for BGM, and Monarch logo integration.

## Tasks
1. **Nav Items**: Replace Zentry items with Solo Leveling themed: "Dungeons", "Shadows", "Chronicle", "About", "Awaken"
2. **Logo**: Integrate Monarch SVG logo replacing Zentry's `logo.png`
3. **Audio**: Wire up `bgm.mp3` via the existing audio toggle mechanism
4. **CTA Button**: Replace "Products" with "Arise" button
5. **GSAP Animation**: Retain scroll-triggered show/hide with opacity/y translation
6. **Mobile**: Add responsive hamburger menu (enhancement over Zentry)

## Acceptance Criteria
- Nav appears at top, hides on scroll down, shows on scroll up
- Audio toggle plays/pauses `bgm.mp3` with indicator animation
- Logo renders correctly at all breakpoints
- Nav items link to correct section anchors
