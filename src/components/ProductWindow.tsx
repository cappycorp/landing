import { motion } from "motion/react";
import CountUp from "./CountUp";
import { products, Icon } from "./Products";

// illustrative dashboard (the brand board's CappyWatch mock); values are labeled as example data
const spark = "M0 80 C40 78 60 60 100 64 S160 90 200 70 S260 30 300 44 S360 76 400 52 S470 18 520 30 S600 50 640 26 S720 12 760 20";

export default function ProductWindow({ mark, still }: { mark: string; still: boolean }) {
  return (
    <div className="window-ring">
      <div className="window">
        <aside className="win-side">
          <div className="brand"><span className="brand-mark" dangerouslySetInnerHTML={{ __html: mark }} />CappyCorp</div>
          <ul>
            {products.map((p) => (
              <li key={p.name} className={p.name === "CappyWatch" ? "on" : undefined}>
                <Icon>{p.icon}</Icon>
                {p.name}
              </li>
            ))}
          </ul>
        </aside>
        <div className="win-main">
          <div className="win-head">
            <div>
              <h3>Overview</h3>
              <p className="mono">Example data</p>
            </div>
            <span className="win-chip">Last 24h</span>
          </div>
          <div className="win-card">
            <p className="status"><i /> System healthy</p>
            <small>99.9% uptime</small>
            <svg className="spark" viewBox="0 0 760 100" preserveAspectRatio="none" aria-hidden="true">
              <defs>
                <linearGradient id="sparkFill" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0" stopColor="var(--cc-accent-2)" stopOpacity="0.7" />
                  <stop offset="1" stopColor="var(--cc-accent-2)" stopOpacity="0" />
                </linearGradient>
              </defs>
              <motion.path
                d={`${spark} L760 100 L0 100 Z`}
                fill="url(#sparkFill)"
                initial={still ? false : { opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 1.2 }}
              />
              <motion.path
                d={spark}
                fill="none"
                stroke="var(--cc-accent)"
                strokeWidth="2.5"
                vectorEffect="non-scaling-stroke"
                initial={still ? false : { pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.8, delay: 0.6, ease: "easeInOut" }}
              />
            </svg>
          </div>
          <div className="tiles">
            <div className="tile"><p className="mono">Requests</p><strong><CountUp to={12.4} decimals={1} suffix="M" still={still} /></strong></div>
            <div className="tile"><p className="mono">Latency</p><strong><CountUp to={48} suffix="ms" still={still} /></strong></div>
            <div className="tile"><p className="mono">Errors</p><strong><CountUp to={0.01} decimals={2} suffix="%" still={still} /></strong></div>
          </div>
        </div>
      </div>
    </div>
  );
}
