"use client";
import dynamic from 'next/dynamic';

const Hero = dynamic(() => import("../components/Hero"), { ssr: false });
const About = dynamic(() => import("../components/About"), { ssr: false });
const NavBar = dynamic(() => import("../components/NavBar"), { ssr: false });
const Features = dynamic(() => import("../components/Features"), { ssr: false });
const Story = dynamic(() => import('../components/Story'), { ssr: false });
const Contact = dynamic(() => import('../components/Contact'), { ssr: false });
const Footer = dynamic(() => import('../components/Footer'), { ssr: false });
const Gates = dynamic(() => import("../components/Gates"), { ssr: false });
const RealmTransition = dynamic(() => import("../components/RealmTransition"), { ssr: false });
const Ranks = dynamic(() => import("../components/Ranks"), { ssr: false });
const ShadowExtraction = dynamic(() => import("../components/ShadowExtraction"), { ssr: false });
const Monarchs = dynamic(() => import("../components/Monarchs"), { ssr: false });
const Weapons = dynamic(() => import("../components/Weapons"), { ssr: false });
const ShadowArmyCTA = dynamic(() => import("../components/ShadowArmyCTA"), { ssr: false });
const Beyond = dynamic(() => import("../components/Beyond"), { ssr: false });
const AriseScene = dynamic(() => import("../components/AriseScene"), { ssr: false });

export default function Page() {
  return (
    <main id="main-content" className="relative min-h-screen w-screen overflow-x-hidden">
      <NavBar />
      <Hero />
      <About />
      <Features />
      <Gates />
      <RealmTransition />
      <Ranks />
      <ShadowExtraction />
      <Monarchs />
      <Weapons />
      <Story />
      <AriseScene />
      <Beyond />
      <ShadowArmyCTA />
      <Contact />
      <Footer />
    </main>
  );
}
