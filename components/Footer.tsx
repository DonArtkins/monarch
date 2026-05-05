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
    <footer className="w-screen bg-monarch-purple py-4 text-monarch-text">
      <div className="container mx-auto flex flex-col items-center justify-between gap-4 px-4 md:flex-row">
        <p className="text-center text-sm md:text-left">
          &copy; Monarch 2026. All rights reserved
        </p>

        <div className="flex justify-center gap-4 md:justify-start">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-monarch-text transition-colors duration-500 ease-in-out hover:text-monarch-blue"
            >
              {link.icon}
            </Link>
          ))}
        </div>

        <Link
          href="#privacy-policy"
          className="text-center text-sm hover:underline md:text-right"
        >
          Privacy Policy
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
