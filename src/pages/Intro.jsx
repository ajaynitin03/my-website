// src/pages/Intro.jsx
// ─── Cinematic landing intro screen ─────────────────────────
// Full-screen hero with particle bg, her-name reveal, and "Begin" CTA

import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";
import { useAudio } from "../context/AudioContext";
import ParticleBackground from "../components/effects/ParticleBackground";
import AuroraBackground from "../components/effects/AuroraBackground";

// ── Customize: Replace "Aisha" with your girlfriend's name ──
const HER_NAME = "Akshaya";

export default function Intro() {
  const navigate = useNavigate();
  const { fadeIn } = useAudio();
  const [clicked, setClicked] = useState(false);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const btnRef = useRef(null);

  // GSAP entrance timeline
  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.5 });
    tl.fromTo(
      titleRef.current,
      { opacity: 0, y: 60, filter: "blur(20px)" },
      { opacity: 1, y: 0, filter: "blur(0px)", duration: 1.6, ease: "power3.out" }
    )
      .fromTo(
        subtitleRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1, ease: "power2.out" },
        "-=0.6"
      )
      .fromTo(
        btnRef.current,
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, duration: 0.8, ease: "back.out(1.5)" },
        "-=0.3"
      );
  }, []);

  const handleBegin = () => {
    setClicked(true);
    fadeIn(2000);
    // Cinematic page transition then navigate
    gsap.to("body", {
      opacity: 0,
      duration: 0.8,
      delay: 0.3,
      onComplete: () => {
        navigate("/home");
        gsap.to("body", { opacity: 1, duration: 1, delay: 0.1 });
      },
    });
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-deep flex items-center justify-center">
      {/* Layers */}
      <AuroraBackground opacity={0.18} />
      <ParticleBackground count={60} />

      {/* Radial center glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_50%_50%,_#ff4d8d18_0%,_transparent_70%)]" />

      {/* Cinematic vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_100%_100%_at_50%_50%,_transparent_40%,_#0f0f0f_100%)]" />

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center text-center px-6">
        {/* Pre-name label */}
        <motion.p
          className="font-inter text-xs tracking-[0.4em] text-white/30 uppercase mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          A story crafted just for
        </motion.p>

        {/* Her Name — the hero centrepiece */}
        <div ref={titleRef} style={{ opacity: 0 }}>
          <h1 className="font-vibes text-[5rem] sm:text-[7rem] md:text-[9rem] lg:text-[11rem] leading-none gradient-text text-glow-rose select-none">
            {HER_NAME}
          </h1>
        </div>

        {/* Subtitle */}
        <div ref={subtitleRef} style={{ opacity: 0 }} className="mt-4 mb-16">
          <p className="font-playfair italic text-xl sm:text-2xl text-white/50 mb-2">
            Happy Birthday, my mitty
          </p>
          <div className="flex items-center justify-center gap-3">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-rose-glow/50" />
            <span className="text-rose-glow/60 text-sm">✦</span>
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-rose-glow/50" />
          </div>
        </div>

        {/* CTA Button */}
        <div ref={btnRef} style={{ opacity: 0 }}>
          <motion.button
            onClick={handleBegin}
            disabled={clicked}
            className="relative group px-12 py-5 rounded-full font-poppins text-white text-base tracking-wide overflow-hidden"
            style={{
              background: "linear-gradient(135deg, #ff4d8d, #d946ef)",
              boxShadow: "0 0 40px #ff4d8d44, 0 0 80px #ff4d8d22",
            }}
            whileHover={{ scale: 1.06, boxShadow: "0 0 60px #ff4d8daa" }}
            whileTap={{ scale: 0.97 }}
            animate={clicked ? { scale: 0.9, opacity: 0 } : {}}
            data-cursor-hover
          >
            {/* Shimmer */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12"
              animate={{ x: ["-100%", "200%"] }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear", repeatDelay: 1 }}
            />
            <span className="relative">Click To Begin ❤️</span>
          </motion.button>
        </div>

        {/* Bottom hint */}
        <motion.p
          className="absolute bottom-10 font-inter text-xs text-white/20 tracking-widest"
          animate={{ opacity: [0.3, 0.7, 0.3] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          scroll to explore
        </motion.p>
      </div>

      {/* Floating emoji hearts */}
      {["💕", "✨", "🌸", "💫", "💖"].map((emoji, i) => (
        <motion.div
          key={i}
          className="absolute text-2xl pointer-events-none select-none"
          style={{
            left: `${10 + i * 20}%`,
            top: `${20 + (i % 3) * 25}%`,
          }}
          animate={{
            y: [0, -20, 0],
            rotate: [-5, 5, -5],
            opacity: [0.4, 0.8, 0.4],
          }}
          transition={{
            duration: 4 + i * 0.7,
            delay: i * 0.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          {emoji}
        </motion.div>
      ))}
    </div>
  );
}
