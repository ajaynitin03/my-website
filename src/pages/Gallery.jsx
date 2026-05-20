// src/pages/Gallery.jsx
// ─── Masonry photo gallery with fullscreen lightbox ─────────

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiX, FiChevronLeft, FiChevronRight } from "react-icons/fi";
import AuroraBackground from "../components/effects/AuroraBackground";
import ParticleBackground from "../components/effects/ParticleBackground";
import RevealSection from "../components/animations/RevealSection";
import GlowText from "../components/ui/GlowText";
import { galleryImages } from "../data";

// ─── Lightbox Modal ──────────────────────────────────────────
function Lightbox({ images, index, onClose }) {
  const [current, setCurrent] = useState(index);

  const prev = () => setCurrent((i) => (i - 1 + images.length) % images.length);
  const next = () => setCurrent((i) => (i + 1) % images.length);

  const img = images[current];

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        {/* Backdrop */}
        <div className="absolute inset-0 bg-deep/95 backdrop-blur-2xl" />

        {/* Image */}
        <motion.div
          className="relative z-10 max-w-4xl max-h-[85vh] mx-6"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
        >
          <img
            src={img.src}
            alt={img.caption}
            className="max-h-[75vh] max-w-full object-contain rounded-2xl shadow-[0_0_60px_#ff4d8d44]"
          />
          <p className="text-center font-playfair italic text-white/60 mt-4">
            {img.caption}
          </p>

          {/* Counter */}
          <p className="text-center font-inter text-xs text-white/30 mt-2">
            {current + 1} / {images.length}
          </p>
        </motion.div>

        {/* Nav buttons */}
        <button
          onClick={(e) => { e.stopPropagation(); prev(); }}
          className="absolute left-4 z-20 w-12 h-12 rounded-full glass-rose flex items-center justify-center text-rose-glow hover:bg-rose-glow/20 transition-colors"
        >
          <FiChevronLeft size={20} />
        </button>
        <button
          onClick={(e) => { e.stopPropagation(); next(); }}
          className="absolute right-4 z-20 w-12 h-12 rounded-full glass-rose flex items-center justify-center text-rose-glow hover:bg-rose-glow/20 transition-colors"
        >
          <FiChevronRight size={20} />
        </button>

        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full glass flex items-center justify-center text-white/60 hover:text-white transition-colors"
        >
          <FiX size={18} />
        </button>
      </motion.div>
    </AnimatePresence>
  );
}

// ─── Gallery Item ────────────────────────────────────────────
function GalleryItem({ image, index, onOpen }) {
  return (
    <motion.div
      className="masonry-item relative group cursor-pointer overflow-hidden rounded-2xl"
      onClick={() => onOpen(index)}
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: (index % 4) * 0.08 }}
      whileHover={{ scale: 1.02 }}
      data-cursor-hover
    >
      <img
        src={image.thumb}
        alt={image.caption}
        className="w-full object-cover rounded-2xl transition-transform duration-700 group-hover:scale-110"
        loading="lazy"
      />

      {/* Hover overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-deep/80 via-deep/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400 rounded-2xl flex items-end p-4">
        <p className="font-playfair italic text-white/90 text-sm">
          {image.caption}
        </p>
      </div>

      {/* Glow border on hover */}
      <div className="absolute inset-0 rounded-2xl border border-rose-glow/0 group-hover:border-rose-glow/30 transition-all duration-400" />
    </motion.div>
  );
}

export default function Gallery() {
  const [lightboxIndex, setLightboxIndex] = useState(null);

  return (
    <div className="relative min-h-screen py-32 px-6">
      <AuroraBackground opacity={0.1} />
      <ParticleBackground count={25} />

      {/* Header */}
      <div className="text-center mb-20 relative z-10">
        <RevealSection>
          <p className="font-inter text-xs tracking-[0.4em] text-white/30 uppercase mb-6">
            ✦ Memories Captured ✦
          </p>
          <GlowText as="h1" className="font-vibes text-7xl sm:text-8xl mb-6">
            Our Gallery
          </GlowText>
          <p className="font-playfair italic text-xl text-white/50 max-w-xl mx-auto">
            Every photo, a whole feeling. Click to step inside a memory.
          </p>
        </RevealSection>
      </div>

      {/* Masonry Grid */}
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="masonry-grid">
          {galleryImages.map((image, index) => (
            <GalleryItem
              key={image.id}
              image={image}
              index={index}
              onOpen={setLightboxIndex}
            />
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <Lightbox
          images={galleryImages}
          index={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
        />
      )}
    </div>
  );
}
