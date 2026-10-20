import React from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';
import { ArrowLeft, Calendar, Clock, Sparkles, Share2 } from 'lucide-react';

import BackgroundWaves from '../../../components/BackgroundWaves';
import Navbar from '../../../components/Navbar';
import Footer from '../../../components/Footer';
import { sanityClient } from '../../../lib/sanity';

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const slug = resolvedParams.slug;
  const post = await sanityClient.getBlogPostBySlug(slug);

  if (!post) {
    return {
      title: 'Post Not Found | Edgrow Technologies',
      description: 'The requested publication could not be parsed from our database.',
    };
  }

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.edgrow.com';
  const postUrl = `${baseUrl}/blog/${slug}`;

  return {
    title: post.title,
    description: post.excerpt,
    alternates: {
      canonical: postUrl,
    },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: postUrl,
      type: 'article',
      publishedTime: post.publishedAt,
      authors: [post.author.name],
      images: [
        {
          url: post.mainImage,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
      images: [post.mainImage],
    },
  };
}

export async function generateStaticParams() {
  const posts = await sanityClient.getBlogPosts();
  const slugs = new Set(posts.map((p) => p.slug));
  ['why-nextjs-sanity-beats-wordpress', 'ultimate-guide-technical-seo-core-web-vitals'].forEach(s => slugs.add(s));
  return Array.from(slugs).map((slug) => ({ slug }));
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

// Format Blog Content: Ensures both main section titles are Bold H2 (22-26px)
function formatBlogContent(content: any): string {
  if (!content) return '';
  
  let rawText = '';
  if (typeof content === 'string') {
    rawText = content;
  } else if (Array.isArray(content)) {
    rawText = content.map((block: any) => 
      block.children ? block.children.map((c: any) => c.text).join('') : ''
    ).join('\n\n');
  } else {
    rawText = String(content);
  }

  // 1. Convert raw URLs into clickable anchor tags
  let html = rawText.replace(
    /(https?:\/\/[^\s<]+)/g,
    '<a href="$1" target="_blank" rel="noopener noreferrer" class="text-accent underline hover:text-mint transition-colors font-semibold cursor-pointer">$1</a>'
  );

  // 2. Split into blocks/lines
  let lines = html.split(/\n+/).map(l => l.trim()).filter(Boolean);

  // Merge orphan punctuation
  const cleanedBlocks: string[] = [];
  for (let i = 0; i < lines.length; i++) {
    const current = lines[i];
    if ((current === '?' || current === '.' || current === '!') && cleanedBlocks.length > 0) {
      cleanedBlocks[cleanedBlocks.length - 1] += current;
    } else {
      cleanedBlocks.push(current);
    }
  }

  let formattedHtml = '';

  cleanedBlocks.forEach((block) => {
    // Both section titles + numbered list headers get Bold H2 styling
    const isMainHeading = 
      /^\d+\.\s+/.test(block) ||
      block.includes("Build a Website That Works for Your Business") ||
      block.includes("Is It Time for a Website Upgrade?");

    if (isMainHeading) {
      formattedHtml += `<h2 class="text-[22px] sm:text-[24px] md:text-[26px] font-bold text-white mt-10 mb-4 leading-snug">${block}</h2>`;
    } else {
      formattedHtml += `<p class="text-[16px] sm:text-[17px] md:text-[18px] text-gray-300 leading-relaxed mb-6">${block}</p>`;
    }
  });

  return formattedHtml;
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

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.edgrow.com';
  
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    image: post.mainImage,
    datePublished: post.publishedAt,
    author: {
      '@type': 'Person',
      name: post.author.name,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Edgrow Technologies',
      logo: {
        '@type': 'ImageObject',
        url: `${baseUrl}/logo.png`,
      }
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${baseUrl}/blog/${slug}`,
    },
  };

  const formattedHtmlContent = formatBlogContent(post.content);

  return (
    <div className="relative min-h-screen bg-black text-white overflow-x-hidden">
      <BackgroundWaves />
      <Navbar />

      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

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

        {/* Main Title (H1) - 32-40px */}
        <h1 className="text-3xl sm:text-4xl md:text-[40px] font-black tracking-tight leading-[1.15] mb-8 text-white">
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

        {/* Formatted Content */}
        <div 
          className="prose prose-invert max-w-none text-gray-300
            [&>p]:text-[16px] sm:[&>p]:text-[17px] md:[&>p]:text-[18px] [&>p]:leading-relaxed [&>p]:mb-6 [&>p]:text-gray-300
            [&>h2]:text-[22px] sm:[&>h2]:text-[24px] md:[&>h2]:text-[26px] [&>h2]:font-bold [&>h2]:text-white [&>h2]:mt-10 [&>h2]:mb-4 [&>h2]:leading-snug
            [&>strong]:font-bold [&>strong]:text-white 
            [&>a]:text-accent [&>a]:underline hover:[&>a]:text-mint [&>a]:transition-colors [&>a]:font-semibold"
          dangerouslySetInnerHTML={{ __html: formattedHtmlContent }}
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