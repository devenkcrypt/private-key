'use client';

import { motion } from 'framer-motion';
import { type ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface GlowButtonProps {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
  variant?: 'pink' | 'sky' | 'gold' | 'night';
  disabled?: boolean;
}

const variants = {
  pink: 'bg-gradient-to-r from-rose to-[#FF8FB1] text-white glow-pink',
  sky: 'bg-gradient-to-r from-sky to-nature text-white shadow-[0_0_24px_rgba(124,198,254,0.45)]',
  gold: 'bg-gradient-to-r from-amber-300 to-amber-500 text-white glow-gold',
  night: 'bg-gradient-to-r from-[#FF5C8A] to-[#FF8FB1] text-white glow-pink',
};

export function GlowButton({
  children,
  onClick,
  className,
  variant = 'pink',
  disabled,
}: GlowButtonProps) {
  return (
    <motion.button
      whileHover={{ scale: disabled ? 1 : 1.05 }}
      whileTap={{ scale: disabled ? 1 : 0.96 }}
      onClick={onClick}
      disabled={disabled}
      className={cn(
        'relative inline-flex items-center justify-center gap-2 rounded-full px-8 py-3.5 text-sm font-medium tracking-wide transition-shadow',
        variants[variant],
        disabled && 'opacity-50',
        className
      )}
    >
      {children}
    </motion.button>
  );
}
