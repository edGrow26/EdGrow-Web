'use client';

import React from 'react';
import Image from 'next/image';
import { Star } from 'lucide-react';
import { Testimonial } from '../lib/sanity';

interface TestimonialCarouselProps {
  testimonials: Testimonial[];
}

function RatingStars({ rating }: { rating: number }) {
  const normalizedRating = Math.max(0, Math.min(5, Math.round(Number(rating) || 0)));

  return (
    <div
      className="flex items-center gap-1.5 justify-center mb-4 text-[#f5b301]"
      role="img"
      aria-label={`Rating: ${normalizedRating} out of 5 stars`}
    >
      {[...Array(5)].map((_, index) => {
        const filled = index < normalizedRating;

        return (
          <Star
            key={index}
            className="w-6 h-6"
            fill={filled ? 'currentColor' : 'none'}
            stroke="currentColor"
            strokeWidth={2.25}
            aria-hidden="true"
          />
        );
      })}
    </div>
  );
}

export default function TestimonialCarousel({ testimonials }: TestimonialCarouselProps) {
  if (!testimonials || testimonials.length === 0) return null;

  // Tripled testimonials to ensure the horizontal loop stays seamless even on extra wide displays
  const scrollItems = [...testimonials, ...testimonials, ...testimonials];

  return (
    <div className="relative w-full overflow-hidden py-10 select-none">
      {/* Testimonial Marquee Slider Container */}
      <div className="flex w-full overflow-hidden">
        <div className="animate-marquee flex gap-8 py-4">
          {scrollItems.map((test, index) => (
            <div
              key={`${test.name}-${index}`}
              className="relative w-[340px] sm:w-[400px] shrink-0 bg-white border border-gray-100 rounded-[32px] p-8 shadow-2xl flex flex-col justify-between items-center text-center transition-transform duration-300 hover:scale-[1.02] cursor-grab active:cursor-grabbing mb-10"
            >
              <div>
                {/* Trustpilot Logo Header */}
                <div className="flex items-center gap-1.5 justify-center mb-3">
                  <svg
                    className="w-5 h-5 text-[#00b67a]"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                  </svg>
                  <span className="text-gray-900 text-base font-extrabold tracking-tight font-sans">
                    Trustpilot
                  </span>
                </div>

                {/* Dynamic rating: filled stars match the Sanity rating. */}
                <RatingStars rating={test.rating} />

                {/* Author Name */}
                <p className="text-gray-900 text-sm sm:text-base font-extrabold tracking-wide mb-3 font-sans">
                  ~{test.name}~
                </p>

                {/* Quote Text */}
                <blockquote className="text-gray-600 text-xs sm:text-sm leading-relaxed italic px-2 mb-10 font-sans">
                  &ldquo;{test.quote}&rdquo;
                </blockquote>
              </div>

              {/* Speech bubble pointer tail */}
              <div
                className="absolute bottom-[28px] left-1/2 -translate-x-1/2 translate-y-1/2 rotate-45 w-6 h-6 bg-white border-r border-b border-gray-100 shadow-md z-10"
                aria-hidden="true"
              />

              {/* Circular Avatar (Overlaps the speech bubble tail) */}
              <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 z-20">
                <div className="relative w-20 h-20 rounded-full overflow-hidden border-4 border-[#0b5a4b] shadow-lg bg-gray-50">
                  <Image
                    src={test.avatar}
                    alt={test.name}
                    crossOrigin="anonymous"
                    fill
                    sizes="80px"
                    className="object-cover"
                    loading="lazy"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
