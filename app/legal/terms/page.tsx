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

      <article className="relative pt-32 pb-32 z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-bold text-gray-400 hover:text-white transition-colors mb-8 group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
          Back to Home
        </Link>

        <div className="flex items-center gap-3 text-accent text-xs font-bold uppercase tracking-widest mb-6">
          <Shield className="w-5 h-5 text-accent" /> Terms & Rules
        </div>

        <h1 className="text-3xl sm:text-4xl font-black tracking-tight leading-tight mb-10">
          Terms of Service
        </h1>

        <div className="prose prose-invert text-gray-300 text-xs sm:text-sm leading-relaxed space-y-6">
          <p className="text-gray-400 italic">Last updated: July 14, 2026</p>
          
          <p>
            Please read these Terms of Service (&ldquo;Terms,&rdquo; &ldquo;Terms of Service&rdquo;) carefully before using the corporate website operated by Edgrow Technologies.
          </p>

          <h2 className="text-xl font-bold text-white pt-4 border-b border-white/5 pb-2">1. Scope of Engagement</h2>
          <p>
            By accessing our technical services, portfolio case studies, and interactive cost calculator, you agree to be bound by these Terms. If you disagree with any portion of the terms, you must refrain from accessing our services.
          </p>

          <h2 className="text-xl font-bold text-white pt-4 border-b border-white/5 pb-2">2. Intellectual Property & Code Ownership</h2>
          <p>
            All custom components, layout styles, and animations displayed on this website are the intellectual property of Edgrow Technologies. When custom software contracts are dispatched and signed, our clients receive full intellectual property ownership of all custom codebase lines as explicitly defined in their Master Services Agreement (MSA).
          </p>

          <h2 className="text-xl font-bold text-white pt-4 border-b border-white/5 pb-2">3. Accurate Custom Estimates</h2>
          <p>
            Any pricing range calculated on our Interactive Cost Calculator serves as a preliminary budgetary estimate. Actual project costs are finalized only upon signing an official Statement of Work (SOW) after a detailed architectural discovery phase.
          </p>
        </div>
      </article>

      <Footer />
    </div>
  );
}
