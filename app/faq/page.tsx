'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, HelpCircle, ChevronDown, ChevronUp, ArrowUpRight, ArrowRight, MessageSquareCode } from 'lucide-react';
import Link from 'next/link';

import BackgroundWaves from '../../components/BackgroundWaves';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import ScrollAnimate from '../../components/ScrollAnimate';
import { sanityClient, FAQ } from '../../lib/sanity';

export default function FAQPage() {
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [activeCategory, setActiveCategory] = useState('All');
  const [openFaqId, setOpenFaqId] = useState<string | null>(null);

  useEffect(() => {
    const fetchFAQs = async () => {
      const data = await sanityClient.getFAQs();
      setFaqs(data);
    };
    fetchFAQs();
  }, []);

  const categories = ['All', 'General', 'Services', 'Pricing', 'Careers'];

  const filteredFAQs = activeCategory === 'All'
    ? faqs
    : faqs.filter(f => f.category.toLowerCase() === activeCategory.toLowerCase());

  const toggleFaq = (id: string) => {
    setOpenFaqId(prev => (prev === id ? null : id));
  };

  return (
    <div className="relative min-h-screen bg-black text-white overflow-x-hidden">
      <BackgroundWaves />
      <Navbar />

      {/* ═══════════════════════════════════════════════════════════
          HERO — FAQ COMMAND CENTER
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
            <span>Operational, Contract, & Technical Answers</span>
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl sm:text-6xl md:text-7xl font-black tracking-[-0.03em] leading-[0.95] mb-8"
          >
            Frequently Asked{' '}
            <span className="bg-gradient-to-r from-white via-slate-100 to-white/60 bg-clip-text text-transparent">
              Questions
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-white/50 text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed font-light mb-12"
          >
            Have questions regarding regional accounting, server locations, loading guarantees, or code ownership? Inspect our breakdowns below.
          </motion.p>

          {/* Metric Rail */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="inline-flex items-center gap-8 sm:gap-14 px-8 py-4 rounded-2xl bg-white/[0.03] border border-white/[0.06]"
          >
            {[
              { val: '24h', label: 'Average Response Time' },
              { val: 'UK & LK', label: 'Dual Legal Entities' },
              { val: '100%', label: 'Source Code Handover' },
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
          ACCORDION LIST — DOPPELRAND ITEMS
          ═══════════════════════════════════════════════════════════ */}
      <section className="pb-36 relative z-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Category Tabs Segmented Control */}
          <div className="flex justify-center mb-16">
            <div className="p-1.5 rounded-full bg-white/[0.03] border border-white/[0.08] flex flex-wrap gap-1 shadow-[0_8px_32px_rgba(0,0,0,0.4)] backdrop-blur-md" role="tablist">
              {categories.map((cat) => {
                const isActive = activeCategory === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => { setActiveCategory(cat); setOpenFaqId(null); }}
                    role="tab"
                    aria-selected={isActive}
                    className={`px-5 py-2 rounded-full text-xs font-semibold tracking-wide transition-all duration-200 cursor-pointer ${
                      isActive
                        ? 'bg-white text-black shadow-[0_0_20px_rgba(255,255,255,0.4)]'
                        : 'text-white/60 hover:text-white'
                    }`}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Accordion Wrapper */}
          <div className="flex flex-col gap-4">
            <AnimatePresence mode="popLayout">
              {filteredFAQs.map((faq, idx) => {
                const isOpen = openFaqId === faq.id;
                return (
                  <ScrollAnimate key={faq.id} variant="slideRight" delay={idx * 0.04}>
                    {/* Doppelrand outer bezel */}
                    <div
                      className={`rounded-2xl p-[1px] transition-all duration-300 ring-1 ${
                        isOpen
                          ? 'bg-gradient-to-b from-white/20 via-white/5 to-transparent ring-white/10'
                          : 'bg-gradient-to-b from-white/[0.08] via-transparent to-transparent ring-white/[0.04] hover:from-white/[0.14]'
                      }`}
                    >
                      {/* Inner card core */}
                      <div className="rounded-[calc(1rem-1px)] bg-[#040812]/95 overflow-hidden backdrop-blur-xl">
                        <button
                          onClick={() => toggleFaq(faq.id)}
                          aria-expanded={isOpen}
                          aria-controls={`faq-answer-${faq.id}`}
                          className="w-full p-6 text-left flex items-center justify-between gap-4 cursor-pointer focus:outline-none"
                        >
                          <span className="text-sm sm:text-base font-bold text-white tracking-tight">
                            {faq.question}
                          </span>
                          <span
                            className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-transform duration-300 ${
                              isOpen ? 'bg-white text-black rotate-180' : 'bg-white/[0.05] text-white/70'
                            }`}
                            aria-hidden="true"
                          >
                            <ChevronDown className="w-4 h-4" />
                          </span>
                        </button>

                        <AnimatePresence initial={false}>
                          {isOpen && (
                            <motion.div
                              id={`faq-answer-${faq.id}`}
                              role="region"
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.25 }}
                            >
                              <div className="px-6 pb-6 pt-2 border-t border-white/[0.06] text-white/60 text-xs sm:text-sm leading-relaxed font-light">
                                {faq.answer}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>
                  </ScrollAnimate>
                );
              })}
            </AnimatePresence>
          </div>

          {/* Bottom Direct Architect Help Banner */}
          <div className="mt-24 rounded-[2.5rem] p-[1px] bg-gradient-to-b from-white/[0.16] via-white/[0.04] to-transparent ring-1 ring-white/[0.08]">
            <div className="rounded-[calc(2.5rem-1px)] bg-[#040812]/95 p-10 sm:p-14 relative overflow-hidden text-center flex flex-col items-center backdrop-blur-xl">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-gradient-radial from-accent/15 via-transparent to-transparent rounded-full blur-[100px] pointer-events-none" aria-hidden="true" />

              <div className="relative z-10 max-w-xl">
                <div className="w-12 h-12 rounded-2xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-accent mx-auto mb-6">
                  <MessageSquareCode className="w-6 h-6" />
                </div>

                <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight mb-3">
                  Have a Question Not Listed Above?
                </h3>

                <p className="text-white/50 text-xs sm:text-sm leading-relaxed mb-8 font-light">
                  Our Colombo and London technical leads are available to discuss architecture questions, security guarantees, and migration pathways.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Link
                    href="/contact?subject=FAQ Inquiry"
                    className="btn-premium-pill w-full sm:w-auto text-center"
                  >
                    Direct Consultant Message
                    <span className="btn-icon-wrapper">
                      <ArrowUpRight className="w-4 h-4" />
                    </span>
                  </Link>

                  <Link
                    href="/pricing"
                    className="btn-secondary-pill w-full sm:w-auto text-center inline-flex items-center justify-center gap-1.5"
                  >
                    Explore Cost Models
                    <span className="btn-icon-wrapper">
                      <ArrowRight className="w-4 h-4" />
                    </span>
                  </Link>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      <Footer />
    </div>
  );
}
