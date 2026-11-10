import { useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import raw from "../../branding/02-Mascot/mascot-institutional.svg?raw";

// flat mascot: body follows currentColor (paper on the dark page), facial details go ink
const svg = raw.replace('role="img" aria-label="CappyCorp brand mark"', 'aria-hidden="true"').replaceAll("#fff", "#0B0B0B");
const spring = { stiffness: 60, damping: 18 };

export default function HeroCapy({ still }: { still: boolean }) {
  // pointer position across the window, -1..1 on each axis
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, spring);
  const sy = useSpring(my, spring);
  const x = useTransform(sx, (v) => v * 14);
  const y = useTransform(sy, (v) => v * 8);
  const rotate = useTransform(sx, (v) => v * 3);

  useEffect(() => {
    if (still) return;
    const move = (e: PointerEvent) => {
      mx.set((e.clientX / innerWidth) * 2 - 1);
      my.set((e.clientY / innerHeight) * 2 - 1);
    };
    addEventListener("pointermove", move);
    return () => removeEventListener("pointermove", move);
  }, [still, mx, my]);

  if (still) return <div className="hero-capy" dangerouslySetInnerHTML={{ __html: svg }} />;

  return (
    <motion.div className="hero-capy" style={{ x, y, rotate, transformOrigin: "20% 100%" }}>
      {/* idle: slow breath + a small nod */}
      <motion.div
        style={{ transformOrigin: "20% 100%" }}
        animate={{ scale: [1, 1.015, 1, 1.015, 1], rotate: [0, 0, -2, 0, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
      >
        <motion.div
          whileHover={{ y: [0, -22, 0, -7, 0] }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          dangerouslySetInnerHTML={{ __html: svg }}
        />
      </motion.div>
    </motion.div>
  );
}
