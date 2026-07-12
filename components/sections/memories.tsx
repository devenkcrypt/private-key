'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Heart } from 'lucide-react';
import { MovieIllustration, TripIllustration, HeartIllustration } from '@/components/illustrations/memories';

interface Memory {
  icon: string;
  title: string;
  subtitle: string;
  body: string;
  illustration: React.ReactNode;
  accent: string;
}

const MEMORIES: Memory[] = [
  {
    icon: '🎬',
    title: 'Our First Movie',
    subtitle: 'The Insidious Red Door',
    body: '"I was watching the movie...\nbut honestly,\nI was happier watching your reactions."',
    illustration: <MovieIllustration />,
    accent: 'from-[#2b1d44] to-[#FF5C8A]',
  },
  {
    icon: '🚗',
    title: 'Our First Trip',
    subtitle: 'Thanjavur',
    body: '"The destination was beautiful.\n\nBut every road becomes beautiful\nwhen I\'m travelling with you."',
    illustration: <TripIllustration />,
    accent: 'from-[#7CC6FE] to-[#5FA777]',
  },
  {
    icon: '❤️',
    title: 'The Day Everything Changed',
    subtitle: '23 November 2021',
    body: '"The day our hearts quietly understood each other.\n\nNo place.\nNo details.\nJust a beautiful beginning\nthat only we know."',
    illustration: <HeartIllustration />,
    accent: 'from-[#FF5C8A] to-[#FFD6E5]',
  },
];

function Card({ memory, direction }: { memory: Memory; direction: number }) {
  return (
    <motion.div
      key={memory.title}
      custom={direction}
      initial={{ opacity: 0, x: direction > 0 ? 80 : -80, scale: 0.9 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, x: direction > 0 ? -80 : 80, scale: 0.9 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className="glass relative w-full overflow-hidden rounded-[2rem] p-6 shadow-[0_20px_60px_-20px_rgba(255,92,138,0.35)]"
    >
      <div className={`absolute inset-x-0 top-0 h-32 bg-gradient-to-b ${memory.accent} opacity-15`} />

      <div className="relative flex flex-col items-center text-center">
        <span className="text-3xl">{memory.icon}</span>
        <div className="my-3">{memory.illustration}</div>

        <h3 className="font-display text-xl font-semibold text-foreground">
          {memory.title}
        </h3>
        <p className="mt-1 font-hand text-lg text-rose">{memory.subtitle}</p>

        <div className="my-4 h-px w-16 bg-gradient-to-r from-transparent via-rose/50 to-transparent" />

        <p className="whitespace-pre-line font-body text-sm italic leading-relaxed text-foreground/75">
          {memory.body}
        </p>
      </div>

      <div className="absolute bottom-3 right-4">
        <Heart className="h-4 w-4 fill-rose/20 text-rose/40" />
      </div>
    </motion.div>
  );
}

export function MemoriesSection() {
  const [[index, direction], setState] = useState<[number, number]>([0, 0]);

  const paginate = (dir: number) => {
    setState(([prev]) => [(prev + dir + MEMORIES.length) % MEMORIES.length, dir]);
  };

  return (
    <section className="relative w-full overflow-hidden bg-gradient-to-b from-[#FFF9FC] to-[#FFE9F1] px-6 py-20">
      <div className="mx-auto max-w-md text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="font-hand text-4xl font-bold text-gradient-pink">
            Our Beautiful Memories
          </h2>
          <p className="mt-2 font-body text-sm text-foreground/60">
            Swipe through the moments that made us
          </p>
        </motion.div>

        <div className="relative mt-8 min-h-[440px]">
          <AnimatePresence mode="wait" custom={direction}>
            <Card key={index} memory={MEMORIES[index]} direction={direction} />
          </AnimatePresence>
        </div>

        {/* controls */}
        <div className="mt-6 flex items-center justify-center gap-4">
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => paginate(-1)}
            className="flex h-10 w-10 items-center justify-center rounded-full glass text-rose"
            aria-label="Previous memory"
          >
            <ChevronLeft className="h-5 w-5" />
          </motion.button>

          <div className="flex gap-2">
            {MEMORIES.map((_, i) => (
              <button
                key={i}
                onClick={() => setState([i, i > index ? 1 : -1])}
                className="transition-all"
                aria-label={`Go to memory ${i + 1}`}
              >
                <div
                  className={`h-2 rounded-full transition-all ${
                    i === index ? 'w-6 bg-rose' : 'w-2 bg-rose/30'
                  }`}
                />
              </button>
            ))}
          </div>

          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => paginate(1)}
            className="flex h-10 w-10 items-center justify-center rounded-full glass text-rose"
            aria-label="Next memory"
          >
            <ChevronRight className="h-5 w-5" />
          </motion.button>
        </div>
      </div>
    </section>
  );
}
