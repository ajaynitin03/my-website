// src/pages/Future.jsx
// ─── Future Dreams visualization ─────────────────────────────

import { motion } from "framer-motion";
import AuroraBackground from "../components/effects/AuroraBackground";
import ParticleBackground from "../components/effects/ParticleBackground";
import RevealSection from "../components/animations/RevealSection";
import GlowText from "../components/ui/GlowText";
import { futureDreams } from "../data";

// ─── Dream Card ───────────────────────────────────────────────
function DreamCard({ dream, index }) {
  return (
    <RevealSection delay={index * 0.1} direction={index % 2 === 0 ? "left" : "right"}>
      <motion.div
        className="glass rounded-3xl p-8 relative overflow-hidden group h-full"
        whileHover={{ y: -8, scale: 1.02 }}
        transition={{ duration: 0.3 }}
        style={{
          border: `1px solid ${dream.color}22`,
          boxShadow: `0 0 40px ${dream.color}11`,
        }}
      >
        {/* Hover glow */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl"
          style={{ background: `radial-gradient(ellipse at center, ${dream.color}18 0%, transparent 70%)` }}
        />

        {/* Floating icon */}
        <motion.div
          className="text-5xl mb-6 block"
          animate={{ y: [0, -10, 0] }}
          transition={{
            duration: 3 + index * 0.5,
            delay: index * 0.3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          {dream.icon}
        </motion.div>

        <h3 className="font-playfair text-2xl text-white/90 mb-3">{dream.title}</h3>
        <p className="font-inter text-white/50 text-sm leading-relaxed">
          {dream.description}
        </p>

        {/* Color accent line */}
        <div
          className="absolute bottom-0 left-0 right-0 h-px opacity-30"
          style={{ background: `linear-gradient(90deg, transparent, ${dream.color}, transparent)` }}
        />
      </motion.div>
    </RevealSection>
  );
}

// ─── Animated Stars ───────────────────────────────────────────
function StarField() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {Array.from({ length: 60 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-white"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            width: Math.random() * 2 + 0.5,
            height: Math.random() * 2 + 0.5,
          }}
          animate={{ opacity: [0.1, 0.8, 0.1] }}
          transition={{
            duration: Math.random() * 4 + 2,
            delay: Math.random() * 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

export default function Future() {
  return (
    <div className="relative min-h-screen py-32 px-6 overflow-hidden">
      <AuroraBackground opacity={0.14} />
      <ParticleBackground count={20} />
      <StarField />

      {/* Header */}
      <div className="text-center mb-24 relative z-10">
        <RevealSection>
          <p className="font-inter text-xs tracking-[0.4em] text-white/30 uppercase mb-6">
            ✦ Everything Ahead of Us ✦
          </p>
          <GlowText as="h1" className="font-vibes text-7xl sm:text-8xl mb-6">
            Our Future
          </GlowText>
          <p className="font-playfair italic text-xl text-white/50 max-w-xl mx-auto">
            Dreams so beautiful, they already feel like memories.
          </p>
        </RevealSection>
      </div>

      {/* Dream Cards Grid */}
      <div className="max-w-5xl mx-auto relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-32">
        {futureDreams.map((dream, index) => (
          <DreamCard key={dream.id} dream={dream} index={index} />
        ))}
      </div>

      {/* Final Promise */}
      <RevealSection className="text-center relative z-10 max-w-3xl mx-auto">
        <div
          className="glass rounded-3xl p-12 relative overflow-hidden"
          style={{ boxShadow: "0 0 80px #ff4d8d22" }}
        >
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_#ff4d8d12_0%,_transparent_70%)]" />
          <motion.div
            className="text-5xl mb-6"
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
          >
            🌙
          </motion.div>
          <h2 className="font-vibes text-5xl gradient-text text-glow-rose mb-6">
            I promise you this
          </h2>
          <p className="font-playfair italic text-xl text-white/65 leading-relaxed">
            Every single dream on this page — I intend to make real with you.
            Not just because they're beautiful, but because everything is better
            when you're beside me.
          </p>
          <div className="mt-8 text-2xl animate-heart-beat">💕</div>
        </div>
      </RevealSection>
    </div>
  );
}
