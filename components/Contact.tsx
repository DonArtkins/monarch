"use client";
import Button from "./Button";

const Contact = () => {
  return (
    <div id="contact" className="my-20 min-h-96 w-screen px-10">
      <div className="relative rounded-lg bg-monarch-abyss py-24 text-monarch-text sm:overflow-hidden">
        <div className="absolute -left-20 top-0 hidden h-full w-72 overflow-hidden sm:block lg:left-10 lg:w-96">
          <div className="contact-clip-path-1">
            <img src="/images/beru.jpeg" alt="Beru — Shadow Soldier" className="size-full object-cover" />
          </div>
          <div className="contact-clip-path-2 translate-y-60 lg:translate-y-40">
            <img src="/images/system-ui.jpeg" alt="The System Interface" className="size-full object-cover" />
          </div>
        </div>

        <div className="absolute -top-40 left-20 w-60 sm:top-1/2 md:left-auto md:right-10 lg:top-20 lg:w-80">
          <div className="absolute md:scale-125">
            <img src="/images/footer-bg.jpeg" alt="Shadow Warrior" className="size-full object-cover" />
          </div>
          <div className="sword-man-clip-path md:scale-125">
            <img src="/images/footer-bg.jpeg" alt="Shadow Warrior" className="size-full object-cover" />
          </div>
        </div>

        <div className="flex flex-col items-center text-center">
          <p className="font-general text-[10px] uppercase text-monarch-text-dim">Join the Shadow Army</p>
          <p className="special-font mt-10 w-full font-zentry text-5xl leading-[0.9] md:text-[96px]">
            Let&apos;s b<b>u</b>ild the <br /> new era of <br /> sh<b>a</b>dow w<b>a</b>rfare
          </p>

          <Button title="Awaken Now" containerClass="mt-10 cursor-pointer bg-monarch-purple text-monarch-text" />
        </div>
      </div>
    </div>
  );
};

export default Contact;
