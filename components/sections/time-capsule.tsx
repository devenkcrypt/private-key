'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Gift, Lock, X } from 'lucide-react';

export function TimeCapsuleSection() {
  const [open, setOpen] = useState(false);

  return (
    <section className="relative w-full overflow-hidden bg-gradient-to-b from-[#FFE9F1] to-[#FFF9FC] px-6 py-20">
      <div className="mx-auto max-w-md text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-rose to-[#FF8FB1] glow-pink"
          >
            <Gift className="h-7 w-7 text-white" />
          </motion.div>

          <h2 className="font-hand text-4xl font-bold text-gradient-pink">
            Next Birthday 🎁
          </h2>
          <p className="mt-3 font-body text-sm text-foreground/60">
            A little capsule waiting for next year
          </p>

          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            onClick={() => setOpen(true)}
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-rose to-[#FF8FB1] px-8 py-3.5 font-body text-sm font-medium text-white glow-pink"
          >
            <Lock className="h-4 w-4" />
            Open
          </motion.button>
        </motion.div>
      </div>

      {/* Popup */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[90] flex items-center justify-center bg-black/50 px-6 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.7, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.7, opacity: 0, y: 30 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="glass relative w-full max-w-sm rounded-3xl px-7 py-9 text-center"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setOpen(false)}
                className="absolute right-4 top-4 text-foreground/40 transition hover:text-foreground"
                aria-label="Close"
              >
                <X className="h-5 w-5" />
              </button>

              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2.5, repeat: Infinity }}
                className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-rose to-[#FF8FB1] glow-pink"
              >
                <Lock className="h-6 w-6 text-white" />
              </motion.div>

              <h3 className="font-display text-2xl font-semibold text-gradient-pink">
                Not yet...
              </h3>
              <p className="mt-3 font-hand text-2xl text-rose">
                See you next year ❤️
              </p>
              <p className="mt-3 font-body text-sm text-foreground/60">
                Some things are worth the wait. This one definitely is.
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
