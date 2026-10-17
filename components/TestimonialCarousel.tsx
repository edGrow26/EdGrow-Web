'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Star, CheckCircle2, Quote } from 'lucide-react';
import { Testimonial } from '../lib/sanity';

interface TestimonialCarouselProps {
  testimonials: Testimonial[];
}

function RatingStars({ rating }: { rating: number }) {
  const normalizedRating = Math.max(0, Math.min(5, Math.round(Number(rating) || 0)));

  return (
    <div
      className="flex items-center gap-1 text-[#f5b301]"
      role="img"
      aria-label={`Rating: ${normalizedRating} out of 5 stars`}
    >
      {[...Array(5)].map((_, index) => {
        const filled = index < normalizedRating;

        return (
          <Star
            key={index}
            className="w-4 h-4"
            fill={filled ? 'currentColor' : 'none'}
            stroke="currentColor"
            strokeWidth={2}
            aria-hidden="true"
          />
        );
      })}
    </div>
  );
}

function ClientAvatar({ name, avatar }: { name: string; avatar?: string }) {
  const [imageError, setImageError] = useState(false);

  // Initials generator for fallback
  const initials = name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join('');

  if (!avatar || imageError) {
    return (
      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary via-accent to-mint flex items-center justify-center text-black font-extrabold text-sm shadow-md ring-2 ring-white/20 shrink-0">
        {initials || 'EG'}
      </div>
    );
  }

  return (
    <div className="relative w-12 h-12 rounded-full overflow-hidden ring-2 ring-emerald-400/30 bg-slate-800 shadow-md shrink-0">
      <Image
        src={avatar}
        alt={name}
        crossOrigin="anonymous"
        fill
        sizes="48px"
        className="object-cover"
        loading="lazy"
        onError={() => setImageError(true)}
      />
    </div>
  );
}

export default function TestimonialCarousel({ testimonials }: TestimonialCarouselProps) {
  if (!testimonials || testimonials.length === 0) return null;

  // Tripled testimonials to ensure the horizontal marquee loop stays seamless even on extra wide displays
  const scrollItems = [...testimonials, ...testimonials, ...testimonials];

  return (
    <div className="relative w-full overflow-hidden py-8 select-none">
      {/* Left and right atmospheric fade masks */}
      <div
        className="testimonial-fade-mask-left absolute inset-y-0 left-0 w-16 sm:w-32 bg-gradient-to-r from-black via-black/80 to-transparent z-20 pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="testimonial-fade-mask-right absolute inset-y-0 right-0 w-16 sm:w-32 bg-gradient-to-l from-black via-black/80 to-transparent z-20 pointer-events-none"
        aria-hidden="true"
      />

      {/* Marquee Track */}
      <div className="flex w-full overflow-hidden">
        <div className="animate-marquee flex gap-6 sm:gap-8 py-4">
          {scrollItems.map((test, index) => (
            <div
              key={`${test.name}-${index}`}
              className="relative w-[340px] sm:w-[420px] shrink-0 rounded-[28px] p-1.5 bg-gradient-to-b from-white/15 via-white/5 to-transparent ring-1 ring-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] transition-all duration-300 hover:scale-[1.02] hover:ring-accent/40 cursor-grab active:cursor-grabbing flex flex-col justify-between"
            >
              {/* Inner card core */}
              <div className="rounded-[calc(28px-6px)] p-7 sm:p-8 bg-[#040e10]/95 backdrop-blur-xl border border-white/5 flex flex-col justify-between h-full">
                <div>
                  {/* Card Header: Trustpilot Rating & Verification Badge */}
                  <div className="flex items-center justify-between mb-5 pb-4 border-b border-white/10">
                    <div className="flex items-center gap-2">
                      {/* Trustpilot Star Icon */}
                      <div className="w-6 h-6 rounded-md bg-[#00b67a]/15 flex items-center justify-center">
                        <svg
                          className="w-4 h-4 text-[#00b67a]"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          aria-hidden="true"
                        >
                          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                        </svg>
                      </div>
                      <span className="text-white text-xs font-bold tracking-tight">Trustpilot</span>
                      <RatingStars rating={test.rating} />
                    </div>

                    <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-mono uppercase tracking-wider">
                      <CheckCircle2 className="w-3 h-3 text-emerald-400" aria-hidden="true" />
                      <span>Verified</span>
                    </div>
                  </div>

                  {/* Quote Icon & Content */}
                  <div className="relative mb-6">
                    <Quote className="w-8 h-8 text-accent/20 absolute -top-2 -left-2 -z-10 pointer-events-none" aria-hidden="true" />
                    <blockquote className="text-slate-200 text-xs sm:text-sm leading-relaxed italic line-clamp-5">
                      &ldquo;{test.quote}&rdquo;
                    </blockquote>
                  </div>
                </div>

                {/* Author Information Footer */}
                <div className="pt-4 border-t border-white/10 flex items-center gap-3.5">
                  <ClientAvatar name={test.name} avatar={test.avatar} />
                  <div className="min-w-0 flex-1 text-left">
                    <h3 className="text-white text-sm font-bold tracking-tight truncate">
                      {test.name}
                    </h3>
                    <p className="text-slate-400 text-xs truncate">
                      {test.role ? `${test.role} · ` : ''}
                      <span className="text-accent/90">{test.company}</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
