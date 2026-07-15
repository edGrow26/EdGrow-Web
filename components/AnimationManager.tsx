'use client';

import React, { useEffect, useState, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger client-side
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function AnimationManager() {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [logText, setLogText] = useState('INITIALIZING ARCHITECTURES...');
  
  const loaderRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const logsRef = useRef<HTMLDivElement>(null);

  // 1. Loader simulation & exit
  useEffect(() => {
    // Disable scrolling during load
    document.body.style.overflow = 'hidden';

    const duration = 2400; // 2.4s total load time
    const start = Date.now();

    const updateLoader = () => {
      const elapsed = Date.now() - start;
      const percent = Math.min(Math.round((elapsed / duration) * 100), 100);
      
      setProgress(percent);

      // Webflow dynamic status text
      if (percent < 15) {
        setLogText('INITIALIZING CORE COMPILER...');
      } else if (percent < 30) {
        setLogText('ESTABLISHING DUAL-REGION SECURE TUNNEL...');
      } else if (percent < 45) {
        setLogText('SPINNING UP NEXT.JS EDGE NODES...');
      } else if (percent < 60) {
        setLogText('STRUCTURING MULTI-TIER REVENUE SYSTEMS...');
      } else if (percent < 75) {
        setLogText('LOADING LUXURY MONTSERRAT TYPOGRAPHY...');
      } else if (percent < 90) {
        setLogText('MOUNTING INTERACTIVE SCROLL GRAPHICS...');
      } else if (percent < 100) {
        setLogText('FINALIZING DESIGNS & CACHE WARMING...');
      } else {
        setLogText('SYSTEM READY.');
      }

      if (percent < 100) {
        requestAnimationFrame(updateLoader);
      } else {
        // Trigger exit animation
        setTimeout(() => {
          const tl = gsap.timeline({
            onComplete: () => {
              setLoading(false);
              document.body.style.overflow = '';
              // Refresh scrolltrigger after page content layout settles
              ScrollTrigger.refresh();
              
              // Trigger hero animations once loader is gone
              triggerHeroEntrance();
            }
          });

          // Elegant fade and slide out of loader elements
          tl.to([counterRef.current, lineRef.current, logsRef.current], {
            opacity: 0,
            y: -20,
            duration: 0.4,
            stagger: 0.08,
            ease: 'power3.in'
          });

          // Slide the entire loader screen UP like a shutter
          tl.to(loaderRef.current, {
            yPercent: -100,
            duration: 0.85,
            ease: 'power4.inOut'
          }, '-=0.1');

          // Subtle reveal effect on main page content wrapper
          tl.fromTo('main, .relative', {
            scale: 0.96,
            opacity: 0.8
          }, {
            scale: 1,
            opacity: 1,
            duration: 1.2,
            ease: 'power3.out',
            clearProps: 'all'
          }, '-=0.6');

        }, 300);
      }
    };

    updateLoader();

    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  // 2. Global Scroll Trigger & Hover Animations
  useEffect(() => {
    if (loading) return;

    // A. Clean up helper
    const ctx = gsap.context(() => {
      
      // B. Reveal titles & section headers
      const headings = document.querySelectorAll('section h2, .gsap-reveal-title');
      headings.forEach((heading) => {
        gsap.fromTo(heading, 
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.85,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: heading,
              start: 'top 85%',
              toggleActions: 'play none none none',
            }
          }
        );
      });

      // C. Stagger glass panels / service cards / portfolio grids
      const grids = document.querySelectorAll('.grid, .gsap-stagger-container');
      grids.forEach((grid) => {
        const items = grid.querySelectorAll('.glass-panel, .gsap-stagger-item, article, .p-5');
        if (items.length > 0) {
          gsap.fromTo(items,
            { opacity: 0, y: 35 },
            {
              opacity: 1,
              y: 0,
              duration: 0.75,
              stagger: 0.12,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: grid,
                start: 'top 80%',
                toggleActions: 'play none none none',
              }
            }
          );
        }
      });

      // D. Interactive magnetic / fluid CTA button effect
      const buttons = document.querySelectorAll('.gsap-magnetic, [href="/contact"], [href="/portfolio"], #cta button, #cta a');
      buttons.forEach((btn) => {
        // Add magnetic effect
        const onMouseMove = (e: Event) => {
          const mouseEvent = e as MouseEvent;
          const rect = (btn as HTMLElement).getBoundingClientRect();
          const x = mouseEvent.clientX - rect.left - rect.width / 2;
          const y = mouseEvent.clientY - rect.top - rect.height / 2;
          
          gsap.to(btn, {
            x: x * 0.25,
            y: y * 0.25,
            duration: 0.3,
            ease: 'power2.out'
          });
        };

        const onMouseLeave = () => {
          gsap.to(btn, {
            x: 0,
            y: 0,
            duration: 0.5,
            ease: 'elastic.out(1, 0.3)'
          });
        };

        btn.addEventListener('mousemove', onMouseMove);
        btn.addEventListener('mouseleave', onMouseLeave);
      });

      // E. Custom sweep/clip-path reveals on images
      const images = document.querySelectorAll('img, .gsap-image-reveal');
      images.forEach((img) => {
        gsap.fromTo(img,
          { clipPath: 'inset(10% 10% 10% 10% round 16px)', scale: 1.05, opacity: 0.5 },
          {
            clipPath: 'inset(0% 0% 0% 0% round 12px)',
            scale: 1,
            opacity: 1,
            duration: 1.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: img,
              start: 'top 85%',
              toggleActions: 'play none none none',
            }
          }
        );
      });

    });

    return () => ctx.revert();
  }, [loading]);

  // 3. Hero entrance choreography
  const triggerHeroEntrance = () => {
    const tl = gsap.timeline();

    // Stagger hero badge, main heading split words, and sub-paragraphs
    tl.fromTo('#hero div[class*="inline-flex"]', 
      { opacity: 0, y: 25 },
      { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' }
    );

    // Split text simulation on heading for ultra-premium feel
    tl.fromTo('#hero h1',
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 0.9, ease: 'power4.out' },
      '-=0.5'
    );

    tl.fromTo('#hero p',
      { opacity: 0, y: 15 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' },
      '-=0.6'
    );

    tl.fromTo('#hero div[class*="flex-col sm:flex-row"]',
      { opacity: 0, scale: 0.95, y: 10 },
      { opacity: 1, scale: 1, y: 0, duration: 0.7, ease: 'power3.out' },
      '-=0.5'
    );

    // Stats counter animate
    tl.fromTo('#stats div',
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.8, stagger: 0.15, ease: 'power3.out' },
      '-=0.4'
    );
  };

  if (!loading) return null;

  return (
    <div
      ref={loaderRef}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-between bg-black text-white p-12 select-none"
    >
      {/* Abstract Glowing Background Ring */}
      <div className="absolute inset-0 flex items-center justify-center overflow-hidden pointer-events-none">
        <div className="w-[500px] h-[500px] rounded-full border border-white/[0.02] animate-[spin_40s_linear_infinite]" />
        <div className="absolute w-[300px] h-[300px] rounded-full border border-accent/[0.03] animate-[spin_20s_linear_infinite_reverse]" />
        <div className="absolute w-[120px] h-[120px] bg-primary/5 rounded-full filter blur-[80px]" />
      </div>

      {/* Top Header */}
      <div className="w-full flex justify-between items-center z-10 font-mono text-[10px] tracking-[0.2em] text-gray-500">
        <span>EDGROW TECHNOLOGIES</span>
        <span>SYS.V1.2.0</span>
      </div>

      {/* Main Counter Graphic */}
      <div ref={counterRef} className="flex flex-col items-center gap-2 z-10 my-auto">
        <div className="text-8xl sm:text-9xl font-black font-sans tracking-tighter bg-gradient-to-r from-white via-accent to-mint bg-clip-text text-transparent">
          {progress.toString().padStart(2, '0')}
        </div>
        
        {/* Loading Progress Line */}
        <div className="w-64 sm:w-80 h-[2px] bg-white/10 rounded-full overflow-hidden relative mt-4">
          <div
            ref={lineRef}
            className="h-full bg-gradient-to-r from-primary via-accent to-mint transition-all duration-100 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Dynamic Telemetry Terminal logs */}
      <div ref={logsRef} className="w-full flex flex-col items-center gap-1.5 z-10 font-mono text-[11px] text-gray-400">
        <span className="text-accent animate-pulse">● {logText}</span>
        <span className="text-gray-600 text-[9px] tracking-widest uppercase">
          STABILITY VERIFICATION ACTIVE • DUAL NETWORK SECURE
        </span>
      </div>
    </div>
  );
}
