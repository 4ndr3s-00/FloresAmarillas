import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { moodReplies } from "../data/messages";

function CustomLetter() {
  const [mood, setMood] = useState(null);

  return (
    <section className="px-6 py-24 max-w-3xl mx-auto text-center">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.8 }}
        className="font-serif text-4xl sm:text-5xl text-gold-300/90"
      >
        Una carta para el momento que atraviesas
      </motion.h2>
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.8, delay: 0.1 }}
        className="mt-4 text-slate-300/80"
      >
        Dime cómo te sientes hoy y aquí florecerá una palabra para ti.
      </motion.p>

      <div className="mt-10 flex flex-wrap justify-center gap-3">
        {Object.entries(moodReplies).map(([key, reply]) => (
          <button
            key={key}
            type="button"
            onClick={() => setMood(key)}
            className={`px-6 py-3 rounded-full border text-sm transition-colors cursor-pointer ${
              mood === key
                ? "border-gold-400 bg-gold-400/15 text-gold-300"
                : "border-gold-400/25 text-slate-300/80 hover:border-gold-400/60 hover:text-gold-300"
            }`}
          >
            {reply.label}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {mood && (
          <motion.article
            key={mood}
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -16, scale: 0.98 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="mt-12 rounded-3xl p-8 sm:p-10 backdrop-blur-xl bg-white/5 border border-gold-400/20 text-left"
          >
            <h3 className="font-serif text-3xl text-gold-300">
              {moodReplies[mood].title}
            </h3>
            <p className="mt-5 text-lg leading-relaxed text-slate-300/85">
              {moodReplies[mood].body}
            </p>
          </motion.article>
        )}
      </AnimatePresence>
    </section>
  );
}

export default CustomLetter;