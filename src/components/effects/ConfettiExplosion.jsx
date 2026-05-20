// src/components/effects/ConfettiExplosion.jsx
// Triggers a full canvas-confetti burst — used on the surprise page

import { useEffect, useRef } from "react";
import confetti from "canvas-confetti";

export default function ConfettiExplosion({ trigger = false, continuous = false }) {
  const intervalRef = useRef(null);

  const burst = () => {
    // Left cannon
    confetti({
      particleCount: 120,
      spread: 80,
      origin: { x: 0.1, y: 0.8 },
      colors: ["#ff4d8d", "#d946ef", "#f472b6", "#ff85b3", "#f9a8d4", "#ffffff"],
      shapes: ["circle", "square"],
      scalar: 1.2,
    });
    // Right cannon
    confetti({
      particleCount: 120,
      spread: 80,
      origin: { x: 0.9, y: 0.8 },
      colors: ["#ff4d8d", "#d946ef", "#f472b6", "#ff85b3", "#f9a8d4", "#ffffff"],
      shapes: ["circle", "square"],
      scalar: 1.2,
    });
    // Center star burst
    confetti({
      particleCount: 80,
      spread: 360,
      startVelocity: 40,
      origin: { x: 0.5, y: 0.5 },
      colors: ["#ff4d8d", "#f9a8d4", "#ffffff"],
      ticks: 300,
    });
  };

  useEffect(() => {
    if (!trigger) return;

    // Initial big burst
    burst();
    setTimeout(burst, 400);
    setTimeout(burst, 800);

    if (continuous) {
      intervalRef.current = setInterval(() => {
        confetti({
          particleCount: 30,
          spread: 60,
          origin: { x: Math.random(), y: Math.random() * 0.5 },
          colors: ["#ff4d8d", "#d946ef", "#f472b6"],
        });
      }, 1200);
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [trigger]);

  return null;
}
