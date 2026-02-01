import React from 'react';
import { motion } from 'framer-motion';

const Hero: React.FC = () => {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center pt-20 px-4 overflow-hidden">
      
      <div className="max-w-5xl mx-auto text-center z-10">
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="mb-12"
        >
            <h1 className="text-6xl md:text-8xl lg:text-9xl leading-[0.9] tracking-tighter text-white">
                Don't Drift. <br />
                <span className="font-serif-italic text-orbit-green/90 block mt-2">Stay in Orbit.</span>
            </h1>
        </motion.div>

        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-6 mt-12"
        >
            <a 
                href="#how-it-works"
                className="px-8 py-4 bg-white text-orbit-black font-bold text-lg rounded-sm hover:bg-orbit-green transition-colors duration-300 min-w-[200px] font-instrument inline-block"
            >
                Start Now
            </a>
            <a 
                href="https://forms.gle/C8jAWuNFT2CbeUaq9"
                target="_blank" 
                rel="noopener noreferrer"
                className="px-8 py-4 border border-white/20 backdrop-blur-sm bg-white/5 text-white font-bold text-lg rounded-sm hover:border-orbit-green hover:text-orbit-green transition-all duration-300 min-w-[200px] group font-instrument inline-block"
            >
                Join the Marathon
            </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;