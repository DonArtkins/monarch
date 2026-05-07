"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const RealmTransition = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const wipeRef = useRef<HTMLDivElement>(null);
  const glowLineRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!wipeRef.current || !glowLineRef.current) return;

      // Main horizontal wipe
      gsap.fromTo(
        wipeRef.current,
        {
          clipPath: "inset(0 100% 0 0)",
        },
        {
          clipPath: "inset(0 0% 0 0)",
          ease: "power2.inOut",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 0.8,
          },
        }
      );

      // Glow edge line — follows the wipe leading edge
      gsap.fromTo(
        glowLineRef.current,
        { x: "-100%" },
        {
          x: "100vw",
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 0.6,
          },
        }
      );
    },
    { scope: containerRef }
  );

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="relative w-screen overflow-hidden"
      style={{
        height: "2px",
        backgroundColor: "var(--abyss, #020208)",
      }}
    >
      {/* The wipe panel — same color as receiving section bg */}
      <div
        ref={wipeRef}
        className="absolute inset-0"
        style={{
          backgroundColor: "var(--shadow-dark, #0D0F2A)",
          clipPath: "inset(0 100% 0 0)",
          willChange: "clip-path",
        }}
      />

      {/* Ice-eye glow leading edge — the light bleeding through the gate crack */}
      <div
        ref={glowLineRef}
        className="absolute top-0 h-full pointer-events-none"
        style={{
          width: "3px",
          background:
            "linear-gradient(to bottom, transparent, var(--ice-eye, #60A5FA), transparent)",
          filter: "blur(4px)",
          boxShadow: "0 0 12px var(--ice-eye, #60A5FA)",
          willChange: "transform",
        }}
      />
    </div>
  );
};

export default RealmTransition;
