"use client";
import Image from "next/image";
import Button from "./Button";

interface ImageClipBoxProps {
  src: string;
  clipClass: string;
  alt: string;
}

const ImageClipBox = ({ src, clipClass, alt }: ImageClipBoxProps) => (
  <div className={`${clipClass} relative`}>
    <Image
      src={src}
      fill
      className="object-cover"
      alt={alt}
      sizes="(max-width: 768px) 100vw, 50vw"
    />
  </div>
);

const Contact = () => {
  return (
    <div id="contact" className="py-20 min-h-96 w-screen px-10 bg-monarch-void">
      <div className="relative rounded-lg bg-shadow-dark py-24 text-monarch-text sm:overflow-hidden border border-white/10 shadow-lg">
        <div className="absolute -left-20 top-0 z-20 hidden h-full w-72 overflow-hidden sm:block lg:left-10 lg:w-96">
          <ImageClipBox
            src="/images/beru.jpeg"
            clipClass="contact-clip-path-1 w-full h-56 lg:h-64"
            alt="Beru, shadow soldier of the Shadow Monarch"
          />
          <ImageClipBox
            src="/images/system-ui.jpeg"
            clipClass="contact-clip-path-2 w-full h-56 lg:h-64 lg:translate-y-1 translate-y-2 lg:translate-x-20 translate-x-10"
            alt="The Hunter System interface"
          />
        </div>

        <div className="absolute -top-40 left-20 z-20 w-60 sm:top-1/2 md:left-auto md:right-10 lg:top-20 lg:w-80">
          <div className="sword-man-clip-path md:scale-125 aspect-2/3 w-full relative">
            <Image
              src="/images/footer-bg.jpeg"
              fill
              className="object-cover"
              alt="Shadow Monarch in battle"
              sizes="(max-width: 768px) 100vw, 50vw"
              style={{
                maskImage: "radial-gradient(circle, black 30%, transparent 80%)",
                WebkitMaskImage: "radial-gradient(circle, black 30%, transparent 80%)",
              }}
            />
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  "radial-gradient(circle, transparent 50%, var(--shadow-dark) 100%)",
              }}
            />
          </div>
        </div>

        <div className="flex flex-col items-center text-center relative z-10">
          <p style={{ fontFamily: "var(--font-mono, 'Space Mono', monospace)", fontSize: "0.625rem", textTransform: "uppercase", letterSpacing: "0.2em", color: "var(--monarch-text-dim)" }}>
            YOUR COMMAND AWAITS
          </p>
          <h2 className="special-font mt-10 w-full font-zentry text-5xl leading-[0.9] md:text-[96px] text-monarch-text">
            You b<b>u</b>ilt the <br /> sh<b>a</b>dow <br /> arm<b>y</b>. Ar<b>i</b>se.
          </h2>

          <Button 
            title="Command Your Army" 
            containerClass="mt-10 cursor-pointer bg-monarch-text text-monarch-void hover:bg-monarch-text-dim transition-colors" 
          />
        </div>
      </div>
    </div>
  );
};

export default Contact;
