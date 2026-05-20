// src/components/ui/AnimatedButton.jsx
// Glowing gradient button with hover and press animations

import { motion } from "framer-motion";

export default function AnimatedButton({ children, onClick, className = "", variant = "primary" }) {
  const base =
    "relative inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full font-poppins font-medium tracking-wide transition-all duration-300 cursor-none select-none overflow-hidden";

  const variants = {
    primary:
      "bg-gradient-to-r from-rose-glow to-lavender text-white shadow-glow-rose hover:shadow-[0_0_50px_#ff4d8daa]",
    outline:
      "border border-rose-glow/40 text-rose-glow hover:border-rose-glow hover:bg-rose-glow/10 hover:shadow-glow-rose",
    ghost:
      "text-white/60 hover:text-rose-glow hover:bg-white/5",
  };

  return (
    <motion.button
      onClick={onClick}
      className={`${base} ${variants[variant]} ${className}`}
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.97 }}
      data-cursor-hover
    >
      {/* Shimmer overlay */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full"
        animate={{ x: ["−100%", "200%"] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: "linear", repeatDelay: 1 }}
      />
      {children}
    </motion.button>
  );
}
