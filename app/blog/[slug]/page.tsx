import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Calendar, Clock, Sparkles, Share2 } from 'lucide-react';

import BackgroundWaves from '../../../components/BackgroundWaves';
import Navbar from '../../../components/Navbar';
import Footer from '../../../components/Footer';
import { sanityClient } from '../../../lib/sanity';

export async function generateStaticParams() {
  const posts = await sanityClient.getBlogPosts();
  const slugs = new Set(posts.map((p) => p.slug));
  // Always include the two known mock slugs as a safety net
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
      <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-6">
        <h1 className="text-2xl font-black mb-4">Post Not Found</h1>
        <p className="text-gray-400 text-sm mb-6">The requested publication could not be parsed from our database.</p>
        <Link href="/blog" className="px-6 py-3 bg-accent text-black font-bold rounded-xl text-xs">
          Return to Blog Listing
        </Link>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-black text-white overflow-x-hidden">
      <BackgroundWaves />
      <Navbar />

      {/* Main Content Article Body */}
      <article className="relative pt-32 pb-32 z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Back Link */}
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-xs font-bold text-gray-400 hover:text-white transition-colors mb-8 group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
          Back to Articles
        </Link>

        {/* Metadata Details */}
        <div className="flex flex-wrap items-center gap-4 text-xs text-gray-500 font-semibold mb-6">
          <span className="px-2.5 py-1 bg-accent/10 text-accent rounded uppercase">
            {post.categories[0]}
          </span>
          <span className="flex items-center gap-1">
            <Calendar className="w-4 h-4 text-gray-400" />
            {new Date(post.publishedAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
          </span>
          <span className="flex items-center gap-1">
            <Clock className="w-4 h-4 text-gray-400" />
            {post.readTime}
          </span>
        </div>

        {/* Dynamic Title */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight leading-tight mb-8">
          {post.title}
        </h1>

        {/* Author Bio Header */}
        <div className="flex items-center gap-4 py-6 border-y border-white/5 mb-10">
          <img
            src={post.author.avatar}
            alt={post.author.name}
            crossOrigin="anonymous"
            className="w-11 h-11 rounded-full object-cover border border-white/10"
          />
          <div>
            <strong className="text-white text-sm block font-bold">{post.author.name}</strong>
            <span className="text-gray-400 text-xs block">{post.author.role}</span>
          </div>
          <div className="ml-auto p-2.5 bg-white/5 text-gray-400 rounded-xl" title="Share article">
            <Share2 className="w-4 h-4" />
          </div>
        </div>

        {/* Banner image */}
        <div className="relative w-full h-80 sm:h-96 rounded-2xl overflow-hidden mb-12 border border-white/10 shadow-2xl">
          <img
            src={post.mainImage}
            alt={post.title}
            crossOrigin="anonymous"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Rich-Text rendered directly in pristine prose */}
        <div 
          className="prose prose-invert max-w-none text-gray-300 text-sm sm:text-base leading-relaxed space-y-6
            prose-headings:text-white prose-headings:font-black prose-headings:tracking-tight prose-headings:mt-10 prose-headings:mb-4
            prose-h2:text-2xl prose-h2:border-b prose-h2:border-white/5 prose-h2:pb-2
            prose-strong:text-white prose-strong:font-bold
            prose-ul:list-disc prose-ul:pl-6 prose-ul:space-y-2"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        {/* Related Posts CTA Card */}
        <div className="mt-20 p-8 rounded-2xl bg-gradient-to-br from-primary/10 via-black to-black border border-white/5 text-center flex flex-col gap-4 items-center">
          <Sparkles className="w-8 h-8 text-accent" />
          <h3 className="text-lg font-extrabold text-white">Require High-Performance Search Optimization?</h3>
          <p className="text-gray-400 text-xs max-w-lg leading-relaxed">
            Our SEO content architects optimize and index your corporate pages to capture valuable industry keywords like Edgrow web development Sri Lanka, software Colombo, and global web applications.
          </p>
          <Link
            href="/contact?subject=SEO Content Consultation Inquiry"
            className="mt-2 px-6 py-3 bg-gradient-to-r from-accent to-mint text-black font-bold rounded-xl text-xs shadow-lg"
          >
            Connect with an SEO Consultant
          </Link>
        </div>

      </article>

      <Footer />
    </div>
  );
}
