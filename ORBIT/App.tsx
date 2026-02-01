import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import HowItWorks from './components/HowItWorks';
import Marathon from './components/Marathon';
import ThePot from './components/ThePot';
import Roadmap from './components/Roadmap';
import Footer from './components/Footer';
import GalaxyBackground from './components/GalaxyBackground';
import CustomCursor from './components/CustomCursor';

export default function App() {
  return (
    <div className="relative min-h-screen text-white font-sans selection:bg-orbit-green selection:text-orbit-black overflow-hidden bg-[#050505] cursor-none">
      {/* Custom Cursor */}
      <CustomCursor />

      {/* Dynamic Background */}
      <GalaxyBackground />

      {/* Background Noise Texture */}
      <div className="fixed inset-0 opacity-[0.03] pointer-events-none z-10 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay"></div>
      
      <Navbar />
      
      <main className="relative z-20 flex flex-col gap-0">
        <Hero />
        <HowItWorks />
        <Marathon />
        <ThePot />
        <Roadmap />
      </main>
      
      <Footer />
    </div>
  );
}