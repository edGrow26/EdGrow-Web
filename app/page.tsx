'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'motion/react';
import {
  ArrowRight,
  Code,
  Cpu,
  ShoppingBag,
  Layers,
  TrendingUp,
  Sparkles,
  Users,
  CheckCircle,
  Globe,
  ChevronRight,
  MapPin,
  ExternalLink,
  MessageSquare,
  Award
} from 'lucide-react';

import BackgroundWaves from '../components/BackgroundWaves';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import CookieConsent from '../components/CookieConsent';
import ScrollAnimate from '../components/ScrollAnimate';
import AnimatedCounter from '../components/AnimatedCounter';
import TestimonialCarousel from '../components/TestimonialCarousel';
import { sanityClient, Service, Project, Testimonial } from '../lib/sanity';

export default function Home() {
  const [services, setServices] = useState<Service[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);

  useEffect(() => {
    // Load dynamic data from Sanity engine
    const loadData = async () => {
      const s = await sanityClient.getServices();
      const p = await sanityClient.getProjects();
      const t = await sanityClient.getTestimonials();
      setServices(s.slice(0, 3)); // Only show top 3 on home page
      setProjects(p.slice(0, 3));
      setTestimonials(t);
    };
    loadData();
  }, []);

  return (
    <div className="relative min-h-screen bg-black text-white overflow-x-hidden">
      <BackgroundWaves />
      <Navbar />

      {/* 1. HERO SECTION */}
      <section id="hero" className="relative pt-32 pb-20 md:pt-40 md:pb-28 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto flex flex-col items-center">

            {/* Glow badge */}
            <div
              className="hero-badge inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs text-accent font-medium tracking-wide mb-8"
            >
              <Sparkles className="w-3.5 h-3.5 animate-pulse text-mint" aria-hidden="true" />
              <span>Sri Lanka + UK Dual-Region Delivery Network</span>
            </div>

            {/* Headline */}
            <h1
              className="hero-title text-4xl sm:text-5xl md:text-6xl font-black tracking-tight leading-[1.1] mb-6"
            >
              We Engineer High-Performance{' '}
              <span className="bg-gradient-to-r from-primary via-accent to-mint bg-clip-text text-transparent">
                Web & Software Architectures
              </span>
            </h1>

            {/* Subheading with naturally placed SEO keywords */}
            <p
              className="hero-text text-gray-400 text-lg sm:text-xl max-w-2xl leading-relaxed mb-10"
            >
              Edgrow Technologies delivers world-class custom software development, high-speed Next.js web applications, and SEO services for Sri Lanka, the UK, and global enterprises.
            </p>

            {/* CTA Buttons */}
            <div
              className="hero-ctas flex flex-col sm:flex-row items-center justify-center gap-6 w-full sm:w-auto"
            >
              <Link
                href="/contact"
                className="btn-premium-pill w-full sm:w-auto"
              >
                Schedule Free Architecture Audit
              </Link>
              <Link
                href="/portfolio"
                className="btn-secondary-pill w-full sm:w-auto flex items-center justify-center gap-2 group"
              >
                Explore Cases <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
              </Link>
            </div>

          </div>
        </div>
      </section>

      {/* 2. STATS SECTION */}
      <section id="stats" className="py-12 relative z-10 border-y border-white/5 bg-white/[0.01] backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">

            <ScrollAnimate variant="fadeUp" delay={0}>
              <div className="stats-item flex flex-col gap-1.5">
                <span className="text-4xl sm:text-5xl font-extrabold text-primary font-mono">
                  <AnimatedCounter from={0} to={8} duration={2} />+
                </span>
                <span className="text-gray-400 text-sm font-semibold uppercase tracking-wider">Years of Engineering Excellence</span>
              </div>
            </ScrollAnimate>

            <ScrollAnimate variant="fadeUp" delay={0.15}>
              <div className="stats-item flex flex-col gap-1.5 border-t sm:border-t-0 sm:border-x border-white/5 pt-8 sm:pt-0">
                <span className="text-4xl sm:text-5xl font-extrabold text-accent font-mono">
                  <AnimatedCounter from={0} to={120} duration={2.5} />+
                </span>
                <span className="text-gray-400 text-sm font-semibold uppercase tracking-wider">Custom Projects Dispatched</span>
              </div>
            </ScrollAnimate>

            <ScrollAnimate variant="fadeUp" delay={0.3}>
              <div className="stats-item flex flex-col gap-1.5 border-t sm:border-t-0 pt-8 sm:pt-0">
                <span className="text-4xl sm:text-5xl font-extrabold text-mint font-mono">
                  <AnimatedCounter from={0} to={95} duration={2} />%
                </span>
                <span className="text-gray-400 text-sm font-semibold uppercase tracking-wider">Client Net Promoter Score (NPS)</span>
              </div>
            </ScrollAnimate>

          </div>
        </div>
      </section>

      {/* 3. SERVICES OVERVIEW */}
      <section id="services-preview" className="py-28 relative z-10 overflow-hidden">
        {/* Decorative background ambient glows */}
        <div className="absolute -top-40 left-10 w-[500px] h-[500px] bg-primary/5 rounded-full filter blur-[120px] pointer-events-none" aria-hidden="true" />
        <div className="absolute -bottom-40 right-10 w-[500px] h-[500px] bg-accent/5 rounded-full filter blur-[120px] pointer-events-none" aria-hidden="true" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <ScrollAnimate variant="slideRight">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-20">
              <div className="max-w-2xl">
                <span className="text-xs font-bold text-accent uppercase tracking-widest block mb-3">Enterprise Solutions</span>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-tight">
                  Our Suite of Custom Software & Web Development Services
                </h2>
              </div>
              <Link
                href="/services"
                className="mt-6 md:mt-0 inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-accent hover:text-mint transition-colors group bg-white/5 border border-white/10 px-5 py-3 rounded-xl backdrop-blur-sm hover:border-accent/40"
              >
                View All Services <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
              </Link>
            </div>
          </ScrollAnimate>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch pt-4">
            {services.map((service, index) => {
              // Icon mapping helper
              const IconComponent =
                service.id === 'custom-web' ? Code :
                  service.id === 'enterprise-software' ? Cpu :
                    service.id === 'ecommerce-solutions' ? ShoppingBag : Code;

              // Asymmetrical Grid styling: highlight the middle element
              const isMiddle = index === 1;

              return (
                <ScrollAnimate
                  key={service.id}
                  variant={isMiddle ? 'scaleIn' : (index % 2 === 0 ? 'slideRight' : 'slideLeft')}
                  delay={index * 0.12}
                >
                  <div
                    className={`relative rounded-3xl p-8 sm:p-10 flex flex-col justify-between h-full transition-all duration-500 group border overflow-hidden ${isMiddle
                        ? 'bg-gradient-to-br from-primary/10 via-accent/5 to-white/[0.01] border-accent shadow-2xl shadow-primary/5 lg:scale-[1.03] lg:-translate-y-2'
                        : 'bg-white/[0.01] border-white/5 hover:border-white/15 hover:-translate-y-1 hover:shadow-xl hover:shadow-black/50'
                      }`}
                  >
                    {/* Background visual graphics lines */}
                    <div className="absolute inset-0 bg-grid-line-color opacity-25 group-hover:opacity-40 transition-opacity pointer-events-none" aria-hidden="true" />

                    {isMiddle && (
                      <div className="absolute top-4 right-4 bg-accent/20 border border-accent/20 text-accent text-[9px] font-mono uppercase font-bold tracking-widest px-2.5 py-1 rounded-md z-15">
                        Core Competency
                      </div>
                    )}

                    <div className="relative z-10">
                      {/* Animated circular icon wrapper */}
                      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-8 transition-transform duration-500 group-hover:rotate-12 ${isMiddle ? 'bg-accent/20 text-accent' : 'bg-primary/10 text-primary group-hover:bg-accent/15 group-hover:text-accent'
                        }`}>
                        <IconComponent className="w-6 h-6" aria-hidden="true" />
                      </div>

                      <h3 className="text-xl font-extrabold text-white mb-4 tracking-tight group-hover:text-accent transition-colors">
                        {service.title}
                      </h3>

                      <p className="text-gray-400 text-xs sm:text-sm leading-relaxed mb-8 group-hover:text-gray-300 transition-colors">
                        {service.shortDescription}
                      </p>

                      <ul className="flex flex-col gap-3 mb-10">
                        {service.features.slice(0, 3).map((feat, i) => (
                          <li key={i} className="flex items-start gap-2.5 text-xs text-gray-300 font-medium">
                            <CheckCircle className="w-4 h-4 text-accent shrink-0 mt-0.5" aria-hidden="true" />
                            <span className="leading-tight">{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <Link
                      href={`/services#${service.id}`}
                      className="relative z-10 inline-flex items-center gap-1.5 text-xs font-bold text-white group-hover:text-accent transition-colors mt-auto"
                    >
                      Examine Service <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
                    </Link>
                  </div>
                </ScrollAnimate>
              );
            })}
          </div>

        </div>
      </section>

      {/* 4. FEATURED PORTFOLIO */}
      <section id="portfolio-preview" data-no-scroll-animation="true" className="py-28 relative z-10 border-t border-white/5 bg-white/[0.005] overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <ScrollAnimate variant="slideLeft">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-20">
              <div className="max-w-2xl">
                <span className="text-xs font-bold text-mint uppercase tracking-widest block mb-3">Portfolio Showcases</span>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-tight">
                  Case Studies of High-Performance Systems We Built
                </h2>
              </div>
              <Link
                href="/portfolio"
                className="mt-6 md:mt-0 inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-accent hover:text-mint transition-colors group bg-white/5 border border-white/10 px-5 py-3 rounded-xl backdrop-blur-sm hover:border-accent/40"
              >
                See All Projects <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
              </Link>
            </div>
          </ScrollAnimate>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pt-4">
            {projects.map((project, index) => {
              const isMiddle = index === 1;
              return (
                <ScrollAnimate
                  key={project.id}
                  variant={isMiddle ? 'scaleIn' : (index % 2 === 0 ? 'slideRight' : 'slideLeft')}
                  delay={index * 0.12}
                >
                  <div
                    className={`group relative rounded-3xl overflow-hidden border border-white/5 bg-black hover:border-accent/30 transition-all duration-500 shadow-2xl flex flex-col justify-between h-[450px] text-light-always ${isMiddle ? 'lg:scale-[1.03] lg:-translate-y-2 hover:border-accent' : ''
                      }`}
                  >

                    {/* Background Image zooming overlay */}
                    <div className="absolute inset-0 z-0">
                      <img
                        src={project.mainImage}
                        alt={project.title}
                        loading="lazy"
                        decoding="async"
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 brightness-[0.4] group-hover:brightness-[0.25]"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" aria-hidden="true" />
                    </div>

                    {/* Top bar categories overlay */}
                    <div className="relative z-10 p-6 flex justify-between items-start">
                      <span className="px-3 py-1 bg-black/60 backdrop-blur-md border border-white/10 rounded-full text-[9px] font-bold text-accent uppercase tracking-wide">
                        {project.category}
                      </span>
                    </div>

                    {/* Bottom details revealing panel */}
                    <div className="relative z-10 p-6 sm:p-8 flex flex-col gap-4 mt-auto transition-transform duration-300">
                      <div>
                        <h3 className="text-xl font-extrabold text-white leading-snug group-hover:text-accent transition-colors duration-300 mb-2">
                          {project.title}
                        </h3>

                        {/* Expandable/visible description */}
                        <p className="text-gray-300 text-xs sm:text-sm leading-relaxed line-clamp-3 transition-opacity duration-300">
                          {project.description}
                        </p>
                      </div>

                      <div className="flex flex-wrap gap-1.5 pt-2">
                        {project.technologies.slice(0, 3).map((tech) => (
                          <span key={tech} className="text-[9px] font-mono font-bold bg-white/10 text-gray-300 border border-white/5 px-2 py-0.5 rounded">
                            {tech}
                          </span>
                        ))}
                      </div>

                      <div className="flex items-center justify-between pt-4 border-t border-white/10 mt-2">
                        <span className="text-[10px] text-gray-500 font-mono font-bold uppercase tracking-wider">
                          {project.industry}
                        </span>

                        <Link
                          href={`/portfolio/${project.id}`}
                          className="text-xs font-black text-accent hover:text-white transition-colors inline-flex items-center gap-1 group/btn"
                        >
                          Case Study <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" aria-hidden="true" />
                        </Link>
                      </div>
                    </div>

                  </div>
                </ScrollAnimate>
              );
            })}
          </div>

        </div>
      </section>

      {/* 5. TESTIMONIALS & TRUST */}
      <section id="testimonials" data-no-scroll-animation="true" className="py-32 relative z-10 bg-[#0b5a4b] text-white overflow-hidden">
        {/* Top wave background vector design flipped to create wave entry */}
        <div className="absolute top-0 left-0 w-full overflow-hidden leading-none rotate-180 -translate-y-1 z-20" aria-hidden="true">
          <svg className="relative block w-full h-[60px]" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z" className="html-light-fill-white"></path>
          </svg>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-25 pb-12 pt-8">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <span className="text-xs font-mono font-bold text-white/80 uppercase tracking-[0.25em] block mb-4">
              // CLIENT SUCCESS & TRUST
            </span>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-white tracking-tight leading-none uppercase font-sans">
              What Our{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-mint">
                Clients Say
              </span>
            </h2>
          </div>

          <TestimonialCarousel testimonials={testimonials} />
        </div>

        {/* Bottom wave background vector design to match white layout transition */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none translate-y-1 z-20" aria-hidden="true">
          <svg className="relative block w-full h-[60px]" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z" className="html-light-fill-white"></path>
          </svg>
        </div>
      </section>

      {/* 6. CALL TO ACTION */}
      <section id="cta" className="py-24 relative z-10 border-t border-white/5 bg-gradient-to-b from-transparent to-primary/10">
        <ScrollAnimate variant="scaleIn">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight mb-6">
              Ready to Engineer a Scalable Digital Presence?
            </h2>
            <p className="text-gray-400 text-sm sm:text-base max-w-xl leading-relaxed mb-10">
              Connect with our technical consultants in Colombo or London today. Let&apos;s map out a customized system that drives exponential volume.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 w-full sm:w-auto">
              <Link
                href="/contact"
                className="btn-premium-pill w-full sm:w-auto"
              >
                Get a Custom Proposal
              </Link>
              <Link
                href="/pricing"
                className="btn-secondary-pill w-full sm:w-auto"
              >
                View Transparent Pricing Plans
              </Link>
            </div>
          </div>
        </ScrollAnimate>
      </section>

      <Footer />
      <CookieConsent />
    </div>
  );
}
