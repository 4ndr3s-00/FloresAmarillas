import { useRef, useState } from "react";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";
import { RotateCw, Share2, Check } from "lucide-react";

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

const STEMS = [
  "M200 376 Q150 300 176 142",
  "M200 376 Q112 286 224 134",
  "M200 376 Q118 292 158 186",
  "M200 376 Q286 288 242 182",
  "M200 376 Q200 284 200 176",
  "M200 376 Q184 330 182 224",
  "M200 376 Q216 330 218 226",
];

const FLOWERS = [
  { cx: 176, cy: 116, r: 27 },
  { cx: 224, cy: 108, r: 28 },
  { cx: 158, cy: 168, r: 19 },
  { cx: 242, cy: 162, r: 19 },
  { cx: 200, cy: 150, r: 23 },
  { cx: 182, cy: 206, r: 14 },
  { cx: 218, cy: 206, r: 14 },
];

function Flower({ cx, cy, r }) {
  const outer = Array.from({ length: 10 }, (_, i) => (360 / 10) * i);
  const inner = Array.from({ length: 8 }, (_, i) => (360 / 8) * i + 22.5);

  return (
    <motion.g
      variants={bloomVariants}
      style={{ transformBox: "fill-box", transformOrigin: "center" }}
    >
      {outer.map((angle, i) => (
        <ellipse
          key={"o" + i}
          cx={cx}
          cy={cy - 2.3 * r}
          rx={r * 0.52}
          ry={r * 1.15}
          fill={GOLDS[i % GOLDS.length]}
          transform={`rotate(${angle} ${cx} ${cy})`}
        />
      ))}
      {inner.map((angle, i) => (
        <ellipse
          key={"i" + i}
          cx={cx}
          cy={cy - 1.5 * r}
          rx={r * 0.45}
          ry={r * 0.85}
          fill={GOLDS[(i + 2) % GOLDS.length]}
          transform={`rotate(${angle} ${cx} ${cy})`}
        />
      ))}
      <circle cx={cx} cy={cy} r={r * 0.72} fill={YELLOW_CENTER} />
      <circle cx={cx} cy={cy} r={r * 0.4} fill="#fef08a" />
    </motion.g>
  );
}

function Bouquet() {
  const front = FLOWERS.filter((f) => f.cy > 200);
  const back = FLOWERS.filter((f) => f.cy <= 200);

  return (
    <motion.svg
      viewBox="0 0 400 400"
      width={300}
      height={300}
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
          strokeWidth={4.5}
          strokeLinecap="round"
          fill="none"
          variants={stemVariants}
        />
      ))}

      <g>
        <path d="M178 240 Q140 226 130 194 Q158 203 178 232" fill="#8fae5d" />
        <path d="M230 230 Q264 220 272 188 Q248 196 230 222" fill="#8fae5d" />
        <path d="M204 250 Q180 244 172 224 Q192 232 202 244" fill="#8fae5d" />
        <path d="M200 258 Q228 252 234 232 Q210 238 200 252" fill="#8fae5d" opacity={0.85} />
      </g>

      <g>
        <path
          d="M120 252 C150 264 250 264 280 252 L238 372 Q200 382 162 372 Z"
          fill="#e9d094"
        />
        <ellipse cx={200} cy={254} rx={88} ry={15} fill="#d2b873" />
      </g>

      {back.map((f) => (
        <Flower key={"b" + f.cx} cx={f.cx} cy={f.cy} r={f.r} />
      ))}

      <g>
        <path
          d="M148 256 C162 270 238 270 252 256 L234 374 Q200 384 166 374 Z"
          fill="#f3e2b8"
        />
        <path
          d="M148 256 C162 270 238 270 252 256 L234 374 Q200 384 166 374 Z"
          fill="none"
          stroke="#d4a017"
          strokeWidth={2}
        />
        <path d="M188 262 L197 376" stroke="#d4a017" strokeWidth={1.5} opacity={0.4} />
        <path d="M213 262 L203 376" stroke="#d4a017" strokeWidth={1.5} opacity={0.4} />
        <ellipse
          cx={182}
          cy={246}
          rx={14}
          ry={9}
          fill="#c9921f"
          transform="rotate(-18 182 246)"
        />
        <ellipse
          cx={218}
          cy={246}
          rx={14}
          ry={9}
          fill="#c9921f"
          transform="rotate(18 218 246)"
        />
        <circle cx={200} cy={250} r={5.5} fill="#a67c14" />
        <path
          d="M192 253 Q187 276 182 290"
          stroke="#c9921f"
          strokeWidth={4}
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M208 253 Q213 276 218 290"
          stroke="#c9921f"
          strokeWidth={4}
          strokeLinecap="round"
          fill="none"
        />
      </g>

      {front.map((f) => (
        <Flower key={"f" + f.cx} cx={f.cx} cy={f.cy} r={f.r} />
      ))}
    </motion.svg>
  );
}

function InteractiveFlower() {
  const bouquetRef = useRef(null);
  const [bloomKey, setBloomKey] = useState(0);
  const [copied, setCopied] = useState(false);

  const centerBouquet = () =>
    bouquetRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });

  const reBloom = (e) => {
    centerBouquet();
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

  const copyLink = () => {
    centerBouquet();
    navigator.clipboard?.writeText("https://floresamarillas-roan.vercel.app/");
    fetch("/api/track", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ type: "copy" }),
    }).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const fade = (delay) => ({
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.5 },
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
        ref={bouquetRef}
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
          onClick={copyLink}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-gold-400/30 text-gold-300 hover:bg-gold-400/10 transition-colors cursor-pointer"
        >
          {copied ? (
            <>
              <Check size={16} aria-hidden="true" />
              ¡Enlace copiado!
            </>
          ) : (
            <>
              <Share2 size={16} aria-hidden="true" />
              Compartir estas flores
            </>
          )}
        </motion.button>
      </motion.div>
    </section>
  );
}

export default InteractiveFlower;