"use client";
import { useEffect, useRef, useState } from "react";
import Button from "./Button";
import { TiLocationArrow } from "react-icons/ti";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import VideoPlayer from "./VideoPlayer";
import Loader from "./Loader";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// 4 decorative clip configs
const DECORATIVE_CLIPS = [
  {
    src: "/videos/hero-2.mp4", // TODO: Replace with /videos/HERO_VID_03.mp4
    position: "absolute top-16 right-10 z-30",
    size: "w-32 h-20 sm:w-48 sm:h-28 md:w-56 md:h-32",
    clipPath: "polygon(0 0, 100% 10%, 90% 100%, 10% 90%)",
    label: "SHADOW ARMY",
  },
  {
    src: "/videos/hero-1.mp4", // TODO: Replace with /videos/HERO_VID_04.mp4
    position: "absolute bottom-32 right-6 z-30",
    size: "w-28 h-20 sm:w-40 sm:h-28",
    clipPath: "polygon(10% 0, 90% 0, 100% 90%, 0% 100%)",
    label: "GATE CRACK",
  },
  {
    src: "/videos/hero-2.mp4", // TODO: Replace with /videos/HERO_VID_05.mp4
    position: "absolute top-1/2 left-4 -translate-y-1/2 z-30",
    size: "w-24 h-32 sm:w-36 sm:h-48",
    clipPath: "polygon(0 10%, 100% 0, 90% 100%, 0 90%)",
    label: "EXTRACTION",
  },
  {
    src: "/videos/hero-1.mp4", // TODO: Replace with /videos/HERO_VID_02.mp4
    position: "absolute bottom-16 left-10 z-30",
    size: "w-36 h-24 sm:w-48 sm:h-32",
    clipPath: "polygon(5% 0, 95% 5%, 100% 95%, 0% 100%)",
    label: "RULER'S AUTHORITY",
  },
];

const Hero = () => {
  const [currentIndex, setCurrentIndex] = useState(1);
  const [hasClicked, setHasClicked] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [loadedVideos, setLoadedVideos] = useState(0);

  const totalVideos = 2;
  const nextVideoRef = useRef<HTMLVideoElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);

  const handleVideoLoad = () => {
    setLoadedVideos((prev) => prev + 1);
  };

  const upcomingVideoIndex = (currentIndex % totalVideos) + 1;

  const handleMiniVideoClick = () => {
    setHasClicked(true);
    setCurrentIndex(upcomingVideoIndex);
  };

  useEffect(() => {
    if (loadedVideos >= totalVideos - 1) {
      setIsLoading(false);
    }
  }, [loadedVideos]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 2500);
    return () => clearTimeout(timeout);
  }, []);

  useGSAP(
    () => {
      if (hasClicked) {
        gsap.set("#next-video", { visibility: "visible" });

        gsap.to("#next-video", {
          transformOrigin: "center center",
          scale: 1,
          width: "100%",
          height: "100%",
          duration: 1,
          ease: "power1.inOut",
          onStart: () => nextVideoRef.current?.play(),
        });

        gsap.from("#current-video", {
          transformOrigin: "center center",
          scale: 0,
          duration: 1.5,
          ease: "power1.inOut",
        });
      }
    },
    { dependencies: [currentIndex], revertOnUpdate: true }
  );

  useGSAP(() => {
    gsap.set("#video-frame", {
      clipPath: "polygon(14% 0%, 72% 0%, 90% 90%, 0% 100%)",
      borderRadius: "0 0 40% 10%",
    });

    gsap.from("#video-frame", {
      clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
      borderRadius: "0 0 0 0",
      ease: "power1.inOut",
      scrollTrigger: {
        trigger: "#video-frame",
        start: "center center",
        end: "bottom center",
        scrub: true,
      },
    });
  });

  // Entrance animation for decorative clips
  useGSAP(
    () => {
      if (!isLoading) {
        gsap.from(".hero-deco-clip", {
          opacity: 0,
          scale: 0.8,
          duration: 0.8,
          stagger: 0.15,
          ease: "power2.out",
          delay: 0.5,
        });
      }
    },
    { scope: heroRef, dependencies: [isLoading] }
  );

  const getVideoSrc = (index: number) => `/videos/hero-${index}.mp4`;

  return (
    <div ref={heroRef} className="relative h-dvh w-screen overflow-x-hidden">
      {isLoading && <Loader />}

      <div
        id="video-frame"
        className="relative z-10 h-dvh w-screen overflow-hidden rounded-lg bg-monarch-abyss"
        style={{ willChange: "clip-path, border-radius" }}
      >
        <div>
          <div className="mask-clip-path absolute-center absolute z-50 size-64 cursor-pointer overflow-hidden rounded-lg">
            <div
              onClick={handleMiniVideoClick}
              className="origin-center scale-50 opacity-0 transition-all duration-500 ease-in hover:scale-100 hover:opacity-100"
            >
              <video
                src={getVideoSrc(upcomingVideoIndex)}
                loop
                muted
                id="current-video"
                className="size-64 origin-center scale-150 object-cover object-center"
                onLoadedData={handleVideoLoad}
              />
            </div>
          </div>
          <video
            ref={nextVideoRef}
            src={getVideoSrc(currentIndex)}
            loop
            muted
            id="next-video"
            className="absolute-center invisible absolute z-20 size-64 object-cover object-center"
            onLoadedData={handleVideoLoad}
          />

          <video
            src={getVideoSrc(currentIndex)}
            autoPlay
            loop
            muted
            className="absolute left-0 top-0 size-full object-cover object-center"
            onLoadedData={handleVideoLoad}
          />
        </div>

        <h1
          className="special-font hero-heading absolute bottom-5 right-5 z-40 text-monarch-purple"
          style={{ willChange: "transform, opacity" }}
        >
          A<b>w</b>aken
        </h1>

        <div className="absolute left-0 top-0 z-40 size-full">
          <div className="mt-24 px-5 sm:px-10">
            <h1
              className="special-font hero-heading text-monarch-text"
              style={{ willChange: "transform, opacity" }}
            >
              Mon<b>a</b>rch
            </h1>

            <p className="mb-5 max-w-sm font-robert-regular text-monarch-text-dim text-sm sm:text-base">
              You are the weakest hunter. <br /> Until the system chose you.
            </p>

            <Button
              id="enter-system"
              title="Arise"
              leftIcon={<TiLocationArrow />}
              containerClass="bg-monarch-blue text-monarch-void flex-center gap-1"
            />
          </div>
        </div>
      </div>

      {/* 4 Decorative clip containers — hidden on mobile */}
      {!isLoading && (
        <div className="pointer-events-none hidden sm:block">
          {DECORATIVE_CLIPS.map((clip, i) => (
            <div
              key={i}
              className={`hero-deco-clip ${clip.position} ${clip.size} overflow-hidden`}
              style={{ clipPath: clip.clipPath }}
              aria-hidden="true"
            >
              <VideoPlayer
                src={clip.src}
                className="size-full object-cover object-center scale-110"
              />
              {/* Label overlay */}
              <div className="absolute bottom-0 left-0 right-0 px-2 py-1 bg-gradient-to-t from-black/80 to-transparent">
                <p
                  className="text-[8px] uppercase tracking-[0.2em] text-monarch-text-dim"
                  style={{ fontFamily: "var(--font-mono, monospace)" }}
                >
                  {clip.label}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Korean watermark — decorative only */}
      <div
        className="korean-watermark"
        aria-hidden="true"
        style={{
          bottom: "-5%",
          left: "50%",
          transform: "translateX(-50%) rotate(-20deg)",
        }}
      >
        일어나라
      </div>

      <h1 className="special-font hero-heading absolute bottom-5 right-5 text-monarch-text">
        A<b>w</b>aken
      </h1>
    </div>
  );
};

export default Hero;

