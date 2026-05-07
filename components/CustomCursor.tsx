"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

/**
 * SPEC 13 — Custom Shadow Energy Cursor
 * Cinematic ring cursor with weighted lag (damping) for desktop.
 */
const CustomCursor = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    // Hide default browser cursor
    document.body.style.cursor = "none";

    let mouseX = 0;
    let mouseY = 0;
    let ringX = 0;
    let ringY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      // Dot snaps instantly to exact pointer position
      gsap.set(dot, { x: mouseX, y: mouseY });
    };

    window.addEventListener("mousemove", handleMouseMove);

    // Ring follows with damping for a "weighted" feel
    // Using gsap.ticker for high-performance animation frames
    const ticker = gsap.ticker.add(() => {
      ringX += (mouseX - ringX) * 0.15;
      ringY += (mouseY - ringY) * 0.15;
      gsap.set(ring, { x: ringX, y: ringY });
    });

    // Cursor States: Link/Button hover
    const handleEnterLink = () => {
      gsap.to(ring, { 
        scale: 2, 
        opacity: 0.6, 
        duration: 0.3, 
        ease: "power2.out" 
      });
      gsap.to(dot, { 
        scale: 0.5, 
        duration: 0.2 
      });
    };

    const handleLeaveLink = () => {
      gsap.to(ring, { 
        scale: 1, 
        opacity: 1, 
        duration: 0.3, 
        ease: "power2.out" 
      });
      gsap.to(dot, { 
        scale: 1, 
        duration: 0.2 
      });
    };

    // Cursor States: Video hover
    const handleEnterVideo = () => {
      gsap.to(ring, { 
        scale: 1.5, 
        borderColor: "var(--monarch-blue)", 
        duration: 0.3 
      });
    };

    const addListeners = () => {
      const interactiveElements = document.querySelectorAll("a, button, [data-cursor='link']");
      const videoElements = document.querySelectorAll("video, [data-cursor='video']");

      interactiveElements.forEach((el) => {
        el.addEventListener("mouseenter", handleEnterLink);
        el.addEventListener("mouseleave", handleLeaveLink);
      });

      videoElements.forEach((el) => {
        el.addEventListener("mouseenter", handleEnterVideo);
        el.addEventListener("mouseleave", handleLeaveLink);
      });
    };

    addListeners();

    // MutationObserver to catch dynamic content changes
    const observer = new MutationObserver(() => addListeners());
    observer.observe(document.body, { childList: true, subtree: true });

    // Cleanup: revert body cursor and remove listeners
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      gsap.ticker.remove(ticker);
      document.body.style.cursor = "";
      observer.disconnect();
      
      // Remove element-specific listeners
      const interactiveElements = document.querySelectorAll("a, button, [data-cursor='link']");
      const videoElements = document.querySelectorAll("video, [data-cursor='video']");
      
      interactiveElements.forEach((el) => {
        el.removeEventListener("mouseenter", handleEnterLink);
        el.removeEventListener("mouseleave", handleLeaveLink);
      });
      
      videoElements.forEach((el) => {
        el.removeEventListener("mouseenter", handleEnterVideo);
        el.removeEventListener("mouseleave", handleLeaveLink);
      });
    };
  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="pointer-events-none fixed inset-0 z-[999999]">
      {/* Dot — Snaps instantly */}
      <div
        ref={dotRef}
        aria-hidden="true"
        className="fixed top-0 left-0 h-1.5 w-1.5 rounded-full"
        style={{
          backgroundColor: "var(--monarch-blue)",
          transform: "translate(-50%, -50%)",
          mixBlendMode: "difference",
        }}
      />
      {/* Ring — Weighted lag */}
      <div
        ref={ringRef}
        aria-hidden="true"
        className="fixed top-0 left-0 h-5 w-5 rounded-full border-[1.5px]"
        style={{
          borderColor: "var(--monarch-blue)",
          transform: "translate(-50%, -50%)",
        }}
      />
    </div>
  );
};

export default CustomCursor;
