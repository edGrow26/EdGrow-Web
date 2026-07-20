'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'motion/react';
import { Sparkles, Calendar, User, Clock, ArrowRight } from 'lucide-react';

import BackgroundWaves from '../../components/BackgroundWaves';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { sanityClient, Post } from '../../lib/sanity';

export default function BlogListingPage() {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const data = await sanityClient.getBlogPosts();
      setPosts(data);
    };
    fetchPosts();
  }, []);

  return (
    <div className="relative min-h-screen bg-black text-white overflow-x-hidden">
      <BackgroundWaves />
      <Navbar />

      {/* Blog Header */}
      <section className="relative pt-32 pb-16 md:pt-40 md:pb-24 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs text-accent font-medium tracking-wide mb-6"
          >
            <Sparkles className="w-3.5 h-3.5 text-mint" aria-hidden="true" />
            <span>Tech Guides & Architectural Secrets</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight leading-[1.1] mb-6"
          >
            The Edgrow{' '}
            <span className="bg-gradient-to-r from-primary via-accent to-mint bg-clip-text text-transparent">
              Engineering Blog
            </span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-gray-400 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed"
          >
            Read technical articles, SEO keyword strategies, cloud microservice tutorials, and guides published by our lead architects in Colombo and London.
          </motion.p>
        </div>
      </section>

      {/* Post list section */}
      <section className="pb-32 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {posts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                aria-label={`Read ${post.title}`}
                className="block h-full rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-4 focus-visible:ring-offset-black"
              >
                <article className="glass-panel p-6 sm:p-8 rounded-2xl border border-white/5 flex flex-col group hover:border-accent/40 transition-all duration-300 h-full cursor-pointer">
                  {/* Main Article Image */}
                  <div className="relative w-full h-52 rounded-xl overflow-hidden mb-6">
                    <img
                      src={post.mainImage}
                      alt={post.title}
                      loading="lazy"
                      decoding="async"
                      width={600}
                      height={208}
                      className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500"
                    />
                    <div className="absolute top-4 left-4 flex gap-1.5">
                      {post.categories.map((cat) => (
                        <span key={cat} className="px-2 py-1 bg-black/70 backdrop-blur-md rounded text-[10px] font-bold text-accent uppercase tracking-wide">
                          {cat}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Info Metadata Bar */}
                  <div className="flex items-center gap-4 text-[11px] text-gray-500 font-medium mb-4">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-accent" aria-hidden="true" />
                      <time dateTime={post.publishedAt}>
                        {new Date(post.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                      </time>
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-mint" aria-hidden="true" />
                      {post.readTime}
                    </span>
                  </div>

                  {/* Title and Excerpt */}
                  <h2 className="text-xl font-extrabold text-white leading-snug mb-3 group-hover:text-accent transition-colors">
                    {post.title}
                  </h2>

                  <p className="text-gray-400 text-xs leading-relaxed line-clamp-3 mb-6">
                    {post.excerpt}
                  </p>

                  {/* Author Info row */}
                  <div className="flex items-center justify-between pt-6 border-t border-white/5 mt-auto">
                    <div className="flex items-center gap-3">
                      <img
                        src={post.author.avatar}
                        alt={post.author.name}
                        loading="lazy"
                        decoding="async"
                        width={36}
                        height={36}
                        className="w-9 h-9 rounded-full object-cover border border-white/10"
                      />
                      <div>
                        <strong className="text-white text-xs block font-bold">{post.author.name}</strong>
                        <span className="text-[10px] text-gray-400 block">{post.author.role}</span>
                      </div>
                    </div>

                    <span className="text-xs font-bold text-accent group-hover:text-mint transition-colors inline-flex items-center gap-1">
                      Read article <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" aria-hidden="true" />
                    </span>
                  </div>

                </article>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
