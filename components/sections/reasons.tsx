'use client';

import { useCallback, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Heart, RefreshCw, Sparkles } from 'lucide-react';
import { REASONS } from '@/lib/reasons';

export function ReasonsSection() {
  const [reason, setReason] = useState<string | null>(null);
  const [count, setCount] = useState(0);
  const lastRef = useRef<number | null>(null);

  const pickReason = useCallback(() => {
    let next = Math.floor(Math.random() * REASONS.length);
    // never repeat immediately
    if (lastRef.current !== null && REASONS.length > 1) {
      let guard = 0;
      while (next === lastRef.current && guard < 10) {
        next = Math.floor(Math.random() * REASONS.length);
        guard += 1;
      }
    }
    lastRef.current = next;
    setReason(REASONS[next]);
    setCount((c) => c + 1);
  }, []);

  return (
    <section className="relative w-full overflow-hidden bg-gradient-to-b from-[#FFE9F1] via-[#FFF9FC] to-[#FFE9F1] px-6 py-20">
      <div className="mx-auto max-w-md text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-rose to-[#FF8FB1] glow-pink">
            <Heart className="h-5 w-5 fill-white text-white" />
          </div>
          <h2 className="font-hand text-4xl font-bold text-gradient-pink">
            100 Reasons
          </h2>
          <p className="mt-2 font-body text-sm text-foreground/60">
            Why I love you, one at a time
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-8"
        >
          <AnimatePresence mode="wait">
            {reason ? (
              <motion.div
                key={count}
                initial={{ opacity: 0, y: 20, rotateX: -20 }}
                animate={{ opacity: 1, y: 0, rotateX: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="glass relative mx-auto min-h-[180px] max-w-sm rounded-3xl p-7 text-left shadow-[0_20px_60px_-20px_rgba(255,92,138,0.35)]"
              >
                <div className="absolute -top-3 left-6 flex h-7 items-center rounded-full bg-gradient-to-r from-rose to-[#FF8FB1] px-3 text-[11px] font-medium text-white">
                  Reason #{count}
                </div>
                <p className="font-display text-lg leading-relaxed text-foreground/90">
                  {reason}
                </p>
                <Heart className="absolute bottom-4 right-4 h-4 w-4 fill-rose/20 text-rose/40" />
              </motion.div>
            ) : (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="glass mx-auto flex min-h-[180px] max-w-sm flex-col items-center justify-center rounded-3xl p-7 text-center"
              >
                <Sparkles className="h-8 w-8 text-rose/60" />
                <p className="mt-3 font-body text-sm text-foreground/60">
                  Press the button below to discover a reason
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            onClick={pickReason}
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-rose to-[#FF8FB1] px-7 py-3.5 font-body text-sm font-medium text-white glow-pink"
          >
            <RefreshCw className="h-4 w-4" />
            {reason ? 'Another Reason' : 'Why I Love You'}
            <Heart className="h-4 w-4 fill-white" />
          </motion.button>

          {count > 0 && (
            <p className="mt-4 font-body text-xs text-foreground/40">
              {count} of 100 reasons revealed
            </p>
          )}
        </motion.div>
      </div>
    </section>
  );
}
