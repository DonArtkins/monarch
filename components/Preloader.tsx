"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

interface PreloaderProps {
  onComplete: () => void;
}

const Preloader = ({ onComplete }: PreloaderProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({
        onComplete: () => {
          onComplete();
        },
      });
      tlRef.current = tl;

      // 1. Initial horizontal crack line
      tl.set(".crack-line-h", { scaleX: 0, transformOrigin: "center center" })
        .to(".crack-line-h", {
          scaleX: 1,
          duration: 0.4,
          ease: "power4.out",
          delay: 0.3,
        })
        // 2. SVG crack paths animate in
        .to(".crack-path", {
          strokeDashoffset: 0,
          duration: 0.5,
          ease: "power2.inOut",
          stagger: 0.05,
        }, "-=0.1")
        // 3. Glow bleeds through crack
        .to(".crack-glow", {
          opacity: 1,
          duration: 0.4,
          ease: "power2.out",
        }, "-=0.2")
        // 4. ARISE text impact
        .fromTo(
          ".preloader-arise",
          { scale: 1.6, opacity: 0, filter: "blur(20px)" },
          {
            scale: 1,
            opacity: 1,
            filter: "blur(0px)",
            duration: 0.4,
            ease: "power4.out",
          },
          "-=0.1"
        )
        // 5. Dissolve — clip-path wipe outward
        .to(".preloader-arise", {
          opacity: 0,
          scale: 0.9,
          duration: 0.3,
          delay: 0.2,
        })
        .to(
          containerRef.current,
          {
            clipPath: "inset(50% 0 50% 0)",
            duration: 0.5,
            ease: "power4.inOut",
          },
          "-=0.1"
        );

      // Skip button appears after 1.2s
      gsap.to(".preloader-skip", {
        opacity: 1,
        duration: 0.3,
        delay: 1.2,
      });
    },
    { scope: containerRef }
  );

  const handleSkip = () => {
    if (tlRef.current) {
      tlRef.current.progress(1);
    }
  };

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 100000,
        backgroundColor: "var(--monarch-void)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        gap: "2rem",
        clipPath: "inset(0 0 0 0)",
      }}
    >
      {/* Crack SVG overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* Horizontal base line */}
        <div
          className="crack-line-h"
          style={{
            position: "absolute",
            height: 1,
            width: "60vw",
            backgroundColor: "var(--monarch-blue)",
            boxShadow: "0 0 8px var(--monarch-blue), 0 0 20px var(--monarch-blue)",
          }}
        />

        {/* SVG branching cracks */}
        <svg
          viewBox="0 0 800 400"
          style={{
            position: "absolute",
            width: "80vw",
            maxWidth: 800,
            height: "auto",
            overflow: "visible",
          }}
          fill="none"
          aria-hidden="true"
        >
          {/* Main crack paths — stroke-dasharray animated */}
          <path
            className="crack-path"
            d="M400 200 L340 160 L310 130 L280 90"
            stroke="var(--monarch-blue)"
            strokeWidth="1.5"
            strokeDasharray="200"
            strokeDashoffset="200"
          />
          <path
            className="crack-path"
            d="M400 200 L450 150 L480 110 L510 80"
            stroke="var(--monarch-blue)"
            strokeWidth="1.5"
            strokeDasharray="200"
            strokeDashoffset="200"
          />
          <path
            className="crack-path"
            d="M400 200 L360 230 L330 270 L300 310"
            stroke="var(--monarch-blue)"
            strokeWidth="1.5"
            strokeDasharray="200"
            strokeDashoffset="200"
          />
          <path
            className="crack-path"
            d="M400 200 L440 240 L470 280 L500 320"
            stroke="var(--monarch-blue)"
            strokeWidth="1.5"
            strokeDasharray="200"
            strokeDashoffset="200"
          />
          {/* Secondary micro-cracks */}
          <path
            className="crack-path"
            d="M340 160 L315 145 L295 155"
            stroke="var(--monarch-purple)"
            strokeWidth="0.8"
            strokeDasharray="100"
            strokeDashoffset="100"
            opacity="0.6"
          />
          <path
            className="crack-path"
            d="M450 150 L470 138 L488 148"
            stroke="var(--monarch-purple)"
            strokeWidth="0.8"
            strokeDasharray="100"
            strokeDashoffset="100"
            opacity="0.6"
          />
        </svg>

        {/* Purple glow bleeding through crack */}
        <div
          className="crack-glow"
          style={{
            position: "absolute",
            width: "40vw",
            height: 2,
            background:
              "linear-gradient(90deg, transparent, var(--monarch-purple), transparent)",
            filter: "blur(12px)",
            opacity: 0,
          }}
        />
      </div>

      {/* ARISE text */}
      <div
        className="preloader-arise"
        style={{
          fontFamily: "var(--font-zentry)",
          fontSize: "clamp(4rem, 15vw, 12rem)",
          fontWeight: 900,
          color: "var(--monarch-text)",
          letterSpacing: "-0.02em",
          textTransform: "uppercase",
          opacity: 0,
          position: "relative",
          zIndex: 1,
          lineHeight: 1,
        }}
      >
        ARISE
      </div>

      {/* Skip button */}
      <button
        className="preloader-skip system-label"
        onClick={handleSkip}
        style={{
          position: "absolute",
          bottom: "2rem",
          right: "2rem",
          opacity: 0,
          background: "transparent",
          border: "1px solid var(--monarch-border)",
          color: "var(--monarch-text-dim)",
          padding: "0.5rem 1rem",
          cursor: "pointer",
          transition: "border-color 0.2s",
        }}
        aria-label="Skip intro"
      >
        [ SKIP ]
      </button>
    </div>
  );
};

export default Preloader;
