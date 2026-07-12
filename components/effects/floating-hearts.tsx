'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Heart } from 'lucide-react';

interface FloatingHeart {
  id: number;
  left: number;
  top: number;
  size: number;
  duration: number;
  delay: number;
  color: string;
}

const HEART_COLORS = ['#FF5C8A', '#FF8FB1', '#FF6B9D', '#FFA8C5', '#FF4D7D'];

function spawnHeart(id: number): FloatingHeart {
  return {
    id,
    left: Math.random() * 88 + 6,
    top: Math.random() * 80 + 10,
    size: 22 + Math.random() * 22,
    duration: 7 + Math.random() * 6,
    delay: Math.random() * 3,
    color: HEART_COLORS[id % HEART_COLORS.length],
  };
}

interface FloatingHeartsProps {
  unlocked: boolean;
  onHeartTap: () => void;
  tapCount: number;
  target: number;
}

export function FloatingHearts({ unlocked, onHeartTap, tapCount, target }: FloatingHeartsProps) {
  const [hearts, setHearts] = useState<FloatingHeart[]>([]);

  const heartsToShow = useMemo(() => {
    if (unlocked) return 0;
    return Math.max(target - tapCount, 0);
  }, [unlocked, tapCount, target]);

  useEffect(() => {
    if (unlocked) return;
    setHearts(Array.from({ length: target }, (_, i) => spawnHeart(i)));
    const interval = setInterval(() => {
      setHearts((prev) => prev.map((h) => spawnHeart(h.id)));
    }, 11000);
    return () => clearInterval(interval);
  }, [unlocked, target]);

  const handleTap = useCallback(
    (id: number) => {
      onHeartTap();
      setHearts((prev) => prev.filter((h) => h.id !== id));
    },
    [onHeartTap]
  );

  return (
    <div className="pointer-events-none fixed inset-0 z-40 overflow-hidden">
      <AnimatePresence>
        {!unlocked &&
          hearts.slice(0, heartsToShow).map((h) => (
            <motion.button
              key={h.id}
              className="pointer-events-auto absolute"
              style={{ left: `${h.left}%`, top: `${h.top}%` }}
              initial={{ scale: 0, opacity: 0, y: 20 }}
              animate={{
                scale: 1,
                opacity: 1,
                y: [0, -16, 0],
              }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{
                scale: { duration: 0.4 },
                opacity: { duration: 0.4 },
                y: { duration: h.duration, repeat: Infinity, ease: 'easeInOut', delay: h.delay },
              }}
              onClick={() => handleTap(h.id)}
              aria-label="A little heart"
            >
              <Heart
                size={h.size}
                fill={h.color}
                stroke="none"
                className="drop-shadow-[0_0_8px_rgba(255,92,138,0.5)]"
              />
            </motion.button>
          ))}
      </AnimatePresence>
    </div>
  );
}
