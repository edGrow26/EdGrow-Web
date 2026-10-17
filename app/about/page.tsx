'use client';

import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, Award, Users, Compass, Shield, Zap, Globe, ArrowUpRight, ArrowRight } from 'lucide-react';
import Link from 'next/link';

import BackgroundWaves from '../../components/BackgroundWaves';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import ScrollAnimate from '../../components/ScrollAnimate';

const coreValues = [
  { icon: Shield, title: 'Absolute Data Security', desc: 'Every application we compile undergoes meticulous vulnerability assessments and implements rigorous encryption protocols.', accent: 'from-blue-500/20' },
  { icon: Zap, title: 'High Velocity Execution', desc: 'Our agile Sri Lanka-UK dual pipeline cuts project delivery cycle times by up to 40% compared to traditional onshore teams.', accent: 'from-amber-500/20' },
  { icon: Compass, title: 'Radical Transparency', desc: 'No complex contracts or surprise costs. We provide visible milestone models and interactive estimated calculators.', accent: 'from-emerald-500/20' },
  { icon: Award, title: 'Bespoke Craftsmanship', desc: 'We do not sell cookie-cutter setups. Every line of Next.js code is tailored exclusively to capture your search and user goals.', accent: 'from-violet-500/20' },
];

const timelineMilestones = [
  { year: '2018', title: 'Edgrow Technologies Inception', desc: 'Founded as a boutique full-stack consulting agency in Colombo, Sri Lanka, servicing regional retail portals.' },
  { year: '2020', title: 'UK Corporate Bridge Established', desc: 'Opened London client offices to offer secure regional account management, communication alignment, and local technical accountability.' },
  { year: '2022', title: 'Enterprise Scale', desc: 'Grown to 35+ full-time systems engineers, shipping cloud-native software and databases for multinational fintech portfolios.' },
  { year: '2025', title: 'Next-Gen Core Integration', desc: 'Fully integrated headless Sanity architectures and Google Gemini AI processing streams into our design paradigms.' },
];

export default function AboutPage() {
  return (
    <div className="relative min-h-screen bg-black text-white overflow-x-hidden">
      <BackgroundWaves />
      <Navbar />

      {/* ═══════════════════════════════════════════════════════════
          HERO — ABOUT
          ═══════════════════════════════════════════════════════════ */}
      <section className="relative pt-36 pb-24 md:pt-48 md:pb-32 z-10">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-gradient-radial from-primary/12 via-transparent to-transparent rounded-full blur-[120px] pointer-events-none" aria-hidden="true" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full bg-white/[0.04] border border-white/[0.08] text-[13px] text-white/70 font-medium tracking-wide mb-8 backdrop-blur-sm"
          >
            <Globe className="w-4 h-4 text-accent" aria-hidden="true" />
            <span>Colombo · London · Global</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl sm:text-6xl md:text-7xl font-black tracking-[-0.03em] leading-[0.95] mb-8"
          >
            Engineering the Future of{' '}
            <span className="bg-gradient-to-r from-white via-slate-100 to-white/60 bg-clip-text text-transparent">
              Offshore Development
            </span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-white/50 text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed font-light"
          >
            Edgrow Technologies bridges the gap between highly affordable, elite Sri Lanka systems engineering and local, transparent UK project management.
          </motion.p>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          MISSION — DOPPELRAND ASYMMETRIC LAYOUT
          ═══════════════════════════════════════════════════════════ */}
      <section className="py-28 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-[2rem] p-[1px] bg-gradient-to-b from-white/[0.12] via-white/[0.03] to-transparent ring-1 ring-white/[0.06]">
            <div className="rounded-[calc(2rem-1px)] bg-[#040812]/95 p-8 sm:p-14 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-[500px] h-[400px] bg-gradient-radial from-accent/10 via-transparent to-transparent rounded-full blur-[100px] pointer-events-none" aria-hidden="true" />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-14 items-center relative z-10">
                <ScrollAnimate variant="slideRight">
                  <div className="flex flex-col gap-6">
                    <span className="text-[11px] font-bold text-accent uppercase tracking-[0.2em]">Our Mandate</span>
                    <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight leading-tight">
                      To Accelerate Digital Growth with Custom-Engineered Clarity
                    </h2>
                    <p className="text-white/50 text-sm leading-relaxed">
                      At Edgrow Tech, we believe software development shouldn&apos;t feel like a black box. Our dual-shore architecture allows our clients to gain immediate access to brilliant frontend developers and deep-tier backend coders in Sri Lanka, completely backed by local accounts, timelines, and structures in the UK.
                    </p>
                    <div className="flex gap-6 py-2">
                      <span className="flex items-center gap-2 text-xs font-bold text-white/40">
                        <Shield className="w-4 h-4 text-accent" aria-hidden="true" /> ISO Compliant
                      </span>
                      <span className="flex items-center gap-2 text-xs font-bold text-white/40">
                        <Users className="w-4 h-4 text-mint" aria-hidden="true" /> Global Hubs
                      </span>
                    </div>
                  </div>
                </ScrollAnimate>

                <ScrollAnimate variant="slideLeft" delay={0.15}>
                  <div className="relative rounded-2xl overflow-hidden aspect-video border border-white/[0.08] shadow-2xl">
                    <img
                      src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800"
                      alt="Edgrow team brainstorming session"
                      crossOrigin="anonymous"
                      loading="lazy"
                      decoding="async"
                      width={800}
                      height={450}
                      className="w-full h-full object-cover filter brightness-90"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#040812] via-transparent to-transparent opacity-70" aria-hidden="true" />
                    {/* Floating location chip */}
                    <div className="absolute bottom-4 left-4 px-3 py-1.5 bg-black/70 backdrop-blur-md rounded-lg text-[10px] font-bold text-white/70 flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" aria-hidden="true" />
                      Colombo Engineering Hub
                    </div>
                  </div>
                </ScrollAnimate>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          CORE VALUES — BENTO GRID
          ═══════════════════════════════════════════════════════════ */}
      <section className="py-28 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollAnimate variant="fadeUp">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <span className="text-[11px] font-bold text-accent uppercase tracking-[0.2em] block mb-4">Core Pillars</span>
              <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">Our Operational Values</h2>
            </div>
          </ScrollAnimate>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {coreValues.map((val, idx) => {
              const Icon = val.icon;
              const variants: Array<'fadeUp' | 'slideRight' | 'scaleIn' | 'rotateIn'> = ['fadeUp', 'slideRight', 'scaleIn', 'rotateIn'];
              return (
                <ScrollAnimate key={idx} variant={variants[idx % variants.length]} delay={idx * 0.1}>
                  {/* Doppelrand mini card */}
                  <div className="rounded-[1.5rem] p-[1px] bg-gradient-to-b from-white/[0.10] via-white/[0.02] to-transparent ring-1 ring-white/[0.05] h-full">
                    <div className="rounded-[calc(1.5rem-1px)] bg-[#040812]/95 p-7 flex flex-col justify-between h-full relative overflow-hidden group hover:ring-1 hover:ring-white/[0.12] transition-all duration-300">
                      {/* Ambient glow */}
                      <div className={`absolute top-0 right-0 w-40 h-40 bg-gradient-radial ${val.accent} via-transparent to-transparent rounded-full blur-[60px] pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500`} aria-hidden="true" />

                      <div className="relative z-10">
                        <div className="w-11 h-11 bg-white/[0.05] border border-white/[0.08] rounded-xl flex items-center justify-center text-accent mb-6">
                          <Icon className="w-5 h-5" aria-hidden="true" />
                        </div>
                        <h3 className="text-base font-bold text-white mb-3">{val.title}</h3>
                        <p className="text-white/40 text-xs leading-relaxed">{val.desc}</p>
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
          TIMELINE — MILESTONES
          ═══════════════════════════════════════════════════════════ */}
      <section className="py-28 relative z-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollAnimate variant="fadeUp">
            <div className="text-center mb-16">
              <span className="text-[11px] font-bold text-mint uppercase tracking-[0.2em] block mb-4">Chronology</span>
              <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">The Edgrow Story Timeline</h2>
            </div>
          </ScrollAnimate>

          {/* Doppelrand timeline card */}
          <div className="rounded-[2rem] p-[1px] bg-gradient-to-b from-white/[0.12] via-white/[0.03] to-transparent ring-1 ring-white/[0.06]">
            <div className="rounded-[calc(2rem-1px)] bg-[#040812]/95 p-8 sm:p-12 relative overflow-hidden">
              <div className="absolute bottom-0 left-0 w-[400px] h-[300px] bg-gradient-radial from-mint/10 via-transparent to-transparent rounded-full blur-[100px] pointer-events-none" aria-hidden="true" />

              <div className="relative border-l border-white/[0.08] pl-8 ml-4 flex flex-col gap-14">
                {timelineMilestones.map((mil, idx) => (
                  <ScrollAnimate key={idx} variant="slideRight" delay={idx * 0.12}>
                    <div className="relative">
                      {/* Timeline node */}
                      <div className="absolute -left-[41px] top-1.5 w-6 h-6 rounded-full bg-[#040812] border-2 border-accent flex items-center justify-center">
                        <div className="w-2 h-2 rounded-full bg-accent animate-ping" aria-hidden="true" />
                      </div>
                      <div>
                        <span className="inline-block px-3 py-1 bg-accent/10 border border-accent/20 rounded-lg text-xs font-bold text-accent font-mono mb-2">{mil.year}</span>
                        <h3 className="text-lg font-bold text-white mb-2">{mil.title}</h3>
                        <p className="text-white/40 text-xs leading-relaxed max-w-xl">{mil.desc}</p>
                      </div>
                    </div>
                  </ScrollAnimate>
                ))}
              </div>
            </div>
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
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-gradient-radial from-primary/15 via-transparent to-transparent rounded-full blur-[100px] pointer-events-none" aria-hidden="true" />
              <Sparkles className="w-8 h-8 text-accent mx-auto mb-6" aria-hidden="true" />
              <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight mb-4">
                Want to Work With Us?
              </h2>
              <p className="text-white/45 text-sm max-w-lg mx-auto leading-relaxed mb-10">
                Whether you need a full product build or technical augmentation, our teams are ready to deliver enterprise-grade results.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link href="/contact" className="btn-premium-pill">
                  Get In Touch
                  <span className="btn-icon-wrapper">
                    <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
                  </span>
                </Link>
                <Link href="/team" className="btn-secondary-pill">
                  Meet the Team
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
