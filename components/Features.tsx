"use client";

import { useRef, useState, ReactNode, MouseEvent } from "react";
import { TiLocationArrow } from "react-icons/ti";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import AnimatedTitle from "./AnimatedTitle";

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

import VideoPlayer from "./VideoPlayer";

interface BentoCardProps {
  src: string;
  title: ReactNode;
  description?: string;
}

const BentoCard = ({ src, title, description }: BentoCardProps) => {
  return (
    <div className="relative size-full">
      <VideoPlayer
        src={src}
        className="absolute left-0 top-0 size-full object-cover object-center"
      />

      <div className="relative z-10 flex size-full flex-col justify-between p-5 text-monarch-text">
        <div>
          <h1 className="bento-title special-font">{title}</h1>
          {description && (
            <p className="mt-3 max-w-64 text-xs text-monarch-text-dim md:text-base">
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
    <section className="bg-monarch-void pb-52">
      <div className="container mx-auto px-3 md:px-10">
        <div className="px-5 py-32">
          <p className="font-circular text-lg text-monarch-text">
            Into the Shadow Realm
          </p>
          <AnimatedTitle
            title="The Sh<b>a</b>dow <br /> Army Leg<b>i</b>on"
            containerClass="mt-5 !text-monarch-text text-left"
          />
          <p className="max-w-md font-circular text-lg text-monarch-text-dim opacity-50 mt-5">
            Immerse yourself in the world of Solo Leveling where dungeons tear
            through reality and shadow soldiers rise at your command. Every
            battle forges a new soldier for your army.
          </p>
        </div>

        <BentoTilt className="border-hsla relative mb-7 h-96 w-full overflow-hidden rounded-md md:h-[65vh]">
          <BentoCard
            src="/videos/legion.mp4"
            title={
              <>
                Sh<b>a</b>dow Army
              </>
            }
            description="Command an army of shadow soldiers extracted from the fallen. Each warrior retains the power they held in life."
          />
        </BentoTilt>

        <div className="grid h-[135vh] grid-cols-2 grid-rows-3 gap-7">
          <BentoTilt className="bento-tilt_1 row-span-1 md:col-span-1 md:row-span-2">
            <BentoCard
              src="/videos/shadow-army.mp4"
              title={
                <>
                  D<b>u</b>ngeons
                </>
              }
              description="Enter gates of varying difficulty, from E-rank to S-rank. Only the strongest survive."
            />
          </BentoTilt>

          <BentoTilt className="bento-tilt_1 row-span-1 ms-32 md:col-span-1 md:ms-0">
            <BentoCard
              src="/videos/father.mp4"
              title={
                <>
                  Sy<b>s</b>tem
                </>
              }
              description="Level up through the mysterious System that chose you as its player."
            />
          </BentoTilt>

          <BentoTilt className="bento-tilt_1 me-14 md:col-span-1 md:me-0">
            <BentoCard
              src="/videos/story-arise.mp4"
              title={
                <>
                  Ar<b>i</b>se
                </>
              }
              description="Extract the shadows of defeated enemies to join your ever-growing legion."
            />
          </BentoTilt>

          <BentoTilt className="bento-tilt_2">
            <div className="flex size-full flex-col justify-between bg-monarch-purple p-5 group cursor-pointer relative overflow-hidden">
              {/* Premium Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-monarch-blue/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <h1 className="bento-title special-font max-w-64 text-monarch-text relative z-10">
                M<b>o</b>re co<b>m</b>ing s<b>o</b>on!
              </h1>

              <TiLocationArrow className="m-5 scale-[5] self-end text-monarch-text relative z-10 group-hover:rotate-45 transition-transform duration-500" />
            </div>
          </BentoTilt>

          <BentoTilt className="bento-tilt_2">
            <VideoPlayer
              src="/videos/legion.mp4"
              className="size-full object-cover object-center"
            />
          </BentoTilt>
        </div>
      </div>
    </section>
  );
};

export default Features;
