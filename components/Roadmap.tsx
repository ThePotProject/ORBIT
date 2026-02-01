import React, { useRef, useState } from 'react';
import { motion, useSpring, useTransform, useMotionValue } from 'framer-motion';
import { PlanetProps } from '../types';

const planets: PlanetProps[] = [
    {
        name: "The WhatsApp Pilot",
        phase: "Phase 1",
        description: "MVP testing with 50 students. Manual verification.",
        glowColor: "rgba(255,255,255,0.2)"
    },
    {
        name: "The Automated Tower",
        phase: "Phase 2",
        description: "Geofencing integration. Smart contract implementation.",
        glowColor: "rgba(255, 100, 100, 0.4)"
    },
    {
        name: "The Verified Grit Score",
        phase: "Phase 3",
        description: "The global leaderboard for ambitious talent.",
        glowColor: "rgba(0, 255, 113, 0.6)",
        isSun: true
    }
];

const MagneticPlanet: React.FC<{ planet: PlanetProps; index: number }> = ({ planet, index }) => {
    const ref = useRef<HTMLDivElement>(null);
    const [isExpanded, setIsExpanded] = useState(false);
    
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseX = useSpring(x, { stiffness: 150, damping: 15 });
    const mouseY = useSpring(y, { stiffness: 150, damping: 15 });

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        const distanceX = e.clientX - centerX;
        const distanceY = e.clientY - centerY;

        // Magnetic strength
        x.set(distanceX * 0.2);
        y.set(distanceY * 0.2);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <div className="relative flex items-center gap-8 md:gap-16 py-12 md:py-20 group">
             {/* Text Side (Alternating) */}
             <div className={`hidden md:block w-1/2 text-right ${index % 2 !== 0 ? 'order-1 text-left' : ''}`}>
                <span className="text-xs font-mono text-gray-500 uppercase tracking-widest block mb-2">{planet.phase}</span>
                <h3 className={`text-2xl font-bold ${planet.isSun ? 'text-orbit-green' : 'text-white'}`}>{planet.name}</h3>
                <AnimatePresence>
                    {isExpanded && (
                        <motion.p 
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="text-gray-400 mt-2"
                        >
                            {planet.description}
                        </motion.p>
                    )}
                </AnimatePresence>
             </div>

             {/* Planet Center */}
             <div className="relative z-10 flex items-center justify-center w-20 h-20 shrink-0">
                <motion.div
                    ref={ref}
                    onMouseMove={handleMouseMove}
                    onMouseLeave={handleMouseLeave}
                    onClick={() => setIsExpanded(!isExpanded)}
                    style={{ x: mouseX, y: mouseY }}
                    className={`cursor-pointer rounded-full transition-all duration-300 ${planet.isSun ? 'w-16 h-16 bg-white shadow-[0_0_50px_rgba(0,255,113,0.5)]' : 'w-8 h-8 bg-[#222] border border-white/20'}`}
                >
                     {/* Planet Glow */}
                     <div 
                        className="absolute inset-0 rounded-full blur-xl transition-all duration-500 group-hover:blur-2xl"
                        style={{ backgroundColor: planet.glowColor }} 
                     />
                </motion.div>
             </div>

             {/* Text Side (Mobile) */}
             <div className="md:hidden flex-1">
                <span className="text-xs font-mono text-gray-500 uppercase tracking-widest block mb-1">{planet.phase}</span>
                <h3 className={`text-xl font-bold ${planet.isSun ? 'text-orbit-green' : 'text-white'}`}>{planet.name}</h3>
                {isExpanded && <p className="text-gray-400 mt-2 text-sm">{planet.description}</p>}
             </div>
             
             {/* Text Side (Desktop Alternate Filler) */}
             <div className={`hidden md:block w-1/2 ${index % 2 !== 0 ? '' : 'order-1'}`} />
        </div>
    );
}

// Helper for AnimatePresence to work inside the component
import { AnimatePresence } from 'framer-motion';

const Roadmap: React.FC = () => {
  return (
    <section id="roadmap" className="py-32 px-6 relative overflow-hidden">
        <div className="max-w-4xl mx-auto relative">
             {/* Vertical Line */}
             <div className="absolute left-[39px] md:left-1/2 top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-white/20 to-transparent -translate-x-1/2 border-l border-dashed border-white/20" />

             {planets.map((planet, index) => (
                <MagneticPlanet key={index} planet={planet} index={index} />
             ))}
        </div>
    </section>
  );
};

export default Roadmap;