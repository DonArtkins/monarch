"use client";

import { useEffect, useRef, useState, ReactNode } from "react";

interface LazySectionProps {
  children: ReactNode;
  className?: string;
  rootMargin?: string;
}

export default function LazySection({
  children,
  className = "min-h-screen w-full",
  rootMargin = "400px 0px",
}: LazySectionProps) {
  const [hasIntersected, setHasIntersected] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (hasIntersected) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasIntersected(true);
          observer.disconnect();
        }
      },
      {
        rootMargin,
        threshold: 0,
      }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [hasIntersected, rootMargin]);

  return (
    <div ref={containerRef} className={className}>
      {hasIntersected ? children : null}
    </div>
  );
}
