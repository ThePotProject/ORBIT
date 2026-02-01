import React from 'react';
import Star from './Star';

const Footer: React.FC = () => {
  return (
    <footer className="relative py-12 border-t border-white/5 bg-black/40 backdrop-blur-md text-center z-20">
      <div className="max-w-7xl mx-auto px-6 flex flex-col items-center justify-center gap-4">
        <div className="flex items-center gap-2 opacity-50">
            <Star className="w-3 h-3" />
            <Star className="w-3 h-3" />
            <Star className="w-3 h-3" />
        </div>
        <p className="text-gray-500 text-sm font-light">
          Researched at the IE Tower. <span className="text-white">Built for the ambitious.</span>
        </p>
        <p className="text-xs text-gray-700 mt-8">
            © {new Date().getFullYear()} Orbit Protocol. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;