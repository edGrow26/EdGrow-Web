import React from 'react';
import Link from 'next/link';
<<<<<<< Updated upstream
import { ArrowLeft, Calendar, Clock, Sparkles, Share2 } from 'lucide-react';
=======
import type { Metadata } from 'next';
import { ArrowLeft, Calendar, Clock, Sparkles, Share2, ArrowUpRight, ArrowRight } from 'lucide-react';
>>>>>>> Stashed changes

import BackgroundWaves from '../../../components/BackgroundWaves';
import Navbar from '../../../components/Navbar';
import Footer from '../../../components/Footer';
import { sanityClient } from '../../../lib/sanity';

export async function generateStaticParams() {
  const posts = await sanityClient.getBlogPosts();
  const slugs = new Set(posts.map((p) => p.slug));
  ['why-nextjs-sanity-beats-wordpress', 'ultimate-guide-technical-seo-core-web-vitals'].forEach(s => slugs.add(s));
  return Array.from(slugs).map((slug) => ({ slug }));
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function BlogPostDetailPage({ params }: PageProps) {
  const resolvedParams = await params;
  const slug = resolvedParams.slug;
  const post = await sanityClient.getBlogPostBySlug(slug);

  if (!post) {
    return (
      <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-6 text-center">
        <h1 className="text-3xl font-black mb-4">Post Not Found</h1>
        <p className="text-white/50 text-sm mb-8">The requested publication could not be parsed from our database.</p>
        <Link href="/blog" className="btn-premium-pill">
          Return to Blog Listing
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

<<<<<<< Updated upstream
      {/* Main Content Article Body */}
      <article className="relative pt-32 pb-32 z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
=======
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* ═══════════════════════════════════════════════════════════
          ARTICLE HEADER & HERO
          ═══════════════════════════════════════════════════════════ */}
      <article className="relative pt-36 pb-36 z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Ambient hero glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-radial from-primary/15 via-transparent to-transparent rounded-full blur-[120px] pointer-events-none" aria-hidden="true" />
>>>>>>> Stashed changes
        
        {/* Back Link Pill */}
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.04] border border-white/[0.08] text-xs font-semibold text-white/70 hover:text-white hover:bg-white/[0.08] transition-all mb-10 group"
        >
          <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
          <span>Back to Engineering Articles</span>
        </Link>

        {/* Metadata Badges */}
        <div className="flex flex-wrap items-center gap-3 text-xs font-mono mb-6">
          <span className="px-3 py-1 bg-white/[0.05] border border-white/[0.1] text-accent rounded-full uppercase tracking-wider font-semibold">
            {post.categories[0]}
          </span>
          <span className="flex items-center gap-1.5 text-white/40">
            <Calendar className="w-3.5 h-3.5 text-accent" />
            <time dateTime={post.publishedAt}>
              {new Date(post.publishedAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
            </time>
          </span>
          <span className="text-white/20">•</span>
          <span className="flex items-center gap-1.5 text-white/40">
            <Clock className="w-3.5 h-3.5 text-emerald-400" />
            {post.readTime}
          </span>
        </div>

        {/* Dynamic Title */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-[-0.03em] leading-[1.08] mb-8">
          {post.title}
        </h1>

        {/* Author Bio Bar in Doppelrand Mini-card */}
        <div className="rounded-2xl p-[1px] bg-gradient-to-b from-white/[0.12] via-white/[0.03] to-transparent ring-1 ring-white/[0.06] mb-12">
          <div className="rounded-[calc(1rem-1px)] bg-[#040812]/95 p-4 sm:p-5 flex items-center gap-4 backdrop-blur-xl">
            <img
              src={post.author.avatar}
              alt={post.author.name}
              crossOrigin="anonymous"
              className="w-12 h-12 rounded-full object-cover border border-white/10"
            />
            <div>
              <strong className="text-white text-sm block font-bold">{post.author.name}</strong>
              <span className="text-white/40 text-xs block font-medium">{post.author.role}</span>
            </div>
            <div className="ml-auto flex items-center gap-2">
              <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-widest hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Verified Architect
              </span>
            </div>
          </div>
        </div>

        {/* Banner image with Doppelrand border */}
        <div className="rounded-[2rem] p-[1px] bg-gradient-to-b from-white/[0.16] via-white/[0.04] to-transparent ring-1 ring-white/[0.08] mb-14">
          <div className="rounded-[calc(2rem-1px)] overflow-hidden bg-black aspect-[16/9] relative">
            <img
              src={post.mainImage}
              alt={post.title}
              crossOrigin="anonymous"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Rich-Text Content rendered with pristine typography */}
        <div 
          className="prose prose-invert max-w-none text-white/70 text-base sm:text-lg leading-relaxed space-y-8
            prose-headings:text-white prose-headings:font-black prose-headings:tracking-tight prose-headings:mt-12 prose-headings:mb-6
            prose-h2:text-2xl sm:prose-h2:text-3xl prose-h2:border-b prose-h2:border-white/[0.08] prose-h2:pb-4
            prose-h3:text-xl sm:prose-h3:text-2xl
            prose-strong:text-white prose-strong:font-bold
            prose-code:text-accent prose-code:font-mono prose-code:bg-white/[0.04] prose-code:px-2 prose-code:py-0.5 prose-code:rounded
            prose-ul:list-disc prose-ul:pl-6 prose-ul:space-y-3
            prose-p:font-light"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        {/* Bottom Related Advisory Card in Doppelrand Architecture */}
        <div className="mt-24 rounded-[2.5rem] p-[1px] bg-gradient-to-b from-white/[0.16] via-white/[0.04] to-transparent ring-1 ring-white/[0.08]">
          <div className="rounded-[calc(2.5rem-1px)] bg-[#040812]/95 p-10 sm:p-14 relative overflow-hidden text-center flex flex-col items-center backdrop-blur-xl">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-gradient-radial from-accent/15 via-transparent to-transparent rounded-full blur-[100px] pointer-events-none" aria-hidden="true" />

            <div className="relative z-10 max-w-xl">
              <div className="w-12 h-12 rounded-2xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-accent mx-auto mb-6">
                <Sparkles className="w-6 h-6" />
              </div>

              <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight mb-3">
                Need High-Performance Architecture For Your Business?
              </h3>

              <p className="text-white/50 text-xs sm:text-sm leading-relaxed mb-8 font-light">
                Our lead engineers audit bottlenecks, optimize Core Web Vitals to sub-100ms speeds, and implement headless Next.js platforms for enterprise brands.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  href="/contact?subject=Engineering Advisory Inquiry"
                  className="btn-premium-pill w-full sm:w-auto text-center"
                >
                  Connect with a Lead Architect
                  <span className="btn-icon-wrapper">
                    <ArrowUpRight className="w-4 h-4" />
                  </span>
                </Link>

                <Link
                  href="/pricing"
                  className="btn-secondary-pill w-full sm:w-auto text-center inline-flex items-center justify-center gap-1.5"
                >
                  Review Cost Models
                  <span className="btn-icon-wrapper">
                    <ArrowRight className="w-4 h-4" />
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>

      </article>

      <Footer />
    </div>
  );
}
