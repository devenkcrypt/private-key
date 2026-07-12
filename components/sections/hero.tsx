'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Heart, Sparkles } from 'lucide-react';
import { NightSky } from '@/components/effects/night-sky';

const LINES = ['Happy Birthday', 'Papa Kutty ❤️', 'I made something only for you...'];

export function HeroSection({ onEnter }: { onEnter: () => void }) {
  const [step, setStep] = useState(0);
  const [typed, setTyped] = useState('');

  useEffect(() => {
    if (step >= LINES.length) return;
    const line = LINES[step];
    let i = 0;
    setTyped('');
    const interval = setInterval(() => {
      i += 1;
      setTyped(line.slice(0, i));
      if (i >= line.length) {
        clearInterval(interval);
        setTimeout(() => setStep((s) => s + 1), 900);
      }
    }, 75);
    return () => clearInterval(interval);
  }, [step]);

  return (
    <section className="relative h-[100svh] w-full">
      <NightSky starCount={80}>
        <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center">
          {/* Floating heart accent */}
          <motion.div
            className="mb-6"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-rose to-[#FF8FB1] glow-pink"
            >
              <Heart className="h-6 w-6 fill-white text-white" />
            </motion.div>
          </motion.div>

          {/* Typewriter lines */}
          <div className="min-h-[220px]">
            <AnimatePresence mode="popLayout">
              {step < LINES.length && (
                <motion.div key={step} layout className="space-y-2">
                  {step === 0 && (
                    <h2 className="font-body text-sm uppercase tracking-[0.4em] text-white/50">
                      {typed}
                      <span className="text-rose typing-caret" />
                    </h2>
                  )}
                  {step === 1 && (
                    <h1 className="font-hand text-6xl font-bold text-gradient-pink drop-shadow-[0_0_30px_rgba(255,92,138,0.4)]">
                      {typed}
                      <span className="text-rose typing-caret" />
                    </h1>
                  )}
                  {step === 2 && (
                    <p className="mx-auto max-w-xs font-display text-lg italic text-white/80">
                      {typed}
                      <span className="text-rose typing-caret" />
                    </p>
                  )}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Final persistent display */}
            {step >= LINES.length && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="space-y-4"
              >
                <h2 className="font-body text-sm uppercase tracking-[0.4em] text-white/50">
                  Happy Birthday
                </h2>
                <h1 className="font-hand text-6xl font-bold text-gradient-pink drop-shadow-[0_0_30px_rgba(255,92,138,0.4)]">
                  Papa Kutty <span className="text-rose">❤️</span>
                </h1>
                <p className="mx-auto max-w-xs font-display text-lg italic text-white/80">
                  I made something only for you...
                </p>

                <motion.button
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.4, duration: 0.6 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={onEnter}
                  className="mt-6 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-rose to-[#FF8FB1] px-8 py-4 font-body text-sm font-medium tracking-wide text-white glow-pink"
                >
                  <Sparkles className="h-4 w-4" />
                  Open My Heart
                  <Heart className="h-4 w-4 fill-white" />
                </motion.button>
              </motion.div>
            )}
          </div>
        </div>

        {/* scroll hint */}
        {step >= LINES.length && (
          <motion.div
            className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="font-body text-[10px] uppercase tracking-[0.3em] text-white/40"
            >
              A little world for you
            </motion.div>
          </motion.div>
        )}
      </NightSky>
    </section>
  );
}
