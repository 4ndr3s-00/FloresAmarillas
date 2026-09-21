import { useState } from "react";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";
import { RotateCw, Share2 } from "lucide-react";

const GOLDS = ["#fde047", "#facc15", "#fbbf24", "#fef08a"];
const YELLOW_CENTER = "#d4a017";

const bloomVariants = {
  closed: { scale: 0, opacity: 0 },
  bloom: {
    scale: 1,
    opacity: 1,
    transition: { duration: 0.9, ease: "easeOut" },
  },
};

const stemVariants = {
  closed: { pathLength: 0, opacity: 0 },
  bloom: {
    pathLength: 1,
    opacity: 1,
    transition: { duration: 1.1, ease: "easeInOut" },
  },
};

const FLOWERS = [
  { cx: 120, cy: 178, r: 17 },
  { cx: 172, cy: 116, r: 21 },
  { cx: 228, cy: 106, r: 23 },
  { cx: 275, cy: 172, r: 17 },
  { cx: 200, cy: 168, r: 19 },
];

const STEMS = [
  "M200 330 Q140 250 120 196",
  "M200 330 Q185 220 172 136",
  "M200 330 Q205 195 228 126",
  "M200 330 Q262 245 275 192",
  "M200 330 Q200 245 200 182",
];

function Flower({ cx, cy, r }) {
  return (
    <motion.g
      variants={bloomVariants}
      style={{ transformBox: "fill-box", transformOrigin: "center" }}
    >
      {GOLDS.map((color, i) => (
        <ellipse
          key={i}
          cx={cx}
          cy={cy - r * 2.1}
          rx={Math.max(2, r * 0.95)}
          ry={r * 1.5}
          fill={color}
          transform={`rotate(${(360 / 8) * i} ${cx} ${cy})`}
        />
      ))}
      <circle cx={cx} cy={cy} r={r * 0.55} fill={YELLOW_CENTER} />
    </motion.g>
  );
}

function Bouquet() {
  return (
    <motion.svg
      viewBox="0 0 400 360"
      width={300}
      height={270}
      initial="closed"
      whileInView="bloom"
      viewport={{ once: false, amount: 0.4 }}
      transition={{ staggerChildren: 0.14, delayChildren: 0.2 }}
    >
      {STEMS.map((d, i) => (
        <motion.path
          key={i}
          d={d}
          stroke="#7fb069"
          strokeWidth={5}
          strokeLinecap="round"
          fill="none"
          opacity={0.9}
          variants={stemVariants}
        />
      ))}

      {FLOWERS.map((f) => (
        <Flower key={f.cx} cx={f.cx} cy={f.cy} r={f.r} />
      ))}

      <g opacity={0.85}>
        <path d="M178 296 Q200 308 222 296 L222 322 Q200 334 178 322 Z" fill="#b5821f" />
        <path d="M178 296 Q170 282 158 276 Q172 286 178 296 Z" fill="#c98f2a" />
        <path d="M222 296 Q230 282 242 276 Q228 286 222 296 Z" fill="#c98f2a" />
      </g>
    </motion.svg>
  );
}

function InteractiveFlower() {
  const [bloomKey, setBloomKey] = useState(0);

  const reBloom = (e) => {
    setBloomKey((k) => k + 1);
    const rect = e.currentTarget.getBoundingClientRect();
    confetti({
      particleCount: 60,
      spread: 70,
      origin: {
        x: (rect.left + rect.width / 2) / window.innerWidth,
        y: (rect.top + rect.height / 2) / window.innerHeight,
      },
      colors: GOLDS,
      ticks: 220,
      gravity: 0.8,
      scalar: 1.3,
    });
  };

  const shareWhatsApp = () => {
    const url = `https://wa.me/?text=${encodeURIComponent(
      `Te guardé estas flores amarillas solo para ti: ${window.location.href}`,
    )}`;
    window.open(url, "_blank", "noopener");
  };

  const fade = (delay) => ({
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: false, amount: 0.5 },
    transition: { duration: 0.9, delay, ease: "easeOut" },
  });

  return (
    <section className="relative flex flex-col items-center justify-center px-6 py-24 text-center">
      <motion.p
        {...fade(0)}
        className="text-gold-400/70 tracking-[0.35em] uppercase text-xs"
      >
        Flores amarillas
      </motion.p>

      <motion.button
        key={bloomKey}
        type="button"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="mt-10 cursor-pointer"
        aria-label="Volver a florecer"
        onClick={reBloom}
      >
        <Bouquet />
      </motion.button>

      <motion.blockquote
        {...fade(0.4)}
        className="mt-10 max-w-2xl font-serif text-2xl sm:text-3xl leading-relaxed text-gold-300/90"
      >
        “Esta flor no se marchita, no depende del tiempo ni de quien lo olvida.
        Florece hoy aquí para recordarte lo mucho que vales, la luz que llevas
        contigo y lo hermoso que es que existas.”
      </motion.blockquote>

      <motion.p
        {...fade(1.2)}
        className="mt-8 max-w-xl text-lg leading-relaxed text-slate-300/80"
      >
        Aquí no tienes que brillar para ser recibida. Llegas como eres, con lo
        que hoy llevas, y así está bien.
      </motion.p>

      <motion.p
        {...fade(1.5)}
        className="mt-4 max-w-xl text-lg leading-relaxed text-slate-300/80"
      >
        Tómate el tiempo que necesites: este jardín no corre prisa y desea que
        tú tampoco la tengas.
      </motion.p>

      <motion.p
        {...fade(1.8)}
        className="mt-4 max-w-xl text-sm italic text-gold-400/60"
      >
        Cada vez que vuelvas a pasar por aquí, este ramo volverá a abrirse,
        solo para ti.
      </motion.p>

      <motion.div {...fade(2.1)} className="mt-12 flex flex-wrap justify-center gap-4">
        <motion.button
          type="button"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={reBloom}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-gold-400/30 text-gold-300 hover:bg-gold-400/10 transition-colors cursor-pointer"
        >
          <RotateCw size={16} aria-hidden="true" />
          Volver a florecer
        </motion.button>

        <motion.button
          type="button"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={shareWhatsApp}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-gold-400/30 text-gold-300 hover:bg-gold-400/10 transition-colors cursor-pointer"
        >
          <Share2 size={16} aria-hidden="true" />
          Compartir estas flores
        </motion.button>
      </motion.div>
    </section>
  );
}

export default InteractiveFlower;