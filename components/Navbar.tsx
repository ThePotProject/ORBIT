import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Star from './Star';
import { NavLink } from '../types';

const links: NavLink[] = [
  { label: 'How it Works', href: '#how-it-works' },
  { label: 'The Marathon', href: '#marathon' },
  { label: 'The Pot', href: '#the-pot' },
  { label: 'Roadmap', href: '#roadmap' },
];

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-4 mix-blend-difference text-white">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="group flex items-center gap-1 cursor-pointer">
            <div className="relative font-serif-italic text-5xl leading-none tracking-tight">
             <span className="relative inline-block">
                O
                <motion.div
                    className="absolute top-[2px] right-[2px] origin-center"
                    initial={{ rotate: 0, scale: 1 }}
                    whileHover={{ rotate: 180, scale: 1.2 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                    <Star className="w-3 h-3 text-orbit-green" fill="#00FF71" />
                </motion.div>
             </span>
             {/* Updated font to Instrument Sans SemiBold as requested */}
             <span className="font-instrument font-semibold text-3xl tracking-wide ml-[-2px]">RBIT</span>
            </div>
        </a>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="relative group text-sm font-semibold tracking-wide text-gray-300 hover:text-white transition-colors"
            >
              {link.label}
              <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-orbit-green transition-all duration-300 ease-out group-hover:w-full" />
            </a>
          ))}
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden">
            <button 
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-white focus:outline-none"
            >
                <div className="space-y-2">
                    <span className={`block w-8 h-0.5 bg-white transition-transform ${isMenuOpen ? 'rotate-45 translate-y-2.5' : ''}`}></span>
                    <span className={`block w-8 h-0.5 bg-white transition-opacity ${isMenuOpen ? 'opacity-0' : ''}`}></span>
                    <span className={`block w-8 h-0.5 bg-white transition-transform ${isMenuOpen ? '-rotate-45 -translate-y-2.5' : ''}`}></span>
                </div>
            </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
            <motion.div 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="absolute top-20 left-0 right-0 bg-orbit-black/95 backdrop-blur-xl border-b border-white/10 p-6 md:hidden flex flex-col gap-4"
            >
                 {links.map((link) => (
                    <a
                    key={link.label}
                    href={link.href}
                    onClick={() => setIsMenuOpen(false)}
                    className="text-lg font-semibold text-gray-300 hover:text-orbit-green"
                    >
                    {link.label}
                    </a>
                ))}
            </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;