'use client';

import { useMemo } from 'react';
import { motion } from 'framer-motion';

type Variant = 'petals' | 'stars';

interface Particle {
  id: number;
  left: number;
  size: number;
  duration: number;
  delay: number;
  drift: number;
  hue: string;
  opacity: number;
}

function makeParticles(count: number, variant: Variant): Particle[] {
  const petalColors = ['#FF5C8A', '#FF8FB1', '#FFD6E5', '#FFA8C5', '#FFB7CE'];
  return Array.from({ length: count }, (_, i) => {
    const hue = variant === 'petals'
      ? petalColors[i % petalColors.length]
      : '#FFFFFF';
    return {
      id: i,
      left: Math.random() * 100,
      size: 8 + Math.random() * 18,
      duration: 14 + Math.random() * 16,
      delay: Math.random() * 20,
      drift: (Math.random() - 0.5) * 120,
      hue,
      opacity: 0.5 + Math.random() * 0.5,
    };
  });
}

function Petal({ p }: { p: Particle }) {
  return (
    <motion.div
      className="pointer-events-none absolute bottom-[-10%]"
      style={{ left: `${p.left}%` }}
      initial={{ y: 0, x: 0, rotate: 0, opacity: 0 }}
      animate={{
        y: '-115vh',
        x: [0, p.drift, 0],
        rotate: [0, 180, 360],
        opacity: [0, p.opacity, p.opacity, 0],
      }}
      transition={{
        duration: p.duration,
        delay: p.delay,
        repeat: Infinity,
        ease: 'linear',
      }}
    >
      <svg width={p.size} height={p.size} viewBox="0 0 24 24" fill="none">
        <path
          d="M12 2C14 6 18 8 18 12C18 16 15 18 12 18C9 18 6 16 6 12C6 8 10 6 12 2Z"
          fill={p.hue}
          opacity="0.85"
        />
        <path
          d="M12 18C12 20 12 22 12 22"
          stroke={p.hue}
          strokeWidth="1"
          opacity="0.5"
        />
      </svg>
    </motion.div>
  );
}

function Star({ p }: { p: Particle }) {
  return (
    <motion.div
      className="pointer-events-none absolute"
      style={{ left: `${p.left}%`, top: `${Math.random() * 90}%` }}
      animate={{
        opacity: [0.2, p.opacity, 0.2],
        scale: [0.7, 1.2, 0.7],
      }}
      transition={{
        duration: p.duration / 4,
        delay: p.delay / 3,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    >
      <svg width={p.size / 2 + 2} height={p.size / 2 + 2} viewBox="0 0 24 24" fill="white">
        <path d="M12 2L14 9L21 12L14 15L12 22L10 15L3 12L10 9Z" fill="white" />
      </svg>
    </motion.div>
  );
}

export function FloatingPetals({ count = 16 }: { count?: number }) {
  const particles = useMemo(() => makeParticles(count, 'petals'), [count]);
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {particles.map((p) => (
        <Petal key={p.id} p={p} />
      ))}
    </div>
  );
}

export function StarField({ count = 60 }: { count?: number }) {
  const particles = useMemo(() => makeParticles(count, 'stars'), [count]);
  return (
    <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
      {particles.map((p) => (
        <Star key={p.id} p={p} />
      ))}
    </div>
  );
}

export function FallingPetals({ count = 12 }: { count?: number }) {
  const particles = useMemo(() => makeParticles(count, 'petals'), [count]);
  return (
    <div className="pointer-events-none absolute inset-0 z-10 overflow-hidden">
      {particles.map((p) => (
        <Petal key={p.id} p={p} />
      ))}
    </div>
  );
}
