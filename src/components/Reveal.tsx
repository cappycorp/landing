import type { ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";

export default function Reveal({ children, delay = 0 }: { children: ReactNode; delay?: number }) {
  const still = useReducedMotion();
  return (
    <motion.div
      initial={still ? false : { opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
