"use client";
import Link from "next/link";
import { FaDiscord, FaXTwitter, FaYoutube, FaMedium } from "react-icons/fa6";

const links = [
  { href: "https://discord.com", icon: <FaDiscord /> },
  { href: "https://x.com", icon: <FaXTwitter /> },
  { href: "https://youtube.com", icon: <FaYoutube /> },
  { href: "https://medium.com", icon: <FaMedium /> },
];

const Footer = () => {
  return (
    <footer className="relative w-screen bg-monarch-void py-16 text-monarch-text overflow-hidden border-t border-monarch-blue/10">
      {/* Background Watermark */}
      <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 pointer-events-none select-none opacity-[0.03]">
        <h1 className="special-font text-[25vw] font-black uppercase leading-none text-monarch-text whitespace-nowrap">
          Monarch
        </h1>
      </div>

      <div className="container mx-auto px-5 md:px-10 relative z-10">
        <div className="flex flex-col items-center justify-between gap-12 md:flex-row">
          {/* Branding & CTA */}
          <div className="flex flex-col items-center md:items-start gap-5">
            <div className="flex flex-col items-center md:items-start">
              <h2 className="special-font text-4xl md:text-6xl font-black uppercase leading-[0.8] text-monarch-text">
                The Sh<b>a</b>dow <br /> Arm<b>y</b> Ar<b>i</b>se
              </h2>
            </div>
            <p className="max-w-xs text-center md:text-left font-circular text-sm text-monarch-text-dim opacity-70">
              From the weakest hunter to the sovereign of shadows. Conquer the system and claim your eternal throne.
            </p>
          </div>

          {/* Socials & Links */}
          <div className="flex flex-col items-center md:items-end gap-8">
            <div className="flex items-center gap-6">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-monarch-text-dim text-2xl transition-all duration-500 ease-in-out hover:text-monarch-blue hover:-translate-y-2"
                >
                  {link.icon}
                </Link>
              ))}
            </div>

            <div className="flex flex-col items-center md:items-end gap-3 font-general text-[10px] uppercase tracking-[0.2em] text-monarch-text-dim">
              <Link
                href="#privacy-policy"
                className="hover:text-monarch-purple transition-colors duration-300"
              >
                Privacy Policy
              </Link>
              <p className="opacity-50">
                &copy; Monarch 2026. All rights reserved
              </p>
            </div>
          </div>
        </div>

        {/* Bottom stylized divider */}
        <div className="mt-16 h-px w-full bg-gradient-to-r from-transparent via-monarch-purple/20 to-transparent" />
      </div>

      {/* Decorative Glow */}
      <div className="absolute -bottom-20 -left-20 size-64 bg-monarch-purple/10 blur-[100px] pointer-events-none" />
      <div className="absolute -top-20 -right-20 size-64 bg-monarch-blue/5 blur-[100px] pointer-events-none" />
    </footer>
  );
};

export default Footer;
