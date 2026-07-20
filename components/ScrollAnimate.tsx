'use client';

import React from 'react';
import { motion, useReducedMotion } from 'motion/react';

type AnimationVariant = 'fadeUp' | 'fadeDown' | 'slideLeft' | 'slideRight' | 'scaleIn' | 'rotateIn';

interface ScrollAnimateProps {
  children: React.ReactNode;
  variant?: AnimationVariant;
  delay?: number;
  duration?: number;
  className?: string;
  as?: keyof React.JSX.IntrinsicElements;
}

const variants: Record<AnimationVariant, { initial: Record<string, number>; animate: Record<string, number> }> = {
  fadeUp: {
    initial: { opacity: 0, y: 40 },
    animate: { opacity: 1, y: 0 },
  },
  fadeDown: {
    initial: { opacity: 0, y: -30 },
    animate: { opacity: 1, y: 0 },
  },
  slideLeft: {
    initial: { opacity: 0, x: 60 },
    animate: { opacity: 1, x: 0 },
  },
  slideRight: {
    initial: { opacity: 0, x: -60 },
    animate: { opacity: 1, x: 0 },
  },
  scaleIn: {
    initial: { opacity: 0, scale: 0.88 },
    animate: { opacity: 1, scale: 1 },
  },
  rotateIn: {
    initial: { opacity: 0, rotate: -4, scale: 0.95 },
    animate: { opacity: 1, rotate: 0, scale: 1 },
  },
};

export default function ScrollAnimate({
  children,
  variant = 'fadeUp',
  delay = 0,
  duration = 0.6,
  className = '',
}: ScrollAnimateProps) {
  const { initial, animate } = variants[variant];
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      initial={initial}
      whileInView={animate}
      viewport={{
        once: true,
        amount: 0.12,
        margin: '0px 0px -4% 0px',
      }}
      transition={{
        duration,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={className}
      data-scroll-animate="true"
    >
      {children}
    </motion.div>
  );
}
