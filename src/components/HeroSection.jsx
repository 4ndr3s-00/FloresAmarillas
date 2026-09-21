import { motion } from "framer-motion";
import confetti from "canvas-confetti";
import { Flower } from "lucide-react";

const CONFETTI_COLORS = ["#fde047", "#facc15", "#fbbf24", "#fef08a", "#fff7e0"];

function firePetals(x, y) {
  confetti({
    particleCount: 80,
    spread: 70,
    origin: { x, y },
    colors: CONFETTI_COLORS,
    ticks: 220,
    gravity: 0.8,
    scalar: 1.4,
  });
  confetti({
    particleCount: 40,
    angle: 60,
    spread: 60,
    origin: { x, y },
    colors: CONFETTI_COLORS,
    ticks: 220,
    gravity: 0.8,
    scalar: 1.2,
  });
  confetti({
    particleCount: 40,
    angle: 120,
    spread: 60,
    origin: { x, y },
    colors: CONFETTI_COLORS,
    ticks: 220,
    gravity: 0.8,
    scalar: 1.2,
  });
}

function HeroSection({ onOpen }) {
  const handleClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    firePetals(
      (rect.left + rect.width / 2) / window.innerWidth,
      (rect.top + rect.height / 2) / window.innerHeight,
    );
    onOpen();
  };

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-6 text-center">
      <motion.span
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: "easeOut" }}
        className="flex items-center gap-3 text-gold-400/70 tracking-[0.35em] uppercase text-xs"
      >
        <Flower size={16} aria-hidden="true" />
        De mi jardín para ti
      </motion.span>

      <motion.h1
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.15, ease: "easeOut" }}
        className="mt-6 font-serif text-5xl sm:text-6xl lg:text-7xl font-semibold text-gold-300/90 leading-tight"
      >
        Un Jardín Solo Para Ti
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
        className="mt-8 max-w-xl text-lg sm:text-xl leading-relaxed text-slate-300/80"
      >
        Si hoy nadie te dio flores amarillas, no es porque no las merezcas. Es
        porque el universo estaba guardando este rincón solo para ti.
      </motion.p>

      <motion.button
        type="button"
        onClick={handleClick}
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.45, ease: "easeOut" }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="mt-12 px-10 py-4 rounded-full font-semibold text-night text-base bg-gradient-to-r from-gold-300 via-gold-400 to-gold-500 shadow-[0_0_30px_rgba(244,199,63,0.45)] cursor-pointer"
      >
        Recibir mis flores
      </motion.button>
    </section>
  );
}

export default HeroSection;