// src/components/effects/AuroraBackground.jsx
// Dreamy animated aurora blobs — pure CSS animated blobs

import { motion } from "framer-motion";

const blobs = [
  { size: 600, x: "10%", y: "20%", color: "#ff4d8d", delay: 0 },
  { size: 500, x: "70%", y: "10%", color: "#d946ef", delay: 2 },
  { size: 400, x: "40%", y: "60%", color: "#f472b6", delay: 4 },
  { size: 350, x: "80%", y: "70%", color: "#ff85b3", delay: 1 },
  { size: 300, x: "5%", y: "80%", color: "#d946ef", delay: 3 },
];

export default function AuroraBackground({ opacity = 0.12 }) {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {blobs.map((blob, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: blob.size,
            height: blob.size,
            left: blob.x,
            top: blob.y,
            background: blob.color,
            filter: "blur(100px)",
            opacity,
          }}
          animate={{
            x: [0, 30, -20, 10, 0],
            y: [0, -30, 20, -10, 0],
            scale: [1, 1.08, 0.95, 1.04, 1],
          }}
          transition={{
            duration: 14 + i * 2,
            delay: blob.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}
