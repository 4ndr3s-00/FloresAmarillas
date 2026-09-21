import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const GOLDS = ["#fde047", "#facc15", "#fbbf24", "#fef08a"];
const YELLOW_CENTER = "#d4a017";

const containerVariants = {
  closed: {},
  bloom: {
    transition: { staggerChildren: 0.12, delayChildren: 0.3 },
  },
};

const petalVariants = {
  closed: { scale: 0, opacity: 0 },
  bloom: {
    scale: 1,
    opacity: 1,
    transition: { duration: 0.9, ease: "easeOut" },
  },
};

const PETAL_COUNT = 10;

const petals = Array.from({ length: PETAL_COUNT }, (_, i) => ({
  angle: (360 / PETAL_COUNT) * i,
  color: GOLDS[i % GOLDS.length],
}));

function InteractiveFlower({ onNext = () => {} }) {
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const t = setTimeout(
      () => setRevealed(true),
      300 + PETAL_COUNT * 120 + 950,
    );
    return () => clearTimeout(t);
  }, []);

  return (
    <section className="relative flex flex-col items-center justify-center px-6 py-24 text-center">
      <motion.div
        animate={revealed ? { y: [0, -10, 0] } : { y: 0 }}
        transition={
          revealed
            ? { duration: 4, repeat: Infinity, ease: "easeInOut" }
            : {}
        }
      >
        <motion.svg
          viewBox="0 0 300 340"
          width={280}
          height={318}
          initial="closed"
          animate="bloom"
        >
          <motion.g variants={containerVariants}>
            {petals.map((p, i) => (
              <g key={i} transform={`rotate(${p.angle} 150 150)`}>
                <motion.ellipse
                  cx={150}
                  cy={90}
                  rx={24}
                  ry={52}
                  fill={p.color}
                  variants={petalVariants}
                  style={{ transformBox: "fill-box", transformOrigin: "center" }}
                />
              </g>
            ))}
            <motion.circle
              cx={150}
              cy={150}
              r={26}
              fill={YELLOW_CENTER}
              variants={petalVariants}
            />
          </motion.g>

          <path
            d="M150 330 Q146 240 150 160"
            stroke="#7fb069"
            strokeWidth={5}
            strokeLinecap="round"
            fill="none"
          />
          <path
            d="M150 250 Q110 230 96 196 Q132 196 150 226"
            fill="#8fae5d"
            opacity={0.75}
          />
          <path
            d="M150 275 Q188 258 206 222 Q172 218 154 252"
            fill="#8fae5d"
            opacity={0.75}
          />
        </motion.svg>
      </motion.div>

      {revealed && (
        <motion.blockquote
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.4, ease: "easeOut" }}
          className="mt-12 max-w-2xl font-serif text-2xl sm:text-3xl leading-relaxed text-gold-300/90"
        >
          “Esta flor no se marchita, no depende del tiempo ni de quien lo
          olvida. Florece hoy aquí para recordarte lo mucho que vales, la luz
          que llevas contigo y lo hermoso que es que existas.”
        </motion.blockquote>
      )}

      <motion.button
        type="button"
        initial={{ opacity: 0 }}
        animate={{ opacity: revealed ? 1 : 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        whileHover={{ gap: 12 }}
        onClick={onNext}
        className="mt-10 inline-flex items-center gap-2 text-sm tracking-widest uppercase text-gold-400/70 hover:text-gold-300 transition-colors cursor-pointer"
      >
        Continuar
        <ArrowRight size={16} aria-hidden="true" />
      </motion.button>
    </section>
  );
}

export default InteractiveFlower;