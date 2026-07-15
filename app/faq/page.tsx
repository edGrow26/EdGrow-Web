'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';

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

      {/* FAQ Banner */}
      <section className="relative pt-32 pb-16 md:pt-40 md:pb-24 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs text-accent font-medium tracking-wide mb-6"
          >
            <Sparkles className="w-3.5 h-3.5 text-mint" aria-hidden="true" />
            <span>Operational, Contract, & Technical Answers</span>
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight leading-[1.1] mb-6"
          >
            Frequently Asked{' '}
            <span className="bg-gradient-to-r from-primary via-accent to-mint bg-clip-text text-transparent">
              Questions
            </span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-gray-400 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed"
          >
            Have questions regarding regional accounting, server locations, loading guarantees, or code ownership? Inspect our breakdowns below.
          </motion.p>
        </div>
      </section>

      {/* Accordion List block */}
      <section className="pb-32 relative z-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Category Tabs */}
          <ScrollAnimate variant="fadeDown">
            <div className="flex flex-wrap items-center justify-center gap-2 mb-12" role="tablist" aria-label="FAQ category filter">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => { setActiveCategory(cat); setOpenFaqId(null); }}
                  role="tab"
                  aria-selected={activeCategory === cat}
                  className={`px-4.5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    activeCategory === cat
                      ? 'bg-gradient-to-r from-primary to-accent text-black font-extrabold shadow'
                      : 'text-gray-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </ScrollAnimate>

          {/* Accordion Wrapper */}
          <div className="flex flex-col gap-4">
            <AnimatePresence mode="popLayout">
              {filteredFAQs.map((faq, idx) => {
                const isOpen = openFaqId === faq.id;
                return (
                  <ScrollAnimate key={faq.id} variant="slideRight" delay={idx * 0.04}>
                    <div className="rounded-2xl border border-white/5 bg-white/[0.01] hover:bg-white/[0.02] transition-colors overflow-hidden">
                      <button
                        onClick={() => toggleFaq(faq.id)}
                        aria-expanded={isOpen}
                        aria-controls={`faq-answer-${faq.id}`}
                        className="w-full p-6 text-left flex items-center justify-between gap-4 cursor-pointer focus:outline-none"
                      >
                        <span className="text-sm sm:text-base font-bold text-white tracking-tight">
                          {faq.question}
                        </span>
                        <span className="text-accent shrink-0" aria-hidden="true">
                          {isOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
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
                            <div className="px-6 pb-6 pt-2 border-t border-white/5 text-gray-300 text-xs sm:text-sm leading-relaxed">
                              {faq.answer}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </ScrollAnimate>
                );
              })}
            </AnimatePresence>
          </div>

        </div>
      </section>

      <Footer />
    </div>
  );
}
