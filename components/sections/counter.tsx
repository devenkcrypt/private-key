'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';

const START = new Date('2021-11-23T00:00:00');

interface Diff {
  years: number;
  months: number;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function getDiff(now: Date): Diff {
  let years = now.getFullYear() - START.getFullYear();
  let months = now.getMonth() - START.getMonth();
  let days = now.getDate() - START.getDate();
  let hours = now.getHours() - START.getHours();
  let minutes = now.getMinutes() - START.getMinutes();
  let seconds = now.getSeconds() - START.getSeconds();

  if (seconds < 0) { seconds += 60; minutes -= 1; }
  if (minutes < 0) { minutes += 60; hours -= 1; }
  if (hours < 0) { hours += 24; days -= 1; }
  if (days < 0) {
    const prev = new Date(now.getFullYear(), now.getMonth(), 0);
    days += prev.getDate();
    months -= 1;
  }
  if (months < 0) { months += 12; years -= 1; }
  return { years, months, days, hours, minutes, seconds };
}

const UNITS: { key: keyof Diff; label: string }[] = [
  { key: 'years', label: 'Years' },
  { key: 'months', label: 'Months' },
  { key: 'days', label: 'Days' },
  { key: 'hours', label: 'Hours' },
  { key: 'minutes', label: 'Minutes' },
  { key: 'seconds', label: 'Seconds' },
];

function UnitCard({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <div className="glass relative w-[68px] rounded-2xl py-3 text-center">
        <motion.span
          key={value}
          initial={{ y: -14, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="block font-display text-2xl font-bold text-gradient-pink"
        >
          {String(value).padStart(2, '0')}
        </motion.span>
        <div className="absolute inset-x-2 -bottom-px h-px bg-gradient-to-r from-transparent via-rose/40 to-transparent" />
      </div>
      <span className="mt-2 font-body text-[10px] uppercase tracking-[0.2em] text-foreground/50">
        {label}
      </span>
    </div>
  );
}

export function CounterSection() {
  const [diff, setDiff] = useState<Diff | null>(null);

  useEffect(() => {
    setDiff(getDiff(new Date()));
    const id = setInterval(() => setDiff(getDiff(new Date())), 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="relative w-full overflow-hidden bg-gradient-to-b from-[#FFF9FC] via-[#FFE9F1] to-[#FFF9FC] px-6 py-20">
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
            We&apos;ve Been Together
          </h2>
          <p className="mt-2 font-body text-sm text-foreground/60">
            Counting every heartbeat since 23 November 2021
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mt-10 grid grid-cols-3 gap-3"
        >
          {UNITS.map((u) => (
            <UnitCard
              key={u.key}
              value={diff ? diff[u.key] : 0}
              label={u.label}
            />
          ))}
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-8 font-hand text-xl text-rose"
        >
          ...and every second is a gift ❤️
        </motion.p>
      </div>
    </section>
  );
}
