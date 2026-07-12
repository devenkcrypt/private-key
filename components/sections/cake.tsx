'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Flame } from 'lucide-react';

function Candle({ lit, onBlow, x }: { lit: boolean; onBlow: () => void; x: number }) {
  return (
    <button
      onClick={onBlow}
      className="absolute -translate-x-1/2"
      style={{ left: `${x}%`, top: '-8px' }}
      aria-label="Blow out the candle"
    >
      {/* flame */}
      <AnimatePresence>
        {lit && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="relative -mb-1"
          >
            <motion.div
              animate={{ scaleY: [1, 1.15, 1], scaleX: [1, 0.9, 1] }}
              transition={{ duration: 0.6, repeat: Infinity, ease: 'easeInOut' }}
            >
              <Flame className="h-7 w-5 fill-amber-400 text-amber-500 drop-shadow-[0_0_10px_rgba(255,180,60,0.8)]" />
            </motion.div>
            <div className="absolute inset-0 -z-10 m-auto h-8 w-8 rounded-full bg-amber-300/40 blur-md" />
          </motion.div>
        )}
      </AnimatePresence>
      {/* smoke when blown */}
      <AnimatePresence>
        {!lit && (
          <motion.div
            initial={{ opacity: 0.6, y: 0 }}
            animate={{ opacity: 0, y: -40 }}
            transition={{ duration: 1.2 }}
            className="absolute left-1/2 -top-2 h-8 w-1 -translate-x-1/2 rounded-full bg-gray-300/40 blur-[3px]"
          />
        )}
      </AnimatePresence>
      {/* candle stick */}
      <div className="h-10 w-2 rounded-full bg-gradient-to-b from-white to-rose-soft" />
    </button>
  );
}

export function CakeSection() {
  const [lit, setLit] = useState([true, true, true]);
  const [celebrated, setCelebrated] = useState(false);

  const allOut = lit.every((l) => !l);

  const blow = (i: number) => {
    setLit((prev) => {
      const next = [...prev];
      next[i] = false;
      if (next.every((l) => !l) && !celebrated) {
        setCelebrated(true);
        setTimeout(() => {
          confetti({
            particleCount: 120,
            spread: 90,
            origin: { y: 0.5 },
            colors: ['#FF5C8A', '#FFD6E5', '#FF8FB1', '#5FA777', '#7CC6FE'],
          });
        }, 200);
      }
      return next;
    });
  };

  const blowAll = () => {
    setLit([false, false, false]);
    if (!celebrated) {
      setCelebrated(true);
      setTimeout(() => {
        confetti({
          particleCount: 120,
          spread: 90,
          origin: { y: 0.5 },
          colors: ['#FF5C8A', '#FFD6E5', '#FF8FB1', '#5FA777', '#7CC6FE'],
        });
      }, 200);
    }
  };

  return (
    <section className="relative w-full overflow-hidden bg-gradient-to-b from-[#2b1d44] via-[#FFF9FC] to-[#FFE9F1] px-6 py-20">
      {/* falling petals */}
      <div className="pointer-events-none absolute inset-0 z-10 overflow-hidden">
        {Array.from({ length: 14 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute top-[-10%]"
            style={{ left: `${(i * 7 + 4) % 100}%` }}
            initial={{ y: 0, opacity: 0, rotate: 0 }}
            animate={{
              y: '120vh',
              opacity: [0, 0.7, 0.7, 0],
              rotate: 360,
              x: [0, i % 2 ? 25 : -25, 0],
            }}
            transition={{
              duration: 12 + (i % 4) * 2,
              delay: i * 0.8,
              repeat: Infinity,
              ease: 'linear',
            }}
          >
            <svg width={16} height={16} viewBox="0 0 24 24">
              <path
                d="M12 2C14 6 18 8 18 12C18 16 15 18 12 18C9 18 6 16 6 12C6 8 10 6 12 2Z"
                fill={['#FF5C8A', '#FF8FB1', '#FFD6E5'][i % 3]}
                opacity="0.8"
              />
            </svg>
          </motion.div>
        ))}
      </div>

      <div className="relative z-20 mx-auto max-w-md text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="font-hand text-4xl font-bold text-gradient-pink"
        >
          Make a Wish
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-2 font-body text-sm text-foreground/60"
        >
          {allOut ? 'Your wish is on its way...' : 'Tap each candle to blow it out'}
        </motion.p>

        {/* Cake */}
        <div className="relative mx-auto mt-16 w-64">
          {/* candles */}
          <div className="absolute left-0 right-0 top-0 flex justify-center">
            <div className="relative h-0 w-48">
              <Candle lit={lit[0]} onBlow={() => blow(0)} x={30} />
              <Candle lit={lit[1]} onBlow={() => blow(1)} x={50} />
              <Candle lit={lit[2]} onBlow={() => blow(2)} x={70} />
            </div>
          </div>

          {/* top tier */}
          <motion.div
            animate={{ y: allOut ? [0, -4, 0] : 0 }}
            transition={{ duration: 2, repeat: allOut ? Infinity : 0 }}
            className="relative mx-auto mt-8 h-20 w-36 rounded-2xl bg-gradient-to-b from-[#FFB7CE] to-[#FF8FB1] shadow-lg"
          >
            {/* floral decorations */}
            <div className="absolute left-3 top-2 flex gap-1">
              {[0, 1, 2].map((i) => (
                <div key={i} className="h-3 w-3 rounded-full bg-rose-soft" />
              ))}
            </div>
            <div className="absolute right-3 top-2 flex gap-1">
              {[0, 1, 2].map((i) => (
                <div key={i} className="h-3 w-3 rounded-full bg-rose-soft" />
              ))}
            </div>
            {/* drips */}
            <div className="absolute -bottom-2 left-0 right-0 h-4 rounded-b-full bg-[#FFD6E5]" />
          </motion.div>

          {/* bottom tier */}
          <motion.div
            animate={{ y: allOut ? [0, -3, 0] : 0 }}
            transition={{ duration: 2.4, repeat: allOut ? Infinity : 0 }}
            className="relative mx-auto h-24 w-56 rounded-2xl bg-gradient-to-b from-[#FF8FB1] to-[#FF5C8A] shadow-[0_20px_50px_-10px_rgba(255,92,138,0.5)]"
          >
            {/* floral band */}
            <div className="absolute left-4 right-4 top-3 flex justify-between">
              {Array.from({ length: 7 }).map((_, i) => (
                <motion.div
                  key={i}
                  animate={{ scale: allOut ? [1, 1.2, 1] : 1 }}
                  transition={{ duration: 1.5, repeat: allOut ? Infinity : 0, delay: i * 0.1 }}
                  className="h-4 w-4 rounded-full bg-white/80"
                />
              ))}
            </div>
            <div className="absolute -bottom-2 left-0 right-0 h-4 rounded-b-full bg-[#FFD6E5]" />
          </motion.div>

          {/* plate */}
          <div className="mx-auto mt-2 h-3 w-64 rounded-full bg-foreground/10" />
        </div>

        {allOut && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="glass mt-10 rounded-3xl px-7 py-6"
          >
            <p className="font-hand text-2xl text-gradient-pink">
              Happy Birthday, Papa Kutty ❤️
            </p>
            <p className="mt-2 font-body text-sm text-foreground/70">
              May every wish of yours come true. I&apos;ll make sure of it.
            </p>
          </motion.div>
        )}

        {!allOut && (
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            onClick={blowAll}
            className="mt-10 inline-flex items-center gap-2 rounded-full glass px-6 py-3 font-body text-sm text-rose"
          >
            Blow all candles
          </motion.button>
        )}
      </div>
    </section>
  );
}
