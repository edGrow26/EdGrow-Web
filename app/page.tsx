'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'motion/react';
import {
  ArrowRight,
  ArrowUpRight,
  Code,
  Cpu,
  ShoppingBag,
  Layers,
  TrendingUp,
  Sparkles,
  Users,
  CheckCircle,
  CheckCircle2,
  Globe,
  ChevronRight,
  MapPin,
  ExternalLink,
  MessageSquare,
  Award,
  Loader2,
  ShieldCheck,
  Zap,
  Building2,
  Gauge
} from 'lucide-react';

import BackgroundWaves from '../components/BackgroundWaves';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import CookieConsent from '../components/CookieConsent';
import ScrollAnimate from '../components/ScrollAnimate';
import AnimatedCounter from '../components/AnimatedCounter';
import TestimonialCarousel from '../components/TestimonialCarousel';
import HeroEngineeringConsole from '../components/HeroEngineeringConsole';
import { sanityClient, Service, Project, Testimonial } from '../lib/sanity';

export default function Home() {
  const [services, setServices] = useState<Service[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Load dynamic data from Sanity engine
    const loadData = async () => {
      setIsLoading(true);
      const s = await sanityClient.getServices();
      const p = await sanityClient.getProjects();
      const t = await sanityClient.getTestimonials();

      // Ensure 'custom-web' or 'web' (Web Development) is in the middle (index 1) for the home page layout
      const topServices = [...s];
      const webDevIndex = topServices.findIndex(
        (service) =>
          service.id === 'custom-web' ||
          service.id === 'web' ||
          service.title.toLowerCase().includes('web development')
      );
      if (webDevIndex !== -1) {
        const [webService] = topServices.splice(webDevIndex, 1);
        topServices.splice(1, 0, webService); // insert at index 1
      }
      setServices(topServices.slice(0, 3)); // Only show top 3 on home page
      setProjects(p.slice(0, 3));
      setTestimonials(t);
      setIsLoading(false);
    };
    loadData();
  }, []);

  return (
    <div className="relative min-h-screen bg-black text-white overflow-x-hidden selection:bg-accent selection:text-black">
      {/* Background Ambience Layer */}
      <BackgroundWaves />

      {/* Modern Ambient Radial Glows */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden z-0" aria-hidden="true">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[1000px] h-[550px] bg-[radial-gradient(ellipse_at_center,rgba(0,102,214,0.18),rgba(0,191,165,0.08)_45%,transparent_70%)] blur-3xl" />
        <div className="absolute top-[800px] left-[-150px] w-[500px] h-[500px] bg-primary/10 rounded-full blur-[140px]" />
        <div className="absolute top-[1600px] right-[-150px] w-[500px] h-[500px] bg-accent/10 rounded-full blur-[140px]" />
      </div>

      <Navbar />

      {/* 1. HERO SECTION */}
      <section id="hero" className="relative pt-32 pb-24 md:pt-44 md:pb-32 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto flex flex-col items-center">

            {/* Precision Eyebrow Badge with Live Pulse */}
            <div
              className="hero-badge inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/[0.05] border border-white/10 text-xs text-accent font-medium tracking-wide mb-8 shadow-[0_4px_20px_rgba(0,191,165,0.12)] backdrop-blur-md"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-mint opacity-80" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-mint" />
              </span>
              <span className="font-mono text-[11px] uppercase tracking-wider text-slate-200">
                Sri Lanka HQ · UK Strategy &amp; Delivery Network
              </span>
            </div>

            {/* Display Headline */}
            <h1
<<<<<<< Updated upstream
              className="hero-title opacity-0 text-4xl sm:text-5xl md:text-6xl font-black tracking-tight leading-[1.1] mb-6"
            >
              We Engineer High-Performance{' '}
              <span className="bg-gradient-to-r from-primary via-accent to-mint bg-clip-text text-transparent">
                Web & Software Architectures
              </span>
            </h1>

            {/* Subheading with naturally placed SEO keywords */}
            <p
              className="hero-text opacity-0 text-gray-400 text-lg sm:text-xl max-w-2xl leading-relaxed mb-10"
=======
              className="hero-title text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-[-0.035em] leading-[1.08] mb-6 text-balance text-white"
>>>>>>> Stashed changes
            >
              Web &amp; Software Development Company{' '}
              <span className="bg-gradient-to-r from-primary via-accent to-mint bg-clip-text text-transparent">
                Building High-Performance Digital Solutions
              </span>
            </h1>

            {/* Subheading */}
            <p
              className="hero-text text-slate-400 text-base sm:text-lg md:text-xl max-w-2xl leading-relaxed mb-10 text-balance"
            >
              Edgrow Technologies engineers bespoke enterprise software, high-speed Next.js web applications, and precision SEO architectures for ambitious brands in Sri Lanka, the UK, and global markets.
            </p>

            {/* CTAs with Button-in-Button Nested Icon Architecture */}
            <div
              className="hero-ctas flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 w-full sm:w-auto"
            >
              <Link
                href="/contact"
                className="btn-premium-pill w-full sm:w-auto group"
              >
                <span>Schedule Free Architecture Audit</span>
                <span className="btn-icon-wrapper" aria-hidden="true">
                  <ArrowUpRight className="w-4 h-4 text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </span>
              </Link>
              <Link
                href="/portfolio"
                className="btn-secondary-pill w-full sm:w-auto group"
              >
                <span>Explore Case Studies</span>
                <span className="btn-icon-wrapper" aria-hidden="true">
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </span>
              </Link>
            </div>

            {/* Interactive Engineering Console & Architecture HUD */}
            <HeroEngineeringConsole />

          </div>
        </div>
      </section>

      {/* 2. STATS SECTION (Machined Metric Rail) */}
      <section id="stats" className="py-14 relative z-10 border-y border-white/10 bg-[#030914]/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6 items-center">

            <ScrollAnimate variant="fadeUp" delay={0}>
              <div className="stats-item flex flex-col gap-1.5 p-4 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-white/10 transition-colors">
                <div className="flex items-center gap-2 mb-1">
                  <span className="h-2 w-2 rounded-full bg-primary" />
                  <span className="text-[11px] font-mono uppercase tracking-widest text-slate-400">Track Record</span>
                </div>
                <span className="text-4xl sm:text-5xl font-black text-white font-mono tracking-tight tabular-nums">
                  <AnimatedCounter from={0} to={1} duration={2} />+
                </span>
                <span className="text-slate-300 text-xs font-semibold uppercase tracking-wider">Years of Engineering Excellence</span>
                <span className="text-[11px] text-primary font-mono mt-0.5">100% Client Retention Rate</span>
              </div>
            </ScrollAnimate>

            <ScrollAnimate variant="fadeUp" delay={0.1}>
              <div className="stats-item flex flex-col gap-1.5 p-4 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-white/10 transition-colors">
                <div className="flex items-center gap-2 mb-1">
                  <span className="h-2 w-2 rounded-full bg-accent" />
                  <span className="text-[11px] font-mono uppercase tracking-widest text-slate-400">Velocity</span>
                </div>
                <span className="text-4xl sm:text-5xl font-black text-white font-mono tracking-tight tabular-nums">
                  <AnimatedCounter from={0} to={20} duration={2.5} />+
                </span>
                <span className="text-slate-300 text-xs font-semibold uppercase tracking-wider">Custom Systems Dispatched</span>
                <span className="text-[11px] text-accent font-mono mt-0.5">Dual-Region Enterprise Deployments</span>
              </div>
            </ScrollAnimate>

            <ScrollAnimate variant="fadeUp" delay={0.2}>
              <div className="stats-item flex flex-col gap-1.5 p-4 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-white/10 transition-colors">
                <div className="flex items-center gap-2 mb-1">
                  <span className="h-2 w-2 rounded-full bg-mint" />
                  <span className="text-[11px] font-mono uppercase tracking-widest text-slate-400">Satisfaction</span>
                </div>
                <span className="text-4xl sm:text-5xl font-black text-white font-mono tracking-tight tabular-nums">
                  <AnimatedCounter from={0} to={98} duration={2} />%
                </span>
                <span className="text-slate-300 text-xs font-semibold uppercase tracking-wider">Client Net Promoter Score (NPS)</span>
                <span className="text-[11px] text-mint font-mono mt-0.5">Tier-1 Technical Velocity &amp; SLAs</span>
              </div>
            </ScrollAnimate>

            <ScrollAnimate variant="fadeUp" delay={0.3}>
              <div className="stats-item flex flex-col gap-1.5 p-4 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-white/10 transition-colors">
                <div className="flex items-center gap-2 mb-1">
                  <span className="h-2 w-2 rounded-full bg-emerald-400" />
                  <span className="text-[11px] font-mono uppercase tracking-widest text-slate-400">Speed Benchmark</span>
                </div>
                <span className="text-4xl sm:text-5xl font-black text-white font-mono tracking-tight tabular-nums">
                  0.6<span className="text-2xl text-emerald-400">s</span>
                </span>
                <span className="text-slate-300 text-xs font-semibold uppercase tracking-wider">Average P95 Edge LCP</span>
                <span className="text-[11px] text-emerald-400 font-mono mt-0.5">Google Lighthouse 100/100</span>
              </div>
            </ScrollAnimate>

          </div>
        </div>
      </section>

      {/* 3. SERVICES OVERVIEW (Asymmetrical Bento with Double-Bezel Framing) */}
      <section id="services-preview" className="py-32 relative z-10 overflow-hidden">
        {/* Subtle background ambient glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-primary/[0.04] rounded-full filter blur-[150px] pointer-events-none" aria-hidden="true" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <ScrollAnimate variant="slideRight">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-6">
              <div className="max-w-2xl">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent text-[11px] font-mono uppercase tracking-widest mb-4">
                  <Layers className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>Enterprise Capabilities</span>
                </div>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-tight">
                  Our Suite of Custom Software &amp; Web Development Services
                </h2>
              </div>
              <Link
                href="/services"
                className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-accent hover:text-mint transition-colors group bg-white/5 border border-white/10 px-5 py-3 rounded-full backdrop-blur-sm hover:border-accent/40 shrink-0"
              >
                <span>View All Services</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
              </Link>
            </div>
          </ScrollAnimate>

          {isLoading ? (
            <div className="flex justify-center items-center py-20">
              <Loader2 className="w-10 h-10 text-accent animate-spin" />
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch pt-4">
              {services.map((service, index) => {
                const titleLow = service.title.toLowerCase();
                const IconComponent =
                  titleLow.includes('web') ? Code :
                  titleLow.includes('software') ? Cpu :
                  titleLow.includes('ecommerce') || titleLow.includes('e-commerce') ? ShoppingBag :
                  titleLow.includes('analytics') || titleLow.includes('data') ? TrendingUp :
                  Code;

                // Asymmetrical styling: Highlight the middle element (Web Development)
                const isMiddle = index === 1;

                return (
                  <ScrollAnimate
                    key={service.id}
                    variant={isMiddle ? 'scaleIn' : (index % 2 === 0 ? 'slideRight' : 'slideLeft')}
                    delay={index * 0.12}
                  >
                    {/* Double-Bezel (Doppelrand) Outer Shell */}
                    <div
                      className={`relative rounded-[2rem] p-1.5 transition-all duration-500 h-full flex flex-col ${
                        isMiddle
                          ? 'bg-gradient-to-b from-accent/30 via-primary/20 to-transparent ring-1 ring-accent/40 shadow-[0_20px_60px_rgba(0,191,165,0.15)] lg:scale-[1.03] lg:-translate-y-2'
                          : 'bg-gradient-to-b from-white/10 via-white/[0.02] to-transparent ring-1 ring-white/10 hover:ring-white/20 hover:-translate-y-1 shadow-xl'
                      }`}
                    >
                      {/* Inner Core Card */}
                      <div className="relative rounded-[calc(2rem-6px)] p-8 sm:p-9 flex flex-col justify-between h-full bg-[#050b14]/95 border border-white/5 overflow-hidden group">

                        {/* Top decorative badge for Core Competency */}
                        {isMiddle && (
                          <div className="absolute top-5 right-5 bg-gradient-to-r from-accent/20 to-mint/20 border border-accent/30 text-accent text-[10px] font-mono uppercase font-bold tracking-widest px-3 py-1 rounded-full shadow-sm">
                            Core Competency
                          </div>
                        )}

                        <div>
                          {/* Machined Squircle Icon Wrapper */}
                          <div
                            className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-8 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6 ${
                              isMiddle
                                ? 'bg-gradient-to-br from-accent/20 to-primary/20 text-accent ring-1 ring-accent/30 shadow-[0_0_20px_rgba(0,191,165,0.25)]'
                                : 'bg-white/5 text-slate-300 group-hover:bg-accent/15 group-hover:text-accent ring-1 ring-white/10'
                            }`}
                          >
                            <IconComponent className="w-6 h-6" aria-hidden="true" />
                          </div>

                          <h3 className="text-xl sm:text-2xl font-black text-white mb-3 tracking-tight group-hover:text-accent transition-colors">
                            {service.title}
                          </h3>

                          <p className="text-slate-400 text-xs sm:text-sm leading-relaxed mb-8 group-hover:text-slate-300 transition-colors">
                            {service.shortDescription}
                          </p>

                          {/* Feature checklist with checkmark tokens */}
                          <ul className="flex flex-col gap-3 mb-8">
                            {service.features.slice(0, 3).map((feat, i) => (
                              <li key={i} className="flex items-start gap-2.5 text-xs text-slate-300 font-medium">
                                <CheckCircle2 className="w-4 h-4 text-accent shrink-0 mt-0.5" aria-hidden="true" />
                                <span className="leading-snug">{feat}</span>
                              </li>
                            ))}
                          </ul>

                          {/* Tech Capability Tags */}
                          {service.technologies && service.technologies.length > 0 && (
                            <div className="flex flex-wrap gap-1.5 mb-8">
                              {service.technologies.slice(0, 3).map((tech) => (
                                <span
                                  key={tech}
                                  className="px-2.5 py-1 rounded-md bg-white/[0.03] border border-white/5 font-mono text-[10px] text-slate-400"
                                >
                                  {tech}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>

                        {/* Bottom action link */}
                        <div className="pt-5 border-t border-white/5 mt-auto">
                          <Link
                            href={`/services#${service.id}`}
                            className="inline-flex items-center gap-2 text-xs font-bold text-slate-300 group-hover:text-accent transition-colors"
                          >
                            <span>Examine Service Specification</span>
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" aria-hidden="true" />
                          </Link>
                        </div>

                      </div>
                    </div>
                  </ScrollAnimate>
                );
              })}
            </div>
          )}

        </div>
      </section>

      {/* 4. FEATURED PORTFOLIO (Doppelrand Case Studies) */}
      <section id="portfolio-preview" data-no-scroll-animation="true" className="py-32 relative z-10 border-t border-white/10 bg-[#030812]/50 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <ScrollAnimate variant="slideLeft">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-6">
              <div className="max-w-2xl">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-mint/10 border border-mint/20 text-mint text-[11px] font-mono uppercase tracking-widest mb-4">
                  <Sparkles className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>Proven Deliveries</span>
                </div>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-tight">
                  Case Studies of High-Performance Systems We Built
                </h2>
              </div>
              <Link
                href="/portfolio"
                className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-accent hover:text-mint transition-colors group bg-white/5 border border-white/10 px-5 py-3 rounded-full backdrop-blur-sm hover:border-accent/40 shrink-0"
              >
                <span>See All Projects</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
              </Link>
            </div>
          </ScrollAnimate>

          {isLoading ? (
            <div className="flex justify-center items-center py-20">
              <Loader2 className="w-10 h-10 text-accent animate-spin" />
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 pt-4">
              {projects.map((project, index) => {
                const isMiddle = index === 1;
                return (
                  <ScrollAnimate
                    key={project.id}
                    variant={isMiddle ? 'scaleIn' : (index % 2 === 0 ? 'slideRight' : 'slideLeft')}
                    delay={index * 0.12}
                  >
                    {/* Doppelrand Bezel Shell */}
                    <div className="rounded-[2rem] p-1.5 bg-gradient-to-b from-white/10 via-white/[0.02] to-transparent ring-1 ring-white/10 hover:ring-accent/40 transition-all duration-500 hover:-translate-y-2 shadow-xl group h-full">
                      <Link
                        href={project.projectLink || `/portfolio/${project.id}`}
                        {...(project.projectLink ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                        aria-label={`View case study: ${project.title}`}
                        className="portfolio-showcase-card block h-full rounded-[calc(2rem-6px)] bg-[#07111f] border border-white/5 overflow-hidden flex flex-col justify-between"
                      >
                        {/* Dedicated image preview */}
                        <div className="relative h-56 sm:h-64 overflow-hidden">
                          <img
                            src={project.mainImage}
                            alt={project.title}
                            crossOrigin="anonymous"
                            loading="lazy"
                            decoding="async"
                            className="h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-[#07111f] via-transparent to-black/20" aria-hidden="true" />
                          <span className="absolute left-5 top-5 rounded-full border border-white/20 bg-black/70 px-3.5 py-1 text-[10px] font-mono font-bold uppercase tracking-widest text-[#5fffe0] backdrop-blur-md">
                            {project.category}
                          </span>
                        </div>

                        {/* Content Panel */}
                        <div className="flex flex-col gap-4 p-6 sm:p-7 flex-1 justify-between">
                          <div>
                            <span className="portfolio-card-meta mb-2 block text-[11px] font-mono font-bold uppercase tracking-[0.16em]">
                              {project.industry}
                            </span>
                            <h3 className="portfolio-card-title mb-2.5 text-xl font-extrabold leading-snug transition-colors duration-300 group-hover:text-[#5fffe0]">
                              {project.title}
                            </h3>
                            <p className="portfolio-card-copy line-clamp-3 text-xs sm:text-sm leading-relaxed text-slate-300">
                              {project.description}
                            </p>
                          </div>

                          <div className="flex flex-wrap gap-1.5 pt-2">
                            {project.technologies.slice(0, 3).map((tech) => (
                              <span
                                key={tech}
                                className="portfolio-card-chip rounded-lg border border-slate-700/60 bg-slate-800/80 px-2.5 py-1 font-mono text-[10px] font-bold"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>

                          <div className="mt-4 flex items-center justify-end border-t border-white/10 pt-4">
                            <span className="portfolio-card-action inline-flex items-center gap-1.5 text-xs font-bold transition-colors">
                              <span>Examine Case</span>
                              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                            </span>
                          </div>
                        </div>
                      </Link>
                    </div>
                  </ScrollAnimate>
                );
              })}
            </div>
          )}

        </div>
      </section>

      {/* 5. TESTIMONIALS & TRUST (Modernized: NO dated wave dividers, dark luxury gradient) */}
      <section
        id="testimonials"
        data-no-scroll-animation="true"
        className="py-32 relative z-10 bg-gradient-to-b from-[#02070d] via-[#041612] to-[#02070d] text-white border-y border-white/10 overflow-hidden"
      >
        {/* Ambient Top Light Beam */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-[radial-gradient(ellipse_at_top,rgba(0,191,165,0.18),transparent_70%)] pointer-events-none"
          aria-hidden="true"
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
          <div className="mx-auto mb-16 max-w-4xl text-center flex flex-col items-center">
            
            {/* Verified Outcomes Badge */}
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-1.5 text-[11px] font-mono font-bold uppercase tracking-[0.2em] text-mint shadow-md backdrop-blur-md">
              <Award className="h-4 w-4 text-mint" aria-hidden="true" />
              <span>Verified Client Outcomes</span>
            </div>

            <h2 className="font-sans text-4xl sm:text-5xl md:text-6xl font-black leading-[1.05] tracking-[-0.035em] mb-4 text-balance">
              Real partnerships.{' '}
              <span className="bg-gradient-to-r from-mint via-accent to-[#5fffe0] bg-clip-text text-transparent">
                Results clients remember.
              </span>
            </h2>

            <p className="mx-auto max-w-2xl text-sm sm:text-base leading-relaxed text-slate-300 text-balance mb-6">
              Honest feedback from the engineering teams and business founders who trusted Edgrow to transform complex vision into world-class digital products.
            </p>

            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-black/40 border border-white/10" aria-label="Five-star client feedback">
              <span className="text-base tracking-[0.2em] text-[#f5b301]" aria-hidden="true">★★★★★</span>
              <span className="text-[11px] font-mono uppercase tracking-wider text-slate-300">
                Built on trust · Proven through delivery
              </span>
            </div>
          </div>

          {isLoading ? (
            <div className="flex justify-center items-center py-20">
              <Loader2 className="w-10 h-10 text-accent animate-spin" />
            </div>
          ) : (
            <TestimonialCarousel testimonials={testimonials} />
          )}
        </div>
      </section>

      {/* 6. CALL TO ACTION (Executive Command Center Card) */}
      <section id="cta" className="py-32 relative z-10">
        <ScrollAnimate variant="scaleIn">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            
            {/* Double-Bezel Command Center Container */}
            <div className="relative rounded-[2.5rem] p-2 bg-gradient-to-b from-white/15 via-white/[0.03] to-transparent ring-1 ring-white/15 shadow-[0_40px_120px_rgba(0,102,214,0.18)] backdrop-blur-2xl overflow-hidden">
              
              {/* Internal decorative radial illumination */}
              <div className="absolute top-0 right-0 w-[450px] h-[300px] bg-gradient-to-bl from-accent/20 via-primary/10 to-transparent blur-3xl pointer-events-none" aria-hidden="true" />
              <div className="absolute bottom-0 left-0 w-[450px] h-[300px] bg-gradient-to-tr from-mint/15 via-accent/10 to-transparent blur-3xl pointer-events-none" aria-hidden="true" />

              <div className="relative rounded-[calc(2.5rem-8px)] p-10 sm:p-16 md:p-20 bg-[#040915]/95 border border-white/10 text-center flex flex-col items-center">
                
                {/* Dual-Region Office Delivery Pills */}
                <div className="flex flex-wrap items-center justify-center gap-3 mb-8">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 text-[11px] font-mono text-slate-300">
                    <span className="w-2 h-2 rounded-full bg-mint animate-pulse" />
                    <span className="text-white font-bold">Colombo HQ:</span> UTC+5:30 Operations
                  </div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 text-[11px] font-mono text-slate-300">
                    <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                    <span className="text-white font-bold">London Hub:</span> UTC+0 Strategy &amp; SLAs
                  </div>
                </div>

                <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight leading-[1.1] mb-6 text-balance text-white max-w-3xl">
                  Ready to Engineer a Scalable Digital Presence?
                </h2>

                <p className="text-slate-300 text-sm sm:text-base md:text-lg max-w-2xl leading-relaxed mb-10 text-balance">
                  Connect with our technical consultants in Colombo or London today. Let&apos;s map out a customized architecture that accelerates delivery and maximizes market advantage.
                </p>

                {/* CTAs with Button-in-Button Nested Icon Architecture */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 w-full sm:w-auto">
                  <Link
                    href="/contact"
                    className="btn-premium-pill w-full sm:w-auto group"
                  >
                    <span>Get a Custom Proposal</span>
                    <span className="btn-icon-wrapper" aria-hidden="true">
                      <ArrowUpRight className="w-4 h-4 text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </span>
                  </Link>
                  <Link
                    href="/pricing"
                    className="btn-secondary-pill w-full sm:w-auto group"
                  >
                    <span>View Transparent Pricing Plans</span>
                    <span className="btn-icon-wrapper" aria-hidden="true">
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                    </span>
                  </Link>
                </div>

              </div>
            </div>

          </div>
        </ScrollAnimate>
      </section>

      <Footer />
      <CookieConsent />
    </div>
  );
}
