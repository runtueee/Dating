import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const petals = [
  { id: 1, emoji: "🌸", size: 24 },
  { id: 2, emoji: "🌺", size: 28 },
  { id: 3, emoji: "🌼", size: 22 },
  { id: 4, emoji: "🌷", size: 26 },
  { id: 5, emoji: "💮", size: 30 },
];

export default function PetalAnimation() {
  const [visiblePetals, setVisiblePetals] = useState<number[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (visiblePetals.length < 15) {
        setVisiblePetals((prev) => [...prev, Date.now()]);
      }
    }, 800);

    return () => clearInterval(interval);
  }, [visiblePetals.length]);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {visiblePetals.map((id) => {
        const petal = petals[Math.floor(Math.random() * petals.length)];
        const startX = Math.random() * 100;
        const duration = 8 + Math.random() * 7;

        return (
          <motion.div
            key={id}
            initial={{ x: `${startX}vw`, y: "-10vh", rotate: 0 }}
            animate={{
              y: "110vh",
              x: `${startX + (Math.random() - 0.5) * 20}vw`,
              rotate: 360,
            }}
            transition={{
              duration,
              repeat: Infinity,
              ease: "linear",
            }}
            style={{
              fontSize: petal.size,
              position: "absolute",
            }}
          >
            {petal.emoji}
          </motion.div>
        );
      })}
    </div>
  );
}