// src/components/audio/MusicPlayer.jsx
// Floating music player widget — bottom right corner

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { useAudio } from "../../context/AudioContext";
import { HiMusicalNote } from "react-icons/hi2";
import { FaPause, FaPlay } from "react-icons/fa";
import { IoVolumeHigh, IoVolumeMute } from "react-icons/io5";

export default function MusicPlayer() {
  const { isPlaying, volume, setVolume, toggle } = useAudio();
  const [expanded, setExpanded] = useState(false);
  const [muted, setMuted] = useState(false);

  const handleMute = () => {
    setMuted(!muted);
    setVolume(muted ? 0.4 : 0);
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 flex items-end gap-3">
      <AnimatePresence>
        {expanded && (
          <motion.div
            className="glass-rose rounded-2xl px-5 py-4 flex items-center gap-4"
            initial={{ opacity: 0, x: 20, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 20, scale: 0.9 }}
            transition={{ duration: 0.3 }}
          >
            {/* Song info */}
            <div className="min-w-0">
              <p className="font-poppins text-xs text-white/80 font-medium truncate">
                Our Song 💕
              </p>
              <p className="font-inter text-xs text-white/40 truncate">
                ♪ Playing for you
              </p>
            </div>

            {/* Play/pause */}
            <button
              onClick={toggle}
              className="w-8 h-8 rounded-full bg-rose-glow/20 flex items-center justify-center text-rose-glow hover:bg-rose-glow/40 transition-colors"
            >
              {isPlaying ? <FaPause size={10} /> : <FaPlay size={10} />}
            </button>

            {/* Volume */}
            <button
              onClick={handleMute}
              className="text-white/50 hover:text-rose-glow transition-colors"
            >
              {muted ? <IoVolumeMute size={16} /> : <IoVolumeHigh size={16} />}
            </button>
            <input
              type="range"
              min={0}
              max={1}
              step={0.01}
              value={volume}
              onChange={(e) => setVolume(parseFloat(e.target.value))}
              className="w-20 accent-rose-500"
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main button */}
      <motion.button
        onClick={() => setExpanded(!expanded)}
        className="w-12 h-12 rounded-full glass-rose flex items-center justify-center text-rose-glow hover:shadow-glow-rose transition-all duration-300 relative"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        data-cursor-hover
      >
        {/* Spinning note icon */}
        <motion.div
          animate={isPlaying ? { rotate: 360 } : { rotate: 0 }}
          transition={{ duration: 4, repeat: isPlaying ? Infinity : 0, ease: "linear" }}
        >
          <HiMusicalNote />
        </motion.div>

        {/* Playing indicator ring */}
        {isPlaying && (
          <motion.div
            className="absolute inset-0 rounded-full border border-rose-glow/30"
            animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        )}
      </motion.button>
    </div>
  );
}