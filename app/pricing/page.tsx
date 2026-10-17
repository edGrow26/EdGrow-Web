'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Sparkles, CheckSquare, ArrowUpRight, ArrowRight, ShieldCheck, Zap } from 'lucide-react';
import Link from 'next/link';

import BackgroundWaves from '../../components/BackgroundWaves';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import ScrollAnimate from '../../components/ScrollAnimate';
import InteractiveCostCalculator from '../../components/InteractiveCostCalculator';
import { sanityClient, PricingPlan } from '../../lib/sanity';

export default function PricingPage() {
  const [plans, setPlans] = useState<PricingPlan[]>([]);

  useEffect(() => {
    const fetchPlans = async () => {
      const data = await sanityClient.getPricingPlans();
      setPlans(data);
    };
    fetchPlans();
  }, []);

  return (
    <div className="relative min-h-screen bg-black text-white overflow-x-hidden">
      <BackgroundWaves />
      <Navbar />

      {/* ═══════════════════════════════════════════════════════════
          HERO — PRICING COMMAND CENTER
          ═══════════════════════════════════════════════════════════ */}
      <section className="relative pt-36 pb-20 md:pt-48 md:pb-28 z-10">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-gradient-radial from-primary/15 via-transparent to-transparent rounded-full blur-[120px] pointer-events-none" aria-hidden="true" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full bg-white/[0.04] border border-white/[0.08] text-[13px] text-white/70 font-medium tracking-wide mb-8 backdrop-blur-sm"
          >
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse" aria-hidden="true" />
            <span>Fully Transparent Milestone Cost Models</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl sm:text-6xl md:text-7xl font-black tracking-[-0.03em] leading-[0.95] mb-8"
          >
            Transparent & Scalable{' '}
            <span className="bg-gradient-to-r from-white via-slate-100 to-white/60 bg-clip-text text-transparent">
              Project Pricing
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-white/50 text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed font-light mb-12"
          >
            Select a structured milestone package or configure our interactive budget calculator below to map exact engineering ranges.
          </motion.p>

          {/* Metric Rail */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="inline-flex items-center gap-8 sm:gap-14 px-8 py-4 rounded-2xl bg-white/[0.03] border border-white/[0.06]"
          >
            {[
              { val: 'Fixed-Price', label: 'Milestone Delivery' },
              { val: '0%', label: 'Hidden Surprise Fees' },
              { val: '100%', label: 'IP & Code Ownership' },
            ].map((s) => (
              <div key={s.label} className="text-center">
                <span className="block text-2xl sm:text-3xl font-black text-white font-mono tracking-tight">{s.val}</span>
                <span className="block text-[11px] text-white/40 font-medium uppercase tracking-widest mt-1">{s.label}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          PRICING CARDS GRID — DOPPELRAND ARCHITECTURE
          ═══════════════════════════════════════════════════════════ */}
      <section className="pb-36 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch mb-32">
            {plans.map((plan, idx) => {
              const isPopular = plan.isPopular;
              return (
                <ScrollAnimate key={plan.id} variant="scaleIn" delay={idx * 0.1}>
                  <div
                    className={`h-full rounded-[2.25rem] p-[1px] transition-all duration-500 ring-1 ${
                      isPopular
                        ? 'bg-gradient-to-b from-white/30 via-accent/20 to-transparent ring-white/20 shadow-[0_0_40px_rgba(255,255,255,0.06)]'
                        : 'bg-gradient-to-b from-white/[0.12] via-white/[0.03] to-transparent ring-white/[0.06] hover:from-white/[0.2]'
                    }`}
                  >
                    <div className="h-full rounded-[calc(2.25rem-1px)] bg-[#040812]/95 p-8 sm:p-10 relative overflow-hidden flex flex-col justify-between backdrop-blur-xl">
                      {/* Ambient card glow */}
                      {isPopular && (
                        <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-radial from-accent/15 via-transparent to-transparent rounded-full blur-[80px] pointer-events-none" aria-hidden="true" />
                      )}

                      {/* Top content */}
                      <div>
                        {/* Header tag */}
                        <div className="flex items-center justify-between mb-4">
                          <span className="text-[10px] font-mono font-bold tracking-widest uppercase text-white/40">
                            Tier 0{idx + 1}
                          </span>
                          {isPopular && (
                            <span className="px-3 py-1 rounded-full bg-white text-black font-mono font-bold text-[10px] uppercase tracking-wider shadow-[0_0_15px_rgba(255,255,255,0.4)]">
                              Most Popular
                            </span>
                          )}
                        </div>

                        <h3 className="text-2xl font-black text-white tracking-tight mb-2">{plan.name}</h3>
                        <p className="text-white/50 text-xs sm:text-sm leading-relaxed mb-8 font-light min-h-[40px]">
                          {plan.description}
                        </p>

                        {/* Price readout */}
                        <div className="flex items-baseline gap-2 mb-8 pb-6 border-b border-white/[0.06]">
                          <span className="text-4xl sm:text-5xl font-black text-white font-mono tracking-tight">{plan.price}</span>
                          <span className="text-white/40 text-xs font-mono">{plan.period}</span>
                        </div>

                        {/* Deliverables list */}
                        <div className="mb-10">
                          <span className="text-[10px] font-mono font-bold text-white/40 uppercase tracking-[0.2em] block mb-4">
                            Included Capabilities
                          </span>
                          <ul className="flex flex-col gap-3.5">
                            {plan.features.map((feat, i) => (
                              <li key={i} className="flex items-start gap-3 text-xs sm:text-sm text-white/70 leading-normal">
                                <CheckSquare className="w-4 h-4 text-accent shrink-0 mt-0.5" aria-hidden="true" />
                                <span>{feat}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      {/* Action button */}
                      <div className="pt-6 border-t border-white/[0.06] mt-auto">
                        {isPopular ? (
                          <Link
                            href={`/contact?subject=Plan Inquiry: ${plan.name}&plan=${plan.id}`}
                            className="btn-premium-pill w-full text-center !py-3.5 !text-xs"
                          >
                            Initiate Milestone
                            <span className="btn-icon-wrapper">
                              <ArrowUpRight className="w-4 h-4" />
                            </span>
                          </Link>
                        ) : (
                          <Link
                            href={`/contact?subject=Plan Inquiry: ${plan.name}&plan=${plan.id}`}
                            className="btn-secondary-pill w-full text-center !py-3.5 !text-xs inline-flex items-center justify-center gap-1.5"
                          >
                            Initiate Milestone
                            <span className="btn-icon-wrapper">
                              <ArrowRight className="w-3.5 h-3.5" />
                            </span>
                          </Link>
                        )}
                      </div>

                    </div>
                  </div>
                </ScrollAnimate>
              );
            })}
          </div>

          {/* Embedded Interactive Cost Calculator */}
          <div className="pt-10">
            <InteractiveCostCalculator />
          </div>

        </div>
      </section>

      <Footer />
    </div>
  );
}
