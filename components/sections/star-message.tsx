'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Star, X } from 'lucide-react';
import { NightSky } from '@/components/effects/night-sky';

export function StarSection() {
  const [revealed, setRevealed] = useState(false);

  return (
    <section className="relative h-[100svh] w-full">
      <NightSky starCount={70}>
        <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="font-hand text-4xl font-bold text-gradient-pink"
          >
            Look up
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="mt-2 font-body text-sm text-white/60"
          >
            One star shines brighter than the rest. Tap it.
          </motion.p>

          {/* Bright star */}
          <motion.button
            onClick={() => setRevealed(true)}
            className="group absolute left-1/2 top-[38%] -translate-x-1/2 -translate-y-1/2"
            aria-label="Tap the bright star"
          >
            <motion.div
              animate={{
                scale: [1, 1.15, 1],
                filter: [
                  'drop-shadow(0 0 12px rgba(255,210,120,0.7))',
                  'drop-shadow(0 0 28px rgba(255,210,120,1))',
                  'drop-shadow(0 0 12px rgba(255,210,120,0.7))',
                ],
              }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              className="relative"
            >
              <Star className="h-12 w-12 fill-amber-200 text-amber-200" />
              <div className="absolute inset-0 -z-10 m-auto h-20 w-20 rounded-full bg-amber-200/30 blur-2xl" />
            </motion.div>
            <motion.div
              className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap font-body text-[10px] uppercase tracking-[0.3em] text-amber-200/70"
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              tap me
            </motion.div>
          </motion.button>

          {/* Message overlay */}
          <AnimatePresence>
            {revealed && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm"
                onClick={() => setRevealed(false)}
              >
                <motion.div
                  initial={{ opacity: 0, scale: 0.8, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                  className="glass-dark relative w-[90%] max-w-sm rounded-3xl px-7 py-8 text-center shadow-[0_20px_50px_rgba(255,210,120,0.15)]"
                  onClick={(e) => e.stopPropagation()}
                >
                  <button
                    onClick={() => setRevealed(false)}
                    className="absolute right-4 top-4 text-white/50 hover:text-white transition"
                    aria-label="Close message"
                  >
                    <X className="h-5 w-5" />
                  </button>
                  <Star className="mx-auto mb-3 h-6 w-6 fill-amber-200 text-amber-200" />
                  <p className="font-hand text-2xl leading-relaxed text-white">
                    &ldquo;No matter how dark life becomes,
                    <br />
                    I&apos;ll always search for your light.&rdquo;
                  </p>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </NightSky>
    </section>
  );
}
