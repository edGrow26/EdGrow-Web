'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'motion/react';
import { Code, Cpu, ShoppingBag, Layers, TrendingUp, Cloud, CheckSquare, Sparkles, ArrowRight, ArrowUpRight, Zap } from 'lucide-react';

import BackgroundWaves from './BackgroundWaves';
import Navbar from './Navbar';
import Footer from './Footer';
import ScrollAnimate from './ScrollAnimate';
import type { Service } from '../lib/sanity';

const serviceIcons = {
  code: Code,
  cpu: Cpu,
  'shopping-bag': ShoppingBag,
  layers: Layers,
  'trending-up': TrendingUp,
  cloud: Cloud,
} as const;

/* Accent color per card index for visual variety */
const cardAccents = [
  { from: 'from-blue-500/20', dot: 'bg-blue-400' },
  { from: 'from-emerald-500/20', dot: 'bg-emerald-400' },
  { from: 'from-violet-500/20', dot: 'bg-violet-400' },
  { from: 'from-amber-500/20', dot: 'bg-amber-400' },
  { from: 'from-rose-500/20', dot: 'bg-rose-400' },
  { from: 'from-cyan-500/20', dot: 'bg-cyan-400' },
];

export default function ServicesPageClient({ services }: { services: Service[] }) {
  return (
    <div className="relative min-h-screen bg-black text-white overflow-x-hidden">
      <BackgroundWaves />
      <Navbar />

      {/* ═══════════════════════════════════════════════════════════
          HERO — SERVICES COMMAND CENTER
          ═══════════════════════════════════════════════════════════ */}
      <section className="relative pt-36 pb-24 md:pt-48 md:pb-32 z-10">
        {/* Ambient hero glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-gradient-radial from-primary/15 via-transparent to-transparent rounded-full blur-[120px] pointer-events-none" aria-hidden="true" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full bg-white/[0.04] border border-white/[0.08] text-[13px] text-white/70 font-medium tracking-wide mb-8 backdrop-blur-sm"
            >
              <span className="w-2 h-2 rounded-full bg-accent animate-pulse" aria-hidden="true" />
              <span>Enterprise-Grade Engineering Solutions</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-5xl sm:text-6xl md:text-7xl font-black tracking-[-0.03em] leading-[0.95] mb-8"
            >
              Our Products &{' '}
              <span className="bg-gradient-to-r from-white via-slate-100 to-white/60 bg-clip-text text-transparent">
                Technical Services
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-white/50 text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed font-light mb-12"
            >
              We deliver state-of-the-art software systems and custom Next.js web solutions designed with modularity, scalability, and absolute security in mind.
            </motion.p>

            {/* Stat rail */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.35 }}
              className="inline-flex items-center gap-8 sm:gap-12 px-8 py-4 rounded-2xl bg-white/[0.03] border border-white/[0.06]"
            >
              {[
                { val: '6+', label: 'Service Verticals' },
                { val: '100+', label: 'Projects Shipped' },
                { val: '99.9%', label: 'Uptime SLA' },
              ].map((s) => (
                <div key={s.label} className="text-center">
                  <span className="block text-2xl sm:text-3xl font-black text-white font-mono tracking-tight">{s.val}</span>
                  <span className="block text-[11px] text-white/40 font-medium uppercase tracking-widest mt-1">{s.label}</span>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          SERVICES — DOPPELRAND CARD GRID
          ═══════════════════════════════════════════════════════════ */}
      <section className="pb-36 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-20">
            {services.map((service, index) => {
              const iconName = service.icon as keyof typeof serviceIcons;
              const IconComponent = serviceIcons[iconName] || Cloud;
              const isEven = index % 2 === 0;
              const slideVariant = isEven ? 'slideRight' : 'slideLeft';
              const accent = cardAccents[index % cardAccents.length];

              return (
                <ScrollAnimate key={service.id} variant={slideVariant} delay={index * 0.05}>
                  {/* Doppelrand outer shell */}
                  <div
                    id={service.id}
                    className="scroll-mt-24 rounded-[2rem] p-[1px] bg-gradient-to-b from-white/[0.12] via-white/[0.03] to-transparent ring-1 ring-white/[0.06]"
                  >
                    {/* Inner core card */}
                    <div className={`rounded-[calc(2rem-1px)] bg-[#040812]/95 p-8 sm:p-12 relative overflow-hidden flex flex-col lg:flex-row gap-12 items-stretch ${
                      isEven ? '' : 'lg:flex-row-reverse'
                    }`}>
                      {/* Ambient per-card glow */}
                      <div className={`absolute ${isEven ? 'top-0 right-0' : 'top-0 left-0'} w-96 h-96 bg-gradient-radial ${accent.from} via-transparent to-transparent rounded-full blur-[100px] pointer-events-none opacity-60`} aria-hidden="true" />

                      {/* Service Index Badge */}
                      <div className="absolute top-6 right-6 w-10 h-10 rounded-xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center">
                        <span className="text-xs font-mono font-bold text-white/30">0{index + 1}</span>
                      </div>

                      {/* Left: Icon & Details */}
                      <div className="flex-1 flex flex-col justify-between relative z-10">
                        <div>
                          <div className="w-14 h-14 rounded-2xl bg-white/[0.06] border border-white/[0.08] flex items-center justify-center text-accent mb-8">
                            <IconComponent className="w-7 h-7" aria-hidden="true" />
                          </div>

                          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight mb-4">
                            {service.title}
                          </h2>

                          <p className="text-white/50 text-sm sm:text-base leading-relaxed mb-8">
                            {service.detailedDescription}
                          </p>
                        </div>

                        <div className="mt-auto">
                          <h4 className="text-[11px] font-bold text-white/30 uppercase tracking-[0.2em] mb-4">Core Tech Stack</h4>
                          <div className="flex flex-wrap gap-2">
                            {service.technologies.map((tech) => (
                              <span
                                key={tech}
                                className="px-3 py-1.5 bg-white/[0.04] border border-white/[0.08] rounded-lg text-xs font-semibold text-white/60"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Vertical Divider */}
                      <div className="hidden lg:block w-[1px] bg-gradient-to-b from-transparent via-white/[0.08] to-transparent self-stretch" aria-hidden="true" />

                      {/* Right: Key Deliverables */}
                      <div className="flex-1 flex flex-col justify-between relative z-10">
                        <div>
                          <h3 className="text-[11px] font-bold text-accent uppercase tracking-[0.2em] mb-6 flex items-center gap-2">
                            <Zap className="w-3.5 h-3.5" aria-hidden="true" />
                            Key Deliverables
                          </h3>
                          <ul className="flex flex-col gap-4">
                            {service.features.map((feat) => (
                              <li key={feat} className="flex items-start gap-3.5 text-sm text-white/60 leading-normal">
                                <CheckSquare className="w-5 h-5 text-accent shrink-0 mt-0.5" aria-hidden="true" />
                                <span>{feat}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div className="mt-10 lg:mt-auto pt-8 border-t border-white/[0.06] flex flex-col sm:flex-row items-center gap-4">
                          <Link
                            href={`/pricing?service=${service.id}`}
                            className="btn-premium-pill w-full sm:w-auto !px-6 !py-3 !text-xs text-center"
                          >
                            Check Estimate Pricing
                            <span className="btn-icon-wrapper">
                              <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
                            </span>
                          </Link>
                          <Link
                            href={`/contact?subject=Service Inquiry: ${service.title}`}
                            className="btn-secondary-pill w-full sm:w-auto !px-6 !py-3 !text-xs text-center inline-flex items-center justify-center gap-1.5 group"
                          >
                            Contact Consultant
                            <span className="btn-icon-wrapper">
                              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" aria-hidden="true" />
                            </span>
                          </Link>
                        </div>
                      </div>

                    </div>
                  </div>
                </ScrollAnimate>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          CTA — COMMAND CENTER
          ═══════════════════════════════════════════════════════════ */}
      <section className="py-32 relative z-10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-[2rem] p-[1px] bg-gradient-to-b from-white/[0.12] via-white/[0.03] to-transparent ring-1 ring-white/[0.06]">
            <div className="rounded-[calc(2rem-1px)] bg-[#040812]/95 py-20 px-8 sm:px-16 text-center relative overflow-hidden">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-gradient-radial from-accent/15 via-transparent to-transparent rounded-full blur-[100px] pointer-events-none" aria-hidden="true" />
              <Sparkles className="w-8 h-8 text-accent mx-auto mb-6" aria-hidden="true" />
              <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight mb-4">
                Ready to Build Something Exceptional?
              </h2>
              <p className="text-white/45 text-sm max-w-lg mx-auto leading-relaxed mb-10">
                Our dual-shore engineering teams in Colombo &amp; London are ready to architect your next high-performance system from zero to production.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link href="/contact" className="btn-premium-pill">
                  Start a Project
                  <span className="btn-icon-wrapper">
                    <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
                  </span>
                </Link>
                <Link href="/portfolio" className="btn-secondary-pill">
                  View Portfolio
                  <span className="btn-icon-wrapper">
                    <ArrowRight className="w-4 h-4" aria-hidden="true" />
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
