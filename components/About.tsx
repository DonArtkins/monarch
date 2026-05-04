"use client";
import { useGSAP } from "@gsap/react";
import gsap from "gsap/all";
import { ScrollTrigger } from "gsap/all";
import AnimatedTitle from "./AnimatedTitle";

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  useGSAP(() => {
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
  });

  return (
    <div id="about" className="min-h-screen w-screen">
      <div className="relative mb-8 mt-36 flex flex-col items-center gap-5">
        <h2 className="font-general text-sm uppercase text-monarch-text-dim md:text-[10px]">
          Welcome to the System
        </h2>

        <AnimatedTitle
          title="Disc<b>o</b>ver the Shadow <br/> M<b>o</b>narch's Domain"
          containerClass="mt-5 text-monarch-text text-center"
        />

        <div className="about-subtext text-monarch-text-dim">
          <p>The weakest hunter became the strongest sovereign</p>
          <p>Command the shadows, conquer every dungeon</p>
        </div>
      </div>
      <div className="h-dvh w-screen" id="clip">
        <div className="mask-clip-path about-image">
          <img
            src="/images/about-bg.jpeg"
            alt="The Double Dungeon"
            className="absolute left-0 top-0 size-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default About;
