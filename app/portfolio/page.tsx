'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'motion/react';
import { Sparkles, Sliders, ArrowRight, ExternalLink, RefreshCw } from 'lucide-react';

import BackgroundWaves from '../../components/BackgroundWaves';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import ScrollAnimate from '../../components/ScrollAnimate';
import { sanityClient, Project } from '../../lib/sanity';

const FILTER_CATEGORIES = ['All', 'Education', 'Finance', 'Logistics'];

export default function PortfolioPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('All');

  useEffect(() => {
    const fetchProjects = async () => {
      const data = await sanityClient.getProjects();
      setProjects(data);
    };
    fetchProjects();
  }, []);

  const filteredProjects = selectedCategory === 'All'
    ? projects
    : projects.filter(p => p.industry.toLowerCase() === selectedCategory.toLowerCase());

  return (
    <div className="relative min-h-screen bg-black text-white overflow-x-hidden">
      <BackgroundWaves />
      <Navbar />

      {/* Hero Header */}
      <section className="relative pt-32 pb-12 md:pt-40 md:pb-20 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs text-accent font-medium tracking-wide mb-6"
          >
            <Sparkles className="w-3.5 h-3.5 text-mint" aria-hidden="true" />
            <span>Proven Enterprise Track Records</span>
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight leading-[1.1] mb-6"
          >
            Our Portfolio &{' '}
            <span className="bg-gradient-to-r from-primary via-accent to-mint bg-clip-text text-transparent">
              Case Studies
            </span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
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
          <ScrollAnimate variant="fadeDown">
            <div className="flex flex-wrap items-center justify-center gap-3 mb-16">
              <div className="p-1 bg-white/5 border border-white/5 rounded-2xl flex flex-wrap gap-2" role="tablist" aria-label="Portfolio filter categories">
                {FILTER_CATEGORIES.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    role="tab"
                    aria-selected={selectedCategory === cat}
                    className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      selectedCategory === cat
                        ? 'bg-gradient-to-r from-primary to-accent text-black shadow-md'
                        : 'text-gray-400 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          </ScrollAnimate>

          {/* Project Cards Grid */}
          <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProjects.map((project) => (
                <motion.div
                  layout="position"
                  initial={false}
                  transition={{ duration: 0.25 }}
                  key={project.id}
                  className="glass-panel p-5 rounded-2xl border border-white/5 flex flex-col group hover:border-white/10 transition-all duration-300"
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
                        target={project.projectLink ? "_blank" : undefined}
                        rel={project.projectLink ? "noopener noreferrer" : undefined}
                        className="text-xs font-bold text-accent hover:text-mint transition-colors inline-flex items-center gap-1 group"
                      >
                        Read study <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" aria-hidden="true" />
                      </Link>
                    </div>
                  </div>

                </motion.div>
              ))}
          </motion.div>


        </div>
      </section>

      <Footer />
    </div>
  );
}
