'use client';

import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, Award, Users, Compass, Shield, Briefcase, Zap } from 'lucide-react';

import BackgroundWaves from '../../components/BackgroundWaves';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

const coreValues = [
  { icon: Shield, title: 'Absolute Data Security', desc: 'Every application we compile undergoes meticulous vulnerability assessments and implements rigorous encryption protocols.' },
  { icon: Zap, title: 'High Velocity Execution', desc: 'Our agile Sri Lanka-UK dual pipeline cuts project delivery cycle times by up to 40% compared to traditional onshore teams.' },
  { icon: Compass, title: 'Radical Transparency', desc: 'No complex contracts or surprise costs. We provide visible milestone models and interactive estimated calculators.' },
  { icon: Award, title: 'Bespoke Craftsmanship', desc: 'We do not sell cookie-cutter setups. Every line of Next.js code is tailored exclusively to capture your search and user goals.' },
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

      {/* Hero Intro */}
      <section className="relative pt-32 pb-16 md:pt-40 md:pb-24 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs text-accent font-medium tracking-wide mb-6"
          >
            <Sparkles className="w-3.5 h-3.5 text-mint" />
            <span>Connecting Colombo & London Globally</span>
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight leading-[1.1] mb-6"
          >
            Engineering the Future of{' '}
            <span className="bg-gradient-to-r from-primary via-accent to-mint bg-clip-text text-transparent">
              Offshore Development
            </span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-gray-400 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed"
          >
            Edgrow Technologies bridges the gap between highly affordable, elite Sri Lanka systems engineering and local, transparent UK project management.
          </motion.p>
        </div>
      </section>

      {/* Corporate Mission & Vision */}
      <section className="py-20 relative z-10 bg-white/[0.005] border-y border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.05 }}
              transition={{ duration: 0.6 }}
              className="flex flex-col gap-6"
            >
              <span className="text-xs font-bold text-accent uppercase tracking-widest">Our Mandate</span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                To Accelerate Digital Growth with Custom-Engineered Clarity
              </h2>
              <p className="text-gray-300 text-sm leading-relaxed">
                At Edgrow Tech, we believe software development shouldn&apos;t feel like a black box. Our dual-shore architecture allows our clients to gain immediate access to brilliant frontend developers and deep-tier backend coders in Sri Lanka, completely backed by local accounts, timelines, and structures in the UK.
              </p>
              <div className="flex gap-4 py-2 text-xs font-bold text-gray-400">
                <span className="flex items-center gap-1.5"><Shield className="w-4 h-4 text-accent" /> ISO Compliant Processes</span>
                <span className="flex items-center gap-1.5"><Users className="w-4 h-4 text-mint" /> Global Talent Hubs</span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.05 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="relative rounded-2xl overflow-hidden aspect-video border border-white/10 shadow-2xl"
            >
              <img
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800"
                alt="Edgrow team brainstorming session"
                className="w-full h-full object-cover filter brightness-90"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-65" />
            </motion.div>

          </div>
        </div>
      </section>

      {/* Core values block */}
      <section className="py-24 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.05 }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-2xl mx-auto mb-16"
          >
            <span className="text-xs font-bold text-accent uppercase tracking-widest block mb-3">Core Pillars</span>
            <h2 className="text-3xl font-extrabold text-white tracking-tight">Our Operational Values</h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {coreValues.map((val, idx) => {
              const Icon = val.icon;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.05 }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="glass-panel p-8 rounded-2xl border border-white/5 hover:border-white/10 transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    <div className="w-10 h-10 bg-white/5 rounded-lg flex items-center justify-center text-accent mb-6">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="text-base font-bold text-white mb-3">{val.title}</h3>
                    <p className="text-gray-400 text-xs leading-relaxed">{val.desc}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Animated Milestones Timeline (Section 4 TIMELINE REQUIREMENT) */}
      <section className="py-24 relative z-10 border-t border-white/5 bg-white/[0.005]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.05 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <span className="text-xs font-bold text-mint uppercase tracking-widest block mb-3">Chronology</span>
            <h2 className="text-3xl font-extrabold text-white tracking-tight">The Edgrow Story Timeline</h2>
          </motion.div>

          <div className="relative border-l border-white/10 pl-8 ml-4 flex flex-col gap-12">
            {timelineMilestones.map((mil, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -15 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.05 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="relative"
              >
                {/* Timeline node circle */}
                <div className="absolute -left-[41px] top-1.5 w-6 h-6 rounded-full bg-black border-2 border-accent flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-accent animate-ping" />
                </div>
                
                <div>
                  <span className="text-xs font-bold text-accent font-mono block mb-1">{mil.year}</span>
                  <h3 className="text-lg font-bold text-white mb-2">{mil.title}</h3>
                  <p className="text-gray-400 text-xs leading-relaxed max-w-xl">{mil.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
