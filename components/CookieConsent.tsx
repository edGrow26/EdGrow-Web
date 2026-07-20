'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'motion/react';
import { Shield, X } from 'lucide-react';

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Check if user has already accepted cookies
    const consent = localStorage.getItem('edgrow-cookie-consent');
    if (!consent) {
      const timer = setTimeout(() => {
        setVisible(true);
      }, 1500); // Delay showing for design pacing
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('edgrow-cookie-consent', 'accepted');
    setVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem('edgrow-cookie-consent', 'declined');
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 260, damping: 20 }}
          className="fixed bottom-6 right-6 left-6 md:left-auto md:max-w-md z-50"
        >
          <div className="glass-panel p-6 rounded-2xl shadow-2xl border border-white/10 flex flex-col gap-4 relative">
            <button
              onClick={() => setVisible(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
              aria-label="Close banner"
            >
              <X className="w-4 h-4" />
            </button>
            
            <div className="flex items-start gap-3">
              <div className="p-2 bg-accent/10 rounded-xl text-accent mt-0.5">
                <Shield className="w-5 h-5" />
              </div>
              <div className="flex flex-col gap-1">
                <h2 className="text-white text-sm font-bold">Cookie Consent</h2>
                <p className="text-gray-400 text-xs leading-relaxed">
                  We use cookies to measure technical performance, optimize loading speed, and provide tailored service recommendations. Read our{' '}
                  <Link href="/legal/cookies" className="text-accent hover:underline">
                    Cookie Policy
                  </Link>{' '}
                  for details.
                </p>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 self-end md:self-auto pt-2">
              <button
                onClick={handleDecline}
                className="px-4 py-2 text-xs font-semibold text-gray-400 hover:text-white transition-colors"
              >
                Decline Optional
              </button>
              <button
                onClick={handleAccept}
                className="px-5 py-2.5 text-xs font-bold text-black bg-gradient-to-r from-accent to-mint rounded-xl hover:shadow-[0_0_15px_rgba(0,191,165,0.3)] transition-all duration-200"
              >
                Accept All
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
