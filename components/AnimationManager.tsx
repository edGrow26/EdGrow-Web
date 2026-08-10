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
  const logoStageRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const wordmarkRef = useRef<HTMLDivElement>(null);
  const orbitRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const logsRef = useRef<HTMLDivElement>(null);

  // 1. Loader simulation & exit
  useEffect(() => {
    let cancelled = false;
    let animationFrameId: number | null = null;
    let loaderTimeline: gsap.core.Timeline | null = null;

    // Check if we've already shown the loader this session
    if (sessionStorage.getItem('edgrow-loader-seen')) {
      setLoading(false);
      return;
    }

    // Disable scrolling during load
    document.body.style.overflow = 'hidden';

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const duration = reducedMotion ? 300 : 1650;
    const start = performance.now();

    const updateLoader = () => {
      if (cancelled) return;

      const elapsed = performance.now() - start;
      const percent = Math.min(Math.round((elapsed / duration) * 100), 100);

      setProgress(percent);

      if (percent < 36) {
        setLogText('FORMING THE SIGNAL');
      } else if (percent < 72) {
        setLogText('ALIGNING DIGITAL SYSTEMS');
      } else if (percent < 100) {
        setLogText('OPENING THE EXPERIENCE');
      } else {
        setLogText('READY');
      }

      if (percent < 100) {
        animationFrameId = requestAnimationFrame(updateLoader);
      }
    };

    updateLoader();

    if (!loaderRef.current) return;

    const onLoaderComplete = () => {
      if (cancelled) return;
      sessionStorage.setItem('edgrow-loader-seen', 'true');
      setLoading(false);
      document.body.style.overflow = '';
      ScrollTrigger.refresh();
    };

    if (reducedMotion) {
      loaderTimeline = gsap.timeline({
        onComplete: onLoaderComplete,
      });
      loaderTimeline.to(loaderRef.current, { autoAlpha: 0, duration: 0.18, delay: 0.3 });
    } else {
      const orbitRings = orbitRef.current?.querySelectorAll('[data-loader-ring]');
      const energyOrbs = particlesRef.current?.querySelectorAll('[data-energy-orb]');

      loaderTimeline = gsap.timeline({
        defaults: { ease: 'power3.out' },
        onComplete: onLoaderComplete,
      });

      // Phase 1 — build the mark and reveal the wordmark.
      loaderTimeline
        .fromTo(logoStageRef.current, { autoAlpha: 0, scale: 0.78 }, { autoAlpha: 1, scale: 1, duration: 0.65 })
        .fromTo(orbitRings ?? [], { scale: 0.45, autoAlpha: 0, rotate: -70 }, {
          scale: 1,
          autoAlpha: 1,
          rotate: 0,
          duration: 0.7,
          stagger: 0.08,
        }, 0.05)
        .fromTo(wordmarkRef.current, { autoAlpha: 0, x: -18, clipPath: 'inset(0 100% 0 0)' }, {
          autoAlpha: 1,
          x: 0,
          clipPath: 'inset(0 0% 0 0)',
          duration: 0.75,
          ease: 'power4.out',
        }, 0.28)
        .fromTo([lineRef.current, logsRef.current], { autoAlpha: 0, y: 10 }, {
          autoAlpha: 1,
          y: 0,
          duration: 0.45,
          stagger: 0.08,
        }, 0.45);

      // Phase 2 — release the rings and concentrate the mark into energy.
      loaderTimeline
        .to(orbitRings ?? [], {
          scale: (index) => 1.45 + index * 0.18,
          rotate: (index) => index % 2 === 0 ? 90 : -110,
          autoAlpha: 0,
          duration: 0.55,
          stagger: 0.04,
          ease: 'power2.in',
        }, 1.02)
        .to(badgeRef.current, {
          scale: 1.12,
          boxShadow: '0 0 60px rgba(29, 233, 182, 0.36)',
          duration: 0.28,
          yoyo: true,
          repeat: 1,
        }, 1.05)
        .to(wordmarkRef.current, { autoAlpha: 0, x: 20, duration: 0.3, ease: 'power2.in' }, 1.2);

      // Phase 3 — split into brand energy, spiral inward, then lift the curtain.
      loaderTimeline
        .fromTo(energyOrbs ?? [], {
          autoAlpha: 0,
          scale: 0,
          x: 0,
          y: 0,
        }, {
          autoAlpha: 1,
          scale: 1,
          x: (index) => [-54, 0, 54][index] ?? 0,
          y: (index) => [18, -35, 18][index] ?? 0,
          duration: 0.34,
          stagger: 0.05,
        }, 1.35)
        .to(particlesRef.current, { rotate: 300, scale: 0.18, duration: 0.62, ease: 'power4.in' }, 1.58)
        .to([badgeRef.current, particlesRef.current, lineRef.current, logsRef.current], {
          autoAlpha: 0,
          scale: 0,
          duration: 0.24,
          ease: 'power3.in',
        }, 1.92)
        .to(loaderRef.current, {
          yPercent: -100,
          duration: 0.72,
          ease: 'power4.inOut',
        }, 2.02)
        .fromTo('#main-content', { autoAlpha: 0.65, scale: 0.975 }, {
          autoAlpha: 1,
          scale: 1,
          duration: 0.72,
          ease: 'power3.out',
          clearProps: 'all',
        }, 2.28);
    }

    return () => {
      cancelled = true;

      if (animationFrameId !== null) {
        cancelAnimationFrame(animationFrameId);
      }
      loaderTimeline?.kill();

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
        if (element.closest('[data-scroll-animate], #hero, nav, footer')) return false;
        if (element.closest('[data-no-scroll-animation]') && !element.matches('[data-auto-scroll-animate]')) return false;

        const position = window.getComputedStyle(element).position;
        return position !== 'fixed' && position !== 'sticky';
      });

      autoRevealCandidates.forEach((element) => {
        gsap.fromTo(element,
          { autoAlpha: 0, y: 30 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.4,
            ease: 'back.out(1.2)',
            scrollTrigger: {
              trigger: element,
              start: 'top 90%',
              end: 'bottom 10%',
              toggleActions: 'play none none none',
              once: true,
            },
          }
        );
      });

      // D. Interactive magnetic / fluid CTA button effect
      const buttons = document.querySelectorAll('.gsap-magnetic, #cta button, #cta a');
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

  // Re-run the hero reveal whenever the user returns to the home route.
  useEffect(() => {
    if (loading || pathname !== '/') return;

    let heroTimeline: gsap.core.Timeline | null = null;
    const frameId = requestAnimationFrame(() => {
      ScrollTrigger.refresh();
      heroTimeline = triggerHeroEntrance();
    });

    return () => {
      cancelAnimationFrame(frameId);
      heroTimeline?.scrollTrigger?.kill();
      heroTimeline?.kill();
    };
  }, [loading, pathname]);

  // 3. Hero entrance choreography
  const triggerHeroEntrance = () => {
    const hero = document.querySelector('#hero');
    if (!hero) return null;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: hero,
        start: 'top 92%',
        end: 'bottom 8%',
        toggleActions: 'restart reverse restart reverse',
      },
    });

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

    return tl;
  };

  if (!loading) return null;

  return (
    <div
      ref={loaderRef}
      role="status"
      aria-live="polite"
      aria-label={`Loading Edgrow Technologies, ${progress}% complete`}
      className="edgrow-preloader fixed inset-0 z-[9999] flex min-h-dvh select-none flex-col overflow-hidden bg-[#02070d] text-white"
    >
      {/* Architectural backdrop */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="preloader-grid absolute inset-0 opacity-40 [background-image:linear-gradient(rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.025)_1px,transparent_1px)] [background-size:72px_72px] [mask-image:radial-gradient(circle_at_center,black,transparent_78%)]" />
        <div className="absolute left-1/2 top-1/2 h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(0,191,165,0.11),rgba(0,102,214,0.035)_42%,transparent_70%)] blur-2xl" />
        <div className="absolute left-[8%] top-0 h-px w-[34%] bg-gradient-to-r from-transparent via-primary/70 to-transparent" />
        <div className="absolute bottom-0 right-[8%] h-px w-[34%] bg-gradient-to-r from-transparent via-accent/70 to-transparent" />
      </div>

      <div className="preloader-muted relative z-10 flex w-full items-center justify-between px-6 py-6 font-mono text-[10px] uppercase tracking-[0.22em] text-slate-500 sm:px-10 sm:py-8">
        <span className="inline-flex items-center gap-2.5">
          <span className="h-1.5 w-1.5 rounded-full bg-mint shadow-[0_0_12px_rgba(29,233,182,0.8)]" />
          Digital systems online
        </span>
        <span className="hidden sm:block">Colombo · London · Worldwide</span>
      </div>

      <div ref={logoStageRef} className="relative z-10 my-auto flex w-full flex-col items-center px-6">
        <div className="relative flex min-h-56 items-center justify-center sm:min-h-64">
          <div ref={orbitRef} className="pointer-events-none absolute left-1/2 top-1/2 h-52 w-52 -translate-x-1/2 -translate-y-1/2 sm:h-60 sm:w-60" aria-hidden="true">
            <div data-loader-ring className="absolute inset-0 rounded-full border border-primary/45 [clip-path:polygon(0_0,100%_0,100%_58%,0_92%)]" />
            <div data-loader-ring className="absolute inset-[14%] rotate-45 rounded-[38%] border border-accent/55" />
            <div data-loader-ring className="absolute inset-[27%] -rotate-12 rounded-full border border-dashed border-mint/70" />
            <span className="absolute left-1/2 top-0 h-2 w-2 -translate-x-1/2 rounded-full bg-primary shadow-[0_0_18px_#0066D6]" />
            <span className="absolute bottom-[13%] right-[5%] h-1.5 w-1.5 rounded-full bg-mint shadow-[0_0_16px_#1DE9B6]" />
          </div>

          <div ref={particlesRef} className="pointer-events-none absolute left-1/2 top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2" aria-hidden="true">
            <span data-energy-orb className="absolute inset-0 rounded-[45%_55%_60%_40%] bg-primary shadow-[0_0_26px_#0066D6]" />
            <span data-energy-orb className="absolute inset-0 rounded-[58%_42%_40%_60%] bg-accent shadow-[0_0_26px_#00BFA5]" />
            <span data-energy-orb className="absolute inset-0 rounded-full bg-mint shadow-[0_0_26px_#1DE9B6]" />
          </div>

          <div className="relative flex items-center gap-4 sm:gap-6">
            <div ref={badgeRef} className="preloader-badge relative flex h-[88px] w-[88px] shrink-0 items-center justify-center rounded-[32%] border border-white/15 bg-[#050d16]/90 shadow-[0_18px_60px_rgba(0,102,214,0.16)] backdrop-blur-xl sm:h-24 sm:w-24">
              <div className="preloader-badge-inset absolute inset-2 rounded-[30%] border border-accent/20" aria-hidden="true" />
              <span className="preloader-monogram bg-gradient-to-br from-white via-mint to-accent bg-clip-text text-3xl font-black tracking-[-0.12em] text-transparent sm:text-4xl">
                eg
              </span>
            </div>

            <div ref={wordmarkRef} className="preloader-wordmark min-w-0 border-l border-white/10 pl-4 sm:pl-6">
              <p className="preloader-title text-xl font-black leading-none tracking-[-0.04em] text-white sm:text-3xl">Edgrow</p>
              <p className="mt-2 bg-gradient-to-r from-primary via-accent to-mint bg-clip-text text-[9px] font-extrabold uppercase tracking-[0.25em] text-transparent sm:text-[11px]">
                Technologies
              </p>
            </div>
          </div>
        </div>

        <div className="mt-2 w-full max-w-sm sm:mt-5">
          <div className="mb-3 flex items-end justify-between font-mono">
            <span ref={logsRef} className="preloader-status text-[10px] uppercase tracking-[0.16em] text-slate-400">{logText}</span>
            <span className="preloader-percentage text-sm font-bold tabular-nums text-white">{String(progress).padStart(3, '0')}%</span>
          </div>
          <div className="preloader-progress-track h-px w-full overflow-hidden bg-white/10">
            <div
              ref={lineRef}
              className="h-full bg-gradient-to-r from-primary via-accent to-mint shadow-[0_0_14px_rgba(0,191,165,0.75)]"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="preloader-stage-label mt-3 flex justify-between font-mono text-[8px] uppercase tracking-[0.18em] text-slate-600" aria-hidden="true">
            <span>Reveal</span>
            <span>Morph</span>
            <span>Launch</span>
          </div>
        </div>
      </div>

      <div className="preloader-footer relative z-10 flex w-full items-center justify-between px-6 py-6 font-mono text-[9px] uppercase tracking-[0.18em] text-slate-600 sm:px-10 sm:py-8">
        <span>Edgrow © {new Date().getFullYear()}</span>
        <span>Engineering digital growth</span>
      </div>
    </div>
  );
}
