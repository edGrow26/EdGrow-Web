'use client';

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Sparkles, Send, Mail, Phone, MapPin, CheckCircle2, User, HelpCircle, ArrowUpRight, ArrowRight, ShieldCheck, Globe } from 'lucide-react';

import BackgroundWaves from '../../components/BackgroundWaves';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import ScrollAnimate from '../../components/ScrollAnimate';

export default function ContactPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;

    setSubmitting(true);
    setSubmitError('');

    try {
      const res = await fetch('/api/hire-inquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, subject, message }),
      });

      const result = await res.json() as { success: boolean; message?: string };

      if (res.ok && result.success) {
        setSuccess(true);
        setName('');
        setEmail('');
        setSubject('');
        setMessage('');
      } else {
        setSubmitError(
          result.message ??
          'Your message could not be delivered. Please try again or email edgrowproduct@gmail.com directly.',
        );
      }
    } catch {
      setSubmitError(
        'Your message could not be delivered. Please try again or email edgrowproduct@gmail.com directly.',
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-black text-white overflow-x-hidden">
      <BackgroundWaves />
      <Navbar />

      {/* ═══════════════════════════════════════════════════════════
          HERO — CONTACT COMMAND CENTER
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
            <span>Schedule a Complementary Engineering Consultation</span>
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl sm:text-6xl md:text-7xl font-black tracking-[-0.03em] leading-[0.95] mb-8"
          >
            Get In{' '}
            <span className="bg-gradient-to-r from-white via-slate-100 to-white/60 bg-clip-text text-transparent">
              Touch With Us
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-white/50 text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed font-light mb-12"
          >
            Connect directly with our corporate development teams in Colombo or London. Complete the form below to receive a response within 1 business day.
          </motion.p>

          {/* Metric Rail */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="inline-flex items-center gap-8 sm:gap-14 px-8 py-4 rounded-2xl bg-white/[0.03] border border-white/[0.06]"
          >
            {[
              { val: '< 24 Hours', label: 'Initial Response SLA' },
              { val: '2 Locations', label: 'London & Colombo' },
              { val: 'Direct Call', label: 'Lead Architect Meeting' },
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
          CONTACT FORM & LOCATIONS — DOPPELRAND SPLIT
          ═══════════════════════════════════════════════════════════ */}
      <section className="pb-36 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Left Column: Form Inquiry in Doppelrand Card */}
            <ScrollAnimate variant="slideRight" className="lg:col-span-7">
              <div className="rounded-[2.25rem] p-[1px] bg-gradient-to-b from-white/[0.16] via-white/[0.04] to-transparent ring-1 ring-white/[0.08]">
                <div className="rounded-[calc(2.25rem-1px)] bg-[#040812]/95 p-8 sm:p-12 relative overflow-hidden backdrop-blur-xl">
                  <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-radial from-accent/15 via-transparent to-transparent rounded-full blur-[100px] pointer-events-none" aria-hidden="true" />
                  
                  <div className="mb-8 relative z-10">
                    <span className="text-[10px] font-mono font-bold text-accent uppercase tracking-[0.2em] block mb-2">
                      Secure Dispatch Gateway
                    </span>
                    <h3 className="text-2xl font-black text-white tracking-tight mb-2">Send Us an Engineering Brief</h3>
                    <p className="text-xs sm:text-sm text-white/50 font-light">Our systems leads will review your technical requirements and reply with architectural notes.</p>
                  </div>

                  {success ? (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="py-14 px-6 text-center bg-white/[0.02] border border-white/[0.08] rounded-2xl flex flex-col items-center gap-4"
                    >
                      <div className="w-14 h-14 bg-emerald-500/10 border border-emerald-500/20 rounded-full flex items-center justify-center text-emerald-400">
                        <CheckCircle2 className="w-7 h-7" aria-hidden="true" />
                      </div>
                      <h4 className="text-xl font-bold text-white tracking-tight">Inquiry Recorded Successfully</h4>
                      <p className="text-white/50 text-xs sm:text-sm max-w-md leading-relaxed mx-auto font-light">
                        Thank you for contacting Edgrow Technologies. Your client record has been generated and dispatched to our dual-region consultancy pipeline.
                      </p>
                      <button
                        onClick={() => setSuccess(false)}
                        className="btn-secondary-pill !px-6 !py-2.5 !text-xs mt-4 cursor-pointer"
                      >
                        Send Another Inquiry
                      </button>
                    </motion.div>
                  ) : (
                    <form onSubmit={handleSubmit} className="flex flex-col gap-5 relative z-10">
                      
                      {/* Name */}
                      <div className="flex flex-col gap-1.5">
                        <label htmlFor="contact-name" className="text-[10px] font-mono font-bold text-white/40 uppercase tracking-widest flex items-center gap-1.5">
                          <User className="w-3 h-3 text-accent" aria-hidden="true" /> Full Name
                        </label>
                        <input
                          id="contact-name"
                          name="name"
                          type="text"
                          required
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="Kanishka Bandara"
                          className="w-full bg-white/[0.03] border border-white/[0.08] rounded-xl px-4 py-3 text-xs text-white placeholder-white/30 focus:outline-none focus:border-white/30 transition-colors"
                        />
                      </div>

                      {/* Email */}
                      <div className="flex flex-col gap-1.5">
                        <label htmlFor="contact-email" className="text-[10px] font-mono font-bold text-white/40 uppercase tracking-widest flex items-center gap-1.5">
                          <Mail className="w-3 h-3 text-accent" aria-hidden="true" /> Corporate Email
                        </label>
                        <input
                          id="contact-email"
                          name="email"
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="kanishka@enterprise.com"
                          className="w-full bg-white/[0.03] border border-white/[0.08] rounded-xl px-4 py-3 text-xs text-white placeholder-white/30 focus:outline-none focus:border-white/30 transition-colors"
                        />
                      </div>

                      {/* Subject */}
                      <div className="flex flex-col gap-1.5">
                        <label htmlFor="contact-subject" className="text-[10px] font-mono font-bold text-white/40 uppercase tracking-widest flex items-center gap-1.5">
                          <HelpCircle className="w-3 h-3 text-accent" aria-hidden="true" /> Subject of Inquiry
                        </label>
                        <input
                          id="contact-subject"
                          name="subject"
                          type="text"
                          value={subject}
                          onChange={(e) => setSubject(e.target.value)}
                          placeholder="Custom Next.js SaaS Web Portal Architecture"
                          className="w-full bg-white/[0.03] border border-white/[0.08] rounded-xl px-4 py-3 text-xs text-white placeholder-white/30 focus:outline-none focus:border-white/30 transition-colors"
                        />
                      </div>

                      {/* Message */}
                      <div className="flex flex-col gap-1.5">
                        <label htmlFor="contact-message" className="text-[10px] font-mono font-bold text-white/40 uppercase tracking-widest block">
                          Detailed Project Scope / Objectives
                        </label>
                        <textarea
                          id="contact-message"
                          name="message"
                          rows={4}
                          required
                          value={message}
                          onChange={(e) => setMessage(e.target.value)}
                          placeholder="Outline your database constraints, timeline density, and page output targets..."
                          className="w-full bg-white/[0.03] border border-white/[0.08] rounded-xl p-4 text-xs text-white placeholder-white/30 focus:outline-none focus:border-white/30 transition-colors resize-none"
                        />
                      </div>

                      {/* Submit Error */}
                      {submitError && (
                        <p className="text-xs text-rose-300 bg-rose-500/10 border border-rose-500/20 rounded-xl px-4 py-3" role="alert">
                          {submitError}
                        </p>
                      )}

                      {/* Submit Button */}
                      <button
                        type="submit"
                        disabled={submitting}
                        className="btn-premium-pill w-full text-center mt-2 cursor-pointer"
                      >
                        {submitting ? 'Dispatching Message...' : 'Dispatch Engineering Brief'}
                        <span className="btn-icon-wrapper">
                          <Send className="w-3.5 h-3.5" />
                        </span>
                      </button>

                    </form>
                  )}

                </div>
              </div>
            </ScrollAnimate>

            {/* Right Column: Operations Hubs & Telemetry Mockup */}
            <ScrollAnimate variant="slideLeft" delay={0.15} className="lg:col-span-5 flex flex-col gap-8">
              
              {/* Dual Location Cards in Doppelrand container */}
              <div className="rounded-[2.25rem] p-[1px] bg-gradient-to-b from-white/[0.14] via-white/[0.04] to-transparent ring-1 ring-white/[0.08]">
                <div className="rounded-[calc(2.25rem-1px)] bg-[#040812]/95 p-8 sm:p-10 relative overflow-hidden flex flex-col gap-8 backdrop-blur-xl">
                  
                  <div className="flex items-center justify-between pb-6 border-b border-white/[0.06]">
                    <span className="text-[10px] font-mono font-bold text-white/40 uppercase tracking-[0.2em]">
                      Operations Hubs
                    </span>
                    <span className="text-[10px] font-mono font-bold text-emerald-400 flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      Active Operations
                    </span>
                  </div>
                  
                  {/* UK */}
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-accent shrink-0 mt-0.5">
                      <MapPin className="w-5 h-5" aria-hidden="true" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="text-white text-sm font-bold">United Kingdom (HQ)</h4>
                        <span className="px-2 py-0.5 rounded text-[9px] font-mono bg-white/[0.04] text-white/50">UK-LON: 24ms</span>
                      </div>
                      <span className="text-white/50 text-xs block leading-relaxed mt-1 font-light">
                        85 Great Portland Street, First Floor, London, W1W 7LT
                      </span>
                      <span className="text-accent text-xs block font-mono mt-2">+44 (0) 20 7123 4567</span>
                    </div>
                  </div>

                  <div className="h-[1px] bg-white/[0.06]" />

                  {/* Sri Lanka */}
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-accent shrink-0 mt-0.5">
                      <MapPin className="w-5 h-5" aria-hidden="true" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="text-white text-sm font-bold">Sri Lanka Delivery Hub</h4>
                        <span className="px-2 py-0.5 rounded text-[9px] font-mono bg-white/[0.04] text-white/50">LK-CPB: 18ms</span>
                      </div>
                      <span className="text-white/50 text-xs block leading-relaxed mt-1 font-light">
                        Level 26, East Tower, World Trade Center, Colombo 00100
                      </span>
                      <span className="text-accent text-xs block font-mono mt-2">+94 (0) 11 234 5678</span>
                    </div>
                  </div>

                </div>
              </div>

              {/* Machined Map & Connectivity Mockup */}
              <div className="rounded-[2.25rem] p-[1px] bg-gradient-to-b from-white/[0.12] via-white/[0.03] to-transparent ring-1 ring-white/[0.06]">
                <div className="rounded-[calc(2.25rem-1px)] bg-[#040812]/95 p-8 relative overflow-hidden backdrop-blur-xl flex flex-col items-center text-center">
                  <div className="w-12 h-12 rounded-2xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-accent mb-4">
                    <Globe className="w-6 h-6 animate-pulse" aria-hidden="true" />
                  </div>
                  <strong className="text-white text-sm block font-bold mb-1">Dual-Region Collaborative Bridge</strong>
                  <p className="text-white/40 text-xs max-w-xs leading-relaxed font-light">
                    Clients enjoy direct London commercial governance combined with Colombo engineering velocity and high cost-efficiency.
                  </p>
                </div>
              </div>

            </ScrollAnimate>

          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
