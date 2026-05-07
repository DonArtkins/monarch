"use client";

import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import AnimatedTitle from "./AnimatedTitle";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const AriseScene = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const leftPanelRef = useRef<HTMLDivElement>(null);
  const rightPanelRef = useRef<HTMLDivElement>(null);
  const dividerRef = useRef<HTMLDivElement>(null);
  const wipeOverlayRef = useRef<HTMLDivElement>(null);

  // Header entrance
  useGSAP(
    () => {
      gsap.from(".arise-header", {
        opacity: 0,
        y: 60,
        duration: 0.9,
        ease: "power2.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 70%",
          toggleActions: "play none none reverse",
        },
      });

      gsap.from(".arise-panel-label", {
        opacity: 0,
        y: 30,
        stagger: 0.15,
        duration: 0.7,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".arise-split",
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });

      // Left panel darkens on scroll
      gsap.to(leftPanelRef.current, {
        opacity: 0.1,
        filter: "grayscale(1) brightness(0.15)",
        ease: "none",
        scrollTrigger: {
          trigger: ".arise-split",
          start: "top 40%",
          end: "bottom 40%",
          scrub: 1.2,
          fastScrollEnd: true,
        },
      });

      // Right panel brightens on scroll
      gsap.fromTo(
        rightPanelRef.current,
        { filter: "brightness(0.4) saturate(0.3)" },
        {
          filter: "brightness(1) saturate(1)",
          ease: "none",
          scrollTrigger: {
            trigger: ".arise-split",
            start: "top 40%",
            end: "bottom 40%",
            scrub: 1.2,
            fastScrollEnd: true,
          },
        }
      );

      // Center divider energy pulse on scroll
      gsap.fromTo(
        dividerRef.current,
        { boxShadow: "0 0 4px rgba(96, 165, 250, 0.2)" },
        {
          boxShadow:
            "0 0 40px rgba(96, 165, 250, 0.9), 0 0 80px rgba(109, 40, 217, 0.5)",
          ease: "none",
          scrollTrigger: {
            trigger: ".arise-split",
            start: "top 40%",
            end: "bottom 40%",
            scrub: 1,
            fastScrollEnd: true,
          },
        }
      );

      // Wipe overlay expands from right to left as left panel darkens
      gsap.fromTo(
        wipeOverlayRef.current,
        { clipPath: "inset(0 100% 0 0)" },
        {
          clipPath: "inset(0 0% 0 0)",
          ease: "none",
          scrollTrigger: {
            trigger: ".arise-split",
            start: "top 40%",
            end: "bottom 40%",
            scrub: 1,
            fastScrollEnd: true,
          },
        }
      );

      // Bottom callout fades in
      gsap.from(".arise-callout", {
        opacity: 0,
        y: 40,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".arise-callout",
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      });
    },
    { scope: containerRef }
  );

  return (
    <section
      id="arise"
      ref={containerRef}
      className="relative w-screen overflow-hidden"
      style={{ backgroundColor: "var(--abyss, #020208)" }}
    >
      {/* Korean watermark — 일어서라 (RISE UP) */}
      <div
        aria-hidden="true"
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden"
      >
        <span
          style={{
            fontFamily: "var(--font-zentry, sans-serif)",
            fontSize: "20vw",
            fontWeight: 900,
            color: "var(--monarch-text, #E8E8E8)",
            opacity: 0.03,
            lineHeight: 1,
            userSelect: "none",
            whiteSpace: "nowrap",
            transform: "rotate(-5deg)",
          }}
        >
          일어서라
        </span>
      </div>

      {/* Section header */}
      <div className="arise-header container mx-auto px-5 md:px-10 pt-20 md:pt-32 pb-12 md:pb-16 relative z-10">
        <p
          className="mb-3"
          style={{
            fontFamily: "var(--font-mono, 'Space Mono', monospace)",
            fontSize: "0.625rem",
            textTransform: "uppercase",
            letterSpacing: "0.2em",
            color: "var(--ice-eye, #60A5FA)",
          }}
        >
          THE MOMENT EVERYTHING CHANGED · ICE ELF KING · BARAN
        </p>
        <AnimatedTitle
          title="The <b>A</b>rise Sc<b>e</b>ne"
          containerClass="text-monarch-text text-left !px-0"
        />
        <p
          className="mt-4 max-w-xl font-circular leading-relaxed"
          style={{
            fontSize: "1rem",
            color: "var(--silver, #C0C8D8)",
            opacity: 0.65,
          }}
        >
          In canon, this extraction failed. In MONARCH&apos;s universe — it didn&apos;t.
          One moment. Two realities. Scroll to see what changed.
        </p>
      </div>

      {/* Split Screen — the main event */}
      <div
        className="arise-split relative w-screen overflow-hidden md:overflow-visible"
        style={{ height: "clamp(480px, 80vh, 900px)" }}
      >
        {/* LEFT PANEL — Canon: Extraction Failed */}
        <div
          ref={leftPanelRef}
          className="absolute left-0 top-0 h-full overflow-hidden"
          style={{
            width: "50%",
            willChange: "opacity, filter",
          }}
          aria-label="Canon timeline — the extraction failed"
        >
          <Image
            src="/images/about-bg.jpeg"
            // TODO: Replace with /images/ARISE_IMG_01.webp when generated
            alt="The failed extraction — Baran the Ice Elf King dissolves into light particles, the shadow energy dissipating as Jin-Woo kneels exhausted"
            fill
            className="object-cover object-center"
            sizes="50vw"
            loading="lazy"
          />
          {/* Cold blue-grey tint overlay */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "linear-gradient(135deg, rgba(59,130,246,0.15) 0%, rgba(2,2,8,0.6) 100%)",
            }}
            aria-hidden="true"
          />
          {/* Bottom label */}
          <div className="arise-panel-label absolute bottom-6 left-6 z-10">
            <p
              style={{
                fontFamily: "var(--font-mono, 'Space Mono', monospace)",
                fontSize: "0.5rem",
                textTransform: "uppercase",
                letterSpacing: "0.25em",
                color: "rgba(156, 163, 175, 0.7)",
                marginBottom: "0.5rem",
              }}
            >
              TIMELINE A · CANON
            </p>
            <h3
              style={{
                fontFamily: "var(--font-zentry, sans-serif)",
                fontSize: "clamp(1.25rem, 2.5vw, 2rem)",
                fontWeight: 900,
                textTransform: "uppercase",
                color: "rgba(240, 244, 255, 0.5)",
                lineHeight: 0.95,
              }}
            >
              The Extraction
              <br />
              <span style={{ color: "rgba(239,68,68,0.6)" }}>Failed.</span>
            </h3>
            <p
              className="mt-2 font-circular"
              style={{
                fontSize: "0.75rem",
                color: "rgba(192, 200, 216, 0.45)",
                lineHeight: 1.5,
                maxWidth: "28ch",
              }}
            >
              Baran&apos;s essence dissolved into light. The shadow energy released.
              The moment became a scar.
            </p>
          </div>
        </div>

        {/* RIGHT PANEL — Reimagined: Extraction Succeeded */}
        <div
          ref={rightPanelRef}
          className="absolute right-0 top-0 h-full overflow-hidden"
          style={{
            width: "50%",
            filter: "brightness(0.4) saturate(0.3)",
            willChange: "filter",
          }}
          aria-label="MONARCH timeline — the extraction succeeded"
        >
          <Image
            src="/images/kamish.jpeg"
            // TODO: Replace with /images/ARISE_IMG_02.webp when generated
            alt="The reimagined success — Baran rises as a shadow soldier, massive dark ice armor, kneeling before Jin-Woo in the frost-covered dungeon"
            fill
            className="object-cover object-center"
            sizes="50vw"
            loading="lazy"
          />
          {/* Ice-eye purple-blue glow tint */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "linear-gradient(135deg, rgba(96,165,250,0.2) 0%, rgba(109,40,217,0.3) 50%, rgba(2,2,8,0.4) 100%)",
            }}
            aria-hidden="true"
          />
          {/* Bottom label */}
          <div className="arise-panel-label absolute bottom-6 right-6 z-10 text-right">
            <p
              style={{
                fontFamily: "var(--font-mono, 'Space Mono', monospace)",
                fontSize: "0.5rem",
                textTransform: "uppercase",
                letterSpacing: "0.25em",
                color: "rgba(96, 165, 250, 0.8)",
                marginBottom: "0.5rem",
              }}
            >
              TIMELINE B · MONARCH
            </p>
            <h3
              style={{
                fontFamily: "var(--font-zentry, sans-serif)",
                fontSize: "clamp(1.25rem, 2.5vw, 2rem)",
                fontWeight: 900,
                textTransform: "uppercase",
                color: "var(--white, #F0F4FF)",
                lineHeight: 0.95,
              }}
            >
              He
              <br />
              <span style={{ color: "var(--ice-eye, #60A5FA)" }}>Arose.</span>
            </h3>
            <p
              className="mt-2 font-circular"
              style={{
                fontSize: "0.75rem",
                color: "var(--silver, #C0C8D8)",
                lineHeight: 1.5,
                maxWidth: "28ch",
                opacity: 0.75,
              }}
            >
              Dark ice where white frost once lived. Baran kneels. History
              rewrote itself. The moment changed everything.
            </p>
          </div>
        </div>

        {/* CENTER DIVIDER — energy line */}
        <div
          ref={dividerRef}
          className="absolute top-0 h-full z-20 pointer-events-none"
          style={{
            left: "50%",
            width: "2px",
            background:
              "linear-gradient(to bottom, transparent, var(--ice-eye, #60A5FA), transparent)",
            boxShadow: "0 0 4px rgba(96, 165, 250, 0.2)",
            willChange: "box-shadow",
          }}
          aria-hidden="true"
        />

        {/* CENTER LABEL — floats on the divider */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 pointer-events-none"
          aria-hidden="true"
        >
          <div
            className="flex flex-col items-center gap-2"
            style={{
              background: "rgba(2, 2, 8, 0.85)",
              border: "1px solid rgba(96, 165, 250, 0.3)",
              padding: "0.75rem 1rem",
              borderRadius: "2px",
              backdropFilter: "blur(8px)",
            }}
          >
            <p
              style={{
                fontFamily: "var(--font-mono, 'Space Mono', monospace)",
                fontSize: "0.45rem",
                textTransform: "uppercase",
                letterSpacing: "0.2em",
                color: "var(--ice-eye, #60A5FA)",
                whiteSpace: "nowrap",
              }}
            >
              SCROLL TO WITNESS
            </p>
            <div
              style={{
                width: "1px",
                height: "20px",
                background:
                  "linear-gradient(to bottom, var(--ice-eye, #60A5FA), transparent)",
              }}
            />
          </div>
        </div>

        {/* WIPE OVERLAY — dark veil that swallows the left side */}
        <div
          ref={wipeOverlayRef}
          className="absolute left-0 top-0 h-full pointer-events-none z-10"
          style={{
            width: "50%",
            clipPath: "inset(0 100% 0 0)",
            backgroundColor: "var(--void, #000000)",
            willChange: "clip-path",
          }}
          aria-hidden="true"
        />
      </div>

      {/* Bottom callout */}
      <div className="arise-callout container mx-auto px-5 md:px-10 py-16 md:py-20 relative z-10">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-8 md:gap-16">
          {/* Left — the moral */}
          <div className="flex-1 max-w-lg">
            <p
              className="mb-4"
              style={{
                fontFamily: "var(--font-mono, 'Space Mono', monospace)",
                fontSize: "0.5rem",
                textTransform: "uppercase",
                letterSpacing: "0.25em",
                color: "var(--ice-eye, #60A5FA)",
                opacity: 0.7,
              }}
            >
              MONARCH UNIVERSE · LORE DIVERGENCE
            </p>
            <h3
              className="special-font mb-4"
              style={{
                fontFamily: "var(--font-zentry, sans-serif)",
                fontSize: "clamp(1.75rem, 3.5vw, 3rem)",
                fontWeight: 900,
                textTransform: "uppercase",
                color: "var(--white, #F0F4FF)",
                lineHeight: 0.92,
                letterSpacing: "-0.01em",
              }}
            >
              You didn&apos;t just <b>s</b>urvive.
              <br />
              You <b>r</b>ewrote it.
            </h3>
            <p
              className="font-circular leading-relaxed"
              style={{
                fontSize: "0.9375rem",
                color: "var(--silver, #C0C8D8)",
                opacity: 0.65,
                maxWidth: "48ch",
              }}
            >
              In the MONARCH universe, the Baran extraction succeeded. A single
              moment of difference — a stronger will, a deeper shadow — and
              history bent. The Shadow Army gained its ice general. And you took
              one step closer to absolute sovereignty.
            </p>
          </div>

          {/* Right — stat block */}
          <div
            className="flex-shrink-0 p-6 rounded-lg"
            style={{
              backgroundColor: "var(--shadow-dark, #0D0F2A)",
              border: "1px solid rgba(96, 165, 250, 0.15)",
              minWidth: "220px",
            }}
            role="complementary"
            aria-label="Baran extraction statistics"
          >
            <p
              className="mb-4"
              style={{
                fontFamily: "var(--font-mono, 'Space Mono', monospace)",
                fontSize: "0.5rem",
                textTransform: "uppercase",
                letterSpacing: "0.2em",
                color: "var(--ice-eye, #60A5FA)",
                opacity: 0.6,
              }}
            >
              BARAN — SHADOW EXTRACTION
            </p>
            {[
              { label: "Rank", value: "MONARCH" },
              { label: "Element", value: "DARK ICE" },
              { label: "Loyalty", value: "ABSOLUTE" },
              { label: "Timeline", value: "B (MONARCH)" },
            ].map((stat) => (
              <div
                key={stat.label}
                className="flex items-center justify-between mb-3"
              >
                <span
                  style={{
                    fontFamily: "var(--font-mono, 'Space Mono', monospace)",
                    fontSize: "0.5rem",
                    textTransform: "uppercase",
                    letterSpacing: "0.1em",
                    color: "var(--silver, #C0C8D8)",
                    opacity: 0.4,
                  }}
                >
                  {stat.label}
                </span>
                <span
                  style={{
                    fontFamily: "var(--font-mono, 'Space Mono', monospace)",
                    fontSize: "0.5rem",
                    textTransform: "uppercase",
                    letterSpacing: "0.1em",
                    color: "var(--ice-eye, #60A5FA)",
                  }}
                >
                  {stat.value}
                </span>
              </div>
            ))}
            <div
              className="mt-4 h-px w-full"
              style={{
                background:
                  "linear-gradient(90deg, var(--ice-eye, #60A5FA), transparent)",
                opacity: 0.3,
              }}
              aria-hidden="true"
            />
            <p
              className="mt-3"
              style={{
                fontFamily: "var(--font-mono, 'Space Mono', monospace)",
                fontSize: "0.45rem",
                textTransform: "uppercase",
                letterSpacing: "0.15em",
                color: "rgba(240, 244, 255, 0.25)",
              }}
            >
              SHADOW ARMY COUNT: +1 ICE GENERAL
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AriseScene;
