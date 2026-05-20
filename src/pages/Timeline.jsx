// src/pages/Timeline.jsx
// ─── Cinematic relationship timeline ────────────────────────

import { useRef } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect } from "react";
import AuroraBackground from "../components/effects/AuroraBackground";
import ParticleBackground from "../components/effects/ParticleBackground";
import RevealSection from "../components/animations/RevealSection";
import { timelineData } from "../data";
import GlowText from "../components/ui/GlowText";

gsap.registerPlugin(ScrollTrigger);

// ─── Single Memory Card ──────────────────────────────────────
function TimelineCard({ memory, index }) {
  const isLeft = index % 2 === 0;
  const cardRef = useRef(null);

  return (
    <RevealSection
      direction={isLeft ? "left" : "right"}
      delay={0.1}
      className={`flex items-center gap-8 ${isLeft ? "flex-row" : "flex-row-reverse"}`}
    >
      {/* Card */}
      <div className={`flex-1 ${isLeft ? "text-right" : "text-left"}`}>
        <motion.div
          ref={cardRef}
          className="glass rounded-2xl p-6 relative overflow-hidden group inline-block w-full"
          whileHover={{ y: -6 }}
          transition={{ duration: 0.3 }}
          style={{
            boxShadow: `0 0 40px ${memory.color}22`,
            border: `1px solid ${memory.color}22`,
          }}
        >
          {/* Hover glow */}
          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"
            style={{ background: `radial-gradient(ellipse at center, ${memory.color}15 0%, transparent 70%)` }}
          />

          {/* Date badge */}
          <div
            className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-poppins mb-4"
            style={{ background: memory.color + "22", color: memory.color }}
          >
            {memory.emoji} {memory.date}
          </div>

          {/* Image (polaroid style) */}
          {memory.image && (
            <div
              className="polaroid mb-4 max-w-[220px] mx-auto"
              style={{ "--rotate": memory.rotate }}
            >
              <img
                src={memory.image}
                alt={memory.title}
                className="w-full h-36 object-cover"
                loading="lazy"
                onError={(e) => {
                  e.target.style.display = "none";
                  e.target.parentNode.style.background = "linear-gradient(135deg, #ff4d8d22, #d946ef22)";
                }}
              />
              <p className="text-center text-xs text-gray-500 mt-2 font-poppins">
                {memory.date}
              </p>
            </div>
          )}

          <h3 className="font-playfair text-xl text-white/90 mb-3">{memory.title}</h3>
          <p className="font-inter text-sm text-white/55 leading-relaxed">
            {memory.description}
          </p>
        </motion.div>
      </div>

      {/* Center dot on timeline */}
      <div className="hidden md:flex flex-col items-center flex-shrink-0">
        <motion.div
          className="w-5 h-5 rounded-full relative z-10 shadow-glow-rose"
          style={{ background: `radial-gradient(circle, ${memory.color}, ${memory.color}66)` }}
          whileInView={{ scale: [0, 1.3, 1] }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        />
      </div>

      {/* Spacer for alternate side */}
      <div className="flex-1 hidden md:block" />
    </RevealSection>
  );
}

export default function Timeline() {
  const lineRef = useRef(null);

  // Animate timeline line drawing as you scroll
  useEffect(() => {
    if (!lineRef.current) return;
    gsap.fromTo(
      lineRef.current,
      { scaleY: 0, transformOrigin: "top" },
      {
        scaleY: 1,
        duration: 1,
        ease: "none",
        scrollTrigger: {
          trigger: lineRef.current,
          start: "top 80%",
          end: "bottom 20%",
          scrub: true,
        },
      }
    );
  }, []);

  return (
    <div className="relative min-h-screen py-32 px-6">
      <AuroraBackground opacity={0.1} />
      <ParticleBackground count={30} />

      {/* Header */}
      <div className="text-center mb-24 relative z-10">
        <RevealSection>
          <p className="font-inter text-xs tracking-[0.4em] text-white/30 uppercase mb-6">
            ✦ Chapter by Chapter ✦
          </p>
          <GlowText
            as="h1"
            className="font-vibes text-7xl sm:text-8xl mb-6"
          >
            Our Story
          </GlowText>
          <p className="font-playfair italic text-xl text-white/50 max-w-xl mx-auto">
            Every moment that led us here — treasured, infinite, ours.
          </p>
        </RevealSection>
      </div>

      {/* Timeline */}
      <div className="max-w-4xl mx-auto relative z-10">
        {/* Vertical line */}
        <div
          ref={lineRef}
          className="absolute left-1/2 top-0 bottom-0 w-px hidden md:block timeline-line"
          style={{ transform: "translateX(-50%)" }}
        />

        <div className="flex flex-col gap-20">
          {timelineData.map((memory, index) => (
            <TimelineCard key={memory.id} memory={memory} index={index} />
          ))}
        </div>

        {/* End heart */}
        <RevealSection className="text-center mt-20">
          <motion.div
            className="text-5xl"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            💕
          </motion.div>
          <p className="font-vibes text-3xl gradient-text mt-4">
            ...and so many more to come
          </p>
        </RevealSection>
      </div>
    </div>
  );
}