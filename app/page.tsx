import dynamic from 'next/dynamic';

import Hero from "../components/Hero";
import About from "../components/About";
import NavBar from "../components/NavBar";
import Features from "../components/Features";

// Lazily load below-the-fold components
const Story = dynamic(() => import('../components/Story'), { ssr: true });
const Contact = dynamic(() => import('../components/Contact'), { ssr: true });
const Footer = dynamic(() => import('../components/Footer'), { ssr: true });

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
