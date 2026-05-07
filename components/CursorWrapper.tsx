"use client";

import { useEffect, useState } from "react";
import CustomCursor from "./CustomCursor";

/**
 * Wrapper for CustomCursor to ensure it only renders on desktop
 * (devices with a fine pointer like a mouse or trackpad).
 */
const CursorWrapper = () => {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    // Check if the device has a fine pointer (mouse/trackpad)
    const mediaQuery = window.matchMedia("(pointer: fine)");
    setIsDesktop(mediaQuery.matches);

    // Listen for changes (though pointer:fine rarely changes on the fly)
    const handler = (e: MediaQueryListEvent) => setIsDesktop(e.matches);
    mediaQuery.addEventListener("change", handler);

    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  if (!isDesktop) return null;

  return <CustomCursor />;
};

export default CursorWrapper;
