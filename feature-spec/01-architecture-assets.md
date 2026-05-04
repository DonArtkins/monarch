# Feature 01: Design System & Asset Architecture

## Overview
Foundational theme transformation from Zentry's lavender palette to Solo Leveling's dark void aesthetic. Establishes CSS custom properties for global theming, fixes all broken asset paths, replaces all Zentry copywriting, and configures proper SEO metadata.

## Tasks
1. **CSS Custom Properties**: Add `:root` block with all theme tokens (colors, fonts, spacing, animation durations)
2. **Color Palette**: Solo Leveling dark theme — void black (#030014), shadow purple (#7B2FF7), neon blue (#00D4FF), blood red (#FF1744), bone white (#E8E8E8)
3. **Asset Path Fix**: All `/img/*.webp` → `/images/*.jpeg` across all components
4. **Audio Path Fix**: `/audio/loop.mp3` → `/audio/bgm.mp3`
5. **Copywriting**: Replace all Zentry references with Solo Leveling content
6. **Layout**: Update `layout.tsx` with SEO metadata, font preloads
7. **Logo**: Create Monarch SVG logo
8. **Video Mapping**: Map Monarch's 6 videos to correct component slots

## Acceptance Criteria
- All asset paths resolve correctly (no 404s)
- Zero Zentry references remain in the codebase
- CSS variables are globally accessible via `var(--monarch-*)`
- App builds successfully (`npm run build`)
- Dark theme renders consistently across all sections
