'use client';

import React, { useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';

export default function BackgroundWaves() {
  const [mounted, setMounted] = useState(false);
  const { scrollY } = useScroll();

  // Scroll linked translations for parallax effect
  const wave1Y = useTransform(scrollY, [0, 800], [0, 100]);
  const wave2Y = useTransform(scrollY, [0, 800], [0, -120]);
  const wave3Y = useTransform(scrollY, [0, 800], [0, 60]);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div id="bg-waves-container" className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {/* Dark/Light Ambient Background Gradient */}
      <div 
        className="absolute inset-0 opacity-90" 
        style={{ 
          background: 'radial-gradient(at top right, var(--bg-ambient-from, rgba(0, 102, 214, 0.15)), var(--bg-ambient-via, #000000), var(--bg-ambient-to, #000000))',
          transition: 'background 0.4s ease'
        }}
      />
      {/* Wave details follow */}

      {/* Layer 1 SVG Wave (Primary Brand Color Blue - Bottom Flow) */}
      <motion.div
        style={{ y: wave1Y }}
        className="absolute bottom-0 left-0 w-[200%] h-[400px] opacity-25 filter blur-md select-none animate-wave-flow-1"
      >
        <svg viewBox="0 0 2000 400" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full" preserveAspectRatio="none">
          <path
            d="M 0 220 C 250 140, 250 300, 500 220 C 750 140, 750 300, 1000 220 C 1250 140, 1250 300, 1500 220 C 1750 140, 1750 300, 2000 220 L 2000 400 L 0 400 Z"
            fill="url(#gradient-blue)"
          />
          <defs>
            <linearGradient id="gradient-blue" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#0066D6" />
              <stop offset="100%" stopColor="#00BFA5" stopOpacity="0.2" />
            </linearGradient>
          </defs>
        </svg>
      </motion.div>

      {/* Layer 2 SVG Wave (Vibrant Teal Highlight - Mid Flow) */}
      <motion.div
        style={{ y: wave2Y }}
        className="absolute top-1/4 left-0 w-[200%] h-[500px] opacity-20 filter blur-xl select-none animate-wave-flow-2"
      >
        <svg viewBox="0 0 1600 400" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full" preserveAspectRatio="none">
          <path
            d="M 0 180 C 200 110, 200 250, 400 180 C 600 110, 600 250, 800 180 C 1000 110, 1000 250, 1200 180 C 1400 110, 1400 250, 1600 180 L 1600 400 L 0 400 Z"
            fill="url(#gradient-teal)"
          />
          <defs>
            <linearGradient id="gradient-teal" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#00BFA5" />
              <stop offset="100%" stopColor="#1DE9B6" stopOpacity="0.1" />
            </linearGradient>
          </defs>
        </svg>
      </motion.div>

      {/* Layer 3 SVG Wave (Mint Green Base Glow - High Flow) */}
      <motion.div
        style={{ y: wave3Y }}
        className="absolute bottom-1/4 left-0 w-[200%] h-[450px] opacity-15 filter blur-2xl select-none animate-wave-flow-3"
      >
        <svg viewBox="0 0 2400 400" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full" preserveAspectRatio="none">
          <path
            d="M 0 250 C 300 180, 300 320, 600 250 C 900 180, 900 320, 1200 250 C 1500 180, 1500 320, 1800 250 C 2100 180, 2100 320, 2400 250 L 2400 400 L 0 400 Z"
            fill="url(#gradient-mint)"
          />
          <defs>
            <linearGradient id="gradient-mint" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#1DE9B6" />
              <stop offset="100%" stopColor="#0066D6" stopOpacity="0.05" />
            </linearGradient>
          </defs>
        </svg>
      </motion.div>

      {/* Floating particles/dots layer */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(12)].map((_, i) => {
          const size = Math.random() * 6 + 4; // 4px to 10px
          const left = Math.random() * 100;
          const top = Math.random() * 100;
          const duration = Math.random() * 20 + 20; // 20s to 40s
          const delay = Math.random() * -10;

          return (
            <motion.div
              key={i}
              className="absolute rounded-full bg-accent/40 blur-[1px]"
              style={{
                width: size,
                height: size,
                left: `${left}%`,
                top: `${top}%`,
              }}
              animate={{
                y: [0, -40, 0],
                x: [0, 20, 0],
                opacity: [0.1, 0.6, 0.1],
              }}
              transition={{
                duration: duration,
                repeat: Infinity,
                delay: delay,
                ease: 'easeInOut',
              }}
            />
          );
        })}
      </div>
    </div>
  );
}
