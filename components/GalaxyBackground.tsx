import React, { useRef, useEffect } from 'react';

const GalaxyBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    let animationFrameId: number;

    const stars: { x: number; y: number; z: number; size: number; isGreen: boolean }[] = [];
    const numStars = 400; // Optimized for performance on all devices

    const initStars = () => {
      stars.length = 0;
      for (let i = 0; i < numStars; i++) {
        stars.push({
          x: (Math.random() - 0.5) * width * 2,
          y: (Math.random() - 0.5) * height * 2,
          z: Math.random() * width,
          size: Math.random() * 1.5,
          isGreen: Math.random() > 0.85 
        });
      }
    };

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      
      // High-DPI Support
      const dpr = window.devicePixelRatio || 1;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      initStars();
    };

    handleResize();

    const animate = () => {
      ctx.fillStyle = '#050505'; 
      ctx.fillRect(0, 0, width, height);

      const cx = width / 2;
      const cy = height / 2;

      stars.forEach((star) => {
        star.z -= 0.5;

        if (star.z <= 0) {
          star.z = width;
          star.x = (Math.random() - 0.5) * width * 2;
          star.y = (Math.random() - 0.5) * height * 2;
        }

        const k = 128.0 / star.z;
        const px = star.x * k + cx;
        const py = star.y * k + cy;

        if (px >= 0 && px <= width && py >= 0 && py <= height) {
          const size = (1 - star.z / width) * 2.5 * star.size;
          const opacity = (1 - star.z / width);
          
          ctx.beginPath();
          ctx.arc(px, py, size, 0, Math.PI * 2);
          
          if (star.isGreen) {
            ctx.fillStyle = `rgba(0, 255, 113, ${opacity})`;
            ctx.shadowBlur = 8;
            ctx.shadowColor = 'rgba(0, 255, 113, 0.4)';
          } else {
            ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`;
            ctx.shadowBlur = 0;
          }
          ctx.fill();
        }
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    window.addEventListener('resize', handleResize);
    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 z-0 pointer-events-none" />;
};

export default GalaxyBackground;