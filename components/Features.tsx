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
      ease: "power2.out",
    });
    const yTo = gsap.quickTo(itemRef.current, "rotationX", {
      duration: 0.7,
      ease: "power2.out",
    });

    const handleMouseMove = (e: MouseEvent) => {
      if (!itemRef.current) return;

      const { left, top, width, height } =
        itemRef.current.getBoundingClientRect();

      const relativeX = (e.clientX - left) / width;
      const relativeY = (e.clientY - top) / height;

      const tiltX = (relativeY - 0.5) * 20;
      const tiltY = (relativeX - 0.5) * -20;

      yTo(tiltX);
      xTo(tiltY);
    };

    const handleMouseLeave = () => {
      yTo(0);
      xTo(0);
    };

    const element = itemRef.current;
    if (element) {
      element.addEventListener("mousemove", handleMouseMove as any);
      element.addEventListener("mouseleave", handleMouseLeave);
    }

    return () => {
      if (element) {
        element.removeEventListener("mousemove", handleMouseMove as any);
        element.removeEventListener("mouseleave", handleMouseLeave);
      }
    };
  }, { scope: itemRef });

  return (
    <div
      ref={itemRef}
      className={`${className} will-change-transform`}
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
        <p
          className={`font-mono text-[10px] uppercase tracking-[0.2em] ${labelColor}`}
          style={{ fontFamily: "monospace" }}
        >
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
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-monarch-blue" style={{ fontFamily: "monospace" }}>
            SHADOW REALM · DUNGEON CLASSIFICATION
          </p>
          <AnimatedTitle
            title="Into the Sh<b>a</b>dow <br /> Re<b>a</b>lm"
            containerClass="mt-5 !text-monarch-text text-left"
          />
          <p className="max-w-md font-circular text-base text-monarch-text-dim opacity-50 mt-5">
            From the weakest hunter to the sovereign of shadows. Every gate,
            every battle, every shadow extracted — the system chose only one.
          </p>
        </div>

        {/* SPEC 11 — THE SYSTEM — Hero full-width card */}
        <BentoTilt className="border-hsla relative mb-7 h-64 w-full overflow-hidden rounded-md sm:h-80 md:h-[65vh]">
          <BentoCard
            src="/videos/father.mp4"
            label="THE SYSTEM · SPEC 11"
            title={
              <>
                The Sy<b>s</b>tem
              </>
            }
            description="Daily quests. Stat allocation. Skill extraction. The system that broke the rules of this world."
            labelColor="text-monarch-blue"
          />
        </BentoTilt>

        {/* Bento 2x2 grid — SPEC 12, 13, 14, and CTA */}
        <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 md:grid-cols-2 md:grid-rows-3" style={{ minHeight: "auto" }}>

          {/* SPEC 13 — IGRIS — tall narrow card (row-span-2 on desktop) */}
          <BentoTilt className="bento-tilt_1 h-64 sm:h-80 md:row-span-2 md:h-auto">
            <BentoCard
              src="/videos/shadow-army.mp4"
              label="IGRIS · SHADOW KNIGHT GENERAL"
              title={
                <>
                  Igr<b>i</b>s
                </>
              }
              description="First extracted. Most loyal. Most deadly."
              labelColor="text-monarch-text-dim"
            />
          </BentoTilt>

          {/* SPEC 12 — ARISE — Shadow Monarch card */}
          <BentoTilt className="bento-tilt_1 h-64 sm:h-80 md:h-auto">
            <BentoCard
              src="/videos/story-arise.mp4"
              label="SHADOW MONARCH"
              title={
                <>
                  Ar<b>i</b>se
                </>
              }
              description="The title no living hunter had ever held. Sovereign of all shadow."
              labelColor="text-monarch-blue"
            />
          </BentoTilt>

          {/* SPEC 14 — DUNGEONS — wide card */}
          <BentoTilt className="bento-tilt_1 h-48 sm:h-64 md:h-auto">
            <BentoCard
              src="/videos/legion.mp4"
              label="S-RANK DUNGEON"
              title={
                <>
                  Dun<b>g</b>eons
                </>
              }
              description="Every gate hides a world. Every world wants you dead."
              labelColor="text-red-400"
            />
          </BentoTilt>

          {/* CTA — More coming soon */}
          <BentoTilt className="bento-tilt_2 h-48 sm:h-64 md:h-auto">
            <div className="flex size-full flex-col justify-between bg-monarch-purple p-5 group cursor-pointer relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-monarch-blue/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-monarch-text/60 relative z-10" style={{ fontFamily: "monospace" }}>
                THE JOURNEY CONTINUES
              </p>

              <div className="relative z-10">
                <h1 className="bento-title special-font max-w-64 text-monarch-text">
                  M<b>o</b>re co<b>m</b>ing s<b>o</b>on
                </h1>
                <TiLocationArrow className="mt-4 scale-[3] text-monarch-text group-hover:rotate-45 transition-transform duration-500" />
              </div>
            </div>
          </BentoTilt>

          {/* Shadow Army video — decorative */}
          <BentoTilt className="bento-tilt_2 h-48 sm:h-64 md:h-auto">
            <div className="relative size-full">
              <VideoPlayer
                src="/videos/legion.mp4"
                className="size-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-4 left-4 z-10">
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-monarch-blue" style={{ fontFamily: "monospace" }}>
                  SHADOW ARMY · LEGION
                </p>
                <p className="mt-1 text-xs text-monarch-text-dim">Thousands strong. All obedient.</p>
              </div>
            </div>
          </BentoTilt>
        </div>
      </div>
    </section>
  );
};

export default Features;
