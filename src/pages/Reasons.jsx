// src/pages/Reasons.jsx
// ─── Interactive "100 Reasons I Love You" experience ─────────

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaHeart, FaShuffle } from "react-icons/fa6";
import AuroraBackground from "../components/effects/AuroraBackground";
import ParticleBackground from "../components/effects/ParticleBackground";
import RevealSection from "../components/animations/RevealSection";
import GlowText from "../components/ui/GlowText";
import AnimatedButton from "../components/ui/AnimatedButton";
import { loveReasons } from "../data";

// ─── Main Reason Card ────────────────────────────────────────
function ReasonCard({ reason, number }) {
  return (
    <motion.div
      key={reason}
      className="glass-rose rounded-3xl p-10 text-center max-w-lg mx-auto relative overflow-hidden"
      initial={{ opacity: 0, scale: 0.8, rotateY: -30 }}
      animate={{ opacity: 1, scale: 1, rotateY: 0 }}
      exit={{ opacity: 0, scale: 0.8, rotateY: 30 }}
      transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      {/* Glow BG */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_#ff4d8d18_0%,_transparent_70%)]" />

      {/* Number badge */}
      <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-rose-glow/20 border border-rose-glow/30 mb-6">
        <span className="text-rose-glow text-xs font-poppins font-medium">{number}</span>
      </div>

      {/* Reason text */}
      <p className="font-playfair text-2xl sm:text-3xl text-white/90 leading-relaxed relative">
        {reason}
      </p>

      {/* Heart */}
      <motion.div
        className="mt-8 text-2xl"
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        💕
      </motion.div>
    </motion.div>
  );
}

export default function Reasons() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [seen, setSeen] = useState(new Set([0]));
  const [showAll, setShowAll] = useState(false);

  const pickRandom = useCallback(() => {
    let next;
    // Try to pick unseen first
    const unseen = loveReasons
      .map((_, i) => i)
      .filter((i) => !seen.has(i));

    if (unseen.length > 0) {
      next = unseen[Math.floor(Math.random() * unseen.length)];
    } else {
      // All seen — reset
      setSeen(new Set());
      next = Math.floor(Math.random() * loveReasons.length);
    }
    setSeen((s) => new Set([...s, next]));
    setCurrentIndex(next);
  }, [seen]);

  return (
    <div className="relative min-h-screen py-32 px-6">
      <AuroraBackground opacity={0.12} />
      <ParticleBackground count={35} />

      {/* Header */}
      <div className="text-center mb-20 relative z-10">
        <RevealSection>
          <p className="font-inter text-xs tracking-[0.4em] text-white/30 uppercase mb-6">
            ✦ Counted & Uncountable ✦
          </p>
          <GlowText as="h1" className="font-vibes text-7xl sm:text-8xl mb-6">
            Why I Love You
          </GlowText>
          <p className="font-playfair italic text-xl text-white/50 max-w-xl mx-auto">
            One hundred reasons. Each one true. Each one not nearly enough.
          </p>
        </RevealSection>
      </div>

      {/* Interactive Card */}
      <div className="relative z-10 max-w-2xl mx-auto">
        {/* Progress */}
        <RevealSection className="text-center mb-8">
          <p className="font-inter text-xs text-white/30 mb-3">
            {seen.size} of {loveReasons.length} reasons discovered
          </p>
          <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-rose-glow to-lavender"
              style={{ boxShadow: "0 0 10px #ff4d8d88" }}
              animate={{ width: `${(seen.size / loveReasons.length) * 100}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </RevealSection>

        {/* The card */}
        <div className="mb-10">
          <AnimatePresence mode="wait">
            <ReasonCard
              reason={loveReasons[currentIndex]}
              number={currentIndex + 1}
            />
          </AnimatePresence>
        </div>

        {/* Shuffle button */}
        <RevealSection className="text-center">
          <AnimatedButton onClick={pickRandom} className="mx-auto">
            <FaShuffle /> Next Reason
          </AnimatedButton>
        </RevealSection>

        {/* Floating hearts */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {Array.from({ length: 8 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute text-rose-glow/20"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                fontSize: Math.random() * 20 + 10,
              }}
              animate={{ y: [0, -30, 0], opacity: [0.1, 0.4, 0.1] }}
              transition={{
                duration: 3 + i,
                delay: i * 0.4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              ♥
            </motion.div>
          ))}
        </div>
      </div>

      {/* Show All Toggle */}
      <RevealSection className="text-center mt-20 relative z-10">
        <button
          onClick={() => setShowAll(!showAll)}
          className="font-inter text-sm text-white/30 hover:text-rose-glow transition-colors underline"
        >
          {showAll ? "Hide" : "Show"} all {loveReasons.length} reasons
        </button>

        <AnimatePresence>
          {showAll && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 max-w-5xl mx-auto"
            >
              {loveReasons.map((reason, i) => (
                <motion.div
                  key={i}
                  className="glass rounded-xl p-4 text-left cursor-pointer hover:border-rose-glow/30 transition-all duration-300"
                  style={{ border: "1px solid rgba(255,255,255,0.06)" }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.02 }}
                  onClick={() => { setCurrentIndex(i); setShowAll(false); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                  data-cursor-hover
                >
                  <span className="text-rose-glow/50 text-xs font-poppins block mb-1">#{i + 1}</span>
                  <p className="font-inter text-sm text-white/60 leading-relaxed">{reason}</p>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </RevealSection>
    </div>
  );
}
