// src/pages/Videos.jsx
// ─── Cinematic video memories showcase ──────────────────────

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiPlay, FiX } from "react-icons/fi";
import AuroraBackground from "../components/effects/AuroraBackground";
import ParticleBackground from "../components/effects/ParticleBackground";
import RevealSection from "../components/animations/RevealSection";
import GlowText from "../components/ui/GlowText";
import { videoMemories } from "../data";

// ─── Video Modal ─────────────────────────────────────────────
function VideoModal({ video, onClose }) {
  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center px-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <div className="absolute inset-0 bg-deep/95 backdrop-blur-2xl" />

        <motion.div
          className="relative z-10 w-full max-w-3xl"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* If no video URL, show placeholder */}
          {video.videoUrl ? (
            <video
              src={video.videoUrl}
              controls
              autoPlay
              className="w-full rounded-2xl shadow-[0_0_80px_#ff4d8d44]"
            />
          ) : (
            <div
              className="w-full aspect-video rounded-2xl flex flex-col items-center justify-center gap-4 relative overflow-hidden"
              style={{
                background: `linear-gradient(135deg, ${video.color}22, #0f0f0f)`,
                border: `1px solid ${video.color}33`,
                boxShadow: `0 0 60px ${video.color}33`,
              }}
            >
              <img
                src={video.thumbnail}
                alt={video.title}
                className="absolute inset-0 w-full h-full object-cover opacity-30 rounded-2xl"
              />
              <div className="relative text-center p-8">
                <div className="text-5xl mb-4">🎬</div>
                <p className="font-playfair text-xl text-white/80 mb-2">
                  {video.title}
                </p>
                <p className="font-inter text-sm text-white/40 max-w-xs">
                  Add your video file path to{" "}
                  <code className="text-rose-glow">src/data/index.js</code>{" "}
                  in the videoUrl field.
                </p>
              </div>
            </div>
          )}

          <p className="text-center font-playfair italic text-white/60 mt-4">
            {video.description}
          </p>
        </motion.div>

        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full glass flex items-center justify-center text-white/60 hover:text-white"
        >
          <FiX size={18} />
        </button>
      </motion.div>
    </AnimatePresence>
  );
}

// ─── Video Card ───────────────────────────────────────────────
function VideoCard({ video, onPlay }) {
  return (
    <motion.div
      className="relative group cursor-pointer overflow-hidden rounded-2xl"
      onClick={() => onPlay(video)}
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ duration: 0.3 }}
      data-cursor-hover
    >
      {/* Thumbnail */}
      <div className="relative aspect-video overflow-hidden rounded-2xl">
        <img
          src={video.thumbnail}
          alt={video.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          loading="lazy"
        />

        {/* Gradient overlay */}
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(to top, ${video.color}aa 0%, transparent 50%, transparent 100%)`,
          }}
        />

        {/* Duration badge */}
        <div className="absolute top-3 right-3 bg-deep/70 backdrop-blur-sm rounded-lg px-2 py-1 text-xs font-poppins text-white/80">
          {video.duration}
        </div>

        {/* Play button */}
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            className="w-16 h-16 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{ background: video.color + "dd", boxShadow: `0 0 40px ${video.color}aa` }}
            whileHover={{ scale: 1.1 }}
          >
            <FiPlay size={24} className="text-white ml-1" />
          </motion.div>
        </div>
      </div>

      {/* Info */}
      <div className="p-5">
        <h3 className="font-playfair text-lg text-white/90 mb-1">{video.title}</h3>
        <p className="font-inter text-sm text-white/45">{video.description}</p>
      </div>

      {/* Glow border */}
      <div
        className="absolute inset-0 rounded-2xl border border-transparent group-hover:border-opacity-100 transition-all duration-400"
        style={{ borderColor: video.color + "44" }}
      />
    </motion.div>
  );
}

export default function Videos() {
  const [activeVideo, setActiveVideo] = useState(null);

  return (
    <div className="relative min-h-screen py-32 px-6">
      <AuroraBackground opacity={0.1} />
      <ParticleBackground count={25} />

      {/* Header */}
      <div className="text-center mb-20 relative z-10">
        <RevealSection>
          <p className="font-inter text-xs tracking-[0.4em] text-white/30 uppercase mb-6">
            ✦ Moving Memories ✦
          </p>
          <GlowText as="h1" className="font-vibes text-7xl sm:text-8xl mb-6">
            Video Memories
          </GlowText>
          <p className="font-playfair italic text-xl text-white/50 max-w-xl mx-auto">
            Some moments deserve to move. Click to relive them.
          </p>
        </RevealSection>
      </div>

      {/* Grid */}
      <div className="max-w-6xl mx-auto relative z-10 grid grid-cols-1 sm:grid-cols-2 gap-8">
        {videoMemories.map((video, i) => (
          <RevealSection key={video.id} delay={i * 0.1}>
            <VideoCard video={video} onPlay={setActiveVideo} />
          </RevealSection>
        ))}
      </div>

      {/* Tip for personalizing */}
      <RevealSection className="text-center mt-20 relative z-10">
        <div className="glass rounded-2xl p-6 max-w-md mx-auto">
          <p className="font-inter text-sm text-white/40">
            💡 Add your own videos by editing{" "}
            <code className="text-rose-glow">src/data/index.js</code> and setting{" "}
            <code className="text-rose-glow">videoUrl</code> to your local video path.
          </p>
        </div>
      </RevealSection>

      {/* Modal */}
      {activeVideo && (
        <VideoModal video={activeVideo} onClose={() => setActiveVideo(null)} />
      )}
    </div>
  );
}
