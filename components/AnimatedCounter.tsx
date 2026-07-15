'use client';

import React, { useEffect, useRef } from 'react';
import { animate, useInView, useReducedMotion } from 'motion/react';

interface AnimatedCounterProps {
  from: number;
  to: number;
  duration?: number;
  delay?: number;
  className?: string;
}

export default function AnimatedCounter({
  from,
  to,
  duration = 2,
  delay = 0,
  className = '',
}: AnimatedCounterProps) {
  const nodeRef = useRef<HTMLSpanElement>(null);
  const inView = useInView(nodeRef, { once: false, amount: 0.5 });
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const node = nodeRef.current;
    if (!node) return;

    if (shouldReduceMotion) {
      node.textContent = Math.round(to).toString();
      return;
    }

    if (inView) {
      const controls = animate(from, to, {
        duration,
        delay,
        onUpdate(value) {
          node.textContent = Math.round(value).toString();
        },
      });
      return () => controls.stop();
    }

    node.textContent = Math.round(from).toString();
  }, [from, to, duration, delay, inView, shouldReduceMotion]);

  return <span ref={nodeRef} className={className}>{from}</span>;
}
