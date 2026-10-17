'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Shield } from 'lucide-react';

import BackgroundWaves from '../../../components/BackgroundWaves';
import Navbar from '../../../components/Navbar';
import Footer from '../../../components/Footer';

export default function CookiePolicyPage() {
  return (
    <div className="relative min-h-screen bg-black text-white overflow-x-hidden">
      <BackgroundWaves />
      <Navbar />

      <section className="relative pt-36 pb-36 z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Ambient hero glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-radial from-primary/15 via-transparent to-transparent rounded-full blur-[120px] pointer-events-none" aria-hidden="true" />

        <Link
          href="/"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.04] border border-white/[0.08] text-xs font-semibold text-white/70 hover:text-white hover:bg-white/[0.08] transition-all mb-10 group"
        >
          <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
          <span>Back to Home</span>
        </Link>

        {/* Doppelrand container */}
        <div className="rounded-[2.5rem] p-[1px] bg-gradient-to-b from-white/[0.14] via-white/[0.04] to-transparent ring-1 ring-white/[0.08]">
          <div className="rounded-[calc(2.5rem-1px)] bg-[#040812]/95 p-8 sm:p-14 relative overflow-hidden backdrop-blur-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] text-[10px] font-mono font-bold text-accent uppercase tracking-widest mb-6">
              <Shield className="w-3.5 h-3.5" />
              <span>Cookies & Tracking Standards</span>
            </div>

            <h1 className="text-4xl sm:text-5xl font-black tracking-tight mb-8">
              Cookie Policy
            </h1>

            <div className="prose prose-invert max-w-none text-white/70 text-sm sm:text-base leading-relaxed space-y-6 font-light">
              <p className="text-white/40 font-mono text-xs italic">Last updated: July 14, 2026</p>
              
              <p>
                This Cookie Policy explains how Edgrow Technologies uses cookies and similar tracking technologies to recognize you when you visit our corporate platform.
              </p>

              <h2 className="text-xl sm:text-2xl font-bold text-white pt-6 border-b border-white/[0.06] pb-3">1. What are Cookies?</h2>
              <p>
                Cookies are small data files placed on your computer or mobile device when you load our page. Cookies help us measure loading velocities, secure form integrations, and remember your interactive cost calculator sliders.
              </p>

              <h2 className="text-xl sm:text-2xl font-bold text-white pt-6 border-b border-white/[0.06] pb-3">2. Types of Cookies We Use</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Essential Cookies:</strong> Critical for navigation, page loading speed security, and cookie consent recording.</li>
                <li><strong>Performance & Analytics Cookies:</strong> Help us measure which case studies are viewed most and track Core Web Vitals trends without tracking personal identity.</li>
              </ul>

              <h2 className="text-xl sm:text-2xl font-bold text-white pt-6 border-b border-white/[0.06] pb-3">3. Managing Preferences</h2>
              <p>
                You have the right to decide whether to accept or decline cookies through your browser settings or our persistent Cookie Consent banner.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
