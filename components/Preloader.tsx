"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

interface PreloaderProps {
  onComplete: () => void;
}

const Preloader = ({ onComplete }: PreloaderProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const portalRef = useRef<HTMLDivElement>(null);
  const coreRef = useRef<HTMLDivElement>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({
        onComplete: () => {
          onComplete();
        },
      });
      tlRef.current = tl;

      // 1. Initial State
      gsap.set(".vortex-layer", { scale: 0, opacity: 0, rotation: 0 });
      gsap.set(coreRef.current, { scale: 0, opacity: 0 });
      gsap.set(".energy-arc", { strokeDashoffset: 1000, opacity: 0 });

      // 2. The Ignition
      tl.to(coreRef.current, {
        scale: 1,
        opacity: 1,
        duration: 0.8,
        ease: "back.out(1.7)",
        delay: 0.2,
      })
      .to(".vortex-layer", {
        scale: 1,
        opacity: 0.6,
        stagger: 0.1,
        duration: 1,
        ease: "power2.out",
      }, "-=0.4")
      .to(".vortex-layer-1", {
        rotation: 360,
        duration: 10,
        repeat: -1,
        ease: "none",
      }, 0)
      .to(".vortex-layer-2", {
        rotation: -360,
        duration: 15,
        repeat: -1,
        ease: "none",
      }, 0)
      .to(".vortex-layer-3", {
        rotation: 180,
        duration: 20,
        repeat: -1,
        ease: "none",
      }, 0);

      // 3. Energy Arcs (Cracks)
      tl.to(".energy-arc", {
        strokeDashoffset: 0,
        opacity: 0.8,
        duration: 0.6,
        stagger: 0.1,
        ease: "power1.inOut",
      }, "-=0.8");

      // 4. Color Shift & Arise Impact
      tl.to([".vortex-layer", coreRef.current, ".energy-arc"], {
        filter: "hue-rotate(180deg) brightness(1.5)", // Shift from Red/Purple to Blue/Cyan
        duration: 0.5,
        ease: "power4.out",
      }, "+=0.2")
      .fromTo(
        ".preloader-arise",
        { scale: 2, opacity: 0, filter: "blur(20px)" },
        {
          scale: 1,
          opacity: 1,
          filter: "blur(0px)",
          duration: 0.4,
          ease: "power4.out",
        },
        "-=0.3"
      );

      // 5. Shatter / Dissolve
      tl.to(".preloader-arise", {
        scale: 1.1,
        opacity: 0,
        duration: 0.2,
        delay: 0.3,
      })
      .to(containerRef.current, {
        opacity: 0,
        scale: 1.1,
        duration: 0.6,
        ease: "power2.inOut",
      }, "-=0.1");

      // Skip button
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
      className="fixed inset-0 z-[100000] flex flex-col items-center justify-center overflow-hidden bg-monarch-void"
      aria-hidden="true"
    >
      {/* The Portal Vortex */}
      <div ref={portalRef} className="relative size-[80vh] max-w-full">
        
        {/* Layered swirling energy (CSS Gradients + Blurs) */}
        <div className="vortex-layer vortex-layer-1 absolute inset-0 rounded-full blur-[80px]" 
          style={{ 
            background: "conic-gradient(from 0deg, transparent, var(--monarch-red), transparent, var(--monarch-purple), transparent)",
            opacity: 0 
          }} 
        />
        <div className="vortex-layer vortex-layer-2 absolute inset-[-10%] rounded-full blur-[100px]" 
          style={{ 
            background: "conic-gradient(from 180deg, transparent, var(--monarch-purple), transparent, var(--monarch-red), transparent)",
            opacity: 0 
          }} 
        />
        <div className="vortex-layer vortex-layer-3 absolute inset-[-20%] rounded-full blur-[120px]" 
          style={{ 
            background: "radial-gradient(circle, var(--monarch-red) 0%, transparent 70%)",
            opacity: 0 
          }} 
        />

        {/* Central Glowing Core */}
        <div 
          ref={coreRef}
          className="absolute-center z-10 size-32 rounded-full blur-md"
          style={{ 
            background: "radial-gradient(circle, #fff 0%, var(--monarch-red) 40%, transparent 80%)",
            boxShadow: "0 0 100px 20px var(--monarch-red)"
          }}
        />

        {/* Organic Energy Arcs (SVG) */}
        <svg
          viewBox="0 0 400 400"
          className="absolute inset-0 size-full overflow-visible"
          fill="none"
        >
          <path className="energy-arc" d="M200 200 Q220 150 180 100 T200 20" stroke="var(--monarch-blue)" strokeWidth="2" strokeDasharray="1000" />
          <path className="energy-arc" d="M200 200 Q150 220 100 180 T20 200" stroke="var(--monarch-blue)" strokeWidth="2" strokeDasharray="1000" />
          <path className="energy-arc" d="M200 200 Q180 250 220 300 T200 380" stroke="var(--monarch-blue)" strokeWidth="2" strokeDasharray="1000" />
          <path className="energy-arc" d="M200 200 Q250 180 300 220 T380 200" stroke="var(--monarch-blue)" strokeWidth="2" strokeDasharray="1000" />
          
          <path className="energy-arc" d="M200 200 L250 150 L280 90" stroke="var(--monarch-purple)" strokeWidth="1.5" strokeDasharray="1000" opacity="0.6" />
          <path className="energy-arc" d="M200 200 L150 250 L90 280" stroke="var(--monarch-purple)" strokeWidth="1.5" strokeDasharray="1000" opacity="0.6" />
        </svg>
      </div>

      {/* ARISE Impact Text */}
      <div
        className="preloader-arise absolute-center z-20 pointer-events-none select-none"
        style={{
          fontFamily: "var(--font-zentry)",
          fontSize: "clamp(4rem, 15vw, 12rem)",
          fontWeight: 900,
          color: "var(--monarch-text)",
          letterSpacing: "-0.02em",
          textTransform: "uppercase",
          opacity: 0,
          lineHeight: 1,
          textShadow: "0 0 30px var(--monarch-blue)",
        }}
      >
        ARISE
      </div>

      {/* Skip button */}
      <button
        className="preloader-skip absolute bottom-8 right-8 z-30 opacity-0 bg-transparent border border-monarch-border px-4 py-2 text-[10px] font-mono tracking-[0.2em] text-monarch-text-dim hover:text-monarch-text hover:border-monarch-text transition-colors"
        onClick={handleSkip}
        aria-label="Skip intro"
      >
        [ SKIP ]
      </button>
    </div>
  );
};

export default Preloader;
