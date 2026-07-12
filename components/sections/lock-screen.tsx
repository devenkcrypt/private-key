'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Heart, Lock, Sparkles } from 'lucide-react';

const PASSWORD = '2707';

interface LockScreenProps {
  onUnlock: () => void;
}

export function LockScreen({ onUnlock }: LockScreenProps) {
  const [value, setValue] = useState('');
  const [error, setError] = useState(false);
  const [shakeKey, setShakeKey] = useState(0);
  const [unlocking, setUnlocking] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (value === PASSWORD) {
      setUnlocking(true);
      setTimeout(() => onUnlock(), 1400);
    } else {
      setError(true);
      setShakeKey((k) => k + 1);
      setValue('');
    }
  };

  return (
    <AnimatePresence>
      {!unlocking && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden"
          exit={{ opacity: 0, scale: 1.1 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Night romantic gradient background */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,#3a2156_0%,#241540_45%,#0d0820_100%)]" />

          {/* Floating soft petals */}
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            {[...Array(14)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute bottom-[-10%]"
                style={{ left: `${(i * 7 + 5) % 100}%` }}
                initial={{ y: 0, opacity: 0, rotate: 0 }}
                animate={{
                  y: '-115vh',
                  opacity: [0, 0.5, 0.5, 0],
                  rotate: 360,
                  x: [0, (i % 2 ? 40 : -40), 0],
                }}
                transition={{
                  duration: 16 + (i % 5) * 3,
                  delay: i * 1.4,
                  repeat: Infinity,
                  ease: 'linear',
                }}
              >
                <svg width={16 + (i % 4) * 6} height={16 + (i % 4) * 6} viewBox="0 0 24 24">
                  <path
                    d="M12 2C14 6 18 8 18 12C18 16 15 18 12 18C9 18 6 16 6 12C6 8 10 6 12 2Z"
                    fill={['#FF5C8A', '#FF8FB1', '#FFD6E5'][i % 3]}
                    opacity="0.8"
                  />
                </svg>
              </motion.div>
            ))}
          </div>

          {/* Twinkling stars */}
          <div className="pointer-events-none absolute inset-0">
            {[...Array(40)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute h-[2px] w-[2px] rounded-full bg-white"
                style={{
                  left: `${(i * 37) % 100}%`,
                  top: `${(i * 53) % 100}%`,
                }}
                animate={{ opacity: [0.2, 1, 0.2], scale: [0.6, 1.3, 0.6] }}
                transition={{
                  duration: 2 + (i % 3),
                  delay: i * 0.1,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />
            ))}
          </div>

          {/* Glowing orb behind card */}
          <div className="absolute h-72 w-72 rounded-full bg-rose/30 blur-[100px]" />
          <div className="absolute right-[20%] top-[25%] h-40 w-40 rounded-full bg-sky/20 blur-[80px]" />

          {/* Lock card */}
          <motion.div
            key={shakeKey}
            className="glass-dark relative z-10 w-[88%] max-w-sm rounded-3xl px-7 py-9 text-center"
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
              x: error ? [0, -10, 10, -8, 8, 0] : 0,
            }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.div
              className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-rose to-[#FF8FB1] glow-pink"
              animate={{ scale: [1, 1.08, 1] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            >
              <Lock className="h-7 w-7 text-white" strokeWidth={2.2} />
            </motion.div>

            <h1 className="font-display text-2xl font-semibold leading-tight text-white">
              For Someone Very Special{' '}
              <Heart className="inline h-5 w-5 fill-rose text-rose align-middle" />
            </h1>

            <p className="mt-3 font-body text-sm text-white/70">
              This heart is locked. Enter the little secret only you and I know.
            </p>

            <form onSubmit={handleSubmit} className="mt-6">
              <input
                type="password"
                inputMode="numeric"
                autoFocus
                value={value}
                onChange={(e) => {
                  setValue(e.target.value);
                  setError(false);
                }}
                placeholder="• • • •"
                maxLength={6}
                className="w-full rounded-2xl border border-white/20 bg-white/10 px-5 py-3.5 text-center font-display text-xl tracking-[0.5em] text-white placeholder:text-white/30 focus:border-rose focus:outline-none focus:ring-2 focus:ring-rose/40"
              />

              <AnimatePresence>
                {error && (
                  <motion.p
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="mt-3 font-hand text-base text-rose"
                  >
                    This heart opens only for one person ❤️
                  </motion.p>
                )}
              </AnimatePresence>

              <motion.button
                type="submit"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-rose to-[#FF8FB1] px-6 py-3.5 font-body text-sm font-medium tracking-wide text-white glow-pink"
              >
                <Sparkles className="h-4 w-4" />
                Unlock My Heart
              </motion.button>
            </form>
          </motion.div>
        </motion.div>
      )}

      {/* Unlocking bloom */}
      {unlocking && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-[radial-gradient(ellipse_at_50%_50%,#3a2156_0%,#0d0820_100%)]"
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          transition={{ duration: 1.3, delay: 0.1 }}
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 40 }}
            transition={{ duration: 1.3, ease: [0.22, 1, 0.36, 1] }}
            className="h-40 w-40 rounded-full bg-gradient-to-br from-rose to-[#FF8FB1] glow-pink"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
