// src/pages/FinalSurprise.jsx
// ─── The grand birthday finale ───────────────────────────────

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ConfettiExplosion from "../components/effects/ConfettiExplosion";
import AuroraBackground from "../components/effects/AuroraBackground";
import ParticleBackground from "../components/effects/ParticleBackground";
import RevealSection from "../components/animations/RevealSection";

const HER_NAME = "Akshaya"; // ← Change to your girlfriend's name

export default function FinalSurprise() {
  const [confetti, setConfetti] = useState(false);
  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setConfetti(true), 600);
    const t2 = setTimeout(() => setShowMessage(true), 1800);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center py-32 px-6 overflow-hidden text-center">
      <AuroraBackground opacity={0.2} />
      <ParticleBackground count={80} />
      <ConfettiExplosion trigger={confetti} continuous />

      {/* Giant Birthday text */}
      <RevealSection className="relative z-10 mb-12">
        <motion.p
          className="font-inter text-xs tracking-[0.4em] text-white/30 uppercase mb-6"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
        >✦ The Most Special Day ✦</motion.p>

        <motion.h1
          className="font-vibes text-[5rem] sm:text-[7rem] md:text-[9rem] leading-none gradient-text text-glow-rose"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: [0.34, 1.56, 0.64, 1] }}
        >
          Happy Birthday
        </motion.h1>

        <motion.h2
          className="font-vibes text-[4rem] sm:text-[6rem] text-rose-soft text-glow-soft leading-none"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          {HER_NAME} 💕
        </motion.h2>
      </RevealSection>

      {/* Floating emojis */}
      {["🎂","🎉","💕","✨","🌸","🎊","💖","🌺","🎈","💫"].map((e, i) => (
        <motion.div
          key={i}
          className="fixed pointer-events-none text-3xl"
          style={{ left: `${8 + i * 9}%`, top: `${10 + (i % 4) * 20}%` }}
          animate={{ y: [0, -20, 0], rotate: [-10, 10, -10], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 3 + i * 0.4, delay: i * 0.2, repeat: Infinity }}
        >
          {e}
        </motion.div>
      ))}

      {/* Message */}
      <AnimatePresence>
        {showMessage && (
          <motion.div
            className="relative z-10 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 1 }}
          >
            <div className="glass-rose rounded-3xl p-10 mb-8" style={{ boxShadow: "0 0 80px #ff4d8d33" }}>
              <p className="font-playfair italic text-xl sm:text-2xl text-white/80 leading-relaxed mb-6">
                On your birthday, I want you to know — you are the greatest gift
                this life has given me. Every single day with you is something I
                never want to take for granted.
              </p>
              <p className="font-playfair italic text-xl text-white/80 leading-relaxed">
                Here's to you. To us. To every beautiful day still ahead. 🥂
              </p>
            </div>

            <motion.p
              className="font-vibes text-5xl gradient-text text-glow-rose"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              I love you, forever. 💕
            </motion.p>

            {/* Replay confetti */}
            <motion.div className="mt-12" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}>
              <motion.button
                onClick={() => { setConfetti(false); setTimeout(() => setConfetti(true), 100); }}
                className="px-8 py-4 rounded-full font-poppins text-white text-sm"
                style={{ background: "linear-gradient(135deg, #ff4d8d, #d946ef)", boxShadow: "0 0 40px #ff4d8d44" }}
                whileHover={{ scale: 1.06, boxShadow: "0 0 60px #ff4d8daa" }}
                whileTap={{ scale: 0.97 }}
              >
                🎉 Celebrate Again!
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
