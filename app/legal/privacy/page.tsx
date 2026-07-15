'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Shield } from 'lucide-react';

import BackgroundWaves from '../../../components/BackgroundWaves';
import Navbar from '../../../components/Navbar';
import Footer from '../../../components/Footer';

export default function PrivacyPolicyPage() {
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
          <Shield className="w-5 h-5 text-accent" /> Privacy & Trust
        </div>

        <h1 className="text-3xl sm:text-4xl font-black tracking-tight leading-tight mb-10">
          Privacy Policy
        </h1>

        <div className="prose prose-invert text-gray-300 text-xs sm:text-sm leading-relaxed space-y-6">
          <p className="text-gray-400 italic">Last updated: July 14, 2026</p>
          
          <p>
            Edgrow Technologies (&ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;) operates regional corporate development networks from Sri Lanka and the United Kingdom. This page informs you of our policies regarding the collection, use, and disclosure of personal data when you use our website.
          </p>

          <h2 className="text-xl font-bold text-white pt-4 border-b border-white/5 pb-2">1. Personal Information Collection</h2>
          <p>
            While using our custom software or contact inquiry portals, we may ask you to provide us with certain personally identifiable information that can be used to contact or identify you. Personally identifiable information may include, but is not limited to:
          </p>
          <ul className="list-disc pl-6 space-y-1">
            <li>Email address</li>
            <li>First name and last name</li>
            <li>Company affiliation</li>
            <li>Resume and Cover Note attachments</li>
          </ul>

          <h2 className="text-xl font-bold text-white pt-4 border-b border-white/5 pb-2">2. Processing of Resume Files</h2>
          <p>
            When candidates submit internship or candidate forms via our Careers page, all PDF resume files are securely stored inside our isolated Sanity.io database schema. We never distribute these files to third-party recruitment agencies.
          </p>

          <h2 className="text-xl font-bold text-white pt-4 border-b border-white/5 pb-2">3. Security of Data</h2>
          <p>
            The security of your personal data is critical to us. We implement modern cloud encryption standards (TLS/SSL) on all form dispatches. Since we operate custom server-side Next.js route APIs, your secret keys and credentials are never exposed to browser tracking networks.
          </p>

          <h2 className="text-xl font-bold text-white pt-4 border-b border-white/5 pb-2">4. Regional compliance (GDPR & Sri Lanka Data Protection Act)</h2>
          <p>
            Because we operate actively across London and Colombo, we adhere strictly to the General Data Protection Regulation (GDPR) in the UK and Europe, as well as the Sri Lanka Personal Data Protection Act No. 9 of 2022. You maintain the right to inspect, edit, or purge your records at any time by messaging our technical officers.
          </p>
        </div>
      </article>

      <Footer />
    </div>
  );
}
