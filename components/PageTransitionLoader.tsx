'use client';

import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { useEffect, useRef, useState } from 'react';

const EXIT_DELAY_MS = 420;
const SAFETY_TIMEOUT_MS = 3500;

export default function PageTransitionLoader() {
  const pathname = usePathname();
  const previousPathname = useRef(pathname);
  const [visible, setVisible] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const handleLinkClick = (event: MouseEvent) => {
      if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey
      ) {
        return;
      }

      const target = event.target;
      if (!(target instanceof Element)) return;

      const anchor = target.closest<HTMLAnchorElement>('a[href]');
      if (!anchor || anchor.target === '_blank' || anchor.hasAttribute('download')) return;

      const destination = new URL(anchor.href, window.location.href);
      if (destination.origin !== window.location.origin) return;
      if (destination.hash && destination.pathname === window.location.pathname) return;

      const currentLocation = `${window.location.pathname}${window.location.search}`;
      const nextLocation = `${destination.pathname}${destination.search}`;
      if (currentLocation === nextLocation) return;

      setVisible(true);
    };

    document.addEventListener('click', handleLinkClick, true);
    return () => document.removeEventListener('click', handleLinkClick, true);
  }, []);

  useEffect(() => {
    if (previousPathname.current === pathname) return;

    previousPathname.current = pathname;
    setVisible(true);

    const exitTimer = window.setTimeout(() => setVisible(false), EXIT_DELAY_MS);
    return () => window.clearTimeout(exitTimer);
  }, [pathname]);

  useEffect(() => {
    if (!visible) return;

    const safetyTimer = window.setTimeout(() => setVisible(false), SAFETY_TIMEOUT_MS);
    return () => window.clearTimeout(safetyTimer);
  }, [visible]);

  return (
    <AnimatePresence initial={false}>
      {visible && (
        <motion.div
          key="page-transition-loader"
          role="status"
          aria-live="polite"
          aria-label="Loading the next page"
          initial={shouldReduceMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: -12 }}
          transition={{ duration: shouldReduceMotion ? 0.01 : 0.22, ease: 'easeOut' }}
          className="fixed inset-0 z-[9998] flex items-center justify-center bg-black/95 backdrop-blur-xl"
        >
          <div className="relative flex flex-col items-center gap-6 px-8 text-center">
            <div className="relative flex h-24 w-24 items-center justify-center">
              <div
                className={`absolute inset-0 rounded-full border-2 border-white/10 border-t-accent border-r-primary ${
                  shouldReduceMotion ? '' : 'animate-spin'
                }`}
                aria-hidden="true"
              />
              <div className="absolute inset-3 rounded-full bg-gradient-to-br from-primary/25 to-mint/20 blur-lg" aria-hidden="true" />
              <Image
                src="/EdGrow%20Favicon.png"
                alt=""
                width={64}
                height={64}
                className="relative h-16 w-16 rounded-full object-cover shadow-[0_0_24px_rgba(0,191,165,0.25)]"
                priority
              />
            </div>

            <div className="flex flex-col items-center gap-2">
              <span className="text-sm font-bold tracking-[0.2em] text-white uppercase">
                Loading ...
              </span>
              <span className="text-xs text-gray-400">Preparing the next Edgrow experience…</span>
            </div>

            <div className="h-1 w-44 overflow-hidden rounded-full bg-white/10" aria-hidden="true">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-primary via-accent to-mint"
                initial={{ x: '-100%' }}
                animate={{ x: '100%' }}
                transition={{
                  duration: shouldReduceMotion ? 0 : 0.9,
                  ease: 'easeInOut',
                  repeat: shouldReduceMotion ? 0 : Infinity,
                }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
