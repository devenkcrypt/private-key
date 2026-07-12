'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Heart } from 'lucide-react';

const MESSAGE = `Enakaga ellathaiyum accept panni,
ivlo naal wait pannura.

Innum konjam varusham dhaan.

Seekiram unna en vaazhkkaila
official-aa kootitu varuven.

Adhu varaikkum
ovvoru naalum
unnoda sirippu dhaan
enna vazha vaikkudhu.`;

export function FinalMessageSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-20%' });
  const [typed, setTyped] = useState('');
  const startedRef = useRef(false);

  useEffect(() => {
    if (!inView || startedRef.current) return;
    startedRef.current = true;
    let i = 0;
    const interval = setInterval(() => {
      i += 1;
      setTyped(MESSAGE.slice(0, i));
      if (i >= MESSAGE.length) clearInterval(interval);
    }, 55);
    return () => clearInterval(interval);
  }, [inView]);

  return (
    <section
      ref={ref}
      className="relative w-full overflow-hidden bg-gradient-to-b from-[#FFE9F1] via-[#FFF9FC] to-[#FFE9F1] px-6 py-24"
    >
      {/* falling petals */}
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        {Array.from({ length: 16 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute top-[-10%]"
            style={{ left: `${(i * 6 + 3) % 100}%` }}
            initial={{ y: 0, opacity: 0, rotate: 0 }}
            animate={{
              y: '125vh',
              opacity: [0, 0.6, 0.6, 0],
              rotate: 360,
              x: [0, i % 2 ? 30 : -30, 0],
            }}
            transition={{
              duration: 14 + (i % 4) * 2,
              delay: i * 0.7,
              repeat: Infinity,
              ease: 'linear',
            }}
          >
            <svg width={18} height={18} viewBox="0 0 24 24">
              <path
                d="M12 2C14 6 18 8 18 12C18 16 15 18 12 18C9 18 6 16 6 12C6 8 10 6 12 2Z"
                fill={['#FF5C8A', '#FF8FB1', '#FFD6E5'][i % 3]}
                opacity="0.75"
              />
            </svg>
          </motion.div>
        ))}
      </div>

      <div className="relative z-10 mx-auto max-w-md text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-rose to-[#FF8FB1] glow-pink">
            <motion.div
              animate={{ scale: [1, 1.15, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Heart className="h-6 w-6 fill-white text-white" />
            </motion.div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="glass rounded-3xl px-7 py-9 text-left shadow-[0_20px_60px_-20px_rgba(255,92,138,0.35)]"
        >
          <p className="font-hand text-2xl leading-relaxed text-foreground/90">
            {typed}
            <span className="text-rose typing-caret" />
          </p>

          {typed.length >= MESSAGE.length && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="mt-7 text-right"
            >
              <p className="font-hand text-3xl font-bold text-gradient-pink">
                Happy Birthday
                <br />
                Papa Kutty <span className="text-rose">❤️</span>
              </p>
              <div className="mt-5">
                <p className="font-body text-sm uppercase tracking-[0.3em] text-foreground/50">
                  Love
                </p>
                <p className="mt-1 font-hand text-2xl text-rose">
                  With You
                  <br />
                  Bawa <span className="text-rose">❤️</span>
                </p>
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
