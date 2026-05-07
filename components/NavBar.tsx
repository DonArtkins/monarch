"use client";
import { useEffect, useRef, useState } from "react";
import Button from "./Button";
import { TiLocationArrow } from "react-icons/ti";
import { useWindowScroll } from "react-use";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const navItemsLeft = [
  { label: "Origin", href: "#about" },
  { label: "The System", href: "#features" },
  { label: "Shadow Army", href: "#shadow-army" },
];

const navItemsRight = [
  { label: "Dungeons", href: "#gates" },
  { label: "Monarchs", href: "#monarchs" },
];

const navItems = [...navItemsLeft, ...navItemsRight];

const NavBar = () => {
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [isIndicatorActive, setIsIndicatorActive] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isNavVisible, setIsNavVisible] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("");

  const navContainerRef = useRef<HTMLDivElement>(null);
  const audioElementRef = useRef<HTMLAudioElement>(null);
  const volumeProxyRef = useRef({ vol: 0 });
  const iconRef = useRef<SVGSVGElement>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);

  const { y: currentScrollY } = useWindowScroll();

  // Nav show/hide on scroll direction
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

  // Nav visibility GSAP animation
  useGSAP(() => {
    gsap.to(navContainerRef.current, {
      y: isNavVisible ? 0 : -100,
      opacity: isNavVisible ? 1 : 0,
      duration: 0.2,
    });
  }, { dependencies: [isNavVisible] });

  // Audio bars entrance animation
  useGSAP(() => {
    gsap.from(".indicator-line", {
      scaleY: 0,
      transformOrigin: "bottom center",
      duration: 0.4,
      stagger: 0.08,
      ease: "power2.out",
      delay: 0.6,
    });
  });

  // Active section tracking via IntersectionObserver
  useEffect(() => {
    const sections = document.querySelectorAll("section[id], div[id]");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.3 }
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  // GSAP hamburger ↔ X morph timeline
  useGSAP(
    () => {
      const tl = gsap.timeline({
        paused: true,
        defaults: { duration: 0.35, ease: "power3.inOut" },
      });

      // Collapse top + bottom bars toward middle, fade middle bar
      tl.to(".hb-top", { attr: { y1: 12, y2: 12 } }, 0)
        .to(".hb-bottom", { attr: { y1: 12, y2: 12 } }, 0)
        .to(".hb-mid", { opacity: 0, duration: 0.15 }, 0)
        // Rotate into X shape
        .to(".hb-top", { rotate: 45, transformOrigin: "center" }, 0.2)
        .to(".hb-bottom", { rotate: -45, transformOrigin: "center" }, 0.2);

      tlRef.current = tl;
    },
    { scope: iconRef }
  );

  // Drive hamburger animation based on menuOpen state
  useEffect(() => {
    const tl = tlRef.current;
    if (!tl) return;
    menuOpen ? tl.play() : tl.reverse();
  }, [menuOpen]);

  // Body scroll lock when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  // Smooth scroll handler
  const handleNavClick = (e: React.MouseEvent, href: string) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) target.scrollIntoView({ behavior: "smooth" });
  };

  // Audio toggle
  const toggleAudioIndicator = () => {
    setIsAudioPlaying((prev) => !prev);
    setIsIndicatorActive((prev) => !prev);
  };

  // Audio volume fade-in/out with GSAP
  useGSAP(() => {
    const audio = audioElementRef.current;
    if (!audio) return;

    if (isAudioPlaying) {
      audio.volume = 0;
      audio.play().catch((e) => console.warn("Audio play:", e));

      gsap.to(volumeProxyRef.current, {
        vol: 0.45,
        duration: 1.8,
        ease: "power2.out",
        onUpdate: () => {
          if (audio) audio.volume = volumeProxyRef.current.vol;
        },
      });
    } else {
      gsap.to(volumeProxyRef.current, {
        vol: 0,
        duration: 0.8,
        ease: "power2.in",
        onUpdate: () => {
          if (audio) audio.volume = volumeProxyRef.current.vol;
        },
        onComplete: () => {
          audio?.pause();
        },
      });
    }
  }, { dependencies: [isAudioPlaying] });

  return (
    <>
      <div
        ref={navContainerRef}
        className="fixed inset-x-0 top-4 z-50 h-16 border-none sm:inset-x-6"
        style={{ willChange: "transform, opacity" }}
      >
        <header className="absolute top-1/2 w-full -translate-y-1/2">
          <nav className="relative flex size-full items-center justify-between p-4">

            {/* === MOBILE LAYOUT (below md) === */}
            {/* Hamburger button — left */}
            <button
              type="button"
              onClick={() => setMenuOpen((v) => !v)}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              className="relative flex h-10 w-10 items-center justify-center md:hidden"
            >
              <svg
                ref={iconRef}
                viewBox="0 0 24 24"
                width="24"
                height="24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.75"
                strokeLinecap="round"
                className="text-monarch-text"
              >
                <line className="hb-bar hb-top" x1="4" y1="7" x2="20" y2="7" />
                <line className="hb-bar hb-mid" x1="4" y1="12" x2="20" y2="12" />
                <line className="hb-bar hb-bottom" x1="4" y1="17" x2="20" y2="17" />
              </svg>
            </button>

            {/* Mobile center logo — absolutely centered */}
            <a
              href="#hero"
              onClick={(e) => handleNavClick(e, "#hero")}
              className="pointer-events-auto absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 md:hidden"
              aria-label="Monarch home"
            >
              <img src="/images/logo.svg" alt="Monarch" className="h-7 w-auto" />
            </a>

            {/* Mobile ARISE CTA — right */}
            <div className="md:hidden">
              <Button
                id="mobile-arise-cta"
                title="Arise"
                rightIcon={<TiLocationArrow />}
                containerClass="bg-transparent border border-monarch-blue text-monarch-blue hover:bg-monarch-blue hover:text-monarch-void transition-all duration-300 flex items-center justify-center gap-1 !px-4 !py-2 text-xs"
              />
            </div>

            {/* === DESKTOP LAYOUT (md+) === */}
            {/* Left nav group */}
            <ul className="hidden items-center gap-8 md:flex">
              {navItemsLeft.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item.href)}
                    className={`nav-hover-btn ${
                      activeSection === item.href.slice(1) ? "!text-monarch-blue" : ""
                    }`}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>

            {/* Desktop center logo — absolutely centered */}
            <a
              href="#hero"
              onClick={(e) => handleNavClick(e, "#hero")}
              className="pointer-events-auto absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 hidden md:block"
              aria-label="Monarch home"
            >
              <img src="/logo/logo.svg" alt="Monarch" className="h-40 w-auto" />
            </a>

            {/* Right nav group + ARISE CTA + Audio */}
            <div className="hidden items-center gap-8 md:flex">
              <ul className="flex items-center gap-8">
                {navItemsRight.map((item) => (
                  <li key={item.href}>
                    <a
                      href={item.href}
                      onClick={(e) => handleNavClick(e, item.href)}
                      className={`nav-hover-btn ${
                        activeSection === item.href.slice(1) ? "!text-monarch-blue" : ""
                      }`}
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>

              <Button
                id="arise-button"
                title="Arise"
                rightIcon={<TiLocationArrow />}
                containerClass="bg-transparent border border-monarch-blue text-monarch-blue hover:bg-monarch-blue hover:text-monarch-void transition-all duration-300 flex items-center justify-center gap-1"
              />

              {/* Audio toggle — HUD style */}
              <div className="relative ml-10 group/audio">
                <button
                  className="flex items-center space-x-0.5 py-2"
                  onClick={toggleAudioIndicator}
                  aria-label={isAudioPlaying ? "Pause ambient audio" : "Play ambient audio"}
                  aria-pressed={isAudioPlaying}
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
                      className={`indicator-line ${isIndicatorActive ? "active" : ""}`}
                      style={{
                        animationDelay: `${bar * 0.1}s`,
                        ["--animation-order" as any]: bar,
                      }}
                    />
                  ))}
                </button>

                {/* HUD tooltip */}
                <div
                  className="absolute -bottom-7 left-1/2 -translate-x-1/2 opacity-0 group-hover/audio:opacity-100 transition-opacity duration-200 pointer-events-none hidden md:block"
                  aria-hidden="true"
                >
                  <p
                    style={{
                      fontFamily: "var(--font-mono, 'Space Mono', monospace)",
                      fontSize: "0.4rem",
                      textTransform: "uppercase",
                      letterSpacing: "0.15em",
                      color: "var(--ice-eye, #60A5FA)",
                      whiteSpace: "nowrap",
                      opacity: 0.7,
                    }}
                  >
                    {isAudioPlaying ? "AMBIENT · ON" : "AMBIENT · OFF"}
                  </p>
                </div>
              </div>
            </div>

            {/* Mobile audio toggle — always visible on mobile */}
            <button
              className="absolute right-20 top-1/2 -translate-y-1/2 flex items-center space-x-0.5 py-2 md:hidden"
              onClick={toggleAudioIndicator}
              aria-label={isAudioPlaying ? "Pause ambient audio" : "Play ambient audio"}
              aria-pressed={isAudioPlaying}
            >
              {[1, 2, 3, 4].map((bar) => (
                <div
                  key={bar}
                  className={`indicator-line ${isIndicatorActive ? "active" : ""}`}
                  style={{
                    animationDelay: `${bar * 0.1}s`,
                    ["--animation-order" as any]: bar,
                  }}
                />
              ))}
            </button>
          </nav>
        </header>
      </div>

      {/* Mobile Menu Overlay */}
      <div
        id="mobile-menu"
        className={`fixed inset-0 z-40 flex flex-col bg-monarch-void/95 backdrop-blur-sm md:hidden transition-opacity duration-300 ${
          menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        <ul className="flex h-full flex-col items-center justify-center gap-8">
          {navItems.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                onClick={(e) => {
                  handleNavClick(e, item.href);
                  setMenuOpen(false);
                }}
                className={`font-mono text-2xl uppercase tracking-[0.2em] transition-colors duration-300 ${
                  activeSection === item.href.slice(1)
                    ? "text-monarch-blue"
                    : "text-monarch-text hover:text-monarch-blue"
                }`}
              >
                {item.label}
              </a>
            </li>
          ))}
          <li>
            <Button
              id="mobile-menu-arise"
              title="Arise"
              rightIcon={<TiLocationArrow />}
              containerClass="bg-transparent border border-monarch-blue text-monarch-blue hover:bg-monarch-blue hover:text-monarch-void transition-all duration-300 flex items-center justify-center gap-1 mt-4 px-10 py-4 text-xl"
              onClick={() => setMenuOpen(false)}
            />
          </li>
        </ul>
      </div>
    </>
  );
};

export default NavBar;
