# Feature 02: Hero Section - The Awakening

## Overview
This feature transforms the opening Hero section to match the Solo Leveling dark fantasy aesthetic. We will replace the original looping videos with `hero-1.mp4` and `hero-2.mp4` and update the copywriting to "A w aken" and "Mon a rch".

## Tasks
1. **Video Integration**: Replace the current 4 looping videos logic with a simplified dual-video setup using `hero-1.mp4` (Background) and `hero-2.mp4` (Inner Reveal).
2. **GSAP Animation**: Update the GSAP clipping mask animation (`clipPath`) to ensure the transition reveals the new videos smoothly.
3. **Copywriting Update**: 
   - Change "G a ming" to "A w aken".
   - Change "redefi n e" to "Mon a rch".
   - Update text: "Enter the Metagame Layer -> Arise from the shadows".
   - Update text: "Unleash the Play Economy -> Claim your sovereignty".
   - Change "Watch Trailer" to "Enter System" with an appropriate icon.

## Acceptance Criteria
- Background video (`hero-1.mp4`) loops cleanly.
- Center mask uses `hero-2.mp4`.
- The central click interaction triggers the GSAP transition successfully.
- Copywriting changes are fully implemented and visible.
