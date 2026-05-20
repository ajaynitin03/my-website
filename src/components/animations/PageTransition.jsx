// src/components/animations/PageTransition.jsx
// Wraps each page with a smooth cinematic fade-in reveal

import { motion } from "framer-motion";

const variants = {
  initial: { opacity: 0, y: 24, filter: "blur(8px)" },
  enter: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] },
  },
  exit: {
    opacity: 0,
    y: -16,
    filter: "blur(4px)",
    transition: { duration: 0.4, ease: "easeIn" },
  },
};

export default function PageTransition({ children }) {
  return (
    <motion.div
      variants={variants}
      initial="initial"
      animate="enter"
      exit="exit"
    >
      {children}
    </motion.div>
  );
}
