'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Heart, MailOpen } from 'lucide-react';
import { FloatingPetals } from '@/components/effects/particles';

export function EnvelopeSection() {
  const [opened, setOpened] = useState(false);

  return (
    <section className="relative min-h-[100svh] w-full overflow-hidden bg-gradient-to-b from-[#0d0820] via-[#2b1d44] to-[#FFF9FC] px-6 pb-16 pt-24">
      <FloatingPetals count={10} />

      <div className="relative z-10 mx-auto flex min-h-[80vh] max-w-md flex-col items-center justify-center text-center">
        {!opened && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-center"
          >
            <h2 className="font-display text-2xl font-semibold text-white">
              A letter for you
            </h2>
            <p className="mt-2 font-body text-sm text-white/60">
              Tap the envelope to open it
            </p>

            {/* Envelope */}
            <motion.button
              onClick={() => setOpened(true)}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              className="mt-10"
              aria-label="Open the envelope"
            >
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                className="relative"
              >
                <svg width="220" height="170" viewBox="0 0 220 170" fill="none">
                  <defs>
                    <linearGradient id="env" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%" stopColor="#FF8FB1" />
                      <stop offset="100%" stopColor="#FF5C8A" />
                    </linearGradient>
                    <linearGradient id="envFlap" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#FFB7CE" />
                      <stop offset="100%" stopColor="#FF5C8A" />
                    </linearGradient>
                  </defs>
                  {/* body */}
                  <rect x="10" y="40" width="200" height="120" rx="10" fill="url(#env)" />
                  <path d="M10 50 L110 110 L210 50" stroke="#fff" strokeWidth="2" fill="none" opacity="0.4" />
                  {/* flap */}
                  <motion.path
                    d="M10 50 L110 110 L210 50"
                    fill="url(#envFlap)"
                    stroke="#FFD6E5"
                    strokeWidth="1.5"
                  />
                  {/* seal */}
                  <circle cx="110" cy="50" r="12" fill="#FFD6E5" />
                  <text x="110" y="55" textAnchor="middle" fontSize="13" fill="#FF5C8A" fontWeight="bold">❤</text>
                </svg>
              </motion.div>
            </motion.button>

            <motion.div
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="mt-4 flex items-center gap-2 font-hand text-lg text-rose"
            >
              <MailOpen className="h-4 w-4" /> tap to open
            </motion.div>
          </motion.div>
        )}

        <AnimatePresence>
          {opened && (
            <motion.div
              initial={{ opacity: 0, scale: 0.6, rotateX: -40 }}
              animate={{ opacity: 1, scale: 1, rotateX: 0 }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
              className="w-full"
              style={{ perspective: 1000 }}
            >
              {/* Letter card */}
              <div className="glass relative rounded-3xl px-7 py-9 text-left shadow-[0_20px_60px_-20px_rgba(255,92,138,0.4)]">
                {/* wax seal */}
                <div className="absolute -top-5 left-1/2 -translate-x-1/2">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-rose to-[#FF8FB1] glow-pink">
                    <Heart className="h-4 w-4 fill-white text-white" />
                  </div>
                </div>

                <motion.h3
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="font-hand text-3xl font-bold text-gradient-pink text-center"
                >
                  Happy Birthday Papa Kutty ❤️
                </motion.h3>

                <div className="mt-5 space-y-3 font-body text-[15px] leading-relaxed text-foreground/85">
                  {[
                    'Today is not just your birthday.',
                    'It is the day the world received the most beautiful soul that later became my happiness.',
                    'Every smile of yours became my peace.',
                    'Every little fight became another reason to love you more.',
                    'Thank you for existing.',
                  ].map((line, i) => (
                    <motion.p
                      key={i}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 + i * 0.5 }}
                      className={i === 4 ? 'font-hand text-xl text-rose' : ''}
                    >
                      {line}
                    </motion.p>
                  ))}
                </div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 3 }}
                  className="mt-6 text-right font-hand text-xl text-rose"
                >
                  Forever yours ❤️
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
