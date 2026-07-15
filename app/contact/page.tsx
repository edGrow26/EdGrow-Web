'use client';

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Sparkles, Send, Mail, Phone, MapPin, CheckCircle2, User, HelpCircle } from 'lucide-react';

import BackgroundWaves from '../../components/BackgroundWaves';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import ScrollAnimate from '../../components/ScrollAnimate';
import { sanityClient } from '../../lib/sanity';

export default function ContactPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) return;

    setSubmitting(true);
    const sent = await sanityClient.submitContactForm({ name, email, subject, message });
    if (sent) {
      setSuccess(true);
      setName('');
      setEmail('');
      setSubject('');
      setMessage('');
    }
    setSubmitting(false);
  };

  return (
    <div className="relative min-h-screen bg-black text-white overflow-x-hidden">
      <BackgroundWaves />
      <Navbar />

      {/* Contact Header Banner */}
      <section className="relative pt-32 pb-12 md:pt-40 md:pb-20 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs text-accent font-medium tracking-wide mb-6"
          >
            <Sparkles className="w-3.5 h-3.5 text-mint" aria-hidden="true" />
            <span>Schedule a Complementary Engineering Consultation</span>
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight leading-[1.1] mb-6"
          >
            Get In{' '}
            <span className="bg-gradient-to-r from-primary via-accent to-mint bg-clip-text text-transparent">
              Touch With Us
            </span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-gray-400 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed"
          >
            Connect directly with our corporate development teams in Colombo or London. Complete the form below to receive a response within 1 business day.
          </motion.p>
        </div>
      </section>

      {/* Main Content Layout */}
      <section className="pb-32 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
            
            {/* Left Column: Form Inquiry */}
            <ScrollAnimate variant="slideRight" className="lg:col-span-7">
              <div className="glass-panel p-6 sm:p-10 rounded-3xl border border-white/5 relative">
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full filter blur-2xl pointer-events-none" aria-hidden="true" />
                
                <h3 className="text-xl font-bold text-white mb-2">Send Us a Secure Message</h3>
                <p className="text-xs text-gray-400 mb-8">Our architects will review your custom requests and file proposals.</p>

                {success ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="py-12 px-6 text-center bg-accent/5 border border-accent/20 rounded-2xl flex flex-col items-center gap-4"
                  >
                    <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center text-accent">
                      <CheckCircle2 className="w-6 h-6" aria-hidden="true" />
                    </div>
                    <h4 className="text-lg font-extrabold text-white">Inquiry Recorded Successfully</h4>
                    <p className="text-gray-300 text-xs sm:text-sm max-w-md leading-relaxed mx-auto">
                      Thank you for contacting Edgrow Technologies. Your client record has been generated and dispatched to our dual-region consultancy pipeline.
                    </p>
                    <button
                      onClick={() => setSuccess(false)}
                      className="mt-4 px-5 py-2.5 bg-white/5 hover:bg-white/10 rounded-xl text-xs font-bold text-gray-400 hover:text-white transition-colors"
                    >
                      Send Another Inquiry
                    </button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                    
                    {/* Name */}
                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="contact-name" className="text-[10px] font-bold text-gray-400 uppercase tracking-widest flex items-center gap-1.5">
                        <User className="w-3.5 h-3.5 text-accent" aria-hidden="true" /> Full Name
                      </label>
                      <input
                        id="contact-name"
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Kanishka Bandara"
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-xs focus:outline-none focus:border-accent transition-colors"
                      />
                    </div>

                    {/* Email */}
                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="contact-email" className="text-[10px] font-bold text-gray-400 uppercase tracking-widest flex items-center gap-1.5">
                        <Mail className="w-3.5 h-3.5 text-accent" aria-hidden="true" /> Email Address
                      </label>
                      <input
                        id="contact-email"
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="kanishka@company.com"
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-xs focus:outline-none focus:border-accent transition-colors"
                      />
                    </div>

                    {/* Subject */}
                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="contact-subject" className="text-[10px] font-bold text-gray-400 uppercase tracking-widest flex items-center gap-1.5">
                        <HelpCircle className="w-3.5 h-3.5 text-accent" aria-hidden="true" /> Subject of Inquiry
                      </label>
                      <input
                        id="contact-subject"
                        type="text"
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        placeholder="Custom E-learning ERP Platform Build"
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-xs focus:outline-none focus:border-accent transition-colors"
                      />
                    </div>

                    {/* Message */}
                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="contact-message" className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block">
                        Detailed Project Description
                      </label>
                      <textarea
                        id="contact-message"
                        rows={5}
                        required
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Outline your database constraints, timeline density, and page output targets..."
                        className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-xs focus:outline-none focus:border-accent transition-colors resize-none"
                      />
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={submitting}
                      className="w-full py-4 bg-gradient-to-r from-accent to-mint hover:bg-gradient-to-r hover:from-mint hover:to-accent text-black font-bold text-xs rounded-xl shadow-lg transition-all duration-300 flex items-center justify-center gap-2"
                    >
                      {submitting ? (
                        <>
                          <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" aria-hidden="true" /> Recording message...
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4" aria-hidden="true" /> Dispatch Message
                        </>
                      )}
                    </button>

                  </form>
                )}

              </div>
            </ScrollAnimate>

            {/* Right Column: Address locators and Maps mockup */}
            <ScrollAnimate variant="slideLeft" delay={0.15} className="lg:col-span-5 flex flex-col gap-8">
              
              {/* Dual Location Cards */}
              <div className="p-8 rounded-2xl bg-white/[0.01] border border-white/5 flex flex-col gap-8 relative overflow-hidden">
                <div className="absolute bottom-0 right-0 w-32 h-32 bg-mint/5 rounded-full filter blur-2xl pointer-events-none" aria-hidden="true" />
                
                <h3 className="text-sm font-bold text-gray-300 uppercase tracking-widest">Our Operations Hubs</h3>
                
                {/* UK */}
                <div className="flex gap-4">
                  <MapPin className="w-6 h-6 text-accent shrink-0 mt-0.5" aria-hidden="true" />
                  <div>
                    <h4 className="text-white text-sm font-bold">United Kingdom (HQ)</h4>
                    <span className="text-gray-400 text-xs block leading-relaxed mt-1">
                      85 Great Portland Street, First Floor, London, W1W 7LT
                    </span>
                    <span className="text-gray-500 text-[11px] block font-mono mt-1">+44 (0) 20 7123 4567</span>
                  </div>
                </div>

                {/* Sri Lanka */}
                <div className="flex gap-4">
                  <MapPin className="w-6 h-6 text-mint shrink-0 mt-0.5" aria-hidden="true" />
                  <div>
                    <h4 className="text-white text-sm font-bold">Sri Lanka Delivery Hub</h4>
                    <span className="text-gray-400 text-xs block leading-relaxed mt-1">
                      Level 26, East Tower, World Trade Center, Colombo 00100
                    </span>
                    <span className="text-gray-500 text-[11px] block font-mono mt-1">+94 (0) 11 234 5678</span>
                  </div>
                </div>

              </div>

              {/* Mock Map Viewport */}
              <div className="relative rounded-2xl overflow-hidden border border-white/5 aspect-video bg-white/[0.02]">
                {/* Custom minimalist dark map illustration */}
                <div className="absolute inset-0 bg-black flex flex-col items-center justify-center p-6 text-center">
                  <div className="w-10 h-10 bg-accent/10 rounded-full flex items-center justify-center text-accent mb-4">
                    <MapPin className="w-5 h-5 animate-bounce" aria-hidden="true" />
                  </div>
                  <strong className="text-white text-xs block font-bold mb-1">Interactive Colombo-London Map</strong>
                  <span className="text-gray-500 text-[10px] max-w-xs leading-normal">
                    Secure coordinates and driving route maps are simulated for corporate visitors.
                  </span>
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
