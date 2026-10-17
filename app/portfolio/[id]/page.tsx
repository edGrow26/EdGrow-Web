import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Sparkles, ArrowRight, ArrowUpRight, CheckCircle2, ShieldCheck, Zap, Activity } from 'lucide-react';

import BackgroundWaves from '../../../components/BackgroundWaves';
import Navbar from '../../../components/Navbar';
import Footer from '../../../components/Footer';
import { sanityClient } from '../../../lib/sanity';

export async function generateStaticParams() {
  const projects = await sanityClient.getProjects();
  const ids = new Set(projects.map((p) => p.id));
  ['edu-platform', 'fintech-app', 'logistics-system'].forEach(id => ids.add(id));
  return Array.from(ids).map((id) => ({ id }));
}

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function CaseStudyPage({ params }: PageProps) {
  const resolvedParams = await params;
  const id = resolvedParams.id;
  const project = await sanityClient.getProjectById(id);

  if (!project) {
    return (
      <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-6 text-center">
        <h1 className="text-3xl font-black mb-4">Case Study Not Found</h1>
        <p className="text-white/50 text-sm mb-8">The requested case study could not be located in our production database.</p>
        <Link href="/portfolio" className="btn-premium-pill">
          Return to Portfolio
          <span className="btn-icon-wrapper">
            <ArrowLeft className="w-4 h-4" />
          </span>
        </Link>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-black text-white overflow-x-hidden">
      <BackgroundWaves />
      <Navbar />

      {/* ═══════════════════════════════════════════════════════════
          HERO — CASE HEADER
          ═══════════════════════════════════════════════════════════ */}
      <section className="relative pt-36 pb-16 md:pt-48 md:pb-24 z-10">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-gradient-radial from-primary/15 via-transparent to-transparent rounded-full blur-[120px] pointer-events-none" aria-hidden="true" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back Pill Button */}
          <Link
            href="/portfolio"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.04] border border-white/[0.08] text-xs font-semibold text-white/70 hover:text-white hover:bg-white/[0.08] transition-all mb-10 group"
          >
            <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
            <span>Back to Case Catalog</span>
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left Title & Overview */}
            <div className="lg:col-span-8 flex flex-col items-start">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.05] border border-white/[0.1] text-xs font-mono font-semibold uppercase tracking-wider text-accent mb-6">
                <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                <span>{project.category} · Enterprise Case Study</span>
              </div>

              <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-[-0.03em] leading-[1.05] mb-6">
                {project.title}
              </h1>

              <p className="text-white/60 text-base sm:text-lg leading-relaxed max-w-3xl font-light">
                {project.description}
              </p>
            </div>

            {/* Right: Doppelrand Specification Box */}
            <div className="lg:col-span-4">
              <div className="rounded-[1.75rem] p-[1px] bg-gradient-to-b from-white/[0.14] via-white/[0.04] to-transparent ring-1 ring-white/[0.08]">
                <div className="rounded-[calc(1.75rem-1px)] bg-[#040812]/95 p-6 sm:p-7 relative overflow-hidden flex flex-col gap-5 backdrop-blur-xl">
                  <div>
                    <span className="text-[10px] font-mono font-bold text-white/40 uppercase tracking-[0.2em] block mb-1.5">Industry Sector</span>
                    <span className="text-base font-bold text-white">{project.industry || 'Enterprise SaaS'}</span>
                  </div>

                  <div className="h-[1px] bg-white/[0.06]" />

                  <div>
                    <span className="text-[10px] font-mono font-bold text-white/40 uppercase tracking-[0.2em] block mb-2.5">Engineered Tech Stack</span>
                    <div className="flex flex-wrap gap-1.5">
                      {project.technologies.map((tech) => (
                        <span key={tech} className="px-2.5 py-1 bg-white/[0.04] border border-white/[0.08] text-white/70 rounded-md text-xs font-mono">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {project.projectLink && (
                    <>
                      <div className="h-[1px] bg-white/[0.06]" />
                      <a
                        href={project.projectLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-secondary-pill !py-2.5 !text-xs text-center inline-flex items-center justify-center gap-1.5"
                      >
                        Visit Production Deployment
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </a>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          CASE STUDY DEEP-DIVE — DOPPELRAND SECTIONS
          ═══════════════════════════════════════════════════════════ */}
      <section className="pb-36 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">

            {/* Left Column: Challenge, Architecture & Results */}
            <div className="lg:col-span-8 flex flex-col gap-10">

              {/* 1. Challenge */}
              <div className="rounded-[2rem] p-[1px] bg-gradient-to-b from-rose-500/20 via-white/[0.04] to-transparent ring-1 ring-white/[0.08]">
                <div className="rounded-[calc(2rem-1px)] bg-[#040812]/95 p-8 sm:p-10 relative overflow-hidden backdrop-blur-xl">
                  <div className="flex items-center gap-2.5 text-rose-400 text-xs font-mono font-bold uppercase tracking-widest mb-4">
                    <span className="w-2 h-2 rounded-full bg-rose-400 animate-pulse" />
                    <span>01 / Operational Challenge</span>
                  </div>
                  <h3 className="text-2xl font-black text-white tracking-tight mb-4">
                    Strategic Impediments Faced by Client
                  </h3>
                  <p className="text-white/60 text-sm sm:text-base leading-relaxed whitespace-pre-line font-light">
                    {project.challenge}
                  </p>
                </div>
              </div>

              {/* 2. Solution */}
              <div className="rounded-[2rem] p-[1px] bg-gradient-to-b from-blue-500/20 via-white/[0.04] to-transparent ring-1 ring-white/[0.08]">
                <div className="rounded-[calc(2rem-1px)] bg-[#040812]/95 p-8 sm:p-10 relative overflow-hidden backdrop-blur-xl">
                  <div className="flex items-center gap-2.5 text-blue-400 text-xs font-mono font-bold uppercase tracking-widest mb-4">
                    <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
                    <span>02 / Solution Architecture</span>
                  </div>
                  <h3 className="text-2xl font-black text-white tracking-tight mb-4">
                    Modular Next-Gen Architectures Deployed
                  </h3>
                  <p className="text-white/60 text-sm sm:text-base leading-relaxed whitespace-pre-line font-light">
                    {project.solution}
                  </p>
                </div>
              </div>

              {/* 3. Results */}
              <div className="rounded-[2rem] p-[1px] bg-gradient-to-b from-emerald-500/20 via-white/[0.04] to-transparent ring-1 ring-white/[0.08]">
                <div className="rounded-[calc(2rem-1px)] bg-[#040812]/95 p-8 sm:p-10 relative overflow-hidden backdrop-blur-xl">
                  <div className="flex items-center gap-2.5 text-emerald-400 text-xs font-mono font-bold uppercase tracking-widest mb-4">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span>03 / Business Impact</span>
                  </div>
                  <h3 className="text-2xl font-black text-white tracking-tight mb-4">
                    Quantifiable Operational Efficiencies
                  </h3>
                  <p className="text-white/60 text-sm sm:text-base leading-relaxed whitespace-pre-line font-light">
                    {project.result}
                  </p>
                </div>
              </div>

            </div>

            {/* Right Column: Review & Consultation CTA */}
            <div className="lg:col-span-4 flex flex-col gap-8">

              {/* Client Review Box */}
              {project.clientReview && (
                <div className="rounded-[2rem] p-[1px] bg-gradient-to-b from-amber-500/20 via-white/[0.04] to-transparent ring-1 ring-white/[0.08]">
                  <div className="rounded-[calc(2rem-1px)] bg-[#040812]/95 p-8 relative overflow-hidden flex flex-col justify-between backdrop-blur-xl">
                    <div className="mb-6">
                      <div className="flex items-center gap-1 text-amber-400 mb-6 text-sm">
                        {[...Array(project.clientReview.rating || 5)].map((_, i) => (
                          <span key={i}>★</span>
                        ))}
                      </div>
                      <p className="text-white/80 text-sm sm:text-base leading-relaxed italic mb-8">
                        &ldquo;{project.clientReview.quote}&rdquo;
                      </p>
                    </div>

                    <div className="flex items-center gap-3.5 pt-6 border-t border-white/[0.06] mt-auto">
                      <img
                        src={project.clientReview.avatar}
                        alt={project.clientReview.author}
                        crossOrigin="anonymous"
                        className="w-11 h-11 rounded-full object-cover border border-white/10"
                      />
                      <div>
                        <strong className="text-white text-xs block font-bold">{project.clientReview.author}</strong>
                        <span className="text-[11px] text-white/40 block font-medium">
                          {project.clientReview.role} • {project.clientReview.company}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Consultation Doppelrand Card */}
              <div className="rounded-[2rem] p-[1px] bg-gradient-to-b from-accent/25 via-white/[0.04] to-transparent ring-1 ring-white/[0.08]">
                <div className="rounded-[calc(2rem-1px)] bg-[#040812]/95 p-8 relative overflow-hidden text-center flex flex-col gap-6 backdrop-blur-xl">
                  <div className="w-12 h-12 rounded-2xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-accent mx-auto">
                    <Sparkles className="w-6 h-6" />
                  </div>

                  <div>
                    <h4 className="text-lg font-black text-white tracking-tight mb-2">
                      Require Similar Results?
                    </h4>
                    <p className="text-white/50 text-xs sm:text-sm leading-relaxed">
                      Connect directly with our lead architects to engineer a tailored solution for your business.
                    </p>
                  </div>

                  <Link
                    href={`/contact?subject=Case Study Inquiry: ${project.title}`}
                    className="btn-premium-pill w-full text-center !py-3 !text-xs"
                  >
                    Request Architecture Mapping
                    <span className="btn-icon-wrapper">
                      <ArrowRight className="w-3.5 h-3.5" />
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
