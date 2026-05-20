// src/components/effects/HeartParticles.jsx
// Spawns floating hearts on mouse click anywhere on page

import { useEffect } from "react";

export default function HeartParticles() {
  useEffect(() => {
    const hearts = ["💕", "💖", "💗", "💓", "🌸", "✨", "💫", "🌺"];

    const spawnHeart = (x, y) => {
      const el = document.createElement("div");
      el.className = "floating-heart";
      el.textContent = hearts[Math.floor(Math.random() * hearts.length)];
      el.style.left = x + "px";
      el.style.top = y + "px";
      el.style.fontSize = Math.random() * 16 + 14 + "px";
      el.style.animationDuration = Math.random() * 2 + 3 + "s";
      el.style.marginLeft = (Math.random() - 0.5) * 60 + "px";
      document.body.appendChild(el);
      setTimeout(() => el.remove(), 5000);
    };

    const onClick = (e) => {
      // Spawn 3-5 hearts per click
      const count = Math.floor(Math.random() * 3) + 3;
      for (let i = 0; i < count; i++) {
        setTimeout(
          () => spawnHeart(e.clientX + (Math.random() - 0.5) * 40, e.clientY),
          i * 80
        );
      }
    };

    window.addEventListener("click", onClick);
    return () => window.removeEventListener("click", onClick);
  }, []);

  return null; // No DOM output — side-effect only
}
