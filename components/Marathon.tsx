import React from 'react';
import { motion } from 'framer-motion';

const Marathon: React.FC = () => {
  return (
    <section id="marathon" className="relative py-32 overflow-hidden border-y border-white/5 backdrop-blur-[2px] bg-black/20">
      <div className="max-w-4xl mx-auto text-center relative z-10 px-6">
        
        {/* Status Badge */}
        <div className="inline-flex items-center gap-3 px-4 py-2 border border-orbit-green/30 rounded-full bg-orbit-green/5 mb-12">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orbit-green opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-orbit-green"></span>
            </span>
            <span className="text-orbit-green text-xs font-bold tracking-widest uppercase">System Status: Scanning</span>
        </div>

        <h2 className="text-5xl md:text-7xl font-sans font-bold tracking-tighter mb-8">
            THE FINALS MARATHON
        </h2>
        
        <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto mb-16">
            The ultimate test of endurance and focus for the IE University elite.
        </p>

        {/* Radar / Status UI */}
        <div className="flex flex-col items-center justify-center">
            <div className="relative w-64 h-64 md:w-80 md:h-80 border border-white/10 rounded-full flex items-center justify-center bg-black/40 backdrop-blur-sm">
                {/* Grid Lines */}
                <div className="absolute inset-0 rounded-full border border-white/5" style={{ transform: 'scale(0.66)' }}></div>
                <div className="absolute inset-0 rounded-full border border-white/5" style={{ transform: 'scale(0.33)' }}></div>
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-full h-[1px] bg-white/10"></div>
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="h-full w-[1px] bg-white/10"></div>
                </div>

                {/* Radar Sweep */}
                <div className="absolute inset-0 rounded-full animate-radar-spin overflow-hidden">
                     <div className="w-1/2 h-1/2 bg-gradient-to-br from-transparent via-orbit-green/20 to-transparent absolute top-0 left-0 origin-bottom-right rounded-tl-full" 
                          style={{ filter: 'blur(4px)' }}></div>
                     <div className="absolute top-1/2 left-1/2 w-[50%] h-[2px] bg-orbit-green/50 origin-left -translate-y-1/2 shadow-[0_0_10px_#00FF71]"></div>
                </div>

                {/* Blips */}
                <motion.div 
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: [0, 1, 0], scale: [0.5, 1, 1] }}
                    transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                    className="absolute top-1/3 right-1/4 w-2 h-2 bg-orbit-green rounded-full shadow-[0_0_10px_#00FF71]"
                />
                 <motion.div 
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: [0, 1, 0], scale: [0.5, 1, 1] }}
                    transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
                    className="absolute bottom-1/4 left-1/3 w-1.5 h-1.5 bg-white rounded-full"
                />

                {/* Center Text */}
                <div className="relative z-10 text-center">
                    <span className="block text-3xl font-bold text-white font-instrument tracking-tight">WAITLIST</span>
                    <span className="text-xs text-orbit-green uppercase tracking-widest mt-1">Open</span>
                </div>
            </div>

            <div className="mt-8 flex flex-col gap-2">
                <p className="text-gray-500 font-mono text-xs uppercase tracking-widest">Next Cycle Initialization</p>
                <p className="text-white text-xl font-instrument">Date: <span className="text-gray-400">To Be Announced</span></p>
            </div>
            
            <a 
                href="https://forms.gle/C8jAWuNFT2CbeUaq9"
                target="_blank" 
                rel="noopener noreferrer"
                className="mt-8 px-8 py-3 bg-white/5 border border-white/10 hover:border-orbit-green/50 hover:bg-orbit-green/5 hover:text-orbit-green transition-all duration-300 rounded-sm text-sm uppercase tracking-widest font-bold inline-block"
            >
                Register Interest
            </a>
        </div>
      </div>
    </section>
  );
};

export default Marathon;