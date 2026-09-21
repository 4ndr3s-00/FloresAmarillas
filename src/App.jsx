import { useRef } from "react";
import BackgroundPetals from "./components/BackgroundPetals";
import HeroSection from "./components/HeroSection";
import InteractiveFlower from "./components/InteractiveFlower";
import FlowerCards from "./components/FlowerCards";
import CustomLetter from "./components/CustomLetter";

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
    </div>
  );
}

export default App;