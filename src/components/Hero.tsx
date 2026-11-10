import { motion, useReducedMotion, type Variants } from "motion/react";
import HeroCapy from "./HeroCapy";
import ProductWindow from "./ProductWindow";

const lines = [["Stay", "curious."], ["Build", "useful", "things."]];
const ease = [0.22, 1, 0.36, 1] as const;

const word: Variants = {
  hidden: { opacity: 0, y: "45%", filter: "blur(10px)" },
  show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.8, ease } },
};
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease } },
};

// slow drifting color fields behind the headline
function Blob({ className, still, path }: { className: string; still: boolean; path: number[] }) {
  return (
    <motion.div
      className={`blob ${className}`}
      animate={still ? undefined : { x: path, y: path.map((v) => -v * 0.6), scale: [1, 1.08, 1] }}
      transition={{ duration: 18, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }}
    />
  );
}

export default function Hero({ mark, github }: { mark: string; github: string }) {
  const still = useReducedMotion() ?? false;

  return (
    <section className="hero">
      <Blob className="blob-a" still={still} path={[0, 60, -30]} />
      <Blob className="blob-b" still={still} path={[0, -50, 40]} />

      <motion.div initial={still ? false : "hidden"} animate="show" transition={{ staggerChildren: 0.08, delayChildren: 0.1 }}>
        <motion.div variants={fadeUp}>
          <a className="pill" href="#products">
            <b>NEW</b>
            <span>Six products, one family</span>
            <span aria-hidden="true">→</span>
          </a>
        </motion.div>
        <h1>
          {lines.map((line) => (
            <span className="line" key={line[0]}>
              {line.map((w) => (
                <motion.span className={w === "useful" ? "word grad" : "word"} variants={word} key={w}>
                  {w}
                </motion.span>
              ))}
            </span>
          ))}
        </h1>
        <motion.p className="hero-sub" variants={fadeUp}>
          An independent technology company building software products, developer tools, infrastructure and
          experimental projects.
        </motion.p>
        <motion.div className="hero-ctas" variants={fadeUp}>
          <a className="btn" href="#products">
            Explore products <span aria-hidden="true">→</span>
          </a>
          <a className="btn-ghost" href={github} rel="noopener">
            GitHub <span aria-hidden="true">↗</span>
          </a>
        </motion.div>
      </motion.div>

      <motion.div
        className="stage"
        initial={still ? false : { opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.1, delay: 0.5, ease }}
      >
        <HeroCapy still={still} />
        <ProductWindow mark={mark} still={still} />
      </motion.div>
    </section>
  );
}
