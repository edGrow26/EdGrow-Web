'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'motion/react';
import { Sparkles, Calendar, User, Clock, ArrowRight, ArrowUpRight, BookOpen } from 'lucide-react';

import BackgroundWaves from '../../components/BackgroundWaves';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import ScrollAnimate from '../../components/ScrollAnimate';
import { sanityClient, Post } from '../../lib/sanity';

const blogAccents = [
  { from: 'from-blue-500/20' },
  { from: 'from-emerald-500/20' },
  { from: 'from-violet-500/20' },
  { from: 'from-amber-500/20' },
];

export default function BlogListingPage() {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const data = await sanityClient.getBlogPosts();
      setPosts(data);
    };
    fetchPosts();
  }, []);

  return (
    <div className="relative min-h-screen bg-black text-white overflow-x-hidden">
      <BackgroundWaves />
      <Navbar />

      {/* ═══════════════════════════════════════════════════════════
          HERO — BLOG COMMAND CENTER
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
            <span>Tech Guides & Architectural Whitepapers</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl sm:text-6xl md:text-7xl font-black tracking-[-0.03em] leading-[0.95] mb-8"
          >
            The Edgrow{' '}
            <span className="bg-gradient-to-r from-white via-slate-100 to-white/60 bg-clip-text text-transparent">
              Engineering Blog
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-white/50 text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed font-light mb-12"
          >
            Deep-dives into headless Next.js architectures, Core Web Vitals optimization, and distributed microservices written by our leads in Colombo and London.
          </motion.p>

          {/* Metric Rail */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="inline-flex items-center gap-8 sm:gap-14 px-8 py-4 rounded-2xl bg-white/[0.03] border border-white/[0.06]"
          >
            {[
              { val: 'Bi-Weekly', label: 'Publication Schedule' },
              { val: '100%', label: 'Architect-Authored' },
              { val: 'Production-Tested', label: 'Insights & Code' },
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
          POST LIST — DOPPELRAND ARTICLE CARDS
          ═══════════════════════════════════════════════════════════ */}
      <section className="pb-36 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {posts.map((post, idx) => {
              const accent = blogAccents[idx % blogAccents.length];
              return (
                <ScrollAnimate key={post.slug} variant="scaleIn" delay={idx * 0.08}>
                  <Link
                    href={`/blog/${post.slug}`}
                    aria-label={`Read ${post.title}`}
                    className="block h-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-4 focus-visible:ring-offset-black group"
                  >
                    <div className="h-full rounded-[2rem] p-[1px] bg-gradient-to-b from-white/[0.14] via-white/[0.03] to-transparent ring-1 ring-white/[0.06] hover:from-white/[0.24] transition-all duration-500">
                      <div className="h-full rounded-[calc(2rem-1px)] bg-[#040812]/95 p-7 sm:p-9 relative overflow-hidden flex flex-col justify-between backdrop-blur-xl">
                        {/* Ambient glow on hover */}
                        <div
                          className={`absolute -top-12 -right-12 w-48 h-48 bg-gradient-radial ${accent.from} via-transparent to-transparent rounded-full blur-[60px] pointer-events-none opacity-40 group-hover:opacity-80 transition-opacity duration-500`}
                          aria-hidden="true"
                        />

                        <div>
                          {/* Image frame */}
                          <div className="relative w-full h-56 rounded-2xl overflow-hidden mb-6 bg-black/50 ring-1 ring-white/[0.08]">
                            <img
                              src={post.mainImage}
                              alt={post.title}
                              crossOrigin="anonymous"
                              loading="lazy"
                              decoding="async"
                              width={600}
                              height={224}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#040812] via-transparent to-transparent opacity-60" />

                            {/* Category Badges */}
                            <div className="absolute top-3.5 left-3.5 flex gap-1.5">
                              {post.categories.map((cat) => (
                                <span key={cat} className="px-3 py-1 bg-black/70 backdrop-blur-md rounded-full text-[10px] font-mono font-bold text-accent uppercase tracking-wider border border-white/10">
                                  {cat}
                                </span>
                              ))}
                            </div>

                            {/* Read Time Pill */}
                            <div className="absolute top-3.5 right-3.5 px-3 py-1 bg-black/70 backdrop-blur-md rounded-full text-[10px] font-mono font-medium text-white/70 border border-white/10 flex items-center gap-1.5">
                              <Clock className="w-3 h-3 text-accent" />
                              <span>{post.readTime}</span>
                            </div>
                          </div>

                          {/* Metadata row */}
                          <div className="flex items-center gap-3 text-xs font-mono text-white/40 mb-3">
                            <span className="flex items-center gap-1.5">
                              <Calendar className="w-3.5 h-3.5 text-accent" />
                              <time dateTime={post.publishedAt}>
                                {new Date(post.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                              </time>
                            </span>
                          </div>

                          {/* Title */}
                          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight leading-snug mb-3 group-hover:text-white/90 transition-colors">
                            {post.title}
                          </h2>

                          {/* Excerpt */}
                          <p className="text-white/50 text-xs sm:text-sm leading-relaxed line-clamp-3 mb-6 font-light">
                            {post.excerpt}
                          </p>
                        </div>

                        {/* Author Info row */}
                        <div className="flex items-center justify-between pt-6 border-t border-white/[0.06] mt-auto">
                          <div className="flex items-center gap-3">
                            <img
                              src={post.author.avatar}
                              alt={post.author.name}
                              crossOrigin="anonymous"
                              loading="lazy"
                              decoding="async"
                              width={36}
                              height={36}
                              className="w-9 h-9 rounded-full object-cover border border-white/10"
                            />
                            <div>
                              <strong className="text-white text-xs block font-bold">{post.author.name}</strong>
                              <span className="text-[11px] text-white/40 block font-medium">{post.author.role}</span>
                            </div>
                          </div>

                          <span className="text-xs font-semibold text-white/80 group-hover:text-white inline-flex items-center gap-1.5 transition-colors">
                            <span>Read article</span>
                            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform text-accent" aria-hidden="true" />
                          </span>
                        </div>

                      </div>
                    </div>
                  </Link>
                </ScrollAnimate>
              );
            })}
          </div>

          {/* Bottom Newsletter / Consultation CTA */}
          <ScrollAnimate variant="fadeUp" delay={0.2} className="mt-28">
            <div className="rounded-[2.5rem] p-[1px] bg-gradient-to-b from-white/[0.16] via-white/[0.04] to-transparent ring-1 ring-white/[0.08]">
              <div className="rounded-[calc(2.5rem-1px)] bg-[#040812]/95 p-10 sm:p-16 relative overflow-hidden text-center flex flex-col items-center backdrop-blur-xl">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-gradient-radial from-accent/15 via-transparent to-transparent rounded-full blur-[100px] pointer-events-none" aria-hidden="true" />

                <div className="relative z-10 max-w-2xl">
                  <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.08] text-xs text-white/70 font-mono uppercase tracking-wider mb-6">
                    <Sparkles className="w-3.5 h-3.5 text-accent" aria-hidden="true" />
                    <span>Technical Architecture Advisory</span>
                  </div>

                  <h3 className="text-3xl sm:text-4xl font-black text-white tracking-tight mb-4">
                    Require Bespoke Systems Architecture?
                  </h3>

                  <p className="text-white/50 text-sm sm:text-base leading-relaxed mb-8 font-light">
                    Our team conducts technical audits on legacy codebases, monolithic databases, and slow websites to design streamlined, high-speed cloud migrations.
                  </p>

                  <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <Link
                      href="/contact?subject=Technical Audit Inquiry"
                      className="btn-premium-pill w-full sm:w-auto text-center"
                    >
                      Request Architecture Audit
                      <span className="btn-icon-wrapper">
                        <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
                      </span>
                    </Link>

                    <Link
                      href="/services"
                      className="btn-secondary-pill w-full sm:w-auto text-center inline-flex items-center justify-center gap-1.5"
                    >
                      Explore Our Services
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
