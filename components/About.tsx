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

return (
  <div id="about" className="min-h-screen w-screen">
    <div className="relative mb-8 mt-36 flex flex-col items-center gap-5">
      <h2
        className="text-monarch-text-dim"
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
        containerClass="mt-5 text-monarch-text text-center"
      />

      <div className="about-subtext text-monarch-text-dim">
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
  </div>
);
};

export default About;
