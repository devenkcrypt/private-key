'use client';

import { useMemo } from 'react';
import { motion } from 'framer-motion';

function rand(seed: number) {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

interface Star {
  id: number;
  left: number;
  top: number;
  size: number;
  duration: number;
  delay: number;
}

export function NightSky({ starCount = 80, children }: { starCount?: number; children?: React.ReactNode }) {
  const stars = useMemo<Star[]>(
    () =>
      Array.from({ length: starCount }, (_, i) => ({
        id: i,
        left: rand(i + 1) * 100,
        top: rand(i + 50) * 100,
        size: 1 + rand(i + 100) * 2.5,
        duration: 2 + rand(i + 200) * 3,
        delay: rand(i + 300) * 3,
      })),
    [starCount]
  );

  return (
    <div className="relative h-full w-full overflow-hidden bg-[radial-gradient(ellipse_at_50%_0%,#2b1d44_0%,#1a1230_45%,#0d0820_100%)]">
      {/* stars */}
      <div className="absolute inset-0">
        {stars.map((s) => (
          <motion.div
            key={s.id}
            className="absolute rounded-full bg-white"
            style={{
              left: `${s.left}%`,
              top: `${s.top}%`,
              width: s.size,
              height: s.size,
            }}
            animate={{ opacity: [0.2, 1, 0.2], scale: [0.7, 1.2, 0.7] }}
            transition={{
              duration: s.duration,
              delay: s.delay,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>

      {/* soft moon glow */}
      <div className="absolute right-[12%] top-[12%] h-32 w-32 rounded-full bg-[#FFE9B0] opacity-70 blur-[40px]" />
      <div className="absolute right-[14%] top-[14%] h-20 w-20 rounded-full bg-[#FFF4D0] opacity-90 blur-[10px]" />

      {/* floating petals over night */}
      <div className="pointer-events-none absolute inset-0">
        {Array.from({ length: 10 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute bottom-[-10%]"
            style={{ left: `${(i * 11 + 4) % 100}%` }}
            initial={{ y: 0, opacity: 0, rotate: 0 }}
            animate={{
              y: '-115vh',
              opacity: [0, 0.6, 0.6, 0],
              rotate: 360,
              x: [0, i % 2 ? 30 : -30, 0],
            }}
            transition={{
              duration: 18 + (i % 4) * 3,
              delay: i * 1.5,
              repeat: Infinity,
              ease: 'linear',
            }}
          >
            <svg width={18} height={18} viewBox="0 0 24 24">
              <path
                d="M12 2C14 6 18 8 18 12C18 16 15 18 12 18C9 18 6 16 6 12C6 8 10 6 12 2Z"
                fill={['#FF5C8A', '#FF8FB1', '#FFD6E5'][i % 3]}
                opacity="0.7"
              />
            </svg>
          </motion.div>
        ))}
      </div>

      {children}
    </div>
  );
}
