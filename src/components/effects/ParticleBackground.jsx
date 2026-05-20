// src/components/effects/ParticleBackground.jsx
// Dreamy floating particles using canvas — lightweight, cinematic

import { useEffect, useRef } from "react";

export default function ParticleBackground({ count = 80 }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let animId;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    // Particle types: stars, sparkles, hearts
    const particles = Array.from({ length: count }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 2.5 + 0.5,
      speedY: Math.random() * 0.3 + 0.05,
      speedX: (Math.random() - 0.5) * 0.2,
      opacity: Math.random(),
      opacityDir: (Math.random() - 0.5) * 0.01,
      color: ["#ff4d8d", "#d946ef", "#f472b6", "#ff85b3", "#f9a8d4", "#ffffff"][
        Math.floor(Math.random() * 6)
      ],
      type: Math.random() > 0.85 ? "heart" : "circle",
      pulse: Math.random() * Math.PI * 2, // Phase offset for pulsing
    }));

    const drawHeart = (ctx, x, y, size, opacity, color) => {
      ctx.save();
      ctx.globalAlpha = opacity * 0.6;
      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.moveTo(x, y + size);
      ctx.bezierCurveTo(x, y, x - size, y, x - size, y + size / 2);
      ctx.bezierCurveTo(x - size, y + size, x, y + size * 1.5, x, y + size * 2);
      ctx.bezierCurveTo(x, y + size * 1.5, x + size, y + size, x + size, y + size / 2);
      ctx.bezierCurveTo(x + size, y, x, y, x, y + size);
      ctx.closePath();
      ctx.fill();
      ctx.restore();
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p) => {
        // Drift movement
        p.x += p.speedX;
        p.y -= p.speedY;
        p.pulse += 0.02;

        // Pulse opacity
        p.opacity += Math.sin(p.pulse) * 0.008;
        p.opacity = Math.max(0.05, Math.min(0.9, p.opacity));

        // Wrap around
        if (p.y < -10) { p.y = canvas.height + 10; p.x = Math.random() * canvas.width; }
        if (p.x < -10) p.x = canvas.width + 10;
        if (p.x > canvas.width + 10) p.x = -10;

        if (p.type === "heart") {
          drawHeart(ctx, p.x, p.y, p.size * 1.5, p.opacity, p.color);
        } else {
          // Glowing circle
          ctx.save();
          ctx.globalAlpha = p.opacity;
          const grd = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 3);
          grd.addColorStop(0, p.color);
          grd.addColorStop(1, "transparent");
          ctx.fillStyle = grd;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size * 3, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();

          // Core dot
          ctx.save();
          ctx.globalAlpha = p.opacity * 0.8;
          ctx.fillStyle = "#ffffff";
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size * 0.4, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        }
      });

      animId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, [count]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ mixBlendMode: "screen" }}
    />
  );
}
