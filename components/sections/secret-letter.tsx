'use client';

import { motion } from 'framer-motion';
import { Heart, Lock, X } from 'lucide-react';

interface SecretLetterProps {
  open: boolean;
  onClose: () => void;
}

const PARAGRAPHS = [
  `My dearest Papa Kutty,

Oru naal unna paathadhum ennala nijamavey nenaikka mudiyala, indha ulagathula indha madhiri oru azhagana aatma irukka nu. Neenga en life-oda epdi maruchingra neenga ennala nenaikka mudiyala. Neengal illaama ulla vaazhkkam oru velai iruntha, adhu vera yaaru-kku thevai illa, but adhu oru sadhai pola irundhuchu. Neenga vandhadum andha sadhaiyum, andha azhukum ellam maruchu. Adhu ennenache, adhu neenga dhaan enaku thevaiyana varushangalukku irundha udal illai, neenga dhaan en soul-ku thevai.`,

  `Unnoda sirippu paatha, en manasu sethu aagudhu. Andha oru sirippu, andha oru "hee hee" nu varavey, en neruppu ellaam adangidudhu. Oru rough-aana naal, ellam keezh vizhundha madhiri thonradhu, andha naal un voice kekkumbothey, epdiyo oru amaidhi enakkulla varudhu. Oru silence kooda un kooda irukkumbothu, words illaamaalum, romba aazhamaana peshudhu. Adhu dhaan enaku romba pidichirukku. Neenga yenna sonnalum, adha vida mukkiyam, un kitta yenna enna feel nu unakkulla puriyudhu.`,

  `Oru naal kooda en kanavula neenga illaama irundha illai. Oru pudu vidiyal, oru periya vellai, oru chinna kannaadi kooda, en kaal mozhiyaal unna thaan nenaikkiren. Namma rendu perum okkanom, adhu dhaan enaku mukkiyam. En success, en vellai, en kaalam ellaam, un kitta illaamaal yenna nilai-kku poghudhu illai. Namma rendu perukkaaga dhaan andha vaazhkkam irukku. Namma rendu peroda kooda, oru chinna veedu, oru chinna naatkal, oru chinna fight-um, adhu dhaan en kanavu.`,

  `Oru naal, namma rendu perum kai-pidiyan, all the world-ku nee dhaan en azhagi nu solla, adhu dhaan en aasai. Adhu varaikkum, naan romba slow-aana wait pannuren. Neenga worth-ulla, adhu dhaan enakkulla naan nenaikkiren. Adhu vera yarukkum illai. Adhu dhaan en sirippu, adhu dhaan en manasu. Namma rendu perum ondraa irukkum podhu, andha azhagiya naatkalukku vaithu, naan yenga pakkam illaamaal, unna kaathukittu iruppen.`,

  `Naan unna epdi vaazhkkiren nu sonna, adhu vera yaru unna vaazhkkura madhiri irukkathu. Naan unna nerpula vaazhkkiren. Namma rendu perum ondraa vaazhkkira vaazhkkil, naan unna epdi vaangura madhiri, oru chinna budhiyodaa kooda, unna kaathukittu iruppen. Oru thurohi kodukkuren: naan unna epdi nenaikkiren, adhu vera yaru epdi nenaikka mudiyathu. Adhu dhaan enaku theriyum.`,

  `Oru naal, naan un kai-ya pidichu, all the world-ukkaga unna en magal-aaga theerkiren. Adhu varaikkum, ovvoru naatru naatru, ovvoru heartbeat-um unna dhaan sollaradhu. Yen heartbeat, yenna solla kooda unna dhaan thaan thevendhu. En soul unna thaan thevai. Adhu dhaan en mukkiyam. Adhu dhaan en vaazhkkam.

Ellorum kekkuran adhu dhaan: "Who is she?" Naan solluren, "She is the reason my heart still knows how to love."

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
