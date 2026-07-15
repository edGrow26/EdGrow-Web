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

      <article className="relative pt-32 pb-32 z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-bold text-gray-400 hover:text-white transition-colors mb-8 group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
          Back to Home
        </Link>

        <div className="flex items-center gap-3 text-accent text-xs font-bold uppercase tracking-widest mb-6">
          <Shield className="w-5 h-5 text-accent" /> Cookies & Tracking
        </div>

        <h1 className="text-3xl sm:text-4xl font-black tracking-tight leading-tight mb-10">
          Cookie Policy
        </h1>

        <div className="prose prose-invert text-gray-300 text-xs sm:text-sm leading-relaxed space-y-6">
          <p className="text-gray-400 italic">Last updated: July 14, 2026</p>
          
          <p>
            This Cookie Policy explains how Edgrow Technologies uses cookies and similar tracking technologies to recognize you when you visit our corporate platform.
          </p>

          <h2 className="text-xl font-bold text-white pt-4 border-b border-white/5 pb-2">1. What are Cookies?</h2>
          <p>
            Cookies are small data files placed on your computer or mobile device when you load our page. Cookies help us measure loading velocities, secure form integrations, and remember your interactive cost calculator sliders.
          </p>

          <h2 className="text-xl font-bold text-white pt-4 border-b border-white/5 pb-2">2. Types of Cookies We Use</h2>
          <ul className="list-disc pl-6 space-y-1">
            <li><strong>Essential Cookies:</strong> Critical for navigation, page loading speed security, and cookie consent recording.</li>
            <li><strong>Performance/Analytics Cookies:</strong> Help us measure which case studies are viewed most and track Core Web Vitals trends.</li>
          </ul>

          <h2 className="text-xl font-bold text-white pt-4 border-b border-white/5 pb-2">3. Controlling Your Cookies</h2>
          <p>
            You can select whether to accept or refuse optional performance tracking via our dismissible bottom-bar cookie banner or directly inside your web browser settings. Dismissing optional tracking does not affect your ability to view services or apply for listed jobs.
          </p>
        </div>
      </article>

      <Footer />
    </div>
  );
}
