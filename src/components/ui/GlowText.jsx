// src/components/ui/GlowText.jsx
// Animated gradient glow text with reveal animation

import { motion } from "framer-motion";

export default function GlowText({
  children,
  className = "",
  as: Tag = "h1",
  delay = 0,
  glow = true,
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.9, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      <Tag
        className={`gradient-text ${glow ? "text-glow-rose" : ""} ${className}`}
      >
        {children}
      </Tag>
    </motion.div>
  );
}
