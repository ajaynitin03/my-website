// src/pages/Home.jsx
// ─── Main romantic hero landing page ────────────────────────

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FaHeart, FaArrowRight } from "react-icons/fa";
import AuroraBackground from "../components/effects/AuroraBackground";
import ParticleBackground from "../components/effects/ParticleBackground";
import RevealSection from "../components/animations/RevealSection";
import AnimatedButton from "../components/ui/AnimatedButton";
import { romanticQuotes, navLinks } from "../data";

// ── Customize: Replace "Aisha" with your girlfriend's name ──
const HER_NAME = "Akshaya";

export default function Home() {
  const navigate = useNavigate();
  const [quoteIndex, setQuoteIndex] = useState(0);

  // Rotate quotes every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setQuoteIndex((i) => (i + 1) % romanticQuotes.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const quote = romanticQuotes[quoteIndex];

  return (
    <div className="relative min-h-screen">
      <AuroraBackground opacity={0.14} />
      <ParticleBackground count={50} />

      {/* Hero Section */}
      <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 pt-24">
        {/* Center glow */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_50%_at_50%_50%,_#ff4d8d0e_0%,_transparent_70%)]" />

        {/* Animated heart */}
        <motion.div
          className="text-5xl mb-8"
          animate={{ scale: [1, 1.15, 1], rotate: [-5, 5, -5] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        >
          💕
        </motion.div>

        {/* Headline */}
        <RevealSection>
          <p className="font-inter text-xs tracking-[0.4em] text-white/30 uppercase mb-6">
            Happy Birthday
          </p>
          <h1 className="font-vibes text-7xl sm:text-8xl md:text-9xl gradient-text text-glow-rose leading-none mb-4">
            {HER_NAME}
          </h1>
          <p className="font-playfair italic text-2xl sm:text-3xl text-white/60 mb-10">
            the most beautiful soul I know
          </p>
        </RevealSection>

        {/* Section divider */}
        <RevealSection delay={0.2}>
          <div className="flex items-center gap-4 mb-10">
            <div className="h-px w-24 bg-gradient-to-r from-transparent to-rose-glow/40" />
            <FaHeart className="text-rose-glow text-sm animate-heart-beat" />
            <div className="h-px w-24 bg-gradient-to-l from-transparent to-rose-glow/40" />
          </div>
        </RevealSection>

        {/* CTA Buttons */}
        <RevealSection delay={0.3} className="flex flex-wrap gap-4 justify-center">
          <AnimatedButton onClick={() => navigate("/timeline")}>
            Our Story <FaArrowRight />
          </AnimatedButton>
          <AnimatedButton onClick={() => navigate("/surprise")} variant="outline">
            Your Surprise 🎉
          </AnimatedButton>
        </RevealSection>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-10 flex flex-col items-center gap-2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="w-px h-16 bg-gradient-to-b from-transparent to-rose-glow/40" />
          <p className="font-inter text-xs text-white/20 tracking-widest uppercase">
            Scroll
          </p>
        </motion.div>
      </section>

      {/* Quote Section */}
      <section className="relative py-32 px-6 flex items-center justify-center">
        <div className="max-w-3xl text-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={quoteIndex}
              initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -20, filter: "blur(4px)" }}
              transition={{ duration: 0.8 }}
            >
              <p className="font-playfair italic text-2xl sm:text-3xl text-white/70 leading-relaxed mb-6">
                "{quote.text}"
              </p>
              <p className="font-inter text-sm text-rose-glow/60 tracking-widest">
                — {quote.author}
              </p>
            </motion.div>
          </AnimatePresence>

          {/* Quote dots */}
          <div className="flex justify-center gap-2 mt-10">
            {romanticQuotes.map((_, i) => (
              <button
                key={i}
                onClick={() => setQuoteIndex(i)}
                className={`rounded-full transition-all duration-300 ${
                  i === quoteIndex
                    ? "w-6 h-2 bg-rose-glow"
                    : "w-2 h-2 bg-white/20 hover:bg-white/40"
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Quick Nav Cards */}
      <section className="py-20 px-6 max-w-6xl mx-auto">
        <RevealSection className="text-center mb-16">
          <p className="font-inter text-xs tracking-[0.4em] text-white/30 uppercase mb-4">
            Explore Our Story
          </p>
          <h2 className="font-playfair text-4xl text-white/90">
            Every chapter, beautifully told
          </h2>
        </RevealSection>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { title: "Our Story", desc: "Every moment that led us here", emoji: "📖", path: "/timeline", color: "#ff4d8d" },
            { title: "Gallery", desc: "Our memories, beautifully captured", emoji: "📸", path: "/gallery", color: "#d946ef" },
            { title: "Letter", desc: "Words from the heart", emoji: "💌", path: "/letter", color: "#f472b6" },
            { title: "Video Memories", desc: "Moving moments we've shared", emoji: "🎬", path: "/videos", color: "#ff85b3" },
            { title: "100 Reasons", desc: "Why I love you endlessly", emoji: "💕", path: "/reasons", color: "#f9a8d4" },
            { title: "Our Future", desc: "Dreams we'll make come true", emoji: "🌙", path: "/future", color: "#ff4d8d" },
          ].map(({ title, desc, emoji, path, color }, i) => (
            <RevealSection key={path} delay={i * 0.08}>
              <motion.div
                onClick={() => navigate(path)}
                className="glass rounded-2xl p-6 cursor-pointer group relative overflow-hidden"
                whileHover={{ y: -6, scale: 1.02 }}
                transition={{ duration: 0.3 }}
                data-cursor-hover
              >
                {/* Hover glow */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"
                  style={{ background: `radial-gradient(ellipse at center, ${color}15 0%, transparent 70%)` }}
                />
                {/* Glow border */}
                <div
                  className="absolute inset-0 rounded-2xl border border-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ borderColor: color + "40" }}
                />

                <span className="text-4xl mb-4 block">{emoji}</span>
                <h3
                  className="font-playfair text-xl text-white/90 mb-2 group-hover:transition-colors duration-300"
                  style={{ "--hover-color": color }}
                >
                  {title}
                </h3>
                <p className="font-inter text-sm text-white/40">{desc}</p>

                <div
                  className="flex items-center gap-2 mt-4 text-xs font-poppins opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ color }}
                >
                  Explore <FaArrowRight className="text-xs" />
                </div>
              </motion.div>
            </RevealSection>
          ))}
        </div>
      </section>

      {/* Birthday Banner */}
      <section className="py-32 px-6 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_50%,_#ff4d8d0f_0%,_transparent_70%)]" />
        <RevealSection>
          <h2 className="font-vibes text-6xl sm:text-8xl gradient-text text-glow-rose mb-6">
            Happy Birthday, my mitty
          </h2>
          <p className="font-playfair italic text-xl text-white/50 max-w-2xl mx-auto">
            On this day, the universe did something extraordinary. <br />
            It gave me you. 💕
          </p>
        </RevealSection>
      </section>
    </div>
  );
}
