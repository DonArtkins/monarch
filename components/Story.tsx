"use client";
import React, { useRef } from "react";
import Image from "next/image";
import AnimatedTitle from "./AnimatedTitle";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import RoundedCorners from "./RoundedCorners";
import Button from "./Button";

const Story = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<HTMLImageElement>(null);

  const { contextSafe } = useGSAP({ scope: containerRef });

  const handleMouseLeave = contextSafe(() => {
    const element = frameRef.current;
    if (!element) return;

    gsap.to(element, {
      duration: 0.3,
      rotateX: 0,
      rotateY: 0,
      ease: "power1.inOut",
    });
  });

  const handleMouseMove = contextSafe((e: React.MouseEvent<HTMLImageElement>) => {
    const { clientX, clientY } = e;
    const element = frameRef.current;

    if (!element) return;

    const rect = element.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -10;
    const rotateY = ((x - centerX) / centerX) * 10;

    gsap.to(element, {
      duration: 0.3,
      rotateX,
      rotateY,
      transformPerspective: 500,
      ease: "power1.inOut",
    });
  });

  return (
    <section id="story" ref={containerRef} className="min-h-dvh w-screen bg-monarch-void text-monarch-text">
      <div className="flex size-full flex-col items-center py-10 pb-24">
        <p className="font-general text-sm uppercase text-monarch-text-dim md:text-[10px]">
          The Sovereign&apos;s Chronicle
        </p>

        <div className="relative size-full isolate">
          <AnimatedTitle
            title="The st<b>o</b>ry of <br /> a Shadow M<b>o</b>narch"
            containerClass="mt-5 pointer-events-none mix-blend-difference relative z-10 text-white"
          />

          <div className="story-img-container">
            <div className="story-img-mask">
              <div className="story-img-content">
                <Image
                  ref={frameRef}
                  onMouseLeave={handleMouseLeave}
                  onMouseUp={handleMouseLeave}
                  onMouseEnter={handleMouseLeave}
                  onMouseMove={handleMouseMove}
                  src="/images/kamish.jpeg"
                  alt="The Monarch's Domain"
                  fill
                  className="object-contain"
                />
              </div>
            </div>

            <RoundedCorners />
          </div>
        </div>

        <div className="-mt-80 flex w-full justify-center md:-mt-64 md:me-44 md:justify-end">
          <div className="flex h-full w-fit flex-col items-center md:items-start">
            <p className="mt-3 max-w-sm text-center font-circular text-monarch-text-dim md:text-start">
              From the weakest E-rank hunter to the sovereign of shadows.
              Discover the path of the Shadow Monarch and shape your fate
              amidst infinite dungeons.
            </p>

            <Button
              id="dungeon-btn"
              title="Enter the Dungeon"
              containerClass="mt-5 bg-monarch-text text-monarch-void"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Story;
