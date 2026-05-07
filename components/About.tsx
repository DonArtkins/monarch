"use client";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import AnimatedTitle from "./AnimatedTitle";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const About = () => {
  useGSAP(
    () => {
      const clipAnimation = gsap.timeline({
        scrollTrigger: {
          trigger: "#clip",
          start: "center center",
          end: "+=800 center",
          scrub: 0.5,
          pin: true,
          pinSpacing: true,
        },
      });

    clipAnimation.to(".mask-clip-path", {
      width: "100vw",
      height: "100vh",
      borderRadius: 0,
    });

    // Fade in HUD label as portal fully expands
    clipAnimation.to(
      ".portal-hud-label",
      {
        opacity: 1,
        duration: 0.3,
        ease: "power2.out",
      },
      0.7 // Start when expansion is 70% complete
    );
  },
  { dependencies: [], scope: "#about" }
);

// Panel animations — reveal on scroll
useGSAP(
  () => {
    // Left panel slides in from left
    gsap.from(".origin-panel-left", {
      x: -60,
      opacity: 0,
      duration: 0.9,
      ease: "power2.out",
      scrollTrigger: {
        trigger: "#origin-panels",
        start: "top 75%",
        toggleActions: "play none none reverse",
      },
    });

    // Right panel slides in from right with slight delay
    gsap.from(".origin-panel-right", {
      x: 60,
      opacity: 0,
      duration: 0.9,
      delay: 0.15,
      ease: "power2.out",
      scrollTrigger: {
        trigger: "#origin-panels",
        start: "top 75%",
        toggleActions: "play none none reverse",
      },
    });
  },
  { scope: "#about" }
);

return (
  <div id="about" className="min-h-screen w-screen bg-monarch-ice-white">
    <div className="relative mb-8 mt-36 flex flex-col items-center gap-5">
      <h2
        className="text-monarch-ice-text-dim"
        style={{
          fontFamily: "var(--font-mono, monospace)",
          fontSize: "0.625rem",
          textTransform: "uppercase",
          letterSpacing: "0.2em",
        }}
      >
        ORIGIN · CARTENON TEMPLE
      </h2>

      <AnimatedTitle
        title="Bef<b>o</b>re the <br/> Syst<b>e</b>m Woke"
        containerClass="mt-5 text-monarch-ice-text text-center"
      />

      <div className="about-subtext text-monarch-ice-text-dim">
        <p>Every raid, every dungeon — they called you the weakest.</p>
        <p>Then you died. And came back different.</p>
      </div>
    </div>
    <div className="h-dvh w-screen" id="clip">
      <div
        className="mask-clip-path about-image relative overflow-hidden"
        style={{ willChange: "width, height, border-radius" }}
      >
        <Image
          src="/images/about-bg.jpeg" // TODO: Replace with /images/PORTAL_IMG_01.webp when generated
          alt="The Double Dungeon — the stone corridor where everything changed"
          fill
          className="object-cover object-center"
          priority
          sizes="100vw"
        />

        {/* Cinematic vignette overlay */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at center, transparent 30%, rgba(2, 2, 8, 0.7) 100%)",
          }}
          aria-hidden="true"
        />

        {/* Bottom HUD label — reveals as portal expands */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 text-center opacity-0 portal-hud-label pointer-events-none">
          <p
            className="text-[10px] uppercase tracking-[0.3em] text-monarch-text-dim mb-1"
            style={{ fontFamily: "var(--font-mono, monospace)" }}
          >
            CARTENON TEMPLE · DOUBLE DUNGEON
          </p>
          <p
            className="text-[10px] uppercase tracking-[0.2em]"
            style={{
              color: "var(--gate-red, #FF2B2B)",
              fontFamily: "var(--font-mono, monospace)",
            }}
          >
            ▲ DANGER LEVEL: CATASTROPHIC
          </p>
        </div>
      </div>
    </div>

    {/* ORIGIN story panels — reveal on scroll after portal */}
    <div
      id="origin-panels"
      className="relative z-10 w-screen py-24 px-5 md:px-10"
      style={{ backgroundColor: "var(--monarch-ice-white, #F0F4FF)" }}
    >
      <div className="container mx-auto max-w-6xl">
        <div className="flex flex-col md:flex-row gap-12 md:gap-20 items-start justify-between">
          {/* Panel 1 — Left: The Weakest */}
          <div className="origin-panel origin-panel-left flex-1 max-w-md">
            <p
              className="mb-4"
              style={{
                fontFamily: "var(--font-mono, monospace)",
                fontSize: "0.625rem",
                textTransform: "uppercase",
                letterSpacing: "0.2em",
                color: "var(--monarch-ice-text-dim)",
              }}
            >
              E-RANK · HUNTER ID #4715
            </p>
            <h3
              className="special-font mb-5"
              style={{
                fontFamily: "var(--font-zentry, sans-serif)",
                fontSize: "clamp(2rem, 4vw, 3.5rem)",
                fontWeight: 900,
                textTransform: "uppercase",
                color: "var(--monarch-ice-text, #030014)",
                lineHeight: 0.95,
              }}
            >
              The <b>W</b>eakest
            </h3>
            <p
              className="font-circular leading-relaxed"
              style={{
                fontSize: "1rem",
                color: "var(--monarch-ice-text-dim, #404060)",
                maxWidth: "36ch",
              }}
            >
              Every raid, every dungeon — they called you the weakest. You
              survived on borrowed time, a footnote in a world of gods.
              The healers healed everyone else first.
            </p>
            <div
              className="mt-6 h-px w-16"
              style={{ backgroundColor: "var(--monarch-ice-border)" }}
              aria-hidden="true"
            />
          </div>

          {/* Panel 2 — Right: The System Chose */}
          <div className="origin-panel origin-panel-right flex-1 max-w-md md:mt-24">
            <p
              className="mb-4"
              style={{
                fontFamily: "var(--font-mono, monospace)",
                fontSize: "0.625rem",
                textTransform: "uppercase",
                letterSpacing: "0.2em",
                color: "var(--gate-red, #FF2B2B)",
              }}
            >
              DOUBLE DUNGEON · INCIDENT ZERO
            </p>
            <h3
              className="special-font mb-5"
              style={{
                fontFamily: "var(--font-zentry, sans-serif)",
                fontSize: "clamp(2rem, 4vw, 3.5rem)",
                fontWeight: 900,
                textTransform: "uppercase",
                color: "var(--monarch-ice-text, #030014)",
                lineHeight: 0.95,
              }}
            >
              The Syst<b>e</b>m <b>C</b>hose
            </h3>
            <p
              className="font-circular leading-relaxed"
              style={{
                fontSize: "1rem",
                color: "var(--monarch-ice-text-dim, #404060)",
                maxWidth: "36ch",
              }}
            >
              Trapped in the Cartenon Temple. Every hunter dead. The statues
              wouldn't stop. Then — a message appeared in the air. A quest. Only
              you could see it.
            </p>
            <div
              className="mt-6 h-px w-16"
              style={{
                backgroundColor: "var(--gate-red, #FF2B2B)",
                opacity: 0.6,
              }}
              aria-hidden="true"
            />
          </div>
        </div>
      </div>

      {/* Korean watermark — decorative */}
      <div
        aria-hidden="true"
        className="absolute bottom-0 right-0 pointer-events-none select-none overflow-hidden"
        style={{ maxWidth: "60vw" }}
      >
        <span
          style={{
            fontFamily: "var(--font-zentry, sans-serif)",
            fontSize: "20vw",
            fontWeight: 900,
            color: "var(--monarch-ice-text)",
            opacity: 0.05,
            lineHeight: 1,
            display: "block",
            transform: "translateX(15%) translateY(30%) rotate(-15deg)",
          }}
        >
          기원
        </span>
      </div>
    </div>
  </div>
);
};

export default About;
