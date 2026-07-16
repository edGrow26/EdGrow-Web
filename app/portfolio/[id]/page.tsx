import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Sparkles } from 'lucide-react';

import BackgroundWaves from '../../../components/BackgroundWaves';
import Navbar from '../../../components/Navbar';
import Footer from '../../../components/Footer';
import { sanityClient } from '../../../lib/sanity';

export async function generateStaticParams() {
  const projects = await sanityClient.getProjects();
  // Merge Sanity project IDs with mock fallback IDs to ensure static routes
  // are always generated even when Sanity has no projects yet.
  const ids = new Set(projects.map((p) => p.id));
  // Always include the three known mock IDs as a safety net
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
      <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-6">
        <h1 className="text-2xl font-black mb-4">Case Study Not Found</h1>
        <p className="text-gray-400 text-sm mb-6">The requested case files could not be located in the system database.</p>
        <Link href="/portfolio" className="px-6 py-3 bg-accent text-black font-bold rounded-xl text-xs">
          Return to Portfolio List
        </Link>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-black text-white overflow-x-hidden">
      <BackgroundWaves />
      <Navbar />

      {/* Case Header Banner */}
      <section className="relative pt-32 pb-16 md:pt-40 md:pb-24 z-10 border-b border-white/5 bg-white/[0.005]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/portfolio"
            className="inline-flex items-center gap-2 text-xs font-bold text-gray-400 hover:text-white transition-colors mb-8 group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
            Back to Case Catalog
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-end">
            <div className="lg:col-span-8 flex flex-col items-start">
              <span className="px-3 py-1.5 bg-accent/10 text-accent text-xs font-bold rounded-md uppercase tracking-wide mb-6">
                {project.category}
              </span>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight leading-tight mb-6">
                {project.title}
              </h1>
              <p className="text-gray-300 text-sm sm:text-base leading-relaxed max-w-3xl">
                {project.description}
              </p>
            </div>

            <div className="lg:col-span-4 flex flex-col gap-6 p-6 rounded-2xl bg-white/[0.02] border border-white/5">
              <div>
                <strong className="text-xs text-gray-400 uppercase tracking-widest block mb-2">Industry Sector:</strong>
                <span className="text-sm text-white font-semibold block">{project.industry}</span>
              </div>
              <div>
                <strong className="text-xs text-gray-400 uppercase tracking-widest block mb-2">Core Tech Stack:</strong>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <span key={tech} className="px-2 py-1 bg-white/5 text-[10px] text-gray-300 rounded font-semibold border border-white/5">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Dynamic Case Details Layout */}
      <section className="py-24 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            
            {/* Core Study Breakdowns */}
            <div className="lg:col-span-8 flex flex-col gap-12">
              
              {/* 1. Challenge */}
              <div className="p-8 sm:p-10 rounded-2xl bg-white/[0.01] border border-white/5">
                <div className="flex items-center gap-3 text-red-400 text-xs font-bold uppercase tracking-widest mb-6">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-400 animate-pulse" /> The Operational Challenge
                </div>
                <h3 className="text-lg font-bold text-white mb-4">Strategic Impediments Faced by Client</h3>
                <p className="text-gray-300 text-sm leading-relaxed whitespace-pre-line">
                  {project.challenge}
                </p>
              </div>

              {/* 2. Solution */}
              <div className="p-8 sm:p-10 rounded-2xl bg-white/[0.01] border border-white/5">
                <div className="flex items-center gap-3 text-accent text-xs font-bold uppercase tracking-widest mb-6">
                  <span className="w-2.5 h-2.5 rounded-full bg-accent animate-pulse" /> Engineered Software Solution
                </div>
                <h3 className="text-lg font-bold text-white mb-4">Modular Next-Gen Architectures Deployed</h3>
                <p className="text-gray-300 text-sm leading-relaxed whitespace-pre-line">
                  {project.solution}
                </p>
              </div>

              {/* 3. Result */}
              <div className="p-8 sm:p-10 rounded-2xl bg-white/[0.01] border border-white/5">
                <div className="flex items-center gap-3 text-mint text-xs font-bold uppercase tracking-widest mb-6">
                  <span className="w-2.5 h-2.5 rounded-full bg-mint animate-pulse" /> Tangible Business Results
                </div>
                <h3 className="text-lg font-bold text-white mb-4">Quantifiable Operational Efficiencies</h3>
                <p className="text-gray-300 text-sm leading-relaxed whitespace-pre-line">
                  {project.result}
                </p>
              </div>

            </div>

            {/* Side Review Card & Action */}
            <div className="lg:col-span-4 flex flex-col gap-8">
              
              {/* Client Review Box */}
              {project.clientReview && (
                <div className="glass-panel p-8 rounded-2xl border border-white/5 relative flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-1 text-accent mb-6 text-sm">
                      {[...Array(project.clientReview.rating)].map((_, i) => (
                        <span key={i}>★</span>
                      ))}
                    </div>
                    <p className="text-gray-300 text-xs leading-relaxed italic mb-8">
                      &ldquo;{project.clientReview.quote}&rdquo;
                    </p>
                  </div>

                  <div className="flex items-center gap-3 pt-6 border-t border-white/5 mt-auto">
                    <img
                      src={project.clientReview.avatar}
                      alt={project.clientReview.author}
                      className="w-10 h-10 rounded-full object-cover border border-white/10"
                    />
                    <div>
                      <strong className="text-white text-xs block font-bold">{project.clientReview.author}</strong>
                      <span className="text-[10px] text-gray-400 block">{project.clientReview.role} • {project.clientReview.company}</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Contact Lead Card */}
              <div className="p-8 rounded-2xl bg-gradient-to-br from-primary/20 via-black to-black border border-white/5 flex flex-col gap-6 text-center">
                <Sparkles className="w-8 h-8 text-accent mx-auto animate-pulse" />
                <h4 className="text-base font-extrabold text-white">Require Similar High-Performance Software?</h4>
                <p className="text-gray-400 text-xs leading-relaxed">
                  Connect with our systems architects today to map out a complementary layout.
                </p>
                <Link
                  href={`/contact?subject=Case Study Inquiry: ${project.title}`}
                  className="w-full py-3.5 bg-gradient-to-r from-accent to-mint text-black font-bold text-xs rounded-xl hover:shadow-[0_0_15px_rgba(0,191,165,0.4)] transition-all duration-200"
                >
                  Request Architecture Mapping
                </Link>
              </div>

            </div>

          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
