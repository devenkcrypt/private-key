'use client';

import { useCallback, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { LockScreen } from '@/components/sections/lock-screen';
import { HeroSection } from '@/components/sections/hero';
import { EnvelopeSection } from '@/components/sections/envelope';
import { CounterSection } from '@/components/sections/counter';
import { MemoriesSection } from '@/components/sections/memories';
import { ReasonsSection } from '@/components/sections/reasons';
import { StarSection } from '@/components/sections/star-message';
import { GiftBoxSection } from '@/components/sections/gift-box';
import { CakeSection } from '@/components/sections/cake';
import { FinalMessageSection } from '@/components/sections/final-message';
import { TimeCapsuleSection } from '@/components/sections/time-capsule';
import { FloatingHearts } from '@/components/effects/floating-hearts';
import { SecretLetter } from '@/components/sections/secret-letter';
import { FloatingPetals } from '@/components/effects/particles';

const HEART_TARGET = 5;

export default function Home() {
  const [unlocked, setUnlocked] = useState(false);
  const [heartCount, setHeartCount] = useState(0);
  const [secretOpen, setSecretOpen] = useState(false);

  const handleHeartTap = useCallback(() => {
    setHeartCount((c) => {
      const next = c + 1;
      if (next >= HEART_TARGET) {
        setTimeout(() => setSecretOpen(true), 400);
      }
      return next;
    });
  }, []);

  const secretUnlocked = heartCount >= HEART_TARGET;

  return (
    <main className="relative min-h-screen w-full overflow-x-hidden">
      <AnimatePresence>
        {!unlocked && <LockScreen onUnlock={() => setUnlocked(true)} />}
      </AnimatePresence>

      {unlocked && (
        <>
          <FloatingPetals count={14} />
          <FloatingHearts
            unlocked={secretUnlocked}
            onHeartTap={handleHeartTap}
            tapCount={heartCount}
            target={HEART_TARGET}
          />

          {/* Heart counter hint */}
          {unlocked && !secretUnlocked && (
            <div className="pointer-events-none fixed bottom-4 left-1/2 z-50 -translate-x-1/2">
              <div className="glass flex items-center gap-2 rounded-full px-4 py-2 text-xs text-foreground/70">
                <span>Find floating hearts</span>
                <span className="font-semibold text-rose">
                  {heartCount}/{HEART_TARGET}
                </span>
              </div>
            </div>
          )}

          <HeroSection onEnter={() => {
            document.getElementById('journey-start')?.scrollIntoView({ behavior: 'smooth' });
          }} />

          <div id="journey-start" className="scroll-mt-0">
            <EnvelopeSection />
          </div>
          <CounterSection />
          <MemoriesSection />
          <ReasonsSection />
          <StarSection />
          <GiftBoxSection />
          <CakeSection />
          <FinalMessageSection />
          <TimeCapsuleSection />

          <footer className="relative w-full bg-[#FFF9FC] px-6 py-10 text-center">
            <p className="font-hand text-lg text-rose">
              Made with love, only for you.
            </p>
            <p className="mt-1 font-body text-xs text-foreground/40">
              Forever yours, Bawa <span className="text-rose">❤️</span>
            </p>
          </footer>

          <AnimatePresence>
            {secretOpen && (
              <SecretLetter open={secretOpen} onClose={() => setSecretOpen(false)} />
            )}
          </AnimatePresence>
        </>
      )}
    </main>
  );
}
