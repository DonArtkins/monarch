# SPEC 11 — Story-Based Navigation Refinement

**Branch:** `feat/11-nav-refinement`  
**Component:** `components/NavBar.tsx`

## What
Replace current generic nav items with Solo Leveling story-driven labels. Add active section highlight via IntersectionObserver. Polish the floating nav appearance.

## Current State
Nav items: `["Dungeons", "Shadows", "Chronicle", "About", "Arise"]`  
Logo: `/images/logo.svg` — already working.

## New Nav Items
Layout (desktop): the logo sits in the **center** of the nav with items distributed symmetrically on either side. On the far right sits the ARISE CTA.

```
[ ORIGIN    THE SYSTEM    SHADOW ARMY ]   [ MONARCH LOGO ]   [ DUNGEONS    MONARCHS ]   [ARISE]
              (left group — 3 items)          (center)            (right group — 2 items)      (far right CTA)
```

Mapping:

```
MONARCH (logo — center of nav)
ORIGIN → scrolls to #about              (left group)
THE SYSTEM → scrolls to #features       (left group)
SHADOW ARMY → scrolls to #shadow-army   (left group, new section)
DUNGEONS → scrolls to #gates            (right group, new section)
MONARCHS → scrolls to #monarchs         (right group, new section)
[ARISE] → CTA button (far right, glowing blue border, dark fill)
```

Mobile: logo stays centered in the nav bar, hamburger icon sits on the left, ARISE CTA sits on the right. The full nav list is accessed via the mobile menu overlay.

## Implementation

### 1. Update nav items array
The array is split so the logo can be rendered between the two halves. Mobile still iterates over the full list in one column.

```typescript
const navItemsLeft = [
  { label: "Origin", href: "#about" },
  { label: "The System", href: "#features" },
  { label: "Shadow Army", href: "#shadow-army" },
];

const navItemsRight = [
  { label: "Dungeons", href: "#gates" },
  { label: "Monarchs", href: "#monarchs" },
];

const navItems = [...navItemsLeft, ...navItemsRight];
```

### 2. Active section tracking
Use IntersectionObserver to track which section is in view. Add `data-active` state to nav links.

```typescript
const [activeSection, setActiveSection] = useState<string>("");

useEffect(() => {
  const sections = document.querySelectorAll("section[id]");
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    },
    { threshold: 0.3 }
  );
  sections.forEach((section) => observer.observe(section));
  return () => observer.disconnect();
}, []);
```

### 3. Style — active link glows faint blue
```typescript
className={`nav-hover-btn ${activeSection === item.href.slice(1) ? "text-monarch-blue" : ""}`}
```

### 4. ARISE CTA button style
```typescript
<Button
  title="Arise"
  rightIcon={<TiLocationArrow />}
  containerClass="bg-transparent border border-monarch-blue text-monarch-blue hover:bg-monarch-blue hover:text-monarch-void transition-all duration-300 md:flex hidden items-center justify-center gap-1"
/>
```

### 5. Typography upgrade
Nav items: Space Mono font, `letter-spacing: 0.15em`, uppercase, thin weight.
```typescript
style={{ fontFamily: "monospace", letterSpacing: "0.15em" }}
```

### 6. Scroll behavior
Change `href` to use smooth scroll on click:
```typescript
const handleNavClick = (e: React.MouseEvent, href: string) => {
  e.preventDefault();
  const target = document.querySelector(href);
  if (target) target.scrollIntoView({ behavior: "smooth" });
};
```

### 7. Centered-logo layout (desktop)
The nav bar is a single flex container with three regions so the logo is guaranteed to sit exactly in the middle, regardless of how many items flank it. Use `justify-between` on the outer container and keep the logo in its own absolutely-centered wrapper so asymmetric label widths (e.g. "Shadow Army" vs "Dungeons") never shift it off-center.

```tsx
<nav className="relative hidden w-full items-center justify-between md:flex">
  {/* Left group */}
  <ul className="flex items-center gap-8">
    {navItemsLeft.map((item) => (
      <li key={item.href}>
        <a href={item.href} onClick={(e) => handleNavClick(e, item.href)} /* ...styles */>
          {item.label}
        </a>
      </li>
    ))}
  </ul>

  {/* Center logo — absolutely centered so it never drifts when groups differ in width */}
  <a
    href="#hero"
    onClick={(e) => handleNavClick(e, "#hero")}
    className="pointer-events-auto absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
    aria-label="Monarch home"
  >
    <img src="/images/logo.svg" alt="Monarch" className="h-7 w-auto" />
  </a>

  {/* Right group + ARISE CTA */}
  <div className="flex items-center gap-8">
    <ul className="flex items-center gap-8">
      {navItemsRight.map((item) => (
        <li key={item.href}>
          <a href={item.href} onClick={(e) => handleNavClick(e, item.href)} /* ...styles */>
            {item.label}
          </a>
        </li>
      ))}
    </ul>
    <Button title="Arise" /* ...styles from section 4 */ />
  </div>
</nav>
```

Rules:
- Outer container is `position: relative`; the logo uses `position: absolute; left: 50%; transform: translate(-50%, -50%)` so its position is independent of sibling widths.
- Left and right groups use equal `gap-8` (or the current spacing token) for visual rhythm.
- Nav items on either side get `text-sm uppercase tracking-[0.15em]` with the Space Mono typography from section 5.

### 8. Mobile nav layout + animated hamburger (GSAP)
On viewports below `md`, the nav renders as three slots: **hamburger (left) — logo (center) — ARISE (right)**. Tapping the hamburger toggles a full-screen overlay menu listing all nav items. The icon itself is not two separate icons — it is a single 3-bar SVG whose bars are morphed between the hamburger and close (X) states with GSAP, so the transition is smooth and continuous.

#### 8a. Markup
```tsx
<button
  type="button"
  onClick={() => setMenuOpen((v) => !v)}
  aria-label={menuOpen ? "Close menu" : "Open menu"}
  aria-expanded={menuOpen}
  aria-controls="mobile-menu"
  className="md:hidden relative flex h-10 w-10 items-center justify-center"
>
  <svg
    ref={iconRef}
    viewBox="0 0 24 24"
    width="24"
    height="24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.75"
    strokeLinecap="round"
  >
    {/* Top bar */}
    <line className="hb-bar hb-top"    x1="4" y1="7"  x2="20" y2="7"  />
    {/* Middle bar */}
    <line className="hb-bar hb-mid"    x1="4" y1="12" x2="20" y2="12" />
    {/* Bottom bar */}
    <line className="hb-bar hb-bottom" x1="4" y1="17" x2="20" y2="17" />
  </svg>
</button>
```

#### 8b. GSAP animation
Use `useGSAP` scoped to the icon so it cleans up with the component. Build the animation as a paused timeline and call `.play()` / `.reverse()` based on `menuOpen`. Every bar's `transformOrigin` is set to `center` so rotation happens around its midpoint.

```tsx
const iconRef = useRef<SVGSVGElement>(null);
const tlRef = useRef<gsap.core.Timeline | null>(null);
const [menuOpen, setMenuOpen] = useState(false);

useGSAP(
  () => {
    const tl = gsap.timeline({ paused: true, defaults: { duration: 0.35, ease: "power3.inOut" } });

    // Top + bottom collapse toward the middle, then rotate into the X.
    tl.to(".hb-top",    { attr: { y1: 12, y2: 12 } }, 0)
      .to(".hb-bottom", { attr: { y1: 12, y2: 12 } }, 0)
      .to(".hb-mid",    { opacity: 0, duration: 0.15 }, 0)
      .to(".hb-top",    { rotate: 45,  transformOrigin: "center" }, 0.2)
      .to(".hb-bottom", { rotate: -45, transformOrigin: "center" }, 0.2);

    tlRef.current = tl;
  },
  { scope: iconRef }
);

useEffect(() => {
  const tl = tlRef.current;
  if (!tl) return;
  menuOpen ? tl.play() : tl.reverse();
}, [menuOpen]);
```

Notes:
- The entire animation is GPU-friendly — only `transform` (rotate) and `opacity` + SVG `attr` tweening. No layout properties are animated.
- `tl.reverse()` on close gives a smooth X → hamburger morph without duplicating the timeline.
- Because the timeline is built once and driven by state, toggling rapidly is safe (GSAP will simply change playback direction).

#### 8c. Mobile menu overlay
The overlay is a fixed-position panel that fades + slides in when `menuOpen` is true. It contains the full `navItems` list plus the ARISE CTA. Close it by tapping any item (also triggers smooth scroll) or by tapping the hamburger again (which reverses the icon animation).

```tsx
<div
  id="mobile-menu"
  className={`md:hidden fixed inset-0 z-40 bg-monarch-void/95 backdrop-blur-sm transition-opacity duration-300 ${
    menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
  }`}
>
  <ul className="flex h-full flex-col items-center justify-center gap-8">
    {navItems.map((item) => (
      <li key={item.href}>
        <a
          href={item.href}
          onClick={(e) => {
            handleNavClick(e, item.href);
            setMenuOpen(false);
          }}
          className="font-[monospace] text-2xl uppercase tracking-[0.2em]"
        >
          {item.label}
        </a>
      </li>
    ))}
  </ul>
</div>
```

- Lock body scroll while `menuOpen` is true: `document.body.style.overflow = menuOpen ? "hidden" : ""` in an effect (remember to reset on unmount).
- Menu opens/closes in sync with the icon animation; do not animate the menu with `height` — use `opacity` / `transform` / `clip-path` only.

## Acceptance Criteria
- [ ] Nav shows story-driven labels.
- [ ] Active section link has blue glow.
- [ ] ARISE button has glowing blue border style.
- [ ] Clicking nav items smooth-scrolls to sections.
- [ ] Logo is rendered in the **center** of the desktop nav, flanked by the left group (Origin / The System / Shadow Army) and the right group (Dungeons / Monarchs), with ARISE CTA on the far right.
- [ ] Logo stays visually centered regardless of label widths (absolute-positioned, `translate(-50%, -50%)`).
- [ ] Mobile layout shows hamburger (left), centered logo, and ARISE (right) on a single bar without horizontal overflow.
- [ ] Tapping the mobile hamburger morphs the 3-bar icon into an X using GSAP (no icon swap, no layout animation).
- [ ] Tapping again reverses the animation back to the hamburger state smoothly.
- [ ] GSAP timeline is built inside `useGSAP` and cleans up with the component (no leaks).
- [ ] Mobile menu overlay shows all nav items and the ARISE CTA, closes on item tap, locks body scroll while open.
- [ ] Menu icon has accurate `aria-label`, `aria-expanded`, and `aria-controls` values.
- [ ] `npm run build` passes.

## Mobile Requirements
- Mobile nav bar layout: **hamburger (left) — centered logo — ARISE CTA (right)** on a single row, no horizontal scrolling or overflow at 360px width or wider.
- Logo on mobile uses the same absolute-center technique as desktop so it stays perfectly centered regardless of the ARISE button's width.
- Hamburger icon is a single SVG with 3 lines; GSAP morphs it into an X when the menu is open and reverses the timeline when closed — **no separate close icon swap**.
- The icon animation uses only `transform`, `opacity`, and SVG `attr` tweens (GPU-friendly). It is built once inside `useGSAP` with `{ scope: iconRef }` and cleaned up automatically.
- The button's `aria-label` updates between "Open menu" and "Close menu"; `aria-expanded` reflects the open state; `aria-controls` points at the mobile menu container id.
- Mobile menu overlay shows the full `navItems` list plus the ARISE CTA in the same large font style, closes when any item is tapped, and triggers smooth scroll.
- Body scroll is locked while the menu is open and restored on close / unmount.
- ARISE button in the overlay uses the glowing blue border style from section 4.
- No layout shifts on open/close (overlay uses `opacity` / `transform` only; menu does not reflow the main bar).
