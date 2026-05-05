"use client";
import Image from "next/image";
import Button from "./Button";

interface ImageClipBoxProps {
  src: string;
  clipClass: string;
}

const ImageClipBox = ({ src, clipClass }: ImageClipBoxProps) => (
  <div className={`${clipClass} relative`}>
    <Image
      src={src}
      fill
      className="object-cover"
      alt="Contact overlay"
    />
  </div>
);

const Contact = () => {
  return (
    <div id="contact" className="my-20 min-h-96 w-screen px-10">
      <div className="relative rounded-lg bg-black py-24 text-primary-50 sm:overflow-hidden">
        <div className="absolute -left-20 top-0 z-20 hidden h-full w-72 overflow-hidden mix-blend-difference sm:block lg:left-10 lg:w-96">
          <ImageClipBox
            src="/images/beru.jpeg"
            clipClass="contact-clip-path-1 w-full h-56 lg:h-64"
          />
          <ImageClipBox
            src="/images/system-ui.jpeg"
            clipClass="contact-clip-path-2 w-full h-56 lg:h-64 lg:translate-y-1 translate-y-2 lg:translate-x-20 translate-x-10"
          />
        </div>

        <div className="absolute -top-40 left-20 z-20 w-60 mix-blend-difference sm:top-1/2 md:left-auto md:right-10 lg:top-20 lg:w-80">
          <div className="sword-man-clip-path md:scale-125 aspect-2/3 w-full relative">
            <Image
              src="/images/footer-bg.jpeg"
              fill
              className="object-cover"
              alt="Contact overlay"
              style={{
                maskImage: "radial-gradient(circle, black 30%, transparent 80%)",
                WebkitMaskImage: "radial-gradient(circle, black 30%, transparent 80%)",
              }}
            />
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  "radial-gradient(circle, transparent 50%, rgba(3, 0, 20, 0.9) 100%)",
              }}
            />
          </div>
        </div>

        <div className="flex flex-col items-center text-center relative z-10">
          <p className="font-general text-[10px] uppercase">Join the Shadow Army</p>
          <p className="special-font mt-10 w-full font-zentry text-5xl leading-[0.9] md:text-[96px]">
            Let&apos;s b<b>u</b>ild the <br /> new era of <br /> sh<b>a</b>dow w<b>a</b>rfare
          </p>

          <Button title="Awaken Now" containerClass="mt-10 cursor-pointer bg-primary-50 text-black" />
        </div>
      </div>
    </div>
  );
};

export default Contact;
