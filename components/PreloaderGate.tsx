"use client";

import { useState, type ReactNode } from "react";
import dynamic from "next/dynamic";

const Preloader = dynamic(() => import("./Preloader"), { ssr: false });

interface PreloaderGateProps {
  children: ReactNode;
}

const PreloaderGate = ({ children }: PreloaderGateProps) => {
  const [preloaderDone, setPreloaderDone] = useState(false);

  return (
    <>
      {!preloaderDone && (
        <Preloader onComplete={() => setPreloaderDone(true)} />
      )}
      <div style={{ visibility: preloaderDone ? "visible" : "hidden" }}>
        {children}
      </div>
    </>
  );
};

export default PreloaderGate;
