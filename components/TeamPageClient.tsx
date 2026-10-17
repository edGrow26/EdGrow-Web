'use client';

import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, Github, Code, ArrowUpRight, ArrowRight, ShieldCheck, Cpu } from 'lucide-react';
import Link from 'next/link';

import BackgroundWaves from './BackgroundWaves';
import Navbar from './Navbar';
import Footer from './Footer';
import ScrollAnimate from './ScrollAnimate';
import type { TeamMember } from '../lib/sanity';

const memberAccents = [
  { from: 'from-blue-500/20', dot: 'bg-blue-400' },
  { from: 'from-emerald-500/20', dot: 'bg-emerald-400' },
  { from: 'from-violet-500/20', dot: 'bg-violet-400' },
  { from: 'from-amber-500/20', dot: 'bg-amber-400' },
  { from: 'from-rose-500/20', dot: 'bg-rose-400' },
  { from: 'from-cyan-500/20', dot: 'bg-cyan-400' },
];

export default function TeamPageClient({ team }: { team: TeamMember[] }) {
  return (
    <div className="relative min-h-screen bg-black text-white overflow-x-hidden">
      <BackgroundWaves />
      <Navbar />

      {/* ═══════════════════════════════════════════════════════════
          HERO — TEAM COMMAND CENTER
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
            <span>Passionate Coders & Distributed Systems Designers</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl sm:text-6xl md:text-7xl font-black tracking-[-0.03em] leading-[0.95] mb-8"
          >
            Meet Our Elite{' '}
            <span className="bg-gradient-to-r from-white via-slate-100 to-white/60 bg-clip-text text-transparent">
              Systems Engineers
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-white/50 text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed font-light mb-12"
          >
            Our engineers combine deep academic knowledge in data science, software architecture, and Core Web Vitals to deliver robust, high-performance systems.
          </motion.p>

          {/* Metric Rail */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="inline-flex items-center gap-8 sm:gap-14 px-8 py-4 rounded-2xl bg-white/[0.03] border border-white/[0.06]"
          >
            {[
              { val: '35+', label: 'Systems Engineers' },
              { val: '2', label: 'Global Hubs (UK & LK)' },
              { val: '100%', label: 'In-House Core Staff' },
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
          TEAM GRID — DOPPELRAND CARDS
          ═══════════════════════════════════════════════════════════ */}
      <section className="pb-36 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => {
              const accent = memberAccents[index % memberAccents.length];
              return (
                <ScrollAnimate key={member.name} variant="scaleIn" delay={index * 0.06}>
                  <div className="h-full rounded-[2rem] p-[1px] bg-gradient-to-b from-white/[0.12] via-white/[0.03] to-transparent ring-1 ring-white/[0.06] hover:from-white/[0.22] transition-all duration-500 group">
                    <div className="h-full rounded-[calc(2rem-1px)] bg-[#040812]/95 p-6 relative overflow-hidden flex flex-col justify-between backdrop-blur-xl">
                      {/* Ambient hover glow */}
                      <div
                        className={`absolute -top-10 -right-10 w-40 h-40 bg-gradient-radial ${accent.from} via-transparent to-transparent rounded-full blur-[50px] pointer-events-none opacity-40 group-hover:opacity-80 transition-opacity duration-500`}
                        aria-hidden="true"
                      />

                      <div>
                        {/* Member photo with Doppelrand inner frame */}
                        <div className="relative w-full aspect-square rounded-2xl overflow-hidden mb-6 bg-black/50 ring-1 ring-white/[0.08]">
                          <img
                            src={member.photo}
                            alt={member.name}
                            crossOrigin="anonymous"
                            loading="lazy"
                            decoding="async"
                            width={320}
                            height={320}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 filter brightness-95 group-hover:brightness-100"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-[#040812] via-transparent to-transparent opacity-60" />

                          {/* GitHub button overlay */}
                          {member.socials.github && (
                            <a
                              href={member.socials.github}
                              target="_blank"
                              rel="noreferrer"
                              aria-label={`${member.name} GitHub profile`}
                              className="absolute bottom-3 right-3 p-2.5 rounded-xl bg-black/70 backdrop-blur-md border border-white/10 text-white/70 hover:text-white hover:bg-black transition-all"
                            >
                              <Github className="w-4 h-4" aria-hidden="true" />
                            </a>
                          )}
                        </div>

                        {/* Name */}
                        <h2 className="text-lg font-bold text-white tracking-tight leading-snug mb-2 group-hover:text-accent transition-colors">
                          {member.name}
                        </h2>

                        {/* Bio */}
                        {member.bio && (
                          <p className="text-white/50 text-xs leading-relaxed mb-6 line-clamp-3 font-light">
                            {member.bio}
                          </p>
                        )}
                      </div>

                      {/* Footer tags */}
                      <div className="pt-4 border-t border-white/[0.06] mt-auto">
                        {member.skills && member.skills.length > 0 && (
                          <div className="flex flex-wrap gap-1.5 mb-4">
                            {member.skills.slice(0, 3).map((skill) => (
                              <span
                                key={skill}
                                className="px-2.5 py-1 rounded-md bg-white/[0.04] border border-white/[0.08] text-[10px] font-mono font-medium text-white/60"
                              >
                                {skill}
                              </span>
                            ))}
                          </div>
                        )}

                        <div className="flex items-center justify-between text-[10px] font-mono font-semibold text-white/40 uppercase tracking-widest">
                          <span className="flex items-center gap-1.5">
                            <Code className="w-3 h-3 text-accent" aria-hidden="true" />
                            Certified Architect
                          </span>
                          <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                        </div>
                      </div>

                    </div>
                  </div>
                </ScrollAnimate>
              );
            })}
          </div>

          {/* Bottom Career CTA */}
          <ScrollAnimate variant="fadeUp" delay={0.2} className="mt-28">
            <div className="rounded-[2.5rem] p-[1px] bg-gradient-to-b from-white/[0.16] via-white/[0.04] to-transparent ring-1 ring-white/[0.08]">
              <div className="rounded-[calc(2.5rem-1px)] bg-[#040812]/95 p-10 sm:p-16 relative overflow-hidden text-center flex flex-col items-center">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-gradient-radial from-primary/15 via-transparent to-transparent rounded-full blur-[100px] pointer-events-none" aria-hidden="true" />

                <div className="relative z-10 max-w-2xl">
                  <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.08] text-xs text-white/70 font-mono uppercase tracking-wider mb-6">
                    <Sparkles className="w-3.5 h-3.5 text-accent" aria-hidden="true" />
                    <span>Join Our Engineering Collective</span>
                  </div>

                  <h3 className="text-3xl sm:text-4xl font-black text-white tracking-tight mb-4">
                    Want to Build Scalable Systems With Us?
                  </h3>

                  <p className="text-white/50 text-sm sm:text-base leading-relaxed mb-8">
                    We are continuously looking for ambitious systems engineers, Next.js specialists, and cloud architects in Colombo and London.
                  </p>

                  <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <Link
                      href="/careers"
                      className="btn-premium-pill w-full sm:w-auto text-center"
                    >
                      View Open Positions
                      <span className="btn-icon-wrapper">
                        <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
                      </span>
                    </Link>

                    <Link
                      href="/contact?subject=Team Engagement Inquiry"
                      className="btn-secondary-pill w-full sm:w-auto text-center inline-flex items-center justify-center gap-1.5"
                    >
                      Hire Our Squad
                      <span className="btn-icon-wrapper">
                        <ArrowRight className="w-4 h-4" aria-hidden="true" />
                      </span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </ScrollAnimate>

        </div>
      </section>

      <Footer />
    </div>
  );
}
