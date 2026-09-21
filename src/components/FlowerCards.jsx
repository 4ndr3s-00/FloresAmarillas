import { motion } from "framer-motion";
import { flowerCards } from "../data/messages";

function FlowerCards() {
  return (
    <section className="px-6 py-24 max-w-6xl mx-auto">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.8 }}
        className="text-center font-serif text-4xl sm:text-5xl text-gold-300/90 mb-4"
      >
        Tres flores, tres formas de quererte
      </motion.h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
        {flowerCards.map((card, i) => (
          <motion.article
            key={card.id}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, delay: i * 0.15, ease: "easeOut" }}
            className="group rounded-3xl p-8 backdrop-blur-xl bg-white/5 border border-gold-400/20 hover:border-gold-400/50 transition-colors"
          >
            <card.icon
              size={36}
              strokeWidth={1.5}
              className="text-gold-400/90 transition-transform duration-500 group-hover:scale-110"
              aria-hidden="true"
            />
            <h3 className="mt-6 font-serif text-2xl text-gold-300 leading-snug">
              {card.title}
            </h3>
            <p className="mt-4 text-sm sm:text-base leading-relaxed text-slate-300/80">
              {card.dedication}
            </p>
          </motion.article>
        ))}
      </div>
    </section>
  );
}

export default FlowerCards;