"use client";

import { useRef, ReactNode, MouseEvent } from "react";
import { TiLocationArrow } from "react-icons/ti";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import AnimatedTitle from "./AnimatedTitle";
import VideoPlayer from "./VideoPlayer";

interface BentoTiltProps {
  children: ReactNode;
  className?: string;
}

const BentoTilt = ({ children, className = "" }: BentoTiltProps) => {
  const itemRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!itemRef.current) return;

    gsap.set(itemRef.current, {
      transformPerspective: 1200,
      transformStyle: "preserve-3d",
    });

    const xTo = gsap.quickTo(itemRef.current, "rotationY", {
      duration: 0.7,
      ease: "power3.out", // Updated to power3 for cinematic feel
      force3D: true,
    });
    const yTo = gsap.quickTo(itemRef.current, "rotationX", {
      duration: 0.7,
      ease: "power3.out",
      force3D: true,
    });

    const handleMouseMove = (e: MouseEvent) => {
      if (!itemRef.current) return;

      const { left, top, width, height } =
        itemRef.current.getBoundingClientRect();

      const relativeX = (e.clientX - left) / width;
      const relativeY = (e.clientY - top) / height;

      const tiltX = (relativeY - 0.5) * 16; // Subtler tilt (16 instead of 20)
      const tiltY = (relativeX - 0.5) * -16;

      yTo(tiltX);
      xTo(tiltY);

      // Dynamic ice-eye border shimmer following tilt direction
      const shimmerX = relativeX * 100;
      const shimmerY = relativeY * 100;
      itemRef.current.style.setProperty(
        "--shimmer-pos",
        `${shimmerX}% ${shimmerY}%`
      );
    };

    const handleMouseEnter = () => {
      if (!itemRef.current) return;
      itemRef.current.style.willChange = "transform";
      gsap.to(itemRef.current, {
        boxShadow: "0 0 0 1px rgba(96, 165, 250, 0.25), 0 20px 40px rgba(0, 0, 0, 0.4)",
        duration: 0.3,
        ease: "power2.out",
      });
    };

    const handleMouseLeave = () => {
      if (!itemRef.current) return;
      yTo(0);
      xTo(0);
      gsap.to(itemRef.current, {
        boxShadow: "none",
        duration: 0.4,
        ease: "power2.out",
        onComplete: () => {
          if (itemRef.current) itemRef.current.style.willChange = "auto";
        },
      });
    };

    const element = itemRef.current;
    if (element) {
      element.addEventListener("mousemove", handleMouseMove as any);
      element.addEventListener("mouseenter", handleMouseEnter);
      element.addEventListener("mouseleave", handleMouseLeave);
    }

    return () => {
      if (element) {
        element.removeEventListener("mousemove", handleMouseMove as any);
        element.removeEventListener("mouseenter", handleMouseEnter);
        element.removeEventListener("mouseleave", handleMouseLeave);
      }
    };
  }, { scope: itemRef });

  return (
    <div
      ref={itemRef}
      className={`${className} transition-shadow duration-300`}
      style={{
        transformOrigin: "center center",
      }}
    >
      {children}
    </div>
  );
};

interface BentoCardProps {
  src: string;
  label: string;
  title: ReactNode;
  description?: string;
  labelColor?: string;
}

const BentoCard = ({ src, label, title, description, labelColor = "text-monarch-blue" }: BentoCardProps) => {
  return (
    <div className="relative size-full">
      <VideoPlayer
        src={src}
        className="absolute left-0 top-0 size-full object-cover object-center"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

      <div className="relative z-10 flex size-full flex-col justify-between p-4 sm:p-5 text-monarch-text">
        <p className={`system-label ${labelColor}`}>
          {label}
        </p>
        <div>
          <h1 className="bento-title special-font">{title}</h1>
          {description && (
            <p className="mt-2 max-w-64 text-xs text-monarch-text-dim md:text-sm leading-relaxed">
              {description}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

const Features = () => {
  return (
    <section className="bg-monarch-void pb-24 sm:pb-52">
      <div className="container mx-auto px-3 md:px-10">
        <div className="px-5 py-20 sm:py-32">
          <p style={{ fontFamily: "var(--font-mono, 'Space Mono', monospace)", fontSize: "0.625rem", textTransform: "uppercase", letterSpacing: "0.2em", color: "var(--ice-eye, #60A5FA)" }}>
            THE SYSTEM · QUEST LOG ACTIVE
          </p>
          <AnimatedTitle
            title="The Syst<b>e</b>m <br /> Ch<b>o</b>se You"
            containerClass="mt-5 !text-monarch-text text-left"
          />
          <p className="max-w-md font-circular text-base text-monarch-text-dim opacity-50 mt-5">
            A quest appeared that only you could see. A stat window that rewrote
            every rule. The system didn&apos;t choose the strongest. It chose you.
          </p>
        </div>

        {/* SPEC 22 — THE SYSTEM — Full-width hero card */}
        <BentoTilt className="border-hsla relative mb-7 h-64 w-full overflow-hidden rounded-md sm:h-80 md:h-[65vh]">
          <BentoCard
            src="/videos/father.mp4"
            label="THE SYSTEM · CLASS E → SHADOW MONARCH"
            title={
              <>
                The Syst<b>e</b>m
              </>
            }
            description="A quest appeared that only you could see. Daily missions. Stat windows. Skill extraction. The rules of this world broke for you alone."
            labelColor="text-ice-eye"
          />
        </BentoTilt>

        {/* Bento 2x2 grid — SPEC 23, 24, 25, 26, 27 */}
        <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 md:grid-cols-2 md:grid-rows-3 md:h-[135vh]">

          {/* SPEC 24 — IGRIS — tall narrow card (row-span-2 on desktop) */}
          <BentoTilt className="bento-tilt_1 h-64 sm:h-80 md:row-span-2 md:col-span-1 md:h-auto">
            <BentoCard
              src="/videos/shadow-army.mp4"
              label="IGRIS · SHADOW KNIGHT GENERAL · FIRST EXTRACTED"
              title={
                <>
                  Igr<b>i</b>s
                </>
              }
              description="The Red Knight who refused to kneel — until you made him rise as shadow. First extracted. Most loyal. Most deadly."
              labelColor="text-monarch-text-dim"
            />
          </BentoTilt>

          {/* SPEC 23 — ARISE — Shadow Monarch card */}
          <BentoTilt className="bento-tilt_1 h-64 sm:h-80 md:col-span-1 md:row-span-1 md:h-auto">
            <BentoCard
              src="/videos/story-arise.mp4"
              label="SHADOW MONARCH · THE TITLE NONE HELD"
              title={
                <>
                  Ar<b>i</b>se
                </>
              }
              description="You are the only living Shadow Monarch. Every shadow you command bends to your will — forever."
              labelColor="text-ice-eye"
            />
          </BentoTilt>

          {/* SPEC 25 — DUNGEONS — wide card */}
          <BentoTilt className="bento-tilt_1 h-48 sm:h-64 md:col-span-1 md:row-span-1 md:h-auto">
            <BentoCard
              src="/videos/legion.mp4"
              label="S-RANK DUNGEON · ENTER AT YOUR OWN RISK"
              title={
                <>
                  Dun<b>g</b>eons
                </>
              }
              description="Every gate hides a world that wants you dead. You've entered them all. And you've always walked back out."
              labelColor="text-gate-red"
            />
          </BentoTilt>

          {/* SPEC 26 — CTA card — JOIN THE LEGION */}
          <BentoTilt className="bento-tilt_2 h-48 sm:h-64 md:col-span-1 md:row-span-1 md:h-auto">
            <div
              className="flex size-full flex-col justify-between p-5 group cursor-pointer relative overflow-hidden"
              style={{
                background: "linear-gradient(135deg, var(--shadow-purple, #6D28D9) 0%, var(--monarch-energy, #2B4FFF) 100%)",
              }}
            >
              {/* Animated shadow energy overlay */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: "radial-gradient(ellipse at 50% 120%, rgba(96, 165, 250, 0.15) 0%, transparent 60%)",
                  opacity: 0,
                  transition: "opacity 0.5s ease",
                }}
                aria-hidden="true"
              />
              <div
                className="absolute inset-0 group-hover:[&>div]:opacity-100 pointer-events-none"
                aria-hidden="true"
              >
                <div
                  className="w-full h-full opacity-0 transition-opacity duration-500"
                  style={{
                    background: "radial-gradient(ellipse at 50% 120%, rgba(96, 165, 250, 0.2) 0%, transparent 60%)",
                  }}
                />
              </div>

              {/* Blue eye watermark */}
              <div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none"
                aria-hidden="true"
                style={{ opacity: 0.06, fontSize: "6rem" }}
              >
                👁
              </div>

              <p
                style={{
                  fontFamily: "var(--font-mono, monospace)",
                  fontSize: "0.625rem",
                  textTransform: "uppercase",
                  letterSpacing: "0.2em",
                  color: "rgba(240, 244, 255, 0.6)",
                }}
                className="relative z-10"
              >
                THE LEGION GROWS
              </p>

              <div className="relative z-10">
                <h1
                  className="special-font max-w-64"
                  style={{
                    fontFamily: "var(--font-zentry, sans-serif)",
                    fontSize: "clamp(1.5rem, 3vw, 2.5rem)",
                    fontWeight: 900,
                    textTransform: "uppercase",
                    color: "var(--white, #F0F4FF)",
                    lineHeight: 0.95,
                  }}
                >
                  J<b>o</b>in the <br /> Legi<b>o</b>n
                </h1>
                <div className="mt-4 flex items-center gap-3">
                  <TiLocationArrow
                    className="scale-[2] text-ice-eye group-hover:rotate-45 transition-transform duration-500"
                    aria-hidden="true"
                  />
                  <span
                    style={{
                      fontFamily: "var(--font-mono, monospace)",
                      fontSize: "0.625rem",
                      textTransform: "uppercase",
                      letterSpacing: "0.15em",
                      color: "rgba(240, 244, 255, 0.5)",
                    }}
                  >
                    ARISE NOW
                  </span>
                </div>
              </div>
            </div>
          </BentoTilt>

          {/* SPEC 27 — THE GATES — teaser card */}
          <BentoTilt className="bento-tilt_2 h-48 sm:h-64 md:col-span-1 md:row-span-1 md:h-auto">
            <BentoCard
              src="/videos/legion.mp4"
              label="THE GATES · E THROUGH S · RED TO BLACK"
              title={
                <>
                  The G<b>a</b>tes
                </>
              }
              description="Cyan. Yellow. Red. Black. Each gate a new abyss. Each one an invitation."
              labelColor="text-gate-cyan"
            />
          </BentoTilt>
        </div>
      </div>
    </section>
  );
};

export default Features;
