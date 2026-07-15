'use client';

import React, { useEffect, useState, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { usePathname } from 'next/navigation';

// Register ScrollTrigger client-side
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function AnimationManager() {
  const pathname = usePathname();
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [logText, setLogText] = useState('INITIALIZING ARCHITECTURES...');
  
  const loaderRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const logsRef = useRef<HTMLDivElement>(null);

  // 1. Loader simulation & exit
  useEffect(() => {
    let cancelled = false;
    let animationFrameId: number | null = null;
    let exitTimerId: ReturnType<typeof setTimeout> | null = null;
    let exitTimeline: gsap.core.Timeline | null = null;

    // Disable scrolling during load
    document.body.style.overflow = 'hidden';

    const duration = 1200; // 1.2s total load time
    const start = Date.now();

    const updateLoader = () => {
      if (cancelled) return;

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
        animationFrameId = requestAnimationFrame(updateLoader);
      } else {
        // Trigger exit animation
        exitTimerId = setTimeout(() => {
          if (cancelled || !loaderRef.current) return;

          exitTimeline = gsap.timeline({
            onComplete: () => {
              if (cancelled) return;

              setLoading(false);
              document.body.style.overflow = '';
              // Refresh scrolltrigger after page content layout settles
              ScrollTrigger.refresh();
              
              // Trigger hero animations once loader is gone
              triggerHeroEntrance();
            }
          });

          // Elegant fade and slide out of loader elements
          exitTimeline.to([counterRef.current, lineRef.current, logsRef.current], {
            opacity: 0,
            y: -20,
            duration: 0.4,
            stagger: 0.08,
            ease: 'power3.in'
          });

          // Slide the entire loader screen UP like a shutter
          exitTimeline.to(loaderRef.current, {
            yPercent: -100,
            duration: 0.85,
            ease: 'power4.inOut'
          }, '-=0.1');

          // Subtle reveal effect on main page content wrapper
          exitTimeline.fromTo('#main-content', {
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
      cancelled = true;

      if (animationFrameId !== null) {
        cancelAnimationFrame(animationFrameId);
      }
      if (exitTimerId !== null) {
        clearTimeout(exitTimerId);
      }
      exitTimeline?.kill();

      gsap.set('#main-content', { clearProps: 'opacity,transform' });
      document.body.style.overflow = '';
    };
  }, []);

  // 2. Global Scroll Trigger & Hover Animations
  useEffect(() => {
    if (loading) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      gsap.set('[data-scroll-animate]', { clearProps: 'all' });
      return;
    }

    const listenerCleanups: Array<() => void> = [];

    // A. Clean up helper
    const ctx = gsap.context(() => {

      // B. Animate page blocks that have not opted into the shared Motion
      // component. This covers CMS detail pages and legal content without
      // double-transforming components wrapped in <ScrollAnimate>.
      const autoRevealCandidates = Array.from(document.querySelectorAll<HTMLElement>(
        '#main-content article > *, #main-content section > div > *, [data-auto-scroll-animate]'
      )).filter((element, index, elements) => {
        if (elements.indexOf(element) !== index) return false;
        if (element.closest('[data-scroll-animate], #hero, nav, footer, [data-no-scroll-animation]')) return false;

        const position = window.getComputedStyle(element).position;
        return position !== 'fixed' && position !== 'sticky';
      });

      autoRevealCandidates.forEach((element, index) => {
        const horizontalDistance = window.innerWidth < 640 ? 20 : 46;
        const x = index % 2 === 0 ? -horizontalDistance : horizontalDistance;

        gsap.fromTo(element,
          { autoAlpha: 0, x, y: 24, scale: 0.97 },
          {
            autoAlpha: 1,
            x: 0,
            y: 0,
            scale: 1,
            duration: 0.75,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: element,
              start: 'top 90%',
              end: 'bottom 10%',
              toggleActions: 'play reverse play reverse',
            },
          }
        );
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
        listenerCleanups.push(() => {
          btn.removeEventListener('mousemove', onMouseMove);
          btn.removeEventListener('mouseleave', onMouseLeave);
        });
      });
    });

    const refreshFrame = requestAnimationFrame(() => ScrollTrigger.refresh());

    return () => {
      cancelAnimationFrame(refreshFrame);
      listenerCleanups.forEach((cleanup) => cleanup());
      ctx.revert();
    };
  }, [loading, pathname]);

  // 3. Hero entrance choreography
  const triggerHeroEntrance = () => {
    const hero = document.querySelector('#hero');
    if (!hero) return;

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

      {/* Main Spinning Logo Graphic */}
      <div ref={counterRef} className="flex flex-col items-center gap-6 z-10 my-auto relative">
        <div className="relative w-36 h-36 flex items-center justify-center">
          {/* Outer Ring - Spinning Line Arc */}
          <svg className="absolute inset-0 w-full h-full animate-[spin_2s_linear_infinite]" viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r="46"
              fill="none"
              stroke="url(#loader-gradient-1)"
              strokeWidth="2"
              strokeDasharray="80 100"
              strokeLinecap="round"
            />
            <defs>
              <linearGradient id="loader-gradient-1" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#0066D6" />
                <stop offset="50%" stopColor="#00BFA5" />
                <stop offset="100%" stopColor="#1DE9B6" />
              </linearGradient>
            </defs>
          </svg>

          {/* Middle Ring - Spinning Dots (Counter-clockwise) */}
          <svg className="absolute w-[80%] h-[80%] animate-[spin_3s_linear_infinite_reverse]" viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r="44"
              fill="none"
              stroke="#00BFA5"
              strokeWidth="3.5"
              strokeDasharray="1 18"
              strokeLinecap="round"
              opacity="0.8"
            />
          </svg>

          {/* Inner Ring - Spinning Dashed Arc */}
          <svg className="absolute w-[60%] h-[60%] animate-[spin_1.5s_linear_infinite]" viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r="42"
              fill="none"
              stroke="#1DE9B6"
              strokeWidth="2"
              strokeDasharray="40 40"
              strokeLinecap="round"
              opacity="0.9"
            />
          </svg>

          {/* Glowing Aura behind Logo */}
          <div className="absolute w-20 h-20 bg-gradient-to-br from-primary via-accent to-mint rounded-full blur-2xl opacity-30 animate-pulse" />

          {/* Central Logo 'eg' */}
          <div className="absolute flex items-center justify-center w-20 h-20 rounded-full bg-black/80 border border-white/10 backdrop-blur-xl shadow-[0_0_30px_rgba(0,183,165,0.15)]">
            <span className="text-3xl font-black tracking-tight bg-gradient-to-br from-white via-slate-200 to-accent bg-clip-text text-transparent select-none font-sans">
              eg
            </span>
          </div>
        </div>

        {/* Loading Progress Line */}
        <div className="w-56 sm:w-64 h-[2px] bg-white/5 rounded-full overflow-hidden relative mt-2">
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
