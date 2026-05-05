"use client";

import { useEffect, useRef, useState } from "react";

interface VideoPlayerProps {
  src: string;
  className?: string;
  loop?: boolean;
  muted?: boolean;
  autoPlay?: boolean;
}

const VideoPlayer = ({
  src,
  className = "",
  loop = true,
  muted = true,
  autoPlay = false,
}: VideoPlayerProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    if (videoRef.current) {
      observer.observe(videoRef.current);
    }

    return () => {
      if (videoRef.current) {
        observer.unobserve(videoRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (videoRef.current) {
      if (isInView) {
        videoRef.current.play().catch((err) => {
          console.warn("Video play failed:", err);
        });
      } else {
        videoRef.current.pause();
      }
    }
  }, [isInView]);

  return (
    <video
      ref={videoRef}
      src={src}
      className={className}
      loop={loop}
      muted={muted}
      playsInline
      preload="metadata"
    />
  );
};

export default VideoPlayer;
