"use client";
import Image from "next/image";
import Link from "next/link";
import { FaDiscord, FaXTwitter, FaYoutube, FaMedium } from "react-icons/fa6";

const links = [
  { href: "https://discord.com", icon: <FaDiscord />, label: "Join our Discord" },
  { href: "https://x.com", icon: <FaXTwitter />, label: "Follow us on X (Twitter)" },
  { href: "https://youtube.com", icon: <FaYoutube />, label: "Watch on YouTube" },
  { href: "https://medium.com", icon: <FaMedium />, label: "Read on Medium" },
];

const quickLinks = [
  { label: "ORIGIN", href: "#about" },
  { label: "THE SYSTEM", href: "#features" },
  { label: "SHADOW ARMY", href: "#shadow-army" },
  { label: "DUNGEONS", href: "#gates" },
  { label: "MONARCHS", href: "#monarchs" },
];

const Footer = () => {
  return (
    <footer
      className="relative w-screen overflow-hidden border-t border-monarch-blue/10 py-16 md:py-20"
      style={{ backgroundColor: "var(--void, #000000)" }}
    >
      {/* Noise overlay — cinematic film grain on footer */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          opacity: 0.07,
          mixBlendMode: "overlay",
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: "200px 200px",
          backgroundRepeat: "repeat",
        }}
      />

      {/* Korean watermark — 초월 (TRANSCEND) */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 pointer-events-none select-none overflow-hidden w-full text-center"
        aria-hidden="true"
      >
        <span
          style={{
            fontFamily: "var(--font-zentry, sans-serif)",
            fontSize: "18vw",
            fontWeight: 900,
            color: "var(--monarch-text, #E8E8E8)",
            opacity: 0.025,
            lineHeight: 1,
            display: "block",
            userSelect: "none",
            whiteSpace: "nowrap",
          }}
        >
          초월
        </span>
      </div>

      {/* Decorative corner glows — preserved */}
      <div
        className="absolute -bottom-20 -left-20 size-64 pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(123,47,247,0.08) 0%, transparent 70%)", filter: "blur(40px)" }}
        aria-hidden="true"
      />
      <div
        className="absolute -top-20 -right-20 size-64 pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(96,165,250,0.05) 0%, transparent 70%)", filter: "blur(40px)" }}
        aria-hidden="true"
      />

      <div className="container mx-auto px-5 md:px-10 relative z-10">

        {/* ── THREE COLUMN GRID ───────────────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8 items-start">

          {/* ── COLUMN 1 — Branding + Socials ───────────── */}
          <div className="flex flex-col gap-6">
            {/* Wordmark */}
            <div>
              <h2
                className="special-font font-black uppercase"
                style={{
                  fontFamily: "var(--font-zentry, sans-serif)",
                  fontSize: "clamp(2rem, 4vw, 3.5rem)",
                  color: "var(--white, #F0F4FF)",
                  lineHeight: 0.85,
                  letterSpacing: "-0.01em",
                }}
              >
                Mon<b>a</b>rch
              </h2>
              <p
                className="mt-2"
                style={{
                  fontFamily: "var(--font-mono, 'Space Mono', monospace)",
                  fontSize: "0.5rem",
                  textTransform: "uppercase",
                  letterSpacing: "0.2em",
                  color: "var(--silver, #C0C8D8)",
                  opacity: 0.4,
                }}
              >
                THE SHADOW MONARCH · THE SYSTEM · THE ARISE
              </p>
            </div>

            {/* Description */}
            <p
              className="font-circular leading-relaxed"
              style={{
                fontSize: "0.875rem",
                color: "var(--silver, #C0C8D8)",
                opacity: 0.5,
                maxWidth: "28ch",
              }}
            >
              You were the weakest. You became the sovereign. The shadow army
              answers only to you. Arise.
            </p>

            {/* Social icons */}
            <div className="flex items-center gap-5">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={link.label}
                  className="text-xl transition-all duration-300 hover:-translate-y-1"
                  style={{ color: "var(--silver, #C0C8D8)", opacity: 0.45 }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget as HTMLAnchorElement;
                    el.style.color = "var(--ice-eye, #60A5FA)";
                    el.style.opacity = "1";
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget as HTMLAnchorElement;
                    el.style.color = "var(--silver, #C0C8D8)";
                    el.style.opacity = "0.45";
                  }}
                >
                  {link.icon}
                </Link>
              ))}
            </div>
          </div>

          {/* ── COLUMN 2 — Center Image (desktop only) ──── */}
          <div className="hidden md:block relative">
            <div
              className="relative overflow-hidden rounded-lg w-full"
              style={{
                height: "clamp(180px, 28vh, 300px)",
                border: "1px solid rgba(96, 165, 250, 0.08)",
              }}
            >
              {/* TODO: Replace with /images/FOOTER_IMG_01.webp when generated */}
              <Image
                src="/images/footer-bg.jpeg"
                alt="The assembled Shadow Army — thousands of shadow soldiers in formation, Jin-Woo standing at their center, tiny against the infinite dark mass"
                fill
                className="object-cover object-center"
                sizes="(max-width: 1280px) 33vw, 400px"
                loading="lazy"
              />
              {/* Cinematic vignette overlay */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: "linear-gradient(to top, rgba(0,0,0,0.75) 0%, transparent 50%, rgba(0,0,0,0.35) 100%)",
                }}
                aria-hidden="true"
              />
              {/* HUD label */}
              <div className="absolute bottom-3 left-3 z-10" aria-hidden="true">
                <p
                  style={{
                    fontFamily: "var(--font-mono, 'Space Mono', monospace)",
                    fontSize: "0.45rem",
                    textTransform: "uppercase",
                    letterSpacing: "0.2em",
                    color: "rgba(240, 244, 255, 0.3)",
                  }}
                >
                  SHADOW ARMY · FULL FORMATION · ∞ SOLDIERS
                </p>
              </div>
            </div>
          </div>

          {/* ── COLUMN 3 — Quick Nav + Legal ─────────────── */}
          <div className="flex flex-col gap-6">
            {/* Section heading */}
            <p
              style={{
                fontFamily: "var(--font-mono, 'Space Mono', monospace)",
                fontSize: "0.5rem",
                textTransform: "uppercase",
                letterSpacing: "0.2em",
                color: "var(--ice-eye, #60A5FA)",
                opacity: 0.6,
              }}
            >
              NAVIGATE
            </p>

            {/* Quick nav links — matches SPEC 11 */}
            <nav aria-label="Footer navigation">
              <ul className="flex flex-col gap-3">
                {quickLinks.map((item) => (
                  <li key={item.href}>
                    <a
                      href={item.href}
                      style={{
                        fontFamily: "var(--font-mono, 'Space Mono', monospace)",
                        fontSize: "0.625rem",
                        textTransform: "uppercase",
                        letterSpacing: "0.15em",
                        color: "var(--silver, #C0C8D8)",
                        opacity: 0.45,
                        transition: "opacity 0.2s ease, color 0.2s ease",
                        textDecoration: "none",
                        display: "block",
                        padding: "2px 0",
                      }}
                      onMouseEnter={(e) => {
                        const el = e.currentTarget as HTMLAnchorElement;
                        el.style.opacity = "1";
                        el.style.color = "var(--white, #F0F4FF)";
                      }}
                      onMouseLeave={(e) => {
                        const el = e.currentTarget as HTMLAnchorElement;
                        el.style.opacity = "0.45";
                        el.style.color = "var(--silver, #C0C8D8)";
                      }}
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Legal block */}
            <div className="mt-auto flex flex-col gap-2 pt-4">
              <Link
                href="#privacy-policy"
                style={{
                  fontFamily: "var(--font-mono, 'Space Mono', monospace)",
                  fontSize: "0.5rem",
                  textTransform: "uppercase",
                  letterSpacing: "0.15em",
                  color: "var(--silver, #C0C8D8)",
                  opacity: 0.3,
                  textDecoration: "none",
                }}
              >
                Privacy Policy
              </Link>
              <p
                style={{
                  fontFamily: "var(--font-mono, 'Space Mono', monospace)",
                  fontSize: "0.5rem",
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                  color: "var(--silver, #C0C8D8)",
                  opacity: 0.2,
                }}
              >
                © Monarch 2026. All rights reserved.
              </p>
            </div>
          </div>

        </div>{/* end three-column grid */}

        {/* ── BOTTOM DIVIDER ───────────────────────────────── */}
        <div
          className="mt-12 mb-6 h-px w-full"
          style={{ background: "linear-gradient(90deg, transparent, rgba(96, 165, 250, 0.12), transparent)" }}
          aria-hidden="true"
        />

        {/* ── BOTTOM KOREAN STRIP ──────────────────────────── */}
        <div className="overflow-hidden" aria-hidden="true">
          <p
            className="whitespace-nowrap text-center"
            style={{
              fontFamily: "var(--font-mono, 'Space Mono', monospace)",
              fontSize: "0.5rem",
              textTransform: "uppercase",
              letterSpacing: "0.3em",
              color: "var(--silver, #C0C8D8)",
              opacity: 0.18,
            }}
          >
            일어나라 · ARISE · THE SHADOW ARMY · MONARCH · 2026 · 일어나라 · ARISE · THE SHADOW ARMY · MONARCH · 2026 · 일어나라
          </p>
        </div>

      </div>{/* end container */}
    </footer>
  );
};

export default Footer;
