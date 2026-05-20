// src/components/animations/RevealSection.jsx
// Wraps content in a viewport-triggered reveal animation

import { motion } from "framer-motion";

export default function RevealSection({
  children,
  className = "",
  delay = 0,
  direction = "up", // up | down | left | right | none
  distance = 40,
}) {
  const dirMap = {
    up: { y: distance },
    down: { y: -distance },
    left: { x: distance },
    right: { x: -distance },
    none: {},
  };

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, ...dirMap[direction] }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{
        duration: 0.9,
        delay,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
    >
      {children}
    </motion.div>
  );
}
