'use client';

import { motion } from 'framer-motion';
import { Heart, Lock, X } from 'lucide-react';

interface SecretLetterProps {
  open: boolean;
  onClose: () => void;
}

const PARAGRAPHS = [
  `My dearest Papa Kutty,

Yaravthu ava yaru nu keta.... Ennoda Favourite Person nu just oru word la solla mudiyathu...Athayum thaandi.... Ennoda ulagamey Ava dhan.... Ennoda Siriuppukku reason ae ava dhan... Ava pesalana.... Enaku andha naaley full fill aagadhu`,

  `Ava vena oru gues la Enaku avala ivlo pudikumnu nenachi irukalam...But ava nenaikuratha vida .... Enaku avala solla mudiyatha alavuku pudikkum... En life la enaku kidacha romba azhagana gift nee... Unna eppavum miss panna koodathunu nenaikuran...`,

  `Un Presence dhaan ennoda peace...Un message vandha odanae smile vandhudum....Un voice ketta manasu calm aagidum....Un mela irukura love, care, respect, affection...idhellam ovvoru naalum konjam konjama adhigama than aagudhu....`,

  `Nee en life la vandhadhuku "Thanks" nu solradhu romba chinna vaarthai...Un presence dhaan enlife ah innum azhaga maathudhu....elvo varusham ponaalum, Evelo per vandhaalum....En manasula unakkunu oru special place iruku....Adhu unakku mattum than....Vera yaarukum athula idam illa...Atha eppavum maranthudatha soltan`,

  `Oru naal, naan un kai-ya pidichu, all the world-ukkaga unna en magal-aaga theerkiren. Adhu varaikkum, ovvoru naalum, en heartbeat-um unna dhaan ninachu function aagum. Yen heartbeat, yenna vida unna dhaan thaan theva nu solluthu. En soul unkita thaan iruku. Adhu dhaan enaku mukkiyam. Adhu dhaan en vaazhkkaiyum....

Ellorum kekkurathu idhu thaan: "Who is she?" Naan solluren, "She is the reason my heart still knows how to love."

Forever yours,
Bawa ❤️`,
];

export function SecretLetter({ open, onClose }: SecretLetterProps) {
  if (!open) return null;

  return (
    <motion.div
      className="fixed inset-0 z-[120] flex items-start justify-center overflow-y-auto bg-black/60 px-4 py-10 backdrop-blur-md"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0, y: 40 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="glass relative my-auto w-full max-w-md rounded-3xl px-7 py-9 text-left shadow-[0_30px_80px_-20px_rgba(255,92,138,0.5)]"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute right-4 top-4 z-10 text-foreground/40 transition hover:text-foreground"
          aria-label="Close"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="mb-5 flex flex-col items-center text-center">
          <motion.div
            initial={{ scale: 0, rotate: -30 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-rose to-[#FF8FB1] glow-pink"
          >
            <Lock className="h-6 w-6 text-white" />
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-4 font-hand text-3xl font-bold text-gradient-pink"
          >
            Only For You <span className="text-rose">❤️</span>
          </motion.h2>
          <p className="mt-1 font-body text-xs text-foreground/50">
            You found the hidden hearts. This was waiting for you.
          </p>
        </div>

        <div className="space-y-4">
          {PARAGRAPHS.map((p, i) => (
            <motion.p
              key={i}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + i * 0.35, duration: 0.6 }}
              className="font-body text-[15px] leading-relaxed text-foreground/85"
            >
              {p}
            </motion.p>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.5 }}
          className="mt-7 flex items-center justify-center gap-2 text-rose"
        >
          <Heart className="h-4 w-4 fill-rose" />
          <span className="font-hand text-lg">tap outside to return</span>
          <Heart className="h-4 w-4 fill-rose" />
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
