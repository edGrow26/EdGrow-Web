'use client';

import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, Linkedin, Github, Twitter, Code, Award } from 'lucide-react';

import BackgroundWaves from './BackgroundWaves';
import Navbar from './Navbar';
import Footer from './Footer';
import ScrollAnimate from './ScrollAnimate';
import type { TeamMember } from '../lib/sanity';

export default function TeamPageClient({ team }: { team: TeamMember[] }) {
  return (
    <div className="relative min-h-screen bg-black text-white overflow-x-hidden">
      <BackgroundWaves />
      <Navbar />

      {/* Team Header Banner */}
      <section className="relative pt-32 pb-16 md:pt-40 md:pb-24 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs text-accent font-medium tracking-wide mb-6"
          >
            <Sparkles className="w-3.5 h-3.5 text-mint" aria-hidden="true" />
            <span>Passionate Coders & Systems Designers</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight leading-[1.1] mb-6"
          >
            Meet Our Elite{' '}
            <span className="bg-gradient-to-r from-primary via-accent to-mint bg-clip-text text-transparent">
              Systems Engineers
            </span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-gray-400 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed"
          >
            Our engineers combine deep academic knowledge in data science, software architecture, and Core Web Vitals to deliver robust, high-performance systems.
          </motion.p>
        </div>
      </section>

      {/* Team grid block */}
      <section className="pb-32 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => {
              const variants: Array<'scaleIn' | 'rotateIn' | 'slideRight' | 'slideLeft'> = ['scaleIn', 'rotateIn', 'slideRight', 'slideLeft'];
              return (
                <ScrollAnimate key={member.name} variant={variants[index % variants.length]} delay={index * 0.08}>
                  <div className="glass-panel p-5 rounded-2xl border border-white/5 flex flex-col group hover:border-white/10 transition-all duration-300 text-center h-full">
                    {/* Photo card */}
                    <div className="relative w-full aspect-square rounded-xl overflow-hidden mb-6 border border-white/5">
                      <img
                        src={member.photo}
                        alt={member.name}
                        loading="lazy"
                        decoding="async"
                        width={300}
                        height={300}
                        className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500 filterbrightness-95 group-hover:brightness-100"
                      />
                      {/* Subtle hover details overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4">
                        <div className="flex gap-3">
                          {member.socials.linkedin && (
                            <a href={member.socials.linkedin} target="_blank" rel="noreferrer" aria-label={`${member.name} LinkedIn profile`} className="p-2 bg-accent rounded-lg text-black hover:bg-mint transition-colors">
                              <Linkedin className="w-4 h-4" aria-hidden="true" />
                            </a>
                          )}
                          {member.socials.github && (
                            <a href={member.socials.github} target="_blank" rel="noreferrer" aria-label={`${member.name} GitHub profile`} className="p-2 bg-accent rounded-lg text-black hover:bg-mint transition-colors">
                              <Github className="w-4 h-4" aria-hidden="true" />
                            </a>
                          )}
                        </div>
                      </div>
                    </div>

                    <h3 className="text-base font-extrabold text-white group-hover:text-accent transition-colors leading-snug mb-1">
                      {member.name}
                    </h3>

                    <p className="text-gray-400 text-xs font-semibold leading-normal mb-4">
                      {member.role}
                    </p>

                    {member.bio && (
                      <p className="text-sm text-gray-300 leading-relaxed mb-4 line-clamp-4">
                        {member.bio}
                      </p>
                    )}

                    {member.skills && member.skills.length > 0 && (
                      <div className="flex flex-wrap justify-center gap-2 mb-4">
                        {member.skills.map((skill) => (
                          <span
                            key={skill}
                            className="px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] font-semibold tracking-wide text-gray-300"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    )}

                    <span className="text-[10px] uppercase font-mono font-bold tracking-widest text-gray-500 mt-auto flex items-center justify-center gap-1">
                      <Code className="w-3 h-3 text-mint" aria-hidden="true" /> Certified Architect
                    </span>

                  </div>
                </ScrollAnimate>
              );
            })}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
