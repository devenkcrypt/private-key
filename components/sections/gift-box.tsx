'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Gift, Heart } from 'lucide-react';

export function GiftBoxSection() {
  const [opened, setOpened] = useState(false);

  const handleOpen = () => {
    if (opened) return;
    setOpened(true);
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#FF5C8A', '#FFD6E5', '#FF8FB1', '#5FA777', '#7CC6FE'],
    });
    setTimeout(() => {
      confetti({
        particleCount: 50,
        angle: 60,
        spread: 55,
        origin: { x: 0, y: 0.7 },
        colors: ['#FF5C8A', '#FFD6E5', '#FF8FB1'],
      });
      confetti({
        particleCount: 50,
        angle: 120,
        spread: 55,
        origin: { x: 1, y: 0.7 },
        colors: ['#5FA777', '#7CC6FE', '#FFD6E5'],
      });
    }, 300);
  };

  return (
    <section className="relative min-h-[100svh] w-full overflow-hidden bg-gradient-to-b from-[#0d0820] via-[#1a1230] to-[#2b1d44] px-6 py-20">
      {/* ambient glow */}
      <div className="absolute left-1/2 top-1/3 h-72 w-72 -translate-x-1/2 rounded-full bg-rose/20 blur-[100px]" />

      <div className="relative z-10 mx-auto flex min-h-[80vh] max-w-md flex-col items-center justify-center text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="font-hand text-4xl font-bold text-gradient-pink"
        >
          A Gift For You
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-2 font-body text-sm text-white/60"
        >
          {opened ? 'You opened it...' : 'Tap the box to unwrap it'}
        </motion.p>

        {/* 3D Gift Box */}
        <div className="perspective mt-12" style={{ perspective: 800 }}>
          <motion.button
            onClick={handleOpen}
            whileHover={{ scale: opened ? 1 : 1.05 }}
            whileTap={{ scale: opened ? 1 : 0.95 }}
            className="relative preserve-3d"
            aria-label="Open the gift box"
          >
            <motion.div
              animate={opened ? { rotateX: -110, y: -20 } : { rotateX: 0, y: 0 }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              className="preserve-3d"
              style={{ transformOrigin: 'top' }}
            >
              {/* Lid */}
              <div className="relative h-10 w-52 rounded-lg bg-gradient-to-b from-[#FF8FB1] to-[#FF5C8A] shadow-lg">
                <div className="absolute left-1/2 top-0 h-full w-6 -translate-x-1/2 bg-gradient-to-b from-[#FFD6E5] to-[#FF8FB1]" />
                <div className="absolute -top-3 left-1/2 h-6 w-6 -translate-x-1/2 rounded-full bg-gradient-to-br from-[#FFD6E5] to-[#FF5C8A] glow-pink" />
              </div>
            </motion.div>

            {/* Box body */}
            <div className="relative mx-auto -mt-1 h-44 w-48 rounded-lg bg-gradient-to-b from-[#FF5C8A] to-[#c01e4d] shadow-[0_20px_50px_-10px_rgba(255,92,138,0.5)]">
              <div className="absolute left-1/2 top-0 h-full w-6 -translate-x-1/2 bg-gradient-to-b from-[#FF8FB1] to-[#FF5C8A] opacity-80" />
              {/* gift glow inside */}
              {opened && (
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.5, duration: 0.6 }}
                  className="absolute inset-0 flex items-center justify-center"
                >
                  <motion.div
                    animate={{ scale: [1, 1.15, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <Heart className="h-16 w-16 fill-white text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.8)]" />
                  </motion.div>
                </motion.div>
              )}
            </div>
          </motion.button>
        </div>

        {/* Message */}
        <AnimatePresence>
          {opened && (
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: 0.6, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="glass-dark mt-10 w-full max-w-sm rounded-3xl px-7 py-8"
            >
              <Gift className="mx-auto mb-3 h-6 w-6 text-rose" />
              <p className="font-hand text-2xl leading-relaxed text-white">
                &ldquo;The greatest gift in my life...
                <br />
                was never inside a box.
                <br />
                <span className="text-gradient-pink">It was you.</span>&rdquo;
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
