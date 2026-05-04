"use client";
import { useEffect, useRef, useState } from "react";
import Button from "./Button";
import { TiLocationArrow } from "react-icons/ti";
import { Menu, X } from "lucide-react";
import { useWindowScroll } from "react-use";
import gsap from "gsap";
import Image from "next/image";

const navItems = ["Dungeons", "Shadows", "Chronicle", "About", "Arise"];

const NavBar = () => {
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [isIndicatorActive, setIsIndicatorActive] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isNavVisible, setIsNavVisible] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navContainerRef = useRef<HTMLDivElement>(null);
  const audioElementRef = useRef<HTMLAudioElement>(null);

  const { y: currentScrollY } = useWindowScroll();

  useEffect(() => {
    if (currentScrollY === 0) {
      setIsNavVisible(true);
      navContainerRef.current?.classList.remove("floating-nav");
    } else if (currentScrollY > lastScrollY) {
      setIsNavVisible(false);
      navContainerRef.current?.classList.add("floating-nav");
    } else if (currentScrollY < lastScrollY) {
      setIsNavVisible(true);
      navContainerRef.current?.classList.add("floating-nav");
    }

    setLastScrollY(currentScrollY);
  }, [currentScrollY, lastScrollY]);

  useEffect(() => {
    gsap.to(navContainerRef.current, {
      y: isNavVisible ? 0 : -100,
      opacity: isNavVisible ? 1 : 0,
      duration: 0.2,
    });
  }, [isNavVisible]);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
      gsap.to(".mobile-menu", {
        x: 0,
        opacity: 1,
        duration: 0.4,
        ease: "power4.out",
      });
    } else {
      document.body.style.overflow = "auto";
      gsap.to(".mobile-menu", {
        x: "100%",
        opacity: 0,
        duration: 0.4,
        ease: "power4.in",
      });
    }
  }, [isMenuOpen]);

  const toggleAudioIndicator = () => {
    setIsAudioPlaying((prev) => !prev);
    setIsIndicatorActive((prev) => !prev);
  };

  useEffect(() => {
    if (isAudioPlaying) {
      audioElementRef.current?.play();
    } else {
      audioElementRef.current?.pause();
    }
  }, [isAudioPlaying]);

  return (
    <>
      <div
        ref={navContainerRef}
        className="fixed inset-x-0 top-4 z-50 h-16 border-none sm:inset-x-6"
      >
      <header className="absolute top-1/2 w-full -translate-y-1/2">
        <nav className="flex size-full items-center justify-between p-4">
          <div className="flex items-center gap-7">
            <Image src="/images/logo.svg" alt="Monarch" width={120} height={30} className="w-28" />

            <Button
              id="arise-button"
              title="Arise"
              rightIcon={<TiLocationArrow />}
              containerClass="bg-monarch-purple text-monarch-text md:flex hidden items-center justify-center gap-1"
            />
          </div>

          <div className="flex h-full items-center">
            <div className="hidden md:block">
              {navItems.map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="nav-hover-btn"
                >
                  {item}
                </a>
              ))}
            </div>

            <button
              className="ml-10 flex items-center space-x-0.5"
              onClick={toggleAudioIndicator}
            >
              <audio
                ref={audioElementRef}
                src="/audio/bgm.mp3"
                className="hidden"
                loop
              />
              {[1, 2, 3, 4].map((bar) => (
                <div
                  key={bar}
                  className={`indicator-line ${
                    isIndicatorActive ? "active" : ""
                  }`}
                  style={{ animationDelay: `${bar * 0.1}s` }}
                />
              ))}
            </button>

            <button
              className="ml-6 block md:hidden text-monarch-text"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </nav>
      </header>
    </div>

    {/* Mobile Menu Overlay - Moved outside transformed container */}
    <div className="mobile-menu fixed inset-0 z-60 flex flex-col bg-monarch-void/95 backdrop-blur-xl md:hidden translate-x-full opacity-0">
      <div className="flex flex-col items-center justify-center h-full gap-8">
        {navItems.map((item) => (
          <a
            key={item}
            href={`#${item.toLowerCase()}`}
            className="text-4xl font-zentry uppercase text-monarch-text hover:text-monarch-purple transition-colors"
            onClick={() => setIsMenuOpen(false)}
          >
            {item}
          </a>
        ))}
        <Button
          id="mobile-arise-button"
          title="Arise"
          rightIcon={<TiLocationArrow />}
          containerClass="bg-monarch-purple text-monarch-text flex items-center justify-center gap-1 mt-4 px-10 py-4 text-xl"
          onClick={() => setIsMenuOpen(false)}
        />
      </div>
    </div>

    </>
  );
};

export default NavBar;
