// src/pages/LoveLetter.jsx
// ─── Handwritten love letter with typing animation ───────────

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import AuroraBackground from "../components/effects/AuroraBackground";
import RevealSection from "../components/animations/RevealSection";
import GlowText from "../components/ui/GlowText";
import { loveLetterText } from "../data";

// ─── Floating Petals ─────────────────────────────────────────
function FloatingPetal({ emoji, style }) {
  return (
    <motion.div
      className="fixed pointer-events-none text-2xl z-0 select-none"
      style={style}
      animate={{
        y: ["0vh", "110vh"],
        x: [0, Math.random() * 60 - 30],
        rotate: [0, 360],
        opacity: [0, 0.8, 0.8, 0],
      }}
      transition={{
        duration: Math.random() * 10 + 8,
        delay: Math.random() * 5,
        repeat: Infinity,
        ease: "linear",
      }}
    >
      {emoji}
    </motion.div>
  );
}

// ─── Letter Content (paragraph by paragraph) ─────────────────
const paragraphs = loveLetterText.split("\n\n");

export default function LoveLetter() {
  const [revealedParagraphs, setRevealedParagraphs] = useState(0);
  const [started, setStarted] = useState(false);
  const [finished, setFinished] = useState(false);

  // Auto-reveal paragraphs one by one
  useEffect(() => {
    if (!started) return;
    if (revealedParagraphs >= paragraphs.length) {
      setFinished(true);
      return;
    }
    const timer = setTimeout(() => {
      setRevealedParagraphs((p) => p + 1);
    }, 1200);
    return () => clearTimeout(timer);
  }, [started, revealedParagraphs]);

  const petals = Array.from({ length: 12 }, (_, i) => ({
    emoji: ["🌸", "💕", "🌺", "✨", "💫", "🌹"][i % 6],
    style: {
      left: `${Math.random() * 100}%`,
      top: `-${Math.random() * 20 + 5}%`,
    },
  }));

  return (
    <div className="relative min-h-screen py-32 px-6 overflow-hidden">
      <AuroraBackground opacity={0.12} />

      {/* Floating petals */}
      {started && petals.map((p, i) => <FloatingPetal key={i} {...p} />)}

      {/* Header */}
      <div className="text-center mb-20 relative z-10">
        <RevealSection>
          <p className="font-inter text-xs tracking-[0.4em] text-white/30 uppercase mb-6">
            ✦ From my heart to yours ✦
          </p>
          <GlowText as="h1" className="font-vibes text-7xl sm:text-8xl mb-6">
            A Letter For You
          </GlowText>
        </RevealSection>
      </div>

      {/* Paper / Letter */}
      <div className="relative z-10 max-w-2xl mx-auto">
        <motion.div
          className="relative rounded-3xl p-8 sm:p-12"
          style={{
            background: "linear-gradient(145deg, #1c1c1c, #141414)",
            boxShadow: "0 0 80px #ff4d8d22, 0 20px 60px rgba(0,0,0,0.5), inset 0 0 40px #ff4d8d08",
            border: "1px solid rgba(255, 77, 141, 0.15)",
          }}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
        >
          {/* Paper texture overlay */}
          <div className="absolute inset-0 rounded-3xl opacity-5 bg-[repeating-linear-gradient(0deg,_transparent,_transparent_27px,_#ff4d8d_27px,_#ff4d8d_28px)]" />

          {/* Decorative top */}
          <div className="text-center mb-8">
            <span className="text-3xl">💌</span>
          </div>

          {/* If not started — show Begin button */}
          {!started ? (
            <div className="text-center py-10">
              <p className="font-playfair italic text-white/40 mb-8 text-lg">
                This letter was written with every piece of my heart.
              </p>
              <motion.button
                onClick={() => { setStarted(true); setRevealedParagraphs(1); }}
                className="px-10 py-4 rounded-full font-poppins text-white text-sm tracking-wide cursor-pointer select-none relative z-20"
                style={{
                  background: "linear-gradient(135deg, #ff4d8d, #d946ef)",
                  boxShadow: "0 0 30px #ff4d8d66",
                  border: "none",
                  outline: "none",
                }}
                animate={{ boxShadow: ["0 0 20px #ff4d8d44", "0 0 50px #ff4d8daa", "0 0 20px #ff4d8d44"] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.95 }}
                data-cursor-hover
              >
                Open the Letter 💕
              </motion.button>
            </div>
          ) : (
            <div className="space-y-5">
              <AnimatePresence>
                {paragraphs.slice(0, revealedParagraphs).map((para, i) => (
                  <motion.p
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className={`leading-relaxed ${
                      i === 0 || i === paragraphs.length - 2
                        ? "font-vibes text-3xl text-rose-glow text-glow-soft"
                        : i === paragraphs.length - 1
                        ? "font-vibes text-2xl gradient-text text-right"
                        : "font-playfair text-white/75 text-base sm:text-lg"
                    }`}
                  >
                    {para}
                    {/* Typing cursor on last paragraph */}
                    {i === revealedParagraphs - 1 && !finished && (
                      <span className="typing-cursor" />
                    )}
                  </motion.p>
                ))}
              </AnimatePresence>

              {/* Finished flourish */}
              {finished && (
                <motion.div
                  className="text-center pt-6"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8 }}
                >
                  <motion.div
                    className="text-4xl"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    💕
                  </motion.div>
                  <p className="font-inter text-xs text-white/20 tracking-widest mt-4 uppercase">
                    Always & forever yours
                  </p>
                </motion.div>
              )}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
