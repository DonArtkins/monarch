"use client";

import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface BeyondBeat {
  id: string;
  index: number;
  label: string;
  headline: string;
  body: string;
  imageSrc: string;
  imageAlt: string;
  accentColor: string;
  imagePosition: "left" | "right";
  ariaLabel: string;
}

const BEYOND_BEATS: BeyondBeat[] = [
  {
    id: "father",
    index: 1,
    label: "SEASON III · THE FALLEN MONARCH",
    headline: "Your Father Fell.",
    body: "He held the title of Shadow Monarch before you. He paid for it with everything he had. The power flowing through you — every shadow soldier, every extraction — it is built on the architecture of his sacrifice. He is waiting. Somewhere beyond the dungeon system. Beyond the Architect's reach.",
    imageSrc: "/images/footer-bg.jpeg", // TODO: Replace with /images/BEYOND_IMG_01.webp
    imageAlt:
      "Jin-Woo's father — the original Shadow Monarch in ancient black armor, eyes glowing deep blue, waiting in the void realm",
    accentColor: "var(--ice-eye, #60A5FA)",
    imagePosition: "right",
    ariaLabel: "Beyond beat 1 — Jin-Woo's father, the fallen Shadow Monarch",
  },
  {
    id: "statues",
    index: 2,
    label: "SEASON III · THE NINE DIVINE BEASTS",
    headline: "The Statues Wake.",
    body: "Nine divine beasts, imprisoned in stone for ten thousand years, are opening their eyes. Gold light bleeds from the cracks. Stone falls from their hands. They were placed there to guard a throne — and they are looking at whoever sits on it. That is you.",
    imageSrc: "/images/about-bg.jpeg", // TODO: Replace with /images/BEYOND_IMG_02.webp
    imageAlt:
      "Two of the nine colossal divine beast statues awakening in the throne room — stone cracking, golden light erupting from their eyes",
    accentColor: "var(--monarch-gold, #FFD700)",
    imagePosition: "left",
    ariaLabel: "Beyond beat 2 — the nine temple statues awakening",
  },
  {
    id: "throne",
    index: 3,
    label: "SEASON IV · THE SYSTEM THRONE",
    headline: "You Take the Throne.",
    body: "The Architect built the rules. The Monarchs played the game. You broke both. The seat of the Absolute Being — the throne of the system itself — was built for a god. You are not a god. You are the Shadow Monarch. And gods kneel.",
    imageSrc: "/images/system-ui.jpeg", // TODO: Replace with /images/BEYOND_IMG_03.webp
    imageAlt:
      "Sung Jin-Woo seated on the Architect's cosmic throne of pure white light and geometric crystal, shadow energy and divine light merging around him",
    accentColor: "var(--shadow-purple, #6D28D9)",
    imagePosition: "right",
    ariaLabel:
      "Beyond beat 3 — Jin-Woo takes the Architect's throne, becoming ruler of the system itself",
  },
];

interface BeyondBeatComponentProps {
  beat: BeyondBeat;
}

const BeyondBeatComponent = ({ beat }: BeyondBeatComponentProps) => {
  const beatRef = useRef<HTMLDivElement>(null);
  const imageWrapperRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // Text slides in from opposite side of image
      const textOffset = beat.imagePosition === "right" ? -60 : 60;
      gsap.from(".beyond-text", {
        opacity: 0,
        x: textOffset,
        duration: 0.9,
        ease: "power2.out",
        scrollTrigger: {
          trigger: beatRef.current,
          start: "top 75%",
          toggleActions: "play none none reverse",
        },
      });

      // Image slides in from its side
      const imageOffset = beat.imagePosition === "right" ? 60 : -60;
      gsap.from(imageWrapperRef.current, {
        opacity: 0,
        x: imageOffset,
        duration: 0.9,
        ease: "power2.out",
        scrollTrigger: {
          trigger: beatRef.current,
          start: "top 75%",
          toggleActions: "play none none reverse",
        },
      });

      // Subtle parallax on the image wrapper
      gsap.to(imageWrapperRef.current, {
        y: -20,
        ease: "none",
        scrollTrigger: {
          trigger: beatRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.5,
        },
      });
    },
    { scope: beatRef }
  );

  const isImageLeft = beat.imagePosition === "left";

  return (
    <div
      ref={beatRef}
      className="beyond-beat flex flex-col md:flex-row items-center gap-10 md:gap-16 py-16 md:py-24"
      style={{
        borderBottom: "1px solid rgba(255,255,255,0.04)",
      }}
      role="article"
      aria-label={beat.ariaLabel}
    >
      {/* Image — conditionally reordered */}
      <div
        ref={imageWrapperRef}
        className={`w-full md:w-5/12 ${isImageLeft ? "md:order-1" : "md:order-2"} relative`}
        style={{
          willChange: "transform",
        }}
      >
        <div
          className="relative overflow-hidden rounded-lg"
          style={{
            height: "clamp(280px, 45vh, 500px)",
            border: `1px solid ${beat.accentColor}22`,
          }}
        >
          <Image
            src={beat.imageSrc}
            alt={beat.imageAlt}
            fill
            className="object-cover object-center"
            sizes="(max-width: 768px) 100vw, 42vw"
            loading="lazy"
          />
          {/* Gradient overlay */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: `linear-gradient(135deg, ${beat.accentColor}11 0%, transparent 60%)`,
            }}
            aria-hidden="true"
          />
          {/* Beat index */}
          <div
            className="absolute top-4 left-4 z-10"
            aria-hidden="true"
          >
            <span
              style={{
                fontFamily: "var(--font-mono, 'Space Mono', monospace)",
                fontSize: "0.5rem",
                letterSpacing: "0.2em",
                color: `${beat.accentColor}`,
                opacity: 0.6,
              }}
            >
              {String(beat.index).padStart(2, "0")} / 03
            </span>
          </div>
        </div>
      </div>

      {/* Text */}
      <div
        className={`beyond-text w-full md:w-7/12 ${isImageLeft ? "md:order-2" : "md:order-1"}`}
      >
        <p
          className="mb-4"
          style={{
            fontFamily: "var(--font-mono, 'Space Mono', monospace)",
            fontSize: "0.5rem",
            textTransform: "uppercase",
            letterSpacing: "0.25em",
            color: beat.accentColor,
            opacity: 0.8,
          }}
        >
          {beat.label}
        </p>

        <h3
          className="special-font mb-5"
          style={{
            fontFamily: "var(--font-zentry, sans-serif)",
            fontSize: "clamp(2rem, 5vw, 4rem)",
            fontWeight: 900,
            textTransform: "uppercase",
            color: "var(--white, #F0F4FF)",
            lineHeight: 0.9,
            letterSpacing: "-0.02em",
          }}
        >
          {beat.headline}
        </h3>

        <p
          style={{
            fontFamily: "var(--font-circular, sans-serif)",
            fontSize: "1rem",
            color: "var(--silver, #C0C8D8)",
            lineHeight: 1.8,
            opacity: 0.7,
            maxWidth: "52ch",
          }}
        >
          {beat.body}
        </p>

        {/* Accent dash */}
        <div
          className="mt-6 h-px"
          style={{
            width: "4rem",
            background: beat.accentColor,
            opacity: 0.4,
          }}
          aria-hidden="true"
        />
      </div>
    </div>
  );
};

const Beyond = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.from(".beyond-header", {
        opacity: 0,
        y: 50,
        duration: 0.9,
        ease: "power2.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 70%",
          toggleActions: "play none none reverse",
        },
      });

      gsap.from(".beyond-footer-note", {
        opacity: 0,
        y: 30,
        duration: 0.7,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".beyond-footer-note",
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      });
    },
    { scope: containerRef }
  );

  return (
    <section
      id="beyond"
      ref={containerRef}
      className="relative w-screen overflow-hidden"
      style={{ backgroundColor: "var(--abyss, #020208)" }}
    >
      {/* Korean watermark — TRANSCEND (초월) */}
      <div
        aria-hidden="true"
        className="absolute top-0 right-0 pointer-events-none select-none overflow-hidden"
        style={{ maxWidth: "50vw", maxHeight: "100%" }}
      >
        <span
          style={{
            fontFamily: "var(--font-zentry, sans-serif)",
            fontSize: "20vw",
            fontWeight: 900,
            color: "var(--monarch-text, #E8E8E8)",
            opacity: 0.025,
            lineHeight: 1,
            display: "block",
            transform: "translateX(20%) rotate(15deg)",
            userSelect: "none",
            whiteSpace: "nowrap",
          }}
        >
          초월
        </span>
      </div>

      <div className="container mx-auto px-5 md:px-10 relative z-10 pt-20 md:pt-32">
        {/* Section header */}
        <div className="beyond-header mb-4">
          <p
            className="mb-3"
            style={{
              fontFamily: "var(--font-mono, 'Space Mono', monospace)",
              fontSize: "0.625rem",
              textTransform: "uppercase",
              letterSpacing: "0.2em",
              color: "var(--monarch-gold, #FFD700)",
            }}
          >
            MONARCH UNIVERSE · SEASONS III — IV
          </p>
          <h2
            className="special-font"
            style={{
              fontFamily: "var(--font-zentry, sans-serif)",
              fontSize: "clamp(2.5rem, 6vw, 5rem)",
              fontWeight: 900,
              textTransform: "uppercase",
              color: "var(--white, #F0F4FF)",
              lineHeight: 0.9,
              letterSpacing: "-0.02em",
              maxWidth: "18ch",
            }}
          >
            Bey<b>o</b>nd the <br /> Syst<b>e</b>m
          </h2>
          <p
            className="mt-5 max-w-lg font-circular leading-relaxed"
            style={{
              fontSize: "1rem",
              color: "var(--silver, #C0C8D8)",
              opacity: 0.6,
            }}
          >
            The dungeons were only the beginning. Beyond the gates lies a war
            between gods — and you are the only one who walks both sides.
          </p>
        </div>

        {/* Beat panels */}
        <div className="mt-12">
          {BEYOND_BEATS.map((beat) => (
            <BeyondBeatComponent key={beat.id} beat={beat} />
          ))}
        </div>

        {/* Footer note */}
        <div
          className="beyond-footer-note flex flex-col items-center text-center py-16 md:py-24"
        >
          <div
            className="h-px w-24 mb-6"
            style={{
              background:
                "linear-gradient(90deg, transparent, var(--monarch-gold, #FFD700), transparent)",
            }}
            aria-hidden="true"
          />
          <p
            style={{
              fontFamily: "var(--font-mono, 'Space Mono', monospace)",
              fontSize: "0.625rem",
              textTransform: "uppercase",
              letterSpacing: "0.3em",
              color: "rgba(240, 244, 255, 0.35)",
            }}
          >
            MONARCH UNIVERSE · THE CONFLICT BEYOND DUNGEONS · COMING SOON
          </p>
        </div>
      </div>
    </section>
  );
};

export default Beyond;
