'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Mail, Phone, MapPin, Linkedin, Github, Twitter, ExternalLink } from 'lucide-react';
import ScrollAnimate from './ScrollAnimate';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer id="main-footer" role="contentinfo" className="relative bg-black border-t border-white/5 pt-20 pb-10 overflow-hidden z-10">
      {/* Footer Ambient Background Glow */}
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-primary/5 rounded-full filter blur-[100px] pointer-events-none" aria-hidden="true" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">

          {/* Column 1: Brand & Bio */}
          <ScrollAnimate variant="fadeUp" delay={0}>
            <div className="flex flex-col gap-6">
              <Link href="/" className="flex items-center gap-2 group">
                <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-primary via-accent to-mint p-[1.5px]">
                  <div className="w-full h-full overflow-hidden bg-white rounded-[10px] flex items-center justify-center p-1">
                    <Image
                      src="/EdGrow%20Logo.png"
                      alt="Edgrow Technologies logo"
                      width={40}
                      height={40}
                      className="h-full w-full object-contain"
                    />
                  </div>
                </div>
                <div className="flex flex-col">
                  <span className="text-xl font-extrabold tracking-tight bg-gradient-to-r from-white to-accent bg-clip-text text-transparent">
                    Edgrow
                  </span>
                  <span className="text-[10px] text-gray-400 font-medium tracking-widest -mt-1 uppercase">
                    Technologies
                  </span>
                </div>
              </Link>

              <p className="text-gray-400 text-sm leading-relaxed">
                We engineer world-class cloud architectures, Next.js web applications, and custom enterprise databases that drive substantial global growth.
              </p>

              <div className="flex items-center gap-4">
                <a href="https://linkedin.com" target="_blank" rel="noreferrer" aria-label="Edgrow LinkedIn page" className="w-9 h-9 rounded-lg bg-white/5 flex items-center justify-center text-gray-400 hover:text-accent hover:bg-white/10 transition-all duration-300">
                  <Linkedin className="w-4 h-4" aria-hidden="true" />
                </a>
                <a href="https://github.com" target="_blank" rel="noreferrer" aria-label="Edgrow GitHub page" className="w-9 h-9 rounded-lg bg-white/5 flex items-center justify-center text-gray-400 hover:text-accent hover:bg-white/10 transition-all duration-300">
                  <Github className="w-4 h-4" aria-hidden="true" />
                </a>
                <a href="https://twitter.com" target="_blank" rel="noreferrer" aria-label="Edgrow Twitter page" className="w-9 h-9 rounded-lg bg-white/5 flex items-center justify-center text-gray-400 hover:text-accent hover:bg-white/10 transition-all duration-300">
                  <Twitter className="w-4 h-4" aria-hidden="true" />
                </a>
              </div>
            </div>
          </ScrollAnimate>

          {/* Column 2: Quick Links */}
          <ScrollAnimate variant="fadeUp" delay={0.1}>
            <div className="flex flex-col gap-5">
              <h4 className="text-white text-sm font-bold uppercase tracking-wider">Solutions</h4>
              <nav aria-label="Footer solutions links">
                <ul className="flex flex-col gap-3">
                  <li>
                    <Link href="/services" className="text-gray-400 hover:text-accent text-sm transition-colors duration-200">
                      Custom Software Development
                    </Link>
                  </li>
                  <li>
                    <Link href="/services" className="text-gray-400 hover:text-accent text-sm transition-colors duration-200">
                      High-Performance Web Apps
                    </Link>
                  </li>
                  <li>
                    <Link href="/services" className="text-gray-400 hover:text-accent text-sm transition-colors duration-200">
                      E-commerce Optimization
                    </Link>
                  </li>
                  <li>
                    <Link href="/services" className="text-gray-400 hover:text-accent text-sm transition-colors duration-200">
                      UI/UX Design Systems
                    </Link>
                  </li>
                  <li>
                    <Link href="/services" className="text-gray-400 hover:text-accent text-sm transition-colors duration-200">
                      SEO & Search Auditing
                    </Link>
                  </li>
                </ul>
              </nav>
            </div>
          </ScrollAnimate>

          {/* Column 3: Corporate Locations */}
          <ScrollAnimate variant="fadeUp" delay={0.2}>
            <div className="flex flex-col gap-5">
              <h4 className="text-white text-sm font-bold uppercase tracking-wider">Our Offices</h4>
              <div className="flex flex-col gap-4 text-sm text-gray-400">

                {/* United Kingdom */}
                <div className="flex gap-3">
                  <MapPin className="w-5 h-5 text-accent shrink-0 mt-0.5" aria-hidden="true" />
                  <div>
                    <strong className="text-white block font-medium">United Kingdom</strong>
                    <span>85 Great Portland Street, First Floor, London, W1W 7LT</span>
                  </div>
                </div>

                {/* Sri Lanka */}
                <div className="flex gap-3">
                  <MapPin className="w-5 h-5 text-mint shrink-0 mt-0.5" aria-hidden="true" />
                  <div>
                    <strong className="text-white block font-medium">Sri Lanka</strong>
                    <span>Level 26, East Tower, World Trade Center, Colombo 00100</span>
                  </div>
                </div>

              </div>
            </div>
          </ScrollAnimate>

          {/* Column 4: Newsletter Sign Up */}
          <ScrollAnimate variant="fadeUp" delay={0.3}>
            <div className="flex flex-col gap-5">
              <h4 className="text-white text-sm font-bold uppercase tracking-wider">Stay Updated</h4>
              <p className="text-gray-400 text-sm leading-relaxed">
                Subscribe to receive technical guides, web development secrets, and business insights.
              </p>
              <form onSubmit={(e) => { e.preventDefault(); alert('Subscribed successfully!'); }} className="flex gap-2">
                <label htmlFor="footer-email" className="sr-only">Email address</label>
                <input
                  id="footer-email"
                  type="email"
                  placeholder="you@company.com"
                  required
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-accent transition-colors"
                />
                <button
                  type="submit"
                  className="bg-accent hover:bg-mint text-black font-semibold rounded-xl px-4 py-2.5 transition-colors duration-200"
                >
                  Join
                </button>
              </form>
            </div>
          </ScrollAnimate>

        </div>

        <div className="h-[1px] bg-white/5 my-8" aria-hidden="true" />

        <ScrollAnimate variant="fadeUp" delay={0.15}>
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-gray-500">
            <div>
              &copy; {currentYear} Edgrow Technologies. All rights reserved. Registered in Sri Lanka & UK.
            </div>
            <nav aria-label="Legal links">
              <div className="flex items-center gap-6">
                <Link href="/legal/privacy" className="hover:text-gray-300 transition-colors">Privacy Policy</Link>
                <Link href="/legal/terms" className="hover:text-gray-300 transition-colors">Terms of Service</Link>
                <Link href="/legal/cookies" className="hover:text-gray-300 transition-colors">Cookie Policy</Link>
              </div>
            </nav>
          </div>
        </ScrollAnimate>
      </div>
    </footer>
  );
}
