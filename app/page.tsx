"use client";
import dynamic from 'next/dynamic';

const Hero = dynamic(() => import("../components/Hero"), { ssr: false });
const About = dynamic(() => import("../components/About"), { ssr: false });
const NavBar = dynamic(() => import("../components/NavBar"), { ssr: false });
const Features = dynamic(() => import("../components/Features"), { ssr: false });

// Lazily load below-the-fold components
const Story = dynamic(() => import('../components/Story'), { ssr: false });
const Contact = dynamic(() => import('../components/Contact'), { ssr: false });
const Footer = dynamic(() => import('../components/Footer'), { ssr: false });

export default function Page() {
  return (
    <main className="relative min-h-screen w-screen overflow-x-hidden">
      <NavBar />
      <Hero />
      <About />
      <Features />
      <Story />
      <Contact />
      <Footer />
    </main>
  );
}
