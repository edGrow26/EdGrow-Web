'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence, type Transition, type Variants } from 'motion/react';
import { Sparkles, ArrowRight, ArrowUpRight, Layers, ShieldCheck, Zap } from 'lucide-react';

import BackgroundWaves from '../../components/BackgroundWaves';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import ScrollAnimate from '../../components/ScrollAnimate';
import { sanityClient, Project } from '../../lib/sanity';

const FILTER_CATEGORIES = [
  'All',
  'Health',
  'Fitness',
  'Beauty',
  'Services',
  'Logistics',
  'Shop'
];

const cardAccents = [
  { from: 'from-blue-500/20', dot: 'bg-blue-400' },
  { from: 'from-emerald-500/20', dot: 'bg-emerald-400' },
  { from: 'from-violet-500/20', dot: 'bg-violet-400' },
  { from: 'from-amber-500/20', dot: 'bg-amber-400' },
  { from: 'from-rose-500/20', dot: 'bg-rose-400' },
  { from: 'from-cyan-500/20', dot: 'bg-cyan-400' },
];

const SPRING: Transition = { type: 'spring' as const, stiffness: 400, damping: 35, mass: 0.8 };

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 24, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: 'spring' as const, stiffness: 320, damping: 26 },
  },
  exit: {
    opacity: 0,
    scale: 0.94,
    y: 12,
    transition: { duration: 0.2, ease: 'easeIn' },
  },
};

export default function PortfolioPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [categoryKey, setCategoryKey] = useState(0);

  useEffect(() => {
    const fetchProjects = async () => {
      const data = await sanityClient.getProjects();
      setProjects(data);
    };
    fetchProjects();
  }, []);

  const filteredProjects = selectedCategory === 'All'
    ? projects
    : projects.filter(p => {
        const searchStr = `${p.industry || ''} ${p.category || ''} ${p.title || ''} ${p.description || ''}`.toLowerCase();
        const cat = selectedCategory.toLowerCase();

        if (cat === 'health') return searchStr.includes('health') || searchStr.includes('medical') || searchStr.includes('medicine') || searchStr.includes('ayurveda');
        if (cat === 'fitness') return searchStr.includes('fitness') || searchStr.includes('sport') || searchStr.includes('gym') || searchStr.includes('athletic');
        if (cat === 'beauty') return searchStr.includes('beauty') || searchStr.includes('wellness') || searchStr.includes('glow') || searchStr.includes('salon');
        if (cat === 'services') return searchStr.includes('service') || searchStr.includes('trade') || searchStr.includes('plumb') || searchStr.includes('electric');
        if (cat === 'logistics') return searchStr.includes('logistic') || searchStr.includes('mov') || searchStr.includes('transport') || searchStr.includes('cargo');
        if (cat === 'shop') return searchStr.includes('shop') || searchStr.includes('e-commerce') || searchStr.includes('ecommerce') || searchStr.includes('retail') || searchStr.includes('store');

        return searchStr.includes(cat);
    });

  const handleCategoryChange = (cat: string) => {
    setSelectedCategory(cat);
    setCategoryKey(k => k + 1);
  };

  return (
    <div className="relative min-h-screen bg-black text-white overflow-x-hidden">
      <BackgroundWaves />
      <Navbar />

      {/* ═══════════════════════════════════════════════════════════
          HERO — PORTFOLIO & CASE STUDIES
          ═══════════════════════════════════════════════════════════ */}
      <section className="relative pt-36 pb-20 md:pt-48 md:pb-28 z-10">
        {/* Ambient radial glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-gradient-radial from-primary/15 via-transparent to-transparent rounded-full blur-[120px] pointer-events-none" aria-hidden="true" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full bg-white/[0.04] border border-white/[0.08] text-[13px] text-white/70 font-medium tracking-wide mb-8 backdrop-blur-sm"
          >
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse" aria-hidden="true" />
            <span>Proven Enterprise Track Records</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl sm:text-6xl md:text-7xl font-black tracking-[-0.03em] leading-[0.95] mb-8"
          >
            Our Work &{' '}
            <span className="bg-gradient-to-r from-white via-slate-100 to-white/60 bg-clip-text text-transparent">
              Case Catalog
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-white/50 text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed font-light mb-12"
          >
            Discover how Edgrow Technologies engineers scalable Next.js architectures to eliminate digital bottlenecks and deliver measurable market advantage.
          </motion.p>

          {/* Metric Rail */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="inline-flex items-center gap-8 sm:gap-14 px-8 py-4 rounded-2xl bg-white/[0.03] border border-white/[0.06]"
          >
            {[
              { val: '100+', label: 'Delivered Deployments' },
              { val: '100/100', label: 'Lighthouse Target' },
              { val: '<100ms', label: 'Average TTFB' },
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
          FILTERABLE PORTFOLIO GRID — DOPPELRAND CARDS
          ═══════════════════════════════════════════════════════════ */}
      <section className="pb-36 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Category Tabs — Machined Segmented Control */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="flex flex-wrap items-center justify-center gap-3 mb-16"
          >
            <div
              className="p-1.5 rounded-full bg-white/[0.03] border border-white/[0.08] flex flex-wrap gap-1 shadow-[0_8px_32px_rgba(0,0,0,0.4)] backdrop-blur-md"
              role="tablist"
              aria-label="Portfolio filter categories"
            >
              {FILTER_CATEGORIES.map((cat) => {
                const isActive = selectedCategory === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => handleCategoryChange(cat)}
                    role="tab"
                    aria-selected={isActive}
                    className={`relative px-5 py-2 rounded-full text-xs font-semibold tracking-wide transition-all duration-200 cursor-pointer ${
                      isActive ? 'text-black' : 'text-white/60 hover:text-white'
                    }`}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="active-portfolio-pill"
                        className="absolute inset-0 bg-white rounded-full shadow-[0_0_20px_rgba(255,255,255,0.4)]"
                        transition={SPRING}
                        aria-hidden="true"
                      />
                    )}
                    <span className="relative z-10">{cat}</span>
                  </button>
                );
              })}
            </div>
          </motion.div>

          {/* Grid of Doppelrand Project Cards */}
          <AnimatePresence mode="wait">
            <motion.div
              key={categoryKey}
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {filteredProjects.map((project, idx) => {
                const accent = cardAccents[idx % cardAccents.length];
                return (
                  <motion.div
                    variants={cardVariants}
                    key={project.id}
                    className="group"
                  >
                    {/* Doppelrand outer bezel */}
                    <div className="h-full rounded-[2rem] p-[1px] bg-gradient-to-b from-white/[0.14] via-white/[0.03] to-transparent ring-1 ring-white/[0.06] hover:from-white/[0.24] transition-all duration-500">
                      {/* Inner core card */}
                      <div className="h-full rounded-[calc(2rem-1px)] bg-[#040812]/95 p-6 sm:p-7 relative overflow-hidden flex flex-col justify-between backdrop-blur-xl">
                        {/* Ambient subtle glow on hover */}
                        <div
                          className={`absolute -top-12 -right-12 w-48 h-48 bg-gradient-radial ${accent.from} via-transparent to-transparent rounded-full blur-[60px] pointer-events-none opacity-40 group-hover:opacity-80 transition-opacity duration-500`}
                          aria-hidden="true"
                        />

                        {/* Top: Image Container with Doppelrand inner frame */}
                        <div>
                          <div className="relative w-full h-52 rounded-2xl overflow-hidden mb-6 bg-black/40 ring-1 ring-white/[0.08]">
                            <img
                              src={project.mainImage}
                              alt={project.title}
                              crossOrigin="anonymous"
                              loading="lazy"
                              decoding="async"
                              width={400}
                              height={208}
                              className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700"
                            />
                            {/* Gradient vignette */}
                            <div className="absolute inset-0 bg-gradient-to-t from-[#040812] via-transparent to-black/20" />

                            {/* Category Pill Tag */}
                            <div className="absolute top-3.5 left-3.5 px-3 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/10 text-[10px] font-mono font-bold tracking-wider uppercase text-white/90">
                              {project.category}
                            </div>

                            {/* Project Index */}
                            <div className="absolute top-3.5 right-3.5 px-2.5 py-1 rounded-full bg-white/[0.08] backdrop-blur-md text-[10px] font-mono font-semibold text-white/60">
                              0{idx + 1}
                            </div>
                          </div>

                          {/* Industry tag */}
                          {project.industry && (
                            <span className="text-[11px] font-bold text-accent uppercase tracking-[0.2em] block mb-2">
                              {project.industry}
                            </span>
                          )}

                          {/* Title */}
                          <h2 className="text-xl font-bold text-white tracking-tight leading-snug mb-3 group-hover:text-white/90 transition-colors">
                            {project.title}
                          </h2>

                          {/* Description */}
                          <p className="text-white/50 text-xs sm:text-sm leading-relaxed line-clamp-3 mb-6">
                            {project.description}
                          </p>
                        </div>

                        {/* Bottom: Tech Stack & Actions */}
                        <div className="pt-5 border-t border-white/[0.06] mt-auto flex flex-col gap-4">
                          {/* Tech chips */}
                          <div className="flex flex-wrap gap-1.5">
                            {(project.technologies || []).slice(0, 4).map((tech) => (
                              <span
                                key={tech}
                                className="px-2.5 py-1 bg-white/[0.04] border border-white/[0.08] rounded-md text-[10px] font-mono font-medium text-white/60"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>

                          {/* Actions: Case Study or Live Project */}
                          <div className="flex items-center justify-between pt-1">
                            <Link
                              href={`/portfolio/${project.id}`}
                              className="text-xs font-semibold text-white/70 hover:text-white inline-flex items-center gap-1.5 transition-colors group/link"
                            >
                              <span>Explore Architecture</span>
                              <ArrowRight className="w-3.5 h-3.5 group-hover/link:translate-x-1 transition-transform text-accent" aria-hidden="true" />
                            </Link>

                            {project.projectLink && (
                              <a
                                href={project.projectLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-8 h-8 rounded-full bg-white/[0.05] border border-white/[0.08] hover:bg-white/[0.12] flex items-center justify-center text-white/70 hover:text-white transition-all"
                                aria-label={`Open live project for ${project.title}`}
                              >
                                <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
                              </a>
                            )}
                          </div>
                        </div>

                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </AnimatePresence>

          {/* Bottom Consultation Doppelrand Banner */}
          <ScrollAnimate variant="fadeUp" delay={0.2} className="mt-28">
            <div className="rounded-[2.5rem] p-[1px] bg-gradient-to-b from-white/[0.16] via-white/[0.04] to-transparent ring-1 ring-white/[0.08]">
              <div className="rounded-[calc(2.5rem-1px)] bg-[#040812]/95 p-10 sm:p-16 relative overflow-hidden text-center flex flex-col items-center">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-gradient-radial from-accent/15 via-transparent to-transparent rounded-full blur-[100px] pointer-events-none" aria-hidden="true" />

                <div className="relative z-10 max-w-2xl">
                  <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.08] text-xs text-white/70 font-mono uppercase tracking-wider mb-6">
                    <Sparkles className="w-3.5 h-3.5 text-accent" aria-hidden="true" />
                    <span>Have a Bespoke Vision?</span>
                  </div>

                  <h3 className="text-3xl sm:text-4xl font-black text-white tracking-tight mb-4">
                    Ready to Build Your Next High-Performance Solution?
                  </h3>

                  <p className="text-white/50 text-sm sm:text-base leading-relaxed mb-8">
                    Let our Colombo systems engineers and London strategists analyze your business requirements and provide an itemized architecture proposal.
                  </p>

                  <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <Link
                      href="/contact?subject=Portfolio Project Inquiry"
                      className="btn-premium-pill w-full sm:w-auto text-center"
                    >
                      Schedule Architecture Call
                      <span className="btn-icon-wrapper">
                        <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
                      </span>
                    </Link>

                    <Link
                      href="/pricing"
                      className="btn-secondary-pill w-full sm:w-auto text-center inline-flex items-center justify-center gap-1.5"
                    >
                      Inspect Cost Models
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
