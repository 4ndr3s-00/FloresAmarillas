import { useRef } from "react";
import BackgroundPetals from "./components/BackgroundPetals";
import HeroSection from "./components/HeroSection";
import InteractiveFlower from "./components/InteractiveFlower";
import FlowerCards from "./components/FlowerCards";
import CustomLetter from "./components/CustomLetter";
import { Flower } from "lucide-react";

function App() {
  const flowerSection = useRef(null);
  const cardsSection = useRef(null);
  const scrollTo = (ref) =>
    ref.current?.scrollIntoView({ behavior: "smooth", block: "start" });

  return (
    <div className="relative min-h-screen bg-night overflow-x-hidden">
      <BackgroundPetals />

      <HeroSection onOpen={() => scrollTo(flowerSection)} />

      <div ref={flowerSection}>
        <InteractiveFlower onNext={() => scrollTo(cardsSection)} />
      </div>

      <div ref={cardsSection}>
        <FlowerCards />
      </div>

      <CustomLetter />

      <footer className="px-6 pb-10 pt-6 flex items-center justify-center gap-2 text-sm text-gold-400/50">
        <Flower size={14} strokeWidth={1.5} aria-hidden="true" />
        <span>Hecho con flores para ti</span>
        <span aria-hidden="true">·</span>
        <a
          href="https://www.instagram.com/7_4ndr3s"
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium text-gold-300/80 hover:text-gold-300 underline-offset-4 hover:underline transition-colors"
        >
          @7_4ndr3s
        </a>
      </footer>
    </div>
  );
}

export default App;