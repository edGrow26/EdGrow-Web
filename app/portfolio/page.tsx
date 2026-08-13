'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence, type Transition, type Variants } from 'motion/react';
import { Sparkles, ArrowRight } from 'lucide-react';

import BackgroundWaves from '../../components/BackgroundWaves';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
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

// Smooth spring for layout reflow
const SPRING: Transition = { type: 'spring' as const, stiffness: 400, damping: 35, mass: 0.8 };

// Stagger container
const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

// Individual card entrance
const cardVariants: Variants = {
  hidden: { opacity: 0, y: 32, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: 'spring' as const, stiffness: 340, damping: 28 },
  },
  exit: {
    opacity: 0,
    scale: 0.92,
    y: 16,
    transition: { duration: 0.22, ease: 'easeIn' },
  },
};

export default function PortfolioPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [categoryKey, setCategoryKey] = useState(0); // forces re-mount of grid on tab change

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
    setCategoryKey(k => k + 1); // remount grid so stagger plays fresh every switch
  };

  return (
    <div className="relative min-h-screen bg-black text-white overflow-x-hidden">
      <BackgroundWaves />
      <Navbar />

      {/* Hero Header */}
      <section className="relative pt-32 pb-12 md:pt-40 md:pb-20 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs text-accent font-medium tracking-wide mb-6"
          >
            <Sparkles className="w-3.5 h-3.5 text-mint" aria-hidden="true" />
            <span>Proven Enterprise Track Records</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight leading-[1.1] mb-6"
          >
            Our Portfolio &{' '}
            <span className="bg-gradient-to-r from-primary via-accent to-mint bg-clip-text text-transparent">
              Case Studies
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="text-gray-400 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed"
          >
            Discover how Edgrow Technologies engineers scalable solutions to address complex operational roadblocks and secure tangible business results.
          </motion.p>
        </div>
      </section>

      {/* Filterable Section */}
      <section className="pb-32 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Filters Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-wrap items-center justify-center gap-3 mb-16"
          >
            <div
              className="p-1.5 bg-white/5 border border-white/10 rounded-2xl flex flex-wrap gap-1.5 shadow-[0_4px_24px_rgba(0,0,0,0.3)] backdrop-blur-md"
              role="tablist"
              aria-label="Portfolio filter categories"
            >
              {FILTER_CATEGORIES.map((cat, i) => (
                <motion.button
                  key={cat}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.4 + i * 0.05, ease: [0.22, 1, 0.36, 1] }}
                  onClick={() => handleCategoryChange(cat)}
                  role="tab"
                  aria-selected={selectedCategory === cat}
                  className={`relative px-5 py-2.5 rounded-xl text-xs font-bold transition-colors duration-200 cursor-pointer overflow-hidden ${
                    selectedCategory === cat
                      ? 'text-black'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  {/* Animated active pill background */}
                  {selectedCategory === cat && (
                    <motion.span
                      layoutId="active-tab-pill"
                      className="absolute inset-0 bg-gradient-to-r from-primary to-accent rounded-xl shadow-lg"
                      transition={SPRING}
                      aria-hidden="true"
                    />
                  )}
                  {/* Hover background */}
                  {selectedCategory !== cat && (
                    <span className="absolute inset-0 bg-white/0 hover:bg-white/5 rounded-xl transition-colors duration-200" aria-hidden="true" />
                  )}
                  <span className="relative z-10">{cat}</span>
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Project Cards Grid — key resets stagger on every tab switch */}
          <AnimatePresence mode="wait">
            <motion.div
              key={categoryKey}
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {filteredProjects.map((project) => (
                <motion.div
                  variants={cardVariants}
                  key={project.id}
                  className="glass-panel p-5 rounded-2xl border border-white/5 flex flex-col group hover:border-white/10 transition-colors duration-300"
                >
                  <div className="relative w-full h-48 rounded-xl overflow-hidden mb-5">
                    <img
                      src={project.mainImage}
                      alt={project.title}
                      crossOrigin="anonymous"
                      loading="lazy"
                      decoding="async"
                      width={400}
                      height={192}
                      className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-4 left-4 px-2.5 py-1 bg-black/70 backdrop-blur-md rounded-md text-[10px] font-bold text-accent uppercase tracking-wide">
                      {project.category}
                    </div>
                  </div>

                  <div className="flex flex-col flex-1 justify-between">
                    <div>
                      <h2 className="text-lg font-extrabold text-white leading-snug mb-3 group-hover:text-accent transition-colors">
                        {project.title}
                      </h2>
                      <p className="text-gray-400 text-xs leading-relaxed line-clamp-3 mb-6">
                        {project.description}
                      </p>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-white/5 mt-auto">
                      <div className="flex flex-wrap gap-1.5 max-w-[70%]">
                        {(project.technologies || []).slice(0, 3).map((tech) => (
                          <span key={tech} className="text-[9px] font-mono font-semibold bg-white/5 text-gray-400 px-1.5 py-0.5 rounded">
                            {tech}
                          </span>
                        ))}
                      </div>
                      <Link
                        href={project.projectLink || '#'}
                        target={project.projectLink ? '_blank' : undefined}
                        rel={project.projectLink ? 'noopener noreferrer' : undefined}
                        className="text-xs font-bold text-accent hover:text-mint transition-colors inline-flex items-center gap-1 group"
                      >
                        open project <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" aria-hidden="true" />
                      </Link>
                    </div>
                  </div>

                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>

        </div>
      </section>

      <Footer />
    </div>
  );
}
