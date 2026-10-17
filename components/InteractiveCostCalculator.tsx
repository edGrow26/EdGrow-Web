'use client';

import React, { useState, useEffect } from 'react';
import { Sparkles, Calculator, CheckSquare, ArrowRight, ArrowUpRight, Zap } from 'lucide-react';
import Link from 'next/link';

interface FeatureOption {
  id: string;
  label: string;
  description: string;
  price: number;
}

const FEATURE_OPTIONS: FeatureOption[] = [
  { id: 'cms', label: 'Sanity Headless CMS', description: 'Enable team editors to modify pages instantly.', price: 600 },
  { id: 'api', label: 'Custom API Gateway', description: 'Microservices architecture for secure user authentication.', price: 1200 },
  { id: 'payment', label: 'Payment Gateway Integration', description: 'Stripe, PayPal, or localized merchant integration.', price: 800 },
  { id: 'seo', label: 'Pro Semantic SEO Suite', description: 'Advanced search ranking indexing structures & metadata packages.', price: 500 },
  { id: 'cloud', label: 'AWS Cloud DevOps Server', description: 'Highly available server clustering with auto-scaling triggers.', price: 1500 },
];

export default function InteractiveCostCalculator() {
  const [projectType, setProjectType] = useState<'web' | 'software' | 'ecommerce'>('web');
  const [pageCount, setPageCount] = useState<number>(5);
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>(['cms', 'seo']);
  const [timelineWeeks, setTimelineWeeks] = useState<number>(6);
  
  const [priceRange, setPriceRange] = useState({ min: 0, max: 0 });

  useEffect(() => {
    let basePrice = 1200;
    if (projectType === 'software') basePrice = 2500;
    if (projectType === 'ecommerce') basePrice = 1800;

    const pageCost = pageCount * 120;

    const featuresCost = FEATURE_OPTIONS
      .filter((feat) => selectedFeatures.includes(feat.id))
      .reduce((sum, feat) => sum + feat.price, 0);

    let timelineMultiplier = 1.0;
    if (timelineWeeks <= 3) timelineMultiplier = 1.25;
    if (timelineWeeks >= 8) timelineMultiplier = 0.9;

    const totalCalculated = Math.round((basePrice + pageCost + featuresCost) * timelineMultiplier);

    setPriceRange({
      min: Math.round(totalCalculated * 0.95),
      max: Math.round(totalCalculated * 1.10),
    });
  }, [projectType, pageCount, selectedFeatures, timelineWeeks]);

  const handleFeatureToggle = (id: string) => {
    setSelectedFeatures((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <div id="cost-calculator-widget" className="rounded-[2.5rem] p-[1px] bg-gradient-to-b from-white/[0.14] via-white/[0.04] to-transparent ring-1 ring-white/[0.08]">
      <div className="rounded-[calc(2.5rem-1px)] bg-[#040812]/95 p-8 sm:p-14 relative overflow-hidden backdrop-blur-xl">
        {/* Ambient radial glow */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-radial from-accent/10 via-transparent to-transparent rounded-full blur-[100px] pointer-events-none" aria-hidden="true" />

        {/* Header section */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-white/[0.06] pb-8 mb-10 gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-accent">
              <Calculator className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">Interactive Cost & Architecture Estimator</h3>
              <p className="text-xs sm:text-sm text-white/50 font-light mt-0.5">Customize your deliverables to estimate an instantaneous budget scope.</p>
            </div>
          </div>

          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.08] text-xs font-mono text-white/60">
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            <span>Telemetry v2.6 Ready</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Form Controls */}
          <div className="lg:col-span-7 flex flex-col gap-8">
            
            {/* 1. Project Paradigm Selection */}
            <div>
              <label className="text-[10px] font-mono font-bold text-white/40 uppercase tracking-[0.2em] block mb-3">
                01 / Project Architecture
              </label>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { id: 'web', label: 'Web Portal', desc: 'Custom SaaS / Sites' },
                  { id: 'ecommerce', label: 'E-Commerce', desc: 'Stores & Gateways' },
                  { id: 'software', label: 'Enterprise', desc: 'Custom Systems' },
                ].map((type) => {
                  const isActive = projectType === type.id;
                  return (
                    <button
                      key={type.id}
                      type="button"
                      onClick={() => setProjectType(type.id as typeof projectType)}
                      className={`p-4 rounded-xl border text-left transition-all cursor-pointer ${
                        isActive
                          ? 'bg-white text-black border-white shadow-[0_0_20px_rgba(255,255,255,0.3)]'
                          : 'bg-white/[0.02] border-white/[0.08] text-white/70 hover:border-white/20'
                      }`}
                    >
                      <span className="block text-xs font-bold">{type.label}</span>
                      <span className={`block text-[10px] mt-1 ${isActive ? 'text-black/60' : 'text-white/40'}`}>
                        {type.desc}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 2. Page & Screen Count Slider */}
            <div>
              <div className="flex justify-between items-center mb-3">
                <label className="text-[10px] font-mono font-bold text-white/40 uppercase tracking-[0.2em]">
                  02 / Target Page / Screen Count
                </label>
                <span className="text-sm font-mono font-bold text-white">{pageCount} Pages</span>
              </div>
              <input
                type="range"
                min="1"
                max="25"
                value={pageCount}
                onChange={(e) => setPageCount(Number(e.target.value))}
                className="w-full accent-white bg-white/[0.08] rounded-lg h-2 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] font-mono text-white/30 mt-2">
                <span>1 Page Landing</span>
                <span>12 Pages Standard</span>
                <span>25+ Enterprise</span>
              </div>
            </div>

            {/* 3. Delivery Timeline Weeks */}
            <div>
              <div className="flex justify-between items-center mb-3">
                <label className="text-[10px] font-mono font-bold text-white/40 uppercase tracking-[0.2em]">
                  03 / Delivery Cadence & Velocity
                </label>
                <span className="text-sm font-mono font-bold text-white">{timelineWeeks} Weeks</span>
              </div>
              <input
                type="range"
                min="2"
                max="12"
                value={timelineWeeks}
                onChange={(e) => setTimelineWeeks(Number(e.target.value))}
                className="w-full accent-white bg-white/[0.08] rounded-lg h-2 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] font-mono text-white/30 mt-2">
                <span>2 Weeks (Sprint)</span>
                <span>6 Weeks (Standard)</span>
                <span>12 Weeks (Phased)</span>
              </div>
            </div>

            {/* 4. Modular Add-ons */}
            <div>
              <label className="text-[10px] font-mono font-bold text-white/40 uppercase tracking-[0.2em] block mb-3">
                04 / Architectural Modules & Features
              </label>
              <div className="flex flex-col gap-2.5">
                {FEATURE_OPTIONS.map((feat) => {
                  const isChecked = selectedFeatures.includes(feat.id);
                  return (
                    <button
                      key={feat.id}
                      type="button"
                      onClick={() => handleFeatureToggle(feat.id)}
                      className={`p-3.5 rounded-xl border text-left flex items-center justify-between transition-all cursor-pointer ${
                        isChecked
                          ? 'bg-white/[0.06] border-white/30 text-white'
                          : 'bg-white/[0.01] border-white/[0.06] text-white/50 hover:border-white/10'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <CheckSquare className={`w-4 h-4 ${isChecked ? 'text-accent' : 'text-white/20'}`} />
                        <div>
                          <span className="text-xs font-bold block text-white/90">{feat.label}</span>
                          <span className="text-[11px] text-white/40 block font-light">{feat.description}</span>
                        </div>
                      </div>
                      <span className="text-xs font-mono font-bold text-white/70">+£{feat.price}</span>
                    </button>
                  );
                })}
              </div>
            </div>

          </div>

          {/* Right Column: Instantaneous Scope Output */}
          <div className="lg:col-span-5">
            <div className="rounded-[2rem] p-[1px] bg-gradient-to-b from-white/[0.16] via-white/[0.04] to-transparent ring-1 ring-white/[0.08]">
              <div className="rounded-[calc(2rem-1px)] bg-black/60 p-8 sm:p-10 relative overflow-hidden flex flex-col justify-between">
                <div>
                  <span className="text-[10px] font-mono font-bold text-accent uppercase tracking-[0.2em] block mb-2">
                    Estimated Budget Scope
                  </span>
                  <div className="flex items-baseline gap-2 mb-2">
                    <span className="text-4xl sm:text-5xl font-black font-mono text-white tracking-tight">
                      £{priceRange.min.toLocaleString()}
                    </span>
                    <span className="text-white/40 text-lg font-mono">–</span>
                    <span className="text-3xl sm:text-4xl font-black font-mono text-white/80 tracking-tight">
                      £{priceRange.max.toLocaleString()}
                    </span>
                  </div>
                  <span className="text-[11px] text-white/40 font-mono block mb-8">Estimated delivery: {timelineWeeks} weeks</span>

                  <div className="h-[1px] bg-white/[0.06] mb-6" />

                  <div className="flex flex-col gap-3 text-xs text-white/60 font-light mb-8">
                    <div className="flex justify-between">
                      <span>Architecture Mode:</span>
                      <strong className="text-white font-mono uppercase">{projectType}</strong>
                    </div>
                    <div className="flex justify-between">
                      <span>Target Screens:</span>
                      <strong className="text-white font-mono">{pageCount} Views</strong>
                    </div>
                    <div className="flex justify-between">
                      <span>Selected Modules:</span>
                      <strong className="text-white font-mono">{selectedFeatures.length} Integrated</strong>
                    </div>
                    <div className="flex justify-between">
                      <span>Dual-Region Guarantee:</span>
                      <strong className="text-accent font-mono">Included</strong>
                    </div>
                  </div>
                </div>

                <Link
                  href={`/contact?subject=Calculator Estimate: £${priceRange.min}-£${priceRange.max} (${projectType})`}
                  className="btn-premium-pill w-full text-center !py-3.5 !text-xs"
                >
                  Book Free Architecture Review
                  <span className="btn-icon-wrapper">
                    <ArrowUpRight className="w-4 h-4" />
                  </span>
                </Link>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
