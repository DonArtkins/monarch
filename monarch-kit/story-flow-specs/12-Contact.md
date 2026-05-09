# SPEC — Contact & Footer
## Section 12 of 12 | [LIGHT REALM] → [PURE VOID] — The Command

---

## STORY BEAT
**"Here is where you decide. There is only one real gate on this page. It does not open into a dungeon. It opens back into the world. And you choose if you are ready."**

The contact section returns to ice white — a deliberate breath, a return to the beginning. Then the footer plunges into the absolute void — the final transcendence. A linear contact form, a message area, a single `TRANSCEND` button. And then the footer: the infinite army from above.

---

## VISUAL TONE
- **Contact Background:** `#F0F4FF` ice white — a breath of air before the end
- **Footer Background:** `#000000` true void — the end of everything
- **Lighting:** Contact is bright, almost clinical. Footer is pitch black except for the army image.
- **Energy:** None. The power is in the choice. The CTA is the only energy source.
- **Layout:** Contact: centered, minimal, single-column form. Footer: full-width image, cracked border line at contact→footer edge

---

## AWWWARDS QUALITY NOTES
- The form fields must feel weighty. `border-bottom` only, no full borders. `Space Mono` labels.
- On focus: the border glows ice blue. The label floats up. GSAP `y` and `opacity` transition.
- The `TRANSCEND` button: on hover, the text flickers to the Korean translation `초월` — then back.
- Footer: the image of the army is `mix-blend-mode: luminosity`, deep black background. The army is the only thing visible — a universe of shadows.
- Korean watermark `초월` (Transcendence) at `opacity: 0.04`, bottom-right

---

## FLOW CONNECTION
- **Entering:** The Shadow Army CTA's `ARISE` button triggers a scroll to this section
- **Exiting:** The visitor reaches the end. The site is done. The army image is the final visual.

---

## ASSETS

### `FOOTER_IMG_01`
**Google Whisk Subject:** `Solo Leveling shadow army aerial infinite soldiers`

```
Aerial wide shot — Jin-Woo standing alone in the absolute center of an infinite plain 
of shadow soldiers. Thousands visible to the horizon. Jin-Woo is tiny in frame — just 
a black figure with a blue eye-glow dot. The shadow army is so large it creates 
geometric patterns from above. Dark sky, distant lightning, blue-purple haze at horizon. 
Cinematic aerial VFX shot, photorealistic, IMAX, 8K.
```

---

## INSTRUCTIONS FOR DEVELOPER
1. The contact form is a `<form>` element with `onSubmit` handling
2. Form fields: `Name`, `Email`, `Subject`, `Message` (all required)
3. Each field uses a `label` that floats up on `<input>` focus (GSAP `y: -20px`, `font-size: 0.75rem`)
4. The `TRANSCEND` button is an actual `<button type="submit">` (not an `<a>`)
5. Footer image: full width, no margin. `position: relative` with an absolutely positioned watermark at bottom-right
6. Footer text: `<p>© 2026 MONARCH. All rights reserved.</p>`, centered, Space Mono, tiny

---

## GO TO
→ Previous: [11-Shadow-Army-CTA.md](11-Shadow-Army-CTA.md)
→ This is the end.
