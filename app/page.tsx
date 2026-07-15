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
              className="hero-badge opacity-0 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs text-accent font-medium tracking-wide mb-8"
            >
              <Sparkles className="w-3.5 h-3.5 animate-pulse text-mint" aria-hidden="true" />
              <span>Sri Lanka + UK Dual-Region Delivery Network</span>
            </div>

            {/* Headline */}
            <h1
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
            >
              Edgrow Technologies delivers world-class custom software development, high-speed Next.js web applications, and SEO services for Sri Lanka, the UK, and global enterprises.
            </p>

            {/* CTA Buttons */}
            <div
              className="hero-ctas opacity-0 flex flex-col sm:flex-row items-center justify-center gap-6 w-full sm:w-auto"
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
                <span className="text-4xl sm:text-5xl font-extrabold text-white font-mono bg-gradient-to-r from-white to-primary bg-clip-text text-transparent">
                  <AnimatedCounter from={0} to={8} duration={2} />+
                </span>
                <span className="text-gray-400 text-sm font-semibold uppercase tracking-wider">Years of Engineering Excellence</span>
              </div>
            </ScrollAnimate>

            <ScrollAnimate variant="fadeUp" delay={0.15}>
              <div className="stats-item flex flex-col gap-1.5 border-t sm:border-t-0 sm:border-x border-white/5 pt-8 sm:pt-0">
                <span className="text-4xl sm:text-5xl font-extrabold text-white font-mono bg-gradient-to-r from-white to-accent bg-clip-text text-transparent">
                  <AnimatedCounter from={0} to={120} duration={2.5} />+
                </span>
                <span className="text-gray-400 text-sm font-semibold uppercase tracking-wider">Custom Projects Dispatched</span>
              </div>
            </ScrollAnimate>

            <ScrollAnimate variant="fadeUp" delay={0.3}>
              <div className="stats-item flex flex-col gap-1.5 border-t sm:border-t-0 pt-8 sm:pt-0">
                <span className="text-4xl sm:text-5xl font-extrabold text-white font-mono bg-gradient-to-r from-white to-mint bg-clip-text text-transparent">
                  <AnimatedCounter from={0} to={95} duration={2} />%
                </span>
                <span className="text-gray-400 text-sm font-semibold uppercase tracking-wider">Client Net Promoter Score (NPS)</span>
              </div>
            </ScrollAnimate>

          </div>
        </div>
      </section>

      {/* 3. SERVICES OVERVIEW */}
      <section id="services-preview" className="py-24 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <ScrollAnimate variant="slideRight">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
              <div className="max-w-2xl">
                <span className="text-xs font-bold text-accent uppercase tracking-widest block mb-3">Enterprise Solutions</span>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                  Our Suite of Custom Software & Web Development Services
                </h2>
              </div>
              <Link
                href="/services"
                className="mt-4 md:mt-0 inline-flex items-center gap-1 text-sm font-bold text-accent hover:text-mint transition-colors group"
              >
                View All Services <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
              </Link>
            </div>
          </ScrollAnimate>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service, index) => {
              // Icon mapping helper
              const IconComponent =
                service.id === 'custom-web' ? Code :
                service.id === 'enterprise-software' ? Cpu :
                service.id === 'ecommerce-solutions' ? ShoppingBag : Code;

              const slideVariant = index % 2 === 0 ? 'slideRight' : 'slideLeft';

              return (
                <ScrollAnimate key={service.id} variant={slideVariant} delay={index * 0.1}>
                  <div className="glass-panel glass-panel-hover p-8 rounded-2xl flex flex-col justify-between h-full">
                    <div>
                      <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-accent mb-6">
                        <IconComponent className="w-6 h-6" aria-hidden="true" />
                      </div>
                      <h3 className="text-lg font-bold text-white mb-3">{service.title}</h3>
                      <p className="text-gray-400 text-xs leading-relaxed mb-6">{service.shortDescription}</p>
                      <ul className="flex flex-col gap-2 mb-8">
                        {service.features.slice(0, 3).map((feat, i) => (
                          <li key={i} className="flex items-center gap-2 text-xs text-gray-300 font-medium">
                            <CheckCircle className="w-3.5 h-3.5 text-accent shrink-0" aria-hidden="true" />
                            <span className="truncate">{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <Link
                      href={`/services#${service.id}`}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-white hover:text-accent transition-colors mt-auto group"
                    >
                      Examine Service <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
                    </Link>
                  </div>
                </ScrollAnimate>
              );
            })}
          </div>

        </div>
      </section>

      {/* 4. FEATURED PORTFOLIO */}
      <section id="portfolio-preview" className="py-24 relative z-10 border-t border-white/5 bg-white/[0.005]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <ScrollAnimate variant="slideLeft">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
              <div className="max-w-2xl">
                <span className="text-xs font-bold text-mint uppercase tracking-widest block mb-3">Portfolio Showcases</span>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                  Case Studies of High-Performance Systems We Built
                </h2>
              </div>
              <Link
                href="/portfolio"
                className="mt-4 md:mt-0 inline-flex items-center gap-1 text-sm font-bold text-accent hover:text-mint transition-colors group"
              >
                See All Projects <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
              </Link>
            </div>
          </ScrollAnimate>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <ScrollAnimate key={project.id} variant="scaleIn" delay={index * 0.12}>
                <div className="glass-panel p-5 rounded-2xl flex flex-col group overflow-hidden border border-white/5 hover:border-white/10 transition-all duration-300 h-full">
                  <div className="relative w-full h-48 rounded-xl overflow-hidden mb-5">
                    <img
                      src={project.mainImage}
                      alt={project.title}
                      loading="lazy"
                      decoding="async"
                      width={400}
                      height={192}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-4 left-4 px-2.5 py-1 bg-black/70 backdrop-blur-md rounded-md text-[10px] font-bold text-accent uppercase tracking-wide">
                      {project.category}
                    </div>
                  </div>

                  <div className="flex flex-col flex-1 justify-between">
                    <div>
                      <h3 className="text-base font-extrabold text-white leading-snug mb-2 group-hover:text-accent transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-gray-400 text-xs leading-relaxed line-clamp-2 mb-4">
                        {project.description}
                      </p>
                    </div>

                    <div className="flex items-center justify-between mt-4 pt-4 border-t border-white/5">
                      <span className="text-[10px] text-gray-500 font-mono font-bold uppercase">
                        {project.technologies.slice(0, 3).join(' • ')}
                      </span>
                      <Link
                        href={`/portfolio/${project.id}`}
                        className="text-xs font-bold text-accent hover:text-mint transition-colors inline-flex items-center gap-1 group"
                      >
                        Case study <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" aria-hidden="true" />
                      </Link>
                    </div>
                  </div>
                </div>
              </ScrollAnimate>
            ))}
          </div>

        </div>
      </section>

      {/* 5. TESTIMONIALS & TRUST */}
      <section id="testimonials" className="py-24 relative z-10 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollAnimate variant="fadeUp">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <span className="text-xs font-bold text-accent uppercase tracking-widest block mb-3">Client Trust</span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                What Global Enterprise Leaders Say
              </h2>
            </div>
          </ScrollAnimate>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {testimonials.map((test, idx) => (
              <ScrollAnimate key={idx} variant={idx % 2 === 0 ? 'slideRight' : 'slideLeft'} delay={idx * 0.12}>
                <div className="glass-panel p-8 sm:p-10 rounded-2xl border border-white/5 relative h-full">
                  <div className="absolute top-8 right-8 text-white/5 text-8xl font-serif pointer-events-none select-none" aria-hidden="true">&ldquo;</div>

                  <p className="text-gray-300 text-sm leading-relaxed mb-8 relative z-10 italic">
                    &ldquo;{test.quote}&rdquo;
                  </p>

                  <div className="flex items-center gap-4 relative z-10">
                    <img
                      src={test.avatar}
                      alt={test.name}
                      loading="lazy"
                      decoding="async"
                      width={48}
                      height={48}
                      className="w-12 h-12 rounded-full object-cover border border-white/10"
                    />
                    <div>
                      <strong className="text-white text-sm block font-bold">{test.name}</strong>
                      <span className="text-gray-400 text-xs block">{test.role} &bull; {test.company}</span>
                    </div>
                  </div>
                </div>
              </ScrollAnimate>
            ))}
          </div>
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
