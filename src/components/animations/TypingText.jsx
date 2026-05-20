// src/components/animations/TypingText.jsx
// Simulates a typewriter / typing animation effect

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function TypingText({
  text,
  speed = 35,
  delay = 0,
  className = "",
  onComplete,
  showCursor = true,
}) {
  const [displayed, setDisplayed] = useState("");
  const [started, setStarted] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const delayTimer = setTimeout(() => setStarted(true), delay);
    return () => clearTimeout(delayTimer);
  }, [delay]);

  useEffect(() => {
    if (!started) return;
    let i = 0;
    const timer = setInterval(() => {
      if (i < text.length) {
        setDisplayed(text.slice(0, i + 1));
        i++;
      } else {
        clearInterval(timer);
        setDone(true);
        onComplete?.();
      }
    }, speed);
    return () => clearInterval(timer);
  }, [started, text, speed]);

  return (
    <motion.span
      className={className}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3, delay: delay / 1000 }}
    >
      {displayed}
      {showCursor && !done && <span className="typing-cursor" />}
    </motion.span>
  );
}
