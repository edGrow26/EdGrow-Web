'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Shield } from 'lucide-react';

import BackgroundWaves from '../../../components/BackgroundWaves';
import Navbar from '../../../components/Navbar';
import Footer from '../../../components/Footer';

export default function TermsOfServicePage() {
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
              <span>Terms & Commercial Rules</span>
            </div>

            <h1 className="text-4xl sm:text-5xl font-black tracking-tight mb-8">
              Terms of Service
            </h1>

            <div className="prose prose-invert max-w-none text-white/70 text-sm sm:text-base leading-relaxed space-y-6 font-light">
              <p className="text-white/40 font-mono text-xs italic">Last updated: July 14, 2026</p>
              
              <p>
                Please read these Terms of Service (&ldquo;Terms,&rdquo; &ldquo;Terms of Service&rdquo;) carefully before using the corporate website operated by Edgrow Technologies.
              </p>

              <h2 className="text-xl sm:text-2xl font-bold text-white pt-6 border-b border-white/[0.06] pb-3">1. Scope of Engagement</h2>
              <p>
                By accessing our technical services, portfolio case studies, and interactive cost calculator, you agree to be bound by these Terms. If you disagree with any portion of the terms, you must refrain from accessing our services.
              </p>

              <h2 className="text-xl sm:text-2xl font-bold text-white pt-6 border-b border-white/[0.06] pb-3">2. Intellectual Property & Code Ownership</h2>
              <p>
                All custom components, layout styles, and animations displayed on this website are the intellectual property of Edgrow Technologies. When custom software contracts are dispatched and signed, our clients receive full intellectual property ownership of all custom codebase lines as explicitly defined in their Master Services Agreement (MSA).
              </p>

              <h2 className="text-xl sm:text-2xl font-bold text-white pt-6 border-b border-white/[0.06] pb-3">3. Governing Law</h2>
              <p>
                These terms shall be governed and construed in accordance with the laws of the United Kingdom and Sri Lanka, in accordance with the designated regional contract entity executing your statement of work.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
