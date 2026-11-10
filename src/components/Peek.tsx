import { useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import raw from "../../branding/02-Mascot/mascot-expressive.svg?raw";

// body follows currentColor (paper); eye/nostril go ink; the "!" rays get a class to animate
const svg = raw
  .replace('role="img" aria-label="CappyCorp brand mark"', 'aria-hidden="true"')
  .replaceAll("#fff", "#0B0B0B")
  .replace('<path d="M80 14', '<path class="spikes" d="M80 14');

export default function Peek() {
  const still = useReducedMotion();
  const [seen, setSeen] = useState(false);
  // the outer box stays put so the footer's overflow clip can't hide it from IntersectionObserver
  return (
    <motion.div
      className={`peek${seen || still ? " seen" : ""}`}
      initial={still ? false : "hidden"}
      whileInView="show"
      onViewportEnter={() => setSeen(true)}
      viewport={{ once: true }}
    >
      <motion.div
        variants={{ hidden: { y: "100%" }, show: { y: "0%" } }}
        transition={{ type: "spring", stiffness: 160, damping: 14, delay: 0.2 }}
        dangerouslySetInnerHTML={{ __html: svg }}
      />
    </motion.div>
  );
}
