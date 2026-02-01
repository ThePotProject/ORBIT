import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BadgeEuro, Target, TrendingUp, ChevronRight, Box } from 'lucide-react';
import { CardProps } from '../types';

const steps: CardProps[] = [
  {
    title: "Commit €20",
    description: "A small pledge to keep you accountable. Think of it as reserving your seat on the rocket.",
    icon: <BadgeEuro size={32} />,
  },
  {
    title: "Enter the Geofence",
    description: "Check in at the IE Tower. Our system verifies your location coordinates in real-time.",
    icon: <Target size={32} />,
  },
  {
    title: "Harvest Dividends",
    description: "At the end of the week, the pot is split among those who stayed in orbit.",
    icon: <TrendingUp size={32} />,
  },
];

const Crate: React.FC<{ 
    step: CardProps; 
    index: number; 
    isActive: boolean; 
    onClick: () => void;
}> = ({ step, index, isActive, onClick }) => {
    return (
        <motion.div
            layout
            onClick={onClick}
            className={`relative cursor-pointer transition-all duration-500 ease-out flex-shrink-0 backdrop-blur-sm
                ${isActive ? 'w-full md:w-[500px] border-orbit-green/80 bg-white/[0.02]' : 'w-full md:w-[120px] border-white/10 bg-black/20 hover:border-white/30'}
                border h-[300px] rounded-sm overflow-hidden flex flex-col
            `}
        >
            {/* Header / Label Strip */}
            <div className={`w-full h-12 border-b ${isActive ? 'border-orbit-green/30 bg-orbit-green/5' : 'border-white/10'} flex items-center justify-between px-4 transition-colors duration-500`}>
                <span className={`font-mono text-xs tracking-widest ${isActive ? 'text-orbit-green' : 'text-gray-500'}`}>
                    MOD-0{index + 1}
                </span>
                {!isActive && <Box size={14} className="text-gray-600" />}
                {isActive && (
                    <div className="flex gap-1">
                        <div className="w-1 h-1 bg-orbit-green rounded-full animate-pulse" />
                        <div className="w-1 h-1 bg-orbit-green rounded-full animate-pulse delay-75" />
                        <div className="w-1 h-1 bg-orbit-green rounded-full animate-pulse delay-150" />
                    </div>
                )}
            </div>

            {/* Content Area */}
            <div className="flex-1 relative p-6 flex flex-col justify-between">
                {/* Collapsed View (Vertical Text) */}
                {!isActive && (
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="-rotate-90 whitespace-nowrap text-gray-500 font-bold tracking-widest text-sm uppercase">
                            {step.title}
                        </div>
                    </div>
                )}

                {/* Expanded View */}
                <AnimatePresence>
                    {isActive && (
                        <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.4, delay: 0.1 }}
                            className="flex flex-col h-full justify-between"
                        >
                            <div className="text-orbit-green mb-4">
                                {step.icon}
                            </div>
                            <div>
                                <h3 className="text-3xl font-instrument font-bold mb-4 text-white uppercase tracking-tight leading-none">
                                    {step.title}
                                </h3>
                                <p className="text-gray-400 font-light leading-relaxed max-w-sm">
                                    {step.description}
                                </p>
                            </div>
                            <div className="w-full flex justify-end">
                                <ChevronRight className="text-orbit-green/50 animate-pulse" />
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Corner Accents */}
            <div className={`absolute bottom-0 right-0 w-4 h-4 border-r border-b ${isActive ? 'border-orbit-green' : 'border-gray-700'}`} />
            <div className={`absolute bottom-0 left-0 w-4 h-4 border-l border-b ${isActive ? 'border-orbit-green' : 'border-gray-700'}`} />
        </motion.div>
    );
};

const HowItWorks: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section id="how-it-works" className="relative py-32 px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto">
            <div className="mb-20 text-center">
                <span className="text-orbit-green text-sm font-mono tracking-[0.2em] uppercase mb-4 block">System Protocol</span>
                <h2 className="text-4xl md:text-5xl font-serif-italic">The Cargo Mechanism</h2>
                <p className="text-gray-500 mt-4 max-w-lg mx-auto">Inspect the modules below to understand the operational flow.</p>
            </div>

            {/* Interactive Crate Container */}
            <div className="flex flex-col md:flex-row justify-center items-stretch gap-4 h-auto md:h-[300px]">
                {steps.map((step, index) => (
                    <Crate 
                        key={index} 
                        step={step} 
                        index={index} 
                        isActive={activeIndex === index} 
                        onClick={() => setActiveIndex(index)}
                    />
                ))}
            </div>
        </div>
    </section>
  );
};

export default HowItWorks;