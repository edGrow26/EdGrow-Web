'use client';

import React, { useState, useEffect } from 'react';
import { Sparkles, Calculator, CheckCircle2 } from 'lucide-react';

interface FeatureOption {
  id: string;
  label: string;
  description: string;
  price: number;
}

const FEATURE_OPTIONS: FeatureOption[] = [
  { id: 'cms', label: 'Sanity Headless CMS', description: 'Enable team editors to modify pages instantly.', price: 600 },
  { id: 'api', label: 'Custom API Gateway', description: 'Microservices architecture for secure user authentication.', price: 1200 },
  { id: 'payment', label: 'Payment Integration', description: 'Stripe, PayPal, or localized merchant integration.', price: 800 },
  { id: 'seo', label: 'Pro Semantic SEO Suite', description: 'Advanced search ranking indexing structures & metadata packages.', price: 500 },
  { id: 'cloud', label: 'AWS Cloud DevOps Server', description: 'Highly available server clustering with auto-scaling triggers.', price: 1500 },
];

export default function InteractiveCostCalculator() {
  // Form States
  const [projectType, setProjectType] = useState<'web' | 'software' | 'ecommerce'>('web');
  const [pageCount, setPageCount] = useState<number>(5);
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>(['cms', 'seo']);
  const [timelineWeeks, setTimelineWeeks] = useState<number>(6);
  
  // Computed Price Range
  const [priceRange, setPriceRange] = useState({ min: 0, max: 0 });

  useEffect(() => {
    // Base Rates
    let basePrice = 1200;
    if (projectType === 'software') basePrice = 2500;
    if (projectType === 'ecommerce') basePrice = 1800;

    // Page Surcharges
    const pageCost = pageCount * 120;

    // Feature Accumulation
    const featuresCost = FEATURE_OPTIONS
      .filter((feat) => selectedFeatures.includes(feat.id))
      .reduce((sum, feat) => sum + feat.price, 0);

    // Speed Premium (lower timeline = slightly more expensive because of developer overhead)
    let timelineMultiplier = 1.0;
    if (timelineWeeks <= 3) timelineMultiplier = 1.25;
    if (timelineWeeks >= 8) timelineMultiplier = 0.9;

    const totalCalculated = Math.round((basePrice + pageCost + featuresCost) * timelineMultiplier);

    // Provide a neat realistic range
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
    <div id="cost-calculator-widget" className="glass-panel p-6 sm:p-10 rounded-3xl border border-white/10 relative overflow-hidden">
      {/* Background radial highlight */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-accent/5 rounded-full filter blur-[100px] pointer-events-none" />
      
      {/* Header section */}
      <div className="flex items-center justify-between border-b border-white/5 pb-6 mb-8">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-gradient-to-br from-primary to-accent rounded-2xl text-white">
            <Calculator className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-xl font-extrabold text-white">Edgrow Cost Calculator</h3>
            <p className="text-xs text-gray-400">Estimate your web software solution budget instantly.</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        
        {/* Form Controls */}
        <div className="flex flex-col gap-6">
          
          {/* 1. Project Paradigm Selection */}
          <div>
            <label className="text-xs font-bold text-gray-300 uppercase tracking-widest block mb-3">
              Project Architecture
            </label>
            <div className="grid grid-cols-3 gap-3">
              {[
                { id: 'web', label: 'Web Portal', desc: 'Custom SaaS / Sites' },
                { id: 'ecommerce', label: 'E-Commerce', desc: 'Stores & Gateways' },
                { id: 'software', label: 'Enterprise', desc: 'Custom Systems' },
              ].map((type) => (
                <button
                  key={type.id}
                  type="button"
                  onClick={() => setProjectType(type.id as any)}
                  className={`p-3 rounded-xl border text-center transition-all flex flex-col gap-1 items-center justify-center cursor-pointer ${
                    projectType === type.id
                      ? 'bg-primary/20 border-accent text-white shadow-lg shadow-primary/10'
                      : 'bg-white/5 border-white/5 text-gray-400 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  <span className="text-xs font-bold">{type.label}</span>
                  <span className="text-[10px] opacity-60 leading-tight">{type.desc}</span>
                </button>
              ))}
            </div>
          </div>

          {/* 2. Page Count Slider */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-xs font-bold text-gray-300 uppercase tracking-widest">
                Estimated Pages / Views
              </label>
              <span className="text-sm font-extrabold text-accent bg-accent/10 px-2 py-0.5 rounded-md">
                {pageCount} Views
              </span>
            </div>
            <input
              type="range"
              min="1"
              max="30"
              value={pageCount}
              onChange={(e) => setPageCount(parseInt(e.target.value))}
              className="w-full accent-accent bg-white/10 rounded-lg appearance-none h-2 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-gray-500 mt-1 font-mono">
              <span>1 (Landing)</span>
              <span>15 (Medium)</span>
              <span>30 (Enterprise Portal)</span>
            </div>
          </div>

          {/* 3. Timeline slider */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-xs font-bold text-gray-300 uppercase tracking-widest">
                Required Timeline
              </label>
              <span className="text-sm font-extrabold text-mint bg-mint/10 px-2 py-0.5 rounded-md">
                {timelineWeeks} Weeks
              </span>
            </div>
            <input
              type="range"
              min="2"
              max="16"
              value={timelineWeeks}
              onChange={(e) => setTimelineWeeks(parseInt(e.target.value))}
              className="w-full accent-mint bg-white/10 rounded-lg appearance-none h-2 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-gray-500 mt-1 font-mono">
              <span>2 Weeks (Accelerated)</span>
              <span>8 Weeks (Standard)</span>
              <span>16 Weeks (Complex Project)</span>
            </div>
          </div>

          {/* 4. Feature Selection Checkboxes */}
          <div>
            <label className="text-xs font-bold text-gray-300 uppercase tracking-widest block mb-3">
              Add-on Capabilities
            </label>
            <div className="flex flex-col gap-2">
              {FEATURE_OPTIONS.map((feat) => {
                const isSelected = selectedFeatures.includes(feat.id);
                return (
                  <button
                    key={feat.id}
                    type="button"
                    onClick={() => handleFeatureToggle(feat.id)}
                    className={`p-3 rounded-xl border text-left flex items-start gap-3 transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-white/5 border-accent text-white'
                        : 'bg-transparent border-white/5 text-gray-400 hover:bg-white/5'
                    }`}
                  >
                    <div className={`w-5 h-5 rounded-md border flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                      isSelected ? 'bg-accent border-accent text-black' : 'border-white/20 text-transparent'
                    }`}>
                      <CheckCircle2 className="w-3.5 h-3.5 fill-current" />
                    </div>
                    <div>
                      <span className="text-xs font-bold block text-white">{feat.label}</span>
                      <span className="text-[11px] text-gray-400 leading-tight block">{feat.description}</span>
                    </div>
                    <span className="ml-auto text-xs font-mono text-accent font-bold">
                      +${feat.price}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

        </div>

        {/* Instant Output Display Card */}
        <div className="flex flex-col justify-between bg-white/[0.02] border border-white/5 rounded-2xl p-6 sm:p-8 relative">
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full filter blur-2xl pointer-events-none" />
          
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2 text-accent text-xs font-bold uppercase tracking-widest">
              <Sparkles className="w-4 h-4 text-accent" /> Custom Estimate Output
            </div>
            
            <div className="py-6 border-y border-white/5 my-2">
              <span className="text-gray-400 text-xs block mb-1">Projected Cost Range:</span>
              <div className="flex items-baseline gap-2">
                <span className="text-4xl sm:text-5xl font-black text-white tracking-tight font-mono">
                  ${priceRange.min.toLocaleString()}
                </span>
                <span className="text-gray-500 font-medium">to</span>
                <span className="text-3xl sm:text-4xl font-extrabold text-accent/90 font-mono">
                  ${priceRange.max.toLocaleString()}
                </span>
              </div>
              <span className="text-[10px] text-gray-500 block mt-2">
                *Estimates are calculated using standard Sri Lanka development hourly rates with premium UK management guidelines.
              </span>
            </div>

            <div className="flex flex-col gap-3">
              <h5 className="text-xs font-bold text-gray-300 uppercase tracking-wider">Estimate Summary:</h5>
              <ul className="flex flex-col gap-2 text-xs text-gray-400">
                <li className="flex justify-between">
                  <span>Architecture Type:</span>
                  <span className="text-white font-medium capitalize">{projectType}</span>
                </li>
                <li className="flex justify-between">
                  <span>Page Layouts:</span>
                  <span className="text-white font-medium">{pageCount} Views</span>
                </li>
                <li className="flex justify-between">
                  <span>Delivery Schedule:</span>
                  <span className="text-white font-medium">{timelineWeeks} Weeks</span>
                </li>
                <li className="flex justify-between">
                  <span>Selected Integration Features:</span>
                  <span className="text-white font-medium">{selectedFeatures.length} Added</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-8">
            <a
              href={`/contact?subject=Calculator Estimate: ${projectType.toUpperCase()} - ${priceRange.min}-${priceRange.max}&type=${projectType}&pages=${pageCount}&timeline=${timelineWeeks}`}
              className="w-full py-4 text-center text-sm font-bold text-black bg-gradient-to-r from-accent via-mint to-accent bg-[size:200%] hover:bg-[100%] rounded-xl shadow-lg hover:shadow-accent/20 hover:scale-[1.01] active:scale-[0.99] transition-all duration-300 flex items-center justify-center gap-2"
            >
              Lock In Quote & Consultant Kickoff
            </a>
          </div>

        </div>

      </div>
    </div>
  );
}
