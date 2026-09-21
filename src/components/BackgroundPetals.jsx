import { useEffect, useRef } from "react";

const COLORS = ["#fde047", "#facc15", "#fbbf24", "#fef08a"];
const rand = (min, max) => min + Math.random() * (max - min);

function makePetal(width, height) {
  const size = rand(4, 12);
  return {
    x: Math.random() * width,
    y: Math.random() * height,
    size,
    w: size * rand(1.6, 2.2),
    h: size * 0.7,
    opacity: rand(0.3, 0.8),
    speed: rand(0.4, 1.4),
    amp: rand(20, 60),
    freq: rand(0.5, 1.5),
    phase: rand(0, Math.PI * 2),
    spin: rand(-0.02, 0.02),
    angle: Math.random() * Math.PI * 2,
    color: COLORS[Math.floor(Math.random() * COLORS.length)],
  };
}

function BackgroundPetals() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let petals = [];
    let rafId;
    let width = 0;
    let height = 0;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const target = Math.min(120, Math.floor((width * height) / 16000));
      petals = Array.from({ length: target }, () => makePetal(width, height));
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      for (const p of petals) {
        p.y += p.speed;
        p.angle += p.spin;
        const x = p.x + Math.sin(p.y * 0.01 * p.freq + p.phase) * p.amp;

        if (p.y > height + 20) {
          Object.assign(p, makePetal(width, height), { y: -20 });
        }

        ctx.save();
        ctx.translate(x, p.y);
        ctx.rotate(p.angle);
        ctx.globalAlpha = p.opacity;
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.ellipse(0, 0, p.w, p.h, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
      rafId = requestAnimationFrame(draw);
    };

    resize();
    draw();
    window.addEventListener("resize", resize);
    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none"
    />
  );
}

export default BackgroundPetals;