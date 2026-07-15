'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sun, Moon, Palette } from 'lucide-react';

export default function ThemeToggle() {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Retrieve theme from localStorage or default to dark
    const savedTheme = localStorage.getItem('theme') as 'dark' | 'light' | null;
    if (savedTheme) {
      setTheme(savedTheme);
      if (savedTheme === 'light') {
        document.documentElement.classList.add('light');
      } else {
        document.documentElement.classList.remove('light');
      }
    } else {
      // Default to dark mode
      document.documentElement.classList.remove('light');
    }
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
    localStorage.setItem('theme', nextTheme);

    if (nextTheme === 'light') {
      document.documentElement.classList.add('light');
    } else {
      document.documentElement.classList.remove('light');
    }
  };

  if (!mounted) return null;

  return (
    <div className="fixed right-6 bottom-24 md:bottom-8 z-50 flex flex-col items-center gap-3">
      {/* Decorative tooltip showing on hover */}
      <div className="absolute right-14 bg-black/90 text-white text-[10px] tracking-wider uppercase px-2.5 py-1.5 rounded-lg border border-white/10 opacity-0 group-hover:opacity-100 pointer-events-none transition-all duration-300 transform translate-x-2 whitespace-nowrap shadow-xl">
        Toggle Theme
      </div>

      <motion.button
        id="theme-toggle-floating"
        onClick={toggleTheme}
        whileHover={{ scale: 1.1, rotate: 15 }}
        whileTap={{ scale: 0.9 }}
        className="relative group w-12 h-12 rounded-full flex items-center justify-center cursor-pointer transition-all duration-300 shadow-[0_4px_20px_rgba(0,0,0,0.3)] border border-white/10"
        style={{
          background: theme === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 102, 214, 0.08)',
          backdropFilter: 'blur(12px)',
          borderColor: theme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 102, 214, 0.15)',
        }}
        aria-label="Toggle visual theme"
      >
        {/* Glow effect */}
        <div 
          className="absolute inset-0 rounded-full blur-md opacity-40 transition-opacity duration-300 group-hover:opacity-80"
          style={{
            background: theme === 'dark' 
              ? 'radial-gradient(circle, rgba(0,191,165,0.4) 0%, transparent 70%)' 
              : 'radial-gradient(circle, rgba(0,102,214,0.4) 0%, transparent 70%)'
          }}
        />

        <AnimatePresence mode="wait" initial={false}>
          {theme === 'dark' ? (
            <motion.div
              key="sun"
              initial={{ scale: 0.5, rotate: -45, opacity: 0 }}
              animate={{ scale: 1, rotate: 0, opacity: 1 }}
              exit={{ scale: 0.5, rotate: 45, opacity: 0 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className="relative z-10 text-accent group-hover:text-mint transition-colors"
            >
              <Sun className="w-5 h-5" />
            </motion.div>
          ) : (
            <motion.div
              key="moon"
              initial={{ scale: 0.5, rotate: 45, opacity: 0 }}
              animate={{ scale: 1, rotate: 0, opacity: 1 }}
              exit={{ scale: 0.5, rotate: -45, opacity: 0 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className="relative z-10 text-primary group-hover:text-accent transition-colors"
            >
              <Moon className="w-5 h-5" />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Small floating helper text / tooltip on hover */}
        <div className="absolute right-14 bg-black/90 text-white text-[10px] font-mono tracking-widest px-2 py-1 rounded-md border border-white/15 opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100 pointer-events-none transition-all duration-200 shadow-lg whitespace-nowrap">
          {theme === 'dark' ? 'LIGHT THEME' : 'DARK THEME'}
        </div>
      </motion.button>
    </div>
  );
}
