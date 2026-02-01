import React, { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

class AttractorParticle {
  x: number = 0;
  y: number = 0;
  size: number = 0;
  speed: number = 0;
  angle: number = 0;

  constructor(w: number, h: number) {
    this.reset(w, h, true);
  }

  reset(w: number, h: number, initial: boolean = false) {
    const angle = Math.random() * Math.PI * 2;
    const dist = initial ? Math.random() * (Math.max(w, h) / 2) + 100 : Math.max(w, h) / 2 + Math.random() * 100;
    
    this.x = (w / 2) + Math.cos(angle) * dist;
    this.y = (h / 2) + Math.sin(angle) * dist;
    
    this.size = Math.random() * 2 + 1; 
    this.speed = Math.random() * 2 + 1;
  }

  update(ctx: CanvasRenderingContext2D, w: number, h: number, targetX: number, targetY: number, planetRadius: number) {
    const dx = targetX - this.x;
    const dy = targetY - this.y;
    const dist = Math.sqrt(dx * dx + dy * dy);

    const vx = (dx / dist) * this.speed;
    const vy = (dy / dist) * this.speed;

    this.x += vx;
    this.y += vy;

    if (dist < planetRadius - 5) {
        this.reset(w, h);
    }

    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = '#00FF71';
    ctx.fill();
  }
}

const ThePot: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "center center"]
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let particles: AttractorParticle[] = [];
    let animationFrameId: number;
    const planetRadius = 100; 

    const handleResize = () => {
        if (containerRef.current) {
            width = containerRef.current.clientWidth;
            height = containerRef.current.clientHeight;
            
            const dpr = window.devicePixelRatio || 1;
            canvas.width = width * dpr;
            canvas.height = height * dpr;
            ctx.scale(dpr, dpr);
            
            // Reduced particle count for a cleaner "simple" look and better performance
            particles = Array.from({ length: 30 }, () => new AttractorParticle(width, height));
        }
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    const render = () => {
        ctx.clearRect(0, 0, width, height);
        
        const centerX = width / 2;
        const centerY = height / 2;

        ctx.shadowBlur = 30;
        ctx.shadowColor = 'rgba(0, 255, 113, 0.4)';
        
        ctx.beginPath();
        ctx.arc(centerX, centerY, planetRadius, 0, Math.PI * 2);
        ctx.fillStyle = '#050505'; 
        ctx.fill();
        
        ctx.lineWidth = 2;
        ctx.strokeStyle = '#00FF71'; 
        ctx.stroke();

        ctx.shadowBlur = 0; 

        particles.forEach(p => {
            p.update(ctx, width, height, centerX, centerY, planetRadius);
        });

        animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
        window.removeEventListener('resize', handleResize);
        cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <section 
        id="the-pot" 
        ref={containerRef}
        className="relative h-[80vh] overflow-hidden"
    >
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none z-0" />
      
      {/* Layer 1: Title (Centered on Planet) */}
      <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
        <motion.h2 
            style={{ opacity: scrollYProgress, scale: useTransform(scrollYProgress, [0, 1], [0.8, 1]) }}
            className="text-4xl md:text-5xl font-serif-italic text-white drop-shadow-md tracking-wide"
        >
            The Pot
        </motion.h2>
      </div>

      {/* Layer 2: Description (Below Planet) */}
      <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
        <motion.div 
            style={{ opacity: scrollYProgress, y: useTransform(scrollYProgress, [0, 1], [20, 0]) }}
            className="mt-[280px] text-center px-6"
        >
            <p className="text-lg md:text-xl font-light text-gray-300 max-w-md mx-auto leading-relaxed drop-shadow-md bg-orbit-black/40 backdrop-blur-sm p-4 rounded-xl border border-white/5">
                <span className="text-orbit-green font-bold block mb-2">The Robin Hood Protocol.</span>
                Lazy stakes are redistributed to the disciplined. Zero house fees.
            </p>
        </motion.div>
      </div>
    </section>
  );
};

export default ThePot;